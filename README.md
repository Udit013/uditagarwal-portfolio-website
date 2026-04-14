# Udit Agarwal — Portfolio

A premium, award-level personal portfolio website built with **Vite + Vanilla JS**, featuring glassmorphism design, animated gradient mesh background, GSAP-powered cinematic animations, Lenis smooth scroll, SplitType kinetic text reveals, and a fully interactive terminal chatbot.

---

## ✨ Features

- **Glassmorphism UI** — Frosted-glass cards with backdrop blur, soft borders, and layered shadows throughout
- **Animated Gradient Mesh** — Interactive CSS gradient mesh background that reacts to mouse position
- **Cinematic Animations** — GSAP-powered hero entrance, word-by-word text reveals via SplitType, scroll-driven parallax
- **Custom Cursor** — Context-aware two-layer cursor with label overlays and magnetic button effects
- **Interactive Terminal** — Bottom-right `>_` floater with full command set, Q&A chat mode, autocomplete, history, and reset
- **Filterable Skills Grid** — Individual skill cards with "All" default filter + category filters (Frontend / Backend / AI/ML / Data / Cloud)
- **Vertical Timeline** — Centered top-to-bottom professional path with animated spine and dot indicators
- **Animated Counters** — Stat numbers count up when scrolled into view
- **Dark / Light Theme** — System-aware theme toggle with smooth transitions; light theme is default
- **Smooth Scroll** — Lenis physics-based scroll with proper isolation for scrollable overlays
- **Fully Responsive** — Mobile-first design with adaptive typography and touch-friendly interactions
- **Zero framework overhead** — Pure Vite + Vanilla JS, no React, no Vue

---

## 🛠️ Tech Stack

| Tool | Role |
|---|---|
| **Vite 5** | Dev server + production bundler |
| **GSAP + ScrollTrigger** | All animations, scroll-driven effects, counters |
| **Lenis** | Physics-based smooth scroll, synced to GSAP ticker |
| **SplitType** | Character/word/line splitting for kinetic text |
| **Vanilla JS (ESM)** | All interactivity — no framework overhead |
| **CSS Custom Properties** | Full design token system, dual theme support |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** v18 or higher
- **npm** (or pnpm / bun)

### Installation

```bash
# 1. Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# 2. Install dependencies
npm install

# 3. Start the development server — opens at http://localhost:5173
npm run dev
```

### Available Scripts

```bash
npm run dev      # Start development server with HMR
npm run build    # Build for production (output: /dist)
npm run preview  # Preview the production build locally
```

---

## 📂 Project Structure

```
├── index.html              # Entry point — all HTML sections
├── package.json
├── vite.config.js          # Minimal Vite config (optional)
├── public/
│   └── resume.pdf          # Place your resume PDF here
└── src/
    ├── css/
    │   └── main.css        # Full design system — tokens, components, layout
    └── js/
        └── main.js         # All JS — animations, terminal, filters, interactions
```

---

## 📄 Sections

| # | Section | Description |
|---|---|---|
| 01 | **Hero** | Kinetic name reveal, typing role animation, orbital badge, mouse-parallax layers |
| 02 | **About** | Sticky layout with philosophy block, expanded education cards with coursework, certifications |
| 03 | **Skills** | Filterable individual skill cards — All / Frontend / Backend / AI·ML / Data / Cloud |
| 04 | **Journey** | Vertical centered timeline with animated spine, role cards, bullet points |
| 05 | **Projects** | Filterable glass cards (All / Full-Stack / AI·ML / Data) + IEEE publication highlight |
| 06 | **Contact** | Contact links, availability block, form that fills full column height |

---

## ⚙️ Customization

### Updating Content

All content lives directly in `index.html`. Each section is clearly commented:

```html
<!-- ══════════ ABOUT ══════════ -->
<!-- ══════════ SKILLS ══════════ -->
<!-- ══════════ JOURNEY ══════════ -->
<!-- ══════════ PROJECTS ══════════ -->
<!-- ══════════ CONTACT ══════════ -->
```

### Design Tokens

All colors, spacing, and glass variables are CSS custom properties in `src/css/main.css`:

```css
/* Light theme (default) */
[data-theme="light"] {
  --accent2: #c05020;   /* main CTA color */
  --accent3: #2d6a3f;   /* stat/counter color */
  --glass:   rgba(255,255,255,0.55);
  /* ... */
}

/* Dark theme */
[data-theme="dark"] {
  --accent2: #e8855a;
  /* ... */
}
```

### Adding Your Resume

Drop your resume PDF at `public/resume.pdf`. The Resume button in the nav links to `/resume.pdf` automatically.

### Adding a Project Card

Copy an existing `<article class="proj-card ...">` block in `index.html`, update the content, and set `data-type` to `"fs"` (Full-Stack), `"ml"` (AI/ML), or `"dt"` (Data) for the filter to work correctly.

### Terminal Commands

All terminal command responses live in the `KB` object inside `src/js/main.js`. Add or edit any key to update what the terminal returns.

---

## 🌐 Deployment

### Build for production

```bash
npm run build
# Outputs to /dist — deploy this folder
```

### Recommended hosts

| Host | Notes |
|---|---|
| **Vercel** | Recommended — zero config, instant deploys |
| **Netlify** | Drag-and-drop `/dist` folder |
| **GitHub Pages** | Free for public repos |
| **Cloudflare Pages** | Fast global CDN |

> ⚠️ If deploying to Cloudflare, be aware it applies email obfuscation to `mailto:` links. Use the plain `mailto:` hrefs in `index.html` — they are already restored in this version.

---

## 🎮 Terminal Commands

Open the terminal with the `>_` button (bottom-right) or press the `` ` `` key.

| Command | Description |
|---|---|
| `help` | List all commands |
| `about` | Who is Udit |
| `skills` | Full tech stack |
| `experience` | Work history |
| `projects` | All 10 projects |
| `education` | Academic background |
| `research` | IEEE publication |
| `certifications` | Credentials |
| `contact` | Reach Udit |
| `now` | Currently working on |
| `github` | Open GitHub ↗ |
| `resume` | Open resume PDF ↗ |
| `linkedin` | Open LinkedIn ↗ |
| `chat` | Switch to Q&A chat mode |
| `reset` | Reset terminal |
| `clear` | Clear output |

**Aliases:** `whoami` → about · `ls` → projects · `stack` → skills · `work` → experience · `ai` / `ml` → research


---

## 👤 Contact

**Udit Agarwal**
- Email: agarwaludit13@gmail.com
- Phone: +1 (930) 904-4901
- LinkedIn: [linkedin.com/in/udit013](https://linkedin.com/in/udit013)
- GitHub: [github.com/Udit013](https://github.com/Udit013)

---

*Built with Vite · GSAP · Lenis · SplitType · Glassmorphism*