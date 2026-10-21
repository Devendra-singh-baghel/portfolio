# Tasks

Rule: do one unchecked task at a time. Tick it only after `npm run build` and `npm run lint` pass and the change is committed to `main`.

## Phase 1: Foundation, design system, first deploy (P0)
- [x] Design tokens from docs/DESIGN.md mapped to theme variables (dark default via next-themes)
- [x] Fonts loaded with next/font (Instrument Serif, Manrope, IBM Plex Mono)
- [x] Base components: button, link, section header, card, tag
- [x] `noindex` robots metadata until launch
- [x] First deploy on Vercel
Done when: a dark placeholder page is live and tokens and fonts render correctly.

## Phase 2: Layout, hero and core sections (P0)
- [x] Navbar with active-link indicator, mobile menu, skip-to-content link
- [ ] Hero (headline, support line, buttons, social links, optional B&W photo)
- [ ] About
- [ ] Skills in groups
- [ ] Check at 360, 768, 1280 px
Done when: the four sections show real content on the live URL and the mobile menu works.

## Phase 3: Experience and projects (P0)
- [ ] data/experience.ts and data/projects.ts (typed)
- [ ] Experience and education sections
- [ ] Selected work cards: NexCart, StudySync, MealMate
- [ ] Screenshots optimised with next/image
Done when: adding a project needs only one entry in data/projects.ts and no card has a broken link.

## Phase 4: Case studies (P0)
- [ ] MDX setup and /case-studies/[slug] route, list on the home page
- [ ] Case study template: Problem, Constraints, Architecture (diagram), Decisions and trade-offs, Result, What I would improve
- [ ] Case studies 1 and 2 (see docs/CONTENT.md)
- [ ] Review: no partner names or internal details
Done when: case studies open from the list and each has a diagram.

## Phase 5: Animations, motion toggle, contact form (P1)
- [ ] Hero entrance, scroll reveals, card hover and focus states
- [ ] Navbar active link and mobile menu animation
- [ ] "Motion off" toggle + prefers-reduced-motion
- [ ] Contact section with email link, GitHub, LinkedIn, resume download
- [ ] Contact form via route handler + email service with spam protection; keys in .env only
Done when: the site reads fully with motion off and a test message reaches the inbox.

## Phase 6: SEO, accessibility, performance, repo cleanup (P1)
- [ ] Metadata, Open Graph image, favicon, canonical, sitemap
- [ ] Keyboard navigation, focus, contrast, alt text
- [ ] Images optimised, lazy loading, Lighthouse check
- [ ] 404 page
Done when: no major Lighthouse red flags and keyboard-only navigation works.

## Phase 7: Launch (P0)
- [ ] Final review of links, typos, mobile
- [ ] Re-check Dropty content for confidentiality
- [ ] Remove `noindex`, check sitemap
Done when: all links and contact actions are tested.