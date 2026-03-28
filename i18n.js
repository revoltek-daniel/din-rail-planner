// ─── Internationalization ───
const TRANSLATIONS = {
    de: {
        // General
        appTitle: 'Sicherungskasten-Planer',
        newProject: 'Neues Projekt',
        dblClickRename: 'Doppelklick zum Umbenennen',

        // Header buttons
        btnWiring: '\uD83D\uDD0C Verkabelung',
        btnWireMarker: '\uD83D\uDC41 Nur Marker',
        btnWireHover: '\uD83D\uDC41 Hover-Linien',
        btnClearWires: '\u2702 Kabel l\u00F6schen',
        btnClearAll: '\uD83D\uDDD1 Alles l\u00F6schen',
        btnExport: '\uD83D\uDCBE Exportieren',
        btnImport: '\uD83D\uDCC2 Importieren',

        // Sidebar
        sidebarTitle: 'Bauteile',
        catBreakers: 'Sicherungsautomaten',
        catTerminals: 'Klemmenbl\u00F6cke',
        catRCD: 'Fehlerstromschutz (RCD)',
        catMain: 'Hauptschalter',
        catFire: 'Brandschutz',
        catSwitching: 'Schaltger\u00E4te',
        catMisc: 'Sonstiges',

        // Component names
        compMcb1p: 'LS 1-polig',
        compMcb3p: 'LS 3-polig',
        compKlemmeN: 'N-Klemme',
        compKlemmePE: 'PE-Klemme',
        compKlemmeL: 'L-Klemme',
        compKlemmeBlock4: 'Klemmenblock 4x',
        compKlemmeBlock8: 'Klemmenblock 8x',
        compKlemmeBlock12: 'Klemmenblock 12x',
        compRcd2: 'RCD 2-polig',
        compRcd4: 'RCD 4-polig',
        compRcbo: 'FI/LS 1+N (RCBO)',
        compHs3: 'Hauptschalter 3-pol',
        compHs2: 'Hauptschalter 2-pol',
        compAfdd: 'Brandschutzschalter',
        compRelais: 'Stromsto\u00DFrelais',
        compTimer: 'Zeitschaltuhr',
        compSpd: '\u00DCberspg.-Schutz',
        compSocket: 'HS-Steckdose',
        compDisconnect: 'Trennklemme',
        compFree: 'Frei-Element',
        compBlank: 'Blindabdeckung',

        // COMPONENT_DEFS names (used in placed components)
        defHauptschalter3: 'Hauptschalter 3-pol',
        defHauptschalter2: 'Hauptschalter 2-pol',
        defRcd2: 'RCD 2-pol',
        defRcd4: 'RCD 4-pol',
        defMcb1: 'LS 1-pol',
        defMcb3: 'LS 3-pol',
        defRcbo: 'FI/LS 1+N',
        defKlemmeN: 'N-Klemme',
        defKlemmePE: 'PE-Klemme',
        defKlemmeL: 'L-Klemme',
        defKlemmeBlock4: 'Klemmenblock 4x',
        defKlemmeBlock8: 'Klemmenblock 8x',
        defKlemmeBlock12: 'Klemmenblock 12x',
        defSpd: 'SPD',
        defAfdd: 'AFDD',
        defRelais: 'Stromsto\u00DFrelais',
        defTimer: 'Zeitschaltuhr',
        defSocket: 'Hutschienen-Dose',
        defDisconnect: 'Trennklemme',
        defFree: 'Frei',
        defBlank: 'Blind',

        // Instructions
        instrDrag: 'Bauteile per Drag & Drop in die Reihen ziehen',
        instrAddPanel: '+ Kasten = weiteren Kasten hinzuf\u00FCgen (3\u201336 TE)',
        instrSettings: '\u2699 = Kasten konfigurieren',
        instrWiring: 'Verkabelung = Klemmen anklicken',
        instrKeys: 'Entf / \u2190\u2192 = L\u00F6schen / Verschieben',

        // Properties panel
        propsTitle: 'Eigenschaften',
        propsLabel: 'Bezeichnung',
        propsPlaceholder: 'z.B. K\u00FCche Licht',
        propsAmps: 'Nennstrom (A)',
        propsChar: 'Ausl\u00F6secharakteristik',
        propsKlemmen: 'Anzahl Anschl\u00FCsse',
        propsFreiSize: 'Breite (TE)',
        propsFreiInputs: 'Eing\u00E4nge oben (kommagetrennt)',
        propsFreiInputsPh: 'z.B. L1,L2,L3',
        propsFreiOutputs: 'Ausg\u00E4nge unten (kommagetrennt)',
        propsFreiOutputsPh: 'z.B. 1,2,3,4',
        propsFreiColor: 'Farbe',
        propsWireColor: 'Kabelfarbe (Verkabelung)',
        btnSave: 'Speichern',
        btnDelete: 'L\u00F6schen',
        btnClose: 'Schlie\u00DFen',

        // Wire colors
        colorL1: 'L1 (braun/rot)',
        colorL2: 'L2 (schwarz)',
        colorL3: 'L3 (grau/violett)',
        colorN: 'N (blau)',
        colorPE: 'PE (gr\u00FCn-gelb)',

        // Frei colors
        colGray: 'Grau',
        colRed: 'Rot',
        colOrange: 'Orange',
        colYellow: 'Gelb',
        colGreen: 'Gr\u00FCn',
        colBlue: 'Blau',
        colViolet: 'Violett',
        colBlack: 'Schwarz',
        colTurquoise: 'T\u00FCrkis',

        // Context menu
        ctxEdit: 'Bearbeiten',
        ctxDuplicate: 'Duplizieren',
        ctxMoveLeft: '\u2190 Nach links',
        ctxMoveRight: '\u2192 Nach rechts',
        ctxDelete: 'L\u00F6schen',

        // Wiring indicator
        wiringIndicator: 'Verkabelungs-Modus \u2014 Klemmen anklicken zum Verbinden (ESC zum Beenden)',

        // Settings modal
        settTitle: 'Kasten konfigurieren',
        settName: 'Bezeichnung',
        settNamePh: 'z.B. Hauptverteiler',
        settRows: 'Anzahl Reihen',
        settRowN: '{n} Reihe',
        settRowsN: '{n} Reihen',
        settSlots: 'Teilungseinheiten (TE) pro Reihe',
        settRails: 'Eingebaute Klemmschienen',
        settNRail: 'N-Schiene',
        settPERail: 'PE-Schiene',
        settRailPorts: 'Anschl\u00FCsse pro Schiene',
        settApply: '\u00DCbernehmen',
        settCancel: 'Abbrechen',
        settWarning: 'Achtung: Bauteile die nicht mehr in die neuen Ma\u00DFe passen, werden entfernt.',

        // Floating toolbar
        fabWiring: 'Verkabelung ein/aus',
        fabWireDisplay: 'Kabel: Marker / Linien',

        // Panels
        defaultPanel: 'Hauptverteiler',
        newPanel: 'Neuer Kasten',
        addPanel: '+ Kasten hinzuf\u00FCgen',
        minOnePanel: 'Mindestens ein Kasten erforderlich',
        confirmDeletePanel: 'Kasten "{name}" wirklich entfernen?',
        panelAdded: 'Kasten hinzugef\u00FCgt',
        panelInfo: '{rows} Reihe{s} \u00E0 {slots} TE',

        // HAK
        hakLabel: 'HAK',
        hakTitle: 'Hauptanschlussklemme',

        // Schiene
        schieneIn: 'IN',
        schieneInput: '{type}-Schiene Eingang',
        schieneOutput: '{type}-Schiene Ausgang {n}',
        schieneLabel: '{type}-Schiene',

        // Abgaenge
        abgaengeTitle: 'Abg\u00E4nge (Verbraucher)',
        abgaengeAdd: '+ Abgang',
        newAbgang: 'Neuer Abgang',
        abgangNamePh: 'Bezeichnung eingeben',
        cableCustom: 'Andere...',
        cablePh: 'Kabeltyp eingeben',

        // Toasts
        toastMoved: 'Verschoben',
        toastNoSpace: 'Kein Platz an dieser Stelle',
        toastNoSpaceCheck: 'Kein Platz! Belegung pr\u00FCfen.',
        toastSaved: 'Gespeichert',
        toastSwapped: 'Getauscht',
        toastSwapSameSize: 'Tauschen nur bei gleicher Breite',
        toastNoRoom: 'Kein Platz',
        toastNoRoomRow: 'Kein Platz in dieser Reihe',
        toastResizeFail: 'Neue Breite passt nicht, Platz pr\u00FCfen',
        toastWireStart: 'Startpunkt gew\u00E4hlt \u2014 jetzt Zielpunkt anklicken',
        toastWireConnected: 'Kabel verbunden',
        toastNoWires: 'Keine Kabel vorhanden',
        toastDeleteWires: '{n} Kabel l\u00F6schen?',
        toastWiresDeleted: 'Alle Kabel gel\u00F6scht',
        toastConfirmClearAll: 'Alle K\u00E4sten, Bauteile und Kabel l\u00F6schen?',
        toastAllDeleted: 'Alles gel\u00F6scht',
        toastExported: 'Plan exportiert',
        toastImported: 'Plan importiert',
        toastImportError: 'Fehler beim Import',
        shareCopied: 'Share-Link in Zwischenablage kopiert',
        shareTooLarge: 'Plan zu gro\u00DF f\u00FCr Share-Link, bitte JSON exportieren',
        shareError: 'Share-Link konnte nicht erstellt werden',
        btnShare: '\uD83D\uDD17 Teilen',
        toastPanelSettings: '{name}: {rows} Reihe{s} \u00E0 {slots} TE',

        // Terminal labels
        typeName_hauptschalter: 'Hauptschalter',
        typeName_hauptschalter2: 'Hauptschalter',
        typeName_rcd_small: 'RCD 2-pol',
        typeName_rcd_large: 'RCD 4-pol',
        typeName_rcbo: 'FI/LS',
        typeName_mcb_1p: 'LS 1-pol',
        typeName_mcb_3p: 'LS 3-pol',
        typeName_klemme_n: 'N-Klemme',
        typeName_klemme_pe: 'PE-Klemme',
        typeName_klemme_l: 'L-Klemme',
        typeName_klemme_block_4: 'Klemmenblock',
        typeName_klemme_block_8: 'Klemmenblock',
        typeName_klemme_block_12: 'Klemmenblock',
        typeName_spd: 'SPD',
        typeName_afdd: 'AFDD',
        typeName_relais: 'Relais',
        typeName_zeitschaltuhr: 'Zeitschaltuhr',
        typeName_steckdose: 'HS-Steckdose',
        typeName_trennklemme: 'Trennklemme',
        typeName_frei: 'Frei',
        typeName_blank: 'Blind',

        // Mobile
        mobileMenuOpen: 'Men\u00FC',
        mobileMenuClose: 'Schlie\u00DFen',
        sidebarToggle: 'Bauteile ein/aus',
        instrTap: 'Bauteil antippen, dann Slot antippen zum Platzieren',
        instrTapList: 'Bauteil w\u00E4hlen, dann + in einer Reihe antippen',
        tapToPlace: 'Slot antippen zum Platzieren',
        tapToPlaceList: '+ in einer Reihe antippen',
        viewGrid: 'Raster',
        viewList: 'Liste',
        emptyRow: 'Leer \u2014 Bauteil hinzuf\u00FCgen',
        slotRange: 'Platz {from}\u2013{to}',
        teUnits: '{n} TE',
        addToRow: '+ Bauteil',
        wiringNeedGrid: 'Verkabelung nur in Rasteransicht m\u00F6glich',
        wireCount: '{n} Kabel',

        // Misc
        abgang: 'Abgang',
        kasten: 'Kasten',
        unterverteilung: 'Unterverteilung',
        row: 'R',
    },

    en: {
        appTitle: 'Distribution Board Planner',
        newProject: 'New Project',
        dblClickRename: 'Double-click to rename',

        btnWiring: '\uD83D\uDD0C Wiring',
        btnWireMarker: '\uD83D\uDC41 Markers only',
        btnWireHover: '\uD83D\uDC41 Hover lines',
        btnClearWires: '\u2702 Clear wires',
        btnClearAll: '\uD83D\uDDD1 Clear all',
        btnExport: '\uD83D\uDCBE Export',
        btnImport: '\uD83D\uDCC2 Import',

        sidebarTitle: 'Components',
        catBreakers: 'Circuit breakers',
        catTerminals: 'Terminal blocks',
        catRCD: 'Residual current (RCD)',
        catMain: 'Main switch',
        catFire: 'Arc fault protection',
        catSwitching: 'Switching devices',
        catMisc: 'Miscellaneous',

        compMcb1p: 'MCB 1-pole',
        compMcb3p: 'MCB 3-pole',
        compKlemmeN: 'N terminal',
        compKlemmePE: 'PE terminal',
        compKlemmeL: 'L terminal',
        compKlemmeBlock4: 'Terminal block 4x',
        compKlemmeBlock8: 'Terminal block 8x',
        compKlemmeBlock12: 'Terminal block 12x',
        compRcd2: 'RCD 2-pole',
        compRcd4: 'RCD 4-pole',
        compRcbo: 'RCBO 1+N',
        compHs3: 'Main switch 3-pole',
        compHs2: 'Main switch 2-pole',
        compAfdd: 'AFDD',
        compRelais: 'Impulse relay',
        compTimer: 'Time switch',
        compSpd: 'Surge protector',
        compSocket: 'DIN rail socket',
        compDisconnect: 'Disconnect terminal',
        compFree: 'Custom element',
        compBlank: 'Blank cover',

        defHauptschalter3: 'Main switch 3-pole',
        defHauptschalter2: 'Main switch 2-pole',
        defRcd2: 'RCD 2-pole',
        defRcd4: 'RCD 4-pole',
        defMcb1: 'MCB 1-pole',
        defMcb3: 'MCB 3-pole',
        defRcbo: 'RCBO 1+N',
        defKlemmeN: 'N terminal',
        defKlemmePE: 'PE terminal',
        defKlemmeL: 'L terminal',
        defKlemmeBlock4: 'Terminal block 4x',
        defKlemmeBlock8: 'Terminal block 8x',
        defKlemmeBlock12: 'Terminal block 12x',
        defSpd: 'SPD',
        defAfdd: 'AFDD',
        defRelais: 'Impulse relay',
        defTimer: 'Time switch',
        defSocket: 'DIN rail socket',
        defDisconnect: 'Disconnect terminal',
        defFree: 'Custom',
        defBlank: 'Blank',

        instrDrag: 'Drag & drop components into the rows',
        instrAddPanel: '+ Panel = add another panel (3\u201336 modules)',
        instrSettings: '\u2699 = Configure panel',
        instrWiring: 'Wiring = click terminals to connect',
        instrKeys: 'Del / \u2190\u2192 = Delete / Move',

        propsTitle: 'Properties',
        propsLabel: 'Label',
        propsPlaceholder: 'e.g. Kitchen lights',
        propsAmps: 'Rated current (A)',
        propsChar: 'Trip characteristic',
        propsKlemmen: 'Number of ports',
        propsFreiSize: 'Width (modules)',
        propsFreiInputs: 'Inputs top (comma-separated)',
        propsFreiInputsPh: 'e.g. L1,L2,L3',
        propsFreiOutputs: 'Outputs bottom (comma-separated)',
        propsFreiOutputsPh: 'e.g. 1,2,3,4',
        propsFreiColor: 'Color',
        propsWireColor: 'Wire color',
        btnSave: 'Save',
        btnDelete: 'Delete',
        btnClose: 'Close',

        colorL1: 'L1 (brown/red)',
        colorL2: 'L2 (black)',
        colorL3: 'L3 (grey/violet)',
        colorN: 'N (blue)',
        colorPE: 'PE (green-yellow)',

        colGray: 'Grey',
        colRed: 'Red',
        colOrange: 'Orange',
        colYellow: 'Yellow',
        colGreen: 'Green',
        colBlue: 'Blue',
        colViolet: 'Violet',
        colBlack: 'Black',
        colTurquoise: 'Turquoise',

        ctxEdit: 'Edit',
        ctxDuplicate: 'Duplicate',
        ctxMoveLeft: '\u2190 Move left',
        ctxMoveRight: '\u2192 Move right',
        ctxDelete: 'Delete',

        wiringIndicator: 'Wiring mode \u2014 click terminals to connect (ESC to exit)',

        settTitle: 'Configure panel',
        settName: 'Name',
        settNamePh: 'e.g. Main panel',
        settRows: 'Number of rows',
        settRowN: '{n} row',
        settRowsN: '{n} rows',
        settSlots: 'Modules per row',
        settRails: 'Built-in busbars',
        settNRail: 'N busbar',
        settPERail: 'PE busbar',
        settRailPorts: 'Ports per busbar',
        settApply: 'Apply',
        settCancel: 'Cancel',
        settWarning: 'Warning: Components that no longer fit will be removed.',

        fabWiring: 'Wiring on/off',
        fabWireDisplay: 'Wires: Markers / Lines',

        defaultPanel: 'Main panel',
        newPanel: 'New panel',
        addPanel: '+ Add panel',
        minOnePanel: 'At least one panel required',
        confirmDeletePanel: 'Really remove panel "{name}"?',
        panelAdded: 'Panel added',
        panelInfo: '{rows} row{s} \u00E0 {slots} modules',

        hakLabel: 'HAK',
        hakTitle: 'Main terminal block',

        schieneIn: 'IN',
        schieneInput: '{type} busbar input',
        schieneOutput: '{type} busbar output {n}',
        schieneLabel: '{type} busbar',

        abgaengeTitle: 'Outgoing circuits',
        abgaengeAdd: '+ Circuit',
        newAbgang: 'New circuit',
        abgangNamePh: 'Enter name',
        cableCustom: 'Other...',
        cablePh: 'Enter cable type',

        toastMoved: 'Moved',
        toastNoSpace: 'No space at this position',
        toastNoSpaceCheck: 'No space! Check layout.',
        toastSaved: 'Saved',
        toastSwapped: 'Swapped',
        toastSwapSameSize: 'Swap only with same width',
        toastNoRoom: 'No space',
        toastNoRoomRow: 'No space in this row',
        toastResizeFail: 'New width does not fit, check space',
        toastWireStart: 'Start point selected \u2014 now click target',
        toastWireConnected: 'Wire connected',
        toastNoWires: 'No wires present',
        toastDeleteWires: 'Delete {n} wires?',
        toastWiresDeleted: 'All wires deleted',
        toastConfirmClearAll: 'Delete all panels, components and wires?',
        toastAllDeleted: 'All deleted',
        toastExported: 'Plan exported',
        toastImported: 'Plan imported',
        toastImportError: 'Import error',
        shareCopied: 'Share link copied to clipboard',
        shareTooLarge: 'Plan too large for share link, please export as JSON',
        shareError: 'Could not create share link',
        btnShare: '\uD83D\uDD17 Share',
        toastPanelSettings: '{name}: {rows} row{s} \u00E0 {slots} modules',

        typeName_hauptschalter: 'Main switch',
        typeName_hauptschalter2: 'Main switch',
        typeName_rcd_small: 'RCD 2-pole',
        typeName_rcd_large: 'RCD 4-pole',
        typeName_rcbo: 'RCBO',
        typeName_mcb_1p: 'MCB 1-pole',
        typeName_mcb_3p: 'MCB 3-pole',
        typeName_klemme_n: 'N terminal',
        typeName_klemme_pe: 'PE terminal',
        typeName_klemme_l: 'L terminal',
        typeName_klemme_block_4: 'Terminal block',
        typeName_klemme_block_8: 'Terminal block',
        typeName_klemme_block_12: 'Terminal block',
        typeName_spd: 'SPD',
        typeName_afdd: 'AFDD',
        typeName_relais: 'Relay',
        typeName_zeitschaltuhr: 'Time switch',
        typeName_steckdose: 'DIN socket',
        typeName_trennklemme: 'Disconnect',
        typeName_frei: 'Custom',
        typeName_blank: 'Blank',

        mobileMenuOpen: 'Menu',
        mobileMenuClose: 'Close',
        sidebarToggle: 'Components on/off',
        instrTap: 'Tap component, then tap slot to place',
        instrTapList: 'Select component, then tap + in a row',
        tapToPlace: 'Tap a slot to place',
        tapToPlaceList: 'Tap + in a row to place',
        viewGrid: 'Grid',
        viewList: 'List',
        emptyRow: 'Empty \u2014 add a component',
        slotRange: 'Slot {from}\u2013{to}',
        teUnits: '{n} modules',
        addToRow: '+ Component',
        wiringNeedGrid: 'Wiring only available in grid view',
        wireCount: '{n} wires',

        abgang: 'Circuit',
        kasten: 'Panel',
        unterverteilung: 'Distribution board',
        row: 'R',
    },
};

