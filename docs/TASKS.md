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
- [x] Hero (headline, support line, buttons, social links, optional B&W photo)
- [x] About
- [x] Skills in groups
- [x] Check at 360, 768, 1280 px
Done when: the four sections show real content on the live URL and the mobile menu works.

## Phase 3: Experience and projects (P0)
- [x] data/experience.ts and data/projects.ts (typed)
- [x] Experience and education sections
- [x] Selected work cards: NexCart, StudySync, MealMate
- [x] Screenshots optimised with next/image
Done when: adding a project needs only one entry in data/projects.ts and no card has a broken link.

## Phase 4: Case study (P0)
- [x] MDX setup and /case-studies/[slug] route, link from the home page
- [x] Case study layout: Problem, Constraints, Architecture (diagram), Decisions and trade-offs, Result
- [x] Case study: AI document extraction (from docs/CASE-STUDIES.md, no additions)
- [x] Review: no partner names or internal details
Done when: the case study opens from the home page and has a diagram.

## Phase 5: Contact and resume (P0)
- [x] Contact section (id="contact", label "06 / CONTACT"): email link, GitHub, LinkedIn, Resume download (phone-free PDF already in public/; use its exact file name)
- [x] Footer (copyright and links only, no new claims)
Done when: all contact links and the resume download work on the live site.

## Phase 6: SEO, accessibility, performance, repo cleanup (P1)
- [x] Metadata, Open Graph image, favicon, canonical, sitemap
- [x] Keyboard navigation, focus, contrast, alt text
- [ ] Images optimised, lazy loading, Lighthouse check
- [x] 404 page
- [x] README for the repo
Done when: no major Lighthouse red flags and keyboard-only navigation works.

## Phase 7: Launch (P0)
- [ ] Final review of links, typos, mobile
- [ ] Re-check Dropty content for confidentiality
- [ ] Remove `noindex`, check sitemap
Done when: all links and contact actions are tested.

## Phase 8: Motion and animations (P1, after launch)
- [ ] Choose one animation library (Motion or GSAP, not both) and log it in docs/DECISIONS.md
- [ ] Hero entrance, scroll reveals, card hover and focus states, navbar transitions
- [ ] "Motion off" toggle + prefers-reduced-motion
Done when: the site reads fully with motion off.