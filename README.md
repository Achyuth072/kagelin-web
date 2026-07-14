# kagelin-web

Homepage for [Kagelin](https://app.kagelin.app), served at the apex `kagelin.app`.

## Develop

```bash
npm install
cp .env.example .env.local   # optional for local UI work
npm run dev
```

The waitlist needs the Supabase and Turnstile keys from `.env.example` plus the
`supabase/waitlist_signups.sql` table; deploy as a separate Vercel project with
`kagelin.app` bound.
