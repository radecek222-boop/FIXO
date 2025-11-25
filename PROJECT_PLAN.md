# FIXO - Projektový plán

> **JEDINÝ ZDROJ PRAVDY** pro vývoj projektu FIXO.
> KAŽDÁ AI nebo vývojář MUSÍ tento dokument přečíst před prací a AKTUALIZOVAT po dokončení práce.

---

## AKTUÁLNÍ STAV

```
📅 Poslední aktualizace: 2025-11-25
👤 Aktualizoval: Claude AI
📍 Aktuální fáze: MIGRACE NA NEXT.JS (fixo-v2) - HOTOVO
✅ Poslední dokončený krok: Kompletní UI komponenty + stránky + API
⏳ Aktuálně se dělá: Připraveno k merge
🔜 Další krok: Nasazení na Vercel, připojení databáze
⚠️ Poznámka: Platební brána Stripe až PO nasazení na skutečnou doménu
```

---

## O PROJEKTU

**Název:** FIXO
**Typ:** Webová aplikace pro diagnostiku domácích závad
**Koncept:** "Shazam pro domácí opravy"

### Odkazy
- **Stará verze (v1):** https://radecek222-boop.github.io/FIXO/
- **Repository:** https://github.com/radecek222-boop/FIXO
- **Nová verze (v2):** `fixo-v2/` složka (připraveno pro Vercel)

### Hlavní funkce
- AI analýza fotografií závad (OpenAI Vision)
- Krok za krokem návody na opravu
- Bezpečnostní upozornění
- Historie oprav
- Databáze 40 typů oprav, 103 detailních problémů
- Multi-language podpora (50+ jazyků)
- Freemium model (FREE/PLUS/PRO)
- PWA s offline podporou
- Databáze řemeslníků

### Cílová skupina
- Domácnosti bez technických znalostí
- Kutilové a DIY nadšenci
- Správci nemovitostí
- Studenti
- Senioři

---

## STRUKTURA PROJEKTU

```
FIXO/
├── 📁 STARÁ VERZE (v1) - GitHub Pages
│   ├── index.html              # Hlavní aplikace (React in HTML)
│   ├── landing.html            # Landing page
│   ├── server.js               # Backend API (Node.js)
│   ├── data/                   # JSON data
│   │   ├── languages.json
│   │   ├── translations.json
│   │   ├── repairs.json
│   │   └── craftsmen.json
│   └── public/
│       ├── css/                # Design system v1 + v2
│       └── js/                 # JavaScript moduly
│
├── 📁 NOVÁ VERZE (fixo-v2) - Next.js
│   ├── src/
│   │   ├── app/                # Next.js App Router
│   │   │   ├── (app)/          # Aplikace (dashboard, history, repairs)
│   │   │   ├── (marketing)/    # Marketing stránky (pricing)
│   │   │   ├── auth/           # Autentizace (login, error)
│   │   │   └── api/            # API routes (health, repairs, analyze, auth, cron)
│   │   ├── components/         # React komponenty
│   │   │   ├── ui/             # Button, Card, Input, Badge
│   │   │   ├── layout/         # Header, Footer
│   │   │   └── providers/      # SessionProvider
│   │   ├── hooks/              # React hooks (useUser, useAnalysis)
│   │   ├── lib/                # Utility funkce (auth, prisma)
│   │   └── styles/             # Tailwind CSS
│   ├── prisma/
│   │   ├── schema.prisma       # Databázové schéma
│   │   └── seed.ts             # Seed script
│   ├── package.json
│   ├── tailwind.config.ts
│   ├── next.config.js
│   ├── middleware.ts           # Route protection
│   └── vercel.json             # Vercel config
│
├── 📁 CI/CD
│   └── .github/workflows/
│       ├── ci.yml              # Continuous Integration
│       └── deploy.yml          # Deploy to GitHub Pages
│
└── 📄 Dokumentace
    ├── PROJECT_PLAN.md         # TENTO DOKUMENT
    ├── ROADMAP_2025.md         # Detailní roadmapa
    └── README.md               # Základní dokumentace
```

---

## FÁZE VÝVOJE

### FÁZE 1: MVP (v1) ✅ HOTOVO
- [x] Základní aplikace v HTML/React
- [x] AI simulace analýzy
- [x] Databáze 103 oprav
- [x] Multi-language (50+ jazyků)
- [x] PWA podpora
- [x] GitHub Pages deployment

