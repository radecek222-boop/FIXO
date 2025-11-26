# FIXO - Setup Guide

Kompletní průvodce nastavením a spuštěním aplikace FIXO.

## 📋 Obsah

- [Požadavky](#požadavky)
- [Instalace](#instalace)
- [Konfigurace](#konfigurace)
- [Spuštění](#spuštění)
- [API Endpointy](#api-endpointy)
- [Platební brána](#platební-brána)

## 🔧 Požadavky

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **(Volitelně)** OpenAI API klíč pro AI analýzu
- **(Volitelně)** Stripe API klíč pro platby

## 📦 Instalace

### 1. Klonovat repozitář

```bash
git clone https://github.com/radecek222-boop/FIXO.git
cd FIXO
```

### 2. Nainstalovat závislosti

```bash
npm install
```

## ⚙️ Konfigurace

### 1. Vytvořit .env soubor

Zkopírujte `.env.example` a přejmenujte na `.env`:

```bash
cp .env.example .env
```

### 2. Nakonfigurovat proměnné prostředí

Otevřete `.env` a vyplňte své hodnoty:

#### Základní konfigurace (povinné)

```env
PORT=3000
NODE_ENV=development
```

#### OpenAI API (volitelné - pro skutečnou AI analýzu)

```env
# Získejte klíč na: https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-your-api-key-here
OPENAI_MODEL=gpt-4o
OPENAI_MAX_TOKENS=1000
OPENAI_TEMPERATURE=0.7
```

**Bez OpenAI klíče:** Aplikace používá inteligentní simulaci.

#### Stripe Platby (volitelné - pro platební bránu)

```env
# Získejte klíče na: https://dashboard.stripe.com/apikeys
STRIPE_SECRET_KEY=sk_test_your-stripe-key-here
STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-key-here
```

**Bez Stripe klíče:** Platební funkce budou vypnuté.

## 🚀 Spuštění

### Development režim (s auto-restart)

```bash
npm run dev
```

### Production režim

```bash
npm start
```

Server poběží na `http://localhost:3000`

## 📡 API Endpointy

### Základní

- `GET /api/health` - Health check
- `GET /api/categories` - Seznam kategorií
- `GET /api/objects` - Seznam objektů

### Analýza obrázků

- `POST /api/analyze` - Analyzovat obrázek (multipart/form-data)
- `POST /api/analyze-base64` - Analyzovat base64 obrázek

```javascript
// Příklad použití
const response = await fetch('http://localhost:3000/api/analyze-base64', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image: base64ImageData })
});
const result = await response.json();
```

### Databáze oprav

- `GET /api/repair/:objectId/:issueId` - Detail opravy
- `GET /api/search?q=kohoutek` - Vyhledávání

### Platby

- `GET /api/pricing` - Cenové plány
- `POST /api/payment/create-intent` - Vytvořit platbu
- `POST /api/payment/verify` - Ověřit platbu

## 💳 Platební brána

### Testovací režim (bez Stripe klíče)

Aplikace vrací mock platební intenty pro testování.

### Production režim (se Stripe klíčem)

1. Zaregistrujte se na [Stripe](https://stripe.com)
2. Získejte API klíče (Dashboard → Developers → API keys)
3. Vyplňte do `.env`:

```env
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
```

### Cenové plány

- **Základní** - 0 Kč (AI analýza + základní návod)
- **Premium** - 29 Kč (+ videa, schémata, podpora)
- **Pro** - 99 Kč (+ konzultace s odborníkem)

## 🎨 Frontend

Všechny HTML stránky jsou připravené:

- `index.html` - Hlavní stránka
- `analytics.html` - Výsledky analýzy
- `repair.html` - Databáze oprav
- `partners.html` - Partnerské e-shopy
- `about.html` - O projektu
- `contacts.html` - Kontakt a právní info

## 🧪 Testování

```bash
# Spustit testy
npm test

# Health check
curl http://localhost:3000/api/health

# Test analýzy
curl -X POST http://localhost:3000/api/analyze-base64 \
  -H "Content-Type: application/json" \
  -d '{"image":"data:image/png;base64,..."}'
```

## 📝 Struktura projektu

```
FIXO/
├── index.html              # Hlavní stránka
├── analytics.html          # Výsledky analýzy
├── repair.html             # Databáze oprav
├── partners.html           # Partneři
├── about.html              # O nás
├── contacts.html           # Kontakt
├── server.js               # Backend server
├── assets/
│   ├── css/
│   │   └── main.css        # Hlavní styly
│   ├── js/
│   │   └── api.js          # Frontend API helper
│   └── images/
│       └── background.png  # Pozadí
├── src/
│   ├── aiAnalyzer.js       # AI modul (OpenAI/simulace)
│   ├── paymentGateway.js   # Platební brána (Stripe)
│   └── smartAnalyzer.js    # TensorFlow.js analyzér
├── data/
│   └── repairs.json        # Databáze oprav
└── .env                    # Konfigurace (vytvořte z .env.example)
```

## 🐛 Řešení problémů

### Port už používá jiný proces

```bash
# Najít proces na portu 3000
lsof -i :3000

# Ukončit proces
kill -9 <PID>

# Nebo změnit port v .env
PORT=3001
```

### OpenAI API chyby

- Zkontrolujte API klíč v `.env`
- Ověřte credit na OpenAI účtu
- Bez klíče funguje simulace

### Chyby při instalaci

```bash
# Vymazat node_modules a reinstalovat
rm -rf node_modules package-lock.json
npm install
```

## 📞 Podpora

- **GitHub Issues**: [https://github.com/radecek222-boop/FIXO/issues](https://github.com/radecek222-boop/FIXO/issues)
- **Email**: podpora@fixo.app

## 📄 Licence

MIT License - viz `LICENSE` soubor

---

**Tip:** Pro produkční nasazení doporučujeme použít [Render.com](https://render.com) nebo [Railway.app](https://railway.app)
