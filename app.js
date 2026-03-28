// ─── Constants ───
let SLOT_WIDTH = 40;
const MIN_SLOT_WIDTH = 36;
const MAX_SLOT_WIDTH = 70;

const COMPONENT_DEFS = {
    hauptschalter:  { i18n: 'defHauptschalter3', size: 3, color: '#555555', symbol: '\u23FB',  defaultAmps: 63, char: '',  isKlemme: false, poles: ['L1','L2','L3'] },
    hauptschalter2: { i18n: 'defHauptschalter2', size: 2, color: '#666666', symbol: '\u23FB',  defaultAmps: 40, char: '',  isKlemme: false, poles: ['L','N'] },
    rcd_small:      { i18n: 'defRcd2',           size: 2, color: '#2980b9', symbol: '\u25C8',  defaultAmps: 25, char: '',  isKlemme: false, poles: ['L','N'] },
    rcd_large:      { i18n: 'defRcd4',           size: 4, color: '#8e44ad', symbol: '\u25C8',  defaultAmps: 40, char: '',  isKlemme: false, poles: ['L1','L2','L3','N'] },
    mcb_1p:         { i18n: 'defMcb1',           size: 1, color: '#27ae60', symbol: '\u26A1', defaultAmps: 16, char: 'B', isKlemme: false, poles: ['L'] },
    mcb_3p:         { i18n: 'defMcb3',           size: 3, color: '#e67e22', symbol: '\u26A1', defaultAmps: 16, char: 'B', isKlemme: false, poles: ['L1','L2','L3'] },
    rcbo:           { i18n: 'defRcbo',           size: 2, color: '#16a085', symbol: '\u25C8\u26A1', defaultAmps: 16, char: 'B', isKlemme: false, poles: ['L','N'] },
    klemme_n:       { i18n: 'defKlemmeN',        size: 1, color: '#2980b9', symbol: '\u25AA',  defaultAmps: 0,  char: '',  isKlemme: true,  klemmen: 4,  poles: ['N'] },
    klemme_pe:      { i18n: 'defKlemmePE',       size: 1, color: '#27ae60', symbol: '\u25AA',  defaultAmps: 0,  char: '',  isKlemme: true,  klemmen: 4,  poles: ['PE'] },
    klemme_l:       { i18n: 'defKlemmeL',        size: 1, color: '#c0392b', symbol: '\u25AA',  defaultAmps: 0,  char: '',  isKlemme: true,  klemmen: 4,  poles: ['L'] },
    klemme_block_4: { i18n: 'defKlemmeBlock4',   size: 2, color: '#34495e', symbol: '\u25A6',  defaultAmps: 0,  char: '',  isKlemme: true,  klemmen: 4,  poles: ['1','2','3','4'] },
    klemme_block_8: { i18n: 'defKlemmeBlock8',   size: 4, color: '#2c3e50', symbol: '\u25A6',  defaultAmps: 0,  char: '',  isKlemme: true,  klemmen: 8,  poles: ['1','2','3','4','5','6','7','8'] },
    klemme_block_12:{ i18n: 'defKlemmeBlock12',  size: 6, color: '#1a252f', symbol: '\u25A6',  defaultAmps: 0,  char: '',  isKlemme: true,  klemmen: 12, poles: ['1','2','3','4','5','6','7','8','9','10','11','12'] },
    spd:            { i18n: 'defSpd',            size: 3, color: '#f39c12', symbol: '\u26A1', defaultAmps: 0,  char: '',  isKlemme: false, poles: ['L1','L2','L3'] },
    afdd:           { i18n: 'defAfdd',           size: 2, color: '#d35400', symbol: '\u2622',  defaultAmps: 16, char: 'B', isKlemme: false, poles: ['L','N'] },
    relais:         { i18n: 'defRelais',         size: 1, color: '#1e8449', symbol: 'R',       defaultAmps: 16, char: '',  isKlemme: false, poles: ['L'] },
    zeitschaltuhr:  { i18n: 'defTimer',          size: 2, color: '#117864', symbol: '\u23F2',  defaultAmps: 16, char: '',  isKlemme: false, poles: ['L','N'] },
    steckdose:      { i18n: 'defSocket',         size: 3, color: '#2e4053', symbol: '\u23E6',  defaultAmps: 16, char: '',  isKlemme: false, poles: ['L','N','PE'] },
    trennklemme:    { i18n: 'defDisconnect',     size: 1, color: '#616a6b', symbol: 'T',       defaultAmps: 0,  char: '',  isKlemme: false, poles: ['1'] },
    frei:           { i18n: 'defFree',           size: 1, color: '#7f8c8d', symbol: '\u2731',  defaultAmps: 0,  char: '',  isKlemme: false, poles: ['1'], isFrei: true },
    blank:          { i18n: 'defBlank',          size: 1, color: '#95a5a6', symbol: '\u2014',  defaultAmps: 0,  char: '',  isKlemme: false, poles: [] },
};

// Helper: get translated component name
function defName(def) { return t(def.i18n); }

const CABLE_TYPES = [
    'NYM-J 3x1,5', 'NYM-J 3x2,5', 'NYM-J 5x1,5', 'NYM-J 5x2,5',
    'NYM-J 5x4', 'NYM-J 5x6', 'NYM-J 5x10', 'NYM-J 5x16',
    'NYY-J 5x6', 'NYY-J 5x10', 'NYY-J 5x16',
    'H07V-U 1x1,5', 'H07V-U 1x2,5', 'H05VV-F 3x1,5', 'H05VV-F 3x2,5',
];

// ─── State ───
// panels: array of { id, name, slotsPerRow, rowCount }
let panels = [{ id: 1, name: t('defaultPanel'), slotsPerRow: 18, rowCount: 3, hasNSchiene: true, hasPESchiene: true, schieneAnschluesse: 7 }];
let components = []; // { id, type, panelId, row, slot, label, amps, char, wireColor, klemmen }
let wires = [];
let nextId = 2; // 1 is used by default panel
let selectedId = null;
let wiringMode = false;
let wiringStart = null;
let contextTarget = null;
let dragMoveId = null;
let abgaenge = [];
let projectName = t('newProject');

// ─── Init ───
async function init() {
    loadFromStorage();

    // Apply language
    document.getElementById('langSwitcher').value = currentLang;
    applyI18nToHTML();
    buildSettingsRowOptions();
    updateInstructions();

    // Check for URL parameters (shared plan or example)
    const loadedFromURL = await loadFromURL();

    buildAll();
    renderComponents();

    document.querySelectorAll('.component-item').forEach(el => {
        el.addEventListener('dragstart', onSidebarDragStart);
    });

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('click', onDocClick);
    document.addEventListener('contextmenu', onContextMenu);

    // Project name — use event delegation to survive DOM replacement
    const pnEl = document.getElementById('projectName');
    pnEl.textContent = projectName;
    document.title = `${projectName} \u2014 ${t('appTitle')}`;
    document.querySelector('header').addEventListener('dblclick', (e) => {
        const target = e.target.closest('.project-name');
        if (!target) return;
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'project-name-input';
        input.value = projectName;
        input.addEventListener('blur', () => {
            projectName = input.value || t('newProject');
            const span = document.createElement('span');
            span.className = 'project-name';
            span.id = 'projectName';
            span.title = t('dblClickRename');
            span.textContent = projectName;
            input.replaceWith(span);
            document.title = `${projectName} \u2014 ${t('appTitle')}`;
            saveToStorage();
        });
        input.addEventListener('keydown', (e) => { if (e.key === 'Enter') input.blur(); });
        target.replaceWith(input);
        input.focus();
        input.select();
    });

    window.addEventListener('resize', () => {
        recalcAllSlotWidths();
        renderComponents();
    });
}

// ─── Build all panels ───
function buildAll() {
    const container = document.getElementById('panelsContainer');
    container.innerHTML = '';

    // HAK
    buildHAK(container);

    // Each panel (Kasten)
    for (const p of panels) {
        buildPanel(container, p);
    }

    // Add-Kasten button
    const addBtn = document.createElement('button');
    addBtn.className = 'add-panel-btn';
    addBtn.textContent = t('addPanel');
    addBtn.addEventListener('click', addPanel);
    container.appendChild(addBtn);

    // Abgaenge
    buildAbgaenge(container);

    recalcAllSlotWidths();
}

