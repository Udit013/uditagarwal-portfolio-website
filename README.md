# Udit Agarwal — Portfolio

An interactive, animated personal portfolio with a liquid-glass UI, a WebGL
particle backdrop, and a real ⇆ anime portrait reveal slider.

**Live:** [uditagarwal.vercel.app](https://uditagarwal.vercel.app)
**Stack:** React 18 · TypeScript · Vite · GSAP · custom WebGL · Lenis

> The React app lives at the repository root and is what Vercel builds and
> deploys. The original vanilla HTML/CSS/JS version is preserved on the
> [`vanilla-site-backup`](https://github.com/Udit013/uditagarwal-portfolio-website/tree/vanilla-site-backup)
> branch.

## Getting started

```bash
npm install
npm run dev      # dev server with HMR → http://localhost:5173
npm run build    # type-check + production build to dist/
npm run preview  # preview the production build locally
```

Deployed on Vercel — pushing to `main` triggers a production deploy.

## Highlights

- **Liquid-glass UI** — frosted glass surfaces with specular rims and a
  cursor-following highlight, tuned for both light and dark themes.
- **Reveal-slider portrait** — a glass "device" that splits a real photo and an
  anime rendering; the divider tracks the cursor, toggled on/off by the button.
- **Categorized skills toolkit** — *All* plus six groups (Programming & Frontend;
  Backend, APIs & Architecture; Databases & Data Engineering; AI, ML & LLMs;
  Cloud, DevOps & Security; Testing & Quality Engineering), each broken into
  labeled sub-categories.
- **Infinite project belt** — flagship projects glide in a seamless marquee;
  hover captures the scroll wheel to drive the belt with momentum, touch drags
  with inertia, and every card keeps live + GitHub + IEEE-paper links, stack
  tags, and key metrics.
- **WebGL backdrop** — a hand-written, zero-dependency WebGL particle shader
  (~2 KB gzip) that drifts toward the cursor and recolors with the theme,
  loaded only after the page is idle (`src/components/BackgroundFX.tsx`).
- **Motion** — GSAP + ScrollTrigger entrances, Lenis smooth scroll, SplitType
  heading reveals, a curtain intro, a floating glass nav, and a custom cursor.
- **Interactive terminal** — a built-in command line with a knowledge base and
  chat mode.
- Fully responsive, theme-persistent (localStorage), and
  `prefers-reduced-motion` aware.

## Tech

| Area | Tech |
| --- | --- |
| UI / components | React 18 + TypeScript |
| Build | Vite 5 |
| WebGL | Hand-written vertex/fragment shaders — no Three.js, no dependencies |
| Motion & scroll | GSAP + ScrollTrigger, Lenis, SplitType |
| Styling | Hand-written CSS with design tokens (`src/styles/main.css`) |

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
`src/data/content.ts` — it's the single source of truth.

## License

Personal project — all rights reserved. Not for redistribution or commercial use.
