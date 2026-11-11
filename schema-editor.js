const schema = window.MonsterSchema.schema;
const initialRegistry = window.MonsterSchema.registry;
let selectedMonsterId = schema.monsters[0]?.id || null;
let dirty = false;
const newMonsterIds = new Set();

const form = document.getElementById('monster-schema-form');
const list = document.getElementById('monster-list');
const status = document.getElementById('data-transfer-status');

const stats = [
  ['hp', 'HP'], ['ac', 'AC'], ['initiative', 'Initiative'],
  ['str', '筋力'], ['dex', '敏捷力'], ['con', '耐久力'],
  ['int', '知力'], ['wis', '判断力'], ['cha', '魅力']
];

function currentMonster() {
  return schema.monsters.find((monster) => monster.id === selectedMonsterId) || null;
}

function englishNameSlug(value) {
  const slug = String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
  return /[a-z]/.test(slug) ? slug : '';
}

function generateMonsterId(rank, nameEn, excludedId = '') {
  const slug = englishNameSlug(nameEn);
  if (!slug) return '';
  const prefix = `rank${Number(rank)}_`;
  const maxSequence = schema.monsters.reduce((max, monster) => {
    if (monster.id === excludedId) return max;
    const match = monster.id.match(new RegExp(`^rank${Number(rank)}_(\\d+)_`));
    return match ? Math.max(max, Number(match[1])) : max;
  }, 0);
  return `${prefix}${String(maxSequence + 1).padStart(2, '0')}_${slug}`;
}

function updateDraftMonsterId(monster) {
  if (!newMonsterIds.has(monster.id)) return;
  const nextId = generateMonsterId(monster.rank, monster.name_en, monster.id);
  if (!nextId) {
    setStatus('IDに使用できる英語名を入力してください。', true);
    return;
  }
  if (schema.monsters.some((entry) => entry !== monster && entry.id === nextId)) {
    setStatus(`生成したIDが既存IDと重複しています：${nextId}`, true);
    return;
  }
  const previousId = monster.id;
  if (nextId === previousId) return;
  monster.id = nextId;
  Object.values(monster.abilities).forEach((ability) => {
    ability.id = `${nextId}_${ability.kind}`;
    ability.source_monster = nextId;
  });
  schema.parts.filter((part) => part.source_monster === previousId).forEach((part) => {
    part.source_monster = nextId;
    part.id = `${nextId}_${part.slot}`;
  });
  newMonsterIds.delete(previousId);
  newMonsterIds.add(nextId);
  if (selectedMonsterId === previousId) selectedMonsterId = nextId;
  const monsterIdInput = form.querySelector('.schema-monster-id-field input');
  if (monsterIdInput) monsterIdInput.value = nextId;
  form.querySelectorAll('.schema-ability-id-field input').forEach((input, index) => {
    const ability = Object.values(monster.abilities)[index];
    if (ability) input.value = ability.id;
  });
  markDirty();
  renderList();
}

function setStatus(message, isError = false) {
  status.textContent = message;
  status.classList.toggle('error', isError);
}

function markDirty() {
  dirty = true;
  setStatus('未保存の変更があります。');
}

function markStructuredDirty(ability) {
  const field = [...form.querySelectorAll('.schema-advanced-details label')]
    .find((label) => label.querySelector('textarea')?.dataset.abilityId === ability.id
      && label.querySelector('textarea')?.dataset.jsonKey === 'structured');
  const control = field?.querySelector('textarea');
  if (control && !control.classList.contains('invalid')) {
    control.value = JSON.stringify(ability.structured, null, 2);
  }
  markDirty();
}

function currentRegistry() {
  return schema.tags_registry || initialRegistry;
}

function vocabularyEntries(categories) {
  const entries = [];
  const ids = new Set();
  categories.forEach((category) => {
    (currentRegistry()[category] || []).forEach((entry) => {
      if (!entry || typeof entry.id !== 'string' || ids.has(entry.id)) return;
      entries.push(entry);
      ids.add(entry.id);
    });
  });
  return entries;
}

function vocabularyEntry(categories, value) {
  return vocabularyEntries(categories).find((entry) => entry.id === value || entry.name === value);
}

function vocabularyLabel(categories, value) {
  const entry = vocabularyEntry(categories, value);
  return entry?.name || String(value || '').replace(/^custom:/, '');
}

function addVocabularyEntry(category, name) {
  const label = name.trim();
  if (!label) return null;
  const existing = vocabularyEntry([category], label);
  if (existing) return existing.id;

  const registry = currentRegistry();
  const entries = registry[category] || (registry[category] = []);
  const id = `custom:${label}`;
  const matchingId = entries.find((entry) => entry.id === id);
  if (matchingId) return matchingId.id;
  entries.push({ id, name: label, unclassified: true });
  schema.tags_registry = registry;
  return id;
}

