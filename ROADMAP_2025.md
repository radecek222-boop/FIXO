# FIXO 2.0 - Roadmapa Transformace

> **Vize:** Transformovat FIXO z jednoduchého nástroje na komplexní platformu pro DIY opravy s monetizací a AI-first přístupem.

> **Cíl:** Aplikace připravená na 30+ let s moderní architekturou, škálovatelností a udržitelnými příjmy.

---

## AKTUÁLNÍ STAV TRANSFORMACE

```
📅 Zahájení: 2025-11-25
📍 Aktuální fáze: FÁZE 0 - Příprava
✅ Dokončeno: 0/50 kroků
⏳ Probíhá: Analýza a plánování
🎯 Cíl Q1 2026: MVP s monetizací
```

---

## PŘEHLED FÁZ

| Fáze | Název | Popis | Priorita |
|------|-------|-------|----------|
| 0 | Příprava | Analýza, rozhodnutí, setup | 🔴 Kritická |
| 1 | Migrace Tech Stacku | Next.js, TypeScript, Prisma | 🔴 Kritická |
| 2 | Autentizace & Uživatelé | Registrace, přihlášení, profily | 🔴 Kritická |
| 3 | Databáze & Backend | PostgreSQL, API redesign | 🔴 Kritická |
| 4 | Monetizace MVP | Stripe, Freemium model | 🟠 Vysoká |
| 5 | Rozšíření Obsahu | 200+ oprav, video tutoriály | 🟠 Vysoká |
| 6 | Gamifikace | Achievementy, XP, levely | 🟡 Střední |
| 7 | Marketplace | Řemeslníci, affiliate | 🟡 Střední |
| 8 | AI 2.0 | RAG, multi-modal, lokální AI | 🟡 Střední |
| 9 | Mobilní Aplikace | React Native / PWA+ | 🟢 Nízká |
| 10 | Škálování | Mezinárodní expanze, B2B | 🟢 Nízká |

---

## FÁZE 0: PŘÍPRAVA A ROZHODNUTÍ

> **Cíl:** Připravit základ pro migraci, udělat klíčová rozhodnutí

### Krok 0.1: Záloha současného stavu
- [ ] Vytvořit Git tag `v1.0-legacy`
- [ ] Exportovat všechna data do zálohy
- [ ] Zdokumentovat současné API endpointy
- [ ] Screenshot všech stránek pro referenci

### Krok 0.2: Rozhodnutí o tech stacku
- [ ] **Frontend:** Next.js 14+ (App Router) ✅ Doporučeno
- [ ] **Styling:** Tailwind CSS + shadcn/ui ✅ Doporučeno
- [ ] **Backend:** Next.js API Routes + tRPC ✅ Doporučeno
- [ ] **Database:** PostgreSQL + Prisma ORM ✅ Doporučeno
- [ ] **Auth:** NextAuth.js nebo Clerk ⚠️ Rozhodnout
- [ ] **Payments:** Stripe ✅ Doporučeno
- [ ] **Hosting:** Vercel (frontend) + Railway/Supabase (DB) ✅ Doporučeno

### Krok 0.3: Založení nového projektu
- [ ] Inicializovat Next.js projekt s TypeScript
- [ ] Nastavit ESLint, Prettier
- [ ] Nastavit Husky pre-commit hooks
- [ ] Nastavit GitHub Actions CI/CD
- [ ] Připravit development, staging, production prostředí

### Krok 0.4: Nákup domény a služeb
- [ ] Koupit doménu (např. fixo.cz, fixo.app, opravto.cz)
- [ ] Založit Stripe účet
- [ ] Založit Vercel účet
- [ ] Založit databázový účet (Railway/Supabase/Neon)

---

## FÁZE 1: MIGRACE TECH STACKU

> **Cíl:** Přejít na moderní, škálovatelnou architekturu

