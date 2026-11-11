# ダンジョンウィズイン パーツビルダー データ仕様書 v1.0

- 作成日: 2026-11-08
- 対象: Dungeon Within (GameCoaster) のモンスター・パーツ構築シミュレーションツール
- 現行ゲームバージョン: v0.7.2 Build 217(2026-11時点)。既存データは v0.5.4(b.187) English wiki 由来
- 本書は人間およびAI(コーディング支援AI含む)が読んで実装できることを目的とする

## 1. 目的とスコープ

モンスターのパーツ構成・シナジーを機械的に判定できるデータ基盤を定義する。

- ステータス集計・支配力計算など確定計算は**構造層**で行う
- 「呪文で発動する効果を持つパーツ × 呪文の主行動」のようなシナジー判定は**意味層**(イベント表現)で行う
- ゲームのバージョン変更(属性統合・計算式変更等)に**データ側の差し替えのみ**で追従できる

## 2. 設計原則

1. **raw層は必須・不変**: 効果文原文・出典URL・ゲームバージョンを必ず保持する。構造化は失敗しても元データから再構築できる
2. **構造化は段階的**: 構造層・意味層のフィールドはすべてオプション。未分類データもビルダー上で検索・装備・支配力計算は可能。「構造化されたものから順に賢くなる」
3. **語彙はレジストリ化**: タグ・イベント・状態名をコードに直書きせず `tags_registry.json` に集約。シナジー判定ルールも `rules.json` にデータとして持つ

## 3. ファイル構成

```
data/
  monsters.json      # モンスター実体(ステータス・耐性・基本攻撃・固有特性)
  parts.json         # パーツ実体(フラット。source_monster で monsters を参照)
  tags_registry.json # 内部語彙(イベント・属性・状態・タグ)の定義集
  version_maps.json  # バージョン間の変換規則(属性統合など)
  rules.json         # シナジー判定ルール(データ駆動)
```

- モンスターIDは `rankX_通番_英語名` 形式(例: `rank9_01_behemoth`)とし、同一ランクの通番は2桁以上の連番とする。新規登録時は英語名を必須入力としてIDを自動生成する
- パーツはモンスターから**独立したフラットなコレクション**とする(他種のパーツを1体に装備するのがビルドの本質のため)。パーツIDは `"{monster_id}_{slot}"` 規約で一意化
- ランク別ファイル(rank5-data.js等)は読み込み時にマージせず、変換スクリプトで parts.json に正規化してから使う

## 4. エンティティモデル

### 4.1 monsters.json の要素

```json
{
  "id": "rank9_01_behemoth",
  "name": "ベヒーモス",
  "name_en": "Behemoth",
  "race": "beast",
  "rank": 9,
  "control_cost": 25,
  "game_version": "0.5.4",
  "source": "https://dungeonwithin.miraheze.org/wiki/Behemoth",
  "stats": { "hp": 180, "ac": 10, "initiative": 1,
             "str": 32, "dex": 14, "con": 30, "int": 8, "wis": 16, "cha": 12 },
  "immunities":  ["prone"],
  "resistances": ["slashing"],
  "vulnerabilities": [],
  "abilities": { "basic_attack": "<ability_id>", "unique_trait": "<ability_id>" }
}
```

- 耐性・免疫・脆弱の値は **tags_registry.json の damage_type/status ID** を使う(旧属性はそのまま legacy ID で格納し、version_maps で現行に変換)
- 能力(基本攻撃・固有特性)は ability オブジェクトとして parts.json と同じ形式で abilities に格納してもよい(実装の簡潔さ優先)

### 4.2 parts.json の要素(ability オブジェクト)

すべての能力(パーツ・基本攻撃・固有特性)は共通の3層構造を持つ。

```json
{
  "id": "rank9_02_nemea_M",
  "name": "天崩地裂",
  "kind": "part",              // part | basic_attack | unique_trait
  "slot": "M",                  // M | S1 | S2 (kind=part のみ)
  "source_monster": "rank9_02_nemea",
  "control_cost_bonus": 8,
  "game_version": "0.5.4",
  "confidence": "manual",       // auto | manual | unverified

  "raw": {
    "text": "対象に強力な力場ダメージを与えて空中へ打ち上げた後…",
    "wiki_tags": ["主行動", "知力基準", "呪文", "遠距離", "敏捷力セーヴ(DC12+知力修正値)"],
    "source": "https://dungeonwithin.miraheze.org/wiki/Nemea"
  },

  "structured": {
    "action_type": "main_action",
    "delivery": "spell",
    "range": "ranged",
    "base_stat": "int",
    "stat_bonus": { "int": 4 },
    "damage": [ { "dice": "6d10", "type": "force", "bonus_stat": "int" },
                { "dice": "4d8",  "type": "bludgeoning", "bonus_stat": "cha" } ],
    "save": { "stat": "dex", "dc_formula": "12+int_mod" }
  },

  "semantic": {
    "emits":    [ { "event": "cast_spell", "caster": "self", "damage_type": ["force"] },
                  { "event": "deal_damage", "damage_type": ["force","bludgeoning"], "scope": "all_enemies" } ],
    "triggers": [],
    "effects":  [ { "kind": "damage", "damage_type": "force", "scope": "target" },
                  { "kind": "damage", "damage_type": "bludgeoning", "scope": "all_enemies" } ]
  },

  "ext": {}
}
```

層の責務:

| 層 | 責務 | 例 |
|---|---|---|
| raw | 事実の保存。翻訳・要約前の原文 | 効果文全文、wikiタグ、URL |
| structured | 数値計算に必要な機械可読フィールド | ダイス、属性、セーブDC、能力値ボーナス |
| semantic | シナジー判定用のイベント表現 | emits / triggers / effects |