function makeVocabularyControl(labelText, categories, value, onChange, options = {}) {
  const label = makeElement('label', options.fullWidth ? 'schema-field full-width' : 'schema-field');
  label.appendChild(makeElement('span', '', labelText));
  const entries = vocabularyEntries(categories);
  const currentValues = options.multiple
    ? [...new Set((value || []).map((currentValue) =>
      vocabularyEntry(categories, currentValue)?.id || currentValue
    ))]
    : value ? [value] : [];
  currentValues.forEach((currentValue) => {
    if (entries.some((entry) => entry.id === currentValue)) return;
    const knownName = entries.find((entry) => entry.name === currentValue);
    if (knownName) return;
    entries.push({ id: currentValue, name: vocabularyLabel(categories, currentValue), unclassified: true });
  });

  const select = document.createElement('select');
  function refreshOptions(selectedValue) {
    entries.splice(0, entries.length, ...vocabularyEntries(categories));
    if (options.multiple) {
      const prompt = document.createElement('option');
      prompt.value = '';
      prompt.textContent = '登録済みの項目を選択';
      select.replaceChildren(prompt);
    } else {
      select.replaceChildren();
    }
    entries.forEach((entry) => {
      const option = document.createElement('option');
      option.value = entry.id;
      option.textContent = entry.name;
      select.appendChild(option);
    });
    if (!options.multiple && selectedValue && !entries.some((entry) => entry.id === selectedValue)) {
      const custom = document.createElement('option');
      custom.value = selectedValue;
      custom.textContent = vocabularyLabel(categories, selectedValue);
      select.appendChild(custom);
    }
    if (selectedValue) select.value = selectedValue;
  }
  refreshOptions(options.multiple ? '' : vocabularyEntry(categories, value)?.id || value || '');

  const controlRow = makeElement('div', 'schema-vocabulary-row');
  if (!options.multiple) {
    const selectedEntry = vocabularyEntry(categories, value);
    select.value = selectedEntry?.id || value || '';
    select.addEventListener('change', () => {
      if (select.value) onChange(select.value);
    });
    controlRow.appendChild(select);
  } else {
    const addButton = makeElement('button', 'ghost-btn small-btn', '追加');
    addButton.type = 'button';
    addButton.addEventListener('click', () => {
      if (!select.value) return;
      const selectedEntry = entries.find((entry) => entry.id === select.value);
      const selectedId = selectedEntry?.name && vocabularyEntry(categories, selectedEntry.name)
        ? vocabularyEntry(categories, selectedEntry.name).id
        : select.value;
      if (currentValues.includes(selectedId)) return;
      currentValues.push(selectedId);
      onChange([...currentValues]);
      renderSelectedValues();
      markDirty();
    });
    controlRow.append(select, addButton);
  }

  const customRow = makeElement('div', 'schema-vocabulary-row schema-vocabulary-custom');
  const customInput = document.createElement('input');
  customInput.type = 'text';
  customInput.placeholder = '新しい項目名を入力';
  customInput.setAttribute('aria-label', `${labelText}の新規項目名`);
  const customButton = makeElement('button', 'ghost-btn small-btn', '新規追加');
  customButton.type = 'button';
  customButton.addEventListener('click', () => {
    const label = customInput.value.trim();
    const id = vocabularyEntry(categories, label)?.id
      || addVocabularyEntry(categories[categories.length - 1], label);
    if (!id) return;
    if (options.multiple) {
      if (!currentValues.includes(id)) currentValues.push(id);
      onChange([...currentValues]);
      renderSelectedValues();
    } else {
      onChange(id);
      refreshOptions(id);
    }
    customInput.value = '';
    markDirty();
  });
  customInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      customButton.click();
    }
  });
  customRow.append(customInput, customButton);

  const selectedValues = makeElement('div', 'schema-vocabulary-values');
  function renderSelectedValues() {
    selectedValues.replaceChildren();
    currentValues.forEach((currentValue, index) => {
      const chip = makeElement('span', 'schema-vocabulary-chip', vocabularyLabel(categories, currentValue));
      const removeButton = makeElement('button', '', '×');
      removeButton.type = 'button';
      removeButton.setAttribute('aria-label', `${vocabularyLabel(categories, currentValue)}を削除`);
      removeButton.addEventListener('click', () => {
        currentValues.splice(index, 1);
        onChange([...currentValues]);
        renderSelectedValues();
        markDirty();
      });
      chip.appendChild(removeButton);
      selectedValues.appendChild(chip);
    });
  }
  if (options.multiple) {
    renderSelectedValues();
    label.append(controlRow, customRow, selectedValues);
  } else {
    label.append(controlRow, customRow);
  }
  return label;
}

function makeElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function makeField(labelText, value, options = {}) {
  const label = makeElement('label', options.fullWidth ? 'schema-field full-width' : 'schema-field');
  label.appendChild(makeElement('span', '', labelText));
  const control = options.multiline ? document.createElement('textarea') : document.createElement('input');
  if (options.multiline) control.rows = options.rows || 3;
  else control.type = options.type || 'text';
  if (options.type === 'number') control.step = 'any';
  control.value = value == null ? '' : String(value);
  if (options.readOnly) control.readOnly = true;
  if (options.placeholder) control.placeholder = options.placeholder;
  if (options.onInput) control.addEventListener('input', () => options.onInput(control.value));
  label.appendChild(control);
  return label;
}