function buildPanel(container, p) {
    const panelWrap = document.createElement('div');
    panelWrap.className = 'kasten-wrap';
    panelWrap.dataset.panelId = p.id;

    // Panel header with name + settings
    const header = document.createElement('div');
    header.className = 'kasten-header';
    header.innerHTML = `
        <span class="kasten-name" title="${t('dblClickRename')}">${escHtml(p.name)}</span>
        <span class="kasten-info">${t('panelInfo', {rows: p.rowCount, s: p.rowCount > 1 ? (currentLang === 'de' ? 'n' : 's') : '', slots: p.slotsPerRow})}</span>
        <div class="kasten-actions">
            <button class="kasten-btn" title="${t('settTitle')}" data-action="settings">\u2699</button>
            <button class="kasten-btn kasten-btn-danger" title="${t('btnDelete')}" data-action="delete">\u00D7</button>
        </div>
    `;

    // Name double-click edit — use event delegation on header
    header.addEventListener('dblclick', (e) => {
        const nameEl = e.target.closest('.kasten-name');
        if (!nameEl) return;
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'kasten-name-input';
        input.value = p.name;
        input.addEventListener('blur', () => {
            p.name = input.value || t('kasten');
            const span = document.createElement('span');
            span.className = 'kasten-name';
            span.title = t('dblClickRename');
            span.textContent = p.name;
            input.replaceWith(span);
            saveToStorage();
        });
        input.addEventListener('keydown', (e) => { if (e.key === 'Enter') input.blur(); });
        nameEl.replaceWith(input);
        input.focus();
        input.select();
    });

    // Settings button
    header.querySelector('[data-action="settings"]').addEventListener('click', () => openPanelSettings(p));

    // Delete button
    header.querySelector('[data-action="delete"]').addEventListener('click', () => {
        if (panels.length <= 1) { showToast(t('minOnePanel')); return; }
        if (!confirm(t('confirmDeletePanel', {name: p.name}))) return;
        components = components.filter(c => c.panelId !== p.id);
        panels = panels.filter(pp => pp.id !== p.id);
        cleanupWires();
        buildAll();
        renderComponents();
        saveToStorage();
    });

    panelWrap.appendChild(header);

    // DIN rows
    const rowsDiv = document.createElement('div');
    rowsDiv.className = 'kasten-body';
    rowsDiv.dataset.panelId = p.id;

    for (let r = 0; r < p.rowCount; r++) {
        const row = document.createElement('div');
        row.className = 'din-row';
        row.dataset.panelId = p.id;
        row.dataset.row = r;

        const label = document.createElement('div');
        label.className = 'row-label';
        label.textContent = `${t('row')}${r + 1}`;
        row.appendChild(label);

        const slots = document.createElement('div');
        slots.className = 'row-slots';
        slots.id = `row-${p.id}-${r}`;

        for (let s = 0; s < p.slotsPerRow; s++) {
            const slot = document.createElement('div');
            slot.className = 'slot';
            slot.dataset.panelId = p.id;
            slot.dataset.row = r;
            slot.dataset.slot = s;

            const num = document.createElement('span');
            num.className = 'slot-number';
            num.textContent = s + 1;
            slot.appendChild(num);

            slot.addEventListener('dragover', onSlotDragOver);
            slot.addEventListener('dragleave', onSlotDragLeave);
            slot.addEventListener('drop', onSlotDrop);

            slots.appendChild(slot);
        }

        row.appendChild(slots);
        rowsDiv.appendChild(row);
    }

    // Klemmschienen (PE/N) unter den DIN-Reihen
    if (p.hasNSchiene || p.hasPESchiene) {
        const schienenDiv = document.createElement('div');
        schienenDiv.className = 'schienen-wrap';

        if (p.hasNSchiene) {
            schienenDiv.appendChild(buildSchiene(p, 'N', '#2980b9'));
        }
        if (p.hasPESchiene) {
            schienenDiv.appendChild(buildSchiene(p, 'PE', '#27ae60'));
        }

        rowsDiv.appendChild(schienenDiv);
    }

    panelWrap.appendChild(rowsDiv);
    container.appendChild(panelWrap);
}

function buildSchiene(panel, type, color) {
    const bar = document.createElement('div');
    bar.className = 'schiene-bar';
    bar.style.borderColor = color;

    const label = document.createElement('div');
    label.className = 'schiene-label';
    label.style.background = color;
    label.textContent = type;
    bar.appendChild(label);

    const ports = document.createElement('div');
    ports.className = 'schiene-ports';

    const numPorts = panel.schieneAnschluesse || 7;

    // Eingang
    const inPort = document.createElement('div');
    inPort.className = 'schiene-port schiene-port-in';
    inPort.style.borderColor = color;
    inPort.dataset.comp = `schiene_${panel.id}_${type}`;
    inPort.dataset.side = 'in';
    inPort.title = t('schieneInput', {type});
    inPort.textContent = t('schieneIn');
    const schieneId = `schiene_${panel.id}_${type}`;

    inPort.addEventListener('click', (e) => {
        e.stopPropagation();
        if (wiringMode) onTerminalClick(schieneId, 'in', inPort);
    });
    ports.appendChild(inPort);

    // Separator
    const sep = document.createElement('div');
    sep.className = 'schiene-sep';
    ports.appendChild(sep);

    // Ausgänge
    for (let i = 1; i <= numPorts; i++) {
        const port = document.createElement('div');
        port.className = 'schiene-port';
        port.style.borderColor = color;
        port.dataset.comp = schieneId;
        port.dataset.side = `out_${i}`;
        port.title = t('schieneOutput', {type, n: i});
        port.textContent = i;
        port.addEventListener('click', (e) => {
            e.stopPropagation();
            if (wiringMode) onTerminalClick(schieneId, `out_${i}`, port);
        });
        ports.appendChild(port);
    }

    // Hover for wire display
    bar.addEventListener('mouseenter', () => showWiresForComponent(schieneId));
    bar.addEventListener('mouseleave', () => hideWiresForComponent());

    bar.appendChild(ports);
    return bar;
}

function addPanel() {
    const id = nextId++;
    const p = { id, name: t('newPanel'), slotsPerRow: 9, rowCount: 1, hasNSchiene: false, hasPESchiene: false, schieneAnschluesse: 7 };
    panels.push(p);
    buildAll();
    renderComponents();
    saveToStorage();
    showToast(t('panelAdded'));
}

function openPanelSettings(p) {
    document.getElementById('settPanelId').value = p.id;
    document.getElementById('settPanelName').value = p.name;
    document.getElementById('settRows').value = p.rowCount;
    document.getElementById('settSlots').value = p.slotsPerRow;
    document.getElementById('settNSchiene').checked = !!p.hasNSchiene;
    document.getElementById('settPESchiene').checked = !!p.hasPESchiene;
    document.getElementById('settSchieneAnschl').value = p.schieneAnschluesse || 7;
    document.getElementById('settingsModal').classList.add('open');
}

function closeSettings() {
    document.getElementById('settingsModal').classList.remove('open');
}

function applySettings() {
    const pId = parseInt(document.getElementById('settPanelId').value);
    const p = panels.find(pp => pp.id === pId);
    if (!p) return;

    const newRows = parseInt(document.getElementById('settRows').value);
    const newSlots = parseInt(document.getElementById('settSlots').value);
    const newName = document.getElementById('settPanelName').value || p.name;

    // Remove components that won't fit
    components = components.filter(c => {
        if (c.panelId !== p.id) return true;
        const def = COMPONENT_DEFS[c.type];
        return c.row < newRows && (c.slot + def.size) <= newSlots;
    });
    cleanupWires();

    p.rowCount = newRows;
    p.slotsPerRow = newSlots;
    p.name = newName;
    p.hasNSchiene = document.getElementById('settNSchiene').checked;
    p.hasPESchiene = document.getElementById('settPESchiene').checked;
    p.schieneAnschluesse = parseInt(document.getElementById('settSchieneAnschl').value) || 7;

    buildAll();
    renderComponents();
    saveToStorage();
    closeSettings();
    showToast(t('toastPanelSettings', {name: p.name, rows: newRows, s: newRows > 1 ? (currentLang === 'de' ? 'n' : 's') : '', slots: newSlots}));
}

