# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projekt

Persönliche Visitenkarten-Webpage für **Paul Kiefer** (Online-Alias: **paulguappe**).
Vorgaben aus `README.md`:

- Stack: **vanilla HTML / CSS / JS** (kein Framework, kein Build-Step)
- Hosting: **GitHub Pages** — Auslieferung muss als statische Seite direkt aus dem Repo funktionieren
- Sprache der Inhalte: **Deutsch**
- Struktur laut README: Hobbies (Komponieren / Produzieren) + Beruf (Tontechniker nach dem Studium)
- README explizit: „denk Dir was aus passend zu online gefundenen Daten" → kreative Ergänzung erwünscht, solange sie zur recherchierten Persona passt

## Quelle der inhaltlichen Wahrheit

Vor jedem Texten/Designen `data/` lesen. Dort liegen die einzigen belastbaren Fakten:

- `data/paul-kiefer.json` — strukturierte Persona-Daten (Identity, Tagline, Tracks, Hobbies, SoundCloud-Link). **Maschinenlesbare Quelle für Seiteninhalte.**
- `data/research.md` — Recherche-Notizen mit Quellen und Bewertung

Hinweise zur Datenpflege:

- Bei neuen Recherche-Ergebnissen: erst `paul-kiefer.json` ergänzen, dann `research.md` mit Quelle und Datum nachziehen.
- **Nicht** Daten von Personen mit ähnlichen Aliasen einmischen (z. B. `paulquappe` / Paul Sichermann gehört nicht zu Paul Kiefer — wurde bewusst ausgeschlossen).

## Konventionen für die Webpage

- Alles aus `data/paul-kiefer.json` ableiten, statt Texte hart zu duplizieren — bei kleinen Sites darf JS das JSON direkt fetchen.
- Tagline **„Basstherapy & Eargasms"** ist die etablierte Selbstbeschreibung — falls als Claim verwendet, wörtlich übernehmen.
- SoundCloud-Tracks dürfen via offiziellem SoundCloud-Embed eingebunden werden (Track-URLs stehen im JSON).
- Da Ziel GitHub Pages ist: relative Pfade, keine Server-Abhängigkeiten, keine env-Variablen.

## Lokales Entwickeln

Noch kein Build-System vorhanden. Sobald `index.html` existiert, reicht zum Anschauen:

```
python3 -m http.server 8000
```

und Browser auf http://localhost:8000 — kein npm/yarn nötig, solange der Stack vanilla bleibt.
