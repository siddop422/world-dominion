# WORLD DOMINION (Vercel-ready Demo + Full Source)

A persistent geopolitical MMO with 902 real-world regions, player economy, politics, wars, and diplomacy.

This is a **modified version** prepared so it can be fully set up and deployed:

1. **One-click Vercel import** → immediately playable in **Demo / Guest mode** (no database or Firebase required).
2. Full original backend code kept for later upgrade to real multiplayer.

## Quick Deploy on Vercel

1. Open https://vercel.com/new
2. Import GitHub repo: **siddop422/world-dominion**
3. Framework: **Vite**
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Deploy

The site loads in Demo Mode with the interactive world map and full UI.

### Optional env vars (add in Vercel dashboard later)

```
VITE_GAME_TITLE=WORLD DOMINION
VITE_DEMO_MODE=true
GEMINI_API_KEY=
CRON_SECRET=
SQL_HOST=
SQL_USER=
SQL_PASSWORD=
SQL_DB_NAME=
APP_URL=https://your-app.vercel.app
```

## Local run (Demo)

```bash
npm install
VITE_DEMO_MODE=true npm run dev
```

## What is included

- Complete React 19 + Tailwind UI (all views)
- 902-region SVG world map (`public/data/world-regions.json`)
- Guest/Demo play path (works without backend)
- Original pure rules engine (`src/lib/game/rules.ts`)
- Full Express + WebSocket + Drizzle backend (`server.ts` + services) for when you want real multiplayer
- Supabase migration file for easy Postgres setup
- Docs for architecture, multiplayer, security, deployment

## Upgrading to full multiplayer later

1. Create a Supabase (or Neon) project
2. Run `supabase/migrations/001_initial_schema.sql`
3. Run the seed/import scripts
4. Bridge the WebSocket hub to Supabase Realtime (or keep a small always-on Node service)
5. Turn off `VITE_DEMO_MODE` and set real credentials

See `docs/DEPLOYMENT.md` and `docs/MULTIPLAYER.md`.

## Repository

https://github.com/siddop422/world-dominion

Apache-2.0
