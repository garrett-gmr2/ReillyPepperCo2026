# Reilly Pepper Co. — Recipe Book App

## What this is
A personal recipe book app built as a Mother's Day gift. Family and friends can browse AI-generated meal plans, rate them (1–5 stars, anonymous), and leave comments.

## Stack
- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- Supabase (Postgres) for ratings + comments
- Deployed on Vercel (not yet — next step)

## Key conventions
- Recipe plans are HTML fragments stored in `content/plans/`
- Add a new plan: drop the HTML file in `content/plans/`, add metadata entry to `content/plans/index.ts`
- The HTML fragments use CSS custom properties (`--color-text-primary` etc.) defined in `app/globals.css`
- Expand/collapse buttons in the HTML use `onclick="toggleSection(id)"` — `window.toggleSection` is injected by `PlanViewer.tsx` via `useEffect`
- Ratings and comments are anonymous (session UUID stored in localStorage)

## Database (Supabase)
- Tables: `ratings`, `comments` — schema in `supabase/schema.sql`
- Env vars in `.env.local` (not committed): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Immediate next steps
1. Deploy to Vercel (`vercel` CLI or connect GitHub repo)
2. Add Supabase env vars to Vercel dashboard after deploy
3. Add more recipe plan HTML files as they're generated

## Brand
- Name: Reilly Pepper Co.
- Colors: pepper red `#be2d2d`, warm cream page bg `#fdf8f3`
- Fonts: Playfair Display (headings), Inter (body)
- Tone: warm, personal, family-oriented
