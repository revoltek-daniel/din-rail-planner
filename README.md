# DIN Rail Planner

A free, open-source, browser-based planner for configuring electrical distribution boards (consumer units / Sicherungskästen). No installation, no account, no server — just open and plan.

**[Live Demo](https://revoltek-daniel.github.io/din-rail-planner/)** | **[Example Configuration](https://revoltek-daniel.github.io/din-rail-planner/?example)** | [Deutsche Version weiter unten](#sicherungskasten-planer)

## Features

### Components
- **Circuit breakers** (MCB) — 1-pole, 3-pole
- **Residual current devices** (RCD) — 2-pole, 4-pole
- **RCBO** — combined RCD + MCB in one device
- **Main switch** — 2-pole, 3-pole
- **Arc fault detection** (AFDD)
- **Terminal blocks** — N, PE, L, and 4/8/12-port configurable blocks
- **Switching devices** — impulse relay, time switch
- **Miscellaneous** — surge protector (SPD), DIN rail socket, disconnect terminal, blank cover
- **Custom element** — configurable width, color, inputs and outputs

### Panels
- Stack multiple panels vertically with different sizes
- Each panel individually configurable: 1–6 rows, 3–36 modules
- Built-in N and PE busbars per panel (optional)
- Dynamic scaling — modules adapt to available window width

### Wiring
- Main terminal block (HAK) with L1/L2/L3/N/PE
- Multi-pole terminals on all components (realistic connections)
- Automatic wire colors based on phase
- Wire markers with connection numbers and hover tooltips
- Hover lines: mouseover a component to see its connections
- Cross-panel wiring supported

### Outgoing circuits
- Define outgoing cables to consumers
- Select cable type from dropdown (NYM-J, NYY-J, H07V-U, etc.) or enter custom
- Conductors automatically derived from cable type (3x = L/N/PE, 5x = L1/L2/L3/N/PE)
- Each conductor individually connectable

### User interface
- Drag & drop from sidebar into DIN rails
- Move placed components via drag & drop
- Swap same-sized components by dropping onto each other
- Right-click context menu (edit, duplicate, move, delete)
- Arrow keys to move, Delete to remove
- Properties panel on click
- Collapsible sidebar categories
- Multi-language support (German / English) — switchable in header

### Project
- Editable project name (shown in browser tab)
- Auto-save in browser (localStorage)
- Export / Import as JSON file
- Share link — generates a compressed URL to share your configuration (copied to clipboard)

## Usage

No installation required. Clone or download and open `index.html` in any browser:

```bash
git clone https://github.com/revoltek-daniel/din-rail-planner.git
cd din-rail-planner
open index.html        # macOS
# xdg-open index.html  # Linux
# start index.html     # Windows
```

Or host on any static web server — no backend required.

### Running tests

```bash
npm install        # once, to install vitest
npm test           # run all tests
npm run test:watch # watch mode (re-runs on changes)
```

## Keyboard shortcuts

| Key | Function |
|-----|----------|
| Click | Select component / open properties |
| Double-click | Edit name (panels, circuits, project) |
| Right-click | Context menu |
| Delete | Remove selected component |
| Arrow keys | Move selected component |
| Esc | Deselect / exit wiring mode |

## Adding a language

Add a new translation block in `i18n.js` and an option to the language switcher in `index.html`:

```js
// i18n.js
const TRANSLATIONS = {
    de: { ... },
    en: { ... },
    fr: {
        appTitle: 'Planificateur de tableau électrique',
        // ... ~120 keys
    },
};
```

```html
<!-- index.html -->
<select id="langSwitcher">
    <option value="de">DE</option>
    <option value="en">EN</option>
    <option value="fr">FR</option>
</select>
```

## File structure

```
din-rail-planner/
├── index.html      # HTML structure and UI
├── style.css       # All styles
├── i18n.js         # Translations (DE, EN)
├── logic.js        # Pure logic (testable without DOM)
├── app.js          # Application logic (DOM, events, rendering)
├── logic.test.js   # Tests (vitest)
├── package.json    # Dev dependencies (vitest)
├── LICENSE         # MIT License
└── README.md
```

## License

MIT — see [LICENSE](LICENSE)

---

# Sicherungskasten-Planer

Ein kostenloser, quelloffener Planer zum Konfigurieren von Sicherungskästen und Unterverteilungen — direkt im Browser. Keine Installation, kein Konto, kein Server nötig.

**[Live-Demo](https://revoltek-daniel.github.io/din-rail-planner/)** | **[Beispielkonfiguration](https://revoltek-daniel.github.io/din-rail-planner/?example)**

## Features

### Bauteile
- **Sicherungsautomaten** (LS) — 1-polig, 3-polig
- **Fehlerstromschutzschalter** (RCD) — 2-polig, 4-polig
- **FI/LS-Kombischalter** (RCBO) — Fehlerstrom- und Überstromschutz in einem
- **Hauptschalter** — 2-polig, 3-polig
- **Brandschutzschalter** (AFDD)
- **Klemmenblöcke** — N, PE, L, sowie 4/8/12-fach mit konfigurierbarer Anschlusszahl
- **Schaltgeräte** — Stromstoßrelais, Zeitschaltuhr
- **Sonstiges** — Überspannungsschutz (SPD), Hutschienen-Steckdose, Trennklemme, Blindabdeckung
- **Frei-Element** — frei konfigurierbar (Breite, Farbe, Ein-/Ausgänge)

### Kästen
- Mehrere Kästen (Verteiler) untereinander anordnen
- Jeder Kasten individuell konfigurierbar: 1–6 Reihen, 3–36 TE Breite
- Eingebaute N- und PE-Klemmschienen pro Kasten (optional)
- Dynamische Skalierung — Slots passen sich der Fensterbreite an

### Verkabelung
- Hauptanschlussklemme (HAK) mit L1/L2/L3/N/PE
- Multi-Pol-Terminals an allen Bauteilen (realistische Anschlüsse)
- Verkabelungs-Modus per Button oder schwebendem Icon aktivieren
- Automatische Kabelfarben (phasenbasiert)
- Kabel-Marker mit Verbindungsnummern und Hover-Tooltips
- Hover-Linien: Kabelverbindungen eines Bauteils bei Mouseover anzeigen
- Kastenübergreifende Verkabelung möglich

### Abgänge
- Abgehende Kabel zu Verbrauchern definieren
- Kabeltyp aus Dropdown wählen (NYM-J, NYY-J, H07V-U, etc.) oder frei eingeben
- Adern werden automatisch aus dem Kabeltyp abgeleitet (3x = L/N/PE, 5x = L1/L2/L3/N/PE)
- Jede Ader einzeln verkabelbar

### Bedienung
- Drag & Drop aus der Seitenleiste in die DIN-Reihen
- Platzierte Bauteile per Drag & Drop verschieben
- Gleichgroße Bauteile durch Drüberziehen tauschen
- Rechtsklick-Kontextmenü (Bearbeiten, Duplizieren, Verschieben, Löschen)
- Pfeiltasten zum Verschieben, Entf zum Löschen
- Eigenschaften-Panel per Klick auf ein Bauteil
- Aufklappbare Kategorien in der Seitenleiste
- Mehrsprachig (DE/EN) — umschaltbar im Header

### Projekt
- Projektname (Doppelklick zum Umbenennen, wird im Browser-Tab angezeigt)
- Automatisches Speichern im Browser (localStorage)
- Export/Import als JSON-Datei
- Share-Link — erzeugt eine komprimierte URL zum Teilen der Konfiguration (wird in die Zwischenablage kopiert)

## Verwendung

Keine Installation nötig. Repository klonen oder herunterladen und `index.html` im Browser öffnen:

```bash
git clone https://github.com/revoltek-daniel/din-rail-planner.git
cd din-rail-planner
open index.html         # macOS
# xdg-open index.html   # Linux
# start index.html      # Windows
```

Alternativ auf einem beliebigen Webserver hosten — es werden keine Backend-Dienste benötigt.

### Tests ausführen

```bash
npm install        # einmalig, installiert vitest
npm test           # alle Tests ausführen
npm run test:watch # Watch-Modus (automatische Wiederholung bei Änderungen)
```

## Tastenkürzel

| Taste | Funktion |
|-------|----------|
| Klick | Bauteil auswählen / Eigenschaften öffnen |
| Doppelklick | Namen bearbeiten (Kästen, Abgänge, Projekt) |
| Rechtsklick | Kontextmenü |
| Entf | Ausgewähltes Bauteil löschen |
| Pfeiltasten | Ausgewähltes Bauteil verschieben |
| Esc | Auswahl aufheben / Verkabelung beenden |

## Sprache hinzufügen

Neuen Übersetzungsblock in `i18n.js` und eine Option im Sprachauswahl-Dropdown in `index.html` ergänzen:

```js
// i18n.js
const TRANSLATIONS = {
    de: { ... },
    en: { ... },
    fr: {
        appTitle: 'Planificateur de tableau électrique',
        // ... ~120 Schlüssel
    },
};
```

## Dateistruktur

```
din-rail-planner/
├── index.html      # HTML-Struktur und UI-Elemente
├── style.css       # Alle Styles
├── i18n.js         # Übersetzungen (DE, EN)
├── logic.js        # Reine Logik (testbar ohne DOM)
├── app.js          # Anwendungslogik (DOM, Events, Rendering)
├── logic.test.js   # Tests (vitest)
├── package.json    # Dev-Abhängigkeiten (vitest)
├── LICENSE         # MIT-Lizenz
└── README.md
```

## Lizenz

MIT — siehe [LICENSE](LICENSE)
