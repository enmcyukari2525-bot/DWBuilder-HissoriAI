window.RANK7_DATA = {
  source: 'https://dungeonwithin.miraheze.org/wiki/Category:Monsters',
  reference_source: 'https://dungeonwithin.miraheze.org/wiki/Monsters',
  rank: 7,
  monsters: [
    {
      name: 'アボミネーション',
      race: 'アンデッド',
      rank: 7,
      control_cost: 12,
      status: { hp: 121, ac: 8, initiative: 0, strength: 23, dexterity: 8, constitution: 21, intelligence: 4, wisdom: 6, charisma: 5 },
      immunities: ['毒', 'クリティカル'],
      resistances: [],
      vulnerabilities: [],
      basic_attack: {
        name: '基本斬撃',
        damage: '4d6+3 筋力補正',
        damage_type: '物理',
        description: '敵を斬る。',
        tags: ['主行動', '筋力基準', '近接', '筋力命中ロール']
      },
      unique_trait: {
        name: '不死の肉体',
        description: '侵攻開始時に変異を3スタック得ます。6秒ごとに変異を１スタック得ます。変異：筋力と敏捷がスタック数だけ増加し、知力と判断力がスタック数だけ減少する。（最大スタック数：10)',
        bonuses: ['状態異常免疫 中毒', '特性獲得 クリティカル免疫'],
        tags: []
      },
      parts: {
        main: [{
          name: '虐殺の大剣',
          control_cost_bonus: 3.8,
          stat_bonus: { strength: 2 },
          damage: [{ dice: '4d10+筋力', damage_type: '物理' }],
          description: '前列の敵を強力に薙ぎ払う。クリティカル時、変異を1スタック獲得する。',
          tags: ['主行動', '筋力基準', '近接', '筋力命中ロール', '範囲']
        }],
        sub: [
          {
            name: '縫合された肉体',
            control_cost_bonus: 1.9,
            stat_bonus: { constitution: 2 },
            description: '近接攻撃を受けると膿を獲得する。'
          },
          {
            name: '怪物の脊椎',
            control_cost_bonus: 1.9,
            stat_bonus: null,
            description: '致死ダメージを受けると、不死の肉体状態に入り、効果終了時に死亡する。'
          }
        ]
      }
    },
    {
      name: 'ボディ・リーパー',
      race: 'アンデッド',
      rank: 7,
      control_cost: 12,
      status: { hp: 107, ac: 8, initiative: 0, strength: 21, dexterity: 10, constitution: 19, intelligence: 8, wisdom: 12, charisma: 10 },
      immunities: ['伏せ'],
      resistances: [],
      vulnerabilities: [],
      basic_attack: {
        name: '重撃',
        damage: '3d6+4+筋力',
        damage_type: '物理',
        description: '対象を打ち倒し、攻撃不利を付与する。',
        tags: ['主行動', '筋力基準', '近接', '筋力命中ロール', '耐久力セーヴ（DC14+筋力）']
      },
      unique_trait: {
        name: '肉体の核',
        description: '交戦開始時、全ての敵に耐久力セーヴを要求する。失敗した敵に崩壊を1スタック付与する。',
        tags: ['範囲', '耐久力セーヴ（DC17+魅力）']
      },
      parts: {
        main: [{
          name: 'ベヒーモスの骨拳',
          control_cost_bonus: 3.8,
          stat_bonus: { strength: 3 },
          damage: [
            { dice: '5d12+筋力', damage_type: '物理' },
            { dice: '3d12+魅力', damage_type: '力場' }
          ],
          description: '対象に崩壊を付与する。対象のHPが25%以下なら追加ダメージを与える。',
          tags: ['主行動', '筋力基準', '近接', '呪文', '耐久力セーヴ（DC???+魅力）']
        }],
        sub: [
          {
            name: '完全な骸骨',
            control_cost_bonus: 1.9,
            stat_bonus: null,
            description: '近接攻撃を受けると反応し、攻撃者に耐久力セーヴを要求する。失敗すると崩壊を1スタック付与する。',
            tags: ['耐久力セーヴ（DC???+魅力）']
          },
          {
            name: '拘束の鎖',
            control_cost_bonus: 1.9,
            stat_bonus: null,
            damage: [{ dice: '1d12+魅力', damage_type: '追加死霊ダメージ' }],
            description: '敵を攻撃すると1d12+魅力の追加死霊ダメージを与える。対象が崩壊状態なら物理ダメージ脆弱を付与する。',
            tags: ['魅力基準', '耐久力セーヴ（DC???+魅力）']
          }
        ]
      }
    },
    {
      name: '炎の君主',
      race: '精霊',
      rank: 7,
      control_cost: 12,
      status: { hp: 114, ac: 8, initiative: 0, strength: 19, dexterity: 10, constitution: 18, intelligence: 23, wisdom: 12, charisma: 11 },
      immunities: ['火炎'],
      resistances: [],
      vulnerabilities: ['冷気'],
      basic_attack: {
        name: '炎撃',
        damage: '3d6+筋力、1d8+筋力',
        damage_type: '打撃、火炎',
        description: '燃え盛る武器で敵を攻撃する。',
        tags: ['主行動', '筋力基準', '呪文', '近接', '筋力命中ロール']
      },
      unique_trait: {
        name: 'マグマの化身',
        description: '敵を攻撃するか、近接攻撃を受けるたび、融解を1スタック付与する。',
        bonuses: ['火炎ダメージ免疫', '冷気ダメージ脆弱'],
        tags: []
      },
      parts: {
        main: [{
          name: '巨大なマグマの槌',
          control_cost_bonus: 3.8,
          stat_bonus: { intelligence: 2 },
          damage: [
            { dice: '3d12+筋力', damage_type: '打撃' },
            { dice: '3d8+知力', damage_type: '火炎' },
            { dice: '3d12+知力', damage_type: '火炎（クリティカル時、全敵）' }
          ],
          description: 'マグマの槌で対象を攻撃し、打撃・火炎ダメージを与える。クリティカル時、全ての敵に3d12+知力の火炎ダメージを与える。',
          tags: ['主行動', '筋力基準', '呪文', '近接', '筋力命中ロール']
        }],
        sub: [
          {
            name: '炎王の核',
            control_cost_bonus: 1.9,
            stat_bonus: { strength: 2 },
            damage: [{ dice: '1d8+魅力', damage_type: '追加火炎ダメージ' }],
            description: '自身の火炎ダメージは対象の火炎耐性を無視する。交戦開始時、全キャラクターに1d8+魅力の追加火炎ダメージを与える。',
            tags: ['魅力基準', '範囲']
          },
          {
            name: '火山岩の鎧',
            control_cost_bonus: 1.9,
            stat_bonus: { constitution: 2 },
            description: '侵攻開始時、火山の鎧を3スタック獲得し、物理・魔法ダメージを大きく軽減する。冷気ダメージを受けると1スタック失う。'
          }
        ]
      }
    },
    {
      name: 'ヒュドラ',
      race: '野獣',
      rank: 7,
      control_cost: 12,
      status: { hp: 121, ac: 8, initiative: 0, strength: 23, dexterity: 10, constitution: 21, intelligence: 5, wisdom: 10, charisma: 7 },
      immunities: ['自然', '毒'],
      resistances: [],
      vulnerabilities: [],
      basic_attack: {
        name: '基本斬撃',
        damage: '4d6+3+筋力',
        damage_type: '物理',
        description: '敵を斬る。',
        tags: ['主行動', '筋力基準', '近接', '筋力命中ロール']
      },
      unique_trait: {
        name: '多頭再生',
        description: '侵攻開始時、蛇頭を9スタック獲得する。',
        bonuses: ['自然ダメージ強化', '毒状態免疫'],
        tags: []
      },
      parts: {
        main: [{
          name: '猛毒牙の大剣',
          control_cost_bonus: 3.8,
          stat_bonus: { strength: 2 },
          damage: [
            { dice: '4d10+筋力', damage_type: '物理' },
            { dice: '2d12+耐久力', damage_type: '自然' }
          ],
          description: '前列の敵を大剣で薙ぎ払い、物理・自然ダメージを与える。',
          tags: ['主行動', '筋力基準', '近接', '筋力命中ロール', '範囲']
        }],
        sub: [
          {
            name: 'ヒュドラの鱗',
            control_cost_bonus: 1.9,
            stat_bonus: { constitution: 2 },
            damage: [{ dice: '3d10+耐久力', damage_type: '追加自然ダメージ' }],
            description: '攻撃を受けると酸性の血を前列の敵に飛ばし、3d10+耐久力の追加自然ダメージを与える。',
            tags: ['耐久力基準', '範囲', '敏捷力セーヴ（DC???+耐久力）']
          },
          {
            name: '再生する頭',
            control_cost_bonus: 1.9,
            stat_bonus: { max_hp: 20 },
            description: '戦闘終了時に蛇頭を1スタック獲得し、2d12+耐久力分のHPを回復する。',
            tags: ['耐久力基準']
          }
        ]
      }
    },
    {
      name: 'サンドワーム',
      race: '野獣',
      rank: 7,
      control_cost: 12,
      status: { hp: 100, ac: 8, initiative: 0, strength: 12, dexterity: 8, constitution: 19, intelligence: 6, wisdom: 23, charisma: 13 },
      immunities: ['盲目'],
      resistances: ['物理'],
      vulnerabilities: [],
      basic_attack: {
        name: '毒噴射',
        damage: '4d6+判断力',
        damage_type: '毒',
        description: '毒ガスを噴き出す。',
        tags: ['主行動', '判断力基準', '呪文', '近接', '耐久力セーヴ（DC???+12）']
      },
      unique_trait: {
        name: '砂の帳',
        description: '交戦開始時に戦場へ砂嵐を起こし、全ての敵に盲目を付与する。',
        bonuses: ['物理ダメージ耐性', '盲目免疫'],
        tags: ['範囲', '耐久力セーヴ（DC???+12）']
      },
      parts: {
        main: [{
          name: '砂漠の王冠',
          control_cost_bonus: 3.8,
          stat_bonus: { wisdom: 2 },
          damage: [{ dice: '4d10+判断力', damage_type: '打撃' }],
          description: '後列の敵に砂嵐を放ち、打撃ダメージを与える。対象が盲目なら窒息させ、喉詰まりを付与する。',
          tags: ['主行動', '判断力基準', '呪文', '遠距離', '範囲']
        }],
        sub: [
          {
            name: '女王の鱗',
            control_cost_bonus: 1.9,
            stat_bonus: { charisma: 2 },
            description: '遠距離攻撃を受けると反応し、砂嵐でダメージを半減して攻撃者に盲目を付与する。',
            tags: ['反応行動']
          },
          {
            name: '砂の守護',
            control_cost_bonus: 1.9,
            stat_bonus: null,
            description: '味方が攻撃対象になると砂で包み、防御力とダメージ軽減を高める砂の盾を付与する。',
            tags: ['反応行動']
          }
        ]
      }
    },
    {
      name: 'ソウル・リーパー',
      race: 'アンデッド',
      rank: 7,
      control_cost: 12,
      status: { hp: 91, ac: 8, initiative: 0, strength: 7, dexterity: 12, constitution: 13, intelligence: 23, wisdom: 20, charisma: 13 },
      immunities: ['魅了', '恐怖'],
      resistances: [],
      vulnerabilities: [],
      basic_attack: {
        name: '影の矢',
        damage: '4d6+知力',
        damage_type: '死霊',
        description: '闇のエネルギーを放つ。',
        tags: ['主行動', '知力基準', '呪文', '遠距離']
      },
      unique_trait: {
        name: '魂の帳',
        description: '交戦開始時、全ての敵に魂の印を付与する。',
        bonuses: ['魅了免疫', '恐怖免疫'],
        tags: ['範囲']
      },
      parts: {
        main: [{
          name: '死神のオーブ',
          control_cost_bonus: 3.8,
          stat_bonus: null,
          damage: [
            { dice: '5d8+知力', damage_type: '死霊' },
            { dice: '2d8', damage_type: '精神（魂の印状態）' }
          ],
          description: '対象に魂の印を付与する。',
          tags: ['主行動', '知力基準', '遠距離', '呪文', '知力命中ロール']
        }],
        sub: [
          {
            name: 'レイスのローブ',
            control_cost_bonus: 1.9,
            stat_bonus: null,
            description: '呪文攻撃の対象になると反応し、攻撃者に魂の印を付与して呪文を無効化する。',
            tags: ['反応行動', '魅力セーヴ（DC???+知力）']
          },
          {
            name: '魂の灯籠',
            control_cost_bonus: 1.9,
            stat_bonus: null,
            description: '敵が死亡すると、他の全ての敵に魂の印を付与し、自身は魂を獲得する。',
            tags: ['範囲', '魅力セーヴ（DC???+判断力）']
          }
        ]
      }
    },
    {
      name: 'テティス',
      race: '野獣',
      rank: 7,
      control_cost: 12,
      status: { hp: 99, ac: 8, initiative: 0, strength: 13, dexterity: 13, constitution: 14, intelligence: 18, wisdom: 14, charisma: 21 },
      immunities: ['冷気', '拘束'],
      resistances: [],
      vulnerabilities: [],
      basic_attack: {
        name: '氷の矢',
        damage: '3d6+知力',
        damage_type: '冷気',
        description: '対象のイニシアチブを低下させる。',
        tags: ['主行動', '知力基準', '呪文', '遠距離', '知力命中ロール']
      },
      unique_trait: {
        name: '海の支配者',
        description: '各交戦の開始時、全ての敵に深淵の圧力を1スタック付与する。',
        bonuses: ['冷気ダメージ強化', '拘束免疫'],
        tags: ['範囲', '筋力セーヴ（DC???+12）']
      },
      parts: {
        main: [{
          name: '螺旋貝の槍',
          control_cost_bonus: 3.8,
          stat_bonus: { charisma: 2 },
          damage: [
            { dice: '5d10+魅力', damage_type: '物理' },
            { dice: '1d10（スタックごと）', damage_type: '冷気' }
          ],
          description: '対象の深淵の圧力のスタック数に応じて追加冷気ダメージを与える。',
          tags: ['主行動', '魅力基準', '遠距離', '呪文', '魅力命中ロール']
        }],
        sub: [
          {
            name: '真珠の冠',
            control_cost_bonus: 1.9,
            stat_bonus: { strength: 2 },
            description: '味方が攻撃する直前に反応し、対象に深淵の冷気を付与する。',
            tags: ['反応行動']
          },
          {
            name: '潮汐の外套',
            control_cost_bonus: 1.9,
            stat_bonus: { initiative: 3 },
            description: '味方が遠距離攻撃の対象になると、対象の味方に渦の帳を付与する。',
            tags: ['反応行動']
          }
        ]
      }
    },
    {
      name: 'ティターニア',
      race: '精霊',
      rank: 7,
      control_cost: 12,
      status: { hp: 89, ac: 8, initiative: 0, strength: 8, dexterity: 13, constitution: 13, intelligence: 14, wisdom: 20, charisma: 23 },
      immunities: ['魅了', '睡眠'],
      resistances: [],
      vulnerabilities: [],
      basic_attack: {
        name: '光線',
        damage: '4d6+魅力',
        damage_type: '光輝',
        description: '強い光を放つ。',
        tags: ['主行動', '魅力基準', '遠距離', '呪文', '魅力命中ロール']
      },
      unique_trait: {
        name: '妖精女王の加護',
        description: '交戦開始時、全ての味方に妖精の祝福を付与する。',
        bonuses: ['魅了免疫', '睡眠免疫'],
        tags: ['範囲']
      },
      parts: {
        main: [{
          name: '世界樹の杖',
          control_cost_bonus: 3.8,
          stat_bonus: { charisma: 2 },
          damage: [{ dice: '3d8+魅力', damage_type: '回復' }],
          description: '前列の味方に世界樹の祝福を付与する。',
          tags: ['主行動', '魅力基準', '遠距離', '範囲']
        }],
        sub: [
          {
            name: '女王の花冠',
            control_cost_bonus: 1.9,
            stat_bonus: null,
            damage: [{ dice: '2d6+魅力の半分', damage_type: '回復' }],
            description: '各交戦の開始時、後列の味方全員を回復する。',
            tags: ['魅力基準', '範囲']
          },
          {
            name: '精霊の翼',
            control_cost_bonus: 1.9,
            stat_bonus: null,
            description: '近接攻撃を受けると反応し、攻撃者に魅了を付与する。',
            tags: ['反応行動', '判断力セーヴ（DC???+魅力）']
          }
        ]
      }
    },
    {
      name: '水の君主',
      race: '精霊',
      rank: 7,
      control_cost: 12,
      status: { hp: 107, ac: 8, initiative: 0, strength: 19, dexterity: 12, constitution: 18, intelligence: 20, wisdom: 14, charisma: 11 },
      immunities: ['冷気'],
      resistances: ['酸'],
      vulnerabilities: [],
      basic_attack: {
        name: '氷の矢',
        damage: '3d6+知力',
        damage_type: '冷気',
        description: '対象のイニシアチブを低下させる。',
        tags: ['主行動', '知力基準', '遠距離', '呪文', '知力命中ロール']
      },
      unique_trait: {
        name: '海神の威光',
        description: '交戦開始時、戦場を深海の霜で覆い、交戦中全ての敵に深海の霜を付与する。',
        tags: ['範囲', '呪文', '耐久力セーヴ（DC12+知力）']
      },
      parts: {
        main: [{
          name: '深海の槍',
          control_cost_bonus: 3.8,
          stat_bonus: null,
          damage: [
            { dice: '4d10+知力', damage_type: '冷気' },
            { dice: '2d10+魅力', damage_type: '打撃' }
          ],
          description: '対象に激流を呼び出し、抵抗に失敗した場合は深淵の圧力を1スタック付与する。',
          tags: ['主行動', '知力基準', '近接', '知力命中ロール', '筋力セーヴ（DC???+知力）']
        }],
        sub: [
          {
            name: '渦の核',
            control_cost_bonus: 1.9,
            stat_bonus: null,
            description: 'このユニットが攻撃した敵に凍傷を1スタック付与する。',
            tags: ['耐久力セーヴ（DC???+知力）']
          },
          {
            name: '潮汐の鱗',
            control_cost_bonus: 1.9,
            stat_bonus: null,
            damage: [{ dice: '1d8+知力', damage_type: '追加冷気ダメージ' }],
            description: 'このユニットを攻撃した敵に1d8+知力の追加冷気ダメージを返し、深淵の圧力を1スタック付与する。',
            tags: ['知力基準', '耐久力セーヴ（DC???+知力）']
          }
        ]
      }
    },
    {
      name: '嵐の君主',
      race: '精霊',
      rank: 7,
      control_cost: 12,
      status: { hp: 91, ac: 8, initiative: 0, strength: 10, dexterity: 24, constitution: 13, intelligence: 13, wisdom: 14, charisma: 13 },
      immunities: ['電撃', '伏せ'],
      resistances: [],
      vulnerabilities: [],
      basic_attack: {
        name: '強化射撃（T4）',
        damage: '4d6+敏捷力',
        damage_type: '物理',
        description: '遠距離武器で敵を撃つ。',
        tags: ['主行動', '敏捷力基準', '遠距離', '敏捷力命中ロール']
      },
      unique_trait: {
        name: '嵐の目',
        description: '交戦開始時、全ての味方に交戦中、遠距離攻撃ロールの有利を付与する。',
        bonuses: ['電撃ダメージ強化', '伏せ免疫'],
        tags: []
      },
      parts: {
        main: [{
          name: '雷鳴と稲妻の弓',
          control_cost_bonus: 3.8,
          stat_bonus: { dexterity: 2 },
          damage: [
            { dice: '2d12+敏捷力', damage_type: '物理' },
            { dice: '2d12+知力', damage_type: '電撃' }
          ],
          description: '雷の矢を放ち、対象とその背後の敵に物理・電撃ダメージを与える。',
          tags: ['主行動', '敏捷力基準', '遠距離', '呪文', '範囲']
        }],
        sub: [
          {
            name: '風の翼',
            control_cost_bonus: 1.9,
            stat_bonus: { initiative: 2 },
            damage: [{ dice: '2d10+敏捷力', damage_type: '電撃' }],
            description: '遠距離攻撃の対象になると反応し、強風で攻撃を完全に回避して電撃で反撃する。',
            tags: ['反応行動', '敏捷力基準']
          },
          {
            name: '雷雲の矢',
            control_cost_bonus: 1.9,
            stat_bonus: { ranged_attack: 2 },
            damage: [{ dice: '2d8+知力', damage_type: '追加電撃ダメージ' }],
            description: '自身の遠距離攻撃が命中するたび、後列の敵に2d8+知力の追加電撃ダメージを与える。',
            tags: ['知力基準']
          }
        ]
      }
    }
  ]
};
