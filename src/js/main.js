/**
 * Udit Agarwal —
 */

import Lenis   from 'lenis';
import gsap    from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const qs  = (s, c = document) => c.querySelector(s);
const qsa = (s, c = document) => [...c.querySelectorAll(s)];
const lerp = (a, b, t) => a + (b - a) * t;

// ────────────────────────────────────────────
// THEME  (light default, dark toggled)
// ────────────────────────────────────────────
const initTheme = () => {
  const html = document.documentElement;
  const stored = localStorage.getItem('udit-theme') ?? 'dark';
  html.setAttribute('data-theme', stored);

  const icon = qs('.theme-icon');
  const setIcon = t => { icon.textContent = t === 'dark' ? '🔆' : '🌒'; };
  setIcon(stored);

  qs('#themeBtn').addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('udit-theme', next);
    setIcon(next);
  });
};

// ────────────────────────────────────────────
// LENIS
// ────────────────────────────────────────────
let lenis;
const isTouchDevice = () => !window.matchMedia('(hover: hover)').matches;

const initLenis = () => {
  if (isTouchDevice()) return; // native scroll is smoother on mobile
  lenis = new Lenis({
    duration: 1.25,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.85,
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(time => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
};

// ────────────────────────────────────────────
// SCROLL PROGRESS
// ────────────────────────────────────────────
const initScrollProgress = () => {
  const fill = qs('#scroll-fill');
  if (!fill) return;
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight) * 100;
    fill.style.width = pct + '%';
  }, { passive: true });
};

// ────────────────────────────────────────────
// NAV
// ────────────────────────────────────────────
const initNav = () => {
  const nav    = qs('#site-nav');
  const burger = qs('#burgerBtn');
  const drawer = qs('#mobile-drawer');
  const links  = qsa('.nav-link');

  // Glass on scroll
  const checkScroll = () => nav.classList.toggle('scrolled', window.scrollY > 50);
  if (lenis) {
    lenis.on('scroll', checkScroll);
  } else {
    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
  }

  // Active section via IntersectionObserver
  const setActive = id => links.forEach(l => l.classList.toggle('active', l.dataset.nav === id));
  qsa('section[id]').forEach(sec => {
    new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) setActive(sec.id);
    }, { rootMargin: '-52px 0px -55% 0px', threshold: 0 }).observe(sec);
  });

  // Mobile drawer
  const closeDrawer = () => {
    burger.classList.remove('open');
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    burger.setAttribute('aria-expanded', 'false');
  };
  burger.addEventListener('click', () => {
    const opening = !drawer.classList.contains('open');
    burger.classList.toggle('open', opening);
    drawer.classList.toggle('open', opening);
    drawer.setAttribute('aria-hidden', String(!opening));
    burger.setAttribute('aria-expanded', String(opening));
  });
  document.addEventListener('click', e => {
    const anchor = e.target.closest('a[href^="#"]');
    if (anchor) {
      e.preventDefault();
      const target = qs(anchor.getAttribute('href'));
      if (target) {
        if (lenis) {
          lenis.scrollTo(target, { offset: -70, duration: 1.4 });
        } else {
          const y = target.getBoundingClientRect().top + window.scrollY - 70;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
      closeDrawer();
    }
    if (drawer.classList.contains('open') && !drawer.contains(e.target) && !burger.contains(e.target)) {
      closeDrawer();
    }
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });
};

// ────────────────────────────────────────────
// CURSOR — context labels
// ────────────────────────────────────────────
const initCursor = () => {
  const dot   = qs('#cur-dot');
  const ring  = qs('#cur-ring');
  const label = qs('#curLabel');
  if (!dot || !ring) return;
  if (!window.matchMedia('(hover: hover)').matches) return;

  let rx = 0, ry = 0;

  (function tick() {
    rx = lerp(rx, mouse.x, 0.11); ry = lerp(ry, mouse.y, 0.11);
    dot.style.left  = mouse.x + 'px'; dot.style.top  = mouse.y + 'px';
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(tick);
  })();

  // Context label from data-cursor
  document.addEventListener('mouseover', e => {
    const el = e.target.closest('[data-cursor]');
    if (el?.dataset.cursor) {
      label.textContent = el.dataset.cursor;
      document.body.classList.add('cur-label-show');
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest('[data-cursor]')) {
      document.body.classList.remove('cur-label-show');
    }
  });

  qsa('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cur-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cur-hover', 'cur-action', 'cur-label-show'));
  });
  qsa('[data-magnetic], .btn-primary, .form-submit').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cur-action'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cur-action'));
  });
};

