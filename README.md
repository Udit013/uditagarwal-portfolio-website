# Udit Agarwal — Portfolio (v9)

A 3D, animated personal portfolio rebuilt on a modern front-end stack.

**Stack:** React · TypeScript · GSAP · Three.js · WebGL · HTML · CSS · JavaScript

Built with [Vite](https://vite.dev). The Three.js layer uses
[React Three Fiber](https://r3f.docs.pmnd.rs) + [drei](https://github.com/pmndrs/drei).

> This `app/` directory is the current deliverable. The repository root still
> contains the previous vanilla HTML/CSS/JS version it was migrated from.

## Getting started

```bash
cd app
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check + production build to dist/
npm run preview  # preview the production build
```

## What's inside

| Area | Tech |
| --- | --- |
| UI / components | React 18 + TypeScript |
| Scroll & motion | GSAP + ScrollTrigger, Lenis smooth scroll, SplitType |
| 3D / WebGL | Three.js via React Three Fiber + drei |
| Build | Vite 5 |

### 3D features

- **Floating hero object** (`src/three/HeroObject.tsx`) — a distorted, drag-to-rotate
  icosahedron that drifts toward the cursor, masked so it glows out of the background.
- **3D skills showcase** (`src/three/SkillsScene.tsx`) — the core build stack
  (React, TypeScript, GSAP, Three.js, WebGL, HTML, CSS, JavaScript) orbiting in 3D,
  draggable to rotate.

Both scenes are lazy-loaded, respect `prefers-reduced-motion`, scale down on touch
devices, and recolor with the light/dark theme.

## Structure

```
app/src/
  components/   React components (Nav, Hero, About, Skills, Journey, Projects, Contact, Terminal, …)
  three/        React Three Fiber scenes (HeroObject, SkillsScene)
  hooks/        useLenis, useTheme, useReveal, useTyping, useActiveSection, useThemeTone, useSiteAnimations
  data/         content.ts (single source of truth) + terminal.ts (terminal KB/FAQ)
  lib/          mouse state + small utilities
  styles/       main.css (design tokens, layout, components)
```

Content lives in `src/data/content.ts` — edit there to update skills, projects,
journey, education, etc.
