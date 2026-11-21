# Tejas Melkote — Portfolio

Personal engineering portfolio for **Tejas Melkote** (2026 new grad · AI/ML + full-stack).

**Live site:** [https://tejas-melkote.vercel.app/](https://tejas-melkote.vercel.app/)

## What’s inside

- Case studies for production work (Vantage, TasteIQ) and independent builds (INUIT, AI Trip Planner, MedTruth AI)
- Recruiter packet + resume PDF
- Live **GitHub contribution pulse** via GraphQL (`/api/github-pulse`)
- Ask-Tejas chat (Groq) and optional `/views` analytics

## Stack

React · Vite · Vercel serverless API routes

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Vercel environment variables

| Variable | Purpose |
| --- | --- |
| `GITHUB_TOKEN` | Classic PAT with `read:user` (or fine-grained Contributions) so pulse totals include private activity on `@TejasMelkote`. Without it, public calendars only. |
| `GROQ_API_KEY` | Ask Tejas chat |
| `VIEWS_PASSWORD` | Password gate for `/views` analytics (set in Vercel; never commit a real value) |

## GitHub accounts

- Work: [@TejasMelkote](https://github.com/TejasMelkote)
- Personal: [@Tejasdagr8](https://github.com/Tejasdagr8)

## License

Private portfolio source — all rights reserved unless noted otherwise.
