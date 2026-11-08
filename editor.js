const STORAGE_KEY = 'dunwithin-monster-data-v1';
const DEFAULT_DATA = {
  source: 'https://wikiwiki.jp/dunwith/',
  version: '0.5.4(b.187)',
  monsters: [
    {
      name: 'ベヒーモス',
      race: '野獣',
      rank: 9,
      control_cost: 32,
      status: { hp: 275, ac: 8, initiative: 0, strength: 40, dexterity: 8, constitution: 38, intelligence: 4, wisdom: 12, charisma: 8 },
      basic_attack: { name: '重撃', damage: '4d6+15', damage_type: '殴打', bonus: '筋力修正値', description: '重い一撃を放つ。', tags: ['主行動', '筋力基準'] },
      unique_trait: { name: '巨獣の甲殻', description: '斬撃耐性と防御力を持つ。', effects: ['斬撃耐性', '伏せ状態免疫'], bonuses: ['魔晶石20スタック'], tags: ['範囲'] },
      parts: { main: [{ name: '巨獣の拳', control_cost_bonus: 12, stat_bonus: { strength: 5 }, description: '殴打と雷鳴を与える大きな一撃。', effects: ['殴打ダメージ8d', '雷鳴ダメージ4d10'], tags: ['主行動', '筋力基準'] }], sub: [{ name: '不壊の肉体', control_cost_bonus: 6, stat_bonus: { constitution: 4 }, description: '高い耐久性を提供する。', effects: ['物理ダメージ減少20'], tags: ['耐久力基準'] }, { name: '巨獣の生命力', control_cost_bonus: 6, stat_bonus: { constitution: 4 }, description: '最大HPと持久力を上げる。', effects: ['最大HP増加', '殴打ダメージに耐久力修正値を追加'], tags: ['範囲'] }] }
    },
    {
      name: 'ネメア',
      race: '野獣',
      rank: 9,
      control_cost: 32,
      status: { hp: 190, ac: 8, initiative: 0, strength: 18, dexterity: 20, constitution: 26, intelligence: 38, wisdom: 34, charisma: 28 },
      basic_attack: { name: '魔力の矢', damage: '5d6+14', damage_type: '力場', bonus: '知力修正値', description: '力場の矢を放つ。', tags: ['主行動', '知力基準'] },
      unique_trait: { name: '獅子王の心臓', description: '恐怖と沈黙を免疫する。', effects: ['恐怖免疫', '沈黙免疫'], bonuses: ['自身の力場ダメージが耐性と免疫を無視'], tags: ['範囲'] },
      parts: { main: [{ name: '真理の笏', control_cost_bonus: 12, stat_bonus: { intelligence: 5 }, description: '知力ベースの大火力攻撃。', effects: ['力場ダメージ6d8', '殴打ダメージ4d8'], tags: ['主行動', '知力基準'] }], sub: [{ name: '万象の洞察', control_cost_bonus: 6, stat_bonus: { strength: 4 }, description: 'クリティカル時に反応する。', effects: ['クリティカル攻撃を受けると反応'], tags: ['反応行動'] }, { name: '超越の外套', control_cost_bonus: 6, stat_bonus: { intelligence: 4 }, description: '前列を脆弱化する。', effects: ['交戦開始時に前列の敵を脆弱にする'], tags: ['範囲'] }] }
    },
    {
      name: 'エンメリア',
      race: '精霊',
      rank: 9,
      control_cost: 32,
      status: { hp: 185, ac: 8, initiative: 0, strength: 10, dexterity: 22, constitution: 24, intelligence: 34, wisdom: 40, charisma: 36 },
      basic_attack: { name: '雷の矢', damage: '5d6+15', damage_type: '電撃', bonus: '判断力修正値', description: '稲妻を放つ。', tags: ['主行動', '判断力基準'] },
      unique_trait: { name: '精霊界の権能', description: '元素ダメージを強化する。', effects: ['火炎免疫', '冷気免疫', '電撃免疫'], bonuses: ['味方の元素ダメージを判断力修正値分増加'], tags: ['範囲'] },
      parts: { main: [{ name: '万物の調和', control_cost_bonus: 12, stat_bonus: { wisdom: 5 }, description: '複数の元素攻撃を同時に発生させる。', effects: ['火炎ダメージ6d8', '冷気ダメージ6d8', '電撃ダメージ6d8'], tags: ['主行動', '判断力基準'] }], sub: [{ name: '精霊の君臨', control_cost_bonus: 6, stat_bonus: { charisma: 4 }, description: '元素耐性と反撃を持つ。', effects: ['元素ダメージ耐性'], tags: ['範囲'] }, { name: '元素の花冠', control_cost_bonus: 6, stat_bonus: { intelligence: 4 }, description: '交戦開始時に敵を脆弱化する。', effects: ['全敵を火炎・冷気・電撃ダメージ脆弱にする'], tags: ['範囲'] }] }
    },
    {
      name: '超越体',
      race: '精霊',
      rank: 9,
      control_cost: 32,
      status: { hp: 160, ac: 8, initiative: 0, strength: 6, dexterity: 16, constitution: 20, intelligence: 34, wisdom: 38, charisma: 40 },
      basic_attack: { name: '精神圧迫', damage: '5d6+15', damage_type: '精神', bonus: '魅力修正値', description: '精神を圧迫する。', tags: ['主行動', '魅力基準'] },
      unique_trait: { name: '世界の精神', description: '精神免疫と魅了免疫を持つ。', effects: ['精神免疫', '魅了免疫'], bonuses: ['精神ダメージを敵の耐性・免疫無視'], tags: ['範囲'] },
      parts: { main: [{ name: '超越の杖', control_cost_bonus: 12, stat_bonus: { charisma: 5 }, description: '精神ダメージを与える杖。', effects: ['精神ダメージ6d10'], tags: ['主行動', '魅力基準'] }], sub: [{ name: '万心の洞察', control_cost_bonus: 6, stat_bonus: { wisdom: 4 }, description: '反応して後列を攻撃する。', effects: ['攻撃を受けると反応'], tags: ['反応行動'] }, { name: '世界樹の枝', control_cost_bonus: 6, stat_bonus: { charisma: 4 }, description: '後列を精神脆弱にする。', effects: ['交戦開始時に後列の敵を精神ダメージ脆弱にする'], tags: ['範囲'] }] }
    },
    {
      name: 'グリムリーパー',
      race: 'アンデッド',
      rank: 9,
      control_cost: 32,
      status: { hp: 170, ac: 8, initiative: 0, strength: 24, dexterity: 36, constitution: 22, intelligence: 14, wisdom: 20, charisma: 26 },
      basic_attack: { name: '迅速斬撃', damage: '5d6+13', damage_type: '斬撃', bonus: '敏捷力修正値', description: '素早く斬る。', tags: ['主行動', '敏捷力基準'] },
      unique_trait: { name: '亡者の魂壺', description: '死霊免疫を持ちながら魂を溜める。', effects: ['死霊免疫', '恐怖免疫'], bonuses: ['敵死亡時に魂壺を1チャージ'], tags: ['範囲'] },
      parts: { main: [{ name: '魂収穫の大鎌', control_cost_bonus: 12, stat_bonus: { dexterity: 5 }, description: '敏捷ベースの斬撃。', effects: ['斬撃ダメージ6d10', '死霊ダメージ3d10'], tags: ['主行動', '敏捷力基準'] }], sub: [{ name: '死神のローブ', control_cost_bonus: 6, stat_bonus: { charisma: 4 }, description: '防御と反撃を持つ。', effects: ['死霊ダメージ免疫', '物理ダメージ耐性'], tags: ['範囲'] }, { name: '死の残響', control_cost_bonus: 6, stat_bonus: { dexterity: 4 }, description: '敵撃破時に攻撃を強化する。', effects: ['味方全員に死の残響を付与'], tags: ['範囲'] }] }
    },
    {
      name: 'フュシス',
      race: 'アンデッド',
      rank: 9,
      control_cost: 32,
      status: { hp: 210, ac: 8, initiative: 0, strength: 12, dexterity: 16, constitution: 32, intelligence: 30, wisdom: 34, charisma: 38 },
      basic_attack: { name: '血液抽出', damage: '5d6+14', damage_type: '死霊', bonus: '魅力修正値', description: '血液を抽出して攻撃する。', tags: ['主行動', '魅力基準'] },
      unique_trait: { name: '血の君臨', description: '出血状態を増幅する。', effects: ['死霊免疫', '魅了免疫'], bonuses: ['敵に血の君臨を付与'], tags: ['範囲'] },
      parts: { main: [{ name: '真紅の玉座', control_cost_bonus: 12, stat_bonus: { charisma: 5 }, description: '死霊と出血の攻撃。', effects: ['死霊ダメージ6d10', '出血の効果を強化'], tags: ['主行動', '魅力基準'] }], sub: [{ name: '血の帳', control_cost_bonus: 6, stat_bonus: { wisdom: 4 }, description: '出血状態の敵に反応して回復する。', effects: ['出血状態の敵が死亡すると主行動を1回回復'], tags: ['範囲'] }, { name: '生命の源', control_cost_bonus: 6, stat_bonus: { charisma: 4 }, description: '近接攻撃時に反撃を行う。', effects: ['攻撃者に死霊ダメージ3d10'], tags: ['反応行動'] }] }
    },
    {
      name: 'フェンリル',
      race: '野獣',
      rank: 8,
      control_cost: 20,
      status: { hp: 135, ac: 8, initiative: 2, strength: 27, dexterity: 20, constitution: 24, intelligence: 6, wisdom: 14, charisma: 10 },
      basic_attack: { name: '基本斬撃', damage: '5d6+筋力修正値', damage_type: '斬撃', bonus: '筋力修正値', description: '敵を斬る。', tags: ['主行動', '筋力基準', '近接'] },
      unique_trait: { name: '終末の遠吠え', description: '交戦開始時に味方を強化する。', effects: ['冷気免疫', '恐怖免疫'], bonuses: ['全味方に終末の遠吠えを付与'], tags: ['範囲'] },
      parts: { main: [{ name: '霜牙の大剣', control_cost_bonus: 6, stat_bonus: { strength: 3 }, description: '斬撃と冷気の複合攻撃。', effects: ['対象を斬り裂く', '全敵に冷気ダメージ'], tags: ['主行動', '筋力基準'] }], sub: [{ name: '粉砕', control_cost_bonus: 3, stat_bonus: { wisdom: 3 }, description: 'クリティカル時に脆弱化する。', effects: ['斬撃ダメージ脆弱', '冷気ダメージ脆弱'], tags: ['反応行動'] }, { name: '捕食者の本能', control_cost_bonus: 3, stat_bonus: { initiative: 7 }, description: 'HP低下時に確定クリティカルが発生する。', effects: ['HP35%以下で確定クリティカル'], tags: ['反応行動'] }] }
    },
    {
      name: 'スレイプニル',
      race: '野獣',
      rank: 8,
      control_cost: 20,
      status: { hp: 115, ac: 8, initiative: 0, strength: 18, dexterity: 25, constitution: 18, intelligence: 12, wisdom: 20, charisma: 14 },
      basic_attack: { name: '致命の射撃', damage: '5d6+7', damage_type: '刺突', bonus: '敏捷力修正値', description: '遠距離武器で敵を撃つ。', tags: ['主行動', '敏捷力基準'] },
      unique_trait: { name: '疾風の蹄', description: '交戦開始時に味方を加速させる。', effects: ['拘束免疫', '伏せ状態免疫'], bonuses: ['疾風の蹄を2スタック付与'], tags: ['範囲'] },
      parts: { main: [{ name: '流星の槍', control_cost_bonus: 6, stat_bonus: null, description: '対象とその後方の敵を貫く。', effects: ['刺突ダメージ6d8'], tags: ['主行動', '敏捷力基準'] }], sub: [{ name: '彗星の矢', control_cost_bonus: 3, stat_bonus: { dexterity: 3 }, description: '遠距離攻撃の反応で追加雷鳴を与える。', effects: ['3d8の追加雷鳴ダメージ'], tags: ['反応行動'] }, { name: '反撃機動', control_cost_bonus: 3, stat_bonus: null, description: '攻撃を回避して反撃する。', effects: ['攻撃回避', '基本攻撃1回回復'], tags: ['反応行動'] }] }
    },
    {
      name: 'キリン',
      race: '精霊',
      rank: 8,
      control_cost: 20,
      status: { hp: 110, ac: 8, initiative: null, strength: 12, dexterity: 18, constitution: 16, intelligence: 20, wisdom: 26, charisma: 18 },
      basic_attack: { name: '雷の矢', damage: '5d6+8', damage_type: '電撃', bonus: '知力修正値', description: '稲妻を放つ。', tags: ['主行動', '判断力基準'] },
      unique_trait: { name: '過負荷', description: '自身の電撃ダメージが強化される。', effects: ['電撃免疫', '自身の電撃ダメージが耐性と免疫を無視'], bonuses: ['静電気付与'], tags: ['呪文'] },
      parts: { main: [{ name: '天罰の落雷', control_cost_bonus: 6, stat_bonus: { wisdom: 5 }, description: '後列の敵に強力な電撃を与える。', effects: ['電撃ダメージ6d10'], tags: ['主行動', '判断力基準'] }], sub: [{ name: '稲妻の跳躍', control_cost_bonus: 3, stat_bonus: { wisdom: 3 }, description: '近接攻撃に反応して回避し追加ダメージ。', effects: ['2d8の追加電撃ダメージ'], tags: ['反応行動'] }, { name: '雷雲の帳', control_cost_bonus: 3, stat_bonus: { wisdom: 3 }, description: '交戦開始時に前列を攻撃する。', effects: ['3d8の追加電撃ダメージ'], tags: ['範囲'] }] }
    },
    {
      name: 'エーテリアル',
      race: '精霊',
      rank: 8,
      control_cost: 20,
      status: { hp: 100, ac: 8, initiative: null, strength: 6, dexterity: 16, constitution: 14, intelligence: 24, wisdom: 18, charisma: 27 },
      basic_attack: { name: '光線', damage: '5d6+8', damage_type: '光輝', bonus: '魅力修正値', description: '強い光を放つ。', tags: ['主行動', '魅力基準'] },
      unique_trait: { name: '太陽の涙', description: '光輝ダメージが強化される。', effects: ['自身の光輝ダメージが耐性と免疫を無視'], bonuses: ['超新星スタック'], tags: ['範囲'] },
      parts: { main: [{ name: '裁きの光線', control_cost_bonus: 6, stat_bonus: { charisma: 5 }, description: '対象と後方の敵を貫く強力な光輝。', effects: ['6d8の光輝ダメージ'], tags: ['主行動', '魅力基準'] }], sub: [{ name: '懲罰の鏡', control_cost_bonus: 3, stat_bonus: { charisma: 3 }, description: '呪文対象に反応して反射する。', effects: ['4d6の追加光輝ダメージ'], tags: ['反応行動'] }, { name: 'エーテルの盾', control_cost_bonus: 3, stat_bonus: null, description: '交戦開始時に味方を保護する。', effects: ['エーテルシールドを付与'], tags: ['範囲'] }] }
    },
    {
      name: 'リッチ・クイーン',
      race: 'アンデッド',
      rank: 8,
      control_cost: 20,
      status: { hp: 105, ac: 8, initiative: null, strength: 8, dexterity: 12, constitution: 14, intelligence: 26, wisdom: 22, charisma: 20 },
      basic_attack: { name: '闇の矢', damage: '5d6+8', damage_type: '死霊', bonus: '知力修正値', description: '闇のエネルギーを放つ。', tags: ['主行動', '知力基準'] },
      unique_trait: { name: 'パワー・ワード：デス', description: 'HP20%以下の敵に即死を試みる。', effects: ['即死を試みる', '魂を獲得'], bonuses: ['自身のHPを回復'], tags: ['範囲'] },
      parts: { main: [{ name: '死の指', control_cost_bonus: 6, stat_bonus: { intelligence: 5 }, description: '対象に死霊を与える。', effects: ['6d10の死霊ダメージ'], tags: ['主行動', '知力基準'] }], sub: [{ name: '死霊の波動', control_cost_bonus: 3, stat_bonus: { wisdom: 3 }, description: '呪文に精神ダメージを追加する。', effects: ['2d8の精神ダメージ'], tags: ['判断力基準'] }, { name: '魂の残響', control_cost_bonus: 3, stat_bonus: null, description: '死亡時に味方に魂を付与する。', effects: ['自身の次の攻撃が確定クリティカル'], tags: ['範囲'] }] }
    },
    {
      name: 'ナイトウォーカー',
      race: 'アンデッド',
      rank: 8,
      control_cost: 20,
      status: { hp: 120, ac: 8, initiative: null, strength: 22, dexterity: 26, constitution: 18, intelligence: 10, wisdom: 12, charisma: 14 },
      basic_attack: { name: '迅速斬撃', damage: '5d6+8', damage_type: '斬撃', bonus: '敏捷力修正値', description: '素早く敵を斬る。', tags: ['主行動', '敏捷力基準'] },
      unique_trait: { name: '深淵の帳', description: '交戦開始時に透明化を与える。', effects: ['自身と後列を透明化', '影の加護を付与'], bonuses: ['後列の味方を支援'], tags: [] },
      parts: { main: [{ name: '形態切断', control_cost_bonus: 6, stat_bonus: { dexterity: 5 }, description: '前列の敵を斬りつける。', effects: ['4d10の死霊ダメージ', '6d8の精神ダメージ'], tags: ['主行動', '敏捷力基準'] }], sub: [{ name: '影の捕食', control_cost_bonus: 3, stat_bonus: { charisma: 3 }, description: '攻撃時に対象にスタックを付与する。', effects: ['影の捕食スタック'], tags: ['呪文'] }, { name: '畏怖の一撃', control_cost_bonus: 3, stat_bonus: { wisdom: 3 }, description: 'クリティカル時に精神ダメージと恐怖を与える。', effects: ['3d8の精神ダメージ', '恐怖状態'], tags: ['判断力基準'] }] }
    }
  ]
};

