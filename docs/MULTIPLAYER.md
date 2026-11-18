# Real-Time Multiplayer & Synchronization

World Dominion uses a persistent WebSocket hub (`src/realtime/ws-hub.ts`) mounted on `/ws` alongside the Express HTTP server.

## Presence & Rooms

- **Authenticated Sockets**: Clients pass `?token=<idToken>` on upgrade. Verified players register in `onlinePlayers` and automatically subscribe to `global:world`, `user:<playerId>`, and `state:<citizenshipStateId>`.
- **Dynamic Subscriptions**: Clients send `{ "action": "subscribe", "channel": "channel:<id>" }` when opening chat channels or war rooms.
- **Zero-Refresh Events**:
  - `presence:update` — Updates active citizen roster across all browsers.
  - `chat:message` — Appends incoming messages immediately in `ChatView`.
  - `market:trade` / `fx:trade` — Refreshes open order books and balances.
  - `war:declared` / `war:strike` / `war:resolved` / `region:conquered` — Live battle bars and SVG map ownership repaint.
  - `election:vote` / `election:resolved` / `law:vote` / `law:resolved` — Live ballot counts and enacted national policy changes.

## Vercel / Serverless note

On pure serverless platforms, replace the custom `ws` hub with Supabase Realtime Broadcast channels or a third-party service (Pusher, Ably, PartyKit) and update the client `GameContext` accordingly.