## 5. 語彙(tags_registry.json)

すべての列挙値はレジストリの ID を参照する。主要カテゴリ:

- **damage_type**: 現行8種(canonical) `physical / fire / cold / nature / radiant / necrotic / force / psychic` と legacy(v0.5.x) `slashing / piercing / bludgeoning / lightning / thunder / acid / poison`。legacy→canonical の対応は version_maps.json で定義
- **action_type**: `main_action`(主行動) / `reaction`(反応行動) / `passive`(持続効果) / `engagement_start`(交戦開始時) / `turn_start`(ターン開始時) ほか、レジストリに追加可能
- **delivery**: `spell`(呪文) / `melee`(近接) / `ranged`(遠距離) / `weapon`(武器)。※呪文と遠距離は排他ではない(呪文かつ遠距離)なのでタグではなくフラグ集合として持つ
- **target_scope**: `self / target / ally_all / ally_row / enemy_all / enemy_row / enemy_front / adjacent / dungeon`
- **events**(シナジー判定の中核):
  - `cast_spell`(呪文を唱えた) params: `caster`(self/ally/enemy), `damage_type[]`
  - `deal_damage` params: `damage_type[]`, `delivery`
  - `take_damage` params: `damage_type[]`, `source`(attack/spell/status)
  - `receive_critical_hit`, `attack_missed`(攻撃が外れた)
  - `defeat_enemy`(敵撃破時)
  - `heal`(回復した/回復を受けた)
  - `apply_status` params: `status`
  - `engagement_start`, `turn_start`, `invasion_start`(侵攻開始時)
- **effect_kinds**: `damage / apply_status / remove_status / shield / temp_hp / heal / stat_bonus / bonus_damage_pct / cooldown_change / action_grant / save_modifier / dispel`
- **status**(状態異常・バフ): ゲーム内名称(勇猛、侵蝕、開花、伏せ状態 等)をID化。調査報告書§9の約40種を初版として収録

### シナジー判定アルゴリズム(rules.json)

判定は「能力Aの emits × 能力Bの triggers」の照合で行う。

```
synergy(A, B) = ∃ (e ∈ A.semantic.emits, t ∈ B.semantic.triggers):
    e.event == t.event
    AND t の condition(damage_type, caster, scope 等)が e の params を満たす
```

- 照合結果には **specificity スコア**を付け、属性や状態IDまで一致するものを高スコア、イベント名のみ一致を低スコアにする
- ルール自体(どのイベントをどう照合するか、ボーナス判定)は rules.json に宣言的に持つ。例: 「`triggers: cast_spell{caster: ally}` は `emits: cast_spell{caster: self}` と、自分が味方である文脈でマッチする」
- 判定できない(未分類の)能力は「判定不可」として表示し、エラーにしない

## 6. バージョン対応(version_maps.json)

- 属性統合(v0.6.0): slashing/piercing/bludgeoning → physical、lightning/thunder/acid/poison → nature
- 能力値修正値: v0.5.x までは (能力値−10)/2、v0.6.0以降は 能力値4ごとに1 + ダイスダメージ%ボーナス
- 持続時間: v0.6.0で「Nターン」→ 秒単位の独立クールダウンに変更(ツールでは両表記を許可し `duration_turn` / `duration_sec` を区別)
- 敵離脱: 6交戦(v0.5.3以前) → 12交戦(v0.5.4以降)
- 交戦開始時効果: v0.6.0以降は「そのキャラの最初の行動順が来た時」に発動
- 「元素」の定義変化: v0.5.xでは火炎/冷気/電撃等、v0.6.0以降は電撃が自然に統合されるため、元素系シナジー(例: エンメリア「元素調和」)の条件はバージョンごとに解釈が変わる可能性がある。レジストリ側に `elemental_group` を定義しバージョンごとのメンバーリストを持つ

各データは `game_version` を必ず持ち、判定エンジンは対象バージョンを指定して version_maps を適用してから解釈する。

## 7. 自由入力・拡張ポリシー

- **列挙値は閉じない**: 未定義の値は `OTHER` または `custom:自由文字列` で許可。バリデーションはエラーではなくレビュー待ちキュー(`unclassified: true`)に入れる
- **extバッグ**: スキーマ外の実験的属性は `ext: {}` に自由格納。運用で定着したものだけ正式フィールドへ昇格(スキーマバージョンを上げてマイグレーション)
- **confidence**: `auto`(スクリプト自動パース) / `manual`(人手確認済) / `unverified`(未確認)。ゲーム画面との照合済みフラグとして使う
- **raw層の効果文は要約しない**: 手持ちrank9データの効果文はEnglish wikiの意訳を含むため、ゲーム内原文での照合後に差し替える

## 8. バリデーション

- JSON Schema(jsonschema等)による必須フィールド・型チェック
- 語彙チェック: structured/semantic の ID が tags_registry.json に存在するか(存在しない場合は custom: プレフィックス必須)
- 整合性チェック: dice表記の正規表現、damage_type が game_version で有効な属性か

## 9. ロードマップ

1. tags_registry.json / version_maps.json 初版確定(本リポジトリに同梱)
2. rank9データのゲーム画面照合(照合一覧を使用) → 修正を parts.json/monsters.json に反映
3. rank5〜8データの変換スクリプト(rankN-data.js → 本スキーマ)
4. シナジー判定エンジン(rules.json 読み込み型)の実装
5. ビルダーUIとの接続

## 10. 関連ファイル

- `tags_registry.json` — 内部語彙レジストリ初版
- `version_maps.json` — バージョン間変換規則初版
- `rank9_照合一覧.md` — 手持ちrank9データの画面照合用一覧
- `dungeon_within_spec_research.md` — ゲーム仕様調査報告(ルールブック下書き第2版)