// ────────────────────────────────────────────
// MAGNETIC BUTTONS
// ────────────────────────────────────────────
const initMagnetic = () => {
  if (!window.matchMedia('(hover: hover)').matches) return;
  qsa('[data-magnetic]').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      gsap.to(el, {
        x: (e.clientX - (r.left + r.width  / 2)) * 0.18,
        y: (e.clientY - (r.top  + r.height / 2)) * 0.18,
        duration: .5, ease: 'power3.out',
      });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: .75, ease: 'elastic.out(1,.55)' });
    });
  });
};
// ────────────────────────────────────────────
// UNIFIED MOUSE STATE — single mousemove listener shared by all consumers
// ────────────────────────────────────────────
const mouse = { x: 0, y: 0, nx: 0, ny: 0 }; // nx/ny = normalised -0.5..0.5
window.addEventListener('mousemove', e => {
  mouse.x  = e.clientX;
  mouse.y  = e.clientY;
  mouse.nx = e.clientX / window.innerWidth  - 0.5;
  mouse.ny = e.clientY / window.innerHeight - 0.5;
}, { passive: true });

// ────────────────────────────────────────────
// BACKGROUND INTERACTION (mouse reactive)
// ────────────────────────────────────────────
const initBackgroundInteraction = () => {
  if (isTouchDevice()) return;
  // Throttle to rAF — no separate mousemove listener
  let raf;
  const tick = () => {
    document.documentElement.style.setProperty('--mx', `${(mouse.nx + 0.5) * 100}%`);
    document.documentElement.style.setProperty('--my', `${(mouse.ny + 0.5) * 100}%`);
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
};
// ────────────────────────────────────────────
// HERO PARALLAX DEPTH (Apple-style)
// ────────────────────────────────────────────
const initHeroParallax = () => {
  if (isTouchDevice()) return;
  const hero = qs('#home');
  if (!hero) return;

  const layers = [
    { el: qs('.hero-name'), strength: 18 },
    { el: qs('#heroBadge'), strength: 28 },
    { el: qs('#heroRole'), strength: 14 },
    { el: qs('#heroMeta'), strength: 10 },
  ];

  // Reuse gsap ticker — no extra mousemove
  gsap.ticker.add(() => {
    layers.forEach(({ el, strength }) => {
      if (!el) return;
      gsap.to(el, {
        x: mouse.nx * strength,
        y: mouse.ny * strength,
        duration: 0.6,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    });
  });
};
// ────────────────────────────────────────────
// HERO 3D TILT
// ────────────────────────────────────────────
const initHeroTilt = () => {
  if (isTouchDevice()) return;
  const hero = qs('.hero-inner');
  if (!hero) return;

  // Reuse gsap ticker — no extra mousemove
  gsap.ticker.add(() => {
    gsap.to(hero, {
      rotateX: mouse.ny * -6,
      rotateY: mouse.nx * 8,
      transformPerspective: 1200,
      transformOrigin: 'center',
      duration: 0.8,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  });
};
// ────────────────────────────────────────────
// HERO ENTRANCE ANIMATION
// Critical: sets transform on .name-inner, NOT overflow on .hero-name
// ────────────────────────────────────────────
const initHeroEntrance = () => {
  gsap.set(['#nameRow1', '#nameRow2'], { y: '105%' });
  gsap.set('#heroEyebrow', { opacity: 0, y: 14 });
  gsap.set('#heroRole',    { opacity: 0 });
  gsap.set('#heroMeta',    { opacity: 0, y: 10 });
  gsap.set('#heroBadge',   { opacity: 0, scale: 0.9 });

  const tl = gsap.timeline({ delay: .1 });
  tl
    .to(['#nameRow1', '#nameRow2'], {
      y: '0%', duration: 1.25, stagger: .12,
      ease: 'power4.out',
    })
    .to('#heroEyebrow', { opacity: 1, y: 0, duration: .85, ease: 'power3.out' }, '-=.8')
    .to('#heroRole',    { opacity: 1,       duration: .75, ease: 'power3.out' }, '-=.55')
    .to('#heroMeta',    { opacity: 1, y: 0, duration: .75, ease: 'power3.out' }, '-=.5')
    .to('#heroBadge',   { opacity: 1, scale: 1, duration: .6,  ease: 'back.out(2)' }, '-=.65');

  // Name scrolls up as user leaves hero section
  gsap.to('.hero-name', {
    y: -70, ease: 'none',
    scrollTrigger: {
      trigger: '#home', start: 'top top', end: 'bottom top', scrub: 1.4,
    },
  });

  // Eyebrow fades as you scroll
  gsap.to('#heroEyebrow', {
    opacity: 0, y: -16, ease: 'none',
    scrollTrigger: {
      trigger: '#home', start: '10% top', end: '35% top', scrub: 1,
    },
  });
};

// ────────────────────────────────────────────
// SPLITTYPE heading word reveals
// ────────────────────────────────────────────
const initSplitText = () => {
  document.fonts.ready.then(() => {
    qsa('.split-h').forEach(el => {
      let split = new SplitType(el, { types: 'lines,words' });

      const applyLineStyles = () => {
        if (split.lines) {
          split.lines.forEach(line => {
            line.style.overflow = 'hidden';
            line.style.paddingBottom = '.06em';
            line.style.marginBottom = '-.06em';
          });
        }
      };

      applyLineStyles();

      gsap.from(split.words, {
        y: '105%', opacity: 0,
        stagger: .04, duration: 1.05, ease: 'power4.out',
        scrollTrigger: {
          trigger: el, start: 'top 87%',
          toggleActions: 'play none none reverse',
        },
      });

      // Re-split on resize (handles orientation changes on mobile)
      let resizeTimer;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          split.revert();
          split = new SplitType(el, { types: 'lines,words' });
          applyLineStyles();
          ScrollTrigger.refresh();
        }, 250);
      }, { passive: true });
    });
  });
};

// ────────────────────────────────────────────
// SCROLL REVEALS
// ────────────────────────────────────────────
const initReveals = () => {
  qsa('.reveal-up, .reveal-left').forEach(el => {
    ScrollTrigger.create({
      trigger: el, start: 'top 89%', once: true,
      onEnter: () => el.classList.add('in'),
    });
  });

  // Pillar hover push — desktop only
  if (window.matchMedia('(hover: hover)').matches) {
    qsa('.pillar').forEach(el => {
      el.addEventListener('mouseenter', () => gsap.to(el, { x: 4, duration: .35, ease: 'power3.out' }));
      el.addEventListener('mouseleave', () => gsap.to(el, { x: 0, duration: .55, ease: 'elastic.out(1,.55)' }));
    });
  }
};

// ────────────────────────────────────────────
// ANIMATED COUNTERS (on scroll)
// ────────────────────────────────────────────
const initCounters = () => {
  qsa('[data-count]').forEach(el => {
    const raw     = el.dataset.count;           // e.g. "99.84", "7023", "3.82/4.0"
    const numeric = raw.split('/')[0];           // take only the part before any "/"
    const target  = parseFloat(numeric);
    const decimals = numeric.includes('.') ? 2 : 0;

    ScrollTrigger.create({
      trigger: el, start: 'top 90%', once: true,
      onEnter: () => {
        gsap.fromTo({ v: 0 }, { v: target }, {
          duration: 1.8, ease: 'power2.out',
          onUpdate() { el.textContent = this.targets()[0].v.toFixed(decimals); },
        });
      },
    });
  });
};

// ────────────────────────────────────────────
// TYPING ANIMATION
// ────────────────────────────────────────────
const initTyping = () => {
  const el = qs('#typingText');
  if (!el) return;

  const ROLES = [
    'Software Engineer',
    'AI / ML Engineer',
    'Full-Stack Developer',
    'Data Engineer',
    'Research Engineer',
  ];

  let idx = 0;
  let charIndex = 0;
  let deleting = false;

  const TYPE_SPEED = 70;
  const DELETE_SPEED = 35;
  const PAUSE_TIME = 2000;

  const tick = () => {
    const current = ROLES[idx];

    if (!deleting) {
      charIndex++;
      el.textContent = current.substring(0, charIndex);

      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, PAUSE_TIME);
        return;
      }
    } else {
      charIndex--;
      el.textContent = current.substring(0, charIndex);

      if (charIndex === 0) {
        deleting = false;
        idx = (idx + 1) % ROLES.length;
      }
    }

    setTimeout(tick, deleting ? DELETE_SPEED : TYPE_SPEED);
  };

  setTimeout(tick, 1200);
};
// ────────────────────────────────────────────
// BADGE SECTION LABEL
// ────────────────────────────────────────────
const initBadge = () => {
  const badge = qs('#badgeCenter');
  if (!badge) return;

  const ids = ['home', 'about', 'skills', 'journey', 'projects', 'contact'];

  ids.forEach((id, index) => {
    const el = qs('#' + id);
    if (!el) return;
    new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        badge.innerHTML = `${String(index).padStart(2, '0')}<br>${id.toUpperCase()}`;
      }
    }, { threshold: 0.3 }).observe(el);
  });
};
// ────────────────────────────────────────────
// toolkit FILTER
// ────────────────────────────────────────────
const initToolkitFilter = () => {
  const btns  = qsa('.tool-filter');
  const cards = qsa('.skill-card');

  const applyFilter = (filter) => {
    const showing = [];
    const hiding  = [];

    cards.forEach(card => {
      const show = filter === 'all' || card.dataset.type === filter;
      (show ? showing : hiding).push(card);
    });

    // Animate out first
    hiding.forEach(card => {
      card.style.pointerEvents = 'none';
      gsap.to(card, {
        opacity: 0, scale: 0.88, y: 8,
        duration: 0.18, ease: 'power2.in',
        overwrite: true,
        onComplete: () => card.classList.add('sc-hidden'),
      });
    });

    // Animate in — stagger index only counts visible cards
    showing.forEach((card, i) => {
      card.classList.remove('sc-hidden');
      card.style.pointerEvents = 'auto';
      gsap.to(card, {
        opacity: 1, scale: 1, y: 0,
        duration: 0.28,
        delay: i * 0.018,
        ease: 'power2.out',
        overwrite: true,
      });
    });
  };

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(btn.dataset.filter);
    });
  });

  applyFilter('all');
};
// ────────────────────────────────────────────
// PROJECT FILTER
// ────────────────────────────────────────────
const initProjects = () => {
  const btns  = qsa('.filter-btn');
  const cards = qsa('.proj-card');

  const applyFilter = (filter) => {
    const showing = [];
    const hiding  = [];

    cards.forEach(card => {
      const show = filter === 'all' || card.dataset.type === filter;
      (show ? showing : hiding).push(card);
    });

    // Fade out — add pc-hidden after so mobile CSS can collapse the slot.
    // On desktop pc-hidden = visibility:hidden, so the grid slot is kept.
    hiding.forEach(card => {
      card.style.pointerEvents = 'none';
      gsap.to(card, {
        opacity: 0, y: 6, scale: 0.97,
        duration: 0.22, ease: 'power2.in',
        overwrite: true,
        onComplete: () => card.classList.add('pc-hidden'),
      });
    });

    // Fade in — remove pc-hidden first so the card is renderable, then animate.
    // Stagger index only over visible cards so delays stay short.
    showing.forEach((card, i) => {
      card.classList.remove('pc-hidden');
      card.style.pointerEvents = 'auto';
      gsap.to(card, {
        opacity: 1, y: 0, scale: 1,
        duration: 0.32,
        delay: i * 0.04,
        ease: 'power2.out',
        overwrite: true,
      });
    });
  };

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(btn.dataset.filter);
    });
  });
};