// ─── Zuleitung ───
// ─── HAK ───
function buildHAK(container) {
    const hak = document.createElement('div');
    hak.className = 'hak-bar';

    const label = document.createElement('div');
    label.className = 'row-label';
    label.textContent = t('hakLabel');
    label.title = t('hakTitle');
    hak.appendChild(label);

    const klemmen = document.createElement('div');
    klemmen.className = 'hak-klemmen';

    const defs = [
        { id: 'L1', label: 'L1', color: '#c0392b' },
        { id: 'L2', label: 'L2', color: '#2c3e50' },
        { id: 'L3', label: 'L3', color: '#8e44ad' },
        { id: 'N',  label: 'N',  color: '#2980b9' },
        { id: 'PE', label: 'PE', color: '#27ae60' },
    ];

    for (const d of defs) {
        const k = document.createElement('div');
        k.className = 'hak-klemme';
        k.style.background = d.color;
        k.innerHTML = `
            <span class="hak-label">${d.label}</span>
            <div class="terminal bottom" data-comp="hak_${d.id}" data-side="bottom"></div>
        `;
        const hakCompId = `hak_${d.id}`;
        k.querySelector('.terminal').addEventListener('click', (e) => {
            e.stopPropagation();
            if (wiringMode) onTerminalClick(hakCompId, 'bottom', e.target);
        });
        k.addEventListener('mouseenter', () => showWiresForComponent(hakCompId));
        k.addEventListener('mouseleave', () => hideWiresForComponent());
        klemmen.appendChild(k);
    }

    hak.appendChild(klemmen);
    container.appendChild(hak);
}

// ─── Abgaenge ───
function buildAbgaenge(container) {
    const wrap = document.createElement('div');
    wrap.className = 'abgaenge-bar';
    wrap.id = 'abgaengeBar';

    const header = document.createElement('div');
    header.className = 'abgaenge-header';
    header.innerHTML = `
        <span class="abgaenge-title">${t('abgaengeTitle')}</span>
        <button class="abgang-add-btn" onclick="addAbgang()">${t('abgaengeAdd')}</button>
    `;
    wrap.appendChild(header);

    const list = document.createElement('div');
    list.className = 'abgaenge-list';
    list.id = 'abgaengeList';

    for (const ab of abgaenge) {
        list.appendChild(createAbgangElement(ab));
    }

    wrap.appendChild(list);
    container.appendChild(wrap);
}

function getAdernFromCable(cableType) {
    if (!cableType) return [{ id: 'L', label: 'L', color: '#c0392b' }];
    // Parse "NYM-J 3x1,5" -> 3 Adern, "5x2,5" -> 5 Adern
    const match = cableType.match(/(\d+)\s*x/);
    const count = match ? parseInt(match[1]) : 1;

    if (count >= 5) {
        return [
            { id: 'L1', label: 'L1', color: '#c0392b' },
            { id: 'L2', label: 'L2', color: '#2c3e50' },
            { id: 'L3', label: 'L3', color: '#8e44ad' },
            { id: 'N',  label: 'N',  color: '#2980b9' },
            { id: 'PE', label: 'PE', color: '#27ae60' },
        ];
    }
    if (count === 4) {
        return [
            { id: 'L1', label: 'L1', color: '#c0392b' },
            { id: 'L2', label: 'L2', color: '#2c3e50' },
            { id: 'L3', label: 'L3', color: '#8e44ad' },
            { id: 'PE', label: 'PE', color: '#27ae60' },
        ];
    }
    if (count === 3) {
        return [
            { id: 'L', label: 'L', color: '#c0392b' },
            { id: 'N', label: 'N', color: '#2980b9' },
            { id: 'PE', label: 'PE', color: '#27ae60' },
        ];
    }
    if (count === 2) {
        return [
            { id: 'L', label: 'L', color: '#c0392b' },
            { id: 'N', label: 'N', color: '#2980b9' },
        ];
    }
    return [{ id: 'L', label: 'L', color: '#c0392b' }];
}

function createAbgangElement(ab) {
    const el = document.createElement('div');
    el.className = 'abgang-item';
    el.dataset.abgangId = ab.id;

    const adern = getAdernFromCable(ab.cableType);
    let adernHtml = '<div class="abgang-adern">';
    for (const ader of adern) {
        adernHtml += `<div class="abgang-ader" data-comp="abg_${ab.id}" data-side="top_${ader.id}" title="${ader.label}" style="border-color:${ader.color};"><span class="abgang-ader-label" style="color:${ader.color};">${ader.label}</span></div>`;
    }
    adernHtml += '</div>';

    el.innerHTML = `
        ${adernHtml}
        <div class="abgang-label-text" title="${t('dblClickRename')}">${escHtml(ab.label)}</div>
        <div class="abgang-detail">${escHtml(ab.cableType || '')}</div>
        <button class="abgang-del" onclick="deleteAbgang(${ab.id})">\u00D7</button>
    `;

    const abgCompId = `abg_${ab.id}`;
    el.querySelectorAll('.abgang-ader').forEach(a => {
        a.addEventListener('click', (e) => {
            e.stopPropagation();
            if (wiringMode) onTerminalClick(abgCompId, a.dataset.side, a);
        });
    });

    // Hover for wire display
    el.addEventListener('mouseenter', () => showWiresForComponent(abgCompId));
    el.addEventListener('mouseleave', () => hideWiresForComponent());

    const labelEl = el.querySelector('.abgang-label-text');
    labelEl.addEventListener('dblclick', () => {
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'abgang-edit-input';
        input.value = ab.label;
        input.addEventListener('blur', () => finishEditAbgang(ab, input));
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') input.blur();
            if (e.key === 'Escape') { input.value = ab.label; input.blur(); }
        });
        labelEl.replaceWith(input);
        input.focus();
        input.select();
    });

    const detailEl = el.querySelector('.abgang-detail');
    attachCableTypeEdit(detailEl, ab);

    return el;
}

function finishEditAbgang(ab, input) {
    ab.label = input.value || t('abgang');
    const newLabel = document.createElement('div');
    newLabel.className = 'abgang-label-text';
    newLabel.title = t('dblClickRename');
    newLabel.textContent = ab.label;
    newLabel.addEventListener('dblclick', () => {
        const inp = document.createElement('input');
        inp.type = 'text';
        inp.className = 'abgang-edit-input';
        inp.value = ab.label;
        inp.addEventListener('blur', () => finishEditAbgang(ab, inp));
        inp.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') inp.blur();
            if (e.key === 'Escape') { inp.value = ab.label; inp.blur(); }
        });
        newLabel.replaceWith(inp);
        inp.focus();
        inp.select();
    });
    input.replaceWith(newLabel);
    saveToStorage();
}

function attachCableTypeEdit(detailEl, ab) {
    detailEl.addEventListener('dblclick', () => openCableSelect(detailEl, ab));
}

function openCableSelect(detailEl, ab) {
    const select = document.createElement('select');
    select.className = 'abgang-edit-input';

    for (const ct of CABLE_TYPES) {
        const opt = document.createElement('option');
        opt.value = ct;
        opt.textContent = ct;
        if (ct === ab.cableType) opt.selected = true;
        select.appendChild(opt);
    }

    const customOpt = document.createElement('option');
    customOpt.value = '__custom__';
    customOpt.textContent = t('cableCustom');
    select.appendChild(customOpt);

    if (ab.cableType && !CABLE_TYPES.includes(ab.cableType)) {
        const curOpt = document.createElement('option');
        curOpt.value = ab.cableType;
        curOpt.textContent = ab.cableType;
        curOpt.selected = true;
        select.insertBefore(curOpt, customOpt);
    }

    select.addEventListener('change', () => {
        if (select.value === '__custom__') {
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'abgang-edit-input';
            input.value = ab.cableType || '';
            input.placeholder = t('cablePh');
            input.addEventListener('blur', () => {
                ab.cableType = input.value || '';
                const newEl = document.createElement('div');
                newEl.className = 'abgang-detail';
                newEl.textContent = ab.cableType;
                attachCableTypeEdit(newEl, ab);
                input.replaceWith(newEl);
                saveToStorage();
            });
            input.addEventListener('keydown', (e) => { if (e.key === 'Enter') input.blur(); });
            select.replaceWith(input);
            input.focus();
        } else {
            ab.cableType = select.value;
            const newEl = document.createElement('div');
            newEl.className = 'abgang-detail';
            newEl.textContent = ab.cableType;
            attachCableTypeEdit(newEl, ab);
            select.replaceWith(newEl);
            saveToStorage();
        }
    });

    select.addEventListener('blur', () => {
        if (select.parentNode) {
            const newEl = document.createElement('div');
            newEl.className = 'abgang-detail';
            newEl.textContent = ab.cableType || '';
            attachCableTypeEdit(newEl, ab);
            select.replaceWith(newEl);
        }
    });

    detailEl.replaceWith(select);
    select.focus();
}

