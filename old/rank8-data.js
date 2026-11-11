window.RANK8_DATA = {
    "source":  "https://dungeonwithin.miraheze.org/wiki/Monsters",
    "reference_source":  "https://wikiwiki.jp/dunwith/",
    "rank":  8,
    "monsters":  [
                     {
                         "name":  "フェンリル",
                         "race":  "野獣",
                         "rank":  8,
                         "control_cost":  20,
                         "status":  {
                                        "hp":  135,
                                        "ac":  8,
                                        "initiative":  2,
                                        "strength":  27,
                                        "dexterity":  20,
                                        "constitution":  24,
                                        "intelligence":  6,
                                        "wisdom":  14,
                                        "charisma":  10
                                    },
                         "immunities":  [
                                            "冷気"
                                        ],
                         "resistances":  [

                                         ],
                         "vulnerabilities":  [

                                             ],
                         "basic_attack":  {
                                              "name":  "基本斬撃",
                                              "damage":  "5d6+4+筋力修正値",
                                              "damage_type":  "物理",
                                              "bonus":  "筋力修正値",
                                              "description":  "敵を攻撃する。",
                                              "tags":  [
                                                           "主行動",
                                                           "筋力基準",
                                                           "近接",
                                                           "筋力命中ロール"
                                                       ]
                                          },
                         "unique_trait":  {
                                              "name":  "終末の遠吠え",
                                              "bonuses":  [
                                                              "冷気免疫",
                                                              "恐怖免疫"
                                                          ],
                                              "description":  "交戦開始時、すべての味方は終末の遠吠えを3スタック得る。",
                                              "tags":  [

                                                       ]
                                          },
                         "parts":  {
                                       "main":  [
                                                    {
                                                        "name":  "霜牙の大剣",
                                                        "control_cost_bonus":  6,
                                                        "stat_bonus":  {
                                                                           "strength":  3
                                                                       },
                                                        "damage":  [
                                                                       {
                                                                           "dice":  "4d10",
                                                                           "bonus":  "筋力修正値",
                                                                           "damage_type":  "物理"
                                                                       },
                                                                       {
                                                                           "dice":  "3d8",
                                                                           "bonus":  "判断力修正値",
                                                                           "damage_type":  "冷気"
                                                                       }
                                                                   ],
                                                        "description":  "対象を斬り裂き、すべての敵に冷気ダメージを与える。",
                                                        "tags":  [
                                                                     "主行動",
                                                                     "筋力基準",
                                                                     "呪文",
                                                                     "近接",
                                                                     "筋力命中ロール",
                                                                     "敏捷力セーヴ"
                                                                 ]
                                                    }
                                                ],
                                       "sub":  [
                                                   {
                                                       "name":  "粉砕",
                                                       "control_cost_bonus":  3,
                                                       "stat_bonus":  {
                                                                          "wisdom":  3
                                                                      },
                                                       "description":  "クリティカルヒットを与えると、対象に物理ダメージ脆弱性および冷気ダメージ脆弱性を付与する。",
                                                       "effects":  [
                                                                       {
                                                                           "name":  "物理ダメージ脆弱",
                                                                           "duration":  "1交戦 / 非戦闘時2ターン"
                                                                       },
                                                                       {
                                                                           "name":  "冷気ダメージ脆弱",
                                                                           "duration":  "1交戦 / 非戦闘時2ターン"
                                                                       }
                                                                   ]
                                                   },
                                                   {
                                                       "name":  "捕食者の本能",
                                                       "control_cost_bonus":  3,
                                                       "stat_bonus":  {
                                                                          "initiative":  7
                                                                      },
                                                       "description":  "HP35%以下の敵を攻撃する際、確定クリティカルが発生する。戦場で誰かが死亡すると、即座に消費した基本攻撃1回を回復する。"
                                                   }
                                               ]
                                   }
                     },
                     {
                         "name":  "スレイプニル",
                         "race":  "野獣",
                         "rank":  8,
                         "control_cost":  20,
                         "status":  {
                                        "hp":  115,
                                        "ac":  8,
                                        "initiative":  0,
                                        "strength":  18,
                                        "dexterity":  25,
                                        "constitution":  18,
                                        "intelligence":  12,
                                        "wisdom":  20,
                                        "charisma":  14
                                    },
                         "immunities":  [

                                        ],
                         "resistances":  [

                                         ],
                         "vulnerabilities":  [

                                             ],
                         "basic_attack":  {
                                              "name":  "致命の射撃",
                                              "damage":  "5d6+4+敏捷力修正値",
                                              "damage_type":  "物理",
                                              "bonus":  "敏捷力修正値",
                                              "description":  "遠距離武器で敵を撃つ。",
                                              "tags":  [
                                                           "主行動",
                                                           "敏捷力補正",
                                                           "遠距離",
                                                           "敏捷力命中ロール"
                                                       ]
                                          },
                         "unique_trait":  {
                                              "name":  "疾風の蹄",
                                              "bonuses":  [
                                                              "拘束免疫",
                                                              "伏せ状態免疫"
                                                          ],
                                              "description":  "交戦開始時、すべての味方に疾風の蹄を2スタック付与する。",
                                              "tags":  [
                                                           "範囲"
                                                       ]
                                          },
                         "parts":  {
                                       "main":  [
                                                    {
                                                        "name":  "流星の槍",
                                                        "control_cost_bonus":  6,
                                                        "stat_bonus":  null,
                                                        "damage":  [
                                                                       {
                                                                           "dice":  "6d8",
                                                                           "bonus":  "敏捷力修正値",
                                                                           "damage_type":  "物理"
                                                                       }
                                                                   ],
                                                        "description":  "対象とその背後の敵を一直線に貫通する物理ダメージを与える。",
                                                        "tags":  [
                                                                     "主行動",
                                                                     "敏捷力基準",
                                                                     "遠距離",
                                                                     "敏捷力命中ロール"
                                                                 ]
                                                    }
                                                ],
                                       "sub":  [
                                                   {
                                                       "name":  "彗星の矢",
                                                       "control_cost_bonus":  3,
                                                       "stat_bonus":  {
                                                                          "ranged_attack":  3
                                                                      },
                                                       "damage":  [
                                                                      {
                                                                          "dice":  "3d8",
                                                                          "bonus":  "判断力修正値",
                                                                          "damage_type":  "雷鳴"
                                                                      }
                                                                  ],
                                                       "description":  "遠距離攻撃が敵に命中すると反応し、すべての敵に3d8の追加雷鳴ダメージを与える。",
                                                       "tags":  [
                                                                    "反応行動",
                                                                    "判断力基準",
                                                                    "範囲",
                                                                    "敏捷力セーヴ"
                                                                ]
                                                   },
                                                   {
                                                       "name":  "反撃機動",
                                                       "control_cost_bonus":  3,
                                                       "stat_bonus":  null,
                                                       "description":  "遠隔攻撃の対象になると反応して攻撃を回避し、即座に消費した基本攻撃1回を回復する。",
                                                       "tags":  [
                                                                    "反応行動"
                                                                ]
                                                   }
                                               ]
                                   }
                     },
                     {
                         "name":  "キリン",
                         "race":  "精霊",
                         "rank":  8,
                         "control_cost":  20,
                         "status":  {
                                        "hp":  110,
                                        "ac":  8,
                                        "initiative":  null,
                                        "strength":  12,
                                        "dexterity":  18,
                                        "constitution":  16,
                                        "intelligence":  20,
                                        "wisdom":  26,
                                        "charisma":  18
                                    },
                         "immunities":  [
                                            "電撃"
                                        ],
                         "resistances":  [
                                             "雷鳴"
                                         ],
                         "vulnerabilities":  [

                                             ],
                         "basic_attack":  {
                                              "name":  "雷の矢",
                                              "damage":  "5d6+4+知力修正値",
                                              "damage_type":  "電撃",
                                              "bonus":  "知力修正値",
                                              "description":  "稲妻を放つ。",
                                              "tags":  [
                                                           "主行動",
                                                           "判断力基準",
                                                           "呪文",
                                                           "遠距離",
                                                           "判断力命中ロール"
                                                       ]
                                          },
                         "unique_trait":  {
                                              "name":  "過負荷",
                                              "description":  "自身の電撃ダメージが対象の抵抗や免疫を無視する。誰かが電撃能力を使用すると、すべての敵に静電気を付与する。",
                                              "tags":  [
                                                           "呪文",
                                                           "耐久力セーブ"
                                                       ]
                                          },
                         "parts":  {
                                       "main":  [
                                                    {
                                                        "name":  "天罰の落雷",
                                                        "control_cost_bonus":  6,
                                                        "stat_bonus":  null,
                                                        "damage":  [
                                                                       {
                                                                           "dice":  "6d10",
                                                                           "bonus":  "判断力修正値",
                                                                           "damage_type":  "電撃"
                                                                       }
                                                                   ],
                                                        "description":  "戦場後列の敵に強力な電撃ダメージを与える。",
                                                        "tags":  [
                                                                     "主行動",
                                                                     "判断力基準",
                                                                     "遠距離",
                                                                     "呪文",
                                                                     "敏捷力セーヴ"
                                                                 ]
                                                    }
                                                ],
                                       "sub":  [
                                                   {
                                                       "name":  "稲妻の跳躍",
                                                       "control_cost_bonus":  3,
                                                       "stat_bonus":  null,
                                                       "damage":  [
                                                                      {
                                                                          "dice":  "2d8",
                                                                          "bonus":  "判断力修正値",
                                                                          "damage_type":  "電撃"
                                                                      }
                                                                  ],
                                                       "description":  "近接攻撃の対象になると、閃光のように攻撃を回避し、すべての敵に2d8の追加電撃ダメージを与える。",
                                                       "tags":  [
                                                                    "反応行動",
                                                                    "判断力基準",
                                                                    "近接",
                                                                    "呪文",
                                                                    "耐久力セーヴ"
                                                                ]
                                                   },
                                                   {
                                                       "name":  "雷雲の帳",
                                                       "control_cost_bonus":  3,
                                                       "stat_bonus":  null,
                                                       "damage":  [
                                                                      {
                                                                          "dice":  "3d8",
                                                                          "bonus":  "判断力修正値",
                                                                          "damage_type":  "電撃"
                                                                      }
                                                                  ],
                                                       "description":  "交戦開始時、前列のすべての敵に3d8の追加電撃ダメージを与え、反応行動不可状態を付与する。",
                                                       "tags":  [
                                                                    "判断力基準",
                                                                    "範囲",
                                                                    "耐久力セーヴ"
                                                                ]
                                                   }
                                               ]
                                   }
                     },
                     {
                         "name":  "エーテリアル",
                         "race":  "精霊",
                         "rank":  8,
                         "control_cost":  20,
                         "status":  {
                                        "hp":  100,
                                        "ac":  8,
                                        "initiative":  null,
                                        "strength":  6,
                                        "dexterity":  16,
                                        "constitution":  14,
                                        "intelligence":  24,
                                        "wisdom":  18,
                                        "charisma":  27
                                    },
                         "immunities":  [

                                        ],
                         "resistances":  [
                                             "光輝"
                                         ],
                         "vulnerabilities":  [

                                             ],
                         "basic_attack":  {
                                              "name":  "光線",
                                              "damage":  "5d6+4+魅力修正値",
                                              "damage_type":  "光輝",
                                              "description":  "強い光を放つ。",
                                              "tags":  [
                                                           "主行動",
                                                           "魅力基準",
                                                           "呪文",
                                                           "遠距離",
                                                           "魅力命中ロール(+15)"
                                                       ]
                                          },
                         "unique_trait":  {
                                              "name":  "太陽の涙",
                                              "description":  "自身の光輝ダメージが対象の抵抗や免疫を無視する。交戦開始時、超新星スタックを1獲得する。10スタックに達するとすべてのスタックを消費して、ダンジョン区域のすべての敵に10d10の追加光輝ダメージを与える。",
                                              "tags":  [
                                                           "魅力基準",
                                                           "範囲",
                                                           "呪文",
                                                           "敏捷力セーヴ"
                                                       ]
                                          },
                         "parts":  {
                                       "main":  [
                                                    {
                                                        "name":  "裁きの光線",
                                                        "control_cost_bonus":  6,
                                                        "stat_bonus":  null,
                                                        "damage":  [
                                                                       {
                                                                           "dice":  "6d8",
                                                                           "damage_type":  "光輝"
                                                                       }
                                                                   ],
                                                        "description":  "対象とその後ろの敵を貫く強力な光輝ダメージを与える。",
                                                        "tags":  [
                                                                     "主行動",
                                                                     "魅力基準",
                                                                     "遠距離",
                                                                     "呪文",
                                                                     "魅力命中ロール"
                                                                 ]
                                                    }
                                                ],
                                       "sub":  [
                                                   {
                                                       "name":  "懲罰の鏡",
                                                       "control_cost_bonus":  3,
                                                       "stat_bonus":  null,
                                                       "damage":  [
                                                                      {
                                                                          "dice":  "4d6",
                                                                          "damage_type":  "光輝"
                                                                      }
                                                                  ],
                                                       "description":  "呪文の対象になると反応して該当する呪文を無効化し、攻撃者に4d6の追加光輝ダメージを反射する。",
                                                       "tags":  [
                                                                    "反応行動",
                                                                    "魅力基準",
                                                                    "近接",
                                                                    "呪文",
                                                                    "魅力セーヴ"
                                                                ]
                                                   },
                                                   {
                                                       "name":  "エーテルの盾",
                                                       "control_cost_bonus":  3,
                                                       "stat_bonus":  null,
                                                       "description":  "交戦開始時、すべての味方にエーテル・シールドを付与する。",
                                                       "tags":  [
                                                                    "範囲"
                                                                ]
                                                   }
                                               ]
                                   }
                     },
                     {
                         "name":  "リッチ・クイーン",
                         "race":  "アンデッド",
                         "rank":  8,
                         "control_cost":  20,
                         "status":  {
                                        "hp":  105,
                                        "ac":  8,
                                        "initiative":  null,
                                        "strength":  8,
                                        "dexterity":  12,
                                        "constitution":  14,
                                        "intelligence":  26,
                                        "wisdom":  22,
                                        "charisma":  20
                                    },
                         "immunities":  [
                                            "死霊"
                                        ],
                         "resistances":  [

                                         ],
                         "vulnerabilities":  [

                                             ],
                         "basic_attack":  {
                                              "name":  "闇の矢",
                                              "damage":  "5d6+4+知力修正値",
                                              "damage_type":  "死霊",
                                              "bonus":  "知力修正値",
                                              "description":  "闇のエネルギーを放つ。",
                                              "tags":  [
                                                           "主行動",
                                                           "知力基準",
                                                           "遠距離",
                                                           "呪文",
                                                           "知力命中ロール"
                                                       ]
                                          },
                         "unique_trait":  {
                                              "name":  "パワー・ワード：デス",
                                              "description":  "交戦開始時、HPが20%以下の敵に即死を試みる。成功すると自身のHPを回復し、ダンジョン全区域のすべての味方が魂を獲得する。",
                                              "tags":  [
                                                           "魅力基準",
                                                           "範囲",
                                                           "魅力セーヴ"
                                                       ]
                                          },
                         "parts":  {
                                       "main":  [
                                                    {
                                                        "name":  "死の指",
                                                        "control_cost_bonus":  6,
                                                        "stat_bonus":  null,
                                                        "damage":  [
                                                                       {
                                                                           "dice":  "6d10",
                                                                           "bonus":  "知力修正値×2",
                                                                           "damage_type":  "死霊"
                                                                       }
                                                                   ],
                                                        "description":  "対象に死霊ダメージを与え、魂を3スタック獲得する。",
                                                        "tags":  [
                                                                     "主行動",
                                                                     "知力基準",
                                                                     "遠距離",
                                                                     "呪文",
                                                                     "魅力セーヴ"
                                                                 ]
                                                    }
                                                ],
                                       "sub":  [
                                                   {
                                                       "name":  "死霊の波動",
                                                       "control_cost_bonus":  3,
                                                       "stat_bonus":  null,
                                                       "damage":  [
                                                                      {
                                                                          "dice":  "2d8",
                                                                          "damage_type":  "精神"
                                                                      }
                                                                  ],
                                                       "description":  "自身の呪文に2d8の追加精神ダメージを追加する。自身の死霊ダメージが対象の抵抗と免疫を無視する。",
                                                       "tags":  [
                                                                    "判断力基準"
                                                                ]
                                                   },
                                                   {
                                                       "name":  "魂の残響",
                                                       "control_cost_bonus":  3,
                                                       "stat_bonus":  null,
                                                       "description":  "交戦中に誰かが死亡すると、全区域のすべての味方に魂を付与し、自身の次の攻撃が確定クリティカルになる。",
                                                       "tags":  [
                                                                    "範囲"
                                                                ]
                                                   }
                                               ]
                                   },
                         "status_effects":  {
                                                "魂":  {
                                                          "description":  "与える死霊ダメージがスタック数だけ増加する。",
                                                          "max_stacks":  10
                                                      }
                                            }
                     },
                     {
                         "name":  "ナイトウォーカー",
                         "race":  "アンデッド",
                         "rank":  8,
                         "control_cost":  20,
                         "status":  {
                                        "hp":  120,
                                        "ac":  8,
                                        "initiative":  null,
                                        "strength":  22,
                                        "dexterity":  26,
                                        "constitution":  18,
                                        "intelligence":  10,
                                        "wisdom":  12,
                                        "charisma":  14
                                    },
                         "immunities":  [

                                        ],
                         "resistances":  [

                                         ],
                         "vulnerabilities":  [
                                                 "光輝"
                                             ],
                         "basic_attack":  {
                                              "name":  "迅速斬撃",
                                              "damage":  "5d6+4+敏捷力修正値",
                                              "damage_type":  "物理",
                                              "bonus":  "敏捷力修正値",
                                              "description":  "素早く敵を攻撃する。",
                                              "tags":  [
                                                           "主行動",
                                                           "敏捷力基準",
                                                           "近接",
                                                           "敏捷力命中ロール"
                                                       ]
                                          },
                         "unique_trait":  {
                                              "name":  "深淵の帳",
                                              "description":  "交戦開始時、自身と後列の味方を透明化状態にし、透明化状態のすべての味方に影の加護を付与する。",
                                              "tags":  [

                                                       ]
                                          },
                         "parts":  {
                                       "main":  [
                                                    {
                                                        "name":  "形態切断",
                                                        "control_cost_bonus":  6,
                                                        "stat_bonus":  null,
                                                        "damage":  [
                                                                       {
                                                                           "dice":  "4d10",
                                                                           "bonus":  "敏捷力修正値",
                                                                           "damage_type":  "死霊"
                                                                       },
                                                                       {
                                                                           "dice":  "6d8",
                                                                           "bonus":  "判断力修正値",
                                                                           "damage_type":  "精神"
                                                                       }
                                                                   ],
                                                        "description":  "前列の敵を攻撃し、死霊ダメージを与える。自身が隠密状態の場合、さらに精神ダメージを与える。",
                                                        "tags":  [
                                                                     "主行動",
                                                                     "敏捷力基準",
                                                                     "近接",
                                                                     "敏捷力命中ロール"
                                                                 ]
                                                    }
                                                ],
                                       "sub":  [
                                                   {
                                                       "name":  "影の捕食",
                                                       "control_cost_bonus":  3,
                                                       "stat_bonus":  null,
                                                       "description":  "攻撃時、対象に影の捕食スタックを付与する。",
                                                       "tags":  [
                                                                    "呪文",
                                                                    "魅力セーヴ"
                                                                ]
                                                   },
                                                   {
                                                       "name":  "畏怖の一撃",
                                                       "control_cost_bonus":  3,
                                                       "stat_bonus":  null,
                                                       "damage":  [
                                                                      {
                                                                          "dice":  "3d8",
                                                                          "damage_type":  "精神"
                                                                      }
                                                                  ],
                                                       "description":  "クリティカルヒットを与えると、対象に3d8の追加精神ダメージを与え、恐怖状態にする。",
                                                       "tags":  [
                                                                    "判断力基準",
                                                                    "呪文",
                                                                    "判断力セーヴ"
                                                                ]
                                                   }
                                               ]
                                   }
                     }
                 ]
};
