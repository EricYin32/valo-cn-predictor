// 主应用逻辑：渲染 + 自动更新

const STORAGE_KEY = 'valo_cn_predictor_state';

function loadState() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
  catch { return {}; }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getLastUpdate() {
  const s = loadState();
  return s.lastUpdate || null;
}

function shouldAutoUpdate() {
  const s = loadState();
  if (!s.lastUpdate) return true;
  const now = new Date();
  const last = new Date(s.lastUpdate);
  return now.getDate() !== last.getDate();
}

function storeCurrentUpdate() {
  const now = new Date().toISOString();
  const state = loadState();
  state.lastUpdate = now;
  saveState(state);
  return now;
}

function formatDateTime(dt) {
  const d = new Date(dt);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
}

function relativeTime(dt) {
  const now = new Date();
  const target = new Date(dt);
  const diff = target - now;
  if (diff < 0) return '已结束';
  const hours = Math.floor(diff / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  if (hours >= 24) return `${Math.floor(hours/24)}天${hours%24}小时后`;
  if (hours >= 1) return `${hours}小时${mins}分后`;
  return `${mins}分钟后`;
}

function isTBD(match) {
  return match.teamA === 'TBD' || match.teamB === 'TBD';
}

function renderLogo(logo, fallback) {
  if (!logo || logo === '❓') {
    return fallback || '❓';
  }
  const isImgPath = /^(https?:)?\/?(\.\/)?[^"'<>]+\.(png|jpe?g|gif|webp|svg|ico)(\?.*)?$/i.test(logo);
  if (isImgPath) {
    return `<img src="${logo}" loading="lazy" alt="team logo" onerror="this.style.display='none'; this.parentNode.innerHTML='❓';">`;
  }
  return logo;
}

function renderStatusBar() {
  const last = getLastUpdate();
  const nextUpdate = getNextTargetTime();
  document.getElementById('statusBar').innerHTML = `
    <div><span class="dot"></span>${SEASON} VCT CN ${STAGE} · 数据源: 腾讯VCT + Liquipedia</div>
    <div>上次更新: ${last ? formatDateTime(last) : '首次加载'}</div>
    <div>下次自动更新: ${nextUpdate}</div>
  `;
}

function getNextTargetTime() {
  const now = new Date();
  const target = new Date(now);
  target.setHours(23, 59, 0, 0);
  if (now >= target) target.setDate(target.getDate() + 1);
  return formatDateTime(target);
}

function switchTab(tabName) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tabName));
  document.querySelectorAll('.section').forEach(s => s.classList.toggle('active', s.id === tabName));
}