function makeStructuredSelect(labelText, categories, value, onChange, options = {}) {
  const label = makeElement('label', options.fullWidth ? 'schema-field full-width' : 'schema-field');
  label.appendChild(makeElement('span', '', labelText));
  const select = document.createElement('select');
  if (options.allowEmpty) {
    const empty = document.createElement('option');
    empty.value = '';
    empty.textContent = options.emptyLabel || '未設定';
    select.appendChild(empty);
  }
  const entries = vocabularyEntries(categories);
  entries.forEach((entry) => {
    const option = document.createElement('option');
    option.value = entry.id;
    option.textContent = entry.name;
    select.appendChild(option);
  });
  if (value && !entries.some((entry) => entry.id === value)) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = vocabularyLabel(categories, value);
    select.appendChild(option);
  }
  select.value = value || '';
  select.addEventListener('change', () => onChange(select.value));
  label.appendChild(select);
  return label;
}

function renderStructuredEditor(ability) {
  const structured = ability.structured || (ability.structured = {});
  const section = makeElement('section', 'schema-structured-editor');
  section.dataset.abilityId = ability.id;
  section.appendChild(makeElement('h4', '', '計算用データ（structured）'));
  section.appendChild(makeElement(
    'p',
    'muted schema-editor-help',
    'ここで入力した値が計算・一覧連携に使われます。原文や旧データ記録とは別に保存されます。'
  ));

  const fields = makeElement('div', 'schema-structured-grid');
  [
    ['action_type', '行動種別', ['action_type']],
    ['delivery', '攻撃方法', ['delivery']],
    ['base_stat', '基準能力値', ['stat']]
  ].forEach(([key, label, categories]) => {
    fields.appendChild(makeStructuredSelect(label, categories, structured[key], (value) => {
      if (value) structured[key] = value;
      else delete structured[key];
      markStructuredDirty(ability);
    }, { allowEmpty: true }));
  });
  fields.appendChild(makeField('射程・範囲', structured.range || '', {
    placeholder: '例: melee / ranged / 近接',
    onInput: (value) => {
      if (value.trim()) structured.range = value.trim();
      else delete structured.range;
      markStructuredDirty(ability);
    }
  }));
  section.appendChild(fields);

  const statSection = makeElement('div', 'schema-structured-list');
  statSection.appendChild(makeElement('h5', '', '能力値ボーナス'));
  const statRows = makeElement('div', 'schema-structured-rows');
  const statBonuses = structured.stat_bonus || (structured.stat_bonus = {});
  function renderStatRows() {
    statRows.replaceChildren();
    Object.entries(statBonuses).forEach(([stat, value]) => {
      const row = makeElement('div', 'schema-structured-row');
      row.appendChild(makeStructuredSelect('能力値', ['stat'], stat, (nextStat) => {
        if (!nextStat || (nextStat !== stat && Object.hasOwn(statBonuses, nextStat))) return;
        const currentValue = statBonuses[stat];
        delete statBonuses[stat];
        statBonuses[nextStat] = currentValue;
        renderStatRows();
        markStructuredDirty(ability);
      }));
      row.appendChild(makeField('ボーナス値', value, {
        type: 'number',
        onInput: (nextValue) => {
          if (nextValue.trim()) statBonuses[stat] = Number(nextValue);
          else delete statBonuses[stat];
          markStructuredDirty(ability);
        }
      }));
      const remove = makeElement('button', 'remove-btn small-btn', '削除');
      remove.type = 'button';
      remove.addEventListener('click', () => {
        delete statBonuses[stat];
        renderStatRows();
        markStructuredDirty(ability);
      });
      row.appendChild(remove);
      statRows.appendChild(row);
    });
  }
  const addStat = makeElement('button', 'ghost-btn small-btn', '能力値ボーナスを追加');
  addStat.type = 'button';
  addStat.addEventListener('click', () => {
    const abilityStats = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
    const available = abilityStats.map((id) => vocabularyEntry(['stat'], id))
      .find((entry) => entry && !Object.hasOwn(statBonuses, entry.id))
      || vocabularyEntries(['stat']).find((entry) => !Object.hasOwn(statBonuses, entry.id));
    if (!available) {
      setStatus('追加できる能力値がありません。', true);
      return;
    }
    statBonuses[available.id] = 0;
    renderStatRows();
    markStructuredDirty(ability);
  });
  renderStatRows();
  statSection.append(statRows, addStat);
  section.appendChild(statSection);

  const damageSection = makeElement('div', 'schema-structured-list');
  damageSection.appendChild(makeElement('h5', '', 'ダイスダメージ'));
  const damageRows = makeElement('div', 'schema-structured-rows');
  const damages = Array.isArray(structured.damage) ? structured.damage : (structured.damage = []);
  function renderDamageRows() {
    damageRows.replaceChildren();
    damages.forEach((damage, index) => {
      const row = makeElement('div', 'schema-damage-row');
      row.appendChild(makeField('ダイス', damage.dice || '', {
        placeholder: '例: 3d8',
        onInput: (value) => {
          damage.dice = value.trim();
          markStructuredDirty(ability);
        }
      }));
      row.appendChild(makeStructuredSelect('ダメージ属性', ['damage_type'], damage.type, (value) => {
        if (value) damage.type = value;
        else delete damage.type;
        markStructuredDirty(ability);
      }, { allowEmpty: true }));
      row.appendChild(makeStructuredSelect('能力値補正', ['stat'], damage.bonus_stat, (value) => {
        if (value) damage.bonus_stat = value;
        else delete damage.bonus_stat;
        markStructuredDirty(ability);
      }, { allowEmpty: true }));
      const remove = makeElement('button', 'remove-btn small-btn', '削除');
      remove.type = 'button';
      remove.addEventListener('click', () => {
        damages.splice(index, 1);
        renderDamageRows();
        markStructuredDirty(ability);
      });
      row.appendChild(remove);
      damageRows.appendChild(row);
    });
  }
  const addDamage = makeElement('button', 'ghost-btn small-btn', 'ダメージを追加');
  addDamage.type = 'button';
  addDamage.addEventListener('click', () => {
    damages.push({ dice: '', type: '' });
    renderDamageRows();
    markStructuredDirty(ability);
  });
  renderDamageRows();
  damageSection.append(damageRows, addDamage);
  section.appendChild(damageSection);

  const save = structured.save || {};
  const saveSection = makeElement('div', 'schema-structured-list');
  saveSection.appendChild(makeElement('h5', '', 'セーヴ（任意）'));
  const saveFields = makeElement('div', 'schema-structured-grid');
  saveFields.appendChild(makeStructuredSelect('セーヴ能力値', ['stat'], save.stat, (value) => {
    const currentSave = structured.save || {};
    if (value) {
      structured.save = { ...currentSave, stat: value };
    } else {
      delete currentSave.stat;
    }
    markStructuredDirty(ability);
  }, { allowEmpty: true }));
  saveFields.appendChild(makeField('DC計算式', save.dc_formula || '', {
    placeholder: '例: 12+int_mod',
    onInput: (value) => {
      const currentSave = structured.save || {};
      if (value.trim()) structured.save = { ...currentSave, dc_formula: value.trim() };
      else delete currentSave.dc_formula;
      markStructuredDirty(ability);
    }
  }));
  saveSection.appendChild(saveFields);
  section.appendChild(saveSection);
  return section;
}

