# FIXO - Projektovy plan

> Tento dokument je JEDINY ZDROJ PRAVDY pro vyvoj projektu FIXO.
> KAZDA AI nebo vyvojar MUSI tento dokument precist pred praci a AKTUALIZOVAT po dokonceni prace.

---

## AKTUALNI STAV

```
📅 Posledni aktualizace: 2024-11-25
👤 Aktualizoval: Claude AI
📍 Aktualni faze: FAZE 3 - Design system
✅ Posledni dokonceny krok: Presun HTML do korene pro GitHub Pages
⏳ Aktualne se dela: Vytvoreni PROJECT_PLAN.md
🔜 Dalsi krok: Vytvorit design-system.css
```

---

## O PROJEKTU

**Nazev:** FIXO
**Typ:** Webova aplikace pro diagnostiku domacich zavad
**Koncept:** "Shazam pro domaci opravy"
**GitHub Pages:** https://radecek222-boop.github.io/FIXO/
**Repository:** https://github.com/radecek222-boop/FIXO

### Hlavni funkce
- AI analyza fotografii zavad
- Krok za krokem navody na opravu
- Bezpecnostni upozorneni
- Historie oprav
- Databaze 500+ zavad

### Cilova skupina
- Domacnosti bez technickych znalosti
- Kutilove a DIY nadsenci
- Spravci nemovitosti
- Studenti
- Seniori

---

## STRUKTURA PROJEKTU

```
FIXO/
├── index.html              # Landing page (hlavni informacni stranka)
├── app.html                # FIXO aplikace (React)
├── PROJECT_PLAN.md         # TENTO DOKUMENT - ridici plan
├── README.md               # Dokumentace projektu
├── public/
│   ├── css/
│   │   ├── design-system.css   # [VYTVORIT] CSS promenne, barvy, fonty
│   │   ├── components.css      # [VYTVORIT] Komponenty (tlacitka, karty)
│   │   ├── layout.css          # [VYTVORIT] Layout (header, footer, grid)
│   │   └── styles.css          # Stary soubor - NAHRADIT
│   ├── js/
│   │   └── app.js              # JavaScript aplikace
│   └── images/
│       └── [prazdne]           # Obrazky a ikony
├── server.js               # Backend (pro lokalni vyvoj, NE pro GitHub Pages)
├── package.json
├── Dockerfile
├── docker-compose.yml
└── nginx.conf
```

---

## FAZE VYVOJE

### FAZE 1: Specifikace a navrh ✅ HOTOVO
- [x] Ucel aplikace definovan
- [x] Cilovy uzivatel definovan
- [x] Hlavni funkce sepsany
- [x] Informacni architektura

### FAZE 2: Technicky navrh ✅ HOTOVO
- [x] Vyber technologii (React, Tailwind, Node.js)
- [x] Struktura projektu vytvorena
- [x] GitHub Pages nakonfigurovano

### FAZE 3: UI/UX Design system ⏳ PROBIHA
- [ ] **design-system.css** - CSS promenne (barvy, fonty, spacing, radius)
- [ ] **components.css** - Tlacitka, karty, formulare, alerty, badges
- [ ] **layout.css** - Header, footer, grid system, kontejnery
- [ ] Dokumentace komponent

### FAZE 4: Sablony (Templates) 🔜 DALSI
- [ ] Zakladni layout stranka (header + content + footer)
- [ ] Sablona pro formulare
- [ ] Sablona pro seznamy/karty
- [ ] Sablona pro modaly

### FAZE 5: Hlavni stranka ⬚ CEKA
- [ ] Aplikovat design system na index.html
- [ ] Aplikovat design system na app.html
- [ ] Otestovat na GitHub Pages
- [ ] Responzivita (mobil, tablet, desktop)

### FAZE 6: Moduly aplikace ⬚ CEKA
- [ ] Modul: Upload fotografii
- [ ] Modul: AI analyza (simulovana)
- [ ] Modul: Vysledky analyzy
- [ ] Modul: Pruvodce opravou (kroky)
- [ ] Modul: Historie oprav
- [ ] Modul: Databaze zavad

### FAZE 7: Backend ⬚ CEKA (volitelne)
- [ ] Nasadit backend na Render.com nebo Railway
- [ ] Napojit frontend na API
- [ ] Databaze (PostgreSQL)
- [ ] Autentizace uzivatelu

### FAZE 8: Testovani ⬚ CEKA
- [ ] Manualni testy vsech funkci
- [ ] Testovani na ruznych zarizenich
- [ ] Testovani na ruznych prohlizecich

### FAZE 9: Optimalizace ⬚ CEKA
- [ ] Rychlost nacitani
- [ ] Minimalizace CSS/JS
- [ ] Obrazky optimalizace

