# Udit Agarwal — Portfolio

An interactive, animated personal portfolio with a liquid-glass UI, a WebGL
particle backdrop, and a real ⇆ anime portrait reveal.

**Live:** [uditagarwal.vercel.app](https://uditagarwal.vercel.app)
**Stack:** React 18 · TypeScript 6 (strict) · Vite 6 · GSAP (ScrollTrigger) · Lenis · SplitType · hand-written WebGL · Playwright · Vercel

> The React app lives at the repository root and is what Vercel builds and deploys.

## Getting started

```bash
npm install
npx playwright install chromium   # once, for the end-to-end tests

npm run dev       # dev server with HMR → http://localhost:5173
npm run build     # CSP hash check + type-check + production build to dist/
npm run preview   # serve the production build locally
npm run lint      # ESLint, e2e type-check, design-token drift + CSP hash checks
npm run test:e2e  # build, then the Playwright suite (desktop + mobile)
```

Deployed on Vercel: pushing to `main` triggers a production deploy.

## Highlights

- **Liquid-glass UI**: frosted glass surfaces with specular rims and a
  cursor-following highlight, tuned for both light and dark themes.
- **Reveal portrait**: a glass "device" splitting a real photo and an anime
  rendering; the divider follows the cursor across the frame.
- **Balanced About section**: three bands that each balance on their own: the
  intro copy beside the portrait, then credentials (education stacked on the
  left, certifications on the right), then four focus-area pillars in a 2×2
  grid. The certification list is the part that grows, so from the 7th
  certificate it splits into two columns; on tablets and phones the
  credentials stack and certifications tile.
- **Tabbed skills toolkit**: six WAI-ARIA tabs (Programming & Frontend;
  Backend, APIs & Architecture; Databases & Data Engineering; AI, Machine
  Learning & LLMs; Cloud, DevOps & Security; Testing, Quality & MLOps), each
  broken into labeled sub-categories.
- **Infinite project belt**: flagship projects glide in a seamless marquee;
  hover captures the scroll wheel to drive the belt with momentum, touch drags
  with inertia, and keyboard focus pauses it. Every card carries live, GitHub,
  and paper links, stack tags, and key metrics, and opens a case-study drawer
  (problem → approach → result, highlights, screenshot). Projects: NeuroClass,
  Veritome, PrepWise, CoreSightIQ, RxFlow, SnapCast, and CipherWatch.
- **WebGL backdrop**: a hand-written, zero-dependency particle shader (~2 KB
  gzip) that drifts toward the cursor and recolors with the theme, loaded only
  after the page is idle (`src/components/BackgroundFX.tsx`).
- **Motion**: GSAP + ScrollTrigger entrances, Lenis smooth scroll, SplitType
  heading reveals, a curtain intro, a floating glass nav, and a custom cursor.
- **Interactive terminal**: a built-in command line with a knowledge base,
  tab completion, history, and a chat mode.

## Quality

- **Performance**: replacing Three.js/R3F with raw WebGL removed ~218 KB gzip;
  idle repaints cut 62% and idle frame cost 42%; LCP 688 ms on throttled Fast
  4G with a 4× CPU slowdown. Case-study screenshots are served as WebP (PNG
  fallback), 86% smaller than the PNG set. Dependencies are split into
  long-cached `react` and `motion` chunks, so a content edit only invalidates
  the small app chunk.
- **Accessibility**: WCAG 2.1 A/AA checked by axe-core in the test suite, in
  both themes, with the terminal open, on desktop and mobile. Contrast via a
  theme-aware `--on-accent` token; inert off-screen menus with focus
  restoration; WAI-ARIA tabs and modal patterns.
- **Resilience**: a top-level error boundary, and the site stays fully
  functional when the browser blocks site storage (the theme just isn't
  remembered).
- **Security headers**: CSP and HSTS in `vercel.json`. Inline scripts are
  allowed by SHA-256 hash rather than `'unsafe-inline'`, so an injected script
  cannot run. `scripts/check-csp.mjs` fails the build if an inline script in
  `index.html` changes without its hash being updated.

## Testing

End-to-end tests live in `e2e/` and run with Playwright against the production
build (`vite preview`), on a desktop profile and a touch-phone profile, since
the app branches on both (Lenis and the custom cursor are desktop-only).

| Spec | Covers |
| --- | --- |
| `site.spec.ts` | Every section renders without errors; no horizontal scroll; theme toggle and persistence; storage-blocked browsers; nav and mobile menu |
| `interactions.spec.ts` | Skills tabs (keyboard pattern); case-study drawer (focus, Escape, restore); terminal commands, links, and input escaping; contact-form validation |
| `a11y.spec.ts` | axe-core WCAG A/AA in dark and light themes and with the terminal open |
| `about.spec.ts` | About layout contract: desktop columns, the 7+ certificate rule, tablet stacking, mobile reading order |

`e2e/fixtures.ts` loads each page past the intro curtain and fails a test on
any uncaught exception or console error.

## CI and dependencies

- **CI** (`.github/workflows/ci.yml`) runs on every push and pull request, and
  weekly so newly published advisories surface even without code changes:
  `npm audit` (fails on high/critical), lint, build, then the Playwright suite.
  A failure uploads the Playwright report as an artifact.
- **Dependabot** (`.github/dependabot.yml`) opens weekly grouped minor/patch
  updates and monthly GitHub Actions updates. React and TypeScript major
  versions are excluded and upgraded deliberately, with the test suite as the
  regression check. (React 19 was evaluated and declined: it passed every test
  but added ~24 KB gzip of JavaScript for features this site doesn't use.
  TypeScript 7 awaits typescript-eslint support.)
- Enable **Dependabot alerts and security updates** under the GitHub repo's
  Settings → Code security; that is a repository setting, not a file.

## Tech

| Area | Tech |
| --- | --- |
| UI / components | React 18 + TypeScript 6 (strict) |
| Build | Vite 6 |
| WebGL | Hand-written vertex/fragment shaders, no Three.js, no dependencies |
| Motion & scroll | GSAP + ScrollTrigger, Lenis, SplitType |
| Styling | Hand-written CSS with design tokens (`src/styles/main.css`) |
| Quality | ESLint (typescript-eslint), `scripts/check-tokens.mjs`, `scripts/check-csp.mjs` |
| Testing | Playwright end-to-end + axe-core accessibility (`e2e/`) |
| Hosting | Vercel (push-to-deploy, security headers) |

## Structure

```
src/
  components/   Nav, Hero, Marquee, About, Portrait, Skills, Journey,
                Projects + ProjectsBelt + ProjectDrawer, Contact, Footer,
                Terminal, Cursor, Loader, LenisProvider, ErrorBoundary,
                BackgroundFX (WebGL particle field), …
  hooks/        useLenis, useTheme, useThemeTone, useReveal, useTyping,
                useActiveSection, useSiteAnimations
  data/         content.ts (single source of truth) · terminal.ts (terminal KB/FAQ)
  lib/          shared mouse state + small utilities
  styles/       main.css (design tokens, layout, components)
public/         resume.pdf, portraits, project screenshots (WebP + PNG), fonts
e2e/            Playwright specs and shared fixtures
scripts/        build-time checks (design tokens, CSP hashes)
.github/        CI workflow and Dependabot config
```

## Updating content

Edit `src/data/content.ts` (and `src/data/terminal.ts` for the terminal). Both
are kept in sync with `knowledge_doc.md`, the master record of experience,
projects, and skills.

- **Certifications and coursework**: add entries to `CERTIFICATIONS` or an
  education's `coursework`. The About layout adapts on its own; no CSS changes
  are needed.
- **Project screenshots**: add the PNG to `public/projects/` and a WebP twin
  with the same name (for example `cwebp -q 85 -m 6 -sharp_yuv shot.png -o shot.webp`).
- **Inline scripts in `index.html`**: after editing one, run `npm run check:csp`
  and paste the printed hash into `vercel.json`, or the build will fail.

## License

Personal project, all rights reserved. Not for redistribution or commercial use.
