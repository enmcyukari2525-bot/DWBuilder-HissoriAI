window.RANK9_DATA = {
    "source":  "https://dungeonwithin.miraheze.org/wiki/Main_Page",
    "reference_source":  "https://wikiwiki.jp/dunwith/",
    "version":  "0.5.4(b.187)",
    "rank":  9,
    "monsters":  [
                     {
                         "name":  "ベヒーモス",
                         "race":  "野獣",
                         "rank":  9,
                         "control_cost":  25,
                         "status":  {
                                        "hp":  180,
                                        "ac":  10,
                                        "initiative":  1,
                                        "strength":  32,
                                        "dexterity":  14,
                                        "constitution":  30,
                                        "intelligence":  8,
                                        "wisdom":  16,
                                        "charisma":  12
                                    },
                         "immunities":  [
                                            "伏せ状態"
                                        ],
                         "resistances":  [
                                             "斬撃"
                                         ],
                         "vulnerabilities":  [

                                             ],
                         "basic_attack":  {
                                              "name":  "破滅の槌撃",
                                              "damage":  "6d6+23",
                                              "damage_type":  "打撃",
                                              "bonus":  "筋力修正値",
                                              "description":  "巨大な体躯を生かして敵を押し潰す。",
                                              "tags":  [
                                                           "主行動",
                                                           "筋力基準",
                                                           "近接",
                                                           "筋力命中ロール(+23)"
                                                       ]
                                          },
                         "unique_trait":  {
                                              "name":  "巨獣の甲殻",
                                              "bonuses":  [
                                                              "斬撃耐性",
                                                              "伏せ状態免疫"
                                                          ],
                                              "description":  "交戦開始時、魔晶石を20スタック獲得する。隣接する戦闘エリアで敵が呪文を唱えた時、耐久力セーヴを要求し、失敗した場合は魔晶石を1スタック消費してその呪文を無効化する。",
                                              "tags":  [
                                                           "耐久力セーヴ(DC 38+筋力修正値)"
                                                       ]
                                          },
                         "parts":  {
                                       "main":  [
                                                    {
                                                        "name":  "大崩落",
                                                        "control_cost_bonus":  8,
                                                        "stat_bonus":  {
                                                                           "strength":  4
                                                                       },
                                                        "damage":  [
                                                                       {
                                                                           "dice":  "6d10",
                                                                           "bonus":  "筋力修正値",
                                                                           "damage_type":  "打撃"
                                                                       },
                                                                       {
                                                                           "dice":  "4d10",
                                                                           "bonus":  "耐久力修正値",
                                                                           "damage_type":  "雷鳴"
                                                                       }
                                                                   ],
                                                        "description":  "対象の一時HPを除去し、強力な殴打ダメージを与える。命中時、すべての敵に追加の雷鳴ダメージを与え、セーヴィング・スローに失敗した敵を伏せ状態にする。",
                                                        "tags":  [
                                                                     "主行動",
                                                                     "筋力基準",
                                                                     "近接",
                                                                     "筋力命中ロール"
                                                                 ]
                                                    }
                                                ],
                                       "sub":  [
                                                   {
                                                       "name":  "震天動地",
                                                       "control_cost_bonus":  4,
                                                       "stat_bonus":  {
                                                                          "constitution":  3
                                                                      },
                                                       "description":  "自身が物理攻撃を受けた際、反応行動として地面を踏み鳴らし、周囲の敵全体に打撃ダメージを与えて吹き飛ばす。"
                                                   },
                                                   {
                                                       "name":  "不屈の巨躯",
                                                       "control_cost_bonus":  4,
                                                       "stat_bonus":  {
                                                                          "ac":  2
                                                                      },
                                                       "description":  "自身の物理ダメージ耐性を強化し、受けたダメージの一部を攻撃者に反射する。"
                                                   }
                                               ]
                                   }
                     },
                     {
                         "name":  "ネメア",
                         "race":  "野獣",
                         "rank":  9,
                         "control_cost":  25,
                         "status":  {
                                        "hp":  150,
                                        "ac":  9,
                                        "initiative":  3,
                                        "strength":  28,
                                        "dexterity":  22,
                                        "constitution":  22,
                                        "intelligence":  26,
                                        "wisdom":  18,
                                        "charisma":  20
                                    },
                         "immunities":  [
                                            "恐怖",
                                            "沈黙"
                                        ],
                         "resistances":  [

                                         ],
                         "vulnerabilities":  [

                                             ],
                         "basic_attack":  {
                                              "name":  "魔力の矢",
                                              "damage":  "5d6+14",
                                              "damage_type":  "力場",
                                              "bonus":  "知力修正値",
                                              "description":  "魔力の矢を放つ。",
                                              "tags":  [
                                                           "主行動",
                                                           "知力基準",
                                                           "呪文",
                                                           "遠距離",
                                                           "知力命中ロール(+22)"
                                                       ]
                                          },
                         "unique_trait":  {
                                              "name":  "獅子王の心臓",
                                              "bonuses":  [
                                                              "恐怖免疫",
                                                              "沈黙免疫"
                                                          ],
                                              "description":  "自身の力場ダメージは敵の耐性と免疫を無視する。ダンジョンに侵攻した敵に押し潰された心臓を3スタック付与する。",
                                              "tags":  [

                                                       ]
                                          },
                         "parts":  {
                                       "main":  [
                                                    {
                                                        "name":  "天崩地裂",
                                                        "control_cost_bonus":  8,
                                                        "stat_bonus":  {
                                                                           "intelligence":  4
                                                                       },
                                                        "damage":  [
                                                                       {
                                                                           "dice":  "6d10",
                                                                           "bonus":  "知力修正値",
                                                                           "damage_type":  "力場"
                                                                       },
                                                                       {
                                                                           "dice":  "4d8",
                                                                           "bonus":  "魅力修正値",
                                                                           "damage_type":  "打撃"
                                                                       }
                                                                   ],
                                                        "description":  "対象に強力な力場ダメージを与えて空中へ打ち上げた後、地面に叩きつけ、すべての敵に殴打ダメージを与える。",
                                                        "tags":  [
                                                                     "主行動",
                                                                     "知力基準",
                                                                     "呪文",
                                                                     "遠距離",
                                                                     "敏捷力セーブ(DC12+知力修正値)"
                                                                 ]
                                                    }
                                                ],
                                       "sub":  [
                                                   {
                                                       "name":  "万象の洞察",
                                                       "control_cost_bonus":  6,
                                                       "stat_bonus":  {
                                                                          "strength":  4
                                                                      },
                                                       "damage":  [
                                                                      {
                                                                          "dice":  "10d10",
                                                                          "bonus":  "知力修正値",
                                                                          "damage_type":  "力場"
                                                                      }
                                                                  ],
                                                       "description":  "クリティカル攻撃を受けると反応し、物理ダメージ免疫状態（2ターン）になり、前列の敵に10d10の追加力場ダメージを与える。",
                                                       "tags":  [
                                                                    "反応行動",
                                                                    "知力基準"
                                                                ]
                                                   },
                                                   {
                                                       "name":  "獅子奮迅",
                                                       "control_cost_bonus":  4,
                                                       "stat_bonus":  null,
                                                       "description":  "交戦開始時、前列の敵に力場ダメージ脆弱と殴打ダメージ脆弱の両方を付与し、自身は6d8の一時HPを得る。",
                                                       "tags":  [
                                                                    "範囲"
                                                                ]
                                                   }
                                               ]
                                   }
                     },
                     {
                         "name":  "エンメリア",
                         "race":  "精霊",
                         "rank":  9,
                         "control_cost":  25,
                         "status":  {
                                        "hp":  130,
                                        "ac":  9,
                                        "initiative":  2,
                                        "strength":  10,
                                        "dexterity":  20,
                                        "constitution":  18,
                                        "intelligence":  26,
                                        "wisdom":  30,
                                        "charisma":  22
                                    },
                         "immunities":  [
                                            "火炎",
                                            "冷気",
                                            "電撃"
                                        ],
                         "resistances":  [

                                         ],
                         "vulnerabilities":  [

                                             ],
                         "basic_attack":  {
                                              "name":  "元素の一閃",
                                              "damage":  "5d6+判断力修正値",
                                              "damage_type":  "電撃",
                                              "bonus":  "判断力修正値",
                                              "description":  "純粋な元素エネルギーを集約して射出する。",
                                              "tags":  [
                                                           "主行動",
                                                           "判断力基準",
                                                           "呪文",
                                                           "遠距離",
                                                           "判断力命中ロール"
                                                       ]
                                          },
                         "unique_trait":  {
                                              "name":  "原初の輪舞",
                                              "bonuses":  [
                                                              "火炎免疫",
                                                              "冷気免疫",
                                                              "電撃免疫"
                                                          ],
                                              "description":  "自身が敵に与える火炎・冷気・電撃ダメージが判断力修正値分増加する。味方全体が与える元素ダメージの倍率を常時強化する。",
                                              "tags":  [
                                                           "範囲"
                                                       ]
                                          },
                         "parts":  {
                                       "main":  [
                                                    {
                                                        "name":  "三界の嵐",
                                                        "control_cost_bonus":  8,
                                                        "stat_bonus":  {
                                                                           "wisdom":  4
                                                                       },
                                                        "damage":  [
                                                                       {
                                                                           "dice":  "4d10",
                                                                           "bonus":  "判断力修正値",
                                                                           "damage_type":  "火炎"
                                                                       },
                                                                       {
                                                                           "dice":  "4d10",
                                                                           "bonus":  "判断力修正値",
                                                                           "damage_type":  "冷気"
                                                                       },
                                                                       {
                                                                           "dice":  "4d10",
                                                                           "bonus":  "判断力修正値",
                                                                           "damage_type":  "電撃"
                                                                       }
                                                                   ],
                                                        "description":  "火炎・冷気・電撃のトリプルエレメンタルストームを放ち、敵全体を壊滅させる。",
                                                        "tags":  [
                                                                     "主行動",
                                                                     "判断力基準",
                                                                     "呪文",
                                                                     "範囲",
                                                                     "敏捷力セーヴ"
                                                                 ]
                                                    }
                                                ],
                                       "sub":  [
                                                   {
                                                       "name":  "元素調和",
                                                       "control_cost_bonus":  4,
                                                       "stat_bonus":  {
                                                                          "intelligence":  2,
                                                                          "wisdom":  2
                                                                      },
                                                       "description":  "味方が元素属性呪文を唱えるたび、敵全体に元素共鳴スタックを付与して被ダメージを増加させる。"
                                                   },
                                                   {
                                                       "name":  "精霊の護り",
                                                       "control_cost_bonus":  4,
                                                       "stat_bonus":  {
                                                                          "constitution":  2
                                                                      },
                                                       "description":  "ターン開始時、全ての味方に属性ダメージを無効化するシールドを展開する。"
                                                   }
                                               ]
                                   }
                     },
                     {
                         "name":  "超越体",
                         "race":  "異形",
                         "rank":  9,
                         "control_cost":  25,
                         "status":  {
                                        "hp":  145,
                                        "ac":  9,
                                        "initiative":  4,
                                        "strength":  12,
                                        "dexterity":  24,
                                        "constitution":  20,
                                        "intelligence":  32,
                                        "wisdom":  26,
                                        "charisma":  28
                                    },
                         "immunities":  [
                                            "精神",
                                            "即死"
                                        ],
                         "resistances":  [
                                             "力場"
                                         ],
                         "vulnerabilities":  [

                                             ],
                         "basic_attack":  {
                                              "name":  "次元の破片",
                                              "damage":  "6d6+知力修正値",
                                              "damage_type":  "精神",
                                              "bonus":  "知力修正値",
                                              "description":  "相手の精神空間を直接切り裂く。",
                                              "tags":  [
                                                           "主行動",
                                                           "知力基準",
                                                           "呪文",
                                                           "遠距離",
                                                           "知力命中ロール"
                                                       ]
                                          },
                         "unique_trait":  {
                                              "name":  "理外の領域",
                                              "bonuses":  [
                                                              "精神免疫",
                                                              "即死免疫"
                                                          ],
                                              "description":  "戦闘中、敵のすべてのセーヴィングスロー数値を減少させる。敵が行動するたび、低確率でその行動を巻き戻しキャンセルの状態にする。",
                                              "tags":  [
                                                           "範囲",
                                                           "知力セーヴ"
                                                       ]
                                          },
                         "parts":  {
                                       "main":  [
                                                    {
                                                        "name":  "時空崩壊",
                                                        "control_cost_bonus":  8,
                                                        "stat_bonus":  {
                                                                           "intelligence":  5
                                                                       },
                                                        "damage":  [
                                                                       {
                                                                           "dice":  "8d10",
                                                                           "bonus":  "知力修正値",
                                                                           "damage_type":  "精神"
                                                                       }
                                                                   ],
                                                        "description":  "指定した範囲の空間を歪ませ、高威力の精神壊滅ダメージを与えるとともに敵のクールダウン時間を増加させる。",
                                                        "tags":  [
                                                                     "主行動",
                                                                     "知力基準",
                                                                     "呪文",
                                                                     "範囲",
                                                                     "知力セーヴ"
                                                                 ]
                                                    }
                                                ],
                                       "sub":  [
                                                   {
                                                       "name":  "現実改変",
                                                       "control_cost_bonus":  4,
                                                       "stat_bonus":  {
                                                                          "charisma":  2
                                                                      },
                                                       "description":  "敵の攻撃を受けた時、その攻撃のダメージ判定を最小数値へと書き換える。"
                                                   },
                                                   {
                                                       "name":  "全知の眼",
                                                       "control_cost_bonus":  4,
                                                       "stat_bonus":  {
                                                                          "wisdom":  2
                                                                      },
                                                       "description":  "敵全体の回避率と防御力を無視してダメージを与えるパッシブ能力。"
                                                   }
                                               ]
                                   }
                     },
                     {
                         "name":  "グリムリーパー",
                         "race":  "アンデッド",
                         "rank":  9,
                         "control_cost":  25,
                         "status":  {
                                        "hp":  135,
                                        "ac":  9,
                                        "initiative":  3,
                                        "strength":  20,
                                        "dexterity":  28,
                                        "constitution":  18,
                                        "intelligence":  24,
                                        "wisdom":  22,
                                        "charisma":  30
                                    },
                         "immunities":  [
                                            "死霊",
                                            "毒"
                                        ],
                         "resistances":  [
                                             "斬撃"
                                         ],
                         "vulnerabilities":  [
                                                 "光輝"
                                             ],
                         "basic_attack":  {
                                              "name":  "魂刈りの大鎌",
                                              "damage":  "6d6+敏捷力修正値",
                                              "damage_type":  "死霊",
                                              "bonus":  "敏捷力修正値",
                                              "description":  "死の冷気を纏った鎌で魂を切り取る。",
                                              "tags":  [
                                                           "主行動",
                                                           "敏捷力基準",
                                                           "近接",
                                                           "敏捷力命中ロール"
                                                       ]
                                          },
                         "unique_trait":  {
                                              "name":  "死の宣告",
                                              "bonuses":  [
                                                              "死霊免疫",
                                                              "毒免疫"
                                                          ],
                                              "description":  "HPが30%以下の敵に自動的に死のカウントダウンを付与し、3ターン経過後に強制即死させる。",
                                              "tags":  [
                                                           "魅力基準",
                                                           "魅力セーヴ"
                                                       ]
                                          },
                         "parts":  {
                                       "main":  [
                                                    {
                                                        "name":  "終焉の刈り入れ",
                                                        "control_cost_bonus":  8,
                                                        "stat_bonus":  {
                                                                           "charisma":  4
                                                                       },
                                                        "damage":  [
                                                                       {
                                                                           "dice":  "7d10",
                                                                           "bonus":  "魅力修正値",
                                                                           "damage_type":  "死霊"
                                                                       }
                                                                   ],
                                                        "description":  "広範囲の敵の命を削り取り、与えたダメージの一定割合を自身のHPとして吸収する。",
                                                        "tags":  [
                                                                     "主行動",
                                                                     "魅力基準",
                                                                     "範囲",
                                                                     "呪文",
                                                                     "耐久力セーヴ"
                                                                 ]
                                                    }
                                                ],
                                       "sub":  [
                                                   {
                                                       "name":  "黄泉の足音",
                                                       "control_cost_bonus":  4,
                                                       "stat_bonus":  {
                                                                          "dexterity":  3
                                                                      },
                                                       "description":  "敵撃破時、即座に追加の主行動権を獲得し、回避率が大幅に上昇する。"
                                                   },
                                                   {
                                                       "name":  "絶望のオーラ",
                                                       "control_cost_bonus":  4,
                                                       "stat_bonus":  null,
                                                       "description":  "戦場にいる全敵ユニットの攻撃力と回復量をダウンさせる。"
                                                   }
                                               ]
                                   }
                     },
                     {
                         "name":  "フュシス",
                         "race":  "植物",
                         "rank":  9,
                         "control_cost":  25,
                         "status":  {
                                        "hp":  200,
                                        "ac":  8,
                                        "initiative":  0,
                                        "strength":  24,
                                        "dexterity":  12,
                                        "constitution":  32,
                                        "intelligence":  16,
                                        "wisdom":  28,
                                        "charisma":  18
                                    },
                         "immunities":  [
                                            "拘束",
                                            "伏せ状態"
                                        ],
                         "resistances":  [
                                             "打撃",
                                             "電撃"
                                         ],
                         "vulnerabilities":  [
                                                 "火炎"
                                             ],
                         "basic_attack":  {
                                              "name":  "大地の荊棘",
                                              "damage":  "5d8+耐久力修正値",
                                              "damage_type":  "刺突",
                                              "bonus":  "耐久力修正値",
                                              "description":  "地中から太いツタを突き出して貫く。",
                                              "tags":  [
                                                           "主行動",
                                                           "耐久力基準",
                                                           "遠距離",
                                                           "耐久力命中ロール"
                                                       ]
                                          },
                         "unique_trait":  {
                                              "name":  "豊穣なる母体",
                                              "bonuses":  [
                                                              "拘束免疫",
                                                              "伏せ状態免疫"
                                                          ],
                                              "description":  "毎ターン開始時、ダンジョン内の全味方ユニットのHPを最大値の10%持続回復する。",
                                              "tags":  [
                                                           "範囲"
                                                       ]
                                          },
                         "parts":  {
                                       "main":  [
                                                    {
                                                        "name":  "樹界再誕",
                                                        "control_cost_bonus":  8,
                                                        "stat_bonus":  {
                                                                           "constitution":  4,
                                                                           "wisdom":  2
                                                                       },
                                                        "damage":  [
                                                                       {
                                                                           "dice":  "5d10",
                                                                           "bonus":  "耐久力修正値",
                                                                           "damage_type":  "刺突"
                                                                       }
                                                                   ],
                                                        "description":  "敵全体に根を絡ませてダメージを与え、移動不能状態にすると同時に、味方全体のステータス減少状態を解除する。",
                                                        "tags":  [
                                                                     "主行動",
                                                                     "耐久力基準",
                                                                     "範囲",
                                                                     "耐久力セーヴ"
                                                                 ]
                                                    }
                                                ],
                                       "sub":  [
                                                   {
                                                       "name":  "寄生胞子",
                                                       "control_cost_bonus":  4,
                                                       "stat_bonus":  {
                                                                          "wisdom":  2
                                                                      },
                                                       "description":  "攻撃を受けた際に胞子をまき散らし、敵に持続毒ダメージと攻撃低下を付与する。"
                                                   },
                                                   {
                                                       "name":  "光合成の守護",
                                                       "control_cost_bonus":  4,
                                                       "stat_bonus":  {
                                                                          "hp":  30
                                                                      },
                                                       "description":  "受けるあらゆる属性ダメージを軽減し、戦闘中の自己再生能力を高める。"
                                                   }
                                               ]
                                   }
                     }
                 ]
};

window.MONSTER_DATA_VERSION = '0.5.4(b.187)-english-wiki-rank5-rank6-rank7-rank8-rank9-2026-11-06-v1';

window.mergeMonsterData = function (data) {
  const base = data && Array.isArray(data.monsters) ? data : { monsters: [] };
  if (base.monsterDataVersion === window.MONSTER_DATA_VERSION) {
    return base;
  }

  const replacementMonsters = [
    ...window.RANK5_DATA.monsters,
    ...window.RANK6_DATA.monsters,
    ...window.RANK7_DATA.monsters,
    ...window.RANK8_DATA.monsters,
    ...window.RANK9_DATA.monsters
  ];
  return {
    ...base,
    source: window.RANK9_DATA.source,
    version: window.RANK9_DATA.version,
    monsterDataVersion: window.MONSTER_DATA_VERSION,
    monsters: [
      ...replacementMonsters,
      ...base.monsters.filter((monster) => ![5, 6, 7, 8, 9].includes(Number(monster.rank)))
    ]
  };
};
