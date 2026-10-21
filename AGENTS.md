<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project: Devendra's portfolio

Personal portfolio for Devendra Singh Baghel (backend-focused full-stack developer). Goal: help recruiters at startups and product companies in India see his work quickly. This repo is public.

### Stack
Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui. Dark-only at launch (next-themes). Motion: Framer Motion + CSS (Phase 5 only). Content lives in typed files in `data/` and MDX in `content/case-studies/`. No database. Hosted on Vercel.

### Commands
- `npm run dev`: dev server
- `npm run build`: must pass before every commit
- `npm run lint`: must pass before every commit
Use npm only. Never create other lockfiles.

### Structure
app/ (routes), components/ (ui/ = shadcn, rest = ours), data/ (experience.ts, projects.ts, skills.ts), content/case-studies/ (MDX), lib/, public/, docs/

### Code style
TypeScript strict, no `any`. Server Components by default; `"use client"` only where needed (motion, menus, forms). Use Tailwind with the tokens from docs/DESIGN.md; no hard-coded colors. Semantic HTML, alt text, visible focus states.

### Workflow
- Read the docs relevant to the current task first: docs/TASKS.md, docs/DESIGN.md, docs/CONTENT.md, docs/PRD.md.
- Plan first: list the files you will change and what you will not touch, then wait for approval before editing.
- One task at a time, smallest change that works. One task = one commit on `main`.
- Run `npm run build` and `npm run lint`, show the diff, then stop. Tick the task in docs/TASKS.md.

### Boundaries
- Always: take copy only from docs/CONTENT.md; respect prefers-reduced-motion; keep text readable on the dark background.
- Ask first: adding a dependency, changing folder structure, changing design tokens, adding a section or page. After approval, add an entry to docs/DECISIONS.md.
- Never: invent facts, numbers, skills, projects or testimonials; commit secrets or `.env*`; include phone numbers or confidential Dropty details; copy code, text or images from other portfolios; refactor unrelated code.