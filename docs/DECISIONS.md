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

- MDX setup using @next/mdx and @types/mdx. Why: official Next.js integration with Turbopack for static MDX compilation without external runtime bundlers. Rejected: contentlayer (abandoned), next-mdx-remote (overkill for static local files).
- @mdx-js/loader and @mdx-js/react are required peers of @next/mdx. Why: @next/mdx internal loader depends on @mdx-js/loader to process .mdx files.
- Architecture diagram as pure React/Tailwind component. Why: zero extra dependencies, native theme token support, and accessible semantic HTML. Rejected: Mermaid/flowchart libraries.

- Contact form postponed, mailto only for now. Why: simpler launch, direct communication, and zero email service/API route dependencies. Rejected: contact form with route handler.
- noindex removed at launch; robots.ts allows all crawlers and points to the sitemap.
- Floating pill navbar with contact CTA. Why: modern floating pill layout, keeps main navigation compact and clear, contact as primary action. Rejected: full-width sticky bar.
- Full-screen centered cutout hero. Why: striking editorial look with cutout portrait, smooth CSS mask blending and silhouette rim light without animation overhead. Rejected: split two-column hero.
- Name displayed as "Devendra Singh" visually in hero with "Baghel" in sr-only. Why: guarantees large single-line typography on all viewports down to 360px without wrapping, while preserving full name in accessibility tree and SEO. Rejected: multi-line wrapped heading.
- OG image v2 uses a pre-processed black-and-white portrait (satori has no filter/mask support); script scripts/make-og-portrait.mjs regenerates it.
