# System Architecture — World Dominion

## Topology

```
PLAYER BROWSER (React 19 + SVG Map + WebSocket Client)
        |
        +--- HTTPS /api/* (JSON + Bearer Firebase ID Token)
        |       |
        |       v
        |    EXPRESS SERVER (server.ts, Zod validation, Auth Middleware)
        |       |
        |       v
        |    DOMAIN SERVICES (economy-service.ts, politics-war-service.ts)
        |       |
        |       +---> POSTGRESQL (Drizzle ORM, FOR UPDATE locks, double-entry ledger)
        |       |
        |       +---> REALTIME HUB (src/realtime/ws-hub.ts on /ws)
        |
        +--- WSS /ws (Presence + Room Subscriptions: global:world, state:*, channel:*, user:*)
```

## Directory Layout

- `server.ts` — Express REST API, Vite dev middleware / `dist/` static server, WebSocket attachment on port 3000.
- `src/db/schema.ts` — 43 PostgreSQL tables covering profiles, geography, double-entry ledgers, companies, markets, FX, politics, wars, diplomacy, press, and chat.
- `src/db/seed.ts` — Idempotent `ensureWorldSeeded()` seeding `GOLD`, 10 sovereign starter states, T1–T5 catalog, 902 regions, and default chat channels.
- `src/lib/game/config.ts` — Centralized balance configuration (energy cap, recipes, starter grants, war/election timers).
- `src/lib/game/rules.ts` — Pure deterministic game formulas covered by `tests/unit/rules.test.ts`.
- `src/services/economy-service.ts` — Transactional economy, energy sync, work, production, market order-matching, and FX exchange.
- `src/services/politics-war-service.ts` — Transactional parties, D'Hondt elections, law enactment, nation founding, land/naval wars, diplomacy, press, chat, and `settleDueWorldEvents()`.
- `src/realtime/ws-hub.ts` — Room-scoped WebSocket broadcast and active citizen presence registry.
- `src/components/*` — Modular React UI across all 21 game views.
