// VCT CN 2026 数据 - 第二赛段季后赛
// 数据来源: vlr.gg Play-Ins 官方阵容 (2026-08-12) + fooshya.com + Liquipedia + 狼队/NOVA微博
// 更新日期: 2026-08-18 (全量自查: 12队选手/教练/转会/队名)
// 关键修正:
//   - NOVA: qiutiaN从教练改回选手(cb回归), alexRr跳槽WOL后OnbusH接任教练
//   - BLG: Muggle下课→韩籍教练Anaks接任, Muggle去TEC当瞄准教练
//   - FPX: KovaQ从教练改回选手(加入AAAAY/coconut/Xlele/Setrod), LEGIJA(塞尔维亚)是主教练
//   - WOL: jungleDSL→alexRr(前NOVA教练), Deryeon新加坡外援+aluba回归+nothing青训提拔
//   - XLG: W1ngFly→hvoya
//   - TE→TRC Trace Esports: 队伍key修正, HISTORY_MATCHES 7处TE→TRC
//   - Haodong确认在TEC(2024.10从EDG转会), Flex1n仍在DRG(未转会)
//   - 最终核查补全: NOVA加Jrz10(替补决斗), TYL加JJ(替补), BLG加Jemmy(顶替tvirusLuke), FPX加Setrod(替补), DRG教练jm2e→yuLun, WOL修正为真实阵容

const SEASON = '2026';
const STAGE = '第二赛段 · 季后赛';

// 地图池（2026版本：新增Summit、天枢云阙；移除Bind、Split、Breeze、Fracture、Pearl）
const MAPS_2026 = ['Ascent', 'Haven', 'Lotus', 'Sunset', 'Summit', '天枢云阙', '幽邃地窟'];

