# FIXO - Nasazení na Vercel

## Rychlý průvodce

### 1. Vytvořte Vercel účet
Přejděte na [vercel.com](https://vercel.com) a přihlaste se přes GitHub.

### 2. Import projektu
1. Klikněte na "Add New" → "Project"
2. Vyberte `radecek222-boop/FIXO` repository
3. **DŮLEŽITÉ:** V nastavení změňte "Root Directory" na `fixo-v2`

### 3. Environment Variables
Přidejte tyto proměnné prostředí:

| Proměnná | Popis |
|----------|-------|
| `OPENAI_API_KEY` | Váš OpenAI API klíč |
| `DATABASE_URL` | PostgreSQL connection string (např. z Supabase, Neon, PlanetScale) |
| `NEXTAUTH_SECRET` | Náhodný string pro šifrování session (vygenerujte: `openssl rand -base64 32`) |
| `NEXTAUTH_URL` | URL vaší aplikace (např. `https://fixo.vercel.app`) |

### 4. Deploy
Klikněte "Deploy" a počkejte na build.

## Bezplatné databáze (doporučené)

### Neon (PostgreSQL)
1. [neon.tech](https://neon.tech) - zdarma až 512MB
2. Vytvořte nový projekt
3. Zkopírujte connection string do `DATABASE_URL`

### Supabase (PostgreSQL)
1. [supabase.com](https://supabase.com) - zdarma 500MB
2. Vytvořte nový projekt
3. Settings → Database → Connection string

## Po nasazení

Po prvním deploymentu spusťte migrace:
```bash
npx prisma migrate deploy
```

Nebo v Vercel CLI:
```bash
vercel env pull
npx prisma migrate deploy
```

## Problémy?

- **Build failed**: Zkontrolujte že `Root Directory` je `fixo-v2`
- **Database error**: Ověřte `DATABASE_URL` format
- **Auth error**: Nastavte správnou `NEXTAUTH_URL`
