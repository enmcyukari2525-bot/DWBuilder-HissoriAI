const TEAM_SIZE = Number.POSITIVE_INFINITY;
const STORAGE_KEY = 'dunwithin-monster-data-v1';
const FORMATION_STORAGE_KEY = 'dunwithin-saved-formations-v1';
const FORMATION_SLOT_COUNT = 3;

function loadMonsterData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return null;
    }
    const parsed = JSON.parse(stored);
    if (parsed && Array.isArray(parsed.monsters)) {
      return parsed;
    }
  } catch (error) {
    console.warn('Failed to load persisted monster data.', error);
  }
  return null;
}

const sourceData = {
  source: 'https://wikiwiki.jp/dunwith/',
  version: '0.5.4(b.187)',
  rank: 9,
  monsters: [
    {
      name: 'ベヒーモス',
      race: '野獣',
      rank: 9,
      control_cost: 32,
      status: { hp: 275, ac: 8, initiative: 0, strength: 40, dexterity: 8, constitution: 38, intelligence: 4, wisdom: 12, charisma: 8 },
      basic_attack: { name: '重撃', damage: '4d6+15', damage_type: '殴打', bonus: '筋力修正値' },
      unique_trait: { name: '巨獣の甲殻', effects: ['斬撃耐性', '伏せ状態免疫', '進行開始時に魔晶石20スタックを獲得', '隣接する狩り場で敵が呪文を詠唱すると耐久力セーヴを強制し、失敗時に魔晶石を1消費して呪文を無効化'] },
      parts: { main: [{ name: '巨獣の拳', control_cost_bonus: 12, stat_bonus: { strength: 5 }, effects: ['殴打ダメージ8d', '雷鳴ダメージ4d10', '対象の一時的HPを除去', '全敵に追加雷鳴ダメージ', 'セーヴ失敗時に伏せ状態'] }], sub: [{ name: '不壊の肉体', control_cost_bonus: 6, stat_bonus: { constitution: 4 }, effects: ['物理ダメージ減少20(+耐久力修正値)', '力場ダメージ脆弱'] }, { name: '巨獣の生命力', control_cost_bonus: 6, stat_bonus: { max_hp: 50 }, effects: ['最大HP増加', '殴打ダメージに耐久力修正値を追加'] }] }
    },
    {
      name: 'ネメア',
      race: '野獣',
      rank: 9,
      control_cost: 32,
      status: { hp: 190, ac: 8, initiative: 0, strength: 18, dexterity: 20, constitution: 26, intelligence: 38, wisdom: 34, charisma: 28 },
      basic_attack: { name: '魔力の矢', damage: '5d6+14', damage_type: '力場', bonus: '知力修正値' },
      unique_trait: { name: '獅子王の心臓', effects: ['恐怖免疫', '沈黙免疫', '自身の力場ダメージが敵の耐性と免疫を無視', '敵に押し潰された心臓を付与'] },
      parts: { main: [{ name: '真理の笏', control_cost_bonus: 12, stat_bonus: { intelligence: 5 }, effects: ['力場ダメージ6d8', '殴打ダメージ4d8', '対象を空中に打ち上げる', '全敵に追加殴打ダメージ'] }], sub: [{ name: '万象の洞察', control_cost_bonus: 6, stat_bonus: { strength: 4 }, effects: ['クリティカル攻撃を受けると反応', '物理ダメージ免疫2ターン', '前列の敵に力場ダメージ10d10'] }, { name: '超越の外套', control_cost_bonus: 6, stat_bonus: { spell_save_dc: 4 }, effects: ['交戦開始時に前列の敵を力場・殴打ダメージ脆弱にする', '自身に一時HP6d8'] }] }
    },
    {
      name: 'エンメリア',
      race: '精霊',
      rank: 9,
      control_cost: 32,
      status: { hp: 185, ac: 8, initiative: 0, strength: 10, dexterity: 22, constitution: 24, intelligence: 34, wisdom: 40, charisma: 36 },
      immunities: ['火炎', '冷気', '電撃'],
      basic_attack: { name: '雷の矢', damage: '5d6+15', damage_type: '電撃', bonus: '判断力修正値' },
      unique_trait: { name: '精霊界の権能', effects: ['火炎免疫', '冷気免疫', '電撃免疫', '味方の元素ダメージを判断力修正値分増加', '自身の火炎・冷気・電撃ダメージが敵の耐性と免疫を無視'] },
      parts: { main: [{ name: '万物の調和', control_cost_bonus: 12, stat_bonus: { wisdom: 5 }, effects: ['火炎ダメージ6d8', '冷気ダメージ6d8', '電撃ダメージ6d8', '対象と後方の敵を同時に攻撃'] }], sub: [{ name: '精霊の君臨', control_cost_bonus: 6, stat_bonus: { charisma: 4 }, effects: ['元素ダメージ耐性', '被ダメージ時に敵へ追加元素ダメージ'] }, { name: '元素の花冠', control_cost_bonus: 6, stat_bonus: { intelligence: 4 }, effects: ['交戦開始時に全敵を火炎・冷気・電撃ダメージ脆弱にする'] }] }
    },
    {
      name: '超越体',
      race: '精霊',
      rank: 9,
      control_cost: 32,
      status: { hp: 160, ac: 8, initiative: 0, strength: 6, dexterity: 16, constitution: 20, intelligence: 34, wisdom: 38, charisma: 40 },
      immunities: ['精神'],
      basic_attack: { name: '精神圧迫', damage: '5d6+15', damage_type: '精神', bonus: '魅力修正値' },
      unique_trait: { name: '世界の精神', effects: ['精神免疫', '魅了免疫', '自身の精神ダメージが敵の耐性と免疫を無視', '精神ダメージを受けた敵に超越的連結を付与'] },
      parts: { main: [{ name: '超越の杖', control_cost_bonus: 12, stat_bonus: { charisma: 5 }, effects: ['精神ダメージ6d10', '超越的連結状態の敵に追加精神ダメージ3d8'] }], sub: [{ name: '万心の洞察', control_cost_bonus: 6, stat_bonus: { wisdom: 4 }, effects: ['攻撃を受けると反応', '後列の敵に精神ダメージ6d12', 'セーヴ失敗時に主行動消費を追加'] }, { name: '世界樹の枝', control_cost_bonus: 6, stat_bonus: { spell_save_dc: 4 }, effects: ['交戦開始時に後列の敵を精神ダメージ脆弱にする', '混乱を付与'] }] }
    },
    {
      name: 'グリムリーパー',
      race: 'アンデッド',
      rank: 9,
      control_cost: 32,
      status: { hp: 170, ac: 8, initiative: 0, strength: 24, dexterity: 36, constitution: 22, intelligence: 14, wisdom: 20, charisma: 26 },
      immunities: ['死霊'],
      basic_attack: { name: '迅速斬撃', damage: '5d6+13', damage_type: '斬撃', bonus: '敏捷力修正値' },
      unique_trait: { name: '亡者の魂壺', effects: ['死霊免疫', '恐怖免疫', '自身の斬撃・死霊ダメージが敵の耐性と免疫を無視', '敵死亡時に魂壺を1チャージ', '20チャージ消費で全敵に死霊ダメージ8d10', '全敵に死霊ダメージ脆弱を付与'] },
      parts: { main: [{ name: '魂収穫の大鎌', control_cost_bonus: 12, stat_bonus: { dexterity: 5 }, effects: ['斬撃ダメージ6d10', '死霊ダメージ3d10', '前列の敵を攻撃', '魅力セーヴ失敗時に魂壺を1チャージ'] }], sub: [{ name: '死神のローブ', control_cost_bonus: 6, stat_bonus: { charisma: 4 }, effects: ['死霊ダメージ免疫', '物理ダメージ耐性', '攻撃を受けると攻撃者に死霊ダメージ4d8'] }, { name: '死の残響', control_cost_bonus: 6, stat_bonus: { initiative: 9 }, effects: ['敵を倒すと味方全員に死の残響を付与', '1スタックにつき死霊ダメージ1d8増加', '最大20スタック'] }] }
    },
    {
      name: 'フュシス',
      race: 'アンデッド',
      rank: 9,
      control_cost: 32,
      status: { hp: 210, ac: 8, initiative: 0, strength: 12, dexterity: 16, constitution: 32, intelligence: 30, wisdom: 34, charisma: 38 },
      immunities: ['死霊'],
      basic_attack: { name: '血液抽出', damage: '5d6+14', damage_type: '死霊', bonus: '魅力修正値' },
      unique_trait: { name: '血の君臨', effects: ['死霊免疫', '魅了免疫', '敵に血の君臨を1付与', '出血付与または出血ダメージ時に血の君臨を追加', '自身の死霊ダメージが敵の耐性と免疫を無視'] },
      parts: { main: [{ name: '真紅の玉座', control_cost_bonus: 12, stat_bonus: { charisma: 5 }, effects: ['死霊ダメージ6d10', '血の君臨スタックごとに追加死霊ダメージ1d10', '後列の敵を出血状態にする'] }], sub: [{ name: '血の帳', control_cost_bonus: 6, stat_bonus: { wisdom: 4 }, effects: ['出血状態の敵が死亡すると主行動を1回回復'] }, { name: '生命の源', control_cost_bonus: 6, stat_bonus: { spell_save_dc: 4 }, effects: ['近接攻撃を受けると反応', '攻撃者に死霊ダメージ3d10', '攻撃者に出血を付与', '自身を3d10回復'] }] }
    },
    {
      name: 'フェンリル',
      race: '野獣',
      rank: 8,
      control_cost: 20,
      status: {
        hp: 135,
        ac: 8,
        initiative: 2,
        strength: 27,
        dexterity: 20,
        constitution: 24,
        intelligence: 6,
        wisdom: 14,
        charisma: 10
      },
      immunities: ['冷気'],
      resistances: [],
      vulnerabilities: [],
      basic_attack: {
        name: '基本斬撃',
        damage: '5d6+筋力修正値',
        damage_type: '斬撃',
        description: '敵を斬る。',
        tags: ['主行動', '筋力基準', '近接', '筋力命中ロール']
      },
      unique_trait: {
        name: '終末の遠吠え',
        bonuses: ['冷気免疫', '恐怖免疫'],
        description: '交戦開始時、すべての味方は終末の遠吠えを3スタック得る。',
        tags: []
      },
      parts: {
        main: [
          {
            name: '霜牙の大剣',
            control_cost_bonus: 6,
            stat_bonus: { strength: 3 },
            damage: [{ dice: '4d10', bonus: '筋力修正値', damage_type: '斬撃' }, { dice: '3d8', bonus: '判断力修正値', damage_type: '冷気' }],
            description: '対象を斬り裂き、すべての敵に冷気ダメージを与える。',
            tags: ['主行動', '筋力基準', '呪文', '近接', '筋力命中ロール', '敏捷力セーヴ']
          }
        ],
        sub: [
          {
            name: '粉砕',
            control_cost_bonus: 3,
            stat_bonus: { wisdom: 3 },
            description: 'クリティカルヒットを与えると、対象に斬撃ダメージ脆弱性および冷気ダメージ脆弱性を付与する。',
            effects: [{ name: '斬撃ダメージ脆弱', duration: '1交戦 / 非戦闘時2ターン' }, { name: '冷気ダメージ脆弱', duration: '1交戦 / 非戦闘時2ターン' }]
          },
          {
            name: '捕食者の本能',
            control_cost_bonus: 3,
            stat_bonus: { initiative: 7 },
            description: 'HP35%以下の敵を攻撃する際、確定クリティカルが発生する。戦場で誰かが死亡すると、即座に消費した基本攻撃1回を回復する。'
          }
        ]
      }
    },
    {
      name: 'スレイプニル',
      race: '野獣',
      rank: 8,
      control_cost: 20,
      status: {
        hp: 115,
        ac: 8,
        initiative: 0,
        strength: 18,
        dexterity: 25,
        constitution: 18,
        intelligence: 12,
        wisdom: 20,
        charisma: 14
      },
      immunities: [],
      resistances: [],
      vulnerabilities: [],
      basic_attack: {
        name: '致命の射撃',
        damage: '5d6+7',
        damage_type: '刺突',
        bonus: '敏捷力修正値',
        description: '遠距離武器で敵を撃つ。',
        tags: ['主行動', '敏捷力補正', '遠距離', '敏捷力命中ロール']
      },
      unique_trait: {
        name: '疾風の蹄',
        bonuses: ['拘束免疫', '伏せ状態免疫'],
        description: '交戦開始時、すべての味方に疾風の蹄を2スタック付与する。',
        tags: ['範囲']
      },
      parts: {
        main: [
          {
            name: '流星の槍',
            control_cost_bonus: 6,
            stat_bonus: null,
            damage: [{ dice: '6d8', bonus: '敏捷力修正値', damage_type: '刺突' }],
            description: '対象とその背後の敵を一直線に貫通する刺突ダメージを与える。',
            tags: ['主行動', '敏捷力基準', '遠距離', '敏捷力命中ロール']
          }
        ],
        sub: [
          {
            name: '彗星の矢',
            control_cost_bonus: 3,
            stat_bonus: { ranged_attack: 3 },
            damage: [{ dice: '3d8', bonus: '判断力修正値', damage_type: '雷鳴' }],
            description: '遠距離攻撃が敵に命中すると反応し、すべての敵に3d8の追加雷鳴ダメージを与える。',
            tags: ['反応行動', '判断力基準', '範囲', '敏捷力セーヴ']
          },
          {
            name: '反撃機動',
            control_cost_bonus: 3,
            stat_bonus: null,
            description: '遠隔攻撃の対象になると反応して攻撃を回避し、即座に消費した基本攻撃1回を回復する。',
            tags: ['反応行動']
          }
        ]
      }
    },
    {
      name: 'キリン',
      race: '精霊',
      rank: 8,
      control_cost: 20,
      status: {
        hp: 110,
        ac: 8,
        initiative: null,
        strength: 12,
        dexterity: 18,
        constitution: 16,
        intelligence: 20,
        wisdom: 26,
        charisma: 18
      },
      immunities: ['電撃'],
      resistances: ['雷鳴'],
      vulnerabilities: [],
      basic_attack: {
        name: '雷の矢',
        damage: '5d6+8',
        damage_type: '電撃',
        bonus: '知力修正値',
        description: '稲妻を放つ。',
        tags: ['主行動', '判断力基準', '呪文', '遠距離', '判断力命中ロール']
      },
      unique_trait: {
        name: '過負荷',
        description: '自身の電撃ダメージが対象の抵抗や免疫を無視する。誰かが電撃能力を使用すると、すべての敵に静電気を付与する。',
        tags: ['呪文', '耐久力セーブ']
      },
      parts: {
        main: [
          {
            name: '天罰の落雷',
            damage: [{ dice: '6d10', bonus: '判断力修正値', damage_type: '電撃' }],
            description: '戦場後列の敵に強力な電撃ダメージを与える。',
            tags: ['主行動', '判断力基準', '遠距離', '呪文', '敏捷力セーヴ']
          }
        ],
        sub: [
          {
            name: '稲妻の跳躍',
            damage: [{ dice: '2d8', bonus: '判断力修正値', damage_type: '電撃' }],
            description: '近接攻撃の対象になると、閃光のように攻撃を回避し、すべての敵に2d8の追加電撃ダメージを与える。',
            tags: ['反応行動', '判断力基準', '近接', '呪文', '耐久力セーヴ']
          },
          {
            name: '雷雲の帳',
            damage: [{ dice: '3d8', bonus: '判断力修正値', damage_type: '電撃' }],
            description: '交戦開始時、前列のすべての敵に3d8の追加電撃ダメージを与え、反応行動不可状態を付与する。',
            tags: ['判断力基準', '範囲', '耐久力セーヴ']
          }
        ]
      }
    },
    {
      name: 'エーテリアル',
      race: '精霊',
      rank: 8,
      control_cost: 20,
      status: {
        hp: 100,
        ac: 8,
        initiative: null,
        strength: 6,
        dexterity: 16,
        constitution: 14,
        intelligence: 24,
        wisdom: 18,
        charisma: 27
      },
      immunities: [],
      resistances: ['光輝'],
      vulnerabilities: [],
      basic_attack: {
        name: '光線',
        damage: '5d6+8',
        damage_type: '光輝',
        description: '強い光を放つ。',
        tags: ['主行動', '魅力基準', '呪文', '遠距離', '魅力命中ロール(+15)']
      },
      unique_trait: {
        name: '太陽の涙',
        description: '自身の光輝ダメージが対象の抵抗や免疫を無視する。交戦開始時、超新星スタックを1獲得する。10スタックに達するとすべてのスタックを消費して、ダンジョン区域のすべての敵に10d10の追加光輝ダメージを与える。',
        tags: ['魅力基準', '範囲', '呪文', '敏捷力セーヴ']
      },
      parts: {
        main: [
          {
            name: '裁きの光線',
            damage: [{ dice: '6d8', damage_type: '光輝' }],
            description: '対象とその後ろの敵を貫く強力な光輝ダメージを与える。',
            tags: ['主行動', '魅力基準', '遠距離', '呪文', '魅力命中ロール']
          }
        ],
        sub: [
          {
            name: '懲罰の鏡',
            damage: [{ dice: '4d6', damage_type: '光輝' }],
            description: '呪文の対象になると反応して該当する呪文を無効化し、攻撃者に4d6の追加光輝ダメージを反射する。',
            tags: ['反応行動', '魅力基準', '近接', '呪文', '魅力セーヴ']
          },
          {
            name: 'エーテルの盾',
            description: '交戦開始時、すべての味方にエーテル・シールドを付与する。',
            tags: ['範囲']
          }
        ]
      }
    },
    {
      name: 'リッチ・クイーン',
      race: 'アンデッド',
      rank: 8,
      control_cost: 20,
      status: {
        hp: 105,
        ac: 8,
        initiative: null,
        strength: 8,
        dexterity: 12,
        constitution: 14,
        intelligence: 26,
        wisdom: 22,
        charisma: 20
      },
      immunities: ['死霊'],
      resistances: [],
      vulnerabilities: [],
      basic_attack: {
        name: '闇の矢',
        damage: '5d6+8',
        damage_type: '死霊',
        bonus: '知力修正値',
        description: '闇のエネルギーを放つ。',
        tags: ['主行動', '知力基準', '遠距離', '呪文', '知力命中ロール']
      },
      unique_trait: {
        name: 'パワー・ワード：デス',
        description: '交戦開始時、HPが20%以下の敵に即死を試みる。成功すると自身のHPを回復し、ダンジョン全区域のすべての味方が魂を獲得する。',
        tags: ['魅力基準', '範囲', '魅力セーヴ']
      },
      parts: {
        main: [
          {
            name: '死の指',
            damage: [{ dice: '6d10', bonus: '知力修正値×2', damage_type: '死霊' }],
            description: '対象に死霊ダメージを与え、魂を3スタック獲得する。',
            tags: ['主行動', '知力基準', '遠距離', '呪文', '魅力セーヴ']
          }
        ],
        sub: [
          {
            name: '死霊の波動',
            damage: [{ dice: '2d8', damage_type: '精神' }],
            description: '自身の呪文に2d8の追加精神ダメージを追加する。自身の死霊ダメージが対象の抵抗と免疫を無視する。',
            tags: ['判断力基準']
          },
          {
            name: '魂の残響',
            description: '交戦中に誰かが死亡すると、全区域のすべての味方に魂を付与し、自身の次の攻撃が確定クリティカルになる。',
            tags: ['範囲']
          }
        ]
      },
      status_effects: {
        魂: {
          description: '与える死霊ダメージがスタック数だけ増加する。',
          max_stacks: 10
        }
      }
    },
    {
      name: 'ナイトウォーカー',
      race: 'アンデッド',
      rank: 8,
      control_cost: 20,
      status: {
        hp: 120,
        ac: 8,
        initiative: null,
        strength: 22,
        dexterity: 26,
        constitution: 18,
        intelligence: 10,
        wisdom: 12,
        charisma: 14
      },
      immunities: [],
      resistances: [],
      vulnerabilities: ['光輝'],
      basic_attack: {
        name: '迅速斬撃',
        damage: '5d6+8',
        damage_type: '斬撃',
        bonus: '敏捷力修正値',
        description: '素早く敵を斬る。',
        tags: ['主行動', '敏捷力基準', '近接', '敏捷力命中ロール(15+敏捷力修正値)']
      },
      unique_trait: {
        name: '深淵の帳',
        description: '交戦開始時、自身と後列の味方を透明化状態にし、透明化状態のすべての味方に影の加護を付与する。',
        tags: []
      },
      parts: {
        main: [
          {
            name: '形態切断',
            damage: [{ dice: '4d10', bonus: '敏捷力修正値', damage_type: '死霊' }, { dice: '6d8', bonus: '判断力修正値', damage_type: '精神' }],
            description: '前列の敵を斬りつけ、死霊ダメージを与える。自身が隠密状態の場合、さらに精神ダメージを与える。',
            tags: ['主行動', '敏捷力基準', '近接', '敏捷力命中ロール(7+敏捷力修正値)']
          }
        ],
        sub: [
          {
            name: '影の捕食',
            description: '攻撃時、対象に影の捕食スタックを付与する。',
            tags: ['呪文', '魅力セーヴ(DC16+魅力修正値)']
          },
          {
            name: '畏怖の一撃',
            damage: [{ dice: '3d8', damage_type: '精神' }],
            description: 'クリティカルヒットを与えると、対象に3d8の追加精神ダメージを与え、恐怖状態にする。',
            tags: ['判断力基準', '呪文', '判断力セーヴ']
          }
        ]
      }
    }
  ]
};

