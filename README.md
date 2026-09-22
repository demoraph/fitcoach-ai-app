# FitCoach AI

A minimal chat front-end for the "Fitness Coach" n8n workflow, with a
right-hand training log that tracks messages sent, levels, streaks, and a
few milestone badges.

- Chat + markdown rendering of the coach's replies
- Session and progress persisted per-browser (localStorage, no login)
- Level up every 8 messages; streaks count consecutive days chatted

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Requires a `.env.local` (not committed) with:

```
N8N_WEBHOOK_URL=<the n8n workflow's webhook URL>
N8N_WEBHOOK_USER=<Basic Auth username configured on the webhook>
N8N_WEBHOOK_PASSWORD=<Basic Auth password configured on the webhook>
```

The n8n webhook requires Basic Auth (configured on the "Fitness Coach"
workflow's chat trigger). `route.ts` sends it as an `Authorization` header
server-side — the browser never sees it.

## Deploy

Push to `main` on the connected GitHub repo — Vercel auto-deploys. The
three env vars above must also be set in the Vercel project's Environment
Variables settings (a redeploy is needed after adding/changing them).