function addAbgang() {
    const colorOptions = ['#c0392b', '#2c3e50', '#8e44ad', '#2980b9', '#27ae60', '#e67e22', '#f39c12', '#1abc9c'];
    const ab = {
        id: nextId++,
        label: t('newAbgang'),
        cableType: 'NYM-J 3x1,5',
        color: colorOptions[abgaenge.length % colorOptions.length],
    };
    abgaenge.push(ab);
    const list = document.getElementById('abgaengeList');
    if (list) {
        const el = createAbgangElement(ab);
        list.appendChild(el);
        // Auto-focus the name field for editing
        const labelEl = el.querySelector('.abgang-label-text');
        if (labelEl) {
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'abgang-edit-input';
            input.value = '';
            input.placeholder = t('abgangNamePh');
            input.addEventListener('blur', () => finishEditAbgang(ab, input));
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') input.blur();
            });
            labelEl.replaceWith(input);
            setTimeout(() => input.focus(), 50);
        }
    }
    saveToStorage();
}

function deleteAbgang(id) {
    abgaenge = abgaenge.filter(a => a.id !== id);
    wires = wires.filter(w => w.from.compId !== `abg_${id}` && w.to.compId !== `abg_${id}`);
    const el = document.querySelector(`.abgang-item[data-abgang-id="${id}"]`);
    if (el) el.remove();
    renderWires();
    saveToStorage();
}

// ─── Slot width calculation (per panel) ───
function recalcAllSlotWidths() {
    const sidebar = document.querySelector('.sidebar');
    const sidebarW = sidebar ? sidebar.offsetWidth : 220;
    const available = window.innerWidth - sidebarW - 80;
    const rowLabelW = 24;
    const kastenPad = 20; // .kasten-body padding
    const panelPad = 40;  // .panel padding
    const usable = available - panelPad;

    // Per-panel slot width
    for (const p of panels) {
        const slotW = Math.floor((usable - rowLabelW - kastenPad) / p.slotsPerRow);
        p._slotWidth = Math.max(MIN_SLOT_WIDTH, slotW);

        // Apply to slots of this panel
        document.querySelectorAll(`.slot[data-panel-id="${p.id}"]`).forEach(s => {
            s.style.width = p._slotWidth + 'px';
        });
    }

    // Global SLOT_WIDTH used for rendering components — will be overridden per component
    SLOT_WIDTH = panels.length ? panels[0]._slotWidth : 40;
}

// ─── Sidebar Drag ───
function onSidebarDragStart(e) {
    const type = e.currentTarget.dataset.type;
    e.dataTransfer.setData('text/plain', type);
    e.dataTransfer.setData('application/x-source', 'sidebar');
    e.dataTransfer.effectAllowed = 'copy';
    dragMoveId = null;
}

// ─── Slot Drag Events ───
function onSlotDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = dragMoveId ? 'move' : 'copy';
    e.currentTarget.classList.add('drag-over');
}

function onSlotDragLeave(e) {
    e.currentTarget.classList.remove('drag-over');
}

function onSlotDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');

    const panelId = parseInt(e.currentTarget.dataset.panelId);
    const row = parseInt(e.currentTarget.dataset.row);
    const slot = parseInt(e.currentTarget.dataset.slot);
    const panel = panels.find(pp => pp.id === panelId);
    if (!panel) return;

    // Move existing component
    if (dragMoveId) {
        const comp = components.find(c => c.id === dragMoveId);
        if (!comp) return;
        const def = COMPONENT_DEFS[comp.type];
        const compSize = def.isFrei ? (comp.freiSize || 1) : def.size;

        const oldPanelId = comp.panelId;
        const oldRow = comp.row;
        const oldSlot = comp.slot;

        // Check if there's a component at the target that we can swap with
        const targetComp = components.find(c =>
            c.id !== comp.id &&
            c.panelId === panelId &&
            c.row === row &&
            slot >= c.slot &&
            slot < c.slot + (COMPONENT_DEFS[c.type].isFrei ? (c.freiSize || 1) : COMPONENT_DEFS[c.type].size)
        );

        if (targetComp) {
            const targetDef = COMPONENT_DEFS[targetComp.type];
            const targetSize = targetDef.isFrei ? (targetComp.freiSize || 1) : targetDef.size;

            if (compSize === targetSize) {
                // Swap positions
                const tPanelId = targetComp.panelId;
                const tRow = targetComp.row;
                const tSlot = targetComp.slot;

                targetComp.panelId = oldPanelId;
                targetComp.row = oldRow;
                targetComp.slot = oldSlot;

                comp.panelId = tPanelId;
                comp.row = tRow;
                comp.slot = tSlot;

                renderComponents();
                saveToStorage();
                showToast(t('toastSwapped'));
                dragMoveId = null;
                return;
            }
        }

        // Normal move
        comp.panelId = -1; // hide for check
        if (canPlace(panelId, row, slot, compSize)) {
            comp.panelId = panelId;
            comp.row = row;
            comp.slot = slot;
            renderComponents();
            saveToStorage();
            showToast(t('toastMoved'));
        } else {
            comp.panelId = oldPanelId;
            comp.row = oldRow;
            comp.slot = oldSlot;
            showToast(t('toastSwapSameSize'));
        }
        dragMoveId = null;
        return;
    }

    // Place new from sidebar
    const type = e.dataTransfer.getData('text/plain');
    if (!type || !COMPONENT_DEFS[type]) return;
    placeComponent(type, panelId, row, slot);
}

// ─── Component Placement ───
function placeComponent(type, panelId, row, slot) {
    const def = COMPONENT_DEFS[type];
    if (!canPlace(panelId, row, slot, def.size)) {
        showToast(t('toastNoSpaceCheck'));
        return null;
    }

    // Auto-Farbe für typisierte Klemmen
    const autoColors = {
        klemme_n: '#2980b9',   // N = blau
        klemme_pe: '#27ae60',  // PE = grün
        klemme_l: '#c0392b',   // L = rot
    };

    const comp = {
        id: nextId++,
        type,
        panelId,
        row,
        slot,
        label: defName(def),
        amps: def.defaultAmps,
        char: def.char,
        wireColor: autoColors[type] || '#c0392b',
        klemmen: def.klemmen || 0,
    };

    // Frei-Element defaults
    if (def.isFrei) {
        comp.freiInputs = '1';
        comp.freiOutputs = '1';
        comp.freiSize = 1;
        comp.freiColor = '#7f8c8d';
    }
    components.push(comp);
    renderComponents();
    saveToStorage();
    return comp;
}

function canPlace(panelId, row, startSlot, size, excludeId) {
    const panel = panels.find(pp => pp.id === panelId);
    if (!panel) return false;
    if (row < 0 || row >= panel.rowCount) return false;
    if (startSlot < 0 || startSlot + size > panel.slotsPerRow) return false;
    for (const c of components) {
        if (excludeId && c.id === excludeId) continue;
        if (c.panelId !== panelId || c.row !== row) continue;
        const cDef = COMPONENT_DEFS[c.type];
        const cSize = cDef.isFrei ? (c.freiSize || 1) : cDef.size;
        const cEnd = c.slot + cSize;
        const newEnd = startSlot + size;
        if (startSlot < cEnd && newEnd > c.slot) return false;
    }
    return true;
}