// vlr.gg China Rank (2026-08): XLG#1 NOVA#2 EDG#3 BLG#4 TYL#5 AG#6 JDG#8 DRG#11 TEC#12 TRC#13 FPX#17 WOL
const TEAMS = {
  XLG: {
    id: 'XLG', name: 'Xi Lai Gaming', logo: './images/XLG.png',
    color: '#9B5DE5', region: 'CN',
    coach: 'hvoya',
    highlights: '2026启点赛亚军 / 第一赛段亚军 / 第二赛段排名#1 / 稳定班底',
    winRate: 70, mapWinRate: 62, pistolWinRate: 58,
    players: [
      { nickname: 'Rarga', role: '决斗', roleEn: 'Duelist', rating: 1.16, acs: 242, adr: 154, kast: 0.70, kpr: 0.85, apr: 0.18, hs: 0.34, kills: 745, deaths: 632, assists: 158, heroPool: ['霓虹','夜露','捷风','雷兹'] },
      { nickname: 'happywei', role: '先锋', roleEn: 'Initiator', rating: 1.04, acs: 187, adr: 126, kast: 0.73, kpr: 0.66, apr: 0.28, hs: 0.30, kills: 412, deaths: 425, assists: 186, heroPool: ['猎枭','黑梦','钛狐','斯凯'] },
      { nickname: 'NoMan', role: '控场', roleEn: 'Controller', rating: 1.10, acs: 224, adr: 148, kast: 0.76, kpr: 0.79, apr: 0.36, hs: 0.33, kills: 478, deaths: 389, assists: 235, heroPool: ['蝰蛇','幽影','星礈','炼狱'] },
      { nickname: 'Lysoar', role: '哨卫', roleEn: 'Sentinel', rating: 1.03, acs: 182, adr: 120, kast: 0.74, kpr: 0.63, apr: 0.39, hs: 0.25, kills: 265, deaths: 286, assists: 189, heroPool: ['索尔','铁臂','K/O','盖可'] },
      { nickname: 'Sharks', role: '自由人', roleEn: 'Flex', rating: 1.00, acs: 176, adr: 116, kast: 0.72, kpr: 0.62, apr: 0.26, hs: 0.27, kills: 298, deaths: 325, assists: 138, heroPool: ['雷兹','霓虹','猎枭','夜露'] },
      { nickname: 'WsLeo', role: '自由人', roleEn: 'Flex', rating: 0.99, acs: 174, adr: 115, kast: 0.71, kpr: 0.61, apr: 0.24, hs: 0.26, kills: 285, deaths: 318, assists: 132, heroPool: ['雷兹','夜露','猎枭','霓虹'] }
    ]
  },
  NOVA: {
    id: 'NOVA', name: 'Nova Esports', logo: './images/NOVA.png',
    color: '#4CC9F0', region: 'CN',
    coach: 'OnbusH',
    highlights: '2026进化者第二幕冠军 / 第二赛段5-0完美收官排名#2 / qiutiaN回归+cb回归 / swagzor爆发',
    winRate: 68, mapWinRate: 61, pistolWinRate: 55,
    players: [
      { nickname: 'qiutiaN', role: '自由人', roleEn: 'Flex', rating: 1.05, acs: 195, adr: 128, kast: 0.75, kpr: 0.68, apr: 0.38, hs: 0.27, kills: 452, deaths: 418, assists: 286, heroPool: ['幽影','蝰蛇','星礈','炼狱'] },
      { nickname: 'cb', role: '决斗', roleEn: 'Duelist', rating: 1.14, acs: 236, adr: 152, kast: 0.72, kpr: 0.83, apr: 0.20, hs: 0.30, kills: 445, deaths: 398, assists: 118, heroPool: ['霓虹','夜露','捷风','雷兹'] },
      { nickname: 'GuanG', role: '先锋', roleEn: 'Initiator', rating: 1.10, acs: 198, adr: 132, kast: 0.76, kpr: 0.68, apr: 0.42, hs: 0.28, kills: 428, deaths: 395, assists: 286, heroPool: ['猎枭','黑梦','钛狐','斯凯'] },
      { nickname: 'Ezeir', role: '控场', roleEn: 'Controller', rating: 1.12, acs: 222, adr: 145, kast: 0.77, kpr: 0.77, apr: 0.44, hs: 0.26, kills: 445, deaths: 418, assists: 298, heroPool: ['幽影','星礈','炼狱','蝰蛇'] },
      { nickname: 'swagzor', role: '哨卫', roleEn: 'Sentinel', rating: 1.08, acs: 196, adr: 130, kast: 0.76, kpr: 0.67, apr: 0.42, hs: 0.26, kills: 412, deaths: 389, assists: 256, heroPool: ['索尔','铁臂','K/O','盖可'] },
      { nickname: 'Jrz10', role: '决斗', roleEn: 'Duelist', rating: 1.02, acs: 205, adr: 138, kast: 0.71, kpr: 0.75, apr: 0.15, hs: 0.28, kills: 185, deaths: 198, assists: 38, heroPool: ['霓虹','夜露','捷风'] }
    ]
  },
  EDG: {
    id: 'EDG', name: 'Edward Gaming', logo: './images/EDG.png',
    color: '#0066FF', region: 'CN',
    coach: 'Autumn',
    highlights: '2026第一赛段冠军 / Smoggy FMVP / 启点赛败者组冠军 / vlr.gg排名#3 / 已获Champions积分',
    winRate: 65, mapWinRate: 58, pistolWinRate: 54,
    players: [
      { nickname: 'ZmjjKK', role: '决斗', roleEn: 'Duelist', rating: 1.25, acs: 254, adr: 162, kast: 0.73, kpr: 0.90, apr: 0.22, hs: 0.24, kills: 1088, deaths: 902, assists: 276, heroPool: ['霓虹','捷风','夜露','雷兹','壹决'] },
      { nickname: 'nobody', role: '先锋', roleEn: 'Initiator', rating: 1.14, acs: 201, adr: 136, kast: 0.74, kpr: 0.72, apr: 0.25, hs: 0.32, kills: 798, deaths: 720, assists: 268, heroPool: ['猎枭','钛狐','黑梦','斯凯'] },
      { nickname: 'Smoggy', role: '控场', roleEn: 'Controller', rating: 1.16, acs: 221, adr: 145, kast: 0.79, kpr: 0.80, apr: 0.39, hs: 0.35, kills: 856, deaths: 688, assists: 401, heroPool: ['幽影','星礈','蝰蛇','暮蝶'] },
      { nickname: 'Jieni7', role: '哨卫', roleEn: 'Sentinel', rating: 1.05, acs: 186, adr: 124, kast: 0.75, kpr: 0.66, apr: 0.36, hs: 0.27, kills: 312, deaths: 305, assists: 218, heroPool: ['钱博尔','幽影','铁臂','K/O'] },
      { nickname: 'CHICHOO', role: '自由人', roleEn: 'Flex', rating: 1.02, acs: 182, adr: 120, kast: 0.73, kpr: 0.64, apr: 0.30, hs: 0.28, kills: 298, deaths: 312, assists: 168, heroPool: ['雷兹','夜露','猎枭','蝰蛇'] }
    ]
  },
  BLG: {
    id: 'BLG', name: 'Bilibili Gaming', logo: './images/BLG.png',
    color: '#FF6B35', region: 'CN',
    coach: 'Anaks',
    highlights: '2026进化者冠军班底 / Muggle下课转投TEC当瞄准教练 / 韩籍教练Anaks接手 / FT从青训提拔 / vlr.gg排名#4',
    winRate: 63, mapWinRate: 57, pistolWinRate: 53,
    players: [
      { nickname: 'whzy', role: '决斗', roleEn: 'Duelist', rating: 1.20, acs: 248, adr: 158, kast: 0.72, kpr: 0.87, apr: 0.21, hs: 0.28, kills: 986, deaths: 856, assists: 268, heroPool: ['霓虹','雷兹','夜露','捷风'] },
      { nickname: 'Knight', role: '先锋', roleEn: 'Initiator', rating: 1.16, acs: 203, adr: 134, kast: 0.76, kpr: 0.72, apr: 0.29, hs: 0.26, kills: 845, deaths: 756, assists: 368, heroPool: ['猎枭','黑梦','钛狐','斯凯'] },
      { nickname: 'yilai', role: '控场', roleEn: 'Controller', rating: 1.08, acs: 208, adr: 140, kast: 0.74, kpr: 0.75, apr: 0.29, hs: 0.30, kills: 358, deaths: 332, assists: 165, heroPool: ['蝰蛇','暮蝶','幽影','炼狱'] },
      { nickname: 'nephh', role: '哨卫', roleEn: 'Sentinel', rating: 1.08, acs: 199, adr: 129, kast: 0.80, kpr: 0.70, apr: 0.52, hs: 0.25, kills: 588, deaths: 545, assists: 452, heroPool: ['铁臂','K/O','盖可'] },
      { nickname: 'rushia', role: '自由人', roleEn: 'Flex', rating: 1.02, acs: 184, adr: 122, kast: 0.74, kpr: 0.65, apr: 0.32, hs: 0.27, kills: 325, deaths: 338, assists: 162, heroPool: ['钱博尔','雷兹','猎枭','蝰蛇'] },
      { nickname: 'FT', role: '自由人', roleEn: 'Flex', rating: 1.00, acs: 178, adr: 118, kast: 0.72, kpr: 0.63, apr: 0.29, hs: 0.26, kills: 512, deaths: 520, assists: 238, heroPool: ['雷兹','霓虹','猎枭','蝰蛇'] },
      { nickname: 'bud', role: '自由人', roleEn: 'Flex', rating: 0.98, acs: 172, adr: 114, kast: 0.70, kpr: 0.61, apr: 0.25, hs: 0.25, kills: 285, deaths: 308, assists: 148, heroPool: ['雷兹','夜露','猎枭','霓虹'] },
      { nickname: 'Jemmy', role: '哨卫', roleEn: 'Sentinel', rating: 0.96, acs: 170, adr: 112, kast: 0.72, kpr: 0.60, apr: 0.30, hs: 0.26, kills: 156, deaths: 168, assists: 85, heroPool: ['铁臂','K/O','盖可'] }
    ]
  },
  TYL: {
    id: 'TYL', name: 'TYLOO', logo: './images/TYL.png',
    color: '#FF5733', region: 'CN',
    coach: 'splash',
    highlights: '第二赛段最大黑马 -sword9转教练 +SiuFatBB归来 / 连续击败EDG/JDG/FPX / vlr.gg排名#5',
    winRate: 60, mapWinRate: 54, pistolWinRate: 52,
    players: [
      { nickname: 'SiuFatBB', role: '决斗', roleEn: 'Duelist', rating: 1.17, acs: 241, adr: 156, kast: 0.73, kpr: 0.86, apr: 0.21, hs: 0.31, kills: 412, deaths: 376, assists: 108, heroPool: ['霓虹','夜露','捷风','雷兹'] },
      { nickname: 'slowly', role: '先锋', roleEn: 'Initiator', rating: 1.02, acs: 183, adr: 122, kast: 0.72, kpr: 0.64, apr: 0.26, hs: 0.29, kills: 325, deaths: 338, assists: 145, heroPool: ['猎枭','黑梦','钛狐','斯凯'] },
      { nickname: 'Erv', role: '控场', roleEn: 'Controller', rating: 1.05, acs: 208, adr: 138, kast: 0.75, kpr: 0.74, apr: 0.28, hs: 0.30, kills: 298, deaths: 289, assists: 138, heroPool: ['蝰蛇','幽影','炼狱','星礈'] },
      { nickname: 'Scales', role: '哨卫', roleEn: 'Sentinel', rating: 0.99, acs: 172, adr: 112, kast: 0.72, kpr: 0.62, apr: 0.26, hs: 0.24, kills: 215, deaths: 228, assists: 98, heroPool: ['索尔','铁臂','K/O'] },
      { nickname: 'xihe', role: '自由人', roleEn: 'Flex', rating: 0.98, acs: 170, adr: 110, kast: 0.70, kpr: 0.60, apr: 0.24, hs: 0.26, kills: 225, deaths: 248, assists: 102, heroPool: ['雷兹','夜露','猎枭','霓虹'] },
      { nickname: 'JJ', role: '自由人', roleEn: 'Flex', rating: 0.90, acs: 160, adr: 104, kast: 0.68, kpr: 0.58, apr: 0.22, hs: 0.24, kills: 142, deaths: 158, assists: 62, heroPool: ['雷兹','夜露','猎枭'] }
    ]
  },
  AG: {
    id: 'AG', name: 'All Gamers', logo: './images/AG.png',
    color: '#F72585', region: 'CN',
    coach: 'ED101',
    highlights: '2026启点赛冠军（圣地亚哥大师赛）/ 第二赛段排名#6 / 入围赛击败TEC晋级',
    winRate: 52, mapWinRate: 48, pistolWinRate: 49,
    players: [
      { nickname: 'f4ngeer', role: '决斗', roleEn: 'Duelist', rating: 1.19, acs: 240, adr: 155, kast: 0.75, kpr: 0.87, apr: 0.22, hs: 0.28, kills: 525, deaths: 445, assists: 148, heroPool: ['霓虹','夜露','捷风','雷兹'] },
      { nickname: 'Shr1mp', role: '先锋', roleEn: 'Initiator', rating: 0.99, acs: 196, adr: 128, kast: 0.75, kpr: 0.70, apr: 0.30, hs: 0.29, kills: 358, deaths: 342, assists: 168, heroPool: ['猎枭','黑梦','钛狐','盖可'] },
      { nickname: 'K1ra', role: '控场', roleEn: 'Controller', rating: 1.06, acs: 210, adr: 138, kast: 0.76, kpr: 0.73, apr: 0.36, hs: 0.30, kills: 402, deaths: 398, assists: 215, heroPool: ['幽影','蝰蛇','星礈','炼狱'] },
      { nickname: 'Bai', role: '哨卫', roleEn: 'Sentinel', rating: 0.89, acs: 162, adr: 104, kast: 0.69, kpr: 0.58, apr: 0.33, hs: 0.24, kills: 168, deaths: 198, assists: 112, heroPool: ['索尔','铁臂','K/O'] },
      { nickname: 'iamgrq', role: '自由人', roleEn: 'Flex', rating: 0.94, acs: 168, adr: 108, kast: 0.70, kpr: 0.62, apr: 0.25, hs: 0.25, kills: 172, deaths: 186, assists: 85, heroPool: ['雷兹','夜露','猎枭','霓虹'] }
    ]
  },
  JDG: {
    id: 'JDG', name: 'JD Gaming', logo: './images/JDG.png',
    color: '#E63946', region: 'CN',
    coach: 'Billyo',
    highlights: '第二赛段大换血 -stew +BerLIN/crownfisher / vlr.gg排名#8',
    winRate: 48, mapWinRate: 44, pistolWinRate: 46,
    players: [
      { nickname: 'zhe', role: '决斗', roleEn: 'Duelist', rating: 1.10, acs: 228, adr: 150, kast: 0.72, kpr: 0.80, apr: 0.19, hs: 0.29, kills: 368, deaths: 332, assists: 92, heroPool: ['霓虹','夜露','捷风','雷兹'] },
      { nickname: 'BerLIN', role: '先锋', roleEn: 'Initiator', rating: 0.98, acs: 178, adr: 116, kast: 0.70, kpr: 0.62, apr: 0.28, hs: 0.26, kills: 286, deaths: 312, assists: 145, heroPool: ['猎枭','黑梦','钛狐'] },
      { nickname: 'jkuro', role: '控场', roleEn: 'Controller', rating: 0.96, acs: 172, adr: 112, kast: 0.69, kpr: 0.60, apr: 0.30, hs: 0.27, kills: 265, deaths: 298, assists: 158, heroPool: ['幽影','蝰蛇','炼狱','星礈'] },
      { nickname: 'crownfisher', role: '哨卫', roleEn: 'Sentinel', rating: 0.97, acs: 170, adr: 110, kast: 0.68, kpr: 0.59, apr: 0.26, hs: 0.26, kills: 192, deaths: 215, assists: 98, heroPool: ['索尔','铁臂','K/O'] },
      { nickname: 'Yuicaw', role: '自由人', roleEn: 'Flex', rating: 0.95, acs: 168, adr: 108, kast: 0.70, kpr: 0.60, apr: 0.23, hs: 0.26, kills: 178, deaths: 192, assists: 86, heroPool: ['雷兹','夜露','猎枭','霓虹'] }
    ]
  },
  DRG: {
    id: 'DRG', name: 'Dragon Ranger', logo: './images/DRG.png',
    color: '#06D6A0', region: 'CN',
    coach: 'yuLun',
    highlights: '第二赛段换血 +Flex1n +Verse +SpiritZ1 / vlr.gg排名#11',
    winRate: 46, mapWinRate: 43, pistolWinRate: 47,
    players: [
      { nickname: 'vo0kashu', role: '决斗', roleEn: 'Duelist', rating: 1.09, acs: 232, adr: 150, kast: 0.70, kpr: 0.80, apr: 0.21, hs: 0.35, kills: 412, deaths: 405, assists: 118, heroPool: ['夜露','芮娜','捷风','雷兹'] },
      { nickname: 'Nicc', role: '先锋', roleEn: 'Initiator', rating: 1.05, acs: 191, adr: 128, kast: 0.77, kpr: 0.66, apr: 0.49, hs: 0.33, kills: 725, deaths: 798, assists: 586, heroPool: ['铁臂','黑梦','K/O','盖可'] },
      { nickname: 'Verse', role: '控场', roleEn: 'Controller', rating: 0.93, acs: 176, adr: 115, kast: 0.68, kpr: 0.60, apr: 0.28, hs: 0.26, kills: 298, deaths: 335, assists: 145, heroPool: ['幽影','蝰蛇','炼狱','星礈'] },
      { nickname: 'Flex1n', role: '哨卫', roleEn: 'Sentinel', rating: 0.91, acs: 160, adr: 100, kast: 0.68, kpr: 0.57, apr: 0.30, hs: 0.23, kills: 198, deaths: 225, assists: 118, heroPool: ['索尔','铁臂','K/O'] },
      { nickname: 'Life', role: '自由人', roleEn: 'Flex', rating: 1.03, acs: 212, adr: 142, kast: 0.72, kpr: 0.74, apr: 0.26, hs: 0.35, kills: 368, deaths: 345, assists: 138, heroPool: ['捷风','雷兹','霓虹','夜露'] },
      { nickname: 'SpiritZ1', role: '自由人', roleEn: 'Flex', rating: 0.88, acs: 152, adr: 98, kast: 0.65, kpr: 0.55, apr: 0.20, hs: 0.24, kills: 168, deaths: 195, assists: 82, heroPool: ['雷兹','夜露','猎枭','霓虹'] }
    ]
  },
  TEC: {
    id: 'TEC', name: 'Titan Esports Club', logo: './images/TEC.png',
    color: '#4361EE', region: 'CN',
    coach: 'AfteR',
    highlights: '2026休赛期重磅签入Haodong(EDG) + AfteR(原EDG教练) / TvirusLuke/Abo已离队 / vlr.gg排名#12',
    winRate: 45, mapWinRate: 42, pistolWinRate: 44,
    players: [
      { nickname: 'Dynamite', role: '决斗', roleEn: 'Duelist', rating: 1.06, acs: 220, adr: 144, kast: 0.69, kpr: 0.78, apr: 0.19, hs: 0.28, kills: 286, deaths: 278, assists: 82, heroPool: ['霓虹','雷兹','夜露','捷风'] },
      { nickname: 'lucas', role: '先锋', roleEn: 'Initiator', rating: 0.96, acs: 188, adr: 126, kast: 0.70, kpr: 0.63, apr: 0.28, hs: 0.25, kills: 312, deaths: 345, assists: 148, heroPool: ['猎枭','黑梦','钛狐','斯凯'] },
      { nickname: 'Coco', role: '控场', roleEn: 'Controller', rating: 0.97, acs: 190, adr: 128, kast: 0.71, kpr: 0.66, apr: 0.35, hs: 0.28, kills: 248, deaths: 255, assists: 148, heroPool: ['幽影','蝰蛇','炼狱','星礈'] },
      { nickname: 'Haodong', role: '哨卫', roleEn: 'Sentinel', rating: 1.06, acs: 190, adr: 130, kast: 0.76, kpr: 0.69, apr: 0.36, hs: 0.28, kills: 672, deaths: 658, assists: 351, heroPool: ['钱博尔','索尔','铁臂','K/O'] },
      { nickname: 'ra1ny', role: '自由人', roleEn: 'Flex', rating: 0.95, acs: 178, adr: 116, kast: 0.72, kpr: 0.62, apr: 0.32, hs: 0.27, kills: 195, deaths: 208, assists: 128, heroPool: ['雷兹','夜露','猎枭','霓虹'] }
    ]
  },
  WOL: {
    id: 'WOL', name: 'Wolves', logo: './images/WOL.png',
    color: '#7209B7', region: 'CN',
    coach: 'alexRr',
    highlights: '2025圣地亚哥大师赛季军 / SiuFatBB转会TYL / jowa离队 / aluba回归任IGL / Deryeon新加坡外援加盟 / nothing从青训提拔 / vlr.gg排名#10-12',
    winRate: 42, mapWinRate: 40, pistolWinRate: 43,
    players: [
      { nickname: 'Deryeon', role: '决斗', roleEn: 'Duelist', rating: 1.03, acs: 226, adr: 150, kast: 0.72, kpr: 0.79, apr: 0.20, hs: 0.28, kills: 412, deaths: 385, assists: 138, heroPool: ['霓虹','夜露','捷风','雷兹'] },
      { nickname: 'yosemite', role: '先锋', roleEn: 'Initiator', rating: 0.87, acs: 162, adr: 108, kast: 0.66, kpr: 0.58, apr: 0.26, hs: 0.25, kills: 198, deaths: 225, assists: 98, heroPool: ['猎枭','黑梦','钛狐','斯凯'] },
      { nickname: 'Spring', role: '控场', roleEn: 'Controller', rating: 0.94, acs: 196, adr: 130, kast: 0.72, kpr: 0.72, apr: 0.38, hs: 0.27, kills: 298, deaths: 298, assists: 182, heroPool: ['蝰蛇','星礈','幽影','炼狱'] },
      { nickname: 'glacier', role: '哨卫', roleEn: 'Sentinel', rating: 0.98, acs: 176, adr: 114, kast: 0.69, kpr: 0.62, apr: 0.17, hs: 0.36, kills: 286, deaths: 298, assists: 21, heroPool: ['索尔','铁臂','K/O','盖可'] },
      { nickname: 'aluba', role: '自由人', roleEn: 'Flex', rating: 0.80, acs: 152, adr: 100, kast: 0.64, kpr: 0.50, apr: 0.17, hs: 0.21, kills: 198, deaths: 275, assists: 76, heroPool: ['雷兹','夜露','猎枭','霓虹'] }
    ]
  },
  FPX: {
    id: 'FPX', name: 'FunPlus Phoenix', logo: './images/FPX.png',
    color: '#FF9F1C', region: 'CN',
    coach: 'LEGIJA',
    highlights: 'vlr.gg排名#17 / 第二赛段5-0 / BerLIN离队+Ben1ley离队 / Xlele+coconut+KovaQ重建',
    winRate: 40, mapWinRate: 38, pistolWinRate: 41,
    players: [
      { nickname: 'AAAAY', role: '决斗', roleEn: 'Duelist', rating: 0.96, acs: 216, adr: 140, kast: 0.67, kpr: 0.71, apr: 0.22, hs: 0.28, kills: 325, deaths: 325, assists: 118, heroPool: ['捷风','霓虹','夜露','雷兹','不死鸟'] },
      { nickname: 'coconut', role: '先锋', roleEn: 'Initiator', rating: 0.97, acs: 184, adr: 125, kast: 0.71, kpr: 0.68, apr: 0.23, hs: 0.43, kills: 248, deaths: 238, assists: 86, heroPool: ['猎枭','盖可','黑梦','钛狐'] },
      { nickname: 'Xlele', role: '控场', roleEn: 'Controller', rating: 0.96, acs: 188, adr: 128, kast: 0.70, kpr: 0.69, apr: 0.28, hs: 0.30, kills: 278, deaths: 245, assists: 102, heroPool: ['蝰蛇','暮蝶','幽影','炼狱'] },
      { nickname: 'KovaQ', role: '哨卫', roleEn: 'Sentinel', rating: 0.89, acs: 160, adr: 102, kast: 0.67, kpr: 0.59, apr: 0.21, hs: 0.24, kills: 188, deaths: 195, assists: 98, heroPool: ['铁臂','钱博尔','K/O','盖可'] },
      { nickname: 'Setrod', role: '自由人', roleEn: 'Flex', rating: 0.90, acs: 164, adr: 106, kast: 0.68, kpr: 0.61, apr: 0.22, hs: 0.25, kills: 195, deaths: 182, assists: 108, heroPool: ['铁臂','雷兹','夜露','猎枭'] }
    ]
  },
  TRC: {
    id: 'TRC', name: 'Trace Esports', logo: './images/TRC.png',
    color: '#1D9BF0', region: 'CN',
    coach: 'Xu',
    highlights: '全英文名队Trace Esports / 第二赛段0-5小组赛后入围赛表现惊艳 / deLb FK:FD 14:1传奇数据 / vlr.gg排名#13',
    winRate: 32, mapWinRate: 30, pistolWinRate: 43,
    players: [
      { nickname: 'Kai', role: '决斗', roleEn: 'Duelist', rating: 1.05, acs: 238, adr: 154, kast: 0.70, kpr: 0.85, apr: 0.18, hs: 0.29, kills: 412, deaths: 378, assists: 105, heroPool: ['夜露','霓虹','捷风','雷兹'] },
      { nickname: 'LuoK1ng', role: '先锋', roleEn: 'Initiator', rating: 0.88, acs: 152, adr: 100, kast: 0.64, kpr: 0.52, apr: 0.22, hs: 0.23, kills: 195, deaths: 248, assists: 98, heroPool: ['猎枭','黑梦','钛狐','斯凯'] },
      { nickname: 'FengF', role: '控场', roleEn: 'Controller', rating: 0.91, acs: 164, adr: 108, kast: 0.65, kpr: 0.58, apr: 0.28, hs: 0.25, kills: 208, deaths: 255, assists: 118, heroPool: ['幽影','蝰蛇','炼狱','星礈'] },
      { nickname: 'FKEY', role: '哨卫', roleEn: 'Sentinel', rating: 0.89, acs: 154, adr: 98, kast: 0.66, kpr: 0.52, apr: 0.28, hs: 0.20, kills: 185, deaths: 235, assists: 105, heroPool: ['索尔','铁臂','K/O'] },
      { nickname: 'deLb', role: '自由人', roleEn: 'Flex', rating: 1.45, acs: 275, adr: 172, kast: 0.82, kpr: 1.04, apr: 0.36, hs: 0.46, kills: 148, deaths: 102, assists: 85, heroPool: ['钱博尔','蝰蛇','铁臂','K/O'] }
    ]
  }
};

