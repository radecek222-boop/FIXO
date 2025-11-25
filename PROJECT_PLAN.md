# FIXO - Projektovy plan

> Tento dokument je JEDINY ZDROJ PRAVDY pro vyvoj projektu FIXO.
> KAZDA AI nebo vyvojar MUSI tento dokument precist pred praci a AKTUALIZOVAT po dokonceni prace.

---

## AKTUALNI STAV

```
📅 Posledni aktualizace: 2025-11-25
👤 Aktualizoval: Claude AI
📍 Aktualni faze: FAZE 6 HOTOVA - Vsechny moduly dokonceny
✅ Posledni dokonceny krok: Historie oprav (filtrovani, export CSV, detaily)
⏳ Aktualne se dela: Testovani a optimalizace
🔜 Dalsi krok: FAZE 8 - Testovani nebo FAZE 7 - Backend (volitelne)
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
- Multi-language podpora (50+ jazyku s AI prekladem)

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
├── .env                    # ⚠️ TAJNE - API klice (NIKDY NECOMMITOVAT!)
├── .env.example            # Sablona pro .env soubor
├── PROJECT_PLAN.md         # TENTO DOKUMENT - ridici plan
├── README.md               # Dokumentace projektu
├── public/
│   ├── css/
│   │   ├── design-system.css   # ✅ CSS promenne, barvy, fonty (312 radku)
│   │   ├── components.css      # ✅ Komponenty (tlacitka, karty) (660 radku)
│   │   ├── layout.css          # ✅ Layout (header, footer, grid) (603 radku)
│   │   └── styles.css          # ✅ Hlavni soubor - importuje ostatni
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

### FAZE 3: UI/UX Design system ✅ HOTOVO
- [x] **design-system.css** - CSS promenne (barvy, fonty, spacing, radius)
- [x] **components.css** - Tlacitka, karty, formulare, alerty, badges
- [x] **layout.css** - Header, footer, grid system, kontejnery
- [x] **styles.css** - Hlavni vstupni bod s importy

### FAZE 4: Sablony (Templates) ⏭️ PRESKOCENO
> Sablony budou vytvoreny podle potreby v ramci FAZE 5-6

### FAZE 5: Hlavni stranka ✅ HOTOVO
- [x] Aplikovat design system na index.html
- [x] Aplikovat design system na app.html
- [x] Otestovat na GitHub Pages (merge do main)
- [x] Responzivita (mobil, tablet, desktop)

### FAZE 6: Moduly aplikace ✅ HOTOVO
- [x] Modul: Upload fotografii (drag & drop)
- [x] Modul: AI analyza (rozsirena databaze - 13 objektu, 11 kategorii)
- [x] Modul: Vysledky analyzy
- [x] Modul: Pruvodce opravou (kroky)
- [x] Modul: Historie oprav (filtrovani, export CSV, detail opravy)
- [x] Modul: Databaze zavad (filtrovani kategorii)
- [x] Modul: Multi-language (50+ jazyku, AI preklad, permanentni cache)

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

### ✅ Krok 1: Aplikovat design system na index.html - HOTOVO
### ✅ Krok 2: Aplikovat design system na app.html - HOTOVO
### ✅ Krok 3: Responzivita a mobilni menu - HOTOVO
### ✅ Krok 4: Merge do main a test na GitHub Pages - HOTOVO
### ✅ Krok 5: Drag & drop upload - HOTOVO
### ✅ Krok 6: Rozsirena databaze zavad (13 objektu) - HOTOVO
### ✅ Krok 7: Filtrovani kategorii v databazi - HOTOVO

### Krok 8: Vylepsit historii oprav ⏳
```
- Pridat filtrovani podle stavu (dokonceno/probiha)
- Pridat filtrovani podle data
- Pridat moznost exportu do PDF/CSV
- Pridat detailni prehled opravy
```

### Krok 9: Dalsi vylepseni (volitelne)
```
- Pridat vyhledavani v databazi
- Pridat tmavý režim (dark mode)
- Pridat offline rezim (PWA)
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
| 2025-11-25 | Claude AI | **FAZE 6 HOTOVA** - Historie oprav (filtrovani, export CSV, detaily) |
| 2025-11-25 | Claude AI | Predgenerovane preklady pro GitHub Pages (7 jazyku offline) |
| 2025-11-25 | Claude AI | **FAZE 6** - Multi-language podpora (50+ jazyku, AI preklad, cache) |
| 2025-11-25 | Claude AI | Pridani /api/translate endpointu pro AI preklad |
| 2025-11-25 | Claude AI | Implementace permanentni cache prekladu (localStorage) |
| 2025-11-25 | Claude AI | **FAZE 7** - OpenAI Vision API integrace do backendu |
| 2025-11-25 | Claude AI | Bezpecne ulozeni API klicu (.env) |
| 2025-11-25 | Claude AI | Frontend pripojeni k backend AI |
| 2025-11-25 | Claude AI | **FAZE 6** - Filtrovani kategorii v databazi zavad |
| 2025-11-25 | Claude AI | **FAZE 6** - Rozsirena databaze (13 objektu, 11 kategorii) |
| 2025-11-25 | Claude AI | **FAZE 6** - Drag & drop upload fotografii |
| 2025-11-25 | Claude AI | **FAZE 5 HOTOVA** - Design system aplikovan na HTML |
| 2025-11-25 | Claude AI | Aktualizace index.html (vlastni CSS misto Tailwind) |
| 2025-11-25 | Claude AI | Aktualizace app.html (React s design systemem) |
| 2025-11-25 | Claude AI | **FAZE 3 HOTOVA** - Kompletni design system |
| 2025-11-25 | Claude AI | Vytvoreni design-system.css (CSS promenne) |
| 2025-11-25 | Claude AI | Vytvoreni components.css (tlacitka, karty, formulare) |
| 2025-11-25 | Claude AI | Vytvoreni layout.css (grid, header, footer, sekce) |
| 2025-11-25 | Claude AI | Aktualizace styles.css s importy |
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