// ─── Rendering ───
function renderComponents() {
    document.querySelectorAll('.placed-component').forEach(el => el.remove());

    for (const comp of components) {
        const def = COMPONENT_DEFS[comp.type];
        if (!def) continue;
        const rowEl = document.getElementById(`row-${comp.panelId}-${comp.row}`);
        if (!rowEl) continue;

        const panel = panels.find(pp => pp.id === comp.panelId);
        const sw = panel && panel._slotWidth ? panel._slotWidth : SLOT_WIDTH;

        const actualSize = def.isFrei ? (comp.freiSize || 1) : def.size;

        const el = document.createElement('div');
        el.className = 'placed-component' + (comp.id === selectedId ? ' selected' : '');
        el.dataset.id = comp.id;
        el.style.left = (comp.slot * sw) + 'px';
        el.style.width = (actualSize * sw) + 'px';

        // Color logic
        let displayColor;
        if (def.isFrei) {
            displayColor = comp.freiColor || '#7f8c8d';
        } else if (def.isKlemme) {
            displayColor = comp.wireColor || def.color;
        } else {
            displayColor = def.color;
        }
        el.style.background = displayColor;
        el.style.borderColor = darken(displayColor, 20);

        let ratingText = '';
        const safeChar = ['', 'B', 'C', 'D'].includes(comp.char) ? comp.char : '';
        const safeAmps = parseInt(comp.amps) || 0;
        if (safeAmps > 0) {
            ratingText = safeChar ? `${safeChar}${safeAmps}A` : `${safeAmps}A`;
        } else if (def.isKlemme && comp.klemmen) {
            ratingText = `${parseInt(comp.klemmen) || 0}x`;
        }

        // Build terminals based on component type
        let topTerminals = '';
        let bottomTerminals = '';
        let innerHtml = '';

        if (def.isFrei) {
            // Frei-Element: user-defined inputs/outputs
            const inputs = (comp.freiInputs || '').split(',').map(s => s.trim()).filter(Boolean);
            const outputs = (comp.freiOutputs || '').split(',').map(s => s.trim()).filter(Boolean);

            if (inputs.length > 0) {
                topTerminals = '<div class="terminals-row top-row">';
                for (const inp of inputs) {
                    const pid = inp.replace(/\s/g, '');
                    topTerminals += `<div class="terminal-group"><div class="terminal-pole-label">${escHtml(inp)}</div><div class="terminal" data-comp="${comp.id}" data-side="top_${pid}"></div></div>`;
                }
                topTerminals += '</div>';
            }
            if (outputs.length > 0) {
                bottomTerminals = '<div class="terminals-row bottom-row">';
                for (const out of outputs) {
                    const pid = out.replace(/\s/g, '');
                    bottomTerminals += `<div class="terminal-group bottom"><div class="terminal" data-comp="${comp.id}" data-side="bottom_${pid}"></div></div>`;
                }
                bottomTerminals += '</div>';
            }
            innerHtml = `${topTerminals}<div class="comp-label" title="${escHtml(comp.label)}">${escHtml(comp.label)}</div><div class="comp-symbol">${def.symbol}</div>${bottomTerminals}`;

        } else if (def.isKlemme) {
            // Klemmenblock: 1 Eingang oben, N Ausgänge als Raster im Block
            const numOutputs = comp.klemmen || def.klemmen || 4;

            topTerminals = '<div class="terminals-row top-row">';
            topTerminals += `<div class="terminal-group"><div class="terminal-pole-label">IN</div><div class="terminal" data-comp="${comp.id}" data-side="top_in"></div></div>`;
            topTerminals += '</div>';

            let gridHtml = '<div class="klemme-grid">';
            for (let i = 1; i <= numOutputs; i++) {
                gridHtml += `<div class="klemme-port" data-comp="${comp.id}" data-side="bottom_${i}" title="${t('schieneOutput', {type: '', n: i}).trim()}"><span class="klemme-port-num">${i}</span></div>`;
            }
            gridHtml += '</div>';

            innerHtml = `${topTerminals}<div class="comp-label" title="${escHtml(comp.label)}">${escHtml(comp.label)}</div>${gridHtml}`;
        } else {
            // Normale Bauteile: Poles oben + unten
            const poles = def.poles || [];
            if (poles.length > 0) {
                topTerminals = '<div class="terminals-row top-row">';
                bottomTerminals = '<div class="terminals-row bottom-row">';
                for (const pole of poles) {
                    const poleId = pole.replace(/\s/g, '');
                    topTerminals += `<div class="terminal-group"><div class="terminal-pole-label">${pole}</div><div class="terminal" data-comp="${comp.id}" data-side="top_${poleId}"></div></div>`;
                    bottomTerminals += `<div class="terminal-group bottom"><div class="terminal" data-comp="${comp.id}" data-side="bottom_${poleId}"></div></div>`;
                }
                topTerminals += '</div>';
                bottomTerminals += '</div>';
            }
            innerHtml = `${topTerminals}<div class="comp-label" title="${escHtml(comp.label)}">${escHtml(comp.label)}</div><div class="comp-symbol">${def.symbol}</div><div class="comp-rating">${ratingText}</div>${bottomTerminals}`;
        }

        el.innerHTML = innerHtml;

        el.addEventListener('click', (e) => {
            if (e.target.classList.contains('terminal')) return;
            e.stopPropagation();
            selectComponent(comp.id);
        });

        // Hover: show connected wires
        el.addEventListener('mouseenter', () => showWiresForComponent(comp.id));
        el.addEventListener('mouseleave', () => hideWiresForComponent());

        el.querySelectorAll('.terminal, .klemme-port').forEach(t => {
            t.addEventListener('click', (e) => {
                e.stopPropagation();
                if (wiringMode) onTerminalClick(comp.id, t.dataset.side, t);
            });
        });

        el.draggable = true;
        el.addEventListener('dragstart', (e) => {
            dragMoveId = comp.id;
            e.dataTransfer.setData('text/plain', '__move__');
            e.dataTransfer.effectAllowed = 'move';
            el.classList.add('dragging');
        });
        el.addEventListener('dragend', () => {
            el.classList.remove('dragging');
            dragMoveId = null;
        });

        // Accept drops on placed components for swapping
        el.addEventListener('dragover', (e) => {
            if (dragMoveId && dragMoveId !== comp.id) {
                e.preventDefault();
                e.stopPropagation();
                el.style.outline = '2px dashed #e94560';
            }
        });
        el.addEventListener('dragleave', () => {
            el.style.outline = '';
        });
        el.addEventListener('drop', (e) => {
            e.preventDefault();
            e.stopPropagation();
            el.style.outline = '';

            if (!dragMoveId || dragMoveId === comp.id) return;

            const dragComp = components.find(c => c.id === dragMoveId);
            if (!dragComp) return;
            const dragDef = COMPONENT_DEFS[dragComp.type];
            const dragSize = dragDef.isFrei ? (dragComp.freiSize || 1) : dragDef.size;
            const def2 = COMPONENT_DEFS[comp.type];
            const compSize = def2.isFrei ? (comp.freiSize || 1) : def2.size;

            if (dragSize === compSize) {
                // Swap
                const tmp = { panelId: comp.panelId, row: comp.row, slot: comp.slot };
                comp.panelId = dragComp.panelId;
                comp.row = dragComp.row;
                comp.slot = dragComp.slot;
                dragComp.panelId = tmp.panelId;
                dragComp.row = tmp.row;
                dragComp.slot = tmp.slot;
                renderComponents();
                saveToStorage();
                showToast(t('toastSwapped'));
            } else {
                showToast(t('toastSwapSameSize'));
            }
            dragMoveId = null;
        });

        rowEl.appendChild(el);
    }

    renderWires();
    updateSlotStates();
}

function updateSlotStates() {
    document.querySelectorAll('.slot').forEach(s => s.classList.remove('occupied'));
    for (const comp of components) {
        const def = COMPONENT_DEFS[comp.type];
        const size = def.isFrei ? (comp.freiSize || 1) : def.size;
        for (let i = 0; i < size; i++) {
            const slot = document.querySelector(`.slot[data-panel-id="${comp.panelId}"][data-row="${comp.row}"][data-slot="${comp.slot + i}"]`);
            if (slot) slot.classList.add('occupied');
        }
    }
}

let showWireLines = false;
let highlightCompId = null;

function toggleWireDisplay() {
    showWireLines = !showWireLines;
    const btn = document.getElementById('btnWireDisplay');
    btn.textContent = showWireLines ? t('btnWireHover') : t('btnWireMarker');
    const fab = document.getElementById('fabWireDisplay');
    if (fab) fab.classList.toggle('active', showWireLines);
    renderWires();
}

function showWiresForComponent(compId) {
    if (!showWireLines) return;
    highlightCompId = compId;
    drawHighlightWires();
}

function hideWiresForComponent() {
    if (!showWireLines) return;
    highlightCompId = null;
    const svg = document.getElementById('wiresOverlay');
    svg.querySelectorAll('.wire, .wire-label').forEach(el => el.remove());
}

function drawHighlightWires() {
    const svg = document.getElementById('wiresOverlay');
    svg.querySelectorAll('.wire, .wire-label').forEach(el => el.remove());

    if (!highlightCompId) return;

    const panelEl = document.getElementById('panel');
    const panelRect = panelEl.getBoundingClientRect();

    // Find all wires connected to this component
    const relevantWires = wires.filter(w =>
        w.from.compId === highlightCompId || w.to.compId === highlightCompId
    );

    for (const wire of relevantWires) {
        const fromEl = getTerminalElement(wire.from.compId, wire.from.side);
        const toEl = getTerminalElement(wire.to.compId, wire.to.side);
        if (!fromEl || !toEl) continue;

        const fromRect = fromEl.getBoundingClientRect();
        const toRect = toEl.getBoundingClientRect();

        const x1 = fromRect.left + fromRect.width / 2 - panelRect.left;
        const y1 = fromRect.top + fromRect.height / 2 - panelRect.top;
        const x2 = toRect.left + toRect.width / 2 - panelRect.left;
        const y2 = toRect.top + toRect.height / 2 - panelRect.top;

        const midY = (y1 + y2) / 2;

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', `M${x1},${y1} C${x1},${midY} ${x2},${midY} ${x2},${y2}`);
        path.setAttribute('class', 'wire');
        path.setAttribute('stroke', wire.color);

        path.style.pointerEvents = 'stroke';
        path.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            e.stopPropagation();
            wires = wires.filter(w => w.id !== wire.id);
            drawHighlightWires();
            renderWires();
            saveToStorage();
        });

        svg.appendChild(path);

        // Label at the OTHER end (the one we're NOT hovering)
        const isFrom = wire.from.compId === highlightCompId;
        const otherCompId = isFrom ? wire.to.compId : wire.from.compId;
        const otherSide = isFrom ? wire.to.side : wire.from.side;
        const otherLabel = shortenLabel(getTerminalLabel(otherCompId, otherSide));

        // Place label near the other end
        const lx = isFrom ? x2 : x1;
        const ly = isFrom ? y2 : y1;

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', lx);
        text.setAttribute('y', ly - 20);
        text.setAttribute('class', 'wire-label');
        text.setAttribute('fill', wire.color);
        text.setAttribute('text-anchor', 'middle');
        text.textContent = `\u2192 ${otherLabel}`;
        svg.appendChild(text);
    }
}