// ────────────────────────────────────────────
// CONTACT PARALLAX
// ────────────────────────────────────────────
const initContactParallax = () => {
  const bgText = qs('.contact-bg-text');
  if (!bgText) return;
  gsap.to(bgText, {
    y: -50, ease: 'none',
    scrollTrigger: {
      trigger: '#contact', start: 'top bottom', end: 'bottom top', scrub: 2,
    },
  });
};

// ────────────────────────────────────────────
// CONTACT FORM
// ────────────────────────────────────────────
const initForm = () => {
  const form = qs('#contactForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name    = (qs('#fname')?.value    ?? '').trim();
    const email   = (qs('#femail')?.value   ?? '').trim();
    const company = (qs('#fcompany')?.value ?? '').trim();
    const msg     = (qs('#fmsg')?.value     ?? '').trim();
    if (!name || !email || !msg) return; // basic guard
    const sub  = encodeURIComponent('Portfolio Inquiry — Udit Agarwal');
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\n${msg}`
    );
    window.location.href = `mailto:agarwaludit13@gmail.com?subject=${sub}&body=${body}`;
  });
};

// ────────────────────────────────────────────
// TERMINAL — full knowledge base + chat + ~ hotkey
// ────────────────────────────────────────────
const KB = {
  help: `<span class="t-sys">Portfolio Terminal  ·  Commands:</span>
─────────────────────────────────────────────
<span class="t-hi">about</span>          Who is Udit
<span class="t-hi">skills</span>         Full tech stack
<span class="t-hi">experience</span>     Work history
<span class="t-hi">projects</span>       All 10 projects
<span class="t-hi">education</span>      Academic background
<span class="t-hi">research</span>       IEEE publication & AI/ML
<span class="t-hi">certifications</span> DeepLearning.AI & AWS
<span class="t-hi">contact</span>        How to reach Udit
<span class="t-hi">now</span>            What Udit is currently doing
<span class="t-hi">github</span>         Open GitHub
<span class="t-hi">resume</span>         Open resume PDF
<span class="t-hi">linkedin</span>       Open LinkedIn
<span class="t-hi">chat</span>           Ask me anything
<span class="t-hi">history</span>        Show command history
<span class="t-hi">date</span>           Show current date/time
<span class="t-hi">clear</span>          Clear output
<span class="t-sys">Tip: press \` to toggle  ·  Tab autocompletes  ·  ↑↓ history</span>`,

  about: `<span class="t-hi">Udit Agarwal</span>  ·  Software Engineer & AI/ML Researcher

MS Computer Science @ Indiana University Bloomington
GPA: <span class="t-hi">3.82 / 4.0</span>  ·  May 2026

Building intelligent, scalable systems at the intersection of
full-stack engineering and applied AI/ML. IEEE-published researcher.

<span class="t-hi">Currently:</span>
  Software Engineer @ Global Health Impact Project (IU)
  IT Consultant @ UITS, Indiana University

Email: agarwaludit13@gmail.com  ·  Phone: +1 (930) 904-4901
<span class="t-sys">Seeking full-time SWE · AI/ML · Data roles — available June 2026</span>`,

  skills: `<span class="t-hi">Frontend</span>      React · Next.js · TypeScript · Tailwind · GSAP · HTML/CSS
<span class="t-hi">Backend</span>       Node.js · FastAPI · Express.js · REST APIs · GraphQL
<span class="t-hi">AI / ML</span>       Python · TensorFlow · PyTorch · BERT · DeBERTa · Hugging Face
<span class="t-hi">LLMs</span>          Gemini API · Vapi AI · Prompt Engineering · LLM APIs
<span class="t-hi">Databases</span>     PostgreSQL · MySQL · MongoDB · Redis · Firebase
<span class="t-hi">Data / ETL</span>    Pandas · NumPy · Tableau · Airflow · Chart.js
<span class="t-hi">Cloud</span>         AWS · Docker · CI/CD · Git · Vercel
<span class="t-hi">Systems</span>       System Design · Distributed Systems · Auth · API Design`,

  experience: `<span class="t-hi">[ Feb 2026 → Present ]</span>  Software Engineer
  Global Health Impact Project · Indiana University (Volunteer)
  → Data-driven platform (Python, React, SQL) analyzing pharmaceutical impact
  → Forecasting tool for treatment coverage & disease trend modeling
  → Scalable APIs and pipelines for health outcome evaluation
  Stack: Python, React, TypeScript, SQL, FastAPI

<span class="t-hi">[ Aug 2025 → Present ]</span>  IT Consultant
  UITS · Indiana University Bloomington (9 months)
  → 100+ issues/week resolved across enterprise systems
  → Root-cause analysis · Identity & access management
  → Network connectivity and system access support`,

  projects: `<span class="t-hi">01</span>  AI Mock Interview Platform     [Full-Stack]
    Next.js · Firebase · Vapi AI · Gemini API

<span class="t-hi">02</span>  Brain Tumor Classification      [AI/ML] — <span class="t-link">IEEE ICC-ROBINS 2024</span>
    99.84% accuracy · 7,023 MRI scans · EfficientNetB3

<span class="t-hi">03</span>  Screen Recording Platform       [Full-Stack]
    Next.js · Bunny.net · AI transcripts · Arcjet

<span class="t-hi">04</span>  LLM Text Detection              [AI/ML]
    BERT · 95.25% accuracy

<span class="t-hi">05</span>  Automated Secrets Scanner       [Full-Stack]
    Python · FastAPI · entropy-based detection

<span class="t-hi">06</span>  Aphasia Detection — DeBERTa-v3  [AI/ML]
    F1-score: 0.90 · Clinical NLP

<span class="t-hi">07</span>  Retail Analytics Platform       [Data]
    PostgreSQL · ETL · Chart.js · 10K+ records

<span class="t-hi">08</span>  User Behavior Analytics         [Data · In Progress]
    Airflow · PostgreSQL · Tableau

<span class="t-hi">09</span>  Stock Market Prediction         [AI/ML]
    LSTM · TensorFlow · Time Series

<span class="t-hi">10</span>  Market Entry Strategy Simulator [Data]
    Python · SQL · Tableau · Simulation`,

  education: `<span class="t-hi">MS Computer Science</span>  —  Indiana University Bloomington
  Aug 2024 – May 2026  ·  GPA: <span class="t-hi">3.82 / 4.0</span>
  Applied ML · Advanced DB · Cloud Computing · LLMs · Algorithms

<span class="t-hi">B.Tech CS & Engineering</span>  —  KIIT University, India
  Aug 2020 – May 2024  ·  GPA: <span class="t-hi">8.85 / 10.0</span>`,

  research: `<span class="t-hi">IEEE Publication</span>
"Identifying Various Types of Brain Tumors using Deep Neural Networks"
ICC-ROBINS 2024  ·  DOI: 10.1109/ICC-ROBINS60238.2024.10533941

Model:    EfficientNetB3 + CNN/VGG16/InceptionV3 benchmarks
Dataset:  <span class="t-hi">7,023 MRI scans</span>
Result:   <span class="t-hi">99.84% classification accuracy</span>
Role:     Co-author

<span class="t-hi">Other AI work:</span>
  Aphasia Detection · DeBERTa-v3 · 0.90 F1 on clinical data
  LLM Text Detection · BERT · 95.25% accuracy
  Stock Prediction · LSTM · TensorFlow
  NLP Pipelines · Transformers · Prompt Engineering`,

  certifications: `<span class="t-hi">DeepLearning.AI</span>
  Neural Networks and Deep Learning
  Credential: ZKQGVGVJGDX7 · Sep 2023

  Improving Deep Neural Networks: Hyperparameter Tuning
  Credential: ZLN2LZ2YZNLE · Sep 2023

<span class="t-hi">Amazon Web Services</span>
  AWS Academy Graduate — Cloud Semester 1 · Jul 2023`,

  contact: `<span class="t-hi">Email</span>     agarwaludit13@gmail.com
<span class="t-hi">Phone</span>     +1 (930) 904-4901
<span class="t-hi">LinkedIn</span>  linkedin.com/in/udit013
<span class="t-hi">GitHub</span>    github.com/Udit013
<span class="t-hi">Portfolio</span> uditagarwal-website.vercel.app

<span class="t-sys">Seeking SWE · AI/ML · Data roles · Available June 2026</span>`,

  now: `<span class="t-hi">Currently exploring:</span>

🧠  LLM Agents & multi-agent orchestration
🏥  Health AI — Global Health Impact platform (IU)
🎙  Real-time voice AI (Vapi AI + Gemini)
📊  Large-scale ETL and data engineering patterns
☁️  Cloud-native distributed systems design

<span class="t-sys">Side interests: Open source · Research writing · Systems programming</span>`,

  github:   '__open__https://github.com/Udit013',
  resume:   '__open__/resume.pdf',
  linkedin: '__open__https://linkedin.com/in/udit013',
  chat:     '__chat__',
  // Aliases
  whoami:  'about',
  ls:      'projects',
  stack:   'skills',
  work:    'experience',
  ai:      'research',
  ml:      'research',
  pub:     'research',
  certs:   'certifications',
};

const CHAT_FAQ = [
  { q: /hire|job|full.?time|intern|open.?to|available|role/i,  a: 'Udit is available for full-time roles starting June 2026 — SWE, AI/ML, and Data roles. Open to remote, hybrid, and relocation. Email: agarwaludit13@gmail.com · Phone: +1 (930) 904-4901' },
  { q: /ieee|research|paper|publish|brain.?tumor/i,             a: 'Udit co-authored an IEEE paper at ICC-ROBINS 2024 on brain tumor classification — 99.84% accuracy on 7,023 MRI scans with EfficientNetB3. DOI: 10.1109/ICC-ROBINS60238.2024.10533941' },
  { q: /gpa|grade|school|degree|university|master|indiana/i,    a: 'MS CS at Indiana University Bloomington — GPA 3.82/4.0, May 2026. B.Tech at KIIT — GPA 8.85/10.0.' },
  { q: /skill|tech|stack|language|python|react|framework/i,     a: 'Python, TypeScript, React, Next.js, Node.js, FastAPI, PostgreSQL, TensorFlow, PyTorch, BERT, Hugging Face, Gemini API, Vapi AI, Docker, AWS. Type "skills" for the full list.' },
  { q: /project|built|app|demo|portfolio/i,                     a: '10 projects including AI mock interview, brain tumor classification (IEEE), LLM text detection, aphasia NLP, retail analytics, secrets scanner. Type "projects" for all.' },
  { q: /contact|email|phone|reach|talk/i,                       a: 'agarwaludit13@gmail.com · +1 (930) 904-4901 · linkedin.com/in/udit013 · Responds within 24h.' },
  { q: /llm|voice|gemini|vapi|gpt|generative/i,                 a: 'Experience with Gemini API, Vapi AI for real-time voice agents, BERT/DeBERTa fine-tuning, and LLM APIs in production systems.' },
  { q: /data|etl|tableau|airflow|pipeline/i,                    a: 'Strong data engineering background: ETL pipelines, Airflow, PostgreSQL, Tableau, Pandas, NumPy. Built retail analytics, user behavior pipelines, and health data systems.' },
  { q: /location|remote|reloc|where/i,                          a: 'Based in Bloomington, IN (EST). Open to remote, hybrid, and relocation.' },
  { q: /cert|aws|deeplearning/i,                                 a: 'Certifications: DeepLearning.AI Neural Networks & Improving DNNs (Sep 2023), AWS Academy Cloud Graduate (Jul 2023).' },
  { q: /now|current|exploring/i,                                 a: 'Currently: LLM Agents, Health AI platform at IU, real-time voice AI, ETL patterns, cloud-native systems.' },
];

const initTerminal = () => {
  const toggle = qs('#termToggle');
  const panel  = qs('#termPanel');
  const output = qs('#termOutput');
  const input  = qs('#termInput');
  const close  = qs('#termClose');
  if (!toggle || !panel) return;

  let booted = false, history = [], hIdx = -1, chatMode = false;

  // ── Inject tFadeUp animation ──
  const sty = document.createElement('style');
  sty.textContent = '@keyframes tFadeUp{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}';
  document.head.appendChild(sty);

  // ── Resize handle (drag top edge to resize) ──
  const resizeHandle = document.createElement('div');
  resizeHandle.className = 'term-resize-handle';
  panel.prepend(resizeHandle);

  let isResizing = false, resizeStartY = 0, resizeStartH = 0;
  resizeHandle.addEventListener('mousedown', e => {
    isResizing = true;
    resizeStartY = e.clientY;
    resizeStartH = panel.getBoundingClientRect().height;
    document.body.style.userSelect = 'none';
  });
  window.addEventListener('mousemove', e => {
    if (!isResizing) return;
    const delta = resizeStartY - e.clientY;
    const newH  = Math.min(Math.max(resizeStartH + delta, 240), window.innerHeight * 0.85);
    panel.style.height = newH + 'px';
  });
  window.addEventListener('mouseup', () => {
    if (isResizing) { isResizing = false; document.body.style.userSelect = ''; }
  });

  // ── Toolbar: clear + copy-all buttons ──
  const toolbar = qs('.term-toolbar');
  if (toolbar) {
    const clearBtn = document.createElement('button');
    clearBtn.className = 'term-action-btn';
    clearBtn.title = 'Clear terminal';
    clearBtn.textContent = '\u232b';
    clearBtn.addEventListener('click', () => { output.innerHTML = ''; });

    const copyAllBtn = document.createElement('button');
    copyAllBtn.className = 'term-action-btn';
    copyAllBtn.title = 'Copy all output';
    copyAllBtn.textContent = '\u29c9';
    copyAllBtn.addEventListener('click', () => {
      navigator.clipboard?.writeText(output.innerText).then(() => {
        copyAllBtn.textContent = '\u2713';
        setTimeout(() => { copyAllBtn.textContent = '\u29c9'; }, 1200);
      });
    });
    toolbar.prepend(copyAllBtn);
    toolbar.prepend(clearBtn);
  }

  // ── Autocomplete dropdown ──
  const acBox = document.createElement('div');
  acBox.className = 'term-autocomplete';
  qs('.term-inputbar')?.appendChild(acBox);
  let acItems = [], acIdx = -1;

  const hideAc = () => { acBox.classList.remove('visible'); acItems = []; acIdx = -1; };
  const showAc = matches => {
    acBox.innerHTML = '';
    acItems = matches;
    acIdx = -1;
    matches.forEach((m) => {
      const d = document.createElement('div');
      d.className = 'term-ac-item';
      d.textContent = m;
      d.addEventListener('mousedown', e => { e.preventDefault(); input.value = m; hideAc(); input.focus(); });
      acBox.appendChild(d);
    });
    acBox.classList.toggle('visible', matches.length > 0);
  };

  // ── Timestamp helper ──
  const ts = () => {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2,'0');
    const mm = String(now.getMinutes()).padStart(2,'0');
    const ss = String(now.getSeconds()).padStart(2,'0');
    return `${hh}:${mm}:${ss}`;
  };

  const escHtml = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

  // ── Print helpers ──
  const print = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    div.style.cssText = 'animation:tFadeUp .16s ease forwards;margin-bottom:2px;';
    output.appendChild(div);
    output.scrollTop = output.scrollHeight;
  };

  const printCmd = raw => {
    print(`<span class="t-ts">${ts()}</span><span class="t-prompt">$</span>&nbsp;<span class="t-cmd">${escHtml(raw)}</span>`);
  };

  const printOut = html => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'animation:tFadeUp .16s ease forwards;';
    const out = document.createElement('span');
    out.className = 't-out';
    out.innerHTML = html;
    const cpBtn = document.createElement('button');
    cpBtn.className = 't-copy-btn';
    cpBtn.textContent = '\u29c9 copy';
    cpBtn.addEventListener('click', () => {
      navigator.clipboard?.writeText(out.innerText).then(() => {
        cpBtn.textContent = '\u2713 copied';
        setTimeout(() => { cpBtn.textContent = '\u29c9 copy'; }, 1200);
      });
    });
    out.appendChild(cpBtn);
    wrapper.appendChild(out);
    output.appendChild(wrapper);
    output.scrollTop = output.scrollHeight;
  };

  // ── Open / Close ──
  const openPanel = () => {
    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
    if (!booted) {
      setTimeout(() => {
        print(`<span class="t-sys">\u25b8 portfolio terminal \u2014 ${new Date().toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'})}</span>`);
        print(`<span class="t-sys">type <span class="t-hi">help</span> \u00b7 tab autocomplete \u00b7 \u2191\u2193 history \u00b7 \` toggle</span>`);
        booted = true;
        input.focus();
      }, 200);
    } else {
      setTimeout(() => input.focus(), 80);
    }
  };
  const closePanel = () => {
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
    hideAc();
  };

  toggle.addEventListener('click', () => panel.classList.contains('open') ? closePanel() : openPanel());
  close?.addEventListener('click', closePanel);

  document.addEventListener('keydown', e => {
    if ((e.key === '`' || e.key === '~') && document.activeElement !== input) {
      e.preventDefault();
      panel.classList.contains('open') ? closePanel() : openPanel();
    }
    if (e.key === 'Escape') { closePanel(); }
  });

  // ── Command runner ──
  const runCmd = raw => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    history.unshift(raw.trim()); hIdx = -1;
    hideAc();
    printCmd(raw.trim());

    // Chat mode
    if (chatMode) {
      if (cmd === 'exit' || cmd === 'quit') {
        chatMode = false;
        print(`<span class="t-sys">\u2190 returned to terminal mode</span>`);
        return;
      }
      const match = CHAT_FAQ.find(f => f.q.test(raw));
      printOut(match
        ? match.a
        : `I answer questions about Udit's skills, experience, projects, research, and availability. Try something specific, or type <span class="t-hi">exit</span> to return.`
      );
      return;
    }

    if (cmd === 'clear') { output.innerHTML = ''; return; }
    if (cmd === 'exit' || cmd === 'quit') { closePanel(); return; }
    if (cmd === 'history') {
      printOut(history.length > 1
        ? history.slice(1).map((h,i) => `<span class="t-hi">${String(i+1).padStart(3)}</span>  ${escHtml(h)}`).join('\n')
        : '(no history yet)'
      );
      return;
    }
    if (cmd === 'date') {
      printOut(new Date().toLocaleString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric',hour:'2-digit',minute:'2-digit'}));
      return;
    }

    // Resolve alias
    const key = KB[cmd] && typeof KB[cmd] === 'string' && KB[KB[cmd]] ? KB[cmd] : cmd;
    const res  = KB[key] ?? KB[cmd];

    if (!res) {
      print(`<span class="t-err">\u2717 command not found: '${escHtml(cmd)}' \u2014 type <span class="t-hi">help</span></span>`);
    } else if (typeof res === 'string' && res.startsWith('__open__')) {
      const url = res.slice(8);
      printOut(`Opening \u2192 <span class="t-link">${url}</span>`);
      setTimeout(() => window.open(url, '_blank'), 500);
    } else if (res === '__chat__') {
      chatMode = true;
      print(`<span class="t-sys">\ud83d\udcac chat mode \u2014 ask anything about Udit \u2014 type <span class="t-hi">exit</span> to return</span>`);
    } else {
      printOut(res);
    }
    output.scrollTop = output.scrollHeight;
  };

  // ── Input handling ──
  input.addEventListener('input', () => {
    const v = input.value.toLowerCase().trim();
    if (!v) { hideAc(); return; }
    const matches = Object.keys(KB)
      .filter(k => k.startsWith(v) && k !== v && !k.startsWith('_'))
      .slice(0, 6);
    showAc(matches.length > 1 ? matches : []);
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const v = input.value; input.value = ''; hideAc(); runCmd(v);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (acBox.classList.contains('visible') && acItems.length) {
        acIdx = Math.max(acIdx - 1, 0);
        qsa('.term-ac-item', acBox).forEach((el,i) => el.classList.toggle('ac-active', i === acIdx));
        input.value = acItems[acIdx] ?? input.value;
      } else {
        hIdx = Math.min(hIdx + 1, history.length - 1);
        input.value = history[hIdx] ?? '';
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (acBox.classList.contains('visible') && acItems.length) {
        acIdx = Math.min(acIdx + 1, acItems.length - 1);
        qsa('.term-ac-item', acBox).forEach((el,i) => el.classList.toggle('ac-active', i === acIdx));
        input.value = acItems[acIdx] ?? input.value;
      } else {
        hIdx = Math.max(hIdx - 1, -1);
        input.value = hIdx < 0 ? '' : history[hIdx];
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const v = input.value.toLowerCase().trim();
      if (acItems.length > 0) {
        input.value = acItems[0];
        hideAc();
      } else {
        const m = Object.keys(KB).find(k => k.startsWith(v) && v.length > 0 && !k.startsWith('_'));
        if (m) input.value = m;
      }
    } else if (e.key === 'Escape') {
      hideAc();
    }
  });

  document.addEventListener('click', e => {
    if (!panel.contains(e.target)) hideAc();
  });
};

