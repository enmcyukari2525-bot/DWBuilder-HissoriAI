window.RANK6_DATA = {
  source: 'https://dungeonwithin.miraheze.org/wiki/Category:Monsters',
  reference_source: 'https://dungeonwithin.miraheze.org/wiki/Monsters',
  rank: 6,
  monsters: [
    {
      name: 'アラクネ',
      race: '精霊',
      rank: 6,
      control_cost: 9,
      status: { hp: 88, ac: 8, initiative: 0, strength: 18, dexterity: 14, constitution: 17, intelligence: 11, wisdom: 11, charisma: 9 },
      immunities: ['拘束', '毒'],
      resistances: [],
      vulnerabilities: [],
      basic_attack: {
        name: '基本刺突',
        damage: '2d10+2+筋力',
        damage_type: '物理',
        description: '敵の弱点を突く。',
        tags: ['主行動', '筋力基準', '近接', '筋力命中ロール（クリティカル19+）']
      },
      unique_trait: {
        name: '糸紡ぎ',
        description: '攻撃命中時、対象の糸状態1スタックにつき追加殴打ダメージ6を与える。攻撃命中後、対象に糸を1スタック付与する。',
        bonuses: ['拘束状態免疫', '毒状態免疫'],
        tags: []
      },
      parts: {
        main: [{
          name: '巨人踏み',
          control_cost_bonus: 1.8,
          stat_bonus: { strength: 2 },
          damage: [{ dice: '4d12+筋力', damage_type: '殴打' }],
          description: '拘束状態の対象には必ずクリティカルヒットし、伏せ状態を付与する。',
          tags: ['主行動', '筋力基準', '近接', '筋力命中ロール']
        }],
        sub: [
          {
            name: '鋼鉄の甲殻',
            control_cost_bonus: 0.9,
            stat_bonus: { constitution: 2 },
            description: '物理ダメージ耐性とクリティカル攻撃への免疫を得る。',
            bonuses: ['物理ダメージ耐性', 'クリティカル攻撃免疫']
          },
          {
            name: '蜘蛛糸のドーム',
            control_cost_bonus: 0.9,
            stat_bonus: { dexterity: 2 },
            description: '敵が範囲呪文を詠唱すると反応し、呪文の対象を自身に変更して、受けるダメージを5～40（5d8+耐久力）軽減する。',
            tags: ['反応行動']
          }
        ]
      }
    },
    {
      name: 'デスナイト',
      race: 'アンデッド',
      rank: 6,
      control_cost: 9,
      status: { hp: 104, ac: 8, initiative: 0, strength: 18, dexterity: 11, constitution: 18, intelligence: 10, wisdom: 12, charisma: 13 },
      immunities: ['恐怖'],
      resistances: [],
      vulnerabilities: [],
      basic_attack: {
        name: '基本斬撃',
        damage: '4d6+筋力',
        damage_type: '物理',
        description: '敵を斬る。',
        tags: ['主行動', '筋力基準', '近接', '筋力命中ロール']
      },
      unique_trait: {
        name: '魂の指揮官',
        description: '交戦開始時、味方全員の攻撃ロールを強化し、敵全員のACを2低下させることがある。',
        bonuses: ['恐怖状態免疫'],
        tags: ['範囲', '判断力セーヴ（DC15+魅力）']
      },
      parts: {
        main: [{
          name: '魂砕き',
          control_cost_bonus: 1.8,
          stat_bonus: { strength: 2 },
          damage: [
            { dice: '3d10+筋力', damage_type: '物理' },
            { dice: '2d6+魅力', damage_type: '死霊' }
          ],
          description: '対象に回復阻害を付与する。',
          tags: ['主行動', '筋力基準', '呪文', '近接', '筋力命中ロール', '耐久力セーヴ（DC13+魅力）']
        }],
        sub: [
          {
            name: '黒曜石の鎧',
            control_cost_bonus: 0.9,
            stat_bonus: { constitution: 2 },
            description: '物理ダメージ耐性と、スタン状態への免疫を得る。',
            bonuses: ['物理ダメージ耐性', 'スタン状態免疫']
          },
          {
            name: '魂の憤怒',
            control_cost_bonus: 0.9,
            stat_bonus: { ac: 2 },
            description: '誰かが死亡するたびに反応し、味方全員に魂の憤怒を付与する。',
            tags: ['反応行動', '範囲']
          }
        ]
      }
    },
    {
      name: 'ゴルゴン',
      race: '野獣',
      rank: 6,
      control_cost: 9,
      status: { hp: 100, ac: 8, initiative: 0, strength: 11, dexterity: 12, constitution: 17, intelligence: 18, wisdom: 15, charisma: 13 },
      immunities: ['スタン', '盲目'],
      resistances: [],
      vulnerabilities: [],
      basic_attack: {
        name: '魔力の矢',
        damage: '4d6+知力',
        damage_type: '力場',
        description: '魔法の矢を放つ。',
        tags: ['主行動', '知力基準', '呪文', '遠距離', '知力命中ロール']
      },
      unique_trait: {
        name: '黄金の雄牛の仮面',
        description: '交戦開始時、前列の敵を伏せ状態にし、1d10+魅力の追加力場ダメージを与える。',
        bonuses: ['スタン状態免疫', '盲目状態免疫'],
        tags: []
      },
      parts: {
        main: [{
          name: '念動圧砕',
          control_cost_bonus: 1.8,
          stat_bonus: { intelligence: 2 },
          damage: [
            { dice: '4d8+知力', damage_type: '力場' },
            { dice: '2d8', damage_type: '力場（伏せ状態の対象）' }
          ],
          description: '対象とその後方の敵を圧砕する。伏せ状態の対象には追加の力場ダメージを与える。',
          tags: ['主行動', '知力基準', '呪文', '遠距離', '範囲', '筋力セーヴ（DC12+知力）']
        }],
        sub: [
          {
            name: '支配の外套',
            control_cost_bonus: 0.9,
            stat_bonus: { charisma: 2 },
            description: '力場ダメージを与える攻撃に、魅力修正値分の力場ダメージを追加する。'
          },
          {
            name: '凍てつく視線',
            control_cost_bonus: 0.9,
            stat_bonus: { spell_save_dc: 1 },
            description: '味方が攻撃対象になったとき、一定確率でその攻撃を無効化する。',
            tags: ['反応行動', '判断力セーヴ（DC12+魅力）']
          }
        ]
      }
    },
    {
      name: 'マインド・エレメンタル',
      race: '精霊',
      rank: 6,
      control_cost: 9,
      status: { hp: 72, ac: 8, initiative: 0, strength: 8, dexterity: 11, constitution: 12, intelligence: 14, wisdom: 19, charisma: 16 },
      immunities: ['睡眠', '魅了'],
      resistances: [],
      vulnerabilities: [],
      basic_attack: {
        name: '精神爆発',
        damage: '3d6+判断力',
        damage_type: '精神',
        description: '対象の攻撃ロールに不利を与える。',
        tags: ['主行動', '判断力基準', '呪文', '遠距離']
      },
      unique_trait: {
        name: '夢灯籠',
        description: '敵が精神効果を受けるたび、夢を1スタック獲得する。',
        bonuses: ['睡眠状態免疫', '魅了状態免疫'],
        tags: []
      },
      parts: {
        main: [{
          name: '悪夢の霧',
          control_cost_bonus: 1.8,
          stat_bonus: null,
          damage: [{ dice: '3d10+判断力', damage_type: '精神' }],
          description: '後列の敵を霧で包み、睡眠状態にする。',
          tags: ['主行動', '判断力基準', '遠距離', '範囲', '呪文', '判断力セーヴ（DC不明+判断力）']
        }],
        sub: [
          {
            name: '夢幻の帳',
            control_cost_bonus: 0.9,
            stat_bonus: null,
            description: '交戦開始時、前列の敵を混乱状態にする。',
            tags: ['範囲', '知力セーヴ（DC不明+判断力）']
          },
          {
            name: '幻影転移',
            control_cost_bonus: 0.9,
            stat_bonus: null,
            description: '味方が攻撃対象になると反応し、その攻撃をランダムな別の敵に向けさせる。',
            tags: ['反応行動', '判断力セーヴ（DC不明+判断力）']
          }
        ]
      }
    },
    {
      name: 'ナイトクローラー',
      race: 'アンデッド',
      rank: 6,
      control_cost: 9,
      status: { hp: 92, ac: 8, initiative: 0, strength: 14, dexterity: 18, constitution: 16, intelligence: 10, wisdom: 11, charisma: 9 },
      immunities: ['盲目'],
      resistances: [],
      vulnerabilities: ['光輝'],
      basic_attack: {
        name: '迅速斬撃',
        damage: '4d6+敏捷力',
        damage_type: '物理',
        description: '素早く敵を斬る。',
        tags: ['主行動', '敏捷力基準', '近接', '敏捷力命中ロール']
      },
      unique_trait: {
        name: '深淵の霧',
        description: '交戦開始時、深淵の霧を獲得する。',
        bonuses: ['光輝ダメージ脆弱', '盲目状態免疫'],
        tags: []
      },
      parts: {
        main: [{
          name: '影襲',
          control_cost_bonus: 1.8,
          stat_bonus: { dexterity: 2 },
          damage: [
            { dice: '3d10+敏捷力', damage_type: '物理' },
            { dice: '3d8+魅力', damage_type: '死霊' }
          ],
          description: 'HPが最も低い敵を奇襲する。自身が透明状態なら、追加の死霊ダメージを与える。',
          tags: ['主行動', '敏捷力基準', '呪文', '遠距離', '敏捷力命中ロール']
        }],
        sub: [
          {
            name: '悪夢の爪',
            control_cost_bonus: 0.9,
            stat_bonus: { initiative: 2 },
            damage: [{ dice: '1d6', damage_type: '継続精神ダメージ' }],
            description: '攻撃命中時、一定確率で対象を恐怖状態にし、1d6の継続精神ダメージを与える。',
            tags: ['判断力セーヴ（DC13+判断力）']
          },
          {
            name: '闇への回帰',
            control_cost_bonus: 0.9,
            stat_bonus: { ac: 2 },
            damage: [{ dice: '3d10', damage_type: '回復' }],
            description: 'HPが35%以下でダメージを受けると反応し、自身を3d10回復して透明状態に戻す。',
            tags: ['反応行動']
          }
        ]
      }
    },
    {
      name: 'ペガサス',
      race: '野獣',
      rank: 6,
      control_cost: 9,
      status: { hp: 84, ac: 8, initiative: 0, strength: 15, dexterity: 18, constitution: 13, intelligence: 10, wisdom: 14, charisma: 13 },
      immunities: [],
      resistances: ['死霊'],
      vulnerabilities: [],
      basic_attack: {
        name: '迅速刺突',
        damage: '2d10+敏捷力',
        damage_type: '物理',
        description: '素早く敵を突く。',
        tags: ['主行動', '敏捷力基準', '近接', '敏捷力命中ロール（クリティカル19+）']
      },
      unique_trait: {
        name: '聖なる輝き',
        description: '攻撃がクリティカルヒットすると反応し、一定確率で敵全員に4d12+魅力の追加光輝ダメージを与える。',
        bonuses: ['死霊ダメージ耐性'],
        tags: ['反応行動', '魅力基準', '範囲', '耐久力セーヴ（DC10+敏捷力）']
      },
      parts: {
        main: [{
          name: '流星蹴り',
          control_cost_bonus: 1.8,
          stat_bonus: { dexterity: 2 },
          damage: [{ dice: '4d8+敏捷力', damage_type: '物理' }],
          description: '対象とその後方の敵を貫く。',
          tags: ['主行動', '敏捷力基準', '近接', '範囲', '敏捷力命中ロール']
        }],
        sub: [
          {
            name: '神秘の翼',
            control_cost_bonus: 0.9,
            stat_bonus: { charisma: 2 },
            description: '呪文攻撃の対象になると反応し、その呪文を無効化して自身に魔法耐性を付与する。',
            tags: ['反応行動']
          },
          {
            name: '千里眼',
            control_cost_bonus: 0.9,
            stat_bonus: { initiative: 5 },
            description: 'クリティカルヒットの発生条件を3低下させる。'
          }
        ]
      }
    },
    {
      name: 'フェニックス',
      race: '精霊',
      rank: 6,
      control_cost: 9,
      status: { hp: 77, ac: 8, initiative: 0, strength: 11, dexterity: 16, constitution: 14, intelligence: 19, wisdom: 13, charisma: 12 },
      immunities: ['火炎'],
      resistances: [],
      vulnerabilities: ['冷気'],
      basic_attack: {
        name: '火炎の矢',
        damage: '4d6+知力',
        damage_type: '火炎',
        description: '火炎弾を放つ。',
        tags: ['主行動', '知力基準', '呪文', '遠距離', '知力命中ロール']
      },
      unique_trait: {
        name: '永遠の炎',
        description: '致死ダメージを受けると反応して死亡を防ぎ、最大HPの50%を回復する。発動時、敵全員に4d10+魅力の追加火炎ダメージを与える。',
        bonuses: ['火炎ダメージ免疫', '冷気ダメージ脆弱'],
        tags: ['魅力基準']
      },
      parts: {
        main: [{
          name: '天界の炎',
          control_cost_bonus: 1.8,
          stat_bonus: { intelligence: 2 },
          damage: [{ dice: '3d10+知力', damage_type: '火炎' }],
          description: '前列の敵を燃やし、火傷状態にする。',
          tags: ['主行動', '知力基準', '呪文', '近接', '範囲', '敏捷力セーヴ（DC10+知力）']
        }],
        sub: [
          {
            name: '天界の炎',
            control_cost_bonus: 0.9,
            stat_bonus: { dexterity: 2 },
            damage: [{ dice: '1d8+知力', damage_type: '追加火炎ダメージ' }],
            description: '交戦開始時、火傷状態の敵全員に1d8+知力の追加火炎ダメージを与える。',
            tags: ['知力基準', '知力命中ロール']
          },
          {
            name: '業火の姿',
            control_cost_bonus: 0.9,
            stat_bonus: { wisdom: 2 },
            description: '自身の火炎ダメージは対象の火炎耐性と免疫を無視する。'
          }
        ]
      }
    },
    {
      name: 'ウガルル',
      race: '野獣',
      rank: 6,
      control_cost: 9,
      status: { hp: 95, ac: 8, initiative: 0, strength: 19, dexterity: 13, constitution: 17, intelligence: 12, wisdom: 12, charisma: 10 },
      immunities: ['電撃'],
      resistances: ['自然'],
      vulnerabilities: [],
      basic_attack: {
        name: '重撃',
        damage: '3d6+2+筋力',
        damage_type: '殴打',
        description: '対象を打ち倒し、攻撃ロールに不利を与える。',
        tags: ['主行動', '筋力基準', '近接', '筋力命中ロール', '耐久力セーヴ（DC12+筋力）']
      },
      unique_trait: {
        name: '嵐の先触れ',
        description: '物理ダメージを与える攻撃に敏捷力修正値分の物理ダメージを追加し、自然ダメージを与える攻撃に知力修正値分の自然ダメージを追加する。',
        bonuses: ['電撃ダメージ免疫', '自然ダメージ耐性'],
        tags: []
      },
      parts: {
        main: [{
          name: '雷砕き',
          control_cost_bonus: 1.8,
          stat_bonus: { strength: 2 },
          damage: [
            { dice: '3d10+筋力', damage_type: '殴打' },
            { dice: '1d10+判断力', damage_type: '雷鳴' }
          ],
          description: '雷の槌で敵を攻撃する。命中時、敵全員に追加の自然ダメージを与える。',
          tags: ['主行動', '筋力基準', '呪文', '近接', '筋力命中ロール']
        }],
        sub: [
          {
            name: '風の刃',
            control_cost_bonus: 0.9,
            stat_bonus: { intelligence: 3 },
            damage: [{ dice: '知力', damage_type: '追加物理ダメージ' }],
            description: '攻撃命中時に反応し、対象に知力修正値分の追加物理ダメージを与える。',
            tags: ['反応行動', '知力基準']
          },
          {
            name: '嵐の目',
            control_cost_bonus: 0.9,
            stat_bonus: { ac: 2 },
            description: '交戦開始時、敵全員に嵐の目（弱体効果）を付与する。',
            tags: ['範囲', '耐久力セーヴ（DC14+知力）']
          }
        ]
      }
    },
    {
      name: 'ヴァンパイアロード',
      race: 'アンデッド',
      rank: 6,
      control_cost: 9,
      status: { hp: 83, ac: 8, initiative: 0, strength: 12, dexterity: 14, constitution: 14, intelligence: 13, wisdom: 18, charisma: 18 },
      immunities: ['毒', '魅了'],
      resistances: [],
      vulnerabilities: [],
      basic_attack: {
        name: 'チルタッチ',
        damage: '3d6+判断力',
        damage_type: '死霊',
        description: '対象を一時的に回復阻害状態にする。',
        tags: ['主行動', '判断力基準', '呪文', '近接', '耐久力セーヴ（DC12+判断力）']
      },
      unique_trait: {
        name: '血の帝国',
        description: '交戦開始時、味方全員に吸血のオーラを付与する。味方のHPが回復するたび、一時HPを10獲得する。',
        bonuses: ['毒状態免疫', '魅了状態免疫'],
        tags: []
      },
      parts: {
        main: [{
          name: '血の嵐',
          control_cost_bonus: 1.8,
          stat_bonus: { wisdom: 2 },
          damage: [
            { dice: '2d10+判断力', damage_type: '死霊' },
            { dice: '2d10', damage_type: '死霊（出血状態の対象）' }
          ],
          description: '前列の敵を出血状態にする。出血状態の敵には追加ダメージを与える。',
          tags: ['主行動', '判断力基準', '呪文', '近接', '範囲', '耐久力セーヴ（DC12+判断力）']
        }],
        sub: [
          {
            name: '無慈悲な収穫',
            control_cost_bonus: 0.9,
            stat_bonus: { charisma: 2 },
            damage: [
              { dice: '4d6+判断力', damage_type: '追加死霊ダメージ' },
              { dice: '3d10+魅力', damage_type: '回復' }
            ],
            description: 'HPが35%以下のとき敵からダメージを受けると反応し、攻撃者に4d6+判断力の追加死霊ダメージを与える。その後、自身を3d10+魅力回復し、全ロール強化を得る。',
            tags: ['反応行動', '判断力基準']
          },
          {
            name: '血の徴収',
            control_cost_bonus: 0.9,
            stat_bonus: { spell_save_dc: 1 },
            damage: [{ dice: '3d8', damage_type: '回復' }],
            description: '味方が出血状態になると、直ちに出血を解除し、自身を3d8回復して全ロール強化を得る。'
          }
        ]
      }
    }
  ]
};
