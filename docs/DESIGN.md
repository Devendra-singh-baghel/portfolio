# Design

Inspiration only: premium editorial + modern developer look, dark-only at launch. Do not copy any other portfolio's code, text, images or exact styling.

## Colors (tune after seeing the live site)
Map these to the shadcn/Tailwind theme variables. No hard-coded hex in components.

| Token | Value | Use |
| --- | --- | --- |
| background | #0B0B0B | Page base |
| card (surface) | #141414 | Cards |
| border | #262626 | Dividers, card borders |
| foreground | #F4F2EC | Headings and body |
| muted-foreground | #A09D96 | Secondary text, labels |
| primary (accent) | #C9F56A | Buttons, active states, small highlights |
| primary-foreground | #171717 | Text on the accent |

Only one accent. Use the lime only as a fill with dark text, or on the dark background. Never as text on a light surface.

## Typography (load with next/font)
- Instrument Serif: hero and section headlines only.
- Manrope: body, navigation, buttons.
- IBM Plex Mono: small uppercase labels such as "01 / ABOUT", project metadata, tags.
- Hero headline: starts at clamp(3rem, 8vw, 7.5rem), tight line-height (about 1.0 to 1.05).
- Body 16 to 18 px, line-height about 1.6, paragraph width about 65 characters.

## Layout (starting values)
- Content max width about 1200 px; side padding 16 px on mobile, 24 to 32 px on desktop.
- Section spacing: 64 to 96 px mobile, 96 to 160 px desktop.
- Section header: mono label + serif headline.

## Components
- Button: primary = accent fill with dark text; secondary = outline with border color.
- Card: surface background, 1 px border, border brightens on hover.
- Tag: small outlined chip in mono font.
- Links: underline or border transition on hover; always a visible focus ring.

## Hero
Large headline, one supporting line, two buttons (Explore Projects, Contact Me), GitHub and LinkedIn links. Optional black-and-white portrait: public/images/profile.jpg, shown with a grayscale filter and descriptive alt text. If it looks wrong, remove it.

## Motion (Phase 5, not before)
- Hero: headline line-by-line reveal, then subtitle and buttons slightly delayed; runs once.
- Scroll reveals: subtle opacity + small translate, light stagger, no large movement.
- Cards: small image zoom, small arrow move, border transition; keyboard focus states too.
- A "Motion off" toggle plus prefers-reduced-motion. Both disable marquee and large movement. Content must never depend on animation.
- Optional later (P2): text marquee, smooth scrolling.

## Do not
Glow or heavy gradients, random icon grids, skill progress bars or percentages, emoji, stock images, a second accent color, hover-only interactions.

## Responsive checks
Test at 360, 768 and 1280 px. No horizontal overflow, readable text, working mobile menu, no content hidden behind the sticky navbar.