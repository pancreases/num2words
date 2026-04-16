# Number to Words Converter
> Indian (Lakh/Crore) + International (Million/Billion) · Cheque-ready · SEO-optimised · Free to deploy

## Features
- ⚡ Instant as-you-type conversion — no button needed
- 🇮🇳 Indian system: Lakh, Crore, Arab
- 🌍 International system: Million, Billion, Trillion
- 📋 Cheque/Invoice mode: "Rupees … Only" format
- 🔢 Handles decimals (paise)
- 📋 One-click copy
- 🔍 SEO: static pages for 40+ popular numbers (`/50000`, `/100000`, etc.)
- 📊 Google Analytics ready
- 🗺️ Auto sitemap + robots.txt

---

## Deploy to Vercel (Free, ~2 minutes)

### Option A — Vercel CLI (fastest)
```bash
npm i -g vercel
cd num2words
npm install
vercel
```

### Option B — GitHub + Vercel UI
1. Push this folder to a GitHub repo
2. Go to vercel.com → New Project → Import your repo
3. Framework: Next.js (auto-detected)
4. Click Deploy

### Set your domain
- In Vercel dashboard → Domains → Add your domain
- Update `sitemap.ts` line 4 with your actual domain

---

## Google Analytics Setup
1. Go to [analytics.google.com](https://analytics.google.com)
2. Create a property → Web → get your **Measurement ID** (starts with `G-`)
3. In Vercel dashboard → Settings → Environment Variables → add:
   - Key: `NEXT_PUBLIC_GA_ID`
   - Value: `G-XXXXXXXXXX` (your actual ID)
4. Redeploy

Or locally: copy `.env.local.example` → `.env.local` and add your ID.

---

## Local development
```bash
npm install
npm run dev
# Open http://localhost:3000
```

---

## SEO Structure
- **Homepage** `/` — targets "number to words", "amount in words", "numbers to words converter"
- **Number pages** `/50000`, `/100000` etc — targets "50000 in words", "1 lakh in words" etc
- **Sitemap** auto-generated at `/sitemap.xml`
- **FAQ section** on homepage covers top 8 searched questions

### To add more number pages
In `lib/converter.ts`, add numbers to the `popularNumbers` array. They'll get static pages automatically.

---

## Customise
- **Domain** — update `sitemap.ts` with your domain
- **GA ID** — set `NEXT_PUBLIC_GA_ID` env var
- **Colors** — edit CSS variables in `app/globals.css`
- **Fonts** — edit `app/layout.tsx` Google Fonts link + CSS vars
