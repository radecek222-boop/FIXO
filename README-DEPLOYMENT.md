# FIXO Deployment Guide

## GitHub Pages (Recommended) ✅

**Status:** ACTIVE  
**URL:** https://radecek222-boop.github.io/FIXO/

### Automatic Deployment
Každý push na `main` branch automaticky spustí deployment na GitHub Pages pomocí GitHub Actions.

### Manual Deployment
```bash
git push origin main
```

Po několika minutách bude aplikace dostupná na: https://radecek222-boop.github.io/FIXO/

---

## Vercel (Optional) 🔷

**Status:** CONFIGURED  
**Config:** `vercel.json` v root projektu

### Setup
1. Připoj Vercel k GitHub repozitáři
2. Vercel automaticky detekuje konfiguraci
3. Deploy je automatický při push

### Config
```json
{
  "framework": null,  // Statický web, ne Next.js
  "outputDirectory": ".",
  "buildCommand": null
}
```

---

## Render.com ⚠️ DEPRECATED

**Status:** REMOVED  
**Důvod:** Render očekává Node.js aplikaci s package.json

FIXO je nyní **čistě statická stránka** bez Node.js dependencies.

Pokud chcete použít Render, musíte:
1. Vytvořit Static Site (ne Web Service)
2. Použít build command: `echo "No build needed"`
3. Publish directory: `.`

**Ale GitHub Pages je doporučené řešení.**

---

## Technické detaily

### Co je deployováno:
- `index.html` - Hlavní HTML (55 řádků)
- `src/app.js` - React aplikace (4820 řádků, Babel transpilace)
- `styles/` - CSS moduly
- `data/` - JSON databáze
- `assets/` - PWA ikony
- `manifest.json` - PWA manifest
- `service-worker.js` - Offline podpora

### Requirements:
- ✅ Static file hosting
- ✅ Support pro `.js` soubory
- ✅ Support pro Service Workers
- ❌ **NENÍ** potřeba Node.js
- ❌ **NENÍ** potřeba npm build
- ❌ **NENÍ** potřeba server-side rendering

### Browser Requirements:
- Modern browser s ES6+ podporou
- JavaScript enabled
- Service Worker API (pro PWA)

---

## Doporučené nastavení

### GitHub Pages ⭐
- **Výhody:** Zdarma, automatické, jednoduchý setup
- **Nevýhody:** Pouze static hosting, žádné API routes
- **Best for:** MVP, demo, portfolio projekty

### Vercel
- **Výhody:** CDN, fast, preview deployments
- **Nevýhody:** Limity na free tier
- **Best for:** Production ready apps

### Netlify
- **Výhody:** Forms, functions, podobné Vercel
- **Nevýhody:** Také limity na free tier
- **Best for:** JAMstack apps

---

## Troubleshooting

### GitHub Pages nefunguje?
1. Zkontroluj Settings > Pages > Source = GitHub Actions
2. Zkontroluj .github/workflows/deploy.yml
3. Zkontroluj Actions tab pro error logy

### Service Worker nefunguje?
1. Musí běžet na HTTPS (GitHub Pages má auto)
2. Zkontroluj DevTools > Application > Service Workers

### CSS/JS se nenačítá?
1. Zkontroluj cesty v index.html
2. GitHub Pages používá `/FIXO/` jako base path
3. Service worker má správné cesty s `/FIXO/` prefixem

---

**Poslední update:** 2025-11-26  
**Aktuální deployment:** GitHub Pages