function renderWires() {
    const svg = document.getElementById('wiresOverlay');
    svg.innerHTML = '';

    // Clear old markers
    document.querySelectorAll('.wire-marker').forEach(el => el.remove());

    if (wires.length === 0) return;

    // Assign wire group IDs: connected terminals share a label
    let wireGroupId = 0;
    const terminalGroups = {}; // key -> groupId
    for (const wire of wires) {
        const fromKey = `${wire.from.compId}::${wire.from.side}`;
        const toKey = `${wire.to.compId}::${wire.to.side}`;
        const existingFrom = terminalGroups[fromKey];
        const existingTo = terminalGroups[toKey];
        if (existingFrom !== undefined && existingTo !== undefined) {
            // merge groups if different
            if (existingFrom !== existingTo) {
                const oldId = existingTo;
                for (const k in terminalGroups) {
                    if (terminalGroups[k] === oldId) terminalGroups[k] = existingFrom;
                }
            }
        } else if (existingFrom !== undefined) {
            terminalGroups[toKey] = existingFrom;
        } else if (existingTo !== undefined) {
            terminalGroups[fromKey] = existingTo;
        } else {
            wireGroupId++;
            terminalGroups[fromKey] = wireGroupId;
            terminalGroups[toKey] = wireGroupId;
        }
    }

    // Build group info: collect labels per group
    const groupInfo = {}; // groupId -> { color, labels: Set }
    for (const wire of wires) {
        const fromKey = `${wire.from.compId}::${wire.from.side}`;
        const gId = terminalGroups[fromKey];
        if (!groupInfo[gId]) groupInfo[gId] = { color: wire.color, labels: new Set() };

        // Readable names for endpoints
        groupInfo[gId].labels.add(getTerminalLabel(wire.from.compId, wire.from.side));
        groupInfo[gId].labels.add(getTerminalLabel(wire.to.compId, wire.to.side));
    }

    // Render markers on each terminal
    for (const [key, gId] of Object.entries(terminalGroups)) {
        const [compId, side] = key.split('::');
        const parsedId = isNaN(compId) ? compId : parseInt(compId);
        const el = getTerminalElement(parsedId, side);
        if (!el) continue;

        const info = groupInfo[gId];
        if (!info) continue;

        // Get other endpoints in this group (not self)
        const selfLabel = getTerminalLabel(parsedId, side);
        const others = [...info.labels].filter(l => l !== selfLabel);
        const tooltip = others.length ? '\u2192 ' + others.join(', ') : '';

        const marker = document.createElement('div');
        marker.className = 'wire-marker';
        marker.style.background = info.color;
        marker.title = tooltip;
        marker.textContent = gId;

        // Right-click on marker to delete associated wires
        marker.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const keysInGroup = Object.entries(terminalGroups)
                .filter(([_, g]) => g === gId)
                .map(([k]) => k);
            wires = wires.filter(w => {
                const fk = `${w.from.compId}::${w.from.side}`;
                const tk = `${w.to.compId}::${w.to.side}`;
                return !keysInGroup.includes(fk) && !keysInGroup.includes(tk);
            });
            renderWires();
            saveToStorage();
        });

        el.style.position = 'relative';
        el.appendChild(marker);
    }

}

function shortenLabel(label) {
    // Remove panel name in parentheses and shorten
    let s = label.replace(/\s*\([^)]*\)\s*/g, '').trim();
    // Remove [Type] prefix for compactness on short display, keep for tooltip
    if (s.length > 25) {
        s = s.replace(/^\[[^\]]*\]\s*/, '');
    }
    if (s.length > 20) {
        s = s.substring(0, 18) + '\u2026';
    }
    return s;
}

function getTerminalLabel(compId, side) {
    // HAK
    if (typeof compId === 'string' && compId.startsWith('hak_')) {
        return 'HAK ' + compId.replace('hak_', '');
    }
    // Schiene
    if (typeof compId === 'string' && compId.startsWith('schiene_')) {
        const parts = compId.split('_'); // schiene_{panelId}_{type}
        const type = parts[2]; // N or PE
        const panel = panels.find(pp => pp.id === parseInt(parts[1]));
        const name = panel ? panel.name : t('kasten');
        return `${t('schieneLabel', {type})} (${name})`;
    }
    // Abgang
    if (typeof compId === 'string' && compId.startsWith('abg_')) {
        const abId = parseInt(compId.replace('abg_', ''));
        const ab = abgaenge.find(a => a.id === abId);
        const name = ab ? ab.label : t('abgang');
        const cable = ab ? ` (${ab.cableType})` : '';
        const ader = side ? side.replace('top_', '') : '';
        return ader ? `[${t('abgang')}] ${name} ${ader}${cable}` : `[${t('abgang')}] ${name}${cable}`;
    }
    // Component
    const comp = components.find(c => c.id === compId);
    if (!comp) return '?';
    const def = COMPONENT_DEFS[comp.type];

    const typeName = t('typeName_' + comp.type) || comp.type;

    // Panel name for context
    const panel = panels.find(pp => pp.id === comp.panelId);
    const panelName = panel ? panel.name : '';

    const polePart = side.replace('top_', '\u2191').replace('bottom_', '\u2193');
    return `[${typeName}] ${comp.label} ${polePart} (${panelName})`;
}

function getTerminalElement(compId, side) {
    return document.querySelector(`.terminal[data-comp="${compId}"][data-side="${side}"], .klemme-port[data-comp="${compId}"][data-side="${side}"], .schiene-port[data-comp="${compId}"][data-side="${side}"], .abgang-ader[data-comp="${compId}"][data-side="${side}"]`);
}

// ─── Selection ───
function selectComponent(id) {
    selectedId = id;
    renderComponents();
    openProps(id);
}

function deselectAll() {
    selectedId = null;
    closeProps();
    renderComponents();
}

// ─── Properties Panel ───
function openProps(id) {
    const comp = components.find(c => c.id === id);
    if (!comp) return;

    const def = COMPONENT_DEFS[comp.type];
    document.getElementById('propsTitle').textContent = defName(def);
    document.getElementById('propName').value = comp.label;
    document.getElementById('propAmps').value = comp.amps;
    document.getElementById('propChar').value = comp.char;
    document.getElementById('propWireColor').value = comp.wireColor;

    const isKlemme = def.isKlemme;
    const isFrei = def.isFrei;

    // Show/hide fields based on type
    const showNormal = !isKlemme && !isFrei;
    document.getElementById('propKlemmenLabel').style.display = isKlemme ? 'block' : 'none';
    document.getElementById('propKlemmen').style.display = isKlemme ? 'block' : 'none';
    document.getElementById('propAmpsLabel').style.display = showNormal ? 'block' : 'none';
    document.getElementById('propAmps').style.display = showNormal ? 'block' : 'none';
    document.getElementById('propCharLabel').style.display = showNormal ? 'block' : 'none';
    document.getElementById('propChar').style.display = showNormal ? 'block' : 'none';

    // Frei-Element fields
    const freiEls = ['propFreiSizeLabel','propFreiSize','propFreiInputsLabel','propFreiInputs','propFreiOutputsLabel','propFreiOutputs','propFreiColorLabel','propFreiColor'];
    freiEls.forEach(id => document.getElementById(id).style.display = isFrei ? 'block' : 'none');

    if (isKlemme) {
        document.getElementById('propKlemmen').value = comp.klemmen || def.klemmen || 4;
    }

    if (isFrei) {
        document.getElementById('propFreiSize').value = comp.freiSize || 1;
        document.getElementById('propFreiInputs').value = comp.freiInputs || '1';
        document.getElementById('propFreiOutputs').value = comp.freiOutputs || '1';
        document.getElementById('propFreiColor').value = comp.freiColor || '#7f8c8d';
    }

    document.getElementById('propsPanel').classList.add('open');
}

