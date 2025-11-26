# FIXO - Aplikace pro okamžité opravy domácích závad

> "Fix Anything. Anywhere. Instantly."

---

## 🎉 NOVÁ OPTIMALIZOVANÁ STRUKTURA

Projekt byl kompletně přepsán s čistou, modulární strukturou pro maximální výkon na GitHub Pages!

---

## O aplikaci

FIXO je webová aplikace pro rychlou identifikaci a opravu domácích závad pomocí AI analýzy fotografií. Funguje na principu "Shazam pro domácí opravy" - stačí nahrát fotku poškozené věci a systém automaticky identifikuje problém a nabídne řešení.

## 🔗 Odkazy

| Co | Odkaz |
|----|-------|
| **Živá aplikace** | https://radecek222-boop.github.io/FIXO/ |
| **Plan projektu** | [PROJECT_PLAN.md](PROJECT_PLAN.md) |
| **Repository** | https://github.com/radecek222-boop/FIXO |

## 📁 Struktura projektu

```
FIXO/
├── index.html              # Hlavní HTML (čistý, 55 řádků)
├── manifest.json           # PWA manifest
├── service-worker.js       # Offline podpora
│
├── src/
│   └── app.js              # React aplikace (4820 řádků)
│
├── styles/
│   ├── main.css            # Hlavní stylesheet (importuje vše)
│   ├── design-system.css   # Design tokens (oklch barvy, spacing)
│   ├── components.css      # UI komponenty
│   ├── layout.css          # Layout systém
│   └── app.css             # Aplikační styly
│
├── data/
│   ├── repairs.json        # 343 KB databáze oprav
│   ├── craftsmen.json      # Databáze řemeslníků
│   ├── translations.json   # Překlady
│   └── languages.json      # Seznam jazyků
│
├── assets/
│   └── icons/              # PWA ikony (72-512px)
│
└── docs/
    ├── PROJECT_PLAN.md     # 📋 Projektový plán
    ├── ROADMAP_2025.md     # Roadmapa vývoje
    └── README.md           # Tento soubor
```

## ✨ Hlavní vylepšení

### Před (v1):
- ❌ Monolitický `index.html` (5370 řádků)
- ❌ Nestrukturovaný kód
- ❌ Inline CSS
- ❌ Těžko udržovatelné

### Po (v2 optimalizované):
- ✅ Čistý `index.html` (55 řádků)
- ✅ Oddělené moduly (HTML/CSS/JS)
- ✅ Moderní CSS design system (oklch barvy)
- ✅ Snadno rozšiřitelné
- ✅ Rychlejší načítání
- ✅ Lepší cache strategie

## 🚀 Rychlý start

### Otevřít lokálně
```bash
# Stáhnout repozitář
git clone https://github.com/radecek222-boop/FIXO.git
cd FIXO

# Otevřít v prohlížeči
open index.html
# nebo
python -m http.server 8000
# http://localhost:8000
```

### Nasadit na GitHub Pages
```bash
git add .
git commit -m "Update"
git push origin main
```

Aplikace běží automaticky na: `https://radecek222-boop.github.io/FIXO/`

## 🎨 Design System

Moderní CSS s funkcemi pro příštích 30 let:

- **CSS Layers** - Pro správnou specificitu
- **oklch() barvy** - Lepší vnímání barev
- **Container Queries** - Responzivní komponenty
- **Logical Properties** - Podpora RTL jazyků
- **Variable Fonts** - Inter font
- **View Transitions** - Připraveno
- **Preference Queries** - Dark mode ready

### Barvy

```css
--color-primary: oklch(55% 0.22 264);    /* Indigo */
--color-secondary: oklch(65% 0.15 195);   /* Teal */
--color-success: oklch(55% 0.18 145);     /* Green */
--color-warning: oklch(75% 0.18 85);      /* Amber */
--color-danger: oklch(55% 0.22 25);       /* Red */
```

## 📱 Funkce

- ✅ AI analýza fotografií závad
- ✅ Krok za krokem návody (103+ oprav)
- ✅ Bezpečnostní upozornění
- ✅ Historie oprav
- ✅ Offline režim (PWA)
- ✅ Multi-language (50+ jazyků)
- ✅ Responzivní design
- ✅ Databáze řemeslníků
- ✅ Affiliate odkazy (Alza, Mall, Hornbach)
- ✅ Video tutoriály

## 🏗️ Technologie

- **Frontend:** React 18 (CDN)
- **Styling:** Modern CSS (oklch, layers, container queries)
- **PWA:** Service Worker, Manifest
- **Hosting:** GitHub Pages
- **AI:** OpenAI Vision (připraveno)
- **i18n:** 50+ jazyků

## 📊 Kategorie závad

🚰 Voda | ⚡ Elektřina | 🌡️ Topení | ⚙️ Mechanika | 🪑 Nábytek | 🚪 Dveře
🏠 Stěny | 🔌 Spotřebiče | 🍳 Kuchyň | 🚿 Koupelna | 🌱 Zahrada | 🚗 Auto

## 🔧 Vývoj

### Struktura souborů

- `src/app.js` - Hlavní React komponenta
- `styles/` - CSS moduly
- `data/` - JSON databáze
- `service-worker.js` - PWA offline cache

### Přidání nové opravy

1. Editovat `data/repairs.json`
2. Přidat kategorii, objekt, problém
3. Commit a push

### Přidání překladu

1. Editovat `data/translations.json`
2. Přidat nový jazyk
3. Commit a push

## 📈 Statistiky

- **Databáze:** 103 detailních oprav
- **Jazyky:** 50+ světových jazyků
- **Kategorie:** 12 hlavních kategorií
- **Velikost:** ~500 KB (včetně dat)
- **Načítání:** < 2s (první návštěva)
- **Offline:** Ano (PWA)

## 🎯 Roadmapa

### V1 ✅ HOTOVO
- [x] Základní aplikace
- [x] 103 oprav v databázi
- [x] Multi-language
- [x] PWA podpora
- [x] GitHub Pages deployment

### V2 🚧 Optimalizace (PRÁVĚ HOTOVO!)
- [x] Oddělení HTML/CSS/JS
- [x] Moderní CSS design system
- [x] Optimalizace struktury
- [x] Vyčištění kódu

### V3 🔮 Budoucnost
- [ ] Skutečná AI integrace (OpenAI)
- [ ] Backend API
- [ ] Uživatelské účty
- [ ] Monetizace (Freemium)
- [ ] Mobilní aplikace

## 📄 Licence

MIT

---

## 👨‍💻 Pro vývojáře

### Před prací
1. Přečti [PROJECT_PLAN.md](PROJECT_PLAN.md)
2. Zkontroluj aktuální stav
3. Pracuj podle plánu

### Po práci
1. Aktualizuj [PROJECT_PLAN.md](PROJECT_PLAN.md)
2. Commit změny
3. Push na GitHub

---

**FIXO Team** | 2024-2025 | Česká republika 🇨🇿
