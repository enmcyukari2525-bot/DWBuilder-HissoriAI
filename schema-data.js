(() => {
  const STORAGE_KEY = 'dunwithin-monster-schema-v1';
  const LEGACY_RANK9_IDS = {
    behemoth: 'rank9_01_behemoth',
    nemea: 'rank9_02_nemea',
    enmeria: 'rank9_03_enmeria',
    transcendent: 'rank9_04_transcendent',
    grim_reaper: 'rank9_05_grim_reaper',
    physis: 'rank9_06_physis'
  };
  const STAT_NAMES = {
    str: 'strength',
    dex: 'dexterity',
    con: 'constitution',
    int: 'intelligence',
    wis: 'wisdom',
    cha: 'charisma'
  };
  const RACE_NAMES = {
    beast: '野獣',
    spirit: '精霊',
    undead: 'アンデッド',
    plant: '植物',
    aberration: '異形'
  };
  const DAMAGE_NAMES = {
    physical: '物理',
    fire: '火炎',
    cold: '冷気',
    nature: '自然',
    radiant: '光輝',
    necrotic: '死霊',
    force: '力場',
    psychic: '精神',
    slashing: '斬撃',
    piercing: '刺突',
    bludgeoning: '打撃',
    lightning: '電撃',
    thunder: '雷鳴',
    acid: '酸',
    poison: '毒'
  };
  const STATUS_NAMES = {
    prone: '伏せ状態',
    fear: '恐怖',
    silence: '沈黙',
    restrained: '拘束',
    poison: '毒',
    'custom:即死': '即死'
  };
  const STAT_LABELS = {
    str: '筋力',
    dex: '敏捷力',
    con: '耐久力',
    int: '知力',
    wis: '判断力',
    cha: '魅力'
  };

  let baseSchema = null;
  let schema = null;
  let registry = null;

  function parseStoredSchema() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    if (!parsed || !Array.isArray(parsed.monsters) || !Array.isArray(parsed.parts)) {
      throw new Error('保存されている新スキーマのデータ形式が正しくありません。');
    }
    return parsed;
  }

  async function fetchJson(path) {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`${path}を読み込めませんでした（HTTP ${response.status}）。`);
    }
    return response.json();
  }

  function getCurrentSchema() {
    if (!schema) throw new Error('先にモンスターデータを読み込んでください。');
    return schema;
  }

  function getVersion() {
    const current = getCurrentSchema();
    return `${current.source_dataset_version || current.game_version}-schema-${current.dataset_revision || 'base'}-${current.data_revision || 'base'}`;
  }

  function hasEnglishNameSlug(value) {
    const slug = String(value || '')
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '');
    return /[a-z]/.test(slug);
  }

  function cloneBaseSchema() {
    const fresh = JSON.parse(JSON.stringify(baseSchema));
    fresh.dataset_revision = fresh.dataset_revision || 'base';
    fresh.data_revision = 'base';
    fresh.tags_registry = JSON.parse(JSON.stringify(registry));
    return fresh;
  }

  function getOriginalFields(ability) {
    return ability?.raw?.original_fields && typeof ability.raw.original_fields === 'object'
      ? ability.raw.original_fields
      : {};
  }

  function getLegacyStatId(value) {
    const normalized = String(value || '').toLowerCase();
    const direct = Object.keys(STAT_LABELS).find((key) =>
      key === normalized || STAT_NAMES[key] === normalized || STAT_LABELS[key] === value
    );
    if (direct) return direct;
    const labelMatch = String(value || '').match(/筋力|敏捷力|耐久力|知力|判断力|魅力/);
    return labelMatch
      ? Object.keys(STAT_LABELS).find((key) => STAT_LABELS[key] === labelMatch[0]) || null
      : null;
  }

  function getLegacyDamageTypeId(value) {
    const normalized = String(value || '').trim();
    if (!normalized) return null;
    const entry = Object.entries(DAMAGE_NAMES).find(([id, name]) => id === normalized || name === normalized);
    if (entry) return entry[0];

    const category = registry.damage_type || (registry.damage_type = []);
    const existing = category.find((item) => item.id === `custom:${normalized}` || item.name === normalized);
    if (existing) return existing.id;
    category.push({ id: `custom:${normalized}`, name: normalized, era: 'legacy', unclassified: true });
    return `custom:${normalized}`;
  }

  function parseLegacyDamage(damage, defaultType, defaultBonus) {
    const entries = Array.isArray(damage) ? damage : [damage];
    return entries.filter(Boolean).map((entry) => {
      const record = typeof entry === 'string' ? { dice: entry } : entry;
      let dice = String(record.dice || '');
      let bonusStat = getLegacyStatId(record.bonus || defaultBonus);
      const statSuffix = dice.match(/(?:\+|\s)*(筋力|敏捷力|耐久力|知力|判断力|魅力|strength|dexterity|constitution|intelligence|wisdom|charisma)(?:修正値|修正)?$/i);
      if (statSuffix) {
        bonusStat = bonusStat || getLegacyStatId(statSuffix[1]);
        dice = dice.slice(0, statSuffix.index).replace(/[+\s]+$/, '');
      }

      const damageType = getLegacyDamageTypeId(record.damage_type || defaultType);
      return {
        dice,
        ...(damageType ? { type: damageType } : {}),
        ...(bonusStat ? { bonus_stat: bonusStat } : {})
      };
    });
  }

  function hydrateLegacyStructuredFields(data) {
    registry = data.tags_registry || registry;
    const abilities = [
      ...data.monsters.flatMap((monster) => Object.values(monster.abilities || {})),
      ...data.parts
    ];
    abilities.forEach((ability) => {
      const original = getOriginalFields(ability);
      ability.structured ||= {};
      if (!Object.hasOwn(ability.structured, 'stat_bonus') && original.stat_bonus) {
        ability.structured.stat_bonus = Object.fromEntries(
          Object.entries(original.stat_bonus).map(([key, value]) => [
            getLegacyStatId(key) || key,
            value
          ])
        );
      }
      if (!Object.hasOwn(ability.structured, 'damage') && original.damage) {
        ability.structured.damage = parseLegacyDamage(
          original.damage,
          original.damage_type,
          original.bonus
        );
      }
    });
    data.tags_registry = registry;
    return data;
  }

  function toLegacyDamage(ability) {
    if (Array.isArray(ability?.structured?.damage)) {
      return ability.structured.damage.map((entry) => ({
        dice: entry.dice,
        bonus: entry.bonus_stat ? `${STAT_LABELS[entry.bonus_stat] || entry.bonus_stat}修正値` : undefined,
        damage_type: DAMAGE_NAMES[entry.type] || entry.type
      }));
    }

    const original = getOriginalFields(ability);
    if (original.damage) return Array.isArray(original.damage) ? original.damage : [original.damage];

    return [];
  }

  function toLegacyStatBonus(ability) {
    if (ability?.structured && Object.hasOwn(ability.structured, 'stat_bonus')) {
      const bonuses = ability.structured.stat_bonus || {};
      return Object.fromEntries(Object.entries(bonuses).map(([key, value]) => [STAT_NAMES[key] || key, value]));
    }

    const original = getOriginalFields(ability);
    if (original.stat_bonus) return original.stat_bonus;

    return {};
  }

  function getAbilityTags(ability) {
    return [...new Set([...(ability.raw?.wiki_tags || []), ...(ability.custom_tags || [])])];
  }

  function toLegacyPart(part) {
    return {
      name: part.name,
      control_cost_bonus: part.control_cost_bonus,
      stat_bonus: toLegacyStatBonus(part),
      damage: toLegacyDamage(part),
      description: part.raw?.text || '',
      effects: (part.semantic?.effects || []).map((effect) => effect.label || effect.kind || ''),
      bonuses: getOriginalFields(part).bonuses || [],
      tags: getAbilityTags(part),
      structured: part.structured,
      semantic: part.semantic
    };
  }

  function toLegacyMonster(monster, allParts) {
    const attack = monster.abilities?.basic_attack || {};
    const trait = monster.abilities?.unique_trait || {};
    const attackFields = getOriginalFields(attack);
    const attackDamage = toLegacyDamage(attack);
    const hasStructuredAttackDamage = Array.isArray(attack.structured?.damage);
    const damageTypes = [...new Set(attackDamage.map((entry) => entry.damage_type).filter(Boolean))];
    const monsterParts = allParts.filter((part) => part.source_monster === monster.id);

    return {
      name: monster.name,
      race: RACE_NAMES[monster.race] || monster.race.replace(/^custom:/, ''),
      rank: monster.rank,
      control_cost: monster.control_cost,
      status: {
        hp: monster.stats.hp,
        ac: monster.stats.ac,
        initiative: monster.stats.initiative,
        strength: monster.stats.str,
        dexterity: monster.stats.dex,
        constitution: monster.stats.con,
        intelligence: monster.stats.int,
        wisdom: monster.stats.wis,
        charisma: monster.stats.cha
      },
      immunities: (monster.immunities || []).map((value) => STATUS_NAMES[value] || DAMAGE_NAMES[value] || value),
      resistances: (monster.resistances || []).map((value) => DAMAGE_NAMES[value] || value),
      vulnerabilities: (monster.vulnerabilities || []).map((value) => DAMAGE_NAMES[value] || value),
      ...(monster.ext?.legacy_status_effects
        ? { status_effects: monster.ext.legacy_status_effects }
        : {}),
      basic_attack: {
        name: attack.name || '基本攻撃',
        damage: hasStructuredAttackDamage
          ? attackDamage.map((entry) => [entry.dice, entry.bonus].filter(Boolean).join(' + ')).join(' / ')
          : attackFields.damage || '',
        damage_type: hasStructuredAttackDamage
          ? damageTypes.join('・')
          : DAMAGE_NAMES[attackFields.damage_type] || attackFields.damage_type || '',
        bonus: hasStructuredAttackDamage
          ? attackDamage.find((entry) => entry.bonus)?.bonus || ''
          : attackFields.bonus || '',
        description: attack.raw?.text || '',
        tags: getAbilityTags(attack),
        structured: attack.structured,
        semantic: attack.semantic
      },
      unique_trait: {
        name: trait.name || '固有特性',
        description: trait.raw?.text || '',
        effects: (trait.semantic?.effects || []).map((effect) => effect.label || effect.kind || ''),
        bonuses: getOriginalFields(trait).bonuses || [],
        tags: getAbilityTags(trait),
        structured: trait.structured,
        semantic: trait.semantic
      },
      parts: {
        main: monsterParts.filter((part) => part.slot === 'M').map(toLegacyPart),
        sub: monsterParts.filter((part) => part.slot === 'S1' || part.slot === 'S2').map(toLegacyPart)
      }
    };
  }

  function toLegacyDataset() {
    const current = getCurrentSchema();
    return toLegacyRankDataset(
      current.monsters.filter((monster) => Number(monster.rank) === 9),
      9
    );
  }

  function toLegacyRankDataset(monsters, rank) {
    const current = getCurrentSchema();
    return {
      source: current.source,
      reference_source: current.reference_source,
      version: current.source_dataset_version || current.game_version,
      rank,
      monsters: monsters.map((monster) => toLegacyMonster(monster, current.parts))
    };
  }

  function configureAppGlobals() {
    const current = getCurrentSchema();
    for (let rank = 5; rank <= 9; rank += 1) {
      window[`RANK${rank}_DATA`] = toLegacyRankDataset(
        current.monsters.filter((monster) => Number(monster.rank) === rank),
        rank
      );
    }
    window.MONSTER_DATA_VERSION = getVersion();
    window.mergeMonsterData = (data) => {
      const base = data && Array.isArray(data.monsters) ? data : { monsters: [] };
      if (base.monsterDataVersion === window.MONSTER_DATA_VERSION) return base;

      const replacementMonsters = current.monsters.map((monster) =>
        toLegacyMonster(monster, current.parts)
      );
      return {
        ...base,
        source: current.source,
        version: current.source_dataset_version || current.game_version,
        monsterDataVersion: window.MONSTER_DATA_VERSION,
        monsters: [
          ...replacementMonsters,
          ...base.monsters.filter((monster) => ![5, 6, 7, 8, 9].includes(Number(monster.rank)))
        ]
      };
    };
  }

  function validateSchema(data) {
    if (!data || !Array.isArray(data.monsters) || !Array.isArray(data.parts)) {
      throw new Error('monsters配列とparts配列を含む新スキーマJSONを指定してください。');
    }

    const monsterIds = new Set();
    data.monsters.forEach((monster, index) => {
      if (!monster || typeof monster.id !== 'string' || !monster.id.trim()
        || typeof monster.name !== 'string' || !monster.name.trim()
        || (/^rank\d+_\d{2,}_[a-z0-9]+(?:_[a-z0-9]+)*$/.test(monster.id)
          && (typeof monster.name_en !== 'string' || !monster.name_en.trim()))
        || (monster.ext?.id_scheme_version === 'ranked-english-v1'
          && !hasEnglishNameSlug(monster.name_en))
        || typeof monster.race !== 'string' || !monster.race.trim()
        || !Number.isInteger(Number(monster.rank)) || Number(monster.rank) < 1 || !monster.stats
        || !monster.game_version || !monster.source
        || !monster.abilities?.basic_attack || !monster.abilities?.unique_trait) {
        throw new Error(`${index + 1}件目のモンスターに必須項目がありません。`);
      }
      if (monsterIds.has(monster.id)) throw new Error(`モンスターIDが重複しています：${monster.id}`);
      monsterIds.add(monster.id);
    });

    const abilityIds = new Set();
    data.monsters.forEach((monster) => {
      Object.values(monster.abilities).forEach((ability) => {
        validateAbility(ability, abilityIds);
        if (ability.source_monster !== monster.id) {
          throw new Error(`${ability.id}のsource_monsterが所属モンスターと一致しません。`);
        }
      });
    });

    data.parts.forEach((part) => {
      validateAbility(part, abilityIds);
      if (part.kind !== 'part' || !['M', 'S1', 'S2'].includes(part.slot)) {
        throw new Error(`${part.id || 'パーツ'}のkindまたはslotが正しくありません。`);
      }
      if (!monsterIds.has(part.source_monster)) {
        throw new Error(`${part.id}のsource_monsterがmonstersにありません。`);
      }
    });
    return data;
  }

  function validateAbility(ability, ids) {
    if (!ability || typeof ability.id !== 'string' || !ability.id.trim()
      || typeof ability.name !== 'string' || !ability.name.trim()
      || !ability.game_version || !ability.confidence
      || !ability.raw || typeof ability.raw.text !== 'string' || !ability.raw.source) {
      throw new Error(`${ability?.id || '能力'}に必須のraw・出典・版情報がありません。`);
    }
    if (ability.custom_tags !== undefined
      && (!Array.isArray(ability.custom_tags) || ability.custom_tags.some((tag) => typeof tag !== 'string'))) {
      throw new Error(`${ability.id}のカスタムタグは文字列の配列で入力してください。`);
    }
    if (ids.has(ability.id)) throw new Error(`能力IDが重複しています：${ability.id}`);
    ids.add(ability.id);
  }

  async function initialize() {
    if (schema) return schema;
    [baseSchema, registry] = await Promise.all([
      fetchJson('data/monsters.json'),
      fetchJson('data/tags_registry.json')
    ]);
    const partsDocument = await fetchJson('data/parts.json');
    baseSchema.parts = partsDocument.parts;
    baseSchema.dataset_revision = baseSchema.dataset_revision || partsDocument.dataset_revision;
    hydrateLegacyStructuredFields(baseSchema);
    const storedSchema = parseStoredSchema();
    schema = storedSchema ? mergeStoredSchema(storedSchema) : {
      ...cloneBaseSchema()
    };
    schema.tags_registry = schema.tags_registry || registry;
    hydrateLegacyStructuredFields(schema);
    validateSchema(schema);
    configureAppGlobals();
    return schema;
  }

  function reload() {
    const storedSchema = parseStoredSchema();
    schema = storedSchema ? mergeStoredSchema(storedSchema) : {
      ...cloneBaseSchema()
    };
    hydrateLegacyStructuredFields(schema);
    registry = schema.tags_registry || registry;
    validateSchema(schema);
    configureAppGlobals();
    return schema;
  }

  function mergeStoredSchema(stored) {
    stored = migrateStoredIds(stored);
    const datasetRevision = baseSchema.dataset_revision || 'base';
    if (stored.dataset_revision === datasetRevision) return stored;

    function mergeById(baseItems, storedItems) {
      const storedById = new Map(storedItems.map((item) => [item.id, item]));
      const baseIds = new Set(baseItems.map((item) => item.id));
      return [
        ...baseItems.map((item) => storedById.get(item.id) || JSON.parse(JSON.stringify(item))),
        ...storedItems.filter((item) => !baseIds.has(item.id))
      ];
    }

    return {
      ...baseSchema,
      ...stored,
      dataset_revision: datasetRevision,
      monsters: mergeById(baseSchema.monsters, stored.monsters),
      parts: mergeById(baseSchema.parts, stored.parts)
    };
  }

  function migrateStoredIds(stored) {
    const baseById = new Map(baseSchema.monsters.map((monster) => [monster.id, monster]));
    const legacyIds = new Map(Object.entries(LEGACY_RANK9_IDS));
    baseSchema.monsters.forEach((monster) => {
      const match = monster.id.match(/^rank(\d+)_(\d{2,})_/);
      if (match) {
        legacyIds.set(`rank${match[1]}_monster_${match[2]}`, monster.id);
      }
    });

    const idMap = new Map();
    stored.monsters.forEach((monster) => {
      const mappedId = legacyIds.get(monster.id) || (baseById.has(monster.id) ? monster.id : null);
      if (mappedId) {
        idMap.set(monster.id, mappedId);
        if (!monster.name_en) monster.name_en = baseById.get(mappedId)?.name_en || '';
      } else {
        idMap.set(monster.id, monster.id);
      }
    });

    const monsters = stored.monsters.map((monster) => {
      const previousId = monster.id;
      const nextId = idMap.get(previousId);
      if (previousId === nextId) return monster;
      monster.id = nextId;
      Object.values(monster.abilities || {}).forEach((ability) => {
        ability.id = `${nextId}_${ability.kind}`;
        ability.source_monster = nextId;
      });
      return monster;
    });
    const parts = stored.parts.map((part) => {
      const nextSourceId = idMap.get(part.source_monster);
      if (!nextSourceId || nextSourceId === part.source_monster) return part;
      part.source_monster = nextSourceId;
      part.id = `${nextSourceId}_${part.slot}`;
      return part;
    });

    return { ...stored, monsters, parts };
  }

  function save(data) {
    validateSchema(data);
    schema = {
      ...data,
      data_revision: new Date().toISOString(),
      tags_registry: data.tags_registry || registry
    };
    registry = schema.tags_registry;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(schema));
    configureAppGlobals();
    return schema;
  }

  window.MonsterSchema = {
    storageKey: STORAGE_KEY,
    initialize,
    reload,
    prepare(data) {
      return hydrateLegacyStructuredFields(data);
    },
    save,
    validate: validateSchema,
    get schema() {
      return getCurrentSchema();
    },
    get registry() {
      return registry;
    },
    get version() {
      return getVersion();
    },
    toLegacyDataset
  };
})();