### Krok 1.1: Základní struktura projektu
- [ ] Vytvořit adresářovou strukturu:
```
fixo-v2/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (marketing)/        # Veřejné stránky
│   │   │   ├── page.tsx        # Landing page
│   │   │   ├── pricing/        # Ceník
│   │   │   └── about/          # O nás
│   │   ├── (app)/              # Aplikace (auth required)
│   │   │   ├── dashboard/      # Přehled
│   │   │   ├── diagnose/       # AI diagnostika
│   │   │   ├── repairs/        # Databáze oprav
│   │   │   ├── history/        # Historie
│   │   │   └── settings/       # Nastavení
│   │   ├── api/                # API routes
│   │   └── layout.tsx          # Root layout
│   ├── components/             # React komponenty
│   │   ├── ui/                 # shadcn komponenty
│   │   ├── forms/              # Formuláře
│   │   └── layout/             # Header, Footer, Nav
│   ├── lib/                    # Utility funkce
│   │   ├── db.ts               # Prisma client
│   │   ├── auth.ts             # Auth helpers
│   │   └── ai.ts               # AI helpers
│   ├── hooks/                  # Custom React hooks
│   ├── types/                  # TypeScript typy
│   └── styles/                 # Globální styly
├── prisma/
│   └── schema.prisma           # Databázové schéma
├── public/                     # Statické soubory
└── tests/                      # Testy
```

### Krok 1.2: Instalace závislostí
- [ ] Next.js 14+, React 18+, TypeScript
- [ ] Tailwind CSS, shadcn/ui
- [ ] Prisma ORM
- [ ] NextAuth.js
- [ ] Stripe SDK
- [ ] OpenAI SDK
- [ ] React Query / TanStack Query
- [ ] Zod (validace)
- [ ] React Hook Form

### Krok 1.3: Migrace komponent
- [ ] Přepsat Header komponentu
- [ ] Přepsat Footer komponentu
- [ ] Přepsat Navigation (desktop + mobile)
- [ ] Vytvořit základní UI komponenty (Button, Card, Input, Modal)
- [ ] Implementovat Dark Mode pomocí next-themes

### Krok 1.4: Migrace stránek
- [ ] Landing page (marketing)
- [ ] Pricing page
- [ ] Dashboard
- [ ] Diagnose page (upload + výsledky)
- [ ] Repairs database (kategorie + detail)
- [ ] History page
- [ ] Settings page

### Krok 1.5: Testy migrace
- [ ] Vizuální srovnání se starou verzí
- [ ] Funkční testy všech features
- [ ] Performance audit (Lighthouse)
- [ ] Accessibility audit

---

## FÁZE 2: AUTENTIZACE A UŽIVATELÉ

> **Cíl:** Implementovat kompletní uživatelský systém

### Krok 2.1: Databázové schéma pro uživatele
- [ ] Vytvořit Prisma schéma:
```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  image         String?
  emailVerified DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // Subscription
  plan          Plan      @default(FREE)
  stripeCustomerId String?
  subscriptionId   String?
  subscriptionEnd  DateTime?

  // Relations
  accounts      Account[]
  sessions      Session[]
  repairs       RepairHistory[]
  achievements  UserAchievement[]
}

enum Plan {
  FREE
  PRO
  FAMILY
  LIFETIME
}
```

### Krok 2.2: NextAuth.js setup
- [ ] Konfigurace providers (Email, Google, GitHub, Apple)
- [ ] Custom sign-in page
- [ ] Custom sign-up page
- [ ] Email verification flow
- [ ] Password reset flow
- [ ] Session management

### Krok 2.3: Uživatelské rozhraní
- [ ] Login modal/page
- [ ] Register modal/page
- [ ] User dropdown menu
- [ ] Profile settings page
- [ ] Account deletion