// ────────────────────────────────────────────
// GLASS CARD HOVER GLOW
// Subtle mouse-tracked highlight — RAF-throttled for performance
// ────────────────────────────────────────────
const initGlassHover = () => {
  if (!window.matchMedia('(hover: hover)').matches) return;
  qsa('.glass-card').forEach(card => {
    let rafId = null;
    card.addEventListener('mousemove', e => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const r  = card.getBoundingClientRect();
        const x  = ((e.clientX - r.left) / r.width  * 100).toFixed(1);
        const y  = ((e.clientY - r.top)  / r.height * 100).toFixed(1);
        card.style.setProperty('--gx', x + '%');
        card.style.setProperty('--gy', y + '%');
        rafId = null;
      });
    });
  });
};

// ────────────────────────────────────────────
// INIT
// ────────────────────────────────────────────
const init = () => {
  initTheme();
  initLenis();
  initScrollProgress();
  initNav();
  initCursor();
  initMagnetic();
  initBackgroundInteraction();
  initHeroParallax();
  initHeroTilt();
  initHeroEntrance();
  initSplitText();
  initReveals();
  initCounters();
  initTyping();
  initBadge();
  initToolkitFilter();
  initProjects();
  initContactParallax();
  initForm();
  initTerminal();
  initGlassHover();

  // Refresh ScrollTrigger after layout settles
  window.addEventListener('load',   () => ScrollTrigger.refresh());
  window.addEventListener('resize', () => ScrollTrigger.refresh());
};

document.readyState === 'loading'
  ? document.addEventListener('DOMContentLoaded', init)
  : init();
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    lenis?.stop();
    gsap.ticker.sleep();
  } else {
    lenis?.start();
    gsap.ticker.wake();
  }
});