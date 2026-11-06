window.RANK5_DATA = {
  source: 'https://dungeonwithin.miraheze.org/wiki/Category:Monsters',
  reference_source: 'https://dungeonwithin.miraheze.org/wiki/Monsters',
  rank: 5,
  monsters: [
    {
      name: 'エア・エレメンタル',
      race: '精霊',
      rank: 5,
      control_cost: 6,
      status: { hp: 53, ac: 8, initiative: 0, strength: 11, dexterity: 18, constitution: 12, intelligence: 10, wisdom: 12, charisma: 10 },
      immunities: ['電撃'],
      resistances: [],
      vulnerabilities: [],
      basic_attack: {
        name: '迅速刺突',
        damage: '2d8+敏捷力',
        damage_type: '物理',
        description: '素早く敵を突く。',
        tags: ['主行動', '敏捷力基準', '近接', '敏捷力命中ロール（クリティカル19+）']
      },
      unique_trait: {
        name: '流れる優雅さ',
        description: '敏捷力セーヴと魅力セーヴに+4のボーナスを得る。',
        bonuses: ['電撃ダメージ免疫'],
        tags: ['敏捷力セーヴ+4', '魅力セーヴ+4']
      },
      parts: {
        main: [{
          name: '嵐の鞭',
          control_cost_bonus: 1.2,
          stat_bonus: { dexterity: 2 },
          damage: [
            { dice: '3d12+敏捷力', damage_type: '物理' },
            { dice: '1d6+判断力', damage_type: '物理' }
          ],
          description: '命中時、一定確率で敵全員に追加物理ダメージを与える。',
          tags: ['主行動', '敏捷力基準', '呪文', '近接', '敏捷力命中ロール', '敏捷力セーヴ（DC12+敏捷力）']
        }],
        sub: [
          {
            name: '突風撃',
            control_cost_bonus: 0.6,
            stat_bonus: { initiative: 3 },
            description: '攻撃命中時、一定確率で対象をスタン状態にする。',
            tags: ['筋力セーヴ（DC11+敏捷力）']
          },
          {
            name: 'ぼやけた姿',
            control_cost_bonus: 0.6,
            stat_bonus: { ac: 1 },
            description: '遠距離攻撃から受けるダメージを2～20（2d10）軽減する。'
          }
        ]
      }
    },
    {
      name: 'バジリスク',
      race: '野獣',
      rank: 5,
      control_cost: 6,
      status: { hp: 72, ac: 8, initiative: 0, strength: 12, dexterity: 10, constitution: 15, intelligence: 10, wisdom: 17, charisma: 10 },
      immunities: ['自然'],
      resistances: [],
      vulnerabilities: [],
      basic_attack: {
        name: '毒の噴霧',
        damage: '3d6+判断力',
        damage_type: '自然',
        description: '毒ガスを吐き出す。',
        tags: ['主行動', '判断力基準', '呪文', '近接', '耐久力セーヴ（DC10+判断力）']
      },
      unique_trait: {
        name: 'バジリスクの毒',
        description: '自身の自然ダメージは対象の耐性と免疫を無視する。毒状態の敵に対する攻撃ロールに有利を得る。',
        bonuses: ['自然ダメージ免疫'],
        tags: []
      },
      parts: {
        main: [{
          name: '腐敗の息',
          control_cost_bonus: 1.2,
          stat_bonus: { wisdom: 2 },
          damage: [{ dice: '3d8+判断力', damage_type: '自然' }],
          description: '対象とその後方の敵1体を毒状態にする。',
          tags: ['主行動', '判断力基準', '呪文', '近接', '範囲', '耐久力セーヴ（DC12+判断力）']
        }],
        sub: [
          {
            name: '弱体化の呪い',
            control_cost_bonus: 0.6,
            stat_bonus: { spell_save_dc: 1 },
            description: '敵に自然ダメージを与えるたび、追加で弱体状態を付与する。'
          },
          {
            name: '毒素放出',
            control_cost_bonus: 0.6,
            stat_bonus: { spell_save_dc: 1 },
            description: '近接攻撃の対象になると反応し、攻撃者の攻撃ロールに不利を与え、一定確率で盲目状態にする。',
            tags: ['反応行動', '耐久力セーヴ（DC14+耐久力）']
          }
        ]
      }
    },
    {
      name: 'コカトリス',
      race: '野獣',
      rank: 5,
      control_cost: 6,
      status: { hp: 52, ac: 8, initiative: 0, strength: 10, dexterity: 14, constitution: 12, intelligence: 10, wisdom: 12, charisma: 17 },
      immunities: ['石化', '毒'],
      resistances: [],
      vulnerabilities: [],
      basic_attack: {
        name: '閃光',
        damage: '3d6+魅力',
        damage_type: '力場',
        description: '秘術のエネルギー光線を2本放つ。',
        tags: ['主行動', '魅力基準', '呪文', '遠距離', '魅力命中ロール']
      },
      unique_trait: {
        name: '石化の視線',
        description: '交戦開始時、一定確率で前列の敵に石化蓄積を3スタック付与する。',
        bonuses: ['石化状態免疫', '毒状態免疫'],
        tags: []
      },
      parts: {
        main: [{
          name: '死の光線',
          control_cost_bonus: 1.2,
          stat_bonus: { charisma: 2 },
          damage: [{ dice: '2d8+魅力', damage_type: '死霊' }],
          description: '前列の敵に死の光線を放つ。命中時、一定確率で石化蓄積を3スタック付与する。',
          tags: ['主行動', '魅力基準', '呪文', '遠距離', '魅力命中ロール', '範囲', '耐久力セーヴ（DC14+魅力）']
        }],
        sub: [
          {
            name: '粉砕',
            control_cost_bonus: 0.6,
            stat_bonus: { wisdom: 2 },
            damage: [{ dice: '6d10+魅力', damage_type: '追加力場ダメージ' }],
            description: '対象が石化状態になると反応し、6d10+魅力の追加力場ダメージを与えて石化状態を解除する。',
            tags: ['反応行動', '魅力基準']
          },
          {
            name: '石化した皮膚',
            control_cost_bonus: 0.6,
            stat_bonus: { spell_save_dc: 2 },
            description: 'ダメージを受けると反応し、一定確率で攻撃者のACを低下させ、対象に石化蓄積を1スタック移す。',
            tags: ['反応行動', '耐久力セーヴ（DC14+魅力）']
          }
        ]
      }
    },
    {
      name: 'ファイア・エレメンタル',
      race: '精霊',
      rank: 5,
      control_cost: 6,
      status: { hp: 62, ac: 8, initiative: 0, strength: 14, dexterity: 10, constitution: 14, intelligence: 18, wisdom: 10, charisma: 9 },
      immunities: ['火炎'],
      resistances: [],
      vulnerabilities: ['冷気'],
      basic_attack: {
        name: '火炎の矢',
        damage: '3d6+知力',
        damage_type: '火炎',
        description: '火炎弾を放つ。',
        tags: ['主行動', '知力基準', '呪文', '遠距離', '知力命中ロール']
      },
      unique_trait: {
        name: '熱吸収',
        description: '火炎呪文が詠唱されるたび、熱を1スタック獲得する。',
        bonuses: ['火炎ダメージ免疫', '冷気ダメージ脆弱'],
        tags: []
      },
      parts: {
        main: [{
          name: '超新星',
          control_cost_bonus: 1.2,
          stat_bonus: { intelligence: 2 },
          damage: [{ dice: '2d12+知力', damage_type: '火炎' }],
          description: '前列の敵に火炎ダメージを与える。',
          tags: ['主行動', '知力基準', '呪文', '近接', '範囲', '敏捷力セーヴ（DC10+知力）']
        }],
        sub: [
          {
            name: '灰の烙印',
            control_cost_bonus: 0.6,
            stat_bonus: { spell_save_dc: 1 },
            description: '交戦開始時、一定確率で敵全員に火炎脆弱を付与する。',
            tags: ['範囲', '耐久力セーヴ（DC12+知力）']
          },
          {
            name: '炎の外套',
            control_cost_bonus: 0.6,
            stat_bonus: { ac: 1 },
            damage: [{ dice: '1d10+知力', damage_type: '追加火炎ダメージ' }],
            description: '近接攻撃の対象になると反応し、受けるダメージを4d8軽減して、攻撃者に1d10+知力の追加火炎ダメージを与える。',
            tags: ['反応行動', '知力基準']
          }
        ]
      }
    },
    {
      name: 'リッチ',
      race: 'アンデッド',
      rank: 5,
      control_cost: 6,
      status: { hp: 57, ac: 8, initiative: 0, strength: 7, dexterity: 10, constitution: 12, intelligence: 16, wisdom: 18, charisma: 11 },
      immunities: ['毒', '魅了'],
      resistances: [],
      vulnerabilities: [],
      basic_attack: {
        name: 'チルタッチ',
        damage: '2d6+判断力',
        damage_type: '死霊',
        description: '対象を一時的に回復阻害状態にする。',
        tags: ['主行動', '判断力基準', '呪文', '近接', '耐久力セーヴ（DC12+判断力）']
      },
      unique_trait: {
        name: '魂の収集者',
        description: '交戦開始時、魂を獲得する。',
        bonuses: ['毒状態免疫', '魅了状態免疫'],
        tags: []
      },
      parts: {
        main: [{
          name: '魂の爆発',
          control_cost_bonus: 1.2,
          stat_bonus: { wisdom: 2 },
          damage: [{ dice: '3d10+判断力', damage_type: '死霊' }],
          description: 'ランダムな敵に遠距離呪文攻撃を行う。命中時、一定確率で対象の魂を奪う。',
          tags: ['主行動', '判断力基準', '呪文', '遠距離', '判断力命中ロール', '魅力セーヴ（DC12+判断力）']
        }],
        sub: [
          {
            name: '魂の呪い',
            control_cost_bonus: 0.6,
            stat_bonus: { charisma: 2 },
            description: '交戦開始時、一定確率で敵に死霊脆弱を付与する。',
            tags: ['範囲', '判断力セーヴ（DC12+判断力）']
          },
          {
            name: '魂の障壁',
            control_cost_bonus: 0.6,
            stat_bonus: { spell_save_dc: 1 },
            damage: [{ dice: '3d8', bonus: '判断力', damage_type: '回復' }],
            description: 'ダメージを受けると反応し、魂を1つ消費して自身を3d8+判断力回復する。',
            tags: ['反応行動', '判断力基準']
          }
        ]
      }
    },
    {
      name: 'スケルトンロード',
      race: 'アンデッド',
      rank: 5,
      control_cost: 6,
      status: { hp: 74, ac: 8, initiative: 0, strength: 17, dexterity: 10, constitution: 15, intelligence: 10, wisdom: 12, charisma: 12 },
      immunities: [],
      resistances: [],
      vulnerabilities: ['物理'],
      basic_attack: {
        name: '基本斬撃',
        damage: '3d6+筋力',
        damage_type: '物理',
        description: '敵を斬る。',
        tags: ['主行動', '筋力基準', '近接', '筋力命中ロール']
      },
      unique_trait: {
        name: '君主の陣形',
        description: '交戦開始時に前列にいると、君主の陣形を獲得する。',
        bonuses: ['物理ダメージ脆弱'],
        tags: []
      },
      parts: {
        main: [{
          name: '処刑人の大剣',
          control_cost_bonus: 1.2,
          stat_bonus: { strength: 2 },
          damage: [{ dice: '3d8+筋力', damage_type: '物理' }],
          description: '前列の敵全員を斬り、HPが10%以下の敵を処刑する。',
          tags: ['主行動', '筋力基準', '近接', '筋力命中ロール', '範囲', '魅力セーヴ（DC12+筋力）']
        }],
        sub: [
          {
            name: '君主の威光',
            control_cost_bonus: 0.6,
            stat_bonus: { initiative: 3 },
            description: '行動終了時、味方全員に全ロール強化を付与する。',
            tags: ['反応行動', '範囲']
          },
          {
            name: '骨の鎧',
            control_cost_bonus: 0.6,
            stat_bonus: { ac: 2 },
            description: '攻撃命中時に骨の鎧を獲得する。ダメージを受けるとスタックを1つ消費してダメージを軽減する。'
          }
        ]
      }
    },
    {
      name: 'スフィンクス',
      race: '野獣',
      rank: 5,
      control_cost: 6,
      status: { hp: 65, ac: 8, initiative: 0, strength: 14, dexterity: 10, constitution: 14, intelligence: 17, wisdom: 16, charisma: 11 },
      immunities: ['沈黙'],
      resistances: [],
      vulnerabilities: [],
      basic_attack: {
        name: '重撃',
        damage: '2d6+筋力',
        damage_type: '殴打',
        description: '対象を打ち倒し、攻撃ロールに不利を与える。',
        tags: ['主行動', '筋力基準', '近接', '筋力命中ロール', '耐久力セーヴ（DC13+筋力）']
      },
      unique_trait: {
        name: 'スフィンクスの謎',
        description: '交戦開始時に反応し、一定確率で前列の敵を沈黙状態および有罪状態にする。',
        bonuses: ['沈黙状態免疫'],
        tags: ['反応行動', '範囲', '知力セーヴ（DC12+知力）']
      },
      parts: {
        main: [{
          name: '裁きの槌',
          control_cost_bonus: 1.2,
          stat_bonus: null,
          damage: [
            { dice: '3d8+筋力', damage_type: '殴打' },
            { dice: '2d8+知力', damage_type: '精神（有罪状態の対象）' }
          ],
          description: '対象が有罪状態なら精神ダメージを与え、スタン状態にする。',
          tags: ['主行動', '筋力基準', '呪文', '近接', '筋力命中ロール', '耐久力セーヴ（DC不明+魅力）']
        }],
        sub: [
          {
            name: '真実の巻物',
            control_cost_bonus: 0.6,
            stat_bonus: { intelligence: 2 },
            description: '盲目状態への免疫と精神ダメージ耐性を得る。',
            bonuses: ['盲目状態免疫', '精神ダメージ耐性']
          },
          {
            name: '最後の審判',
            control_cost_bonus: 0.6,
            stat_bonus: { ac: 1 },
            damage: [{ dice: '3d10+知力', damage_type: '精神' }],
            description: '敵が味方を倒すと反応し、一定確率でその敵に3d10+知力の追加精神ダメージを与え、有罪状態にする。',
            tags: ['反応行動', '知力基準', '判断力セーヴ（DC12+知力）']
          }
        ]
      }
    },
    {
      name: 'ヴァンパイア',
      race: 'アンデッド',
      rank: 5,
      control_cost: 6,
      status: { hp: 64, ac: 8, initiative: 0, strength: 11, dexterity: 17, constitution: 13, intelligence: 12, wisdom: 12, charisma: 16 },
      immunities: ['毒'],
      resistances: [],
      vulnerabilities: [],
      basic_attack: {
        name: '迅速刺突',
        damage: '2d8+敏捷力',
        damage_type: '物理',
        description: '素早く敵を突く。',
        tags: ['主行動', '敏捷力基準', '近接', '敏捷力命中ロール（クリティカル19+）']
      },
      unique_trait: {
        name: '深紅の渇き',
        description: '攻撃命中時、対象に1d4+魅力の追加死霊ダメージを与え、自身を魅力修正値分回復する。',
        bonuses: ['毒状態免疫'],
        damage: [
          { dice: '1d4+魅力', damage_type: '追加死霊ダメージ' },
          { dice: '魅力', damage_type: '回復' }
        ],
        tags: []
      },
      parts: {
        main: [{
          name: '深紅の一撃',
          control_cost_bonus: 1.2,
          stat_bonus: { dexterity: 2 },
          damage: [
            { dice: '3d8+敏捷力', damage_type: '物理' },
            { dice: '2d8+魅力', damage_type: '死霊' },
            { dice: '2d8', damage_type: '回復' }
          ],
          description: 'クリティカルヒット時、追加の死霊ダメージを与えてHPを回復する。クリティカルヒットしやすい。',
          tags: ['主行動', '敏捷力基準', '呪文', '近接', '敏捷力命中ロール（クリティカル19+）']
        }],
        sub: [
          {
            name: '滴る刃',
            control_cost_bonus: 0.6,
            stat_bonus: { charisma: 2 },
            description: '近接攻撃の対象になると反応し、受けるダメージを3d10軽減する。',
            tags: ['反応行動']
          },
          {
            name: '血の供物',
            control_cost_bonus: 0.6,
            stat_bonus: { ac: 2 },
            description: '交戦開始時、自身の現在HPを15%消費し、味方全員に血の供物を付与する。',
            tags: ['範囲']
          }
        ]
      }
    },
    {
      name: 'ウォーター・エレメンタル',
      race: '精霊',
      rank: 5,
      control_cost: 6,
      status: { hp: 59, ac: 8, initiative: 0, strength: 10, dexterity: 12, constitution: 13, intelligence: 11, wisdom: 16, charisma: 17 },
      immunities: [],
      resistances: ['冷気'],
      vulnerabilities: ['火炎'],
      basic_attack: {
        name: '閃光',
        damage: '3d6+魅力',
        damage_type: '力場',
        description: '秘術のエネルギー光線を2本放つ。',
        tags: ['主行動', '魅力基準', '遠距離', '呪文', '魅力命中ロール']
      },
      unique_trait: {
        name: '鼓舞の歌',
        description: '味方がクリティカルヒットを出すか、敵の効果に抵抗するたび、1d6+魅力回復する。',
        bonuses: ['冷気ダメージ耐性', '火炎ダメージ脆弱'],
        tags: ['魅力基準']
      },
      parts: {
        main: [{
          name: '不協和音',
          control_cost_bonus: 1.2,
          stat_bonus: { charisma: 2 },
          damage: [
            { dice: '2d6+魅力', damage_type: '精神' },
            { dice: '2d6+知力', damage_type: '冷気' }
          ],
          description: '前列の敵を攻撃し、一定確率で攻撃ロールに不利を与える。',
          tags: ['主行動', '魅力基準', '遠距離', '呪文', '範囲', '判断力セーヴ（DC12+魅力）']
        }],
        sub: [
          {
            name: '激励の旋律',
            control_cost_bonus: 0.6,
            stat_bonus: { wisdom: 2 },
            description: '味方のHPを直接回復する能力を使うと、対象に全ロール強化を付与する。'
          },
          {
            name: '守護の歌',
            control_cost_bonus: 0.6,
            stat_bonus: { spell_save_dc: 2 },
            damage: [{ dice: '3d10+判断力', damage_type: '回復' }],
            description: '味方がクリティカル攻撃を受けると反応し、その味方を3d10+判断力回復してAC強化を付与する。',
            tags: ['反応行動', '判断力基準']
          }
        ]
      }
    }
  ]
};