### FÁZE 2: Rozšíření obsahu (v1) ✅ HOTOVO
- [x] Rozšíření databáze na 103 problémů
- [x] Affiliate odkazy (Alza, Mall, Hornbach)
- [x] Video tutoriály (30+ připraveno)
- [x] Databáze řemeslníků (12 kontaktů)
- [x] Freemium UI (3 tier model)
- [x] Sociální slevy

### FÁZE 3: Migrace na Next.js ✅ KÓDOVĚ HOTOVO
- [x] Inicializace Next.js 14 projektu
- [x] Nastavení TypeScript
- [x] Tailwind CSS + shadcn/ui komponenty
- [x] Prisma databázové schéma
- [x] UI komponenty (Button, Card, Input, Badge, Dialog, Tabs, Select, Toast, Skeleton, DropdownMenu, AlertDialog, Label)
- [x] Layout komponenty (Header, Footer)
- [x] Landing page
- [x] Dashboard stránka (upload, analýza)
- [x] Historie oprav stránka
- [x] Databáze oprav stránka
- [x] Pricing stránka
- [x] Settings stránka
- [x] Auth stránky (login, error)
- [x] Marketing stránky (about, terms, privacy, contact)
- [x] 404 stránka
- [x] CI/CD GitHub Actions
- [x] API routes (health, repairs, repairs/[id], analyze, user, user/stats, cron/cleanup)
- [x] Autentizace (NextAuth.js + Google/GitHub/Demo)
- [x] Middleware pro ochranu routes
- [x] Database seed script
- [x] User hooks (useUser, useAnalysis, useToast)
- [x] Error boundary + loading states
- [x] Vercel deployment konfigurace
- [ ] Nasazení na Vercel (čeká na spuštění)
- [ ] Připojení PostgreSQL databáze
- [ ] Spuštění Prisma migrace
- [ ] Migrace dat z JSON do databáze

### FÁZE 4: Monetizace (ČEKÁ NA DOMÉNU)
> ⚠️ **DŮLEŽITÉ:** Platební brána Stripe se implementuje až PO nasazení na skutečnou doménu!

- [ ] Nákup domény (fixo.cz nebo fixo.app)
- [ ] Nastavení Stripe účtu
- [ ] Implementace platební brány
- [ ] Subscription management
- [ ] Fakturace

### FÁZE 5: Škálování (BUDOUCNOST)
- [ ] B2B dashboard
- [ ] Mobilní aplikace (React Native)
- [ ] Mezinárodní expanze
- [ ] API pro partnery

---

## CO DĚLAT NYNÍ

### Krok 1: Nasazení na Vercel ⏳ DALŠÍ KROK
```
1. Vytvořit Vercel projekt
2. Připojit GitHub repository
3. Nastavit environment variables
4. Připojit PostgreSQL (Supabase/Railway/Neon)
5. Spustit Prisma migrace: npx prisma migrate deploy
6. Spustit seed: npx prisma db seed
```

### Krok 2: Testování
```
1. E2E testy hlavních flows
2. Unit testy utilit
3. Performance audit (Lighthouse)
4. Accessibility audit
```

### Krok 3: Nasazení na doménu
```
1. Koupit doménu (fixo.cz nebo fixo.app)
2. Nastavit DNS na Vercel
3. SSL certifikát (automaticky přes Vercel)
4. Monitoring (Sentry)
```

### Krok 4: Stripe integrace (PO NASAZENÍ NA DOMÉNU)
```
1. Založit Stripe účet
2. Vytvořit produkty a ceny
3. Implementovat checkout
4. Webhook handling
5. Customer portal
```

---

## TECHNOLOGIE

| Vrstva | v1 (Stará) | v2 (Nová) |
|--------|------------|-----------|
| Frontend | HTML + React CDN | Next.js 14 |
| Styling | Custom CSS | Tailwind + shadcn/ui |
| Backend | Express.js | Next.js API Routes |
| Databáze | JSON soubory | PostgreSQL + Prisma |
| Auth | - | NextAuth.js |
| Platby | - | Stripe |
| Hosting | GitHub Pages | Vercel |
| AI | OpenAI (backend) | OpenAI Vision |

---