function makeAdvancedDetails(summaryText, fields) {
  const details = makeElement('details', 'schema-advanced-details');
  details.appendChild(makeElement('summary', '', summaryText));
  fields.forEach((field) => details.appendChild(field));
  return details;
}

function makeJsonField(labelText, object, key, owner) {
  const label = makeField(
    labelText,
    object[key] === undefined ? '' : JSON.stringify(object[key], null, 2),
    { multiline: true, rows: 7, fullWidth: true, placeholder: 'JSONオブジェクト（未設定なら空欄）' }
  );
  const control = label.querySelector('textarea');
  control.classList.add('schema-json-input');
  if (owner?.id) {
    control.dataset.abilityId = owner.id;
    control.dataset.jsonKey = key;
  }
  control.addEventListener('input', () => {
    try {
      if (!control.value.trim()) {
        delete object[key];
      } else {
        const parsed = JSON.parse(control.value);
        if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
          throw new Error('JSONオブジェクトを入力してください。');
        }
        object[key] = parsed;
      }
      control.classList.remove('invalid');
      label.title = '';
      markDirty();
    } catch (error) {
      control.classList.add('invalid');
      label.title = error.message;
      setStatus(`${labelText}: ${error.message}`, true);
    }
  });
  if (key === 'structured' && owner?.id) {
    control.addEventListener('change', () => {
      if (control.classList.contains('invalid')) return;
      const currentEditor = [...form.querySelectorAll('.schema-structured-editor')]
        .find((editor) => editor.dataset.abilityId === owner.id);
      if (currentEditor) currentEditor.replaceWith(renderStructuredEditor(owner));
    });
  }
  return label;
}

function renderList() {
  list.replaceChildren();
  schema.monsters.forEach((monster) => {
    const button = makeElement('button', `monster-list-item${monster.id === selectedMonsterId ? ' selected' : ''}`);
    button.type = 'button';
    button.append(
      makeElement('span', '', monster.name),
      makeElement('small', '', `${vocabularyLabel(['race'], monster.race)} · ${monster.rank}等級`)
    );
    button.addEventListener('click', () => {
      selectedMonsterId = monster.id;
      render();
    });
    list.appendChild(button);
  });
}

function renderAbility(ability, title, monster) {
  const section = makeElement('section', 'editor-section schema-ability');
  section.appendChild(makeElement('h3', '', title));
  const abilityIdField = makeField('能力ID', ability.id, { readOnly: true });
  abilityIdField.classList.add('schema-ability-id-field');
  section.appendChild(abilityIdField);
  section.appendChild(makeField('表示名', ability.name, {
    onInput: (value) => {
      ability.name = value;
      markDirty();
    }
  }));
  const confidenceLabel = makeElement('label', 'schema-field');
  confidenceLabel.appendChild(makeElement('span', '', '確信度'));
  const confidence = document.createElement('select');
  const confidenceOptions = vocabularyEntries(['confidence']);
  confidenceOptions.forEach(({ id, name }) => {
    const option = document.createElement('option');
    option.value = id;
    option.textContent = name;
    confidence.appendChild(option);
  });
  confidence.value = ability.confidence || 'unverified';
  confidence.addEventListener('change', () => {
    ability.confidence = confidence.value;
    markDirty();
  });
  confidenceLabel.appendChild(confidence);
  section.appendChild(confidenceLabel);

  section.appendChild(renderAbilityFields(ability, monster));
  return section;
}

