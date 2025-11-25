# FIXO v2

> **AI-powered home repair diagnostics platform**

FIXO v2 je kompletně přepsaná verze aplikace s moderní architekturou připravenou na škálování a monetizaci.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Database:** PostgreSQL + Prisma ORM
- **Authentication:** NextAuth.js
- **Payments:** Stripe (po nasazení na doménu)
- **AI:** OpenAI Vision API

## Quick Start

```bash
# Install dependencies
npm install

# Setup database
cp .env.example .env.local
# Edit .env.local with your DATABASE_URL

# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
fixo-v2/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (marketing)/        # Public pages (landing, pricing)
│   │   ├── (app)/              # App pages (requires auth)
│   │   │   └── dashboard/      # Main application
│   │   └── api/                # API routes
│   ├── components/             # React components
│   │   ├── ui/                 # Base UI components
│   │   ├── forms/              # Form components
│   │   └── layout/             # Layout components
│   ├── lib/                    # Utilities
│   ├── hooks/                  # Custom hooks
│   ├── types/                  # TypeScript types
│   └── styles/                 # Global styles
├── prisma/
│   └── schema.prisma           # Database schema
└── public/                     # Static files
```

## Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # Run linter
npm run type-check   # TypeScript check
npm run db:push      # Push schema to DB
npm run db:studio    # Open Prisma Studio
npm run db:seed      # Seed database
```

## Environment Variables

See `.env.example` for all required variables.

**Required for development:**
- `DATABASE_URL` - PostgreSQL connection
- `NEXTAUTH_SECRET` - Auth secret

**Required for AI features:**
- `OPENAI_API_KEY` - OpenAI API key

**Required for payments (after domain deployment):**
- `STRIPE_SECRET_KEY`
- `STRIPE_PUBLISHABLE_KEY`

## License

MIT
