// ─── Pure logic functions extracted for testability ───
// This file is loaded as a regular <script> in the browser (globals)
// and as an ES module in tests (via conditional export at the bottom).

// ─── Component Definitions ───
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

// ─── Cable Types ───
const CABLE_TYPES = [
    'NYM-J 3x1,5', 'NYM-J 3x2,5', 'NYM-J 5x1,5', 'NYM-J 5x2,5',
    'NYM-J 5x4', 'NYM-J 5x6', 'NYM-J 5x10', 'NYM-J 5x16',
    'NYY-J 5x6', 'NYY-J 5x10', 'NYY-J 5x16',
    'H07V-U 1x1,5', 'H07V-U 1x2,5', 'H05VV-F 3x1,5', 'H05VV-F 3x2,5',
];

// ─── Placement Logic ───
function canPlace(panelId, row, startSlot, size, excludeId, _panels, _components) {
    const pnls = _panels || (typeof panels !== 'undefined' ? panels : []);
    const comps = _components || (typeof components !== 'undefined' ? components : []);
    const panel = pnls.find(pp => pp.id === panelId);
    if (!panel) return false;
    if (row < 0 || row >= panel.rowCount) return false;
    if (startSlot < 0 || startSlot + size > panel.slotsPerRow) return false;
    for (const c of comps) {
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

function findNextFreeSlot(panelId, row, size, _panels, _components) {
    const pnls = _panels || (typeof panels !== 'undefined' ? panels : []);
    const comps = _components || (typeof components !== 'undefined' ? components : []);
    const panel = pnls.find(pp => pp.id === panelId);
    if (!panel) return -1;
    for (let s = 0; s <= panel.slotsPerRow - size; s++) {
        if (canPlace(panelId, row, s, size, null, pnls, comps)) return s;
    }
    return -1;
}

// ─── Sanitization ───
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

function sanitizePanels(pnls, defaultName) {
    const fallbackName = defaultName || (typeof t === 'function' ? t('defaultPanel') : 'Main panel');
    if (!Array.isArray(pnls) || pnls.length === 0) return [{ id: 1, name: fallbackName, slotsPerRow: 18, rowCount: 3 }];
    return pnls.map(p => ({
        ...p,
        id: parseInt(p.id) || 1,
        name: sanitizeString(p.name, 50),
        slotsPerRow: Math.max(3, Math.min(36, parseInt(p.slotsPerRow) || 18)),
        rowCount: Math.max(1, Math.min(6, parseInt(p.rowCount) || 3)),
    }));
}

// ─── Utilities ───
function darken(hex, amount) {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.max(0, (num >> 16) - amount);
    const g = Math.max(0, ((num >> 8) & 0xff) - amount);
    const b = Math.max(0, (num & 0xff) - amount);
    return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
}

function getAdernFromCable(cableType) {
    if (!cableType) return [{ id: 'L', label: 'L', color: '#c0392b' }];
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

// ─── Export for tests ───
// In browser: loaded via <script>, functions become globals — this block is ignored.
// In Node/vitest: detected as CJS via typeof exports check.
if (typeof exports !== 'undefined') {
    exports.COMPONENT_DEFS = COMPONENT_DEFS;
    exports.CABLE_TYPES = CABLE_TYPES;
    exports.canPlace = canPlace;
    exports.findNextFreeSlot = findNextFreeSlot;
    exports.sanitizeString = sanitizeString;
    exports.sanitizeComponents = sanitizeComponents;
    exports.sanitizePanels = sanitizePanels;
    exports.darken = darken;
    exports.getAdernFromCable = getAdernFromCable;
}