// ============== 2026 VCT CN 第一赛段赛果（关键） ==============
// 来源: Liquipedia + 腾讯官网
// 2026-05-10 第一赛段总决赛: EDG 3:2 XLG (EDG夺冠, Smoggy FMVP)
// 2026-05-09 第一赛段Lower Final: XLG 3:1 DRG
// 2026-05-08 Lower Semifinals: AG 1:2 DRG

// 2026 VCT CN 启点赛赛果：
// 2026-02-07 胜者组决赛: AG 3:2 XLG (AG一号种子圣地亚哥)
// 2026-02-09 败者组决赛: EDG 3:1 BLG (EDG晋级圣地亚哥)

// ============== 2026 VCT CN 第二赛段已结束比赛 ==============
const HISTORY_MATCHES = [
  // ===== 第一赛段 =====
  { id: 's1-001', date: '2026-05-10', teamA: 'EDG', teamB: 'XLG', scoreA: 3, scoreB: 2, maps: ['Ascent','Summit','Lotus','Haven','天枢云阙'], tournament: '2026 VCT CN 第一赛段总决赛', mvp: 'EDG Smoggy', status: 'completed' },
  { id: 's1-002', date: '2026-05-09', teamA: 'XLG', teamB: 'DRG', scoreA: 3, scoreB: 1, maps: ['Summit','Ascent','Lotus','Haven'], tournament: '2026 VCT CN 第一赛段败者组决赛', status: 'completed' },
  { id: 's1-003', date: '2026-05-08', teamA: 'AG', teamB: 'DRG', scoreA: 1, scoreB: 2, maps: ['Summit','Ascent','Haven'], tournament: '2026 VCT CN 第一赛段败者组半决赛', status: 'completed' },

  // ===== 第二赛段 小组赛 (07-09 ~ 07-26) =====
  { id: 's2-001', date: '2026-07-09', teamA: 'WOL', teamB: 'TEC', scoreA: 2, scoreB: 0, maps: ['Ascent','Summit'], tournament: '2026 VCT CN 第二赛段 小组赛', status: 'completed' },
  { id: 's2-002', date: '2026-07-09', teamA: 'DRG', teamB: 'BLG', scoreA: 2, scoreB: 0, maps: ['Lotus','Haven'], tournament: '2026 VCT CN 第二赛段 小组赛', status: 'completed' },
  { id: 's2-003', date: '2026-07-10', teamA: 'FPX', teamB: 'TRC', scoreA: 2, scoreB: 0, maps: ['Sunset','天枢云阙'], tournament: '2026 VCT CN 第二赛段 小组赛', status: 'completed' },
  { id: 's2-004', date: '2026-07-10', teamA: 'JDG', teamB: 'TYL', scoreA: 0, scoreB: 2, maps: ['Summit','Ascent'], tournament: '2026 VCT CN 第二赛段 小组赛', note: 'TYL黑马开局爆冷JDG', status: 'completed' },
  { id: 's2-005', date: '2026-07-11', teamA: 'DRG', teamB: 'TEC', scoreA: 2, scoreB: 1, maps: ['Haven','Ascent','Summit'], tournament: '2026 VCT CN 第二赛段 小组赛', status: 'completed' },
  { id: 's2-006', date: '2026-07-11', teamA: 'BLG', teamB: 'WOL', scoreA: 2, scoreB: 1, maps: ['Lotus','Sunset','Haven'], tournament: '2026 VCT CN 第二赛段 小组赛', status: 'completed' },
  { id: 's2-007', date: '2026-07-12', teamA: 'NOVA', teamB: 'FPX', scoreA: 2, scoreB: 0, maps: ['天枢云阙','Ascent'], tournament: '2026 VCT CN 第二赛段 小组赛', status: 'completed' },
  { id: 's2-008', date: '2026-07-12', teamA: 'TYL', teamB: 'TRC', scoreA: 2, scoreB: 0, maps: ['Summit','Lotus'], tournament: '2026 VCT CN 第二赛段 小组赛', status: 'completed' },
  { id: 's2-009', date: '2026-07-14', teamA: 'WOL', teamB: 'AG', scoreA: 0, scoreB: 2, maps: ['Haven','Ascent'], tournament: '2026 VCT CN 第二赛段 小组赛', status: 'completed' },
  { id: 's2-010', date: '2026-07-14', teamA: 'XLG', teamB: 'TEC', scoreA: 1, scoreB: 2, maps: ['Summit','Lotus','Sunset'], tournament: '2026 VCT CN 第二赛段 小组赛', status: 'completed' },
  { id: 's2-011', date: '2026-07-15', teamA: 'JDG', teamB: 'FPX', scoreA: 0, scoreB: 2, maps: ['Ascent','天枢云阙'], tournament: '2026 VCT CN 第二赛段 小组赛', note: 'JDG两连败', status: 'completed' },
  { id: 's2-012', date: '2026-07-15', teamA: 'EDG', teamB: 'TYL', scoreA: 1, scoreB: 2, maps: ['Summit','Haven','Ascent'], tournament: '2026 VCT CN 第二赛段 小组赛', note: 'TYL爆冷EDG！', status: 'completed' },
  { id: 's2-013', date: '2026-07-16', teamA: 'AG', teamB: 'BLG', scoreA: 1, scoreB: 2, maps: ['Lotus','Sunset','Haven'], tournament: '2026 VCT CN 第二赛段 小组赛', status: 'completed' },
  { id: 's2-014', date: '2026-07-16', teamA: 'XLG', teamB: 'DRG', scoreA: 2, scoreB: 0, maps: ['Ascent','Summit'], tournament: '2026 VCT CN 第二赛段 小组赛', status: 'completed' },
  { id: 's2-015', date: '2026-07-17', teamA: 'NOVA', teamB: 'JDG', scoreA: 2, scoreB: 1, maps: ['Haven','天枢云阙','Lotus'], tournament: '2026 VCT CN 第二赛段 小组赛', status: 'completed' },
  { id: 's2-016', date: '2026-07-17', teamA: 'TYL', teamB: 'FPX', scoreA: 2, scoreB: 1, maps: ['Summit','Ascent','Haven'], tournament: '2026 VCT CN 第二赛段 小组赛', status: 'completed' },
  { id: 's2-017', date: '2026-07-17', teamA: 'TRC', teamB: 'EDG', scoreA: 0, scoreB: 2, maps: ['Ascent','Lotus'], tournament: '2026 VCT CN 第二赛段 小组赛', status: 'completed' },
  { id: 's2-018', date: '2026-07-18', teamA: 'TEC', teamB: 'BLG', scoreA: 1, scoreB: 2, maps: ['Summit','Haven','Ascent'], tournament: '2026 VCT CN 第二赛段 小组赛', status: 'completed' },

  // ===== 第二赛段 排位赛 (07-26) =====
  { id: 's2-019', date: '2026-07-26', teamA: 'EDG', teamB: 'NOVA', scoreA: 0, scoreB: 2, maps: ['Summit','Ascent'], tournament: '2026 VCT CN 第二赛段 排位赛', status: 'completed' },
  { id: 's2-020', date: '2026-07-26', teamA: 'XLG', teamB: 'TYL', scoreA: 2, scoreB: 0, maps: ['Summit','Ascent'], tournament: '2026 VCT CN 第二赛段 排位赛', status: 'completed' },
  { id: 's2-021', date: '2026-07-26', teamA: 'NOVA', teamB: 'BLG', scoreA: 2, scoreB: 0, maps: ['天枢云阙','Sunset'], tournament: '2026 VCT CN 第二赛段 排位赛', status: 'completed' },

  // ===== 第二赛段 入围赛 (08-05 ~ 08-16) =====
  { id: 's2-022', date: '2026-08-05', teamA: 'DRG', teamB: 'TRC', scoreA: 1, scoreB: 2, maps: ['Ascent','Summit','Haven'], tournament: '2026 VCT CN 第二赛段 入围赛败者组', status: 'completed' },
  { id: 's2-023', date: '2026-08-06', teamA: 'WOL', teamB: 'DRG', scoreA: 1, scoreB: 2, maps: ['Haven','Ascent','Summit'], tournament: '2026 VCT CN 第二赛段 入围赛', status: 'completed' },
  { id: 's2-024', date: '2026-08-08', teamA: 'WOL', teamB: 'TRC', scoreA: 2, scoreB: 1, maps: ['Haven','Ascent','Summit'], tournament: '2026 VCT CN 第二赛段 入围赛Lower Round 1', status: 'completed' },
  { id: 's2-025', date: '2026-08-09', teamA: 'EDG', teamB: 'WOL', scoreA: 2, scoreB: 1, maps: ['Summit','Ascent','Haven'], tournament: '2026 VCT CN 第二赛段 入围赛Lower Round 2', status: 'completed' },
  { id: 's2-026', date: '2026-08-11', teamA: 'AG', teamB: 'TEC', scoreA: 2, scoreB: 0, maps: ['Haven','Ascent'], tournament: '2026 VCT CN 第二赛段 入围赛Upper Quarterfinal', status: 'completed' },
  { id: 's2-027', date: '2026-08-11', teamA: 'JDG', teamB: 'TEC', scoreA: 2, scoreB: 1, maps: ['Summit','Ascent','Haven'], tournament: '2026 VCT CN 第二赛段 入围赛Upper Quarterfinal', status: 'completed' },

  // ===== 第二赛段 季后赛 (08-14 ~ 08-23) =====
  { id: 's2-028', date: '2026-08-14', teamA: 'JDG', teamB: 'NOVA', scoreA: 2, scoreB: 0, maps: ['Summit','Haven'], tournament: '季后赛Upper Quarterfinal', note: 'NOVA小组赛5胜0负却被JDG 2:0横扫', status: 'completed' },
  { id: 's2-029', date: '2026-08-14', teamA: 'TYL', teamB: 'TEC', scoreA: 2, scoreB: 0, maps: ['Summit','Ascent'], tournament: '季后赛Upper Quarterfinal', status: 'completed' },
  { id: 's2-030', date: '2026-08-15', teamA: 'XLG', teamB: 'AG', scoreA: 2, scoreB: 1, maps: ['Summit','Ascent','Lotus'], tournament: '季后赛Upper Quarterfinal', status: 'completed' },
  { id: 's2-031', date: '2026-08-15', teamA: 'BLG', teamB: 'TRC', scoreA: 2, scoreB: 1, maps: ['Haven','Sunset','天枢云阙'], tournament: '季后赛Upper Quarterfinal', status: 'completed' },
  { id: 's2-032', date: '2026-08-16', teamA: 'NOVA', teamB: 'TEC', scoreA: 2, scoreB: 0, maps: ['Summit','Sunset'], tournament: '季后赛Lower Round 1', note: 'Ezeir 47/22/21 KDA 1.57 Rating 爆种', status: 'completed' },
  { id: 's2-033', date: '2026-08-16', teamA: 'AG', teamB: 'TRC', scoreA: 2, scoreB: 1, maps: ['霓虹町','莲华古城','亚海悬城'], tournament: '季后赛Lower Round 1', note: 'AG两度落后翻盘，TRC赛季结束', status: 'completed' }
];