const persistedMonsterData = loadMonsterData();
const activeData = window.mergeMonsterData(
  persistedMonsterData && persistedMonsterData.monsters.length > 0 ? persistedMonsterData : sourceData
);
if (!persistedMonsterData || persistedMonsterData.monsterDataVersion !== window.MONSTER_DATA_VERSION) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(activeData));
  } catch (error) {
    console.error('Failed to migrate stored monster data to the updated rank nine dataset.', error);
  }
}
function mapMonsterData(data) {
  return data.monsters.map((monster, index) => {
    const status = monster.status || {};
    const allAbilityNames = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];

    const primaryAbility = allAbilityNames.reduce((best, current) => {
      if (!best) return current;
      return status[current] > status[best] ? current : best;
    }, null);

    const allParts = [
      ...(monster.parts?.main || []),
      ...(monster.parts?.sub || [])
    ];

    const partScore = allParts.reduce((sum, part) => {
      const bonuses = Object.values(part.stat_bonus || {});
      return sum + bonuses.reduce((acc, value) => acc + (Number(value) || 0), 0);
    }, 0);

    return {
      id: `monster-${index + 1}`,
      name: monster.name,
      race: monster.race,
      rank: monster.rank,
      controlCost: monster.control_cost,
      hp: status.hp || 0,
      attack: status.strength || 0,
      defense: status.constitution || 0,
      speed: status.dexterity || 0,
      insight: status.wisdom || 0,
      note: `${monster.basic_attack?.name || '攻撃'} · ${monster.unique_trait?.name || '特性'}`,
      role: primaryAbility,
      synergy: ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'],
      primaryAbility,
      status,
      basicAttack: monster.basic_attack,
      trait: monster.unique_trait,
      nativeParts: monster.parts || {},
      parts: allParts,
      mainParts: monster.parts?.main || [],
      subParts: monster.parts?.sub || [],
      partScore,
      type: 'monster'
    };
  });
}