function detectLanguage() {
    const stored = localStorage.getItem('sk_lang');
    if (stored) return stored;
    const browserLang = (navigator.language || '').slice(0, 2).toLowerCase();
    return TRANSLATIONS[browserLang] ? browserLang : 'en';
}

let currentLang = detectLanguage();

function t(key, params) {
    const lang = TRANSLATIONS[currentLang] || TRANSLATIONS.de;
    let str = lang[key] || TRANSLATIONS.de[key] || key;
    if (params) {
        for (const [k, v] of Object.entries(params)) {
            str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
        }
    }
    return str;
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('sk_lang', lang);
    applyI18nToHTML();
    // Rebuild dynamic content
    if (typeof buildAll === 'function') {
        if (typeof buildSettingsRowOptions === 'function') buildSettingsRowOptions();
        if (typeof updateInstructions === 'function') updateInstructions();
        buildAll();
        renderComponents();
    }
}

function applyI18nToHTML() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        el.textContent = t(key);
    });
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        el.title = t(el.dataset.i18nTitle);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        el.placeholder = t(el.dataset.i18nPlaceholder);
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        el.textContent = t(el.dataset.i18nHtml);
    });
    // Update page title
    const pn = typeof projectName !== 'undefined' ? projectName : '';
    document.title = pn ? `${pn} \u2014 ${t('appTitle')}` : t('appTitle');
}

function getAvailableLanguages() {
    return Object.keys(TRANSLATIONS);
}