function closeProps() {
    document.getElementById('propsPanel').classList.remove('open');
}

function saveProps() {
    const comp = components.find(c => c.id === selectedId);
    if (!comp) return;
    comp.label = document.getElementById('propName').value;
    comp.amps = parseInt(document.getElementById('propAmps').value);
    comp.char = document.getElementById('propChar').value;
    comp.wireColor = document.getElementById('propWireColor').value;

    const def = COMPONENT_DEFS[comp.type];
    if (def.isKlemme) {
        comp.klemmen = parseInt(document.getElementById('propKlemmen').value);
    }

    if (def.isFrei) {
        const newSize = parseInt(document.getElementById('propFreiSize').value) || 1;
        comp.freiInputs = document.getElementById('propFreiInputs').value.trim();
        comp.freiOutputs = document.getElementById('propFreiOutputs').value.trim();
        comp.freiColor = document.getElementById('propFreiColor').value;

        // Resize: check if new size fits
        if (newSize !== comp.freiSize) {
            const panel = panels.find(pp => pp.id === comp.panelId);
            if (panel && canPlace(comp.panelId, comp.row, comp.slot, newSize, comp.id)) {
                comp.freiSize = newSize;
            } else {
                showToast(t('toastResizeFail'));
            }
        }
    }

    renderComponents();
    saveToStorage();
    showToast(t('toastSaved'));
}

// ─── Deletion ───
function deleteSelected() {
    if (!selectedId) return;
    deleteComponent(selectedId);
}

function deleteComponent(id) {
    components = components.filter(c => c.id !== id);
    wires = wires.filter(w => w.from.compId !== id && w.to.compId !== id);
    if (selectedId === id) {
        selectedId = null;
        closeProps();
    }
    renderComponents();
    saveToStorage();
}

// ─── Move helpers ───
function moveComponent(id, direction) {
    const comp = components.find(c => c.id === id);
    if (!comp) return;
    const def = COMPONENT_DEFS[comp.type];
    const newSlot = comp.slot + direction;
    if (canPlace(comp.panelId, comp.row, newSlot, def.size, comp.id)) {
        comp.slot = newSlot;
        renderComponents();
        saveToStorage();
    } else {
        showToast(t('toastNoRoom'));
    }
}

function moveLeftFromContext() {
    document.getElementById('contextMenu').style.display = 'none';
    if (contextTarget) moveComponent(contextTarget, -1);
}

function moveRightFromContext() {
    document.getElementById('contextMenu').style.display = 'none';
    if (contextTarget) moveComponent(contextTarget, 1);
}

// ─── Wiring ───
function toggleWiringMode() {
    wiringMode = !wiringMode;
    wiringStart = null;
    const btn = document.getElementById('btnWiring');
    const indicator = document.getElementById('wiringIndicator');

    const fab = document.getElementById('fabWiring');

    if (wiringMode) {
        btn.style.background = '#e94560';
        btn.style.color = '#fff';
        fab.classList.add('active');
        indicator.classList.add('show');
        deselectAll();
    } else {
        btn.style.background = '';
        btn.style.color = '';
        fab.classList.remove('active');
        indicator.classList.remove('show');
    }

    document.querySelectorAll('.terminal').forEach(t => {
        t.style.display = wiringMode ? 'block' : '';
    });
}

function onTerminalClick(compId, side, terminalEl) {
    if (!wiringStart) {
        wiringStart = { compId, side, terminalEl };
        terminalEl.classList.add('active');
        showToast(t('toastWireStart'));
    } else {
        if (wiringStart.compId === compId && wiringStart.side === side) {
            wiringStart.terminalEl.classList.remove('active');
            wiringStart = null;
            return;
        }

        // Wire color: auto-detect from source
        let wireColor = document.getElementById('propWireColor').value || '#c0392b';

        const hakColors = { hak_L1: '#c0392b', hak_L2: '#2c3e50', hak_L3: '#8e44ad', hak_N: '#2980b9', hak_PE: '#27ae60' };
        const startId = wiringStart.compId;

        const aderColors = { L1: '#c0392b', L2: '#2c3e50', L3: '#8e44ad', L: '#c0392b', N: '#2980b9', PE: '#27ae60' };

        if (typeof startId === 'string' && hakColors[startId]) {
            wireColor = hakColors[startId];
        } else if (typeof startId === 'string' && startId.startsWith('schiene_')) {
            const type = startId.split('_')[2];
            wireColor = type === 'PE' ? '#27ae60' : '#2980b9';
        } else if (typeof startId === 'string' && startId.startsWith('abg_')) {
            // Derive color from the ader in the side (e.g. "top_L1" -> L1)
            const ader = wiringStart.side.replace('top_', '');
            if (aderColors[ader]) wireColor = aderColors[ader];
        } else {
            const startComp = components.find(c => c.id === startId);
            if (startComp && startComp.wireColor) {
                wireColor = startComp.wireColor;
            }
        }

        const wire = {
            id: nextId++,
            from: { compId: wiringStart.compId, side: wiringStart.side },
            to: { compId, side },
            color: wireColor,
        };
        wires.push(wire);

        wiringStart.terminalEl.classList.remove('active');
        wiringStart = null;
        renderWires();
        saveToStorage();
        showToast(t('toastWireConnected'));
    }
}

// ─── Context Menu ───
function onContextMenu(e) {
    const compEl = e.target.closest('.placed-component');
    const menu = document.getElementById('contextMenu');

    if (compEl) {
        e.preventDefault();
        contextTarget = parseInt(compEl.dataset.id);
        menu.style.left = Math.min(e.clientX, window.innerWidth - 200) + 'px';
        menu.style.top = Math.min(e.clientY, window.innerHeight - 200) + 'px';
        menu.style.display = 'block';
    } else {
        menu.style.display = 'none';
    }
}

function editFromContext() {
    document.getElementById('contextMenu').style.display = 'none';
    if (contextTarget) selectComponent(contextTarget);
}

function duplicateFromContext() {
    document.getElementById('contextMenu').style.display = 'none';
    const comp = components.find(c => c.id === contextTarget);
    if (!comp) return;
    const def = COMPONENT_DEFS[comp.type];
    const panel = panels.find(pp => pp.id === comp.panelId);
    if (!panel) return;
    const startSlot = comp.slot + def.size;
    for (let attempt = 0; attempt < panel.slotsPerRow; attempt++) {
        const s = (startSlot + attempt) % panel.slotsPerRow;
        if (canPlace(comp.panelId, comp.row, s, def.size)) {
            const newComp = placeComponent(comp.type, comp.panelId, comp.row, s);
            if (newComp) {
                newComp.label = comp.label;
                newComp.amps = comp.amps;
                newComp.char = comp.char;
                newComp.wireColor = comp.wireColor;
                newComp.klemmen = comp.klemmen;
                renderComponents();
                saveToStorage();
            }
            return;
        }
    }
    showToast(t('toastNoRoomRow'));
}

function deleteFromContext() {
    document.getElementById('contextMenu').style.display = 'none';
    if (contextTarget) deleteComponent(contextTarget);
}

// ─── Global Events ───
function onDocClick(e) {
    document.getElementById('contextMenu').style.display = 'none';

    if (!e.target.closest('.placed-component') &&
        !e.target.closest('.properties') &&
        !e.target.closest('.sidebar') &&
        !e.target.closest('.modal')) {
        deselectAll();
    }
}

function onKeyDown(e) {
    if (e.key === 'Delete' && selectedId) {
        deleteSelected();
    }
    if (e.key === 'Escape') {
        if (document.getElementById('settingsModal').classList.contains('open')) {
            closeSettings();
        } else if (wiringMode) {
            if (wiringStart) {
                wiringStart.terminalEl.classList.remove('active');
                wiringStart = null;
            } else {
                toggleWiringMode();
            }
        } else {
            deselectAll();
        }
    }
    if (selectedId && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        e.preventDefault();
        moveComponent(selectedId, e.key === 'ArrowLeft' ? -1 : 1);
    }
}

// ─── Wire cleanup ───
function cleanupWires() {
    const compIds = new Set(components.map(c => c.id));
    // Also keep wires to hak_, zul_, abg_ targets
    wires = wires.filter(w => {
        const fromOk = typeof w.from.compId === 'string' || compIds.has(w.from.compId);
        const toOk = typeof w.to.compId === 'string' || compIds.has(w.to.compId);
        return fromOk && toOk;
    });
}

