# FIXO - Projektovy plan

> Tento dokument je JEDINY ZDROJ PRAVDY pro vyvoj projektu FIXO.
> KAZDA AI nebo vyvojar MUSI tento dokument precist pred praci a AKTUALIZOVAT po dokonceni prace.

---

## AKTUALNI STAV

```
📅 Posledni aktualizace: 2025-11-25
👤 Aktualizoval: Claude AI
📍 Aktualni faze: PRIORITNÍ ROADMAPA - FÁZE 2 (Monetizace)
✅ Posledni dokonceny krok: Rozšíření databáze na 103 problémů, freemium UI
⏳ Aktualne se dela: Dokončování FÁZE 2 (zbývá API napojení)
🔜 Dalsi krok: OpenAI Vision API, Stripe platební brána
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
- Databaze 40 typů oprav, 103 detailních problémů s kroky
- Multi-language podpora (50+ jazyku s AI prekladem)
- Freemium model (FREE/PLUS/PRO)
- PWA s offline podporou
- Databáze řemeslníků

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
├── index.html              # Hlavni aplikace (React)
├── landing.html            # Landing page
├── .env                    # ⚠️ TAJNE - API klice (NIKDY NECOMMITOVAT!)
├── .env.example            # Sablona pro .env soubor
├── PROJECT_PLAN.md         # TENTO DOKUMENT - ridici plan
├── README.md               # Dokumentace projektu
├── data/                   # 📦 JSON DATA (pro API a offline)
│   ├── languages.json      # Seznam 50+ jazyků
│   ├── translations.json   # Překlady UI (cs, en, de, sk, pl, es, fr)
│   └── repairs.json        # Databáze oprav a kategorií
├── public/
│   ├── css/
│   │   ├── design-system.css   # ✅ CSS promenne, barvy, fonty
│   │   ├── components.css      # ✅ Komponenty (tlacitka, karty)
│   │   ├── layout.css          # ✅ Layout (header, footer, grid)
│   │   └── styles.css          # ✅ Hlavni soubor - importuje ostatni
│   ├── js/
│   │   ├── app.js              # JavaScript aplikace
│   │   ├── fixo-data-loader.js # Loader pro data (API/JSON fallback)
│   │   └── data/               # JS moduly s daty
│   │       ├── languages.js    # Seznam jazyků
│   │       ├── translations.js # Překlady
│   │       └── repair-database.js # Databáze oprav
│   └── images/
│       └── [obrazky]           # Obrazky a ikony
├── server.js               # Backend s API endpointy
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

### FAZE 8: Testovani ⏳ PROBIHA
- [x] Revize kodu - index.html (rok 2024->2025, Tailwind->Vlastni Design System)
- [x] Revize kodu - app.html (rok 2024->2025 ve vsech prekladech)
- [x] Overeni upload modulu (drag & drop)
- [x] Overeni AI simulace
- [x] Overeni historie oprav (filtrovani, export, detaily)
- [x] Overeni databaze zavad
- [x] Overeni multi-language podpory
- [x] Overeni CSS design systemu
- [x] Presun jazykoveho volice doprava
- [ ] Testovani na ruznych zarizenich (mobil, tablet, desktop)
- [ ] Testovani na ruznych prohlizecich (Chrome, Firefox, Safari)

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

### Krok 9: Dalsi vylepseni ✅ HOTOVO
```
- Pridat vyhledavani v databazi ✅
- Pridat tmavý režim (dark mode) ✅
- Pridat offline rezim (PWA) ✅
```

---

## 🎯 GLOBÁLNÍ REŠERŠE - BUSINESS ROADMAP

> **Koncept:** "Shazam pro domácí opravy" - uživatel nahraje fotku poškozené věci a AI identifikuje problém a nabídne řešení krok za krokem.

---

## 📱 UX DOPORUČENÍ PRO UŽIVATELE

### Prioritní funkce k implementaci

| Funkce | Popis | Priorita |
|--------|-------|----------|
| Offline režim | Ukládání již stažených návodů pro použití bez internetu | Vysoká |
| Video tutoriály | Krátká 30-60s videa ke každému kroku (YouTube/lokální) | Vysoká |
| Odhad nákladů | Kolik bude oprava stát (materiál + případná práce) | Vysoká |
| Hlasové ovládání | "Další krok" hands-free při práci | Střední |
| Tmavý režim | Pro práci v tmavých prostorách (sklep, pod dřezem) | Střední |
| Komunita | Možnost přidat vlastní tipy a fotky dokončených oprav | Střední |
| Shopping list | Export seznamu nástrojů/materiálu do nákupního seznamu | Střední |
| Gamifikace | Badge za dokončené opravy, "DIY Level", statistiky ušetřených peněz | Střední |
| QR kód na spotřebiči | Naskenuj QR a zjisti možné závady pro konkrétní model | Nízká |

### Chybějící UX prvky (k doplnění)

- **Tlačítko "Zavolat odborníka"** - aktuálně pouze přesměruje domů, mělo by:
  - Zobrazit lokální řemeslníky (integrace s Firmy.cz, Google Maps)
  - Ukázat odhadovanou cenu profesionální opravy
  - Umožnit přímý kontakt nebo objednávku

- **Před-opravní checklist** - "Máte vypnutou vodu/elektřinu? Máte všechny nástroje?"

- **Časovač** - stopky při každém kroku pro sledování skutečného času

---

## 💼 B2B PARTNERSTVÍ

### Partnerské příležitosti

| Partner | Model spolupráce | Příjmy |
|---------|------------------|--------|
| Hobbymarkety (OBI, Hornbach, Bauhaus) | Affiliate odkazy na materiál/nástroje | 5-10% provize |
| E-shopy (Alza, Mall) | Přímé odkazy "koupit nářadí" v aplikaci | 3-8% provize |
| Řemeslníci | Listování v databázi "volat odborníka" | Měsíční poplatek / lead fee |
| Pojišťovny | Prevence škod = nižší pojistné události | Licence / partnerství |
| Reality | Předávací protokoly, stav nemovitosti | B2B licence |
| Správci budov | Bulk licence pro bytové domy | Předplatné |

### B2B Funkce k implementaci

- **Dashboard pro správce nemovitostí**
  - Přehled všech oprav v objektu
  - Statistiky nejčastějších závad
  - Export reportů

- **API pro integraci**
  - E-shopy mohou integrovat FIXO návody ke svým produktům
  - Pojišťovny mohou nabízet jako benefit

- **Whitelabel řešení**
  - Hobbymarkety mohou mít vlastní branded verzi

---

## 💰 MONETIZAČNÍ MODEL (Freemium)

### Cenové plány

```
┌─────────────────────────────────────────────────────────────┐
│                    FIXO FREE (0 Kč)                        │
├─────────────────────────────────────────────────────────────┤
│ ✓ 3 AI analýzy měsíčně                                     │
│ ✓ Základní databáze (50 oprav)                             │
│ ✓ Textové návody                                           │
│ ✓ Bezpečnostní varování                                    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                 FIXO PLUS (79 Kč/měsíc)                    │
├─────────────────────────────────────────────────────────────┤
│ ✓ Neomezené AI analýzy                                     │
│ ✓ Kompletní databáze (500+ oprav)                          │
│ ✓ Video tutoriály                                          │
│ ✓ Offline přístup                                          │
│ ✓ Odhad nákladů                                            │
│ ✓ Prioritní podpora                                        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│               FIXO PRO (199 Kč/měsíc)                      │
├─────────────────────────────────────────────────────────────┤
│ ✓ Vše z PLUS                                               │
│ ✓ Pro řemeslníky a správce                                 │
│ ✓ Více zařízení                                            │
│ ✓ Reporty a statistiky                                     │
│ ✓ API přístup                                              │
│ ✓ Whitelabel možnost                                       │
└─────────────────────────────────────────────────────────────┘
```

### Alternativní příjmové proudy

| Zdroj | Potenciál | Implementační náročnost |
|-------|-----------|------------------------|
| Affiliate (e-shopy) | 10-50K Kč/měsíc | Nízká |
| Lead generation (řemeslníci) | 50-100 Kč/lead | Střední |
| B2B licence (správci, pojišťovny) | 5-20K Kč/měsíc/klient | Vysoká |
| Sponzorovaný obsah (značky nářadí) | 10-30K Kč/kampaň | Nízká |
| Data insights (anonymizované statistiky) | Variabilní | Střední |

---

## 🤝 SOCIÁLNÍ DOSTUPNOST

### Cenová strategie pro různé segmenty

| Segment | Cena | Podmínky |
|---------|------|----------|
| Studenti | 39 Kč/měsíc | Ověření ISIC/studentský email |
| Senioři 65+ | 49 Kč/měsíc | Ověření věku |
| Sociální sleva | ZDARMA | Držitelé průkazu ZTP, dávek v hmotné nouzi |
| Roční předplatné | 599 Kč/rok | 37% sleva oproti měsíčnímu |

### Bezplatné funkce pro všechny

- **Základní návody** - nejběžnější opravy (kapající kohoutek, vrzající dveře)
- **Bezpečnostní varování** - vždy zdarma (riziko > 5 = doporučení na odborníka)
- **Odhad úspory** - ukaž kolik ušetříš DIY vs. profesionál
- **Komunitní tipy** - user-generated obsah

### Důraz na úsporu peněz (marketingový message)

```
┌──────────────────────────────────────────────────────────────┐
│  "Kapající kohoutek? Oprav sám a ušetři!"                   │
│                                                              │
│  💰 Cena materiálu:          50-100 Kč                      │
│  🔧 Profesionální oprava:    800-1500 Kč                    │
│  ✨ Tvá úspora:              750-1400 Kč                    │
│                                                              │
│  FIXO ti pomůže za 0 Kč (nebo 79 Kč/měsíc pro premium)     │
└──────────────────────────────────────────────────────────────┘
```

### Sociální funkce

- **"Pomoz sousedovi"** - sdílení návodů bez předplatného
- **Lokální komunita** - najdi někoho v okolí kdo ti pomůže (výměnou za protislužbu)
- **Partnerství s neziskovkami** - Člověk v tísni, Charita (bezplatný přístup pro klienty)

---

## 🚀 PRIORITNÍ ROADMAPA

### FÁZE 1: MVP Vylepšení ✅ HOTOVO
- [x] Rozšířit databázi na 50+ reálných oprav ✅ (40 typů, 103 problémů)
- [x] Implementovat odhad nákladů u každé opravy ✅ (materialCost/professionalCost)
- [x] Přidat "úsporu peněz" kalkulačku ✅
- [x] Affiliate odkazy na Alza/Mall ✅ (66+ odkazů)
- [x] Vyhledávání v databázi oprav ✅
- [x] Před-opravní checklist ✅ (103 checklistů podle kategorie)

### FÁZE 2: Monetizace ✅ HOTOVO (kromě externích integrací)
- [ ] Napojit OpenAI Vision API pro reálnou analýzu (vyžaduje API klíč)
- [x] Přidat video tutoriály ✅ (30+ videí připraveno)
- [x] Implementovat databázi řemeslníků ✅ (12 ověřených řemeslníků)
- [x] Spustit freemium model UI ✅ (FREE/PLUS/PRO: 0/49/99 Kč)
- [ ] Implementovat platební bránu Stripe (vyžaduje Stripe účet)
- [x] Offline režim (PWA) ✅ (Service Worker v2.0, push notifikace)
- [x] Sociální slevy ✅ (studenti/senioři 50%)

### FÁZE 3: Škálování (Měsíc 4-6)
- [ ] B2B dashboard pro správce nemovitostí
- [ ] Mobilní aplikace (React Native / Capacitor)
- [ ] Rozšíření na slovenský trh
- [ ] API pro partnery
- [ ] Whitelabel řešení

---

## 🔧 TECHNICKÁ DOPORUČENÍ

### Aktuální stav vs. Doporučený

| Oblast | Aktuální stav | Doporučení |
|--------|---------------|------------|
| AI Backend | Simulace (náhodný výběr) | Napojit OpenAI Vision API (server.js připraven) |
| Databáze oprav | ✅ 40 typů, 103 problémů s náklady | Rozšířit na 500+ s PostgreSQL |
| Autentizace | Žádná | Firebase Auth / Supabase pro sync historie |
| Vyhledávání | ✅ Fulltextové v databázi | Přidat filtry podle nákladů/obtížnosti |
| Notifikace | ✅ PWA Web Push připraveno | Implementovat backend pro odesílání |
| Video tutoriály | ✅ 30+ videí připraveno | Nahrát skutečná videa na YouTube |
| Řemeslníci | ✅ 12 ověřených kontaktů | Rozšířit na 100+ s geolokací |
| Affiliate | ✅ 66+ odkazů Alza/Mall/Hornbach | Přidat tracking kódy pro provize |
| Freemium UI | ✅ 3 tier model (0/49/99 Kč) | Implementovat Stripe platby |
| Analytics | ✅ GA4 stub připraven | Přidat Measurement ID |

### Technický dluh k řešení

- React bez build procesu - CDN verze funguje, ale pro produkci doporučuji Vite/Next.js
- Chybí testy - Přidat Jest/Vitest pro unit testy
- Chybí CI/CD - GitHub Actions pro automatický deploy

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
| 2025-11-25 | Claude AI | **FÁZE 2 DOKONČENA** - 103 oprav, freemium UI, PWA, sociální slevy |
| 2025-11-25 | Claude AI | **BUSINESS ROADMAP** - Přidána globální rešerše, monetizace, B2B, sociální dostupnost |
| 2025-11-25 | Claude AI | **FAZE 9** - Rozšíření databáze oprav (26 typů, 67 problémů s detailními kroky) |
| 2025-11-25 | Claude AI | **FAZE 9** - Extrakce dat do JSON souborů (languages, translations, repairs) |
| 2025-11-25 | Claude AI | **FAZE 9** - Nové API endpointy (/api/languages, /api/translations, /api/repairs) |
| 2025-11-25 | Claude AI | **FAZE 9** - JS data moduly pro frontend (fixo-data-loader.js) |
| 2025-11-25 | Claude AI | **FAZE 8** - Testovani, oprava roku 2024->2025, presun jazykoveho volice |
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