let monsters = mapMonsterData(activeData);
let latestMonsterData = JSON.stringify(activeData);

const selectedIds = [];
const teamMemberMap = new Map();
const equippedParts = {};
const formationSlots = Array(FORMATION_SLOT_COUNT).fill(null);
const activeMonsterState = {
  monsterId: null
};

function getSelectedMonsters() {
  return selectedIds.map((teamId) => teamMemberMap.get(teamId)).filter(Boolean);
}

function createTeamMember(monster) {
  const clone = JSON.parse(JSON.stringify(monster));
  const teamId = createTeamMemberId();
  clone.id = teamId;
  clone.baseMonsterId = monster.id;
  return clone;
}

function createTeamMemberId() {
  return `team-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function getMonsterById(monsterId) {
  return teamMemberMap.get(monsterId) || monsters.find((monster) => monster.id === monsterId) || null;
}
const rosterFilters = {
  race: 'all',
  rank: 'all',
  stats: []
};
const abilityLabels = {
  strength: '筋力',
  dexterity: '敏捷力',
  constitution: '耐久力',
  intelligence: '知力',
  wisdom: '判断力',
  charisma: '魅力'
};

function formatAbilityName(abilityKey) {
  return abilityLabels[abilityKey] || abilityKey || '不明';
}

const abilityOrder = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
const partPickerState = {
  monsterId: null,
  slotKey: null,
  rank: 'all',
  tag: '',
  keyword: '',
  sortStat: null,
  sortDirection: 'desc'
};

function buildPartCatalog() {
  const catalog = [];

  monsters.forEach((monster) => {
    (monster.mainParts || []).forEach((part, index) => {
      catalog.push({
        id: `${monster.id}-main-${index}`,
        sourceMonsterId: monster.id,
        sourceMonsterName: monster.name,
        rank: monster.rank,
        slot: 'main',
        ...part
      });
    });

    (monster.subParts || []).forEach((part, index) => {
      catalog.push({
        id: `${monster.id}-sub-${index}`,
        sourceMonsterId: monster.id,
        sourceMonsterName: monster.name,
        rank: monster.rank,
        slot: 'sub',
        ...part,
        slotLabel: `S${index + 1}`
      });
    });
  });

  return catalog;
}

function getAvailableRaceOptions() {
  return [...new Set(monsters.map((monster) => monster.race))].sort();
}

function getAvailableRankOptions() {
  return [...new Set(monsters.map((monster) => monster.rank))].sort((a, b) => b - a);
}

function populateRosterFilters() {
  const raceFilter = document.getElementById('race-filter');
  const rankFilter = document.getElementById('rank-filter');
  const statFilterList = document.getElementById('stat-filter-list');

  if (!raceFilter || !rankFilter) return;

  const raceOptions = getAvailableRaceOptions();
  raceFilter.innerHTML = '<option value="all">すべて</option>' + raceOptions.map((race) => `<option value="${race}">${race}</option>`).join('');
  raceFilter.value = rosterFilters.race;

  const rankOptions = getAvailableRankOptions();
  rankFilter.innerHTML = '<option value="all">すべて</option>' + rankOptions.map((rank) => `<option value="${rank}">${rank}等級</option>`).join('');
  rankFilter.value = rosterFilters.rank;

  if (statFilterList) {
    statFilterList.innerHTML = Object.entries(abilityLabels).map(([key, label]) => {
      const selected = rosterFilters.stats.includes(key);
      return `
        <button type="button" class="stat-chip ${selected ? 'selected' : ''}" data-stat-filter="${key}">${label}</button>
      `;
    }).join('');

    statFilterList.querySelectorAll('[data-stat-filter]').forEach((button) => {
      button.addEventListener('click', () => {
        const key = button.getAttribute('data-stat-filter');
        const index = rosterFilters.stats.indexOf(key);
        if (index >= 0) {
          rosterFilters.stats.splice(index, 1);
        } else {
          rosterFilters.stats.push(key);
        }
        updateView();
      });
    });
  }
}

function getRecommendedMatchScore(monster) {
  if (!rosterFilters.stats.length) {
    return 0;
  }

  const recommended = getTopAbilityKeys(monster, 2);
  return rosterFilters.stats.reduce((score, abilityKey) => {
    const index = recommended.indexOf(abilityKey);
    if (index === -1) {
      return score;
    }
    return score + (2 - index);
  }, 0);
}

function getFilteredMonsters() {
  const visible = monsters.filter((monster) => {
    const matchesRace = rosterFilters.race === 'all' || monster.race === rosterFilters.race;
    const matchesRank = rosterFilters.rank === 'all' || String(monster.rank) === String(rosterFilters.rank);

    const recommendedAbilities = new Set(getTopAbilityKeys(monster, 2));
    const matchesStats = rosterFilters.stats.length === 0 || rosterFilters.stats.some((abilityKey) => recommendedAbilities.has(abilityKey));

    return matchesRace && matchesRank && matchesStats;
  });

  return visible.sort((a, b) => {
    if (rosterFilters.stats.length > 0) {
      const scoreDifference = getRecommendedMatchScore(b) - getRecommendedMatchScore(a);
      if (scoreDifference !== 0) return scoreDifference;
    }

    return Number(b.rank || 0) - Number(a.rank || 0);
  });
}

let partCatalog = buildPartCatalog();

function parseAbilityKeyFromText(text) {
  if (!text) return null;

  const map = {
    筋力: 'strength',
    敏捷力: 'dexterity',
    耐久力: 'constitution',
    知力: 'intelligence',
    判断力: 'wisdom',
    魅力: 'charisma',
    strength: 'strength',
    dexterity: 'dexterity',
    constitution: 'constitution',
    intelligence: 'intelligence',
    wisdom: 'wisdom',
    charisma: 'charisma',
    STR: 'strength',
    DEX: 'dexterity',
    CON: 'constitution',
    INT: 'intelligence',
    WIS: 'wisdom',
    CHA: 'charisma'
  };

  const match = text.match(/(筋力|敏捷力|耐久力|知力|判断力|魅力|strength|dexterity|constitution|intelligence|wisdom|charisma|STR|DEX|CON|INT|WIS|CHA)(?:基準|修正値|補正|Modifier|bonus)?/i);
  if (!match) return null;

  return map[match[1]] || map[match[1].toLowerCase()] || map[match[1].toUpperCase()] || null;
}

function getPartStatBonusLabels(part) {
  const statLabels = {
    max_hp: '最大HP',
    ac: 'AC',
    initiative: 'Initiative',
    spell_save_dc: '呪文セーヴ難易度',
    ranged_attack: '遠距離攻撃'
  };
  return Object.entries(part.stat_bonus || {}).map(([key, value]) => {
    const label = abilityLabels[key] || statLabels[key] || key;
    const numericValue = Number(value);
    const formattedValue = Number.isFinite(numericValue) && numericValue >= 0 ? `+${numericValue}` : String(value);
    return `${label} ${formattedValue}`;
  });
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}

function getAbilityKeyFromPart(part) {
  const statBonusEntry = Object.entries(part.stat_bonus || {}).find(([key]) => ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'].includes(key));
  if (statBonusEntry) {
    return statBonusEntry[0];
  }

  const combinedText = [
    part.name || '',
    ...(part.effects || []),
    JSON.stringify(part.stat_bonus || {})
  ].join(' ');

  return parseAbilityKeyFromText(combinedText);
}

function getAbilityRankMap(monster) {
  const entries = Object.entries(monster.status || {})
    .filter(([key]) => abilityLabels[key])
    .map(([key, value]) => ({ key, value }));

  entries.sort((a, b) => b.value - a.value);

  const map = {};
  entries.forEach(({ key }, index) => {
    map[key] = index + 1;
  });

  return map;
}

function getPartFitColor(monster, part) {
  const abilityKey = getAbilityKeyFromPart(part);

  if (!abilityKey) {
    return 'neutral';
  }

  const rank = getAbilityRankMap(monster)[abilityKey] || 99;

  if (rank === 1) return 'blue';
  if (rank === 2) return 'yellow';
  return 'red';
}

function ensureActiveMonster() {
  const selectedMonsters = getSelectedMonsters();
  if (selectedMonsters.length > 0) {
    if (!activeMonsterState.monsterId || !teamMemberMap.has(activeMonsterState.monsterId)) {
      activeMonsterState.monsterId = selectedMonsters[0].id;
    }
    return;
  }

  if (!activeMonsterState.monsterId || !monsters.some((monster) => monster.id === activeMonsterState.monsterId)) {
    activeMonsterState.monsterId = monsters[0]?.id || null;
  }
}

function setActiveMonster(monsterId) {
  if (!monsterId || (!teamMemberMap.has(monsterId) && !monsters.some((monster) => monster.id === monsterId))) {
    return;
  }
  activeMonsterState.monsterId = monsterId;
  updateView();
}

function ensureEquippedMonster(monsterId) {
  if (!equippedParts[monsterId]) {
    equippedParts[monsterId] = { main: null, sub: [null, null] };
  }
}

function getEquippedPartId(monsterId, slotKey) {
  ensureEquippedMonster(monsterId);
  if (slotKey === 'main') return equippedParts[monsterId].main;
  return equippedParts[monsterId].sub[slotKey === 'sub1' ? 0 : 1] || null;
}

function getEquippedParts(monsterId) {
  ensureEquippedMonster(monsterId);
  return {
    main: equippedParts[monsterId].main,
    sub: [...equippedParts[monsterId].sub]
  };
}

function getEffectiveMonsterStatus(monsterId) {
  const monster = getMonsterById(monsterId);
  if (!monster) return null;

  const effective = { ...monster.status };
  const equipped = getEquippedParts(monsterId);
  const partIds = [equipped.main, ...equipped.sub].filter(Boolean);

  partIds.forEach((partId) => {
    const part = partCatalog.find((candidate) => candidate.id === partId);
    if (!part || !part.stat_bonus) return;
    Object.entries(part.stat_bonus).forEach(([key, value]) => {
      if (['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'].includes(key)) {
        effective[key] = (effective[key] || 0) + Number(value || 0);
      }
    });
  });

  return effective;
}

function setSlotPart(monsterId, slotKey, partId) {
  ensureEquippedMonster(monsterId);

  if (slotKey === 'main') {
    if (partId === null || partId === undefined) {
      equippedParts[monsterId].main = null;
      return;
    }
    equippedParts[monsterId].main = equippedParts[monsterId].main === partId ? null : partId;
    return;
  }

  const index = slotKey === 'sub1' ? 0 : 1;
  if (partId === null || partId === undefined) {
    equippedParts[monsterId].sub[index] = null;
    return;
  }

  const current = equippedParts[monsterId].sub[index];
  if (current === partId) {
    equippedParts[monsterId].sub[index] = null;
    return;
  }

  const otherIndex = index === 0 ? 1 : 0;
  if (equippedParts[monsterId].sub[otherIndex] === partId) {
    equippedParts[monsterId].sub[otherIndex] = null;
  }

  equippedParts[monsterId].sub[index] = partId;
}

function openPartPicker(monsterId, slotKey) {
  partPickerState.monsterId = monsterId;
  partPickerState.slotKey = slotKey;
  partPickerState.rank = 'all';
  partPickerState.tag = '';
  partPickerState.keyword = '';
  partPickerState.sortStat = null;
  partPickerState.sortDirection = 'desc';
  renderPartPicker();
}

function closePartPicker() {
  partPickerState.monsterId = null;
  partPickerState.slotKey = null;
  renderPartPicker();
}

function normalizePartSearchText(value) {
  return String(value).normalize('NFKC').toLowerCase();
}

function renderPartPickerResults(modal, monster) {
  const slotParts = partCatalog.filter((part) => part.slot === (partPickerState.slotKey === 'main' ? 'main' : 'sub'));
  const keyword = normalizePartSearchText(partPickerState.keyword.trim());
  const filteredParts = slotParts.filter((part) =>
    (partPickerState.rank === 'all' || Number(part.rank) === Number(partPickerState.rank)) &&
    (!partPickerState.tag || (Array.isArray(part.tags) && part.tags.includes(partPickerState.tag))) &&
    (!keyword || [
      part.name || '',
      ...(Array.isArray(part.tags) ? part.tags : []),
      ...getPartDescriptionLines(part),
      ...getPartDiceLines(part)
    ].some((text) => normalizePartSearchText(text).includes(keyword)))
  );
  if (partPickerState.sortStat) {
    const sortStat = partPickerState.sortStat;
    const direction = partPickerState.sortDirection === 'asc' ? 1 : -1;
    filteredParts.sort((a, b) => {
      const aRawBonus = a.stat_bonus?.[sortStat];
      const bRawBonus = b.stat_bonus?.[sortStat];
      const aBonus = Number(aRawBonus);
      const bBonus = Number(bRawBonus);
      const aHasBonus = aRawBonus !== undefined && aRawBonus !== null && Number.isFinite(aBonus);
      const bHasBonus = bRawBonus !== undefined && bRawBonus !== null && Number.isFinite(bBonus);
      if (aHasBonus !== bHasBonus) return aHasBonus ? -1 : 1;
      if (aHasBonus && aBonus !== bBonus) return (aBonus - bBonus) * direction;

      const aMatchesBasis = getAbilityKeyFromPart(a) === sortStat;
      const bMatchesBasis = getAbilityKeyFromPart(b) === sortStat;
      if (aMatchesBasis !== bMatchesBasis) return aMatchesBasis ? -1 : 1;
      return partCatalog.indexOf(a) - partCatalog.indexOf(b);
    });
  }

  const cardHtml = filteredParts.map((part) => {
    const fitColor = getPartFitColor(monster, part);
    const metaTags = [];
    if (part.slot === 'sub') metaTags.push(part.slotLabel || 'S');
    metaTags.push(...getPartStatBonusLabels(part));
    metaTags.push(part.sourceMonsterName || '不明');

    const effectLines = getPartEffectLines(part).filter((line) => line !== '効果詳細は未記載です。');
    const isSelected = getEquippedPartId(monster.id, partPickerState.slotKey) === part.id;

    return `
      <div class="part-card ${fitColor}">
        <div class="part-card-header">
          <strong>${escapeHtml(part.name)}</strong>
          <span class="part-fit">${fitColor === 'blue' ? '適正' : fitColor === 'yellow' ? '準適正' : fitColor === 'red' ? '不一致' : '未判定'}</span>
        </div>
        <div class="part-meta">
          ${metaTags.map((tag) => `<span class="part-badge">${escapeHtml(tag)}</span>`).join('')}
        </div>
        ${Array.isArray(part.tags) && part.tags.length
          ? `<div class="part-meta" aria-label="パーツのタグ">${part.tags.filter(Boolean).map((tag) => `<span class="part-badge">${escapeHtml(tag)}</span>`).join('')}</div>`
          : ''}
        <div class="part-picker-effects">
          ${effectLines.length
            ? effectLines.map((line) => `<p>${escapeHtml(line)}</p>`).join('')
            : '<p>効果説明は未記載です。</p>'}
        </div>
        <button data-role="equip-part" data-part-id="${part.id}" data-slot-key="${partPickerState.slotKey}">${isSelected ? '外す' : '装備'}</button>
      </div>
    `;
  }).join('');

  modal.querySelector('.part-modal-list').innerHTML =
    cardHtml || '<div class="empty-team">条件に一致するパーツがありません。</div>';

  modal.querySelectorAll('[data-role="equip-part"]').forEach((button) => {
    button.addEventListener('click', () => {
      const { partId, slotKey } = button.dataset;
      setSlotPart(monster.id, slotKey, partId);
      updateView();
      closePartPicker();
    });
  });
}

function renderPartPicker() {
  const modal = document.getElementById('part-selector-modal');
  if (!modal) return;

  if (!partPickerState.monsterId || !partPickerState.slotKey) {
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = '';
    return;
  }

  const monster = getMonsterById(partPickerState.monsterId);
  if (!monster) {
    closePartPicker();
    return;
  }

  const slotLabel = partPickerState.slotKey === 'main' ? 'Mパーツ' : partPickerState.slotKey === 'sub1' ? 'S1パーツ' : 'S2パーツ';
  const slotParts = partCatalog.filter((part) => part.slot === (partPickerState.slotKey === 'main' ? 'main' : 'sub'));
  const rankOptions = [...new Set(slotParts.map((part) => Number(part.rank)).filter(Number.isFinite))]
    .sort((a, b) => b - a);
  const tagOptions = [...new Set(slotParts.flatMap((part) =>
    Array.isArray(part.tags) ? part.tags.filter((tag) => typeof tag === 'string' && tag.length > 0) : []
  ))].sort((a, b) => a.localeCompare(b, 'ja'));

  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
  modal.innerHTML = `
    <div class="modal-panel">
      <div class="modal-header">
        <h3>${escapeHtml(monster.name)} / ${slotLabel}</h3>
        <button class="close-btn" data-role="close-picker">閉じる</button>
      </div>
      <div class="part-sort-controls" aria-label="ステータスで並べ替え">
        <span class="part-sort-label">ステータス補正順</span>
        ${Object.entries(abilityLabels).map(([key, label]) => {
          const active = partPickerState.sortStat === key;
          const direction = active ? (partPickerState.sortDirection === 'desc' ? '↓' : '↑') : '';
          const directionLabel = partPickerState.sortDirection === 'desc' ? '大きい順' : '小さい順';
          return `<button type="button" class="part-sort-button ${active ? 'active' : ''}" data-role="sort-parts" data-sort-stat="${key}" aria-pressed="${active}"${active ? ` aria-label="${label}の補正値を${directionLabel}"` : ''}>${label}${direction}</button>`;
        }).join('')}
        ${partPickerState.sortStat ? '<button type="button" class="part-sort-reset" data-role="reset-part-sort">初期順</button>' : ''}
      </div>
      <div class="part-filters">
        <label class="part-filter">
          <span>等級</span>
          <select data-role="filter-parts-rank" aria-label="パーツの等級で絞り込み">
            <option value="all"${partPickerState.rank === 'all' ? ' selected' : ''}>すべて</option>
            ${rankOptions.map((rank) => `<option value="${rank}"${Number(partPickerState.rank) === rank ? ' selected' : ''}>${rank}等級</option>`).join('')}
          </select>
        </label>
        <label class="part-filter">
          <span>タグ</span>
          <select data-role="filter-parts-tag" aria-label="パーツのタグで絞り込み">
            <option value="">すべて</option>
            ${tagOptions.map((tag) => `<option value="${escapeHtml(tag)}"${partPickerState.tag === tag ? ' selected' : ''}>${escapeHtml(tag)}</option>`).join('')}
          </select>
        </label>
        <label class="part-filter">
          <span>キーワード</span>
          <input type="search" data-role="search-parts" value="${escapeHtml(partPickerState.keyword)}" placeholder="名前・タグ・効果" aria-label="パーツのキーワード検索">
        </label>
      </div>
      <div class="part-modal-list"></div>
    </div>
  `;

  modal.querySelectorAll('[data-role="close-picker"]').forEach((button) => {
    button.addEventListener('click', closePartPicker);
  });

  modal.querySelectorAll('[data-role="sort-parts"]').forEach((button) => {
    button.addEventListener('click', () => {
      if (partPickerState.sortStat === button.dataset.sortStat) {
        partPickerState.sortDirection = partPickerState.sortDirection === 'desc' ? 'asc' : 'desc';
      } else {
        partPickerState.sortStat = button.dataset.sortStat;
        partPickerState.sortDirection = 'desc';
      }
      renderPartPicker();
    });
  });

  modal.querySelector('[data-role="reset-part-sort"]')?.addEventListener('click', () => {
    partPickerState.sortStat = null;
    partPickerState.sortDirection = 'desc';
    renderPartPicker();
  });

  modal.querySelector('[data-role="filter-parts-rank"]')?.addEventListener('change', (event) => {
    partPickerState.rank = event.currentTarget.value;
    renderPartPicker();
  });

  modal.querySelector('[data-role="filter-parts-tag"]')?.addEventListener('change', (event) => {
    partPickerState.tag = event.currentTarget.value;
    renderPartPicker();
  });

  const keywordInput = modal.querySelector('[data-role="search-parts"]');
  const updateKeyword = () => {
    partPickerState.keyword = keywordInput.value;
    renderPartPickerResults(modal, monster);
  };
  keywordInput.addEventListener('input', (event) => {
    if (!event.isComposing) updateKeyword();
  });
  keywordInput.addEventListener('compositionend', updateKeyword);

  renderPartPickerResults(modal, monster);
}

function roleWeight(role) {
  const map = {
    strength: 1.1,
    dexterity: 1.0,
    constitution: 1.05,
    intelligence: 1.15,
    wisdom: 1.08,
    charisma: 1.02
  };
  return map[role] || 1;
}

function scoreTeam(team) {
  if (team.length === 0) {
    return { total: 0, balance: 0, synergy: 0 };
  }

  let totalAttack = 0;
  let totalDefense = 0;
  let totalSpeed = 0;
  let totalHp = 0;
  let totalInsight = 0;
  let totalPartScore = 0;

  team.forEach((monster) => {
    totalAttack += monster.status.strength || 0;
    totalDefense += monster.status.constitution || 0;
    totalSpeed += monster.status.dexterity || 0;
    totalHp += monster.status.hp || 0;
    totalInsight += monster.status.wisdom || 0;
    totalPartScore += monster.partScore || 0;
  });

  const balanceScore = team.reduce((acc, monster) => {
    const value = (monster.status[monster.primaryAbility] || 0) * roleWeight(monster.primaryAbility);
    return acc + value;
  }, 0);

  const synergyScore = team.reduce((acc, monster) => acc + (monster.partScore || 0), 0);

  const teamValue =
    (totalAttack * 0.22) +
    (totalDefense * 0.23) +
    (totalSpeed * 0.16) +
    (totalHp * 0.14) +
    (totalInsight * 0.12) +
    (totalPartScore * 0.13) +
    (balanceScore * 0.28) +
    synergyScore;

  return {
    total: Math.round(teamValue),
    balance: Math.min(100, Math.round(balanceScore / 4)),
    synergy: Math.min(100, Math.round(synergyScore / 2))
  };
}

function renderUnitList() {
  const unitList = document.getElementById('unit-list');
  const rosterCount = document.getElementById('roster-count');
  const visibleMonsters = getFilteredMonsters();
  const scrollTop = unitList.scrollTop;

  rosterCount.textContent = `${visibleMonsters.length}体`;

  if (visibleMonsters.length === 0) {
    unitList.innerHTML = '<div class="empty-team">条件に一致するモンスターがありません。</div>';
    return;
  }

  unitList.innerHTML = '';

  visibleMonsters.forEach((monster) => {
    const active = activeMonsterState.monsterId === monster.id || (teamMemberMap.has(activeMonsterState.monsterId) && teamMemberMap.get(activeMonsterState.monsterId)?.baseMonsterId === monster.id);
    const card = document.createElement('div');
    card.className = `unit-card ${active ? 'active' : ''}`;
    card.addEventListener('click', (event) => {
      if (event.target && event.target.closest('button')) {
        return;
      }
      setActiveMonster(monster.id);
    });

    const info = document.createElement('div');
    const abilityEntries = Object.entries(abilityLabels).map(([key, label]) => `
      <div class="ability-item">
        <span>${label}</span>
        <strong>${monster.status[key] || 0}</strong>
      </div>
    `).join('');
    const recommendedAbilities = getTopAbilityKeys(monster, 2);
    const recommendedText = recommendedAbilities.map((abilityKey) => formatAbilityName(abilityKey)).join(' / ');

    info.innerHTML = `
      <div class="unit-head">
        <span class="unit-name">${monster.name}</span>
        <span class="role-pill">${recommendedText}</span>
      </div>
      <div class="unit-stats">
        <span>HP ${monster.hp}</span>
        <span>AC ${monster.status.ac}</span>
        <span>Initiative ${monster.status.initiative}</span>
      </div>
      <div class="ability-grid">${abilityEntries}</div>
    `;

    const action = document.createElement('div');
    const button = document.createElement('button');
    button.className = 'add-btn';
    button.textContent = '追加';
    button.disabled = false;
    button.addEventListener('click', () => {
      addUnit(monster.id);
    });

    action.appendChild(button);
    card.appendChild(info);
    card.appendChild(action);
    unitList.appendChild(card);
  });
  unitList.scrollTop = scrollTop;
}

function getSkillCategories(ability) {
  const categories = new Set();
  if (!ability) return categories;

  const tags = Array.isArray(ability.tags) ? ability.tags : [];
  const structured = ability.structured || {};
  const ranges = [structured.range, structured.delivery];
  if (tags.includes('近接') || ranges.includes('melee') || ranges.includes('近接')) categories.add('melee');
  if (tags.includes('遠距離') || ranges.includes('ranged') || ranges.includes('遠距離')) categories.add('ranged');
  const semanticEffects = Array.isArray(ability.semantic?.effects) ? ability.semantic.effects : [];
  const damage = Array.isArray(structured.damage) ? structured.damage : [];
  const scopes = [structured.target_scope, ...semanticEffects.map((effect) => effect?.scope)];
  if (tags.includes('単体') || scopes.includes('target')) categories.add('single');
  if (tags.includes('範囲') || scopes.some((scope) =>
    ['ally_all', 'ally_row', 'enemy_all', 'enemy_row', 'enemy_front', 'adjacent', 'dungeon', 'all_enemies'].includes(scope)
  )) categories.add('area');
  if (tags.includes('回復') || semanticEffects.some((effect) => effect?.kind === 'heal')
    || damage.some((entry) => entry?.type === 'heal' || entry?.type === 'custom:回復')) {
    categories.add('heal');
  }
  return categories;
}

function renderRadarChart(containerId, title, labels, values, description) {
  const container = document.getElementById(containerId);
  const center = 150;
  const radius = 95;
  const maxValue = Math.max(1, ...values);
  const point = (index, fraction) => {
    const angle = -Math.PI / 2 + 2 * Math.PI * index / labels.length;
    return `${(center + Math.cos(angle) * radius * fraction).toFixed(2)},${(center + Math.sin(angle) * radius * fraction).toFixed(2)}`;
  };
  const grid = [0.25, 0.5, 0.75, 1].map((level) =>
    `<polygon class="radar-grid" points="${labels.map((_, index) => point(index, level)).join(' ')}"></polygon>`
  ).join('');
  const axes = labels.map((_, index) => {
    const [x, y] = point(index, 1).split(',');
    return `<line class="radar-axis" x1="${center}" y1="${center}" x2="${x}" y2="${y}"></line>`;
  }).join('');
  const data = labels.map((_, index) => point(index, Math.max(0, values[index]) / maxValue)).join(' ');
  const chartLabels = labels.map((label, index) => {
    const [x, y] = point(index, 1.24).split(',');
    return `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle">${escapeHtml(label)} ${escapeHtml(values[index])}</text>`;
  }).join('');
  const chartDescription = labels.map((label, index) => `${label}: ${values[index]}`).join('、');

  container.innerHTML = `
    <article class="balance-chart">
      <h4>${escapeHtml(title)}</h4>
      <svg class="radar-chart" viewBox="-35 0 370 300" role="img" aria-label="${escapeHtml(`${title}。${chartDescription}`)}">
        ${grid}${axes}<polygon class="radar-data" points="${data}"></polygon>${chartLabels}
      </svg>
      <p class="balance-help">${escapeHtml(description)}</p>
    </article>
  `;
}

