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
- Animation library: Motion (npm package "motion"). It is the ONLY animation library in this project. Why: modern React 19 support, minimal runtime via LazyMotion / m components, and WAAPI hybrid acceleration. Rejected: GSAP, anime.js, multiple animation libraries.
- No "Motion off" toggle for now (maybe later); prefers-reduced-motion MUST still be respected everywhere via MotionConfig (reducedMotion="user"). Why: respects system accessibility preferences without complicating UI before need is proven. Rejected: custom toggle at launch.
- The marquee will be pure CSS and the hero dust dissolve will be custom canvas code (later tasks). Why: neither requires an extra library, keeping JS bundle size minimal. Rejected: third-party marquee or particle packages.
- Hero dust dissolve effect on mobile too, with lower particle count and automatic degrade when frames are slow. Why: consistent visual design across device sizes without sacrificing mobile performance or battery. Rejected: desktop-only effect or heavy WebGL engine.
- LazyMotion features loaded asynchronously via dynamic import in components/motion-features.ts. Why: synchronous domAnimation increases client bundle by ~75 KB raw / ~26 KB gzip (>10 KB limit); async loading keeps initial route First Load JS minimal and creates an isolated chunk. Rejected: synchronous domAnimation import in provider.
- Hero entrance and navbar drop-in use CSS keyframes (JS-free, LCP-safe). Why: executes immediately without waiting for JS bundle evaluation or hydration, guarantees zero layout shift or LCP degradation on the hero portrait. Rejected: animating hero with Motion / Framer Motion.
- Scroll reveals use a Motion-based Reveal component with viewport triggers (once: true, amount: 0.2). Why: lightweight, declarative scroll reveals using LazyMotion and m components with staggered delays for lists and grids. Rejected: intersection observer boilerplate in every section or heavy scroll libraries.
- No layoutId or layout animations. Why: layoutId requires domMax, which would add ~30+ KB to the bundle; CSS transitions handle active tab and navbar states with zero overhead. Rejected: layoutId on navbar indicator.
- No-JS fallback for reveals uses @media (scripting: none) in globals.css. Why: ensures all content is immediately visible (opacity 1, transform none) if JavaScript is disabled, without adding a manual <head> to app/layout.tsx. Rejected: manual <head> in root layout.
- Hero eyebrow types and rotates the whole phrase (Full-stack, Backend, Frontend developer) with reserved width; static text for SSR, reduced motion and screen readers. Why: no spacing shift, developer-portfolio feel. Rejected: rotating only the first word (alignment shifts), letter-spacing equalization (uneven look).
- Navbar hides on scroll down and shows on scroll up; always visible at top, with the mobile menu open, or with keyboard focus inside. Why: maximizes reading space for content while keeping navigation instantly reachable on scroll up or keyboard interaction. Rejected: permanently fixed bar or un-animated jump.
- Icons: simple-icons for brand logos, small inline SVG for LinkedIn (not in simple-icons), lucide for UI icons; rendered in Server Components so no client JS. Skills marquee is CSS-only, aria-hidden (tags below are the accessible content), with a reduced-motion fallback. Why: professional look, zero runtime overhead, accessible fallback. Rejected: react-icons (large install, mixed licenses), CDN icon services (runtime requests).