const state = {
  selectedMonsterIndex: 0,
  monsters: []
};
const openPartExtraFields = new WeakSet();
const partStatOptions = [
  ['strength', '筋力'],
  ['dexterity', '敏捷力'],
  ['constitution', '耐久力'],
  ['intelligence', '知力'],
  ['wisdom', '判断力'],
  ['charisma', '魅力'],
  ['max_hp', '最大HP'],
  ['ac', 'AC（防御力）'],
  ['initiative', 'Initiative（行動順）'],
  ['spell_save_dc', '呪文セーヴ難易度'],
  ['ranged_attack', '遠距離攻撃']
];

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.monsters)) {
      return null;
    }
    return parsed;
  } catch (error) {
    console.warn('monster data load failed', error);
    return null;
  }
}

function isPlaceholderMonster(monster) {
  if (!monster || typeof monster !== 'object') {
    return false;
  }

  const status = monster.status || {};
  return monster.name === '新規モンスター'
    && monster.race === '未分類'
    && Number(monster.rank || 1) === 1
    && Number(monster.control_cost || 0) === 0
    && Number(status.hp || 0) === 0
    && Number(status.ac || 8) === 8
    && Number(status.initiative || 0) === 0
    && Number(status.strength || 0) === 0
    && Number(status.dexterity || 0) === 0
    && Number(status.constitution || 0) === 0
    && Number(status.intelligence || 0) === 0
    && Number(status.wisdom || 0) === 0
    && Number(status.charisma || 0) === 0;
}

