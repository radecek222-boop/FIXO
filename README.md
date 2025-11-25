# FIXO - Aplikace pro okamzite opravy domacich zavad

> "Fix Anything. Anywhere. Instantly."

---

## DULEZITE PRO VYVOJARE / AI

**Pred jakoukoli praci si VZDY precti [PROJECT_PLAN.md](PROJECT_PLAN.md)!**

Tento dokument obsahuje:
- Aktualni stav projektu
- Co je hotove / co se dela / co je dalsi
- Detailni plan vyvoje
- Pravidla a pokyny

---

## O aplikaci

FIXO je webova aplikace pro rychlou identifikaci a opravu domacich zavad pomoci AI analyzy fotografii. Funguje na principu "Shazam pro domaci opravy" - staci nahrat fotku poskozene veci a system automaticky identifikuje problem a nabidne reseni.

## Odkazy

| Co | Odkaz |
|----|-------|
| **Ziva aplikace** | https://radecek222-boop.github.io/FIXO/ |
| **Plan projektu** | [PROJECT_PLAN.md](PROJECT_PLAN.md) |
| **Repository** | https://github.com/radecek222-boop/FIXO |

## Struktura

```
FIXO/
├── index.html          # Landing page
├── app.html            # FIXO aplikace
├── PROJECT_PLAN.md     # 📋 PLAN PROJEKTU - cti toto prvni!
├── README.md           # Tento soubor
├── public/
│   ├── css/            # Styly
│   ├── js/             # JavaScript
│   └── images/         # Obrazky
└── server.js           # Backend (lokalni vyvoj)
```

## Rychly start

```bash
# Otevrit primo v prohlizeci
open index.html

# Nebo s backendem
npm install && npm start
# http://localhost:3000
```

## Hlavni funkce

- AI analyza fotografii zavad
- Krok za krokem navody na opravu
- Bezpecnostni upozorneni u rizikovych oprav
- Historie oprav
- Databaze 500+ zavad
- Responzivni design (mobil, tablet, PC)

## Kategorie zavad

🚰 Voda | ⚡ Elektrina | 🌡️ Topeni | ⚙️ Mechanika | 🪑 Nabytek | 🚪 Dvere
🏠 Steny | 🔌 Spotrebice | 🍳 Kuchyn | 🚿 Koupelna | 🌱 Zahrada | 🚗 Auto

## Technologie

- **Frontend:** HTML, CSS, JavaScript, React
- **Backend:** Node.js, Express (volitelne)
- **Hosting:** GitHub Pages

---

## Pro vyvojare

### Pred praci
1. Precti [PROJECT_PLAN.md](PROJECT_PLAN.md)
2. Zkontroluj aktualni stav a dalsi kroky
3. Pracuj podle planu

### Po praci
1. Aktualizuj [PROJECT_PLAN.md](PROJECT_PLAN.md)
2. Commitni zmeny
3. Pushni na GitHub

---

**FIXO Team** | Diplomova prace | 2024