function renderPredictions() {
  const container = document.getElementById('predictionsList');
  const predictions = generatePredictions();

  let html = '';
  let realCount = 0;

  predictions.forEach(m => {
    if (isTBD(m)) {
      html += `
        <div class="card" style="opacity: 0.7; border-style: dashed;">
          <div class="match-header">
            <span class="match-tournament">🏆 ${m.tournament || 'VCT CN'}</span>
            <span class="match-date">📅 ${m.date}</span>
          </div>
          <div class="teams-row">
            <div class="team-block">
              <div class="team-logo" style="background: rgba(255,255,255,0.08); border: 2px dashed rgba(255,255,255,0.2);">❓</div>
              <div><div class="team-name">TBD</div><div class="team-tag">待定</div></div>
            </div>
            <div class="vs-badge">VS</div>
            <div class="team-block right">
              <div class="team-logo" style="background: rgba(255,255,255,0.08); border: 2px dashed rgba(255,255,255,0.2);">❓</div>
              <div><div class="team-name">TBD</div><div class="team-tag">待定</div></div>
            </div>
          </div>
          <div class="maps-list">
            <span class="map-tag">⏳ 等待上一轮决出胜者</span>
          </div>
        </div>
      `;
      return;
    }

    if (!m.prediction) return;
    realCount++;
    const p = m.prediction;
    const [probA, probB] = [p.teamA.probability, p.teamB.probability];
    const noteHtml = m.note ? `<div style="margin-top:10px; padding:8px 12px; background:rgba(255,140,66,0.1); border-radius:6px; font-size:0.8em; color:#ff8c42;">💡 ${m.note}</div>` : '';

    html += `
      <div class="card">
        <div class="match-header">
          <span class="match-tournament">🏆 ${m.tournament || 'VCT CN'}</span>
          <span class="match-date">📅 ${m.date} · ${relativeTime(m.date)}</span>
        </div>
        <div class="teams-row">
          <div class="team-block">
            <div class="team-logo" style="background: ${p.teamA.color}20; border: 2px solid ${p.teamA.color}60;">${renderLogo(p.teamA.logo)}</div>
            <div>
              <div class="team-name">${p.teamA.id}</div>
              <div class="team-tag">${p.teamA.name}</div>
            </div>
          </div>
          <div class="vs-badge">VS</div>
          <div class="team-block right">
            <div class="team-logo" style="background: ${p.teamB.color}20; border: 2px solid ${p.teamB.color}60;">${renderLogo(p.teamB.logo)}</div>
            <div>
              <div class="team-name">${p.teamB.id}</div>
              <div class="team-tag">${p.teamB.name}</div>
            </div>
          </div>
        </div>
        <div class="prediction-bar" style="margin-top: 18px;">
          <div class="prediction-fill A" style="width: ${probA}%; background: ${p.teamA.color};">${probA}%</div>
          <div class="prediction-fill B" style="width: ${probB}%; background: ${p.teamB.color};">${probB}%</div>
          <span class="confidence-label" style="left: 50%; transform: translateX(-50%);">${p.confidence}</span>
        </div>
        ${p.scorePrediction ? `
        <div class="score-prediction">
          <div class="score-title">🎯 预测比分 <span class="format-badge">${p.scorePrediction.format}</span></div>
          <div class="score-main">
            <div class="score-box primary" style="border-color: ${p.winner === p.teamA.id ? p.teamA.color : p.teamB.color};">
              <div class="score-numbers" style="color: ${p.winner === p.teamA.id ? p.teamA.color : p.teamB.color};">${p.scorePrediction.primary}</div>
              <div class="score-label">最可能 · ${p.scorePrediction.primaryPct}%</div>
            </div>
            ${p.scorePrediction.options.filter(o => !o.isPrimary).map(o => `
              <div class="score-box secondary">
                <div class="score-numbers">${o.score}</div>
                <div class="score-label">备选 · ${o.pct}%</div>
              </div>
            `).join('')}
          </div>
        </div>` : ''}
        <div class="maps-list">
          ${(m.maps || []).map(map => `<span class="map-tag">🗺️ ${map}</span>`).join('')}
        </div>
        ${noteHtml}
        <button class="details-toggle" onclick="toggleDetails(this)">▼ 查看详细预测因子</button>
        <div class="details-panel">
          <div class="factors-row">
            <div class="factor-box">
              <span class="label">⚔️ 生死将对决差值</span>
              <span class="value" style="color: ${p.factors.duelistDiff >= 0 ? '#ff8c8c' : '#64ffda'};">
                ${p.factors.duelistDiff >= 0 ? p.teamA.id : p.teamB.id} +${Math.abs(p.factors.duelistDiff).toFixed(1)}%
              </span>
            </div>
            <div class="factor-box">
              <span class="label">🎯 位置克制关系</span>
              <span class="value">${p.factors.roleAdvantage}</span>
            </div>
            <div class="factor-box">
              <span class="label">📊 历史交锋</span>
              <span class="value">${p.factors.h2h}</span>
            </div>
          </div>
          <div class="players-grid">
            <div class="players-column">
              <h4>🔴 ${p.teamA.id} 核心选手</h4>
              ${p.keyPlayers.A.map(k => `
                <div class="player-item">
                  <div class="player-info">
                    <span class="player-role role-${k.role}">${k.role}</span>
                    <span>${k.nickname}</span>
                  </div>
                  <span class="player-stats">ACS:${k.acs} · K:${k.kpr.toFixed(2)} · R:${k.rating}</span>
                </div>
              `).join('')}
            </div>
            <div class="players-column">
              <h4>🔵 ${p.teamB.id} 核心选手</h4>
              ${p.keyPlayers.B.map(k => `
                <div class="player-item">
                  <div class="player-info">
                    <span class="player-role role-${k.role}">${k.role}</span>
                    <span>${k.nickname}</span>
                  </div>
                  <span class="player-stats">ACS:${k.acs} · K:${k.kpr.toFixed(2)} · R:${k.rating}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  });

  if (realCount === 0 && predictions.length > 0) {
    html = `<div style="text-align:center; padding:60px; color:#8892b0;">⏳ 下一轮对阵尚未决出，请关注败者组比赛...</div>` + html;
  }

  container.innerHTML = html;
}