## MONETIZAČNÍ MODEL

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
│                 FIXO PLUS (49 Kč/měsíc)                    │
├─────────────────────────────────────────────────────────────┤
│ ✓ Neomezené AI analýzy                                     │
│ ✓ Kompletní databáze (500+ oprav)                          │
│ ✓ Video tutoriály                                          │
│ ✓ Offline přístup                                          │
│ ✓ Prioritní podpora                                        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│               FIXO PRO (99 Kč/měsíc)                       │
├─────────────────────────────────────────────────────────────┤
│ ✓ Vše z PLUS                                               │
│ ✓ Pro řemeslníky a správce                                 │
│ ✓ Více zařízení                                            │
│ ✓ Reporty a statistiky                                     │
│ ✓ API přístup                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## BAREVNÁ PALETA

```css
/* Hlavní barvy */
--color-primary: #2563eb;        /* Modrá - hlavní akční barva */
--color-primary-hover: #1d4ed8;
--color-secondary: #06b6d4;      /* Cyan - sekundární */

/* Stavové barvy */
--color-success: #16a34a;        /* Zelená - úspěch */
--color-warning: #eab308;        /* Žlutá - varování */
--color-danger: #dc2626;         /* Červená - nebezpečí/chyba */
```

---

## PRAVIDLA PRO AI

1. **PŘED PRACÍ** - Přečti tento dokument
2. **PO PRÁCI** - Aktualizuj sekce:
   - AKTUÁLNÍ STAV (datum, kdo, fáze, poslední krok, další krok)
   - Zaškrtni dokončené úkoly [x]
   - Přidej nové úkoly pokud vznikly
3. **COMMIT ZPRÁVY** - Popisné, v angličtině
4. **PUSH** - Vždy pushni změny na GitHub
5. **PLATEBNÍ BRÁNA** - Implementovat až PO nasazení na doménu!

---

## HISTORIE ZMĚN

| Datum | Autor | Změna |
|-------|-------|-------|
| 2025-11-25 | Claude AI | **MIGRACE NA NEXT.JS** - Inicializace fixo-v2, komponenty, stránky |
| 2025-11-25 | Claude AI | Přidání CI/CD GitHub Actions workflows |
| 2025-11-25 | Claude AI | Prisma databázové schéma (User, Repair, Category, Achievement...) |
| 2025-11-25 | Claude AI | UI komponenty: Button, Card, Input, Badge |
| 2025-11-25 | Claude AI | Layout komponenty: Header, Footer |
| 2025-11-25 | Claude AI | Stránky: Landing, Dashboard, History, Repairs |
| 2025-11-25 | Claude AI | **FÁZE 2 DOKONČENA** - 103 oprav, freemium UI, PWA |
| 2025-11-25 | Claude AI | Business roadmap, monetizace, B2B plán |
| 2025-11-25 | Claude AI | API routes: /api/health, /api/repairs, /api/analyze |
| 2025-11-25 | Claude AI | Pricing stránka s 3-tier modelem |
| 2025-11-25 | Claude AI | **AUTENTIZACE** - NextAuth.js s Google/GitHub/Demo providers |
| 2025-11-25 | Claude AI | Middleware pro ochranu routes |
| 2025-11-25 | Claude AI | Database seed script |
| 2025-11-25 | Claude AI | User hooks: useUser, useAnalysis |
| 2025-11-25 | Claude AI | Vercel deployment konfigurace + cron jobs |
| 2025-11-25 | Claude AI | Toast, Skeleton, Error boundary komponenty |
| 2025-11-25 | Claude AI | Settings stránka s user profile management |
| 2025-11-25 | Claude AI | Marketing stránky: About, Terms, Privacy, Contact |
| 2025-11-25 | Claude AI | 404 stránka |
| 2025-11-25 | Claude AI | User API endpoints: GET/PATCH/DELETE /api/user |
| 2025-11-25 | Claude AI | UI komponenty: Dialog, Tabs, Select, DropdownMenu, AlertDialog, Label |
| 2025-11-25 | Claude AI | Oprava CI workflow pro fixo-v2 subdirectory |
| 2025-11-25 | Claude AI | **FÁZE 3 KÓDOVĚ HOTOVO** - Připraveno k merge a nasazení |

---

## KONTAKT

- **GitHub:** https://github.com/radecek222-boop/FIXO
- **Email:** support@fixo.app (plánováno)

---

> **DŮLEŽITÉ:** Tento dokument je živým dokumentem. Aktualizuj ho při každé významné změně!