function renderPart(part, monster) {
  const section = makeElement('section', 'editor-section schema-part');
  const heading = makeElement('div', 'schema-part-heading');
  heading.append(
    makeElement('h3', '', `${part.slot}パーツ`),
    makeElement('span', 'schema-record-id', part.id)
  );
  const remove = makeElement('button', 'remove-btn small-btn', '削除');
  remove.type = 'button';
  remove.addEventListener('click', () => {
    schema.parts = schema.parts.filter((entry) => entry.id !== part.id);
    markDirty();
    render();
  });
  heading.appendChild(remove);
  section.appendChild(heading);
  section.appendChild(makeField('パーツ名', part.name, {
    onInput: (value) => {
      part.name = value;
      markDirty();
    }
  }));

  const slotLabel = makeElement('label', 'schema-field');
  slotLabel.appendChild(makeElement('span', '', 'スロット'));
  const slotSelect = document.createElement('select');
  ['M', 'S1', 'S2'].forEach((slot) => {
    const option = document.createElement('option');
    option.value = slot;
    option.textContent = slot;
    slotSelect.appendChild(option);
  });
  slotSelect.value = part.slot;
  slotSelect.addEventListener('change', () => {
    const duplicate = schema.parts.some((entry) =>
      entry !== part && entry.source_monster === monster.id && entry.slot === slotSelect.value
    );
    if (duplicate) {
      slotSelect.value = part.slot;
      setStatus(`このモンスターには${slotSelect.value}パーツが既にあります。`, true);
      return;
    }
    part.slot = slotSelect.value;
    part.id = `${monster.id}_${part.slot}`;
    markDirty();
    render();
  });
  slotLabel.appendChild(slotSelect);
  section.appendChild(slotLabel);

  section.appendChild(makeField('支配力ボーナス', part.control_cost_bonus, {
    type: 'number',
    onInput: (value) => {
      part.control_cost_bonus = Number(value);
      markDirty();
    }
  }));
  const confidenceLabel = makeElement('label', 'schema-field');
  confidenceLabel.appendChild(makeElement('span', '', '確信度'));
  const confidenceSelect = document.createElement('select');
  const confidenceOptions = vocabularyEntries(['confidence']);
  confidenceOptions.forEach(({ id, name }) => {
    const option = document.createElement('option');
    option.value = id;
    option.textContent = name;
    confidenceSelect.appendChild(option);
  });
  confidenceSelect.value = part.confidence || 'unverified';
  confidenceSelect.addEventListener('change', () => {
    part.confidence = confidenceSelect.value;
    markDirty();
  });
  confidenceLabel.appendChild(confidenceSelect);
  section.appendChild(confidenceLabel);
  section.appendChild(renderAbilityFields(part, monster));
  return section;
}

function renderAbilityFields(ability, monster) {
  const wrapper = makeElement('div', 'schema-ability-fields');
  const raw = ability.raw || (ability.raw = { text: '', source: monster.source });
  wrapper.appendChild(makeField('ゲームバージョン', ability.game_version, {
    onInput: (value) => {
      ability.game_version = value;
      markDirty();
    }
  }));
  wrapper.appendChild(makeField('効果テキスト（原文）', raw.text, {
    multiline: true,
    rows: 4,
    fullWidth: true,
    onInput: (value) => {
      raw.text = value;
      markDirty();
    }
  }));
  wrapper.appendChild(makeField('raw.source', raw.source, {
    fullWidth: true,
    onInput: (value) => {
      raw.source = value;
      markDirty();
    }
  }));
  wrapper.appendChild(makeField('タグ（1行に1つ）', (raw.wiki_tags || []).join('\n'), {
    multiline: true,
    rows: 3,
    fullWidth: true,
    onInput: (value) => {
      raw.wiki_tags = value.split(/\r?\n/).map((tag) => tag.trim()).filter(Boolean);
      markDirty();
    }
  }));
  const customTagsField = makeField('カスタムタグ（1行に1つ）', (ability.custom_tags || []).join('\n'), {
    multiline: true,
    rows: 3,
    fullWidth: true,
    onInput: (value) => {
      ability.custom_tags = value.split(/\r?\n/).map((tag) => tag.trim()).filter(Boolean);
      markDirty();
    }
  });
  customTagsField.appendChild(makeElement('small', 'schema-editor-help', '公式タグにない情報で、基準になるものを任意で入力できます。'));
  wrapper.appendChild(customTagsField);
  wrapper.appendChild(renderStructuredEditor(ability));
  const originalFields = raw.original_fields || {};
  const hasLegacyStructuredValues = ['damage', 'stat_bonus', 'control_cost_bonus']
    .some((key) => Object.hasOwn(originalFields, key));
  if (hasLegacyStructuredValues) {
    wrapper.appendChild(makeElement(
      'p',
      'schema-legacy-note full-width',
      '旧データの記録は移行時の控えで、通常入力とは同期しません。計算・一覧連携では上のstructuredを使用します。'
    ));
  }
  wrapper.appendChild(makeAdvancedDetails('詳細データ（JSON）', [
    makeJsonField('旧データの記録（raw.original_fields）', raw, 'original_fields', ability),
    makeJsonField('structured JSON（直接編集）', ability, 'structured', ability),
    makeJsonField('semantic JSON（シナジー用）', ability, 'semantic', ability),
    makeJsonField('ext JSON（拡張データ）', ability, 'ext', ability)
  ]));
  return wrapper;
}