function renderBalanceSummary(team) {
  const statKeys = ['hp', ...abilityOrder];
  const totals = statKeys.map(() => 0);
  const skillCounts = { melee: 0, ranged: 0, heal: 0, single: 0, area: 0 };

  team.forEach((monster) => {
    const status = getEffectiveMonsterStatus(monster.id) || monster.status;
    statKeys.forEach((key, index) => {
      totals[index] += Number(status[key]) || 0;
    });
    const equipped = getEquippedParts(monster.id);
    const parts = [equipped.main, ...equipped.sub]
      .map((id) => partCatalog.find((part) => part.id === id))
      .filter(Boolean);
    parts.forEach((part) => {
      totals[0] += (Number(part.stat_bonus?.hp) || 0) + (Number(part.stat_bonus?.max_hp) || 0);
    });
    const baseMonster = monsters.find((entry) => entry.id === monster.baseMonsterId && entry.name === monster.name);
    const abilities = ['basicAttack', 'trait'].map((key) => {
      const saved = monster[key];
      const current = baseMonster?.[key];
      if (!saved || !current || saved.name !== current.name) return saved;
      return {
        ...saved,
        structured: saved.structured ?? current.structured,
        semantic: saved.semantic ?? current.semantic
      };
    });
    [...abilities, ...parts].forEach((ability) => {
      getSkillCategories(ability).forEach((category) => { skillCounts[category] += 1; });
    });
  });

  renderRadarChart('status-balance', 'ステータスバランス',
    ['HP', ...abilityOrder.map(formatAbilityName)], totals,
    '装備中パーツの補正を含む合計。全軸共通の目盛りで、最大値を外周に合わせています。');
  renderRadarChart('skill-balance', '技範囲バランス',
    ['近接', '遠距離', '回復', '単体', '範囲'],
    [skillCounts.melee, skillCounts.ranged, skillCounts.heal, skillCounts.single, skillCounts.area],
    '基本攻撃・固有特性・装備中パーツを集計。タグや構造化情報で判定できない技は含みません。');
}