### Krok 2.4: Middleware a ochrana rout
- [ ] Auth middleware pro /app/* routes
- [ ] Redirect neautorizovaných uživatelů
- [ ] Rate limiting pro auth endpoints
- [ ] CSRF ochrana

---

## FÁZE 3: DATABÁZE A BACKEND

> **Cíl:** Robustní databáze a API

### Krok 3.1: Kompletní databázové schéma
- [ ] Vytvořit schéma:
```prisma
// Kategorie oprav
model Category {
  id          String   @id @default(cuid())
  slug        String   @unique
  name        String
  icon        String
  description String?
  order       Int      @default(0)
  repairs     Repair[]
}

// Opravy
model Repair {
  id           String   @id @default(cuid())
  slug         String   @unique
  categoryId   String
  category     Category @relation(fields: [categoryId], references: [id])
  name         String
  description  String
  difficulty   Difficulty
  timeEstimate Int      // minuty
  riskScore    Int      // 1-10
  costMin      Int?
  costMax      Int?
  proRequired  Boolean  @default(false)

  issues       Issue[]
  tools        RepairTool[]
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

enum Difficulty {
  EASY
  MEDIUM
  HARD
}

// Konkrétní závady
model Issue {
  id          String   @id @default(cuid())
  repairId    String
  repair      Repair   @relation(fields: [repairId], references: [id])
  name        String
  description String
  symptoms    String[]
  steps       Step[]
  warnings    String[]
}

// Kroky opravy
model Step {
  id          String  @id @default(cuid())
  issueId     String
  issue       Issue   @relation(fields: [issueId], references: [id])
  order       Int
  title       String
  description String
  imageUrl    String?
  videoUrl    String?
  tip         String?
  warning     String?
}

// Nástroje
model Tool {
  id          String       @id @default(cuid())
  name        String       @unique
  icon        String?
  repairs     RepairTool[]
  affiliates  AffiliateLink[]
}

model RepairTool {
  repairId String
  toolId   String
  repair   Repair @relation(fields: [repairId], references: [id])
  tool     Tool   @relation(fields: [toolId], references: [id])
  required Boolean @default(true)

  @@id([repairId, toolId])
}

// Affiliate odkazy
model AffiliateLink {
  id        String @id @default(cuid())
  toolId    String
  tool      Tool   @relation(fields: [toolId], references: [id])
  store     String // hornbach, obi, alza
  url       String
  price     Int?
  commission Float?
}

// Historie oprav uživatele
model RepairHistory {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  repairId    String?
  issueId     String?
  title       String
  status      RepairStatus @default(IN_PROGRESS)
  aiDiagnosis Json?
  notes       String?
  images      String[]
  startedAt   DateTime @default(now())
  completedAt DateTime?
  savedAmount Int?     // kolik ušetřil vs. řemeslník
}

enum RepairStatus {
  IN_PROGRESS
  COMPLETED
  ABANDONED
}

// Achievementy
model Achievement {
  id          String   @id @default(cuid())
  slug        String   @unique
  name        String
  description String
  icon        String
  xp          Int
  condition   Json     // podmínky pro získání
  users       UserAchievement[]
}

model UserAchievement {
  userId        String
  achievementId String
  user          User        @relation(fields: [userId], references: [id])
  achievement   Achievement @relation(fields: [achievementId], references: [id])
  unlockedAt    DateTime    @default(now())

  @@id([userId, achievementId])
}

// Překlady
model Translation {
  id       String @id @default(cuid())
  key      String
  language String
  value    String

  @@unique([key, language])
}
```

### Krok 3.2: Migrace dat ze JSON
- [ ] Vytvořit migration script
- [ ] Importovat kategorie
- [ ] Importovat opravy
- [ ] Importovat závady a kroky
- [ ] Importovat nástroje
- [ ] Importovat překlady
- [ ] Verifikovat integritu dat

### Krok 3.3: API Endpoints (tRPC nebo REST)
- [ ] `/api/categories` - GET seznam kategorií
- [ ] `/api/repairs` - GET, POST opravy
- [ ] `/api/repairs/[id]` - GET, PUT, DELETE detail
- [ ] `/api/repairs/search` - GET vyhledávání
- [ ] `/api/diagnose` - POST AI diagnostika
- [ ] `/api/history` - GET, POST historie uživatele
- [ ] `/api/user` - GET, PUT profil
- [ ] `/api/achievements` - GET achievementy
- [ ] `/api/translations/[lang]` - GET překlady

### Krok 3.4: Caching a optimalizace
- [ ] Redis cache pro časté dotazy
- [ ] ISR (Incremental Static Regeneration) pro stránky
- [ ] Database indexy
- [ ] Connection pooling

---

## FÁZE 4: MONETIZACE MVP

> **Cíl:** Spustit základní model generující příjmy

### Krok 4.1: Stripe integrace
- [ ] Stripe účet a API klíče
- [ ] Produkty a ceny v Stripe Dashboard:
  - FREE: 0 Kč (3 diagnózy/měsíc)
  - PRO: 99 Kč/měsíc (neomezené)
  - FAMILY: 149 Kč/měsíc (5 uživatelů)
  - LIFETIME: 1,990 Kč (jednorázově)
- [ ] Stripe Checkout integrace
- [ ] Webhook handling (subscription events)
- [ ] Customer portal pro správu předplatného

### Krok 4.2: Paywall implementace
- [ ] Middleware pro kontrolu limitu diagnóz
- [ ] Upgrade modal při dosažení limitu
- [ ] "Unlock" tlačítka u premium obsahu
- [ ] Graceful degradation pro free uživatele

### Krok 4.3: Pricing page
- [ ] Responzivní ceník
- [ ] Feature comparison tabulka
- [ ] FAQ sekce
- [ ] Money-back guarantee badge
- [ ] Social proof (testimonials)

### Krok 4.4: Billing dashboard
- [ ] Aktuální plán
- [ ] Využití (diagnózy tento měsíc)
- [ ] Historie plateb
- [ ] Faktury ke stažení
- [ ] Změna/zrušení předplatného

### Krok 4.5: Affiliate program (základní)
- [ ] Přidat affiliate odkazy k nástrojům
- [ ] Hornbach partner program
- [ ] OBI partner program
- [ ] Alza partner program
- [ ] Tracking kliknutí

---

## FÁZE 5: ROZŠÍŘENÍ OBSAHU

> **Cíl:** Vybudovat rozsáhlou databázi oprav

### Krok 5.1: Struktura obsahu
- [ ] Definovat standard pro nové opravy:
  - Minimálně 5 kroků
  - Vždy seznam nástrojů
  - Bezpečnostní varování
  - Odhad času a ceny
  - Obtížnost

### Krok 5.2: Nové kategorie a opravy
- [ ] **Voda (🚰)** - rozšířit na 20 oprav
  - [ ] Kohoutek (5 závad)
  - [ ] WC (5 závad)
  - [ ] Sprchový kout (3 závady)
  - [ ] Pračka napojení (3 závady)
  - [ ] Myčka napojení (2 závady)
  - [ ] Bojler (2 závady)

- [ ] **Elektro (⚡)** - rozšířit na 15 oprav
  - [ ] Zásuvky (4 závady)
  - [ ] Vypínače (3 závady)
  - [ ] Jističe (2 závady)
  - [ ] Osvětlení (4 závady)
  - [ ] Prodlužovačky (2 závady)

- [ ] **Topení (🌡️)** - rozšířit na 10 oprav
  - [ ] Radiátory (4 závady)
  - [ ] Termostat (2 závady)
  - [ ] Kotel (2 závady)
  - [ ] Podlahové topení (2 závady)

- [ ] **Nábytek (🪑)** - rozšířit na 20 oprav
  - [ ] Židle (4 závady)
  - [ ] Stoly (3 závady)
  - [ ] Skříně (4 závady)
  - [ ] Police (3 závady)
  - [ ] Postel (3 závady)
  - [ ] Zásuvky (3 závady)

- [ ] **Dveře & Okna (🚪)** - rozšířit na 15 oprav
  - [ ] Vnitřní dveře (4 závady)
  - [ ] Vchodové dveře (3 závady)
  - [ ] Okna (4 závady)
  - [ ] Žaluzie/rolety (4 závady)

- [ ] **Stěny & Podlahy (🏠)** - rozšířit na 15 oprav
  - [ ] Malování (3 závady)
  - [ ] Tapety (2 závady)
  - [ ] Dlaždice (3 závady)
  - [ ] Laminát (3 závady)
  - [ ] Koberec (2 závady)
  - [ ] Sádrokarton (2 závady)

- [ ] **Spotřebiče (🔌)** - rozšířit na 20 oprav
  - [ ] Pračka (5 závad)
  - [ ] Myčka (4 závady)
  - [ ] Lednice (4 závady)
  - [ ] Trouba/sporák (4 závady)
  - [ ] Mikrovlnka (3 závady)

- [ ] **Zahrada (🌱)** - rozšířit na 15 oprav
  - [ ] Sekačka (3 závady)
  - [ ] Zavlažování (3 závady)
  - [ ] Plot (3 závady)
  - [ ] Zahradní nábytek (3 závady)
  - [ ] Bazén (3 závady)

- [ ] **Auto (🚗)** - rozšířit na 20 oprav
  - [ ] Pneumatiky (3 závady)
  - [ ] Světla (4 závady)
  - [ ] Stěrače (2 závady)
  - [ ] Baterie (2 závady)
  - [ ] Kapaliny (4 závady)
  - [ ] Interiér (3 závady)
  - [ ] Drobné opravy karoserie (2 závady)

**Celkem: 150+ detailních oprav**

### Krok 5.3: Multimédia
- [ ] Ilustrační obrázky ke krokům (AI generované nebo stock)
- [ ] Krátká videa (30-60s) pro složitější úkony
- [ ] 3D modely pro komplexní opravy (budoucnost)

### Krok 5.4: Lokalizace obsahu
- [ ] Profesionální překlad do EN
- [ ] Profesionální překlad do DE
- [ ] Profesionální překlad do SK
- [ ] Profesionální překlad do PL

---

## FÁZE 6: GAMIFIKACE

> **Cíl:** Zvýšit engagement a retenci uživatelů

### Krok 6.1: XP a Levely systém
- [ ] Definovat XP za akce:
  - Dokončená oprava: 100 XP
  - První oprava v kategorii: 50 XP bonus
  - Denní přihlášení: 10 XP
  - Sdílení opravy: 25 XP
  - Hodnocení návodu: 15 XP
- [ ] Levely: Začátečník → Učeň → Kutil → Mistr → Expert → Legenda
- [ ] Level badges v profilu

### Krok 6.2: Achievement systém
- [ ] Vytvořit achievementy:
```javascript
const achievements = [
  // Začátečnické
  { slug: "first_fix", name: "První oprava", xp: 100, condition: { repairs: 1 } },
  { slug: "getting_started", name: "Rozjezd", xp: 150, condition: { repairs: 5 } },

  // Kategorie
  { slug: "water_apprentice", name: "Vodní učeň", xp: 200, condition: { category: "water", count: 3 } },
  { slug: "water_master", name: "Vodní mistr", xp: 500, condition: { category: "water", count: 10 } },
  { slug: "electrician", name: "Elektrikář", xp: 300, condition: { category: "electrical", count: 5 } },

  // Speciální
  { slug: "money_saver_100", name: "Ušetřil 1000 Kč", xp: 200, condition: { saved: 1000 } },
  { slug: "money_saver_500", name: "Ušetřil 5000 Kč", xp: 400, condition: { saved: 5000 } },
  { slug: "streak_7", name: "Týdenní série", xp: 150, condition: { streak: 7 } },
  { slug: "streak_30", name: "Měsíční série", xp: 500, condition: { streak: 30 } },
  { slug: "night_owl", name: "Noční sova", xp: 100, condition: { repair_after_22: true } },
  { slug: "early_bird", name: "Ranní ptáče", xp: 100, condition: { repair_before_6: true } },
  { slug: "helper", name: "Pomocník", xp: 200, condition: { shares: 10 } },

  // Raritní
  { slug: "all_categories", name: "Univerzál", xp: 1000, condition: { all_categories: true } },
  { slug: "speed_demon", name: "Rychlík", xp: 300, condition: { repair_under_10min: true } },
]
```

### Krok 6.3: Statistiky uživatele
- [ ] Dashboard s přehledem:
  - Celkem oprav
  - Celkem ušetřeno
  - Oblíbená kategorie
  - Aktuální level a XP
  - Progress k dalšímu levelu
  - Aktivní streak

### Krok 6.4: Leaderboard
- [ ] Týdenní žebříček
- [ ] Měsíční žebříček
- [ ] All-time žebříček
- [ ] Filtry podle regionu

### Krok 6.5: Sezónní výzvy
- [ ] Systém pro časově omezené výzvy
- [ ] "Jarní údržba" challenge
- [ ] "Zimní příprava" challenge
- [ ] Speciální odměny za dokončení

---

## FÁZE 7: MARKETPLACE

> **Cíl:** Propojit uživatele s profesionály a obchody

### Krok 7.1: Profily řemeslníků
- [ ] Registrace řemeslníka (ověření živnosti)
- [ ] Profil s portfoliem
- [ ] Hodnocení a recenze
- [ ] Certifikace a specializace
- [ ] Dostupnost a lokalita

### Krok 7.2: Poptávkový systém
- [ ] "Nechci opravovat sám" tlačítko
- [ ] Formulář poptávky (popis, fotky, lokalita)
- [ ] Notifikace relevantním řemeslníkům
- [ ] Nabídky od řemeslníků
- [ ] Porovnání nabídek

### Krok 7.3: Platby a provize
- [ ] Stripe Connect pro řemeslníky
- [ ] Escrow systém (platba po dokončení)
- [ ] FIXO provize 10-15%
- [ ] Fakturace

### Krok 7.4: Premium pro řemeslníky
- [ ] Základní profil: Zdarma (max 5 poptávek/měsíc)
- [ ] Pro profil: 299 Kč/měsíc (neomezené poptávky, priorita)
- [ ] Sponzorované umístění v seznamu

### Krok 7.5: Rozšířené affiliate
- [ ] Integrovaný e-shop s nástroji
- [ ] "Koupit nástroje pro tuto opravu" bundle
- [ ] Srovnání cen z více obchodů
- [ ] Wishlist nástrojů
- [ ] Notifikace o slevách

---

## FÁZE 8: AI 2.0

> **Cíl:** Pokročilá AI pro lepší diagnostiku a UX

### Krok 8.1: Multi-provider AI
- [ ] Abstrakce nad AI providery:
```typescript
interface AIProvider {
  analyze(input: AIInput): Promise<Diagnosis>;
  translate(text: string, targetLang: string): Promise<string>;
}

class OpenAIProvider implements AIProvider { ... }
class AnthropicProvider implements AIProvider { ... }
class LocalProvider implements AIProvider { ... } // Ollama/llama.cpp
```
- [ ] Fallback mezi providery
- [ ] Cost optimization (levnější pro jednoduché dotazy)

### Krok 8.2: RAG (Retrieval Augmented Generation)
- [ ] Vector database (Pinecone/Weaviate/pgvector)
- [ ] Embeddings pro všechny opravy
- [ ] Semantic search
- [ ] AI odpovědi založené na vlastních datech

### Krok 8.3: Multi-modal vstup
- [ ] Video upload a analýza (extrakce framů)
- [ ] Audio vstup (popis problému hlasem)
- [ ] Kombinace vstupů pro přesnější diagnózu

### Krok 8.4: Konverzační AI
- [ ] Chat interface pro upřesnění problému
- [ ] Follow-up otázky
- [ ] Kontextové rady během opravy
- [ ] "Zeptej se AI" v každém kroku

### Krok 8.5: Lokální AI (offline)
- [ ] WebGPU inference v prohlížeči
- [ ] Malý model pro základní diagnózy
- [ ] Kompletně offline režim
- [ ] Privacy-first přístup

### Krok 8.6: AR preview (experimentální)
- [ ] WebXR integrace
- [ ] Overlay instrukcí na kameru
- [ ] Highlighting problémových míst
- [ ] Měření pomocí AR

---

## FÁZE 9: MOBILNÍ APLIKACE

> **Cíl:** Nativní mobilní zážitek

### Krok 9.1: Rozhodnutí o technologii
- [ ] **Možnost A:** React Native (Expo) - doporučeno
- [ ] **Možnost B:** Progressive Web App (PWA+)
- [ ] **Možnost C:** Flutter

### Krok 9.2: PWA vylepšení (mezikrok)
- [ ] Offline-first architektura
- [ ] Background sync
- [ ] Push notifikace
- [ ] Install prompt optimalizace
- [ ] Splash screen

### Krok 9.3: Nativní aplikace
- [ ] Sdílený kód s webem (React Native Web)
- [ ] Nativní kamera integrace
- [ ] Nativní notifikace
- [ ] Deep linking
- [ ] App Store / Google Play publikace

### Krok 9.4: Mobilní-specifické funkce
- [ ] Rychlá fotka z home screen
- [ ] Widget s poslední opravou
- [ ] Offline databáze oprav
- [ ] Lokální notifikace (připomínky údržby)

---

## FÁZE 10: ŠKÁLOVÁNÍ

> **Cíl:** Mezinárodní expanze a B2B

### Krok 10.1: Mezinárodní expanze
- [ ] **Německo** - lokalizace, affiliate partneři
- [ ] **Polsko** - lokalizace, affiliate partneři
- [ ] **Slovensko** - lokalizace, affiliate partneři
- [ ] **Rakousko** - lokalizace, affiliate partneři
- [ ] SEO pro každý trh
- [ ] Lokální marketing

### Krok 10.2: B2B API
- [ ] API dokumentace (OpenAPI/Swagger)
- [ ] API klíče a rate limiting
- [ ] Pricing tiers:
  - Starter: 5,000 Kč/měsíc (1000 requests)
  - Business: 20,000 Kč/měsíc (10000 requests)
  - Enterprise: Custom

### Krok 10.3: B2B integrace
- [ ] **Pojišťovny** - likvidace škod
- [ ] **Reality kanceláře** - inspekce nemovitostí
- [ ] **Facility management** - správa budov
- [ ] **E-shopy** - doporučení oprav k produktům

### Krok 10.4: White-label řešení
- [ ] Customizace brandingu
- [ ] Embedded widget pro partnery
- [ ] SDK pro integraci

---

## METRIKY ÚSPĚCHU

### Uživatelské metriky
| Metrika | Cíl Q2 2025 | Cíl Q4 2025 | Cíl 2026 |
|---------|-------------|-------------|----------|
| Registrovaní uživatelé | 5,000 | 25,000 | 100,000 |
| MAU (Monthly Active Users) | 2,000 | 10,000 | 40,000 |
| Platící uživatelé | 250 | 1,250 | 5,000 |
| Konverzní poměr | 5% | 5% | 5% |

### Finanční metriky
| Metrika | Cíl Q2 2025 | Cíl Q4 2025 | Cíl 2026 |
|---------|-------------|-------------|----------|
| MRR (Monthly Recurring Revenue) | 25,000 Kč | 125,000 Kč | 500,000 Kč |
| Affiliate příjmy | 10,000 Kč/m | 50,000 Kč/m | 150,000 Kč/m |
| Marketplace provize | 0 | 25,000 Kč/m | 100,000 Kč/m |
| B2B licence | 0 | 0 | 100,000 Kč/m |

### Obsahové metriky
| Metrika | Cíl Q2 2025 | Cíl Q4 2025 | Cíl 2026 |
|---------|-------------|-------------|----------|
| Počet oprav v DB | 100 | 200 | 500 |
| Jazyky | 5 (kvalitní) | 10 | 20 |
| Video tutoriály | 20 | 100 | 300 |

---

## TECHNICKÉ POŽADAVKY

### Vývojové prostředí
- Node.js 20+
- pnpm (package manager)
- VS Code s doporučenými extensions
- Docker pro lokální DB

### Produkční prostředí
- Vercel (frontend + API)
- PostgreSQL (Railway/Supabase/Neon)
- Redis (Upstash)
- Blob storage (Vercel Blob/Cloudflare R2)
- Monitoring (Sentry)
- Analytics (PostHog/Plausible)

### Bezpečnost
- Environment variables pro secrets
- Rate limiting
- Input validation (Zod)
- CSRF protection
- Content Security Policy
- Regular dependency updates

---

## PRAVIDLA PRO VÝVOJ

1. **Před prací** - Přečti tento dokument a PROJECT_PLAN.md
2. **Označuj progress** - Zaškrtávej dokončené kroky [x]
3. **Commit messages** - Popisné, v angličtině, conventional commits
4. **Code review** - Všechny změny přes PR
5. **Testy** - Kritické funkce musí mít testy
6. **Dokumentace** - Aktualizuj při změnách API

---

## KONTAKTY A ZDROJE

- **GitHub:** https://github.com/radecek222-boop/FIXO
- **Produkce:** https://fixo.cz (plánováno)
- **Stripe Dashboard:** https://dashboard.stripe.com
- **Vercel Dashboard:** https://vercel.com

### Užitečné odkazy
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Stripe Docs](https://stripe.com/docs)
- [NextAuth.js Docs](https://next-auth.js.org)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## HISTORIE ZMĚN

| Datum | Autor | Změna |
|-------|-------|-------|
| 2025-11-25 | Claude AI | Vytvoření ROADMAP_2025.md - kompletní plán transformace |

---

> **DŮLEŽITÉ:** Tento dokument je živý dokument. Aktualizuj ho při každé významné změně!
>
> **Další krok:** Začít FÁZÍ 0 - Příprava a rozhodnutí
