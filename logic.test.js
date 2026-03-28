import { describe, it, expect } from 'vitest';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const {
    COMPONENT_DEFS,
    CABLE_TYPES,
    canPlace,
    findNextFreeSlot,
    sanitizeString,
    sanitizeComponents,
    sanitizePanels,
    darken,
    getAdernFromCable,
} = require('./logic.js');

// ─── Test Helpers ───
function makePanel(overrides = {}) {
    return { id: 1, name: 'Test', slotsPerRow: 12, rowCount: 3, ...overrides };
}

function makeComp(overrides = {}) {
    return { id: 100, type: 'mcb_1p', panelId: 1, row: 0, slot: 0, label: 'Test', amps: 16, char: 'B', wireColor: '#c0392b', ...overrides };
}

// ─── COMPONENT_DEFS consistency ───
describe('COMPONENT_DEFS', () => {
    const requiredFields = ['i18n', 'size', 'color', 'symbol', 'defaultAmps', 'char', 'isKlemme', 'poles'];

    it('should have all required fields on every component type', () => {
        for (const [type, def] of Object.entries(COMPONENT_DEFS)) {
            for (const field of requiredFields) {
                expect(def, `${type} missing ${field}`).toHaveProperty(field);
            }
        }
    });

    it('should have positive integer sizes', () => {
        for (const [type, def] of Object.entries(COMPONENT_DEFS)) {
            expect(def.size, `${type} size`).toBeGreaterThan(0);
            expect(Number.isInteger(def.size), `${type} size is integer`).toBe(true);
        }
    });

    it('should have valid hex colors', () => {
        for (const [type, def] of Object.entries(COMPONENT_DEFS)) {
            expect(def.color, `${type} color`).toMatch(/^#[0-9a-fA-F]{6}$/);
        }
    });

    it('should have poles as arrays', () => {
        for (const [type, def] of Object.entries(COMPONENT_DEFS)) {
            expect(Array.isArray(def.poles), `${type} poles`).toBe(true);
        }
    });

    it('should have klemmen count on klemme types', () => {
        for (const [type, def] of Object.entries(COMPONENT_DEFS)) {
            if (def.isKlemme) {
                expect(def.klemmen, `${type} klemmen`).toBeGreaterThan(0);
            }
        }
    });

    it('should have char as empty string or valid trip characteristic', () => {
        for (const [type, def] of Object.entries(COMPONENT_DEFS)) {
            expect(['', 'B', 'C', 'D'], `${type} char`).toContain(def.char);
        }
    });
});

// ─── canPlace ───
describe('canPlace', () => {
    const panels = [makePanel()];

    it('should allow placement in empty row', () => {
        expect(canPlace(1, 0, 0, 1, null, panels, [])).toBe(true);
    });

    it('should allow placement at different positions', () => {
        expect(canPlace(1, 0, 5, 3, null, panels, [])).toBe(true);
    });

    it('should reject if slot exceeds panel width', () => {
        expect(canPlace(1, 0, 10, 3, null, panels, [])).toBe(false); // 10+3=13 > 12
    });

    it('should reject negative slot', () => {
        expect(canPlace(1, 0, -1, 1, null, panels, [])).toBe(false);
    });

    it('should reject invalid row', () => {
        expect(canPlace(1, -1, 0, 1, null, panels, [])).toBe(false);
        expect(canPlace(1, 3, 0, 1, null, panels, [])).toBe(false); // rowCount=3, valid=0-2
    });

    it('should reject invalid panel', () => {
        expect(canPlace(99, 0, 0, 1, null, panels, [])).toBe(false);
    });

    it('should detect overlap with existing component', () => {
        const comps = [makeComp({ slot: 3, type: 'mcb_3p' })]; // size 3, occupies 3-5
        expect(canPlace(1, 0, 3, 1, null, panels, comps)).toBe(false); // exact start
        expect(canPlace(1, 0, 4, 1, null, panels, comps)).toBe(false); // middle
        expect(canPlace(1, 0, 5, 1, null, panels, comps)).toBe(false); // end
        expect(canPlace(1, 0, 2, 2, null, panels, comps)).toBe(false); // overlaps start
    });

    it('should allow adjacent placement', () => {
        const comps = [makeComp({ slot: 3, type: 'mcb_3p' })]; // occupies 3-5
        expect(canPlace(1, 0, 0, 3, null, panels, comps)).toBe(true);  // 0-2: just before
        expect(canPlace(1, 0, 6, 1, null, panels, comps)).toBe(true);  // 6: just after
    });

    it('should allow placement in different row', () => {
        const comps = [makeComp({ slot: 0, row: 0 })];
        expect(canPlace(1, 1, 0, 1, null, panels, comps)).toBe(true);
    });

    it('should exclude component by id', () => {
        const comps = [makeComp({ id: 5, slot: 3, type: 'mcb_3p' })];
        expect(canPlace(1, 0, 3, 3, 5, panels, comps)).toBe(true); // excluded
        expect(canPlace(1, 0, 3, 3, 99, panels, comps)).toBe(false); // not excluded
    });

    it('should handle frei-element size', () => {
        const comps = [makeComp({ slot: 0, type: 'frei', freiSize: 4 })];
        expect(canPlace(1, 0, 3, 1, null, panels, comps)).toBe(false); // inside frei
        expect(canPlace(1, 0, 4, 1, null, panels, comps)).toBe(true);  // just after
    });
});

// ─── findNextFreeSlot ───
describe('findNextFreeSlot', () => {
    const panels = [makePanel({ slotsPerRow: 12 })];

    it('should return 0 for empty row', () => {
        expect(findNextFreeSlot(1, 0, 1, panels, [])).toBe(0);
    });

    it('should return first gap after existing components', () => {
        const comps = [makeComp({ slot: 0, type: 'mcb_3p' })]; // occupies 0-2
        expect(findNextFreeSlot(1, 0, 1, panels, comps)).toBe(3);
    });

    it('should find gap for multi-TE component', () => {
        const comps = [
            makeComp({ id: 1, slot: 0, type: 'mcb_1p' }), // 0
            makeComp({ id: 2, slot: 1, type: 'mcb_1p' }), // 1
            // gap at 2 (1 slot)
            makeComp({ id: 3, slot: 3, type: 'mcb_1p' }), // 3
            // gap at 4+ (8 slots)
        ];
        expect(findNextFreeSlot(1, 0, 3, panels, comps)).toBe(4); // needs 3 contiguous slots
    });

    it('should return -1 when row is full', () => {
        const comps = [];
        for (let s = 0; s < 12; s++) {
            comps.push(makeComp({ id: s + 1, slot: s, type: 'mcb_1p' }));
        }
        expect(findNextFreeSlot(1, 0, 1, panels, comps)).toBe(-1);
    });

    it('should return -1 for invalid panel', () => {
        expect(findNextFreeSlot(99, 0, 1, panels, [])).toBe(-1);
    });

    it('should return -1 when no contiguous space', () => {
        // Fill every other slot: 0, 2, 4, 6, 8, 10
        const comps = [0, 2, 4, 6, 8, 10].map((s, i) =>
            makeComp({ id: i + 1, slot: s, type: 'mcb_1p' })
        );
        expect(findNextFreeSlot(1, 0, 2, panels, comps)).toBe(-1); // no 2 contiguous
    });
});

// ─── sanitizeString ───
describe('sanitizeString', () => {
    it('should return string as-is when under maxLen', () => {
        expect(sanitizeString('hello', 10)).toBe('hello');
    });

    it('should truncate to maxLen', () => {
        expect(sanitizeString('hello world', 5)).toBe('hello');
    });

    it('should default maxLen to 100', () => {
        const long = 'a'.repeat(150);
        expect(sanitizeString(long)).toHaveLength(100);
    });

    it('should return empty string for non-string input', () => {
        expect(sanitizeString(null)).toBe('');
        expect(sanitizeString(undefined)).toBe('');
        expect(sanitizeString(42)).toBe('');
        expect(sanitizeString({})).toBe('');
    });

    it('should handle empty string', () => {
        expect(sanitizeString('')).toBe('');
    });
});

// ─── sanitizeComponents ───
describe('sanitizeComponents', () => {
    it('should return empty array for non-array input', () => {
        expect(sanitizeComponents(null)).toEqual([]);
        expect(sanitizeComponents('string')).toEqual([]);
        expect(sanitizeComponents(42)).toEqual([]);
    });

    it('should filter out components with invalid types', () => {
        const comps = [
            { type: 'mcb_1p', id: 1, label: 'Good', amps: 16, char: 'B', wireColor: '#c0392b' },
            { type: 'nonexistent', id: 2, label: 'Bad' },
        ];
        const result = sanitizeComponents(comps);
        expect(result).toHaveLength(1);
        expect(result[0].id).toBe(1);
    });

    it('should filter out falsy entries', () => {
        const comps = [null, undefined, false, { type: 'mcb_1p', id: 1, label: 'OK', amps: 16, char: 'B', wireColor: '#c0392b' }];
        expect(sanitizeComponents(comps)).toHaveLength(1);
    });

    it('should sanitize label length', () => {
        const comps = [{ type: 'mcb_1p', id: 1, label: 'a'.repeat(100), amps: 16, char: 'B', wireColor: '#c0392b' }];
        expect(sanitizeComponents(comps)[0].label).toHaveLength(50);
    });

    it('should clamp amps to 0-100', () => {
        const comps = [
            { type: 'mcb_1p', id: 1, label: 'A', amps: -10, char: 'B', wireColor: '#c0392b' },
            { type: 'mcb_1p', id: 2, label: 'B', amps: 200, char: 'B', wireColor: '#c0392b' },
        ];
        const result = sanitizeComponents(comps);
        expect(result[0].amps).toBe(0);
        expect(result[1].amps).toBe(100);
    });

    it('should reject invalid trip characteristics', () => {
        const comps = [{ type: 'mcb_1p', id: 1, label: 'A', amps: 16, char: 'X', wireColor: '#c0392b' }];
        expect(sanitizeComponents(comps)[0].char).toBe('');
    });

    it('should accept valid trip characteristics', () => {
        for (const char of ['', 'B', 'C', 'D']) {
            const comps = [{ type: 'mcb_1p', id: 1, label: 'A', amps: 16, char, wireColor: '#c0392b' }];
            expect(sanitizeComponents(comps)[0].char).toBe(char);
        }
    });

    it('should default invalid wireColor to red', () => {
        const comps = [{ type: 'mcb_1p', id: 1, label: 'A', amps: 16, char: 'B', wireColor: 'invalid' }];
        expect(sanitizeComponents(comps)[0].wireColor).toBe('#c0392b');
    });

    it('should accept valid hex wireColor', () => {
        const comps = [{ type: 'mcb_1p', id: 1, label: 'A', amps: 16, char: 'B', wireColor: '#2980b9' }];
        expect(sanitizeComponents(comps)[0].wireColor).toBe('#2980b9');
    });

    it('should parse id to integer', () => {
        const comps = [{ type: 'mcb_1p', id: '42', label: 'A', amps: 16, char: 'B', wireColor: '#c0392b' }];
        expect(sanitizeComponents(comps)[0].id).toBe(42);
    });
});

// ─── sanitizePanels ───
describe('sanitizePanels', () => {
    it('should return default panel for non-array input', () => {
        const result = sanitizePanels(null, 'Default');
        expect(result).toHaveLength(1);
        expect(result[0].name).toBe('Default');
        expect(result[0].slotsPerRow).toBe(18);
        expect(result[0].rowCount).toBe(3);
    });

    it('should return default panel for empty array', () => {
        expect(sanitizePanels([], 'Default')).toHaveLength(1);
    });

    it('should clamp slotsPerRow to 3-36', () => {
        const panels = [{ id: 1, name: 'A', slotsPerRow: 1, rowCount: 1 }];
        expect(sanitizePanels(panels)[0].slotsPerRow).toBe(3);

        const panels2 = [{ id: 1, name: 'A', slotsPerRow: 100, rowCount: 1 }];
        expect(sanitizePanels(panels2)[0].slotsPerRow).toBe(36);
    });

    it('should clamp rowCount to 1-6', () => {
        // Note: parseInt(0) || 3 = 3, so 0 falls back to default 3, then max(1,3)=3
        const panels = [{ id: 1, name: 'A', slotsPerRow: 12, rowCount: 0 }];
        expect(sanitizePanels(panels)[0].rowCount).toBe(3);

        const panels2 = [{ id: 1, name: 'A', slotsPerRow: 12, rowCount: 20 }];
        expect(sanitizePanels(panels2)[0].rowCount).toBe(6);

        const panels3 = [{ id: 1, name: 'A', slotsPerRow: 12, rowCount: 1 }];
        expect(sanitizePanels(panels3)[0].rowCount).toBe(1);
    });

    it('should truncate name to 50 chars', () => {
        const panels = [{ id: 1, name: 'a'.repeat(100), slotsPerRow: 12, rowCount: 1 }];
        expect(sanitizePanels(panels)[0].name).toHaveLength(50);
    });

    it('should parse id to integer', () => {
        const panels = [{ id: '5', name: 'A', slotsPerRow: 12, rowCount: 1 }];
        expect(sanitizePanels(panels)[0].id).toBe(5);
    });

    it('should preserve extra fields via spread', () => {
        const panels = [{ id: 1, name: 'A', slotsPerRow: 12, rowCount: 1, hasNSchiene: true }];
        expect(sanitizePanels(panels)[0].hasNSchiene).toBe(true);
    });
});

// ─── darken ───
describe('darken', () => {
    it('should darken white', () => {
        expect(darken('#ffffff', 50)).toBe('#cdcdcd');
    });

    it('should not go below #000000', () => {
        expect(darken('#000000', 50)).toBe('#000000');
    });

    it('should darken red channel only when others are zero', () => {
        expect(darken('#330000', 10)).toBe('#290000');
    });

    it('should handle 0 amount (no change)', () => {
        expect(darken('#abcdef', 0)).toBe('#abcdef');
    });

    it('should clamp to zero on large amount', () => {
        expect(darken('#101010', 255)).toBe('#000000');
    });
});

// ─── getAdernFromCable ───
describe('getAdernFromCable', () => {
    it('should return single L for null/undefined', () => {
        expect(getAdernFromCable(null)).toHaveLength(1);
        expect(getAdernFromCable(null)[0].id).toBe('L');
    });

    it('should parse 3-wire cable (NYM-J 3x1,5)', () => {
        const result = getAdernFromCable('NYM-J 3x1,5');
        expect(result).toHaveLength(3);
        expect(result.map(a => a.id)).toEqual(['L', 'N', 'PE']);
    });

    it('should parse 5-wire cable (NYM-J 5x2,5)', () => {
        const result = getAdernFromCable('NYM-J 5x2,5');
        expect(result).toHaveLength(5);
        expect(result.map(a => a.id)).toEqual(['L1', 'L2', 'L3', 'N', 'PE']);
    });

    it('should parse 4-wire cable', () => {
        const result = getAdernFromCable('4x1,5');
        expect(result).toHaveLength(4);
        expect(result.map(a => a.id)).toEqual(['L1', 'L2', 'L3', 'PE']);
    });

    it('should parse 2-wire cable', () => {
        const result = getAdernFromCable('H07V-U 2x1,5');
        expect(result).toHaveLength(2);
        expect(result.map(a => a.id)).toEqual(['L', 'N']);
    });

    it('should return single L for 1-wire cable', () => {
        const result = getAdernFromCable('H07V-U 1x2,5');
        expect(result).toHaveLength(1);
        expect(result[0].id).toBe('L');
    });

    it('should handle cables with 5+ wires', () => {
        const result = getAdernFromCable('7x1,5');
        expect(result).toHaveLength(5); // capped at 5 conductors
    });

    it('should assign correct colors', () => {
        const result = getAdernFromCable('NYM-J 5x2,5');
        expect(result.find(a => a.id === 'PE').color).toBe('#27ae60');
        expect(result.find(a => a.id === 'N').color).toBe('#2980b9');
        expect(result.find(a => a.id === 'L1').color).toBe('#c0392b');
    });
});

// ─── CABLE_TYPES ───
describe('CABLE_TYPES', () => {
    it('should be a non-empty array of strings', () => {
        expect(Array.isArray(CABLE_TYPES)).toBe(true);
        expect(CABLE_TYPES.length).toBeGreaterThan(0);
        for (const ct of CABLE_TYPES) {
            expect(typeof ct).toBe('string');
        }
    });

    it('should all be parseable by getAdernFromCable', () => {
        for (const ct of CABLE_TYPES) {
            const result = getAdernFromCable(ct);
            expect(result.length, `${ct} should produce conductors`).toBeGreaterThan(0);
        }
    });
});