function renderTeamList(teamList, selectedMonsters) {
  const scrollTop = teamList.scrollTop;
  if (selectedMonsters.length === 0) {
    teamList.innerHTML = '<div class="empty-team">編成を選んでください。</div>';
    return;
  }

  teamList.innerHTML = '';
  selectedMonsters.forEach((monster) => {
    const item = document.createElement('div');
    item.className = `team-member ${activeMonsterState.monsterId === monster.id ? 'active' : ''}`;
    item.addEventListener('click', () => setActiveMonster(monster.id));
    const recommendedAbilities = getTopAbilityKeys(monster, 2);
    const recommendedText = recommendedAbilities.map((abilityKey) => formatAbilityName(abilityKey)).join(' / ');

    item.innerHTML = `
      <div class="member-meta">
        <strong>${monster.name}</strong>
        <span class="member-role">${monster.race} · ${recommendedText}最適</span>
      </div>
      <button class="remove-btn" data-id="${monster.id}">削除</button>
    `;

    item.querySelector('button').addEventListener('click', (event) => {
      event.stopPropagation();
      removeUnit(monster.id);
    });
    teamList.appendChild(item);
  });
  teamList.scrollTop = scrollTop;
}

function renderTeam() {
  const selectedMonsters = getSelectedMonsters();
  const totalControl = selectedMonsters.reduce((sum, monster) => sum + (monster.controlCost || 0), 0);
  document.getElementById('team-control').textContent = totalControl;
  renderBalanceSummary(selectedMonsters);
  renderTeamList(document.getElementById('team-list'), selectedMonsters);
  renderTeamList(document.getElementById('monster-picker-team'), selectedMonsters);
}

