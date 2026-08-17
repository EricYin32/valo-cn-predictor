// VCT CN 胜负预测模型
// 核心逻辑: 战队基础胜率 × 生死将选手发挥系数 × 位置克制因子 × 近期状态
// 比分预测: 确定性负二项分布，零随机，完全可复现

const ROLE_WEIGHTS = {
  '决斗': 1.35,
  '先锋': 1.10,
  '控场': 1.15,
  '哨卫': 0.95,
  '自由人': 0.85
};

const ROLE_COUNTER = {
  '决斗': '先锋',
  '先锋': '控场',
  '控场': '哨卫',
  '哨卫': '决斗',
  '自由人': '自由人'
};

function calcPlayerScore(player) {
  const base = (player.rating || 1.0);
  const acsScore = Math.min(player.acs / 250, 1.2);
  const kastScore = player.kast;
  const kprScore = Math.min(player.kpr / 0.9, 1.2);
  const hsBonus = player.hs > 0.30 ? 1.05 : 1.0;
  return base * 0.35 + acsScore * 0.25 + kastScore * 0.20 + kprScore * 0.20 * hsBonus;
}

function getTeamStrength(teamId) {
  const team = TEAMS[teamId];
  if (!team) return 0;

  const playerScores = team.players.map(p => {
    const raw = calcPlayerScore(p);
    const w = ROLE_WEIGHTS[p.role] || 1.0;
    return raw * w;
  });

  const avgScore = playerScores.reduce((a, b) => a + b, 0) / playerScores.length;

  const duelist = team.players.find(p => p.role === '决斗');
  const duelistImpact = duelist ? (duelist.kpr * 100 + duelist.acs / 5) : 100;

  const historical = team.winRate / 100 * 1.2;
  const pistolBonus = team.pistolWinRate > 52 ? 1.08 : (team.pistolWinRate > 48 ? 1.0 : 0.94);

  return {
    score: (avgScore * 0.45 + historical * 0.55) * pistolBonus,
    duelistImpact,
    avgAcs: team.players.reduce((a, b) => a + b.acs, 0) / team.players.length,
    avgKast: team.players.reduce((a, b) => a + b.kast, 0) / team.players.length,
    winRate: team.winRate,
    players: team.players.map(p => ({
      nickname: p.nickname, role: p.role, roleEn: p.roleEn,
      rating: p.rating, acs: p.acs, kast: p.kast, kpr: p.kpr,
      heroPool: p.heroPool
    }))
  };
}

function roleAdvantage(teamA, teamB) {
  let advA = 0, advB = 0;
  teamA.players.forEach(pA => {
    teamB.players.forEach(pB => {
      if (ROLE_COUNTER[pA.role] === pB.role && pA.role !== '自由人') advA += 0.04;
      if (ROLE_COUNTER[pB.role] === pA.role && pB.role !== '自由人') advB += 0.04;
    });
  });
  return { advA: advA - advB, advB: advB - advA };
}

function headToHead(teamA, teamB) {
  const recent = HISTORY_MATCHES.filter(m =>
    (m.teamA === teamA && m.teamB === teamB) ||
    (m.teamA === teamB && m.teamB === teamA)
  ).slice(-5);

  if (recent.length === 0) return { winsA: 0, winsB: 0, total: 0 };

  let winsA = 0, winsB = 0;
  recent.forEach(m => {
    if (m.teamA === teamA && m.scoreA > m.scoreB) winsA++;
    if (m.teamB === teamA && m.scoreB > m.scoreA) winsA++;
    if (m.teamA === teamB && m.scoreA > m.scoreB) winsB++;
    if (m.teamB === teamB && m.scoreB > m.scoreA) winsB++;
  });

  return { winsA, winsB, total: recent.length };
}

