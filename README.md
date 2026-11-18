# WORLD DOMINION

A persistent, server-authoritative geopolitical MMO inspired by Parlamentum. Players interact across a shared global world of **902 real-world geographical regions**, founding companies, manufacturing 5 tiers of commodities, trading currencies and goods on double-entry order books, forming political parties, voting in D'Hondt parliamentary and presidential elections, enacting legislation, waging land and naval wars, negotiating treaties, publishing newspapers, and communicating in real time.

## Architecture Overview

- **Frontend**: React 19 + TypeScript + Tailwind CSS v4 + Vite + Lucide icons (`src/components/*`, `src/context/GameContext.tsx`).
- **Backend**: Node.js + Express (`server.ts`) with Zod validation and transactional PostgreSQL services (`src/services/*`).
- **Database**: PostgreSQL via Drizzle ORM (`src/db/schema.ts`, `src/db/index.ts`) with row-level `FOR UPDATE` locks and double-entry wallet ledger accounting.
- **Realtime**: Dedicated WebSocket hub (`ws` on `/ws` in `src/realtime/ws-hub.ts`) broadcasting presence, chat messages, market fills, war strikes, territory conquests, elections, and enacted laws without page refreshes.
- **Authentication**: Firebase Authentication (Google Sign-In) verified server-side via `firebase-admin`.
- **World Map**: 902 real-world geographical sub-regions generated deterministically from `world-atlas` Natural Earth 110m data (`scripts/generate-world-map.ts` -> `public/data/world-regions.json`).

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   # or: bun install
   ```
2. Configure environment variables using `.env.example` (`SQL_HOST`, `SQL_USER`, `SQL_PASSWORD`, `SQL_DB_NAME`, `CRON_SECRET`, `VITE_GAME_TITLE`).
3. Push database schema & seed world regions:
   ```bash
   npx tsx scripts/import-world-data.ts
   ```
4. Run unit tests:
   ```bash
   npm test
   ```
5. Start development server on port 3000:
   ```bash
   npm run dev
   ```
6. Run production build:
   ```bash
   npm run build && npm start
   ```

## Documentation Index

- `docs/ARCHITECTURE.md` — System topology, request lifecycle, and directory layout.
- `docs/DATABASE.md` — 43-table PostgreSQL schema, double-entry ledger, and idempotency guarantees.
- `docs/MULTIPLAYER.md` — WebSocket rooms, presence tracking, and zero-refresh synchronization.
- `docs/SECURITY.md` — Auth boundaries, server-authoritative invariants, and anti-cheat rules.
- `docs/GAME_MECHANICS.md` — Energy regeneration, D'Hondt seats, recipes, combat formulas.
- `docs/DEPLOYMENT.md` — Cloud Run / Vercel + Supabase notes.

## Vercel notes

This project is designed for a persistent Node.js server. For Vercel:
- Use Supabase (or Neon / Vercel Postgres) for the database.
- Apply `supabase/migrations/001_initial_schema.sql`.
- Run the import/seed scripts against your DB.
- For multiplayer, bridge the WebSocket hub to Supabase Realtime (or Pusher/Ably) because long-lived custom WS servers are not ideal on pure serverless.
- Set environment variables in the Vercel dashboard.
- Add a cron job for `/api/cron/settle`.

See `docs/DEPLOYMENT.md` for more.
