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

The n8n webhook URL is hardcoded in `src/app/api/chat/route.ts`
(`N8N_WEBHOOK_URL`) rather than read from an environment variable. If the
n8n instance's public URL ever changes, update it there.

## Deploy

Push to `main` on the connected GitHub repo — Vercel auto-deploys, no
environment variables required.
