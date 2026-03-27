# Sicherungskasten-Planer (DIN Rail Planner)

Ein interaktiver, browserbasierter Planer zum Konfigurieren von Sicherungskästen (Unterverteilungen). Komplett clientseitig — kein Server nötig.

**[Live-Demo](https://revoltek-daniel.github.io/din-rail-planner/)**

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
- Jeder Kasten individuell konfigurierbar: 1-6 Reihen, 3-36 TE Breite
- Eingebaute N- und PE-Klemmschienen pro Kasten (optional)
- Kästen benennen und per Zahnrad-Button konfigurieren
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

### Projekt
- Projektname (Doppelklick zum Umbenennen, wird im Browser-Tab angezeigt)
- Automatisches Speichern im Browser (localStorage)
- Export/Import als JSON-Datei
- Alles löschen / Kabel löschen

## Verwendung

Keine Installation nötig. Einfach das Repository klonen oder herunterladen und `index.html` im Browser öffnen:

```bash
git clone https://github.com/revoltek-daniel/din-rail-planner.git
cd din-rail-planner
open index.html
# oder: xdg-open index.html (Linux)
# oder: start index.html (Windows)
```

Alternativ auf einem beliebigen Webserver hosten — es werden keine Backend-Dienste benötigt.

## Dateistruktur

```
sicherung/
├── index.html   # HTML-Struktur und UI-Elemente
├── style.css    # Alle Styles
├── app.js       # Komplette Anwendungslogik
├── LICENSE      # MIT-Lizenz
└── README.md    # Diese Datei
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

## Lizenz

MIT — siehe [LICENSE](LICENSE)
