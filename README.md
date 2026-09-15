# Udit Agarwal — Portfolio

An interactive, animated personal portfolio with a liquid-glass UI, a WebGL
particle backdrop, and a real ⇆ anime portrait reveal slider.

**Live:** [uditagarwal.vercel.app](https://uditagarwal.vercel.app)
**Stack:** React 18 · TypeScript (strict) · Vite · GSAP (ScrollTrigger) · Lenis · SplitType · hand-written WebGL · ESLint · Vercel

> The React app lives at the repository root and is what Vercel builds and deploys.

## Getting started

```bash
npm install
npm run dev      # dev server with HMR → http://localhost:5173
npm run build    # type-check + production build to dist/
npm run lint     # ESLint + design-token drift check
npm run preview  # preview the production build locally
```

Deployed on Vercel — pushing to `main` triggers a production deploy.

## Highlights

- **Liquid-glass UI** — frosted glass surfaces with specular rims and a
  cursor-following highlight, tuned for both light and dark themes.
- **Reveal-slider portrait** — a glass "device" that splits a real photo and an
  anime rendering; the divider tracks the cursor, toggled on/off by the button.
- **Tabbed skills toolkit** — six WAI-ARIA tabs (Programming & Frontend;
  Backend, APIs & Architecture; Databases & Data Engineering; AI, Machine
  Learning & LLMs; Cloud, DevOps & Security; Testing, Quality & MLOps), each
  broken into labeled sub-categories.
- **Infinite project belt** — flagship projects glide in a seamless marquee;
  hover captures the scroll wheel to drive the belt with momentum, touch drags
  with inertia, and every card keeps live + GitHub + IEEE-paper links, stack
  tags, and key metrics. Each opens a case-study drawer (problem → approach →
  result, highlights, screenshot). Projects: NeuroClass, Veritome, PrepWise,
  CoreSightIQ, RxFlow, SnapCast, and CipherWatch.
- **WebGL backdrop** — a hand-written, zero-dependency WebGL particle shader
  (~2 KB gzip) that drifts toward the cursor and recolors with the theme,
  loaded only after the page is idle (`src/components/BackgroundFX.tsx`).
- **Motion** — GSAP + ScrollTrigger entrances, Lenis smooth scroll, SplitType
  heading reveals, a curtain intro, a floating glass nav, and a custom cursor.
- **Interactive terminal** — a built-in command line with a knowledge base and
  chat mode.
- **Performance** — replacing Three.js/R3F with raw WebGL removed ~218 KB
  gzip; idle repaints cut 62% and idle frame cost 42%; LCP 688 ms on
  throttled Fast 4G with a 4× CPU slowdown.
- **Accessibility** — 0 axe-core violations across dark, light, mobile, and
  open-terminal states; WCAG AA contrast via a theme-aware `--on-accent`
  token; inert off-screen menus with focus restoration.
- Fully responsive, theme-persistent (localStorage), `prefers-reduced-motion`
  aware, wrapped in a top-level error boundary, and served with CSP/HSTS
  security headers (`vercel.json`).

## Tech

| Area | Tech |
| --- | --- |
| UI / components | React 18 + TypeScript |
| Build | Vite 5 |
| WebGL | Hand-written vertex/fragment shaders — no Three.js, no dependencies |
| Motion & scroll | GSAP + ScrollTrigger, Lenis, SplitType |
| Styling | Hand-written CSS with design tokens (`src/styles/main.css`) |
| Quality | ESLint (typescript-eslint), strict TypeScript, `scripts/check-tokens.mjs` |
| Hosting | Vercel (push-to-deploy, security headers) |

## Structure

```
src/
  components/   Nav, Hero, Marquee, About, Portrait, Skills, Journey,
                Projects + ProjectsBelt, Contact, Footer, Terminal, Cursor,
                Loader, BackgroundFX (WebGL particle field), …
  hooks/        useLenis, useTheme, useThemeTone, useReveal, useTyping,
                useActiveSection, useSiteAnimations
  data/         content.ts (single source of truth) · terminal.ts (terminal KB/FAQ)
  lib/          shared mouse state + small utilities
  styles/       main.css (design tokens, layout, components)
public/         resume.pdf, portrait images, favicon, self-hosted fonts
```

To update content (skills, projects, journey, education, etc.), edit
`src/data/content.ts` (and `src/data/terminal.ts` for the terminal). Both are
kept in sync with `knowledge_doc.md`, the master record of experience,
projects, and skills.

## License

Personal project — all rights reserved. Not for redistribution or commercial use.