### FAZE 10: Finalizace ⬚ CEKA
- [ ] Finalni testovani
- [ ] Dokumentace
- [ ] Prezentace

---

## DALSI KROKY (co delat ted)

### Krok 1: Vytvorit design-system.css
```
Soubor: public/css/design-system.css
Obsah:
- CSS promenne (:root)
- Barvy (primary, secondary, success, warning, danger)
- Texty (primary, secondary, muted)
- Pozadi (primary, secondary, tertiary)
- Fonty (family, sizes, weights)
- Spacing (xs, sm, md, lg, xl, 2xl)
- Border radius (sm, md, lg, full)
- Shadows (sm, md, lg, xl)
- Transitions
- Z-index vrstvy
```

### Krok 2: Vytvorit components.css
```
Soubor: public/css/components.css
Obsah:
- Tlacitka (.btn, .btn-primary, .btn-secondary, .btn-success, .btn-danger)
- Karty (.card, .card-header, .card-body, .card-footer)
- Formulare (.form-group, .form-label, .form-input, .form-select)
- Alerty (.alert, .alert-success, .alert-warning, .alert-danger)
- Badges (.badge, .badge-primary, .badge-success)
- Progress bar (.progress, .progress-bar)
- Spinner (.spinner)
```

### Krok 3: Vytvorit layout.css
```
Soubor: public/css/layout.css
Obsah:
- Reset zakladni
- Container (.container, .container-sm, .container-lg)
- Grid system (.grid, .grid-2, .grid-3, .grid-4)
- Flexbox helpers (.flex, .flex-center, .flex-between)
- Header (.header, .header-content, .logo, .nav)
- Footer (.footer)
- Sekce (.section, .section-gray)
- Spacing utility classes (.mt-1, .mb-2, .p-4, atd.)
```

### Krok 4: Upravit HTML soubory
```
- Pridat <link> na nove CSS soubory
- Nahradit Tailwind tridy vlastnimi tridami
- Otestovat
```

---

## BAREVNA PALETA (schvalena)

```css
/* Hlavni barvy */
--color-primary: #2563eb;        /* Modra - hlavni akcni barva */
--color-primary-hover: #1d4ed8;
--color-secondary: #06b6d4;      /* Cyan - sekundarni */

/* Stavove barvy */
--color-success: #16a34a;        /* Zelena - uspech */
--color-warning: #eab308;        /* Zluta - varovani */
--color-danger: #dc2626;         /* Cervena - nebezpeci/chyba */

/* Texty */
--color-text-primary: #1f2937;   /* Tmavy text */
--color-text-secondary: #6b7280; /* Sedy text */
--color-text-muted: #9ca3af;     /* Jeste svetlejsi */

/* Pozadi */
--color-bg-primary: #ffffff;     /* Bile */
--color-bg-secondary: #f3f4f6;   /* Svetle sede */
--color-bg-tertiary: #e5e7eb;    /* Sede */
--color-bg-dark: #1f2937;        /* Tmave (footer) */
```

---

## TECHNOLOGIE

| Vrstva | Technologie | Poznamka |
|--------|-------------|----------|
| Frontend | HTML, CSS, JavaScript | Vanilla + React v app.html |
| Styling | Vlastni CSS (design system) | Nahrazuje Tailwind |
| Ikony | Font Awesome 6 | CDN |
| Hosting | GitHub Pages | Staticke stranky |
| Backend | Node.js + Express | Pro lokalni vyvoj |
| Databaze | PostgreSQL | Planovano |

---

## PRAVIDLA PRO AI

1. **PRED PRACI** - Precti tento dokument
2. **PO PRACI** - Aktualizuj sekce:
   - AKTUALNI STAV (datum, kdo, faze, posledni krok, dalsi krok)
   - Zaskrtni dokoncene ukoly [x]
   - Pridej nove ukoly pokud vznikly
3. **COMMIT ZPRAVY** - Popisne, v anglictine
4. **PUSH** - Vzdy pushni zmeny na GitHub
5. **KONZISTENCE** - Dodrzuj design system, nepridavej nahodne styly

---

## HISTORIE ZMEN

| Datum | Autor | Zmena |
|-------|-------|-------|
| 2024-11-25 | Claude AI | Vytvoreni PROJECT_PLAN.md |
| 2024-11-25 | Claude AI | Presun HTML do korene pro GitHub Pages |
| 2024-11-25 | Claude AI | Restrukturace projektu (public/ slozka) |
| 2024-11-25 | Claude AI | Slouceni dokumentace do README.md |
| 2024-11-25 | Claude AI | Prvotni oprava renderovani stranek |

---

## KONTAKT

- **GitHub:** https://github.com/radecek222-boop/FIXO
- **Email:** support@fixo.app (planovano)

---

> **DULEZITE:** Tento dokument je zivym dokumentem. Aktualizuj ho pri kazde vyznamne zmene!