function getPartEffectLines(part) {
  if (!part) {
    return ['装備中のパーツがありません。'];
  }

  const lines = [];

  if (part.description) {
    lines.push(part.description);
  }

  if (Array.isArray(part.effects)) {
    part.effects.forEach((effect) => {
      if (typeof effect === 'string') {
        lines.push(effect);
        return;
      }
      if (effect && typeof effect === 'object') {
        const name = effect.name || '効果';
        const duration = effect.duration ? ` (${effect.duration})` : '';
        lines.push(`${name}${duration}`);
      }
    });
  }

  if (Array.isArray(part.damage)) {
    part.damage.forEach((entry) => {
      const text = [entry.dice, entry.bonus, entry.damage_type].filter(Boolean).join(' ');
      if (text) {
        lines.push(text);
      }
    });
  }

  if (lines.length === 0) {
    lines.push('効果詳細は未記載です。');
  }

  return lines.slice(0, 4);
}

function getPartTags(part) {
  if (!part || !Array.isArray(part.tags) || part.tags.length === 0) {
    return ['タグなし'];
  }

  return part.tags.filter(Boolean);
}

function getPartDiceLines(part) {
  if (!Array.isArray(part.damage)) return [];
  return part.damage.map((entry) => [entry.dice, entry.bonus, entry.damage_type].filter(Boolean).join(' ')).filter(Boolean);
}

function getPartDescriptionLines(part) {
  const lines = [];
  if (part.description) lines.push(part.description);
  const effects = Array.isArray(part.effects) ? part.effects : [];
  const bonuses = Array.isArray(part.bonuses) ? part.bonuses : [];
  for (const effect of [...effects, ...bonuses]) {
    if (typeof effect === 'string') lines.push(effect);
    else if (effect && typeof effect === 'object') {
      lines.push(`${effect.name || '効果'}${effect.duration ? `（${effect.duration}）` : ''}`);
    }
  }
  return lines;
}