function renderHistory() {
  const container = document.getElementById('historyList');
  const history = [...HISTORY_MATCHES].reverse();

  container.innerHTML = history.map(m => {
    const teamA = TEAMS[m.teamA];
    const teamB = TEAMS[m.teamB];
    if (!teamA || !teamB) return '';
    const wonA = m.scoreA > m.scoreB;
    const noteHtml = m.note ? `<div style="margin-top:8px; font-size:0.8em; color:#ff8c42;">💡 ${m.note}</div>` : '';
    const mvpHtml = m.mvp ? `<div style="margin-top:8px; font-size:0.8em; color:#64ffda;">🏆 ${m.mvp}</div>` : '';
    return `
      <div class="card">
        <div class="match-header">
          <span class="match-tournament">🏆 ${m.tournament || 'VCT CN'}</span>
          <span class="match-date">📅 ${m.date}</span>
        </div>
        <div class="teams-row">
          <div class="team-block">
            <div class="team-logo" style="background: ${teamA.color}20; border: 2px solid ${teamA.color}60;">${renderLogo(teamA.logo)}</div>
            <div>
              <div class="team-name">${teamA.id}</div>
              <div class="team-tag">${teamA.name}</div>
            </div>
          </div>
          <div class="score">
            <span class="${wonA ? 'win' : 'lose'}">${m.scoreA}</span>
            <span style="color:#8892b0; margin: 0 6px;">:</span>
            <span class="${!wonA ? 'win' : 'lose'}">${m.scoreB}</span>
          </div>
          <div class="team-block right">
            <div class="team-logo" style="background: ${teamB.color}20; border: 2px solid ${teamB.color}60;">${renderLogo(teamB.logo)}</div>
            <div>
              <div class="team-name">${teamB.id}</div>
              <div class="team-tag">${teamB.name}</div>
            </div>
          </div>
        </div>
        <div class="maps-list">
          ${m.maps.map(map => `<span class="map-tag">🗺️ ${map}</span>`).join('')}
        </div>
        ${noteHtml}
        ${mvpHtml}
      </div>
    `;
  }).join('');
}

function renderTeams() {
  const container = document.getElementById('teamsList');
  container.innerHTML = Object.values(TEAMS).map(team => {
    const winColor = team.winRate >= 60 ? '#00ffa3' : (team.winRate >= 50 ? '#ffc740' : '#ff8c8c');
    const highlightsHtml = team.highlights ? `<div style="font-size:0.72em; color:#ff8c42; margin-bottom:6px;">📌 ${team.highlights}</div>` : '';
    return `
      <div class="team-card">
        <div class="team-card-header">
          <div class="team-badge" style="background: ${team.color}20; border: 2px solid ${team.color}60;">${renderLogo(team.logo)}</div>
          <div>
            <div class="team-name">${team.id}</div>
            <div class="team-tagline">${team.name} · CN赛区</div>
          </div>
        </div>
        ${highlightsHtml}
        <div style="display:flex; justify-content:space-between; font-size:0.85em;">
          <span>总胜率 <strong style="color:${winColor}">${team.winRate}%</strong></span>
          <span>地图胜率 <strong>${team.mapWinRate}%</strong></span>
        </div>
        <div class="winrate-bar"><div class="winrate-fill" style="width: ${team.winRate}%; background: ${winColor};"></div></div>
        <div style="font-size: 0.75em; color: #8892b0; margin-bottom: 8px;">主教练: ${team.coach}</div>
        ${team.players.map(p => `
          <div class="player-mini">
            <span><span class="player-role role-${p.role}" style="font-size:0.65em; padding:1px 5px;">${p.role}</span> ${p.nickname}</span>
            <span>${p.rating} · ACS ${p.acs}</span>
          </div>
        `).join('')}
      </div>
    `;
  }).join('');
}

function toggleDetails(btn) {
  const panel = btn.nextElementSibling;
  panel.classList.toggle('open');
  btn.textContent = panel.classList.contains('open') ? '▲ 收起详细预测因子' : '▼ 查看详细预测因子';
}

function refreshAll() {
  renderPredictions();
  renderHistory();
  renderTeams();
  storeCurrentUpdate();
  renderStatusBar();
}

function scheduleDailyUpdate() {
  const check = () => {
    const now = new Date();
    if (now.getHours() === 23 && now.getMinutes() >= 59) {
      refreshAll();
    }
  };
  setInterval(check, 30000);
}

document.addEventListener('DOMContentLoaded', () => {
  refreshAll();
  if (shouldAutoUpdate()) storeCurrentUpdate();
  scheduleDailyUpdate();
});