function render() {
  renderList();
  form.replaceChildren();
  const monster = currentMonster();
  if (!monster) {
    form.classList.add('hidden');
    document.getElementById('editor-empty').classList.remove('hidden');
    return;
  }
  document.getElementById('editor-empty').classList.add('hidden');
  form.classList.remove('hidden');

  const identity = makeElement('section', 'editor-section');
  identity.appendChild(makeElement('h3', '', 'モンスター情報'));
  const monsterIdField = makeField('ID', monster.id, { readOnly: true });
  monsterIdField.classList.add('schema-monster-id-field');
  identity.appendChild(monsterIdField);
  identity.appendChild(makeField('名前', monster.name, {
    onInput: (value) => {
      monster.name = value;
      renderList();
      markDirty();
    }
  }));
  identity.appendChild(makeField('英語名', monster.name_en || '', {
    onInput: (value) => {
      monster.name_en = value;
      updateDraftMonsterId(monster);
      markDirty();
    }
  }));
  identity.appendChild(makeVocabularyControl('種族', ['race'], monster.race, (value) => {
    monster.race = value;
    renderList();
    markDirty();
  }));
  identity.appendChild(makeField('等級', monster.rank, {
    type: 'number',
    onInput: (value) => {
      monster.rank = Number(value);
      updateDraftMonsterId(monster);
      renderList();
      markDirty();
    }
  }));
  identity.appendChild(makeField('支配コスト', monster.control_cost, {
    type: 'number',
    onInput: (value) => {
      monster.control_cost = Number(value);
      markDirty();
    }
  }));
  identity.appendChild(makeField('ゲームバージョン', monster.game_version, {
    onInput: (value) => {
      monster.game_version = value;
      markDirty();
    }
  }));
  identity.appendChild(makeField('出典URL', monster.source, {
    fullWidth: true,
    onInput: (value) => {
      monster.source = value;
      markDirty();
    }
  }));
  form.appendChild(identity);

  const statSection = makeElement('section', 'editor-section');
  statSection.appendChild(makeElement('h3', '', 'ステータス'));
  const statGrid = makeElement('div', 'editor-form-grid six-col schema-stat-grid');
  stats.forEach(([key, label]) => {
    statGrid.appendChild(makeField(label, monster.stats[key], {
      type: 'number',
      onInput: (value) => {
        monster.stats[key] = Number(value);
        markDirty();
      }
    }));
  });
  statSection.appendChild(statGrid);
  form.appendChild(statSection);

  const defense = makeElement('section', 'editor-section');
  defense.appendChild(makeElement('h3', '', '耐性・免疫・脆弱'));
  [
    ['immunities', '免疫', ['status', 'damage_type']],
    ['resistances', '耐性', ['damage_type']],
    ['vulnerabilities', '脆弱性', ['damage_type']]
  ].forEach(([key, label, categories]) => {
    defense.appendChild(makeVocabularyControl(label, categories, monster[key] || [], (value) => {
      monster[key] = value;
      markDirty();
    }, { multiple: true }));
  });
  form.appendChild(defense);

  form.appendChild(renderAbility(monster.abilities.basic_attack, '基本攻撃', monster));
  form.appendChild(renderAbility(monster.abilities.unique_trait, '固有特性', monster));

  const partsSection = makeElement('section', 'editor-section');
  const partsHeading = makeElement('div', 'schema-section-heading');
  partsHeading.appendChild(makeElement('h3', '', 'パーツ'));
  const addPartControls = makeElement('div', 'schema-add-actions');
  ['M', 'S1', 'S2'].forEach((slot) => {
    const button = makeElement('button', 'ghost-btn small-btn', `${slot}を追加`);
    button.type = 'button';
    button.addEventListener('click', () => addPart(monster, slot));
    addPartControls.appendChild(button);
  });
  partsHeading.appendChild(addPartControls);
  partsSection.appendChild(partsHeading);
  const monsterParts = schema.parts.filter((part) => part.source_monster === monster.id);
  if (monsterParts.length === 0) partsSection.appendChild(makeElement('p', 'muted', 'パーツはまだありません。'));
  monsterParts.forEach((part) => partsSection.appendChild(renderPart(part, monster)));
  form.appendChild(partsSection);

  const deleteMonster = makeElement('button', 'remove-btn', 'このモンスターを削除');
  deleteMonster.type = 'button';
  deleteMonster.addEventListener('click', removeMonster);
  form.appendChild(deleteMonster);
}

function addPart(monster, slot) {
  if (schema.parts.some((part) => part.source_monster === monster.id && part.slot === slot)) {
    setStatus(`${slot}パーツは既にあります。`, true);
    return;
  }
  schema.parts.push({
    id: `${monster.id}_${slot}`,
    name: `${slot}パーツ`,
    kind: 'part',
    slot,
    source_monster: monster.id,
    control_cost_bonus: 0,
    game_version: monster.game_version,
    confidence: 'unverified',
    raw: { text: '', source: monster.source, wiki_tags: [] },
    ext: {}
  });
  markDirty();
  render();
}