function renderNativePartGroup(label, parts) {
  const entries = Array.isArray(parts) ? parts : [];
  return `
    <section class="native-part-group">
      <h4>${label}</h4>
      ${entries.length ? entries.map((part) => {
        const diceLines = getPartDiceLines(part);
        const effectLines = getPartDescriptionLines(part);
        const tags = Array.isArray(part.tags) ? part.tags.filter(Boolean) : [];
        return `
          <article class="native-part-card">
            <h5>${escapeHtml(part.name || '名称未設定')}</h5>
            <div class="native-part-field">
              <span>ダイス</span>
              <div>${diceLines.length ? diceLines.map((line) => `<p>${escapeHtml(line)}</p>`).join('') : '<p>記載なし</p>'}</div>
            </div>
            <div class="native-part-field">
              <span>効果</span>
              <div>${effectLines.length ? effectLines.map((line) => `<p>${escapeHtml(line)}</p>`).join('') : '<p>記載なし</p>'}</div>
            </div>
            <div class="native-part-field">
              <span>タグ</span>
              <div class="native-part-tags">${tags.length
                ? tags.map((tag) => `<span class="tag-item">${escapeHtml(tag)}</span>`).join('')
                : '<p>タグなし</p>'}</div>
            </div>
          </article>
        `;
      }).join('') : '<p class="native-part-empty">パーツ情報はありません。</p>'}
    </section>
  `;
}

function getMonsterFeatureSummary(monster) {
  const attack = monster.basicAttack || {};
  const trait = monster.trait || {};
  const attackParts = [attack.name, attack.damage, attack.damage_type, attack.bonus, attack.description].filter(Boolean);
  const traitParts = [
    ...(Array.isArray(trait.effects) ? trait.effects : []),
    ...(Array.isArray(trait.bonuses) ? trait.bonuses : []),
    trait.description
  ].filter(Boolean);

  return {
    attack: attackParts.length ? attackParts : ['基本攻撃情報なし'],
    trait: traitParts.length ? traitParts : ['固有特性情報なし']
  };
}

function renderPartSimulation() {
  const container = document.getElementById('part-simulator');
  ensureActiveMonster();
  const monster = getMonsterById(activeMonsterState.monsterId) || getSelectedMonsters()[0] || monsters[0];

  if (!monster) {
    container.innerHTML = '<div class="empty-team">モンスターを選ぶと、パーツの適正を確認できます。</div>';
    return;
  }

  activeMonsterState.monsterId = monster.id;

  const slotConfigs = [
    { key: 'main', label: 'M枠' },
    { key: 'sub1', label: 'S1枠' },
    { key: 'sub2', label: 'S2枠' }
  ];

  const effectiveStatus = getEffectiveMonsterStatus(monster.id) || monster.status;
  const statusRanks = getAbilityRankMap({ status: effectiveStatus });
  const featureSummary = getMonsterFeatureSummary(monster);
  const nativeParts = monster.nativeParts || {};
  const nativePartsHtml = `
    <details class="native-parts">
      <summary>モンスター固有のパーツ情報</summary>
      <div class="native-parts-content">
        ${renderNativePartGroup('Mパーツ', nativeParts.main)}
        ${renderNativePartGroup('S1パーツ', nativeParts.sub?.slice(0, 1))}
        ${renderNativePartGroup('S2パーツ', nativeParts.sub?.slice(1, 2))}
      </div>
    </details>
  `;

  const slotHtml = slotConfigs.map((slot) => {
    const partId = getEquippedPartId(monster.id, slot.key);
    const part = partCatalog.find((item) => item.id === partId) || null;
    const fitColor = part ? getPartFitColor(monster, part) : 'neutral';

    const detailsHtml = part
      ? `
        <div class="slot-detail-box">
          <div class="slot-detail-label">効果詳細</div>
          <ul class="slot-detail-list">
            ${getPartEffectLines(part).map((line) => `<li>${line}</li>`).join('')}
          </ul>
        </div>
        <div class="slot-tag-box">
          <div class="slot-detail-label">タグ</div>
          <div class="tag-list">
            ${getPartTags(part).map((tag) => `<span class="tag-item">${tag}</span>`).join('')}
          </div>
        </div>
      `
      : '<div class="slot-empty-note">クリックして装備を選択</div>';

    return `
      <div class="slot-button ${fitColor} ${part ? '' : 'empty'}" data-role="open-slot-picker" data-slot-key="${slot.key}" tabindex="0" role="button" aria-label="${slot.label} ${part ? part.name : '未装備'}">
        <div class="slot-head-row">
          <span class="slot-label">${slot.label}</span>
          <span class="slot-color-dot ${fitColor}"></span>
        </div>
        <span class="slot-name">${part ? part.name : '未装備'}</span>
        ${detailsHtml}
        ${part ? `<button type="button" class="slot-remove-btn" data-role="remove-slot-part" data-slot-key="${slot.key}">外す</button>` : ''}
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="monster-sim-header">
      <div class="monster-sim-name">${monster.name}</div>
      <span class="badge">${monster.race}</span>
    </div>
    <div class="ability-grid">
      ${Object.entries(abilityLabels).map(([key, label]) => `
        <div class="ability-item ${statusRanks[key] === 1 ? 'top-stat' : statusRanks[key] === 2 ? 'second-stat' : ''}">
          <span>${label}</span>
          <strong>${effectiveStatus[key] || 0}</strong>
        </div>
      `).join('')}
    </div>
    <div class="feature-blocks">
      <div class="feature-card">
        <div class="feature-title">基本攻撃</div>
        <div class="feature-name">${monster.basicAttack?.name || '基本攻撃'}</div>
        <ul class="feature-list">
          ${featureSummary.attack.map((line) => `<li>${line}</li>`).join('')}
        </ul>
      </div>
      <div class="feature-card">
        <div class="feature-title">固有特性</div>
        <div class="feature-name">${monster.trait?.name || '固有特性'}</div>
        <ul class="feature-list">
          ${featureSummary.trait.map((line) => `<li>${line}</li>`).join('')}
        </ul>
      </div>
    </div>
    ${nativePartsHtml}
    <div class="slot-row">
      ${slotHtml}
    </div>
  `;

  container.querySelectorAll('[data-role="open-slot-picker"]').forEach((element) => {
    const onOpen = () => {
      openPartPicker(monster.id, element.dataset.slotKey);
    };
    element.addEventListener('click', (event) => {
      if (event.target && event.target.closest('[data-role="remove-slot-part"]')) {
        return;
      }
      onOpen();
    });
    element.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onOpen();
      }
    });
  });

  container.querySelectorAll('[data-role="remove-slot-part"]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      setSlotPart(monster.id, button.dataset.slotKey, null);
      updateView();
    });
  });
}

function addUnit(id) {
  const baseMonster = monsters.find((monster) => monster.id === id);
  if (!baseMonster) {
    return;
  }

  const teamMember = createTeamMember(baseMonster);
  selectedIds.push(teamMember.id);
  teamMemberMap.set(teamMember.id, teamMember);
  activeMonsterState.monsterId = teamMember.id;
  updateView();
}

function removeUnit(id) {
  const index = selectedIds.indexOf(id);
  if (index >= 0) {
    selectedIds.splice(index, 1);
  }
  teamMemberMap.delete(id);

  if (activeMonsterState.monsterId === id) {
    const remaining = getSelectedMonsters()[0]?.id || monsters[0]?.id || null;
    activeMonsterState.monsterId = remaining;
  }

  updateView();
}

function clearSelection() {
  selectedIds.length = 0;
  teamMemberMap.clear();
  activeMonsterState.monsterId = monsters[0]?.id || null;
  updateView();
}

function setFormationSaveStatus(message, isError = false) {
  const status = document.getElementById('formation-save-status');
  if (!status) return;
  status.textContent = message;
  status.classList.toggle('error', isError);
}

function loadFormationSlots() {
  try {
    const stored = localStorage.getItem(FORMATION_STORAGE_KEY);
    if (!stored) return;

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed) || parsed.length !== FORMATION_SLOT_COUNT) {
      throw new Error('保存データの形式が正しくありません。');
    }

    parsed.forEach((slot, index) => {
      if (slot === null) return;
      const valid = slot
        && Array.isArray(slot.members)
        && slot.members.every((entry) => entry?.member && typeof entry.member.id === 'string' && entry.equipped);
      if (!valid) {
        throw new Error(`${index + 1}番目の保存データが壊れています。`);
      }
      formationSlots[index] = slot;
    });
  } catch (error) {
    console.warn('Failed to load saved formations.', error);
    setFormationSaveStatus(`保存編成を読み込めませんでした: ${error.message}`, true);
  }
}

function persistFormationSlots() {
  try {
    localStorage.setItem(FORMATION_STORAGE_KEY, JSON.stringify(formationSlots));
    return true;
  } catch (error) {
    console.error('Failed to save formations.', error);
    setFormationSaveStatus(`保存に失敗しました: ${error.message}`, true);
    return false;
  }
}

function saveFormation(slotIndex) {
  if (formationSlots[slotIndex] && !window.confirm(`${slotIndex + 1}番目の保存編成を上書きしますか？`)) {
    return;
  }

  const members = getSelectedMonsters().map((member) => ({
    member: JSON.parse(JSON.stringify(member)),
    equipped: getEquippedParts(member.id)
  }));
  formationSlots[slotIndex] = {
    savedAt: new Date().toISOString(),
    members,
    activeMonsterId: activeMonsterState.monsterId
  };

  if (persistFormationSlots()) {
    setFormationSaveStatus(`${slotIndex + 1}番目に編成を保存しました。`);
    renderFormationSaveSlots();
  }
}