function predictMatch(teamAId, teamBId) {
  const sA = getTeamStrength(teamAId);
  const sB = getTeamStrength(teamBId);

  if (sA === 0 || sB === 0) return null;

  const baseRatioA = sA.score / (sA.score + sB.score);
  const baseRatioB = sB.score / (sA.score + sB.score);

  const duelDiff = (sA.duelistImpact - sB.duelistImpact) / 500;
  const role = roleAdvantage(TEAMS[teamAId], TEAMS[teamBId]);
  const h2h = headToHead(teamAId, teamBId);
  const h2hBoost = h2h.total > 0 ? ((h2h.winsA / h2h.total) - 0.5) * 0.06 : 0;

  let finalA = baseRatioA + duelDiff + role.advA + h2hBoost;
  let finalB = baseRatioB - duelDiff + role.advB - h2hBoost;

  const sum = finalA + finalB;
  finalA = Math.round((finalA / sum) * 1000) / 10;
  finalB = Math.round((finalB / sum) * 1000) / 10;

  const teamA = TEAMS[teamAId];
  const teamB = TEAMS[teamBId];

  const keyPlayers = {
    A: teamA.players
      .slice()
      .sort((a, b) => calcPlayerScore(b) - calcPlayerScore(a))
      .slice(0, 3)
      .map(p => ({ ...p, score: calcPlayerScore(p) })),
    B: teamB.players
      .slice()
      .sort((a, b) => calcPlayerScore(b) - calcPlayerScore(a))
      .slice(0, 3)
      .map(p => ({ ...p, score: calcPlayerScore(p) }))
  };

  const difference = Math.abs(finalA - finalB);
  let confidence = '势均力敌';
  if (difference > 25) confidence = '一边倒';
  else if (difference > 15) confidence = '明显优势';
  else if (difference > 8) confidence = '小幅优势';

  return {
    teamA: { id: teamAId, name: teamA.name, logo: teamA.logo, color: teamA.color, probability: finalA, strength: sA },
    teamB: { id: teamBId, name: teamB.name, logo: teamB.logo, color: teamB.color, probability: finalB, strength: sB },
    keyPlayers,
    confidence,
    winner: finalA >= finalB ? teamAId : teamBId,
    factors: {
      duelistDiff: duelDiff * 100,
      roleAdvantage: role.advA > 0 ? 'A克制B' : (role.advA < 0 ? 'B克制A' : '平衡'),
      h2h: h2h.total > 0 ? `${h2h.winsA}胜${h2h.winsB}负` : '无历史交锋'
    }
  };
}

// ============ 比分预测模型：确定性负二项分布 ============

function C(n, k) {
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  let r = 1;
  for (let i = 0; i < k; i++) r = r * (n - i) / (i + 1);
  return r;
}

function computeScoreMatrix(probA, format) {
  const target = format === 'BO5' ? 3 : 2;
  const p = probA / 100;
  const scores = [];

  for (let a = target; a >= 0; a--) {
    for (let b = target; b >= 0; b--) {
      if (a === b) continue;
      if (a < target && b < target) continue;
      if (a >= target && b >= target) continue;

      let prob;
      if (a >= target) {
        const k = target;
        const remaining = b;
        prob = C(k + remaining - 1, remaining) * Math.pow(p, k) * Math.pow(1 - p, remaining);
      } else {
        const k = target;
        const remaining = a;
        prob = C(k + remaining - 1, remaining) * Math.pow(1 - p, k) * Math.pow(p, remaining);
      }

      scores.push({
        scoreA: a,
        scoreB: b,
        prob: Math.max(prob, 0),
        winner: a > b ? 'A' : 'B'
      });
    }
  }

  const total = scores.reduce((s, x) => s + x.prob, 0);
  scores.forEach(x => { x.pct = Math.round(x.prob / total * 1000) / 10; });

  scores.sort((x, y) => y.prob - x.prob);
  return scores;
}

function predictScore(probA, format) {
  const matrix = computeScoreMatrix(probA, format);
  if (matrix.length === 0) return null;

  const primary = matrix[0];

  const topByWinner = { A: [], B: [] };
  matrix.forEach(s => topByWinner[s.winner].push(s));

  const secondary = [];
  if (topByWinner[primary.winner].length >= 2) {
    secondary.push(topByWinner[primary.winner][1]);
  }
  const otherWinner = primary.winner === 'A' ? 'B' : 'A';
  if (topByWinner[otherWinner].length > 0) {
    secondary.push(topByWinner[otherWinner][0]);
  }

  const display = [primary, ...secondary]
    .filter((s, i, arr) => arr.findIndex(t => t.scoreA === s.scoreA && t.scoreB === s.scoreB) === i)
    .slice(0, 2);

  return {
    format,
    primary: `${primary.scoreA}:${primary.scoreB}`,
    primaryPct: primary.pct,
    options: display.map(s => ({
      score: `${s.scoreA}:${s.scoreB}`,
      pct: s.pct,
      winner: s.winner,
      isPrimary: s === primary
    })),
    matrix: matrix
  };
}

function generatePredictions() {
  return UPCOMING_MATCHES.map(m => {
    const pred = predictMatch(m.teamA, m.teamB);
    if (pred && m.format) {
      pred.scorePrediction = predictScore(pred.teamA.probability, m.format);
    }
    return { ...m, prediction: pred };
  });
}