// ─── Persistence ───
function saveToStorage() {
    try {
        const data = { projectName, panels, components, wires, nextId, abgaenge };
        localStorage.setItem('sicherungskasten', JSON.stringify(data));
    } catch (e) {
        console.warn('Storage save failed:', e);
    }
}

function loadFromStorage() {
    try {
        const raw = localStorage.getItem('sicherungskasten');
        if (!raw) return;
        const data = JSON.parse(raw);

        // Migration: old format had slotsPerRow/rowCount at top level
        if (data.slotsPerRow && !data.panels) {
            panels = [{ id: 1, name: t('defaultPanel'), slotsPerRow: data.slotsPerRow, rowCount: data.rowCount || 3 }];
            components = (data.components || []).map(c => ({ ...c, panelId: 1 }));
        } else {
            panels = data.panels || [{ id: 1, name: t('defaultPanel'), slotsPerRow: 18, rowCount: 3 }];
            components = data.components || [];
        }

        wires = data.wires || [];
        nextId = data.nextId || 1;
        abgaenge = data.abgaenge || [];
        projectName = data.projectName || t('newProject');

        // Ensure nextId is above all existing ids
        const allIds = [
            ...panels.map(p => p.id),
            ...components.map(c => c.id),
            ...wires.map(w => w.id),
            ...abgaenge.map(a => a.id),
        ];
        if (allIds.length) nextId = Math.max(nextId, allIds.reduce((a, b) => Math.max(a, b), 0) + 1);
    } catch (e) {
        console.warn('Failed to load from storage:', e);
    }
}

function clearWires() {
    if (!wires.length) { showToast(t('toastNoWires')); return; }
    if (!confirm(t('toastDeleteWires', {n: wires.length}))) return;
    wires = [];
    renderWires();
    saveToStorage();
    showToast(t('toastWiresDeleted'));
}

function clearAll() {
    if (!confirm(t('toastConfirmClearAll'))) return;
    panels = [{ id: nextId++, name: t('defaultPanel'), slotsPerRow: 18, rowCount: 3 }];
    components = [];
    wires = [];
    abgaenge = [];
    projectName = t('newProject');
    selectedId = null;
    closeProps();
    buildAll();
    renderComponents();
    const pnEl = document.getElementById('projectName');
    if (pnEl) pnEl.textContent = projectName;
    document.title = `${projectName} \u2014 ${t('appTitle')}`;
    saveToStorage();
    showToast(t('toastAllDeleted'));
}

function exportPlan() {
    const data = { projectName, panels, components, wires, nextId, abgaenge };
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = (projectName || 'sicherungskasten').replace(/[^a-zA-Z0-9äöüÄÖÜß _-]/g, '') + '.json';
    a.click();
    URL.revokeObjectURL(url);
    showToast(t('toastExported'));
}

function sanitizeString(str, maxLen) {
    if (typeof str !== 'string') return '';
    return str.substring(0, maxLen || 100);
}

function sanitizeComponents(comps) {
    if (!Array.isArray(comps)) return [];
    return comps.filter(c => c && typeof c === 'object' && COMPONENT_DEFS[c.type]).map(c => ({
        ...c,
        id: parseInt(c.id) || 0,
        label: sanitizeString(c.label, 50),
        char: ['', 'B', 'C', 'D'].includes(c.char) ? c.char : '',
        amps: Math.max(0, Math.min(100, parseInt(c.amps) || 0)),
        wireColor: /^#[0-9a-fA-F]{6}$/.test(c.wireColor) ? c.wireColor : '#c0392b',
    }));
}

function sanitizePanels(pnls) {
    if (!Array.isArray(pnls) || pnls.length === 0) return [{ id: 1, name: t('defaultPanel'), slotsPerRow: 18, rowCount: 3 }];
    return pnls.map(p => ({
        ...p,
        id: parseInt(p.id) || 1,
        name: sanitizeString(p.name, 50),
        slotsPerRow: Math.max(3, Math.min(36, parseInt(p.slotsPerRow) || 18)),
        rowCount: Math.max(1, Math.min(6, parseInt(p.rowCount) || 3)),
    }));
}

function loadPlanData(data) {
    if (!data || typeof data !== 'object') return;

    if (data.slotsPerRow && !data.panels) {
        panels = [{ id: 1, name: t('defaultPanel'), slotsPerRow: Math.min(36, parseInt(data.slotsPerRow) || 18), rowCount: Math.min(6, parseInt(data.rowCount) || 3) }];
        components = sanitizeComponents((data.components || []).map(c => ({ ...c, panelId: 1 })));
    } else {
        panels = sanitizePanels(data.panels);
        components = sanitizeComponents(data.components);
    }
    wires = Array.isArray(data.wires) ? data.wires : [];
    nextId = parseInt(data.nextId) || 1;
    abgaenge = Array.isArray(data.abgaenge) ? data.abgaenge.map(a => ({
        ...a,
        id: parseInt(a.id) || 0,
        label: sanitizeString(a.label, 50),
        cableType: sanitizeString(a.cableType, 30),
    })) : [];
    projectName = sanitizeString(data.projectName, 100) || t('newProject');
    const pnEl = document.getElementById('projectName');
    if (pnEl) pnEl.textContent = projectName;
    document.title = `${projectName} \u2014 ${t('appTitle')}`;
    buildAll();
    renderComponents();
    saveToStorage();
}

function importPlan() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) { showToast(t('toastImportError')); return; }
        const reader = new FileReader();
        reader.onload = (ev) => {
            try {
                loadPlanData(JSON.parse(ev.target.result));
                showToast(t('toastImported'));
            } catch (err) {
                showToast(t('toastImportError'));
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

// ─── Share Link ───
async function sharePlan() {
    const data = { projectName, panels, components, wires, nextId, abgaenge };
    const json = JSON.stringify(data);

    try {
        // Compress with gzip
        const stream = new Blob([json]).stream().pipeThrough(new CompressionStream('gzip'));
        const compressed = await new Response(stream).arrayBuffer();
        const bytes = new Uint8Array(compressed);
        let binary = '';
        for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
        const encoded = btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

        const url = window.location.origin + window.location.pathname + '?plan=' + encoded;

        if (url.length > 8000) {
            showToast(t('shareTooLarge'));
            return;
        }

        await navigator.clipboard.writeText(url);
        showToast(t('shareCopied'));
    } catch (err) {
        showToast(t('shareError'));
    }
}

async function loadFromURL() {
    const params = new URLSearchParams(window.location.search);

    // Load from ?plan= (compressed share link)
    const planParam = params.get('plan');
    if (planParam) {
        try {
            if (planParam.length > 50000) throw new Error('Share link too large');
            const binary = atob(planParam.replace(/-/g, '+').replace(/_/g, '/'));
            const bytes = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
            const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
            const json = await new Response(stream).text();
            if (json.length > 1000000) throw new Error('Decompressed data too large');
            loadPlanData(JSON.parse(json));
            // Clean URL
            window.history.replaceState({}, '', window.location.pathname);
            return true;
        } catch (err) {
            console.warn('Failed to load shared plan:', err);
            window.history.replaceState({}, '', window.location.pathname);
        }
    }

    // Load from ?example (example config)
    if (params.has('example')) {
        try {
            const resp = await fetch('example.json');
            const data = await resp.json();
            loadPlanData(data);
            window.history.replaceState({}, '', window.location.pathname);
            return true;
        } catch (err) {
            console.warn('Failed to load example:', err);
        }
    }

    return false;
}

// ─── Utilities ───
function darken(hex, amount) {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.max(0, (num >> 16) - amount);
    const g = Math.max(0, ((num >> 8) & 0xff) - amount);
    const b = Math.max(0, (num & 0xff) - amount);
    return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
}

function escHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2000);
}

// ─── i18n helpers ───
function buildSettingsRowOptions() {
    const sel = document.getElementById('settRows');
    sel.innerHTML = '';
    for (let i = 1; i <= 6; i++) {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = i === 1 ? t('settRowN', {n: i}) : t('settRowsN', {n: i});
        sel.appendChild(opt);
    }
}

function updateInstructions() {
    const el = document.getElementById('instructions');
    if (!el) return;
    el.innerHTML = `
        ${t('instrDrag')} &bull;
        <kbd>${t('addPanel').replace('+ ', '+ ')}</kbd> = ${t('instrAddPanel')} &bull;
        <kbd>\u2699</kbd> = ${t('instrSettings')} &bull;
        <kbd>${t('btnWiring').replace(/^[^\s]+\s/, '')}</kbd> = ${t('instrWiring')} &bull;
        <kbd>Del</kbd> / <kbd>\u2190</kbd><kbd>\u2192</kbd> = ${t('instrKeys')}
    `;
}

// ─── Start ───
init();