function addMonster(nameEn) {
  if (!englishNameSlug(nameEn)) {
    setStatus('英語名を英字で入力してください。', true);
    return;
  }
  const rank = 9;
  const id = generateMonsterId(rank, nameEn);
  const monster = {
    id,
    name: '新規モンスター',
    name_en: nameEn.trim(),
    race: 'custom:未分類',
    rank,
    control_cost: 0,
    game_version: schema.game_version || '0.5.4',
    source: schema.source || '',
    stats: { hp: 0, ac: 0, initiative: 0, str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 },
    immunities: [],
    resistances: [],
    vulnerabilities: [],
    ext: { id_scheme_version: 'ranked-english-v1' },
    abilities: {
      basic_attack: {
        id: `${id}_basic_attack`, name: '基本攻撃', kind: 'basic_attack',
        source_monster: id, game_version: schema.game_version || '0.5.4', confidence: 'unverified',
        raw: { text: '', source: schema.source || '', wiki_tags: [] }, ext: {}
      },
      unique_trait: {
        id: `${id}_unique_trait`, name: '固有特性', kind: 'unique_trait',
        source_monster: id, game_version: schema.game_version || '0.5.4', confidence: 'unverified',
        raw: { text: '', source: schema.source || '', wiki_tags: [] }, ext: {}
      }
    }
  };
  schema.monsters.push(monster);
  newMonsterIds.add(id);
  selectedMonsterId = id;
  markDirty();
  render();
}

function removeMonster() {
  const monster = currentMonster();
  if (!monster || !window.confirm(`「${monster.name}」とそのパーツを削除しますか？`)) return;
  schema.monsters = schema.monsters.filter((entry) => entry.id !== monster.id);
  schema.parts = schema.parts.filter((part) => part.source_monster !== monster.id);
  selectedMonsterId = schema.monsters[0]?.id || null;
  markDirty();
  render();
}

function save() {
  try {
    if (form.querySelector('.schema-json-input.invalid')) {
      throw new Error('JSON欄の構文エラーを修正してください。');
    }
    window.MonsterSchema.validate(schema);
    window.MonsterSchema.save(schema);
    dirty = false;
    setStatus('新スキーマのモンスターデータを保存しました。');
  } catch (error) {
    setStatus(`保存できませんでした：${error.message}`, true);
  }
}

function exportData(filename = 'dungeon-within-data-v1.json') {
  const data = {
    schema_version: schema.schema_version,
    dataset_revision: schema.dataset_revision,
    game_version: schema.game_version,
    source_dataset_version: schema.source_dataset_version,
    source: schema.source,
    reference_source: schema.reference_source,
    monsters: schema.monsters,
    parts: schema.parts,
    tags_registry: currentRegistry()
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
  setStatus('新スキーマのデータをエクスポートしました。');
}

async function fetchLatestJson(path, cacheBuster) {
  const url = new URL(path, document.baseURI);
  url.searchParams.set('refresh', cacheBuster);
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) throw new Error(`${path}を取得できませんでした（HTTP ${response.status}）。`);
  return response.json();
}

function mergeLatestRegistry(latestRegistry) {
  const merged = JSON.parse(JSON.stringify(latestRegistry));
  Object.entries(currentRegistry()).forEach(([category, entries]) => {
    if (!Array.isArray(entries)) return;
    const target = merged[category] || (merged[category] = []);
    const ids = new Set(target.map((entry) => entry.id));
    entries.forEach((entry) => {
      if (entry?.unclassified && !ids.has(entry.id)) {
        target.push(entry);
        ids.add(entry.id);
      }
    });
  });
  return merged;
}