// ============== 2026 VCT CN 第二赛段季后赛即将比赛 ==============
// 来源: liquipedia.net + vlr.gg + 腾讯体育 2026-08-17
// Playoffs 赛制: Lower Final + Grand Final 为 BO5，其余 BO3
// 决赛阶段移师成都金融城演艺中心 (08-19 ~ 08-23)
const UPCOMING_MATCHES = [
  // ===== 胜者组半决赛 Upper Semis (BO3) =====
  { id: 'u-001', date: '2026-08-19 16:00', teamA: 'JDG', teamB: 'TYL', format: 'BO3', maps: ['Summit','Ascent','Haven'], tournament: '胜者组半决赛', note: 'JDG黑马横扫NOVA后对阵TYL' },
  { id: 'u-002', date: '2026-08-19 18:00', teamA: 'BLG', teamB: 'XLG', format: 'BO3', maps: ['Lotus','Sunset','天枢云阙'], tournament: '胜者组半决赛', note: 'BLG 2025冠军 vs 常规赛#1 XLG' },

  // ===== 败者组第二轮 Lower Round 2 (BO3) =====
  { id: 'u-003', date: '2026-08-20 16:00', teamA: 'AG', teamB: 'TBD', format: 'BO3', maps: ['Haven','Ascent','Summit'], tournament: '败者组第二轮', note: 'AG vs JDG/TYL负者' },
  { id: 'u-004', date: '2026-08-20 18:00', teamA: 'NOVA', teamB: 'TBD', format: 'BO3', maps: ['天枢云阙','Lotus','Sunset'], tournament: '败者组第二轮', note: 'NOVA vs BLG/XLG负者' },

  // ===== 胜者组决赛 Upper Final (BO5) =====
  { id: 'u-005', date: '2026-08-21 16:00', teamA: 'TBD', teamB: 'TBD', format: 'BO5', maps: ['Summit','Ascent','Lotus','Haven','天枢云阙'], tournament: '胜者组决赛', note: 'U Semis胜者晋级' },

  // ===== 败者组决赛 Lower Final (BO5) =====
  { id: 'u-006', date: '2026-08-22 16:00', teamA: 'TBD', teamB: 'TBD', format: 'BO5', maps: ['Haven','Sunset','天枢云阙','Lotus','Ascent'], tournament: '败者组决赛', note: 'LQ2胜者晋级' },

  // ===== 总决赛 Grand Final (BO5) =====
  { id: 'u-007', date: '2026-08-23 16:00', teamA: 'TBD', teamB: 'TBD', format: 'BO5', maps: ['Summit','Ascent','Lotus','Haven','Sunset'], tournament: '总决赛', note: '冠亚军直接晋级上海Champions' }
];