function saveData(monsters = state.monsters) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    source: 'local',
    version: '1.0',
    monsterDataVersion: window.MONSTER_DATA_VERSION,
    monsters
  }, null, 2));
}

function setDataTransferStatus(message, isError = false) {
  const status = document.getElementById('data-transfer-status');
  status.textContent = message;
  status.classList.toggle('error', isError);
}

function exportMonsterData(filename = `dungeon-within-monsters-${new Date().toISOString().slice(0, 10)}.json`) {
  collectMonsterFromForm();
  const data = {
    source: 'local',
    version: '1.0',
    monsterDataVersion: window.MONSTER_DATA_VERSION,
    exportedAt: new Date().toISOString(),
    monsters: state.monsters
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  setDataTransferStatus(`${state.monsters.length}体のモンスター情報をエクスポートしました。`);
}

async function loadLatestMonsterDataScripts() {
  if (!['http:', 'https:'].includes(window.location.protocol)) {
    throw new Error('サーバーから最新データを取得するには、GitHub Pagesなどのhttp://またはhttps://のURLで開いてください。');
  }

  const dataFiles = [
    ['RANK5_DATA', 'rank5-data.js', 5],
    ['RANK6_DATA', 'rank6-data.js', 6],
    ['RANK7_DATA', 'rank7-data.js', 7],
    ['RANK8_DATA', 'rank8-data.js', 8],
    ['RANK9_DATA', 'rank9-data.js', 9]
  ];
  const originalData = Object.fromEntries(dataFiles.map(([key]) => [key, window[key]]));
  const originalVersion = window.MONSTER_DATA_VERSION;
  const originalMerge = window.mergeMonsterData;
  const cacheBuster = `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  try {
    for (const [key, file, expectedRank] of dataFiles) {
      const url = new URL(`${file}?refresh=${cacheBuster}`, document.baseURI);
      await import(url.href);

      const dataset = window[key];
      if (!dataset || Number(dataset.rank) !== expectedRank
        || !Array.isArray(dataset.monsters) || dataset.monsters.length === 0
        || !dataset.monsters.every((monster) => Number(monster.rank) === expectedRank)) {
        throw new Error(`${file}から有効な${expectedRank}等級データを読み込めませんでした。`);
      }
    }

    if (typeof window.mergeMonsterData !== 'function' || !window.MONSTER_DATA_VERSION) {
      throw new Error('最新のデータ統合処理を読み込めませんでした。');
    }
  } catch (error) {
    dataFiles.forEach(([key]) => {
      window[key] = originalData[key];
    });
    window.MONSTER_DATA_VERSION = originalVersion;
    window.mergeMonsterData = originalMerge;
    throw error;
  }
}

async function refreshLatestMonsterData() {
  const replacementRanks = '5〜9';
  const confirmed = window.confirm(
    `等級${replacementRanks}の情報を最新データで置き換えます。` +
    'このブラウザーで編集した等級5〜9の内容は上書きされ、等級1〜4など他の等級は保持されます。' +
    '続行すると、現在の全データを先にバックアップとしてエクスポートします。'
  );
  if (!confirmed) return;

  try {
    collectMonsterFromForm();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    exportMonsterData(`dungeon-within-monsters-backup-before-update-${timestamp}.json`);
  } catch (error) {
    console.error('Monster data backup export failed.', error);
    setDataTransferStatus(`バックアップのエクスポートに失敗したため、更新を中止しました：${error.message}`, true);
    return;
  }

  if (!window.confirm('バックアップのダウンロードを開始しました。ファイルが保存されたことを確認してから、最新データを反映しますか？')) {
    setDataTransferStatus('更新を中止しました。現在のモンスターデータは変更されていません。');
    return;
  }

  const refreshButton = document.getElementById('refresh-latest-monster-data');
  refreshButton.disabled = true;
  setDataTransferStatus('サーバーから最新データを取得しています…');

  try {
    await loadLatestMonsterDataScripts();

    const currentData = {
      source: 'local',
      version: '1.0',
      monsterDataVersion: window.MONSTER_DATA_VERSION,
      monsters: state.monsters
    };
    const updatedData = window.mergeMonsterData(currentData, { forceRefresh: true });
    const selectedMonster = state.monsters[state.selectedMonsterIndex];
    const selectedIndex = selectedMonster
      ? updatedData.monsters.findIndex((monster) =>
        monster.name === selectedMonster.name && Number(monster.rank) === Number(selectedMonster.rank)
      )
      : 0;

    saveData(updatedData.monsters);
    state.monsters = updatedData.monsters;
    state.selectedMonsterIndex = Math.max(0, selectedIndex);
    renderSelectedMonster();
    setDataTransferStatus(`更新完了：等級5〜9の最新データを反映し、${updatedData.monsters.length}体の情報を保存しました。`);
  } catch (error) {
    console.error('Latest monster data refresh failed.', error);
    setDataTransferStatus(`最新データの反映に失敗しました：${error.message}`, true);
  } finally {
    refreshButton.disabled = false;
  }
}

function validateImportedMonsterData(data) {
  if (!data || typeof data !== 'object' || !Array.isArray(data.monsters)) {
    throw new Error('JSONにモンスター一覧（monsters）がありません。');
  }
  if (data.monsters.length === 0) {
    throw new Error('モンスター情報が空のファイルは読み込めません。');
  }
  data.monsters.forEach((monster, index) => {
    if (!monster || typeof monster !== 'object' || Array.isArray(monster)
      || typeof monster.name !== 'string' || !monster.name.trim()
      || !Number.isFinite(Number(monster.rank)) || Number(monster.rank) < 1) {
      throw new Error(`${index + 1}件目のモンスター情報に、有効な名前または等級がありません。`);
    }
  });
  return data.monsters;
}

async function importMonsterData(file) {
  try {
    collectMonsterFromForm();
    const data = JSON.parse(await file.text());
    const importedMonsters = validateImportedMonsterData(data);
    const mergedMonsters = [...state.monsters];
    let updatedCount = 0;
    let addedCount = 0;

    importedMonsters.forEach((importedMonster) => {
      const existingIndex = mergedMonsters.findIndex((monster) =>
        monster.name.trim() === importedMonster.name.trim()
        && Number(monster.rank) === Number(importedMonster.rank)
      );
      if (existingIndex >= 0) {
        mergedMonsters[existingIndex] = importedMonster;
        updatedCount += 1;
      } else {
        mergedMonsters.push(importedMonster);
        addedCount += 1;
      }
    });

    const selectedMonster = state.monsters[state.selectedMonsterIndex];
    const selectedIndex = selectedMonster
      ? mergedMonsters.findIndex((monster) =>
        monster.name === selectedMonster.name && Number(monster.rank) === Number(selectedMonster.rank)
      )
      : 0;
    state.monsters = mergedMonsters;
    state.selectedMonsterIndex = Math.max(0, selectedIndex);
    saveData();
    renderSelectedMonster();
    setDataTransferStatus(`インポート完了：${updatedCount}体を更新、${addedCount}体を追加しました。`);
  } catch (error) {
    console.error('Monster data import failed.', error);
    setDataTransferStatus(`インポートできませんでした：${error.message}`, true);
  }
}

function createEmptyMonster() {
  return {
    name: '新規モンスター',
    race: '未分類',
    rank: 1,
    control_cost: 0,
    status: {
      hp: 0,
      ac: 8,
      initiative: 0,
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0
    },
    basic_attack: {
      name: '基本攻撃',
      damage: '1d6',
      damage_type: '斬撃',
      bonus: '筋力修正値',
      description: '基本攻撃の説明',
      tags: ['主行動', '筋力基準']
    },
    unique_trait: {
      name: '固有特性',
      description: '固有特性の説明',
      effects: ['効果1'],
      bonuses: ['ボーナス1'],
      tags: ['範囲']
    },
    parts: {
      main: [
        {
          name: 'Mパーツ',
          control_cost_bonus: 0,
          stat_bonus: { strength: 0 },
          description: 'Mパーツの説明',
          effects: ['効果1'],
          tags: ['主行動', '筋力基準']
        }
      ],
      sub: [
        {
          name: 'S1パーツ',
          control_cost_bonus: 0,
          stat_bonus: { wisdom: 0 },
          description: 'S1パーツの説明',
          effects: ['効果1'],
          tags: ['反応行動']
        },
        {
          name: 'S2パーツ',
          control_cost_bonus: 0,
          stat_bonus: { charisma: 0 },
          description: 'S2パーツの説明',
          effects: ['効果1'],
          tags: ['範囲']
        }
      ]
    }
  };
}

function splitLines(value) {
  return String(value || '')
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseListInput(raw) {
  return splitLines(raw);
}

function asNumber(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function makeEditorLabel(text, control) {
  const label = document.createElement('label');
  const caption = document.createElement('span');
  caption.textContent = text;
  label.append(caption, control);
  return label;
}

function makeTextControl(value, options = {}) {
  const control = options.multiline ? document.createElement('textarea') : document.createElement('input');
  if (!options.multiline) control.type = options.type || 'text';
  if (options.multiline) control.rows = options.rows || 3;
  control.value = value === null || value === undefined ? '' : String(value);
  if (options.placeholder) control.placeholder = options.placeholder;
  return control;
}

function savePartChange(onChange) {
  saveData();
  onChange();
}

function renderPartInput(container, part, onChange, refreshPartsEditor) {
  const fixedKeys = new Set([
    'name', 'control_cost_bonus', 'stat_bonus', 'damage', 'description', 'effects', 'tags'
  ]);
  const formGrid = document.createElement('div');
  formGrid.className = 'editor-form-grid part-fields-grid';

  const nameInput = makeTextControl(part.name || '');
  nameInput.addEventListener('input', () => {
    part.name = nameInput.value;
    savePartChange(onChange);
  });
  formGrid.appendChild(makeEditorLabel('パーツ名', nameInput));

  const costInput = makeTextControl(part.control_cost_bonus, { type: 'number' });
  costInput.step = 'any';
  costInput.placeholder = '未設定';
  costInput.addEventListener('input', () => {
    part.control_cost_bonus = costInput.value === '' ? null : Number(costInput.value);
    savePartChange(onChange);
  });
  formGrid.appendChild(makeEditorLabel('支配力補正', costInput));
  container.appendChild(formGrid);

  const bonusSection = document.createElement('div');
  bonusSection.className = 'part-input-section';
  const bonusHeader = document.createElement('div');
  bonusHeader.className = 'part-input-header';
  const bonusTitle = document.createElement('strong');
  bonusTitle.textContent = 'ステータス補正';
  const addBonusButton = document.createElement('button');
  addBonusButton.type = 'button';
  addBonusButton.className = 'ghost-btn small-btn';
  addBonusButton.textContent = '補正を追加';
  addBonusButton.addEventListener('click', () => {
    if (!part.stat_bonus || typeof part.stat_bonus !== 'object' || Array.isArray(part.stat_bonus)) {
      part.stat_bonus = {};
    }
    const newKey = partStatOptions.find(([key]) => !Object.prototype.hasOwnProperty.call(part.stat_bonus, key))?.[0];
    if (!newKey) {
      setDataTransferStatus('追加できる補正項目がありません。既存の補正を編集してください。', true);
      return;
    }
    part.stat_bonus[newKey] = 0;
    savePartChange(onChange);
    refreshPartsEditor();
  });
  bonusHeader.append(bonusTitle, addBonusButton);
  bonusSection.appendChild(bonusHeader);

  const bonusRows = document.createElement('div');
  bonusRows.className = 'part-dynamic-rows';
  const statBonus = part.stat_bonus && typeof part.stat_bonus === 'object' && !Array.isArray(part.stat_bonus)
    ? part.stat_bonus
    : {};
  Object.entries(statBonus).forEach(([key, value]) => {
    const row = document.createElement('div');
    row.className = 'part-dynamic-row';
    const keySelect = document.createElement('select');
    keySelect.setAttribute('aria-label', '補正対象');
    partStatOptions.forEach(([optionValue, label]) => {
      const option = document.createElement('option');
      option.value = optionValue;
      option.textContent = label;
      keySelect.appendChild(option);
    });
    if (!partStatOptions.some(([optionValue]) => optionValue === key)) {
      const legacyOption = document.createElement('option');
      legacyOption.value = key;
      legacyOption.textContent = `その他（${key}）`;
      keySelect.appendChild(legacyOption);
    }
    keySelect.value = key;
    keySelect.addEventListener('change', () => {
      const nextKey = keySelect.value;
      if (nextKey === key || Object.prototype.hasOwnProperty.call(part.stat_bonus, nextKey)) return;
      const entries = Object.entries(part.stat_bonus);
      part.stat_bonus = Object.fromEntries(entries.map(([entryKey, entryValue]) => [entryKey === key ? nextKey : entryKey, entryValue]));
      savePartChange(onChange);
      refreshPartsEditor();
    });

    const valueInput = makeTextControl(value, { type: 'number', placeholder: '値' });
    valueInput.step = 'any';
    valueInput.setAttribute('aria-label', '補正値');
    valueInput.addEventListener('input', () => {
      part.stat_bonus[key] = valueInput.value === '' ? 0 : Number(valueInput.value);
      savePartChange(onChange);
    });

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'remove-btn small-btn';
    removeButton.textContent = '削除';
    removeButton.addEventListener('click', () => {
      delete part.stat_bonus[key];
      if (Object.keys(part.stat_bonus).length === 0) part.stat_bonus = null;
      savePartChange(onChange);
      refreshPartsEditor();
    });
    row.append(keySelect, valueInput, removeButton);
    bonusRows.appendChild(row);
  });
  if (Object.keys(statBonus).length === 0) {
    const empty = document.createElement('p');
    empty.className = 'part-input-hint';
    empty.textContent = 'ステータス補正は設定されていません。';
    bonusRows.appendChild(empty);
  }
  bonusSection.appendChild(bonusRows);
  container.appendChild(bonusSection);

  const damageSection = document.createElement('div');
  damageSection.className = 'part-input-section';
  const damageHeader = document.createElement('div');
  damageHeader.className = 'part-input-header';
  const damageTitle = document.createElement('strong');
  damageTitle.textContent = 'ダメージ・回復';
  const addDamageButton = document.createElement('button');
  addDamageButton.type = 'button';
  addDamageButton.className = 'ghost-btn small-btn';
  addDamageButton.textContent = '項目を追加';
  addDamageButton.addEventListener('click', () => {
    if (!Array.isArray(part.damage)) part.damage = [];
    part.damage.push({ dice: '', bonus: '', damage_type: '' });
    savePartChange(onChange);
    refreshPartsEditor();
  });
  damageHeader.append(damageTitle, addDamageButton);
  damageSection.appendChild(damageHeader);

  const damageRows = document.createElement('div');
  damageRows.className = 'part-damage-rows';
  const damageEntries = Array.isArray(part.damage) ? part.damage : [];
  damageEntries.forEach((entry, index) => {
    const damageRow = document.createElement('div');
    damageRow.className = 'part-damage-row';
    const fields = document.createElement('div');
    fields.className = 'editor-form-grid part-fields-grid';
    const diceInput = makeTextControl(entry?.dice || '', { placeholder: '例: 4d10' });
    const bonusInput = makeTextControl(entry?.bonus || '', { placeholder: '例: 筋力修正値' });
    const typeInput = makeTextControl(entry?.damage_type || '', { placeholder: '例: 斬撃' });
    diceInput.addEventListener('input', () => {
      damageEntries[index] = { ...damageEntries[index], dice: diceInput.value };
      savePartChange(onChange);
    });
    bonusInput.addEventListener('input', () => {
      damageEntries[index] = { ...damageEntries[index], bonus: bonusInput.value };
      savePartChange(onChange);
    });
    typeInput.addEventListener('input', () => {
      damageEntries[index] = { ...damageEntries[index], damage_type: typeInput.value };
      savePartChange(onChange);
    });
    fields.append(
      makeEditorLabel('ダイス', diceInput),
      makeEditorLabel('能力値補正', bonusInput),
      makeEditorLabel('種類', typeInput)
    );
    const removeDamageButton = document.createElement('button');
    removeDamageButton.type = 'button';
    removeDamageButton.className = 'remove-btn small-btn';
    removeDamageButton.textContent = 'この項目を削除';
    removeDamageButton.addEventListener('click', () => {
      damageEntries.splice(index, 1);
      if (damageEntries.length === 0) delete part.damage;
      savePartChange(onChange);
      refreshPartsEditor();
    });
    damageRow.append(fields, removeDamageButton);
    damageRows.appendChild(damageRow);
  });
  if (damageEntries.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'part-input-hint';
    empty.textContent = 'ダメージ・回復の数値項目はありません。';
    damageRows.appendChild(empty);
  }
  damageSection.appendChild(damageRows);
  container.appendChild(damageSection);

  const descriptionInput = makeTextControl(part.description || '', { multiline: true, rows: 4 });
  descriptionInput.addEventListener('input', () => {
    if (descriptionInput.value) part.description = descriptionInput.value;
    else delete part.description;
    savePartChange(onChange);
  });
  container.appendChild(makeEditorLabel('説明', descriptionInput));

  const effectsSection = document.createElement('div');
  effectsSection.className = 'part-input-section';
  const effectsHeader = document.createElement('div');
  effectsHeader.className = 'part-input-header';
  const effectsTitle = document.createElement('strong');
  effectsTitle.textContent = '追加効果';
  const addEffectButton = document.createElement('button');
  addEffectButton.type = 'button';
  addEffectButton.className = 'ghost-btn small-btn';
  addEffectButton.textContent = '効果を追加';
  addEffectButton.addEventListener('click', () => {
    if (!Array.isArray(part.effects)) part.effects = [];
    part.effects.push('');
    savePartChange(onChange);
    refreshPartsEditor();
  });
  effectsHeader.append(effectsTitle, addEffectButton);
  effectsSection.appendChild(effectsHeader);

  const effectRows = document.createElement('div');
  effectRows.className = 'part-dynamic-rows';
  const effects = Array.isArray(part.effects) ? part.effects : [];
  effects.forEach((effect, index) => {
    const row = document.createElement('div');
    row.className = 'part-effect-row';
    const isObjectEffect = effect && typeof effect === 'object' && !Array.isArray(effect);
    const effectNameInput = makeTextControl(isObjectEffect ? effect.name || '' : effect || '', {
      placeholder: isObjectEffect ? '効果名' : '効果内容',
      multiline: !isObjectEffect,
      rows: 2
    });
    effectNameInput.addEventListener('input', () => {
      effects[index] = isObjectEffect
        ? { ...effect, name: effectNameInput.value }
        : effectNameInput.value;
      savePartChange(onChange);
    });
    row.appendChild(makeEditorLabel(isObjectEffect ? '効果名' : '効果内容', effectNameInput));

    if (isObjectEffect) {
      const durationInput = makeTextControl(effect.duration || '', { placeholder: '例: 1交戦' });
      durationInput.addEventListener('input', () => {
        effects[index] = { ...effect, duration: durationInput.value };
        savePartChange(onChange);
      });
      row.appendChild(makeEditorLabel('持続時間', durationInput));
    }

    const removeEffectButton = document.createElement('button');
    removeEffectButton.type = 'button';
    removeEffectButton.className = 'remove-btn small-btn';
    removeEffectButton.textContent = '効果を削除';
    removeEffectButton.addEventListener('click', () => {
      effects.splice(index, 1);
      if (effects.length === 0) delete part.effects;
      savePartChange(onChange);
      refreshPartsEditor();
    });
    row.appendChild(removeEffectButton);
    effectRows.appendChild(row);
  });
  if (effects.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'part-input-hint';
    empty.textContent = '追加効果はありません。';
    effectRows.appendChild(empty);
  }
  effectsSection.appendChild(effectRows);
  container.appendChild(effectsSection);

  const tagsInput = makeTextControl(Array.isArray(part.tags) ? part.tags.join('\n') : '', {
    multiline: true,
    rows: 3,
    placeholder: '1行に1つずつ入力'
  });
  tagsInput.addEventListener('input', () => {
    const tags = splitLines(tagsInput.value);
    if (tags.length > 0) part.tags = tags;
    else delete part.tags;
    savePartChange(onChange);
  });
  container.appendChild(makeEditorLabel('タグ（改行区切り）', tagsInput));

  const extraDetails = document.createElement('details');
  extraDetails.className = 'part-extra-fields';
  extraDetails.open = openPartExtraFields.has(part);
  extraDetails.addEventListener('toggle', () => {
    if (extraDetails.open) openPartExtraFields.add(part);
    else openPartExtraFields.delete(part);
  });
  const extraSummary = document.createElement('summary');
  extraSummary.textContent = 'その他の項目（スキル固有の追加データ）';
  extraSummary.addEventListener('click', () => {
    if (extraDetails.open) openPartExtraFields.delete(part);
    else openPartExtraFields.add(part);
  });
  extraDetails.appendChild(extraSummary);
  const extraFields = document.createElement('div');
  extraFields.className = 'part-extra-list';
  Object.entries(part).filter(([key]) => !fixedKeys.has(key)).forEach(([key, value]) => {
    extraFields.appendChild(renderExtraPartField(key, value, part, onChange, refreshPartsEditor));
  });
  const addExtraButton = document.createElement('button');
  addExtraButton.type = 'button';
  addExtraButton.className = 'ghost-btn small-btn';
  addExtraButton.textContent = '項目を追加';
  addExtraButton.addEventListener('click', () => {
    let key = 'custom_field';
    let suffix = 2;
    while (Object.prototype.hasOwnProperty.call(part, key)) {
      key = `custom_field_${suffix}`;
      suffix += 1;
    }
    part[key] = '';
    savePartChange(onChange);
    refreshPartsEditor();
  });
  extraDetails.append(extraFields, addExtraButton);
  container.appendChild(extraDetails);
}

function renderExtraPartField(key, value, part, onChange, refreshPartsEditor) {
  const row = document.createElement('div');
  row.className = 'part-extra-row';
  const keyInput = makeTextControl(key, { placeholder: '項目名' });
  keyInput.setAttribute('aria-label', '項目名');
  keyInput.addEventListener('change', () => {
    const nextKey = keyInput.value.trim();
    if (!nextKey || nextKey === key || Object.prototype.hasOwnProperty.call(part, nextKey)) return;
    delete part[key];
    part[nextKey] = value;
    savePartChange(onChange);
    refreshPartsEditor();
  });

  const typeSelect = document.createElement('select');
  typeSelect.setAttribute('aria-label', '値の種類');
  const typeOptions = [
    ['string', '文字列'],
    ['number', '数値'],
    ['boolean', '真偽値'],
    ['null', '未設定'],
    ['json', 'オブジェクト / 配列']
  ];
  typeOptions.forEach(([type, label]) => {
    const option = document.createElement('option');
    option.value = type;
    option.textContent = label;
    typeSelect.appendChild(option);
  });
  const currentType = value === null ? 'null'
    : Array.isArray(value) || (typeof value === 'object' && value !== null) ? 'json'
      : typeof value;
  typeSelect.value = typeOptions.some(([type]) => type === currentType) ? currentType : 'string';

  const valueInput = makeTextControl(
    currentType === 'json' ? JSON.stringify(value, null, 2) : value,
    { multiline: currentType === 'json', rows: 3, placeholder: '値' }
  );
  const updateExtraValue = () => {
    const type = typeSelect.value;
    if (type === 'string') part[key] = valueInput.value;
    else if (type === 'number') {
      const number = Number(valueInput.value);
      if (!Number.isFinite(number)) {
        valueInput.setAttribute('aria-invalid', 'true');
        return;
      }
      valueInput.removeAttribute('aria-invalid');
      part[key] = number;
    } else if (type === 'boolean') part[key] = valueInput.value === 'true';
    else if (type === 'null') part[key] = null;
    else {
      try {
        part[key] = JSON.parse(valueInput.value);
        valueInput.removeAttribute('aria-invalid');
      } catch {
        valueInput.setAttribute('aria-invalid', 'true');
        return;
      }
    }
    savePartChange(onChange);
  };
  typeSelect.addEventListener('change', () => {
    const currentValue = part[key];
    if (typeSelect.value === 'boolean') valueInput.value = String(currentValue === true || currentValue === 'true');
    else if (typeSelect.value === 'null') valueInput.value = '';
    else if (typeSelect.value === 'json') valueInput.value = JSON.stringify(currentValue, null, 2);
    else valueInput.value = currentValue == null ? '' : String(currentValue);
    updateExtraValue();
  });
  valueInput.addEventListener('input', updateExtraValue);

  const removeButton = document.createElement('button');
  removeButton.type = 'button';
  removeButton.className = 'remove-btn small-btn';
  removeButton.textContent = '削除';
  removeButton.addEventListener('click', () => {
    delete part[key];
    savePartChange(onChange);
    refreshPartsEditor();
  });
  row.append(keyInput, typeSelect, valueInput, removeButton);
  return row;
}

function renderMonsterList() {
  const list = document.getElementById('monster-list');
  if (!list) return;

  list.innerHTML = state.monsters.map((monster, index) => `
    <button type="button" class="monster-list-item ${index === state.selectedMonsterIndex ? 'selected' : ''}" data-index="${index}">
      <span>${monster.name || '未命名'}</span>
      <small>${monster.race || '未分類'} · ${monster.rank || 0}等級</small>
    </button>
  `).join('');

  list.querySelectorAll('.monster-list-item').forEach((button) => {
    button.addEventListener('click', () => {
      state.selectedMonsterIndex = Number(button.dataset.index);
      renderSelectedMonster();
    });
  });
}

function renderPartsEditor() {
  const mainContainer = document.getElementById('main-parts-editor');
  const subContainer = document.getElementById('sub-parts-editor');
  const monster = state.monsters[state.selectedMonsterIndex];
  if (!monster) return;

  mainContainer.innerHTML = '';
  subContainer.innerHTML = '';

  if (!monster.parts || typeof monster.parts !== 'object') monster.parts = {};
  if (!Array.isArray(monster.parts.main)) monster.parts.main = [];
  if (!Array.isArray(monster.parts.sub)) monster.parts.sub = [];
  const mainParts = monster.parts.main;
  const subParts = monster.parts.sub;
  const refreshPartsEditor = () => renderPartsEditor();

  mainParts.forEach((part, index) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'part-editor-block';
    const label = document.createElement('h5');
    label.textContent = `Mパーツ ${index + 1}`;
    wrapper.appendChild(label);
    renderPartInput(wrapper, part, () => {}, refreshPartsEditor);
    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'remove-btn small-btn';
    removeButton.textContent = 'Mパーツを削除';
    removeButton.addEventListener('click', () => {
      monster.parts.main.splice(index, 1);
      saveData();
      refreshPartsEditor();
    });
    wrapper.appendChild(removeButton);
    mainContainer.appendChild(wrapper);
  });

  subParts.forEach((part, index) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'part-editor-block';
    const label = document.createElement('h5');
    label.textContent = `S${index + 1}パーツ`;
    wrapper.appendChild(label);
    renderPartInput(wrapper, part, () => {}, refreshPartsEditor);
    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'remove-btn small-btn';
    removeButton.textContent = 'Sパーツを削除';
    removeButton.addEventListener('click', () => {
      monster.parts.sub.splice(index, 1);
      saveData();
      refreshPartsEditor();
    });
    wrapper.appendChild(removeButton);
    subContainer.appendChild(wrapper);
  });

  const addMainButton = document.createElement('button');
  addMainButton.type = 'button';
  addMainButton.className = 'ghost-btn small-btn';
  addMainButton.textContent = 'Mパーツを追加';
  addMainButton.addEventListener('click', () => {
    monster.parts.main.push({ name: '', control_cost_bonus: 0 });
    saveData();
    refreshPartsEditor();
  });
  mainContainer.appendChild(addMainButton);

  const addSubButton = document.createElement('button');
  addSubButton.type = 'button';
  addSubButton.className = 'ghost-btn small-btn';
  addSubButton.textContent = 'Sパーツを追加';
  addSubButton.addEventListener('click', () => {
    monster.parts.sub.push({ name: '', control_cost_bonus: 0 });
    saveData();
    refreshPartsEditor();
  });
  subContainer.appendChild(addSubButton);
}

function renderSelectedMonster() {
  const form = document.getElementById('monster-editor-form');
  const emptyState = document.getElementById('editor-empty');
  const monster = state.monsters[state.selectedMonsterIndex];
  if (!monster) {
    form.classList.add('hidden');
    emptyState.classList.remove('hidden');
    return;
  }

  form.classList.remove('hidden');
  emptyState.classList.add('hidden');

  document.getElementById('monster-name').value = monster.name || '';
  document.getElementById('monster-race').value = monster.race || '';
  document.getElementById('monster-rank').value = monster.rank || 0;
  document.getElementById('monster-control-cost').value = monster.control_cost ?? monster.controlCost ?? 0;

  const status = monster.status || {};
  document.getElementById('status-hp').value = status.hp ?? 0;
  document.getElementById('status-ac').value = status.ac ?? 0;
  document.getElementById('status-initiative').value = status.initiative ?? 0;
  document.getElementById('status-strength').value = status.strength ?? 0;
  document.getElementById('status-dexterity').value = status.dexterity ?? 0;
  document.getElementById('status-constitution').value = status.constitution ?? 0;
  document.getElementById('status-intelligence').value = status.intelligence ?? 0;
  document.getElementById('status-wisdom').value = status.wisdom ?? 0;
  document.getElementById('status-charisma').value = status.charisma ?? 0;

  const attack = monster.basic_attack || {};
  document.getElementById('attack-name').value = attack.name || '';
  document.getElementById('attack-damage').value = attack.damage || '';
  document.getElementById('attack-damage-type').value = attack.damage_type || '';
  document.getElementById('attack-bonus').value = attack.bonus || '';
  document.getElementById('attack-description').value = attack.description || '';
  document.getElementById('attack-tags').value = (attack.tags || []).join('\n');

  const trait = monster.unique_trait || {};
  document.getElementById('trait-name').value = trait.name || '';
  document.getElementById('trait-description').value = trait.description || '';
  document.getElementById('trait-effects').value = (trait.effects || []).join('\n');
  document.getElementById('trait-bonuses').value = (trait.bonuses || []).join('\n');
  document.getElementById('trait-tags').value = (trait.tags || []).join('\n');

  renderPartsEditor();
  renderMonsterList();
}

function collectMonsterFromForm() {
  const monster = state.monsters[state.selectedMonsterIndex];
  if (!monster) return;

  monster.name = document.getElementById('monster-name').value.trim() || '未命名';
  monster.race = document.getElementById('monster-race').value.trim() || '未分類';
  monster.rank = asNumber(document.getElementById('monster-rank').value, monster.rank || 1);
  monster.control_cost = asNumber(document.getElementById('monster-control-cost').value, monster.control_cost ?? 0);

  monster.status = {
    hp: asNumber(document.getElementById('status-hp').value, monster.status?.hp ?? 0),
    ac: asNumber(document.getElementById('status-ac').value, monster.status?.ac ?? 8),
    initiative: asNumber(document.getElementById('status-initiative').value, monster.status?.initiative ?? 0),
    strength: asNumber(document.getElementById('status-strength').value, monster.status?.strength ?? 0),
    dexterity: asNumber(document.getElementById('status-dexterity').value, monster.status?.dexterity ?? 0),
    constitution: asNumber(document.getElementById('status-constitution').value, monster.status?.constitution ?? 0),
    intelligence: asNumber(document.getElementById('status-intelligence').value, monster.status?.intelligence ?? 0),
    wisdom: asNumber(document.getElementById('status-wisdom').value, monster.status?.wisdom ?? 0),
    charisma: asNumber(document.getElementById('status-charisma').value, monster.status?.charisma ?? 0)
  };

  monster.basic_attack = {
    name: document.getElementById('attack-name').value.trim() || '基本攻撃',
    damage: document.getElementById('attack-damage').value.trim(),
    damage_type: document.getElementById('attack-damage-type').value.trim(),
    bonus: document.getElementById('attack-bonus').value.trim(),
    description: document.getElementById('attack-description').value.trim(),
    tags: parseListInput(document.getElementById('attack-tags').value)
  };

  monster.unique_trait = {
    name: document.getElementById('trait-name').value.trim() || '固有特性',
    description: document.getElementById('trait-description').value.trim(),
    effects: parseListInput(document.getElementById('trait-effects').value),
    bonuses: parseListInput(document.getElementById('trait-bonuses').value),
    tags: parseListInput(document.getElementById('trait-tags').value)
  };

  saveData();
  renderMonsterList();
}

function addMonster() {
  state.monsters.push(createEmptyMonster());
  state.selectedMonsterIndex = state.monsters.length - 1;
  saveData();
  renderSelectedMonster();
}

function bindForm() {
  const form = document.getElementById('monster-editor-form');
  if (!form) return;

  form.addEventListener('input', () => {
    collectMonsterFromForm();
  });

  form.addEventListener('change', () => {
    collectMonsterFromForm();
  });

  document.getElementById('save-monster-data').addEventListener('click', () => {
    collectMonsterFromForm();
    alert('保存しました。');
  });

  document.getElementById('export-monster-data').addEventListener('click', () => exportMonsterData());
  document.getElementById('refresh-latest-monster-data').addEventListener('click', refreshLatestMonsterData);

  const importFileInput = document.getElementById('import-monster-file');
  document.getElementById('import-monster-data').addEventListener('click', () => {
    importFileInput.click();
  });
  importFileInput.addEventListener('change', async () => {
    const [file] = importFileInput.files;
    if (file) await importMonsterData(file);
    importFileInput.value = '';
  });

  document.getElementById('add-monster-btn').addEventListener('click', () => {
    addMonster();
  });
}

function init() {
  const loaded = loadData();
  const storedMonsters = loaded && Array.isArray(loaded.monsters) ? loaded.monsters : [];
  const hasOnlyPlaceholders = storedMonsters.length > 0 && storedMonsters.every(isPlaceholderMonster);

  const baseData = window.mergeMonsterData(
    loaded && storedMonsters.length > 0 && !hasOnlyPlaceholders ? loaded : DEFAULT_DATA
  );
  state.monsters = baseData.monsters.length > 0 ? baseData.monsters : [createEmptyMonster()];
  if (!loaded || loaded.monsterDataVersion !== window.MONSTER_DATA_VERSION || hasOnlyPlaceholders) {
    saveData();
  }

  state.selectedMonsterIndex = 0;
  bindForm();
  renderSelectedMonster();
}

init();