async function refreshLatestData() {
  const confirmed = window.confirm(
    'サーバー上の最新マスターで等級5〜9のデータを置き換えます。' +
    '同ランクのローカル編集・追加データは置き換わりますが、等級1〜4と独自語彙は保持します。' +
    '続行前に現在の全データをバックアップとしてエクスポートします。'
  );
  if (!confirmed) return;

  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    exportData(`dungeon-within-data-backup-before-update-${timestamp}.json`);
    const backupConfirmed = window.confirm(
      'バックアップのダウンロードを開始しました。ファイルが保存されたことを確認してから続行してください。'
    );
    if (!backupConfirmed) {
      setStatus('更新を中止しました。現在のデータは変更されていません。');
      return;
    }

    const button = document.getElementById('refresh-latest-monster-data');
    button.disabled = true;
    setStatus('サーバーから最新マスターデータを取得しています…');
    const cacheBuster = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const [monstersDocument, partsDocument, latestRegistry] = await Promise.all([
      fetchLatestJson('data/monsters.json', cacheBuster),
      fetchLatestJson('data/parts.json', cacheBuster),
      fetchLatestJson('data/tags_registry.json', cacheBuster)
    ]);

    const latestMonsters = monstersDocument.monsters.filter((monster) =>
      Number(monster.rank) >= 5 && Number(monster.rank) <= 9
    );
    const latestMonsterIds = new Set(latestMonsters.map((monster) => monster.id));
    const latestParts = partsDocument.parts.filter((part) => latestMonsterIds.has(part.source_monster));
    const replacedIds = new Set([
      ...schema.monsters.filter((monster) => Number(monster.rank) >= 5 && Number(monster.rank) <= 9)
        .map((monster) => monster.id),
      ...latestMonsterIds
    ]);
    const updatedSchema = {
      ...schema,
      schema_version: monstersDocument.schema_version || schema.schema_version,
      game_version: monstersDocument.game_version || schema.game_version,
      source_dataset_version: monstersDocument.source_dataset_version || schema.source_dataset_version,
      dataset_revision: monstersDocument.dataset_revision || partsDocument.dataset_revision || schema.dataset_revision,
      source: monstersDocument.source || schema.source,
      reference_source: monstersDocument.reference_source || schema.reference_source,
      tags_registry: mergeLatestRegistry(latestRegistry),
      monsters: [
        ...latestMonsters,
        ...schema.monsters.filter((monster) => !replacedIds.has(monster.id))
      ],
      parts: [
        ...latestParts,
        ...schema.parts.filter((part) => !replacedIds.has(part.source_monster))
      ]
    };

    [5, 6, 7, 8, 9].forEach((rank) => {
      if (!latestMonsters.some((monster) => Number(monster.rank) === rank)) {
        throw new Error(`最新マスターに等級${rank}のモンスターがありません。`);
      }
    });
    window.MonsterSchema.prepare(updatedSchema);
    window.MonsterSchema.validate(updatedSchema);
    const savedSchema = window.MonsterSchema.save(updatedSchema);
    Object.assign(schema, savedSchema);
    selectedMonsterId = schema.monsters.some((monster) => monster.id === selectedMonsterId)
      ? selectedMonsterId
      : schema.monsters[0]?.id || null;
    for (const id of newMonsterIds) {
      if (!schema.monsters.some((monster) => monster.id === id)) newMonsterIds.delete(id);
    }
    dirty = false;
    render();
    setStatus(`更新完了：最新データを反映しました（${latestMonsters.length}体、${latestParts.length}パーツ）。`);
  } catch (error) {
    console.error('Latest schema data refresh failed.', error);
    setStatus(`最新データの反映に失敗しました：${error.message}`, true);
  } finally {
    const button = document.getElementById('refresh-latest-monster-data');
    if (button) button.disabled = false;
  }
}

async function importData(file) {
  try {
    const imported = JSON.parse(await file.text());
    window.MonsterSchema.validate(imported);
    schema.monsters = imported.monsters;
    schema.parts = imported.parts;
    schema.schema_version = imported.schema_version || '1.0';
    schema.dataset_revision = imported.dataset_revision || schema.dataset_revision;
    schema.game_version = imported.game_version || schema.game_version;
    schema.source_dataset_version = imported.source_dataset_version || schema.source_dataset_version;
    schema.source = imported.source || schema.source;
    schema.reference_source = imported.reference_source || schema.reference_source;
    schema.tags_registry = imported.tags_registry || currentRegistry();
    selectedMonsterId = schema.monsters[0]?.id || null;
    window.MonsterSchema.save(schema);
    dirty = false;
    setStatus(`${schema.monsters.length}体、${schema.parts.length}パーツをインポートしました。`);
    render();
  } catch (error) {
    setStatus(`インポートできませんでした：${error.message}`, true);
  }
}

const newMonsterDialog = document.getElementById('new-monster-dialog');
const newMonsterNameInput = document.getElementById('new-monster-english-name');
document.getElementById('add-monster-btn').addEventListener('click', () => {
  newMonsterNameInput.value = '';
  newMonsterDialog.showModal();
  newMonsterNameInput.focus();
});
document.getElementById('cancel-new-monster').addEventListener('click', () => newMonsterDialog.close());
newMonsterNameInput.addEventListener('input', () => newMonsterNameInput.setCustomValidity(''));
document.getElementById('new-monster-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const nameEn = newMonsterNameInput.value.trim();
  if (!englishNameSlug(nameEn)) {
    newMonsterNameInput.setCustomValidity('IDに使用できる英語名を入力してください。');
    newMonsterNameInput.reportValidity();
    return;
  }
  newMonsterNameInput.setCustomValidity('');
  newMonsterDialog.close();
  addMonster(nameEn);
});
document.getElementById('save-monster-data').addEventListener('click', save);
document.getElementById('export-monster-data').addEventListener('click', exportData);
document.getElementById('refresh-latest-monster-data').addEventListener('click', refreshLatestData);
document.getElementById('import-monster-data').addEventListener('click', () => {
  document.getElementById('import-monster-file').click();
});
document.getElementById('import-monster-file').addEventListener('change', async (event) => {
  const [file] = event.currentTarget.files;
  if (file) await importData(file);
  event.currentTarget.value = '';
});
document.getElementById('reset-monster-data').addEventListener('click', () => {
  if (!window.confirm('保存した変更を破棄し、data/内の初期データに戻しますか？')) return;
  localStorage.removeItem(window.MonsterSchema.storageKey);
  window.location.reload();
});
window.addEventListener('beforeunload', (event) => {
  if (!dirty) return;
  event.preventDefault();
  event.returnValue = '';
});

render();