function loadFormation(slotIndex) {
  const formation = formationSlots[slotIndex];
  if (!formation) return;

  if (selectedIds.length > 0 && !window.confirm('現在の編成を置き換えて、保存編成を読み込みますか？')) {
    return;
  }

  selectedIds.length = 0;
  teamMemberMap.clear();
  Object.keys(equippedParts).forEach((monsterId) => delete equippedParts[monsterId]);

  const restoredIds = new Map();
  formation.members.forEach(({ member, equipped }) => {
    const restoredMember = JSON.parse(JSON.stringify(member));
    const oldId = restoredMember.id;
    const newId = createTeamMemberId();
    restoredMember.id = newId;
    selectedIds.push(newId);
    teamMemberMap.set(newId, restoredMember);
    equippedParts[newId] = {
      main: equipped.main || null,
      sub: [equipped.sub?.[0] || null, equipped.sub?.[1] || null]
    };
    restoredIds.set(oldId, newId);
  });

  activeMonsterState.monsterId = restoredIds.get(formation.activeMonsterId) || selectedIds[0] || monsters[0]?.id || null;
  setFormationSaveStatus(`${slotIndex + 1}番目の編成を読み込みました。`);
  updateView();
}

function renderFormationSaveSlots() {
  const container = document.getElementById('formation-save-list');
  if (!container) return;

  container.innerHTML = '';
  formationSlots.forEach((formation, index) => {
    const slot = document.createElement('div');
    slot.className = `formation-save-slot ${formation ? 'filled' : ''}`;

    const details = document.createElement('div');
    details.className = 'formation-save-details';
    const title = document.createElement('strong');
    title.textContent = `編成 ${index + 1}`;
    const summary = document.createElement('span');
    if (formation) {
      const names = formation.members.map(({ member }) => member.name).join('、');
      const savedAt = new Date(formation.savedAt);
      summary.textContent = `${formation.members.length}体 · ${names || '空の編成'} · ${Number.isNaN(savedAt.getTime()) ? '保存日時不明' : savedAt.toLocaleString('ja-JP')}`;
    } else {
      summary.textContent = '未保存';
    }
    details.append(title, summary);

    const actions = document.createElement('div');
    actions.className = 'formation-save-actions';
    const saveButton = document.createElement('button');
    saveButton.type = 'button';
    saveButton.className = 'small-btn ghost-btn';
    saveButton.textContent = formation ? '上書き保存' : '保存';
    saveButton.addEventListener('click', () => saveFormation(index));

    const loadButton = document.createElement('button');
    loadButton.type = 'button';
    loadButton.className = 'small-btn add-btn';
    loadButton.textContent = '読み込む';
    loadButton.disabled = !formation;
    loadButton.addEventListener('click', () => loadFormation(index));

    actions.append(saveButton, loadButton);
    slot.append(details, actions);
    container.appendChild(slot);
  });
}

const suggestionState = {
  statKey: 'total'
};

function getTopRecommendations(statKey = 'total') {
  const combos = [];

  for (let i = 0; i < monsters.length; i += 1) {
    for (let j = i + 1; j < monsters.length; j += 1) {
      for (let k = j + 1; k < monsters.length; k += 1) {
        for (let l = k + 1; l < monsters.length; l += 1) {
          const combo = [monsters[i], monsters[j], monsters[k], monsters[l]];
          const score = scoreTeam(combo);
          let metricValue = score.total;

          if (statKey !== 'total') {
            metricValue = combo.reduce((sum, monster) => sum + (monster.status[statKey] || 0), 0);
          }

          combos.push({ members: combo, score, metricValue });
        }
      }
    }
  }

  return combos.sort((a, b) => b.metricValue - a.metricValue).slice(0, 8);
}

function getTopAbilityKeys(monster, limit = 2) {
  return Object.entries(monster.status || {})
    .filter(([key]) => abilityLabels[key])
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([key]) => key);
}

function renderSuggestion() {
  const suggestionResult = document.getElementById('suggestion-result');
  const topTeams = getTopRecommendations(suggestionState.statKey);
  const bestTeam = topTeams[0];

  if (!bestTeam) {
    suggestionResult.textContent = '候補を計算できませんでした。';
    return;
  }

  suggestionResult.innerHTML = `
    <div class="suggestion-controls">
      <label for="suggestion-stat-select">基準ステータス</label>
      <select id="suggestion-stat-select">
        <option value="total" ${suggestionState.statKey === 'total' ? 'selected' : ''}>総合力</option>
        ${Object.entries(abilityLabels).map(([key, label]) => `
          <option value="${key}" ${suggestionState.statKey === key ? 'selected' : ''}>${label}</option>
        `).join('')}
      </select>
    </div>
    <div class="score-highlight">${suggestionState.statKey === 'total' ? '総合力' : formatAbilityName(suggestionState.statKey)} ${bestTeam.metricValue}</div>
    <div class="suggestion-team">
      ${topTeams.map((team, index) => `
        <div class="suggestion-member ranking-item">
          <span class="ranking-rank">${index + 1}</span>
          <div class="suggestion-member-name-group">
            ${team.members.map((monster) => `<span class="suggestion-member-name">${monster.name}</span>`).join('')}
          </div>
          <span class="metric-value">${team.metricValue}</span>
        </div>
      `).join('')}
    </div>
  `;

  const select = document.getElementById('suggestion-stat-select');
  if (select) {
    select.addEventListener('change', (event) => {
      suggestionState.statKey = event.target.value;
      renderSuggestion();
    });
  }
}

function updateView() {
  ensureActiveMonster();
  populateRosterFilters();
  renderUnitList();
  renderTeam();
  renderFormationSaveSlots();
  renderPartSimulation();
  renderSuggestion();
}

document.getElementById('race-filter').addEventListener('change', (event) => {
  rosterFilters.race = event.target.value;
  updateView();
});

document.getElementById('rank-filter').addEventListener('change', (event) => {
  rosterFilters.rank = event.target.value;
  updateView();
});

const suggestButton = document.getElementById('suggest-btn');
if (suggestButton) {
  suggestButton.addEventListener('click', () => {
    const topTeams = getTopRecommendations(suggestionState.statKey);
    const best = topTeams[0];
    if (!best) return;

    selectedIds.length = 0;
    teamMemberMap.clear();
    best.members.forEach((monster) => addUnit(monster.id));
    updateView();
  });
}

document.getElementById('clear-btn').addEventListener('click', clearSelection);

const monsterPicker = document.getElementById('monster-picker');
document.getElementById('open-monster-picker').addEventListener('click', () => monsterPicker.showModal());
document.getElementById('close-monster-picker').addEventListener('click', () => monsterPicker.close());
monsterPicker.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    event.preventDefault();
    monsterPicker.close();
  }
});

loadFormationSlots();
updateView();

let monsterDataSyncTimer = null;

function syncMonsterDataFromStorage() {
  monsterDataSyncTimer = null;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored || stored === latestMonsterData) return;

  let parsed;
  try {
    parsed = JSON.parse(stored);
  } catch (error) {
    console.error('Failed to parse updated monster data from storage.', error);
    return;
  }
  if (!parsed || !Array.isArray(parsed.monsters)) {
    console.error('Updated monster data in storage has an invalid format.');
    return;
  }

  const updatedData = window.mergeMonsterData(parsed);
  latestMonsterData = stored;
  monsters = mapMonsterData(updatedData);
  partCatalog = buildPartCatalog();

  selectedIds.forEach((teamId) => {
    const member = teamMemberMap.get(teamId);
    const baseMonster = monsters.find((monster) => monster.id === member?.baseMonsterId);
    if (!member || !baseMonster) return;
    teamMemberMap.set(teamId, {
      ...baseMonster,
      id: teamId,
      baseMonsterId: baseMonster.id
    });
  });

  updateView();
}

function scheduleMonsterDataSync() {
  if (monsterDataSyncTimer !== null) {
    window.clearTimeout(monsterDataSyncTimer);
  }
  monsterDataSyncTimer = window.setTimeout(syncMonsterDataFromStorage, 150);
}

window.addEventListener('storage', (event) => {
  if (event.key === STORAGE_KEY) {
    scheduleMonsterDataSync();
    return;
  }
  if (event.key === window.MonsterSchema?.storageKey) {
    syncSchemaDataFromStorage();
  }
});

function syncSchemaDataFromStorage() {
  try {
    window.MonsterSchema.reload();
    const stored = loadMonsterData();
    const updatedData = window.mergeMonsterData(stored || { monsters: [] });
    latestMonsterData = JSON.stringify(updatedData);
    monsters = mapMonsterData(updatedData);
    partCatalog = buildPartCatalog();

    selectedIds.forEach((teamId) => {
      const member = teamMemberMap.get(teamId);
      const baseMonster = monsters.find((monster) => monster.id === member?.baseMonsterId);
      if (!member || !baseMonster) return;
      teamMemberMap.set(teamId, {
        ...baseMonster,
        id: teamId,
        baseMonsterId: baseMonster.id
      });
    });

    updateView();
  } catch (error) {
    console.error('Failed to sync the monster dataset from storage.', error);
    const status = document.getElementById('schema-load-status');
    status.textContent = `新スキーマの同期に失敗しました：${error.message}`;
    status.classList.add('error');
  }
}

window.addEventListener('pageshow', scheduleMonsterDataSync);
window.addEventListener('focus', scheduleMonsterDataSync);
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) scheduleMonsterDataSync();
});
