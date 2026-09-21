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

Requires `N8N_FITNESS_COACH_WEBHOOK_URL` in `.env.local` — the production
URL of the workflow's Chat Trigger node, e.g.:

```
N8N_FITNESS_COACH_WEBHOOK_URL=http://localhost:5678/webhook/<webhookId>/chat
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Push to `main` on the connected GitHub repo — Vercel auto-deploys. Set
`N8N_FITNESS_COACH_WEBHOOK_URL` in the Vercel project's environment
variables (pointing at the n8n instance's public URL, not localhost).
