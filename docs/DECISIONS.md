# Decisions

Append-only. Format: Decision. Why. Rejected.

- Next.js (App Router) + TypeScript + Tailwind + shadcn/ui. Why: React/Next.js demand at startups, and the site doubles as a Next.js proof project. Rejected: Astro, Vite + React.
- Rebuild from scratch, no template fork. Why: the reference template repo showed no license file. Rejected: forking it.
- Dark-only at launch, one lime accent, light mode later. Why: near-black reference look and simpler QA.
- Animations: Framer Motion + CSS, with a "Motion off" toggle. GSAP and Lenis only if really needed. Why: fewer dependencies. Rejected: GSAP from day one.
- No database. Why: content is typed files and MDX, the contact form sends email. Rejected: Postgres/Supabase.
- npm, not Bun. Why: Bun runtime on Vercel is beta and had a Next.js 16.3 build issue, install-speed gain is tiny. Rejected: Bun.
- Scaffold with Cache Components = No. Why: not needed for a static portfolio, avoids new caching rules.
- First Vercel deploy in Phase 1 with noindex, removed in Phase 7. Why: catch build and mobile problems early.
- Commit straight to `main`, one task per commit. Rejected: branch per phase.
- Page order: Hero, About, Case studies, Selected work, Skills, Experience, Contact. Why: strongest proof (Dropty) first.
- Featured projects: NexCart, StudySync, MealMate. Cineflix skipped for now.
- Skills list follows the resume; Docker, Redis, BullMQ left out until he is comfortable with them.
- Public contact: resume email only, never the phone number.