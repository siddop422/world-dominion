# Deployment & Operations Guide

## 1. AI Studio / Cloud Run + Cloud SQL Deployment (Current Runtime)

1. Provisioned Cloud SQL PostgreSQL (`SQL_HOST`, `SQL_USER`, `SQL_PASSWORD`, `SQL_DB_NAME`) and Firebase Auth (`firebase-applet-config.json`).
2. Schema managed via Drizzle (`src/db/schema.ts`, `src/db/drizzle.config.ts`).
3. Build frontend assets & start full-stack Express + WebSocket server on port 3000:
   ```bash
   npm run build
   npm start
   ```
4. Configure an external Cloud Scheduler / cron ping to `POST /api/cron/settle` with `Authorization: Bearer $CRON_SECRET` every 1–5 minutes to settle expired elections, laws, wars, and market orders.

## 2. Optional Vercel + Supabase Portability Path

If deploying outside AI Studio to **Vercel + Supabase**:
1. Apply `supabase/migrations/001_initial_schema.sql` to your Supabase PostgreSQL project.
2. Run `npx tsx scripts/import-world-data.ts` to populate the 902 world regions, currencies, catalog items, and 10 initial states.
3. For serverless Vercel Edge/Lambda environments where persistent Node WebSocket servers cannot stay open on a single instance, bridge `realtimeHub.broadcast(...)` in `src/realtime/ws-hub.ts` to Supabase Realtime Broadcast / Upstash / Pusher channels.
4. Add a `vercel.json` cron entry hitting `/api/cron/settle`.

## Environment variables required on Vercel

- `SQL_HOST`, `SQL_PORT`, `SQL_USER`, `SQL_PASSWORD`, `SQL_DB_NAME` (or `DATABASE_URL`)
- `CRON_SECRET`
- `GEMINI_API_KEY` (for AI features)
- `APP_URL` (your Vercel deployment URL)
- `VITE_GAME_TITLE`
- Firebase Admin credentials (service account) if using server-side verification
