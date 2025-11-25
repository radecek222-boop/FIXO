# FIXO - Aplikace pro okamzite opravy domacich zavad

> "Fix Anything. Anywhere. Instantly."

## O aplikaci

FIXO je webova aplikace pro rychlou identifikaci a opravu domacich zavad pomoci AI analyzy fotografii. Aplikace funguje na principu "Shazam pro domaci opravy" - staci nahrat fotku poskozene veci a system automaticky identifikuje objekt, odhadne problem a nabidne nejjednodussi mozna reseni.

## Struktura projektu

```
FIXO/
├── index.html             # Landing page (hlavni stranka)
├── app.html               # FIXO React aplikace
├── public/                # Staticke soubory
│   ├── css/
│   │   └── styles.css     # Hlavni styly
│   ├── js/
│   │   └── app.js         # JavaScript aplikace
│   └── images/            # Obrazky a ikony
├── server.js              # Node.js/Express backend (pro lokalni vyvoj)
├── package.json           # NPM zavislosti
├── Dockerfile             # Docker image
├── docker-compose.yml     # Docker stack
├── nginx.conf             # Nginx konfigurace
└── README.md              # Tato dokumentace
```

## GitHub Pages

Stranka je dostupna na: **https://radecek222-boop.github.io/FIXO/**

## Hlavni funkce

- **AI Analyza fotografii** - Automaticka detekce objektu a zavady
- **Krok za krokem navody** - Jednoduche vizualni instrukce
- **Bezpecnostni upozorneni** - Varovani u rizikovych oprav
- **Historie oprav** - Sledovani dokoncenych a probihajicich oprav
- **Databaze 500+ zavad** - Kompletni prehled nejcastejsich problemu
- **Responzivni design** - Funguje na mobilu, tabletu i pocitaci

## Rychly start

### Varianta 1: Pouze HTML (bez backendu)

```bash
# Otevrit v prohlizeci
open public/index.html
```

### Varianta 2: S Node.js backendem

```bash
# Instalace zavislosti
npm install

# Spusteni serveru
npm start

# Aplikace bezi na http://localhost:3000
```

### Varianta 3: Docker

```bash
# Spustit vse
docker-compose up -d

# Overit funkcnost
curl http://localhost:3000/api/health

# Zastavit
docker-compose down
```

## API Endpointy

| Metoda | Endpoint | Popis |
|--------|----------|-------|
| GET | `/` | Landing page |
| GET | `/app` | FIXO aplikace |
| GET | `/api/health` | Health check |
| GET | `/api/categories` | Seznam kategorii |
| GET | `/api/objects` | Seznam objektu |
| GET | `/api/search?q=` | Vyhledavani |
| POST | `/api/analyze` | Analyza obrazku |
| GET | `/api/repair/:obj/:issue` | Detail opravy |
| GET | `/api/stats` | Statistiky |
| GET | `/api/tools` | Seznam nastroju |
| POST | `/api/history` | Ulozit historii |

## Technologie

**Frontend:**
- React 18
- Tailwind CSS
- Font Awesome
- Vanilla JavaScript

**Backend:**
- Node.js
- Express.js
- Multer (upload)
- Helmet (bezpecnost)

**Infrastruktura:**
- PostgreSQL (databaze)
- Redis (cache)
- MinIO (storage)
- Docker & Docker Compose
- Nginx

## Podporovane kategorie zavad

| Kategorie | Ikona | Priklady |
|-----------|-------|----------|
| Voda | 🚰 | Kapajici kohoutky, protekajici WC |
| Elektrina | ⚡ | Nefunkcni zasuvky, vadne vypinace |
| Topeni | 🌡️ | Studene radiatory, netesneni |
| Mechanika | ⚙️ | Vrzajici dvere, zasekle zamky |
| Nabytek | 🪑 | Rozviklane zidle, poskozene supliky |
| Okna & Dvere | 🚪 | Netesneni, zasekle kliky |
| Steny & Podlahy | 🏠 | Praskliny, poskozeni |
| Spotrebice | 🔌 | Drobne opravy |
| Kuchyn | 🍳 | Specialni opravy |
| Koupelna | 🚿 | Vodovodni problemy |
| Zahrada | 🌱 | Venkovni opravy |
| Auto/Moto | 🚗 | Zakladni udrzba |

## Deployment

### Predpoklady

- Docker & Docker Compose
- Min. 2GB RAM
- 10GB volneho mista
- Porty 80, 3000, 9000, 9001

### Produkce

```bash
# Vytvorit .env soubor
cat > .env << EOF
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://fixo_user:heslo@postgres:5432/fixo
REDIS_URL=redis://redis:6379
JWT_SECRET=your_secret_here
EOF

# Spustit
docker-compose up -d

# Overit
docker-compose ps
docker-compose logs -f
```

### Zdravotni kontroly

```bash
# Backend API
curl http://localhost:3000/api/health

# PostgreSQL
docker exec fixo-db pg_isready

# Redis
docker exec fixo-cache redis-cli ping
```

### Zalohy

```bash
# Databaze
docker exec fixo-db pg_dump -U fixo_user fixo > backup.sql

# Uploads
tar -czf uploads_backup.tar.gz ./uploads
```

### Skalovani

```yaml
# docker-compose.yml
backend:
  deploy:
    replicas: 3
```

## Bezpecnost

- Rate limiting na API
- Helmet.js ochrana
- CORS konfigurace
- Input validace
- Bezpecnostni upozorneni pro rizikove opravy
- Hodnoceni rizika 1-10

## Statistiky

| Metrika | Hodnota |
|---------|---------|
| Zavad v databazi | 500+ |
| Kategorii | 12 |
| Prumerna analyza | 30 sekund |
| Presnost detekce | 80-99% |
| Kroku na opravu | 3-8 |
| Uspesnost oprav | 87% |

## Cilova skupina

- Domacnosti bez technickych znalosti
- Kutilove a DIY nadsenci
- Spravci nemovitosti
- Studenti na kolejich
- Seniori potrebujici jednoduchou pomoc

## Monetizace

1. **Free verze** - Zakladni analyza a navody
2. **Premium** - Offline rezim, AR navody, detailni videa
3. **Affiliate** - Provize za doporucene nastroje
4. **B2B** - Partnerstvi s pojistovnami

## Budouci funkce

- [ ] AR navody - 3D overlay primo na objekt
- [ ] Diagnostika zvuku - Analyza zvuku zavady
- [ ] Komunitni tipy - Sdileni reseni mezi uzivateli
- [ ] Propojeni s opravari - Rychle objednani odbornika
- [ ] Offline rezim - Navody dostupne i bez internetu
- [ ] PWA - Instalovatelna aplikace

## Vyvoj

```bash
# Development mode
npm run dev

# Testy
npm test

# Build
docker build -t fixo .
```

## Kontakt

- **Email:** support@fixo.app
- **GitHub Issues:** Pro hlasenI chyb a navrhy

---

**FIXO Team** | Diplomova prace | 2024

*"Fix Anything. Anywhere. Instantly."*
