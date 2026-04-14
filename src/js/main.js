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
const initLenis = () => {
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
  // window.addEventListener('scroll', checkScroll, { passive: true });
  // checkScroll();
  lenis.on('scroll', () => {
  checkScroll();
  });

  // Active section via IntersectionObserver
  const setActive = id => links.forEach(l => l.classList.toggle('active', l.dataset.nav === id));
  new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
  }, { rootMargin: '-52px 0px -55% 0px' })
    .observe.bind(null); // placeholder — re-init per section below
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
      if (target) lenis?.scrollTo(target, { offset: -70, duration: 1.4 });
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

  let mx = 0, my = 0, rx = 0, ry = 0;
  window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  (function tick() {
    rx = lerp(rx, mx, 0.11); ry = lerp(ry, my, 0.11);
    dot.style.left  = mx + 'px'; dot.style.top  = my + 'px';
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
// BACKGROUND INTERACTION (mouse reactive)
// ────────────────────────────────────────────
const initBackgroundInteraction = () => {
  document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth * 100;
    const y = e.clientY / window.innerHeight * 100;

    document.documentElement.style.setProperty('--mx', `${x}%`);
    document.documentElement.style.setProperty('--my', `${y}%`);
  });
};
// ────────────────────────────────────────────
// HERO PARALLAX DEPTH (Apple-style)
// ────────────────────────────────────────────
const initHeroParallax = () => {
  const hero = qs('#home');
  if (!hero) return;

  const layers = [
    { el: qs('.hero-name'), strength: 18 },
    { el: qs('#heroBadge'), strength: 28 },
    { el: qs('#heroRole'), strength: 14 },
    { el: qs('#heroMeta'), strength: 10 },
  ];

  let mx = 0, my = 0;

  window.addEventListener('mousemove', (e) => {
    mx = (e.clientX / window.innerWidth - 0.5);
    my = (e.clientY / window.innerHeight - 0.5);
  });

  gsap.ticker.add(() => {
    layers.forEach(({ el, strength }) => {
      if (!el) return;

      gsap.to(el, {
        x: mx * strength,
        y: my * strength,
        duration: 0.6,
        ease: 'power3.out',
      });
    });
  });
};
// ────────────────────────────────────────────
// HERO 3D TILT
// ────────────────────────────────────────────
const initHeroTilt = () => {
  const hero = qs('.hero-inner');
  if (!hero) return;

  let rx = 0, ry = 0;

  window.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;

    rx = y * -6; // tilt X
    ry = x * 8;  // tilt Y
  });

  gsap.ticker.add(() => {
    gsap.to(hero, {
      rotateX: rx,
      rotateY: ry,
      transformPerspective: 1200,
      transformOrigin: 'center',
      duration: 0.8,
      ease: 'power3.out',
    });
  });
};
// ────────────────────────────────────────────
// HERO ENTRANCE ANIMATION
// Critical: sets transform on .name-inner, NOT overflow on .hero-name
// ────────────────────────────────────────────
const initHeroEntrance = () => {
  // Set initial state — translateY on inner span, NOT on container
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

  // Subtle parallax — name translates up slowly on scroll
  gsap.to('.hero-name', {
  y: 8,
  duration: 4,
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut'
  });
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
      const split = new SplitType(el, { types: 'lines,words' });
      // Add overflow: hidden + extra padding on each line to prevent clipping
      if (split.lines) {
        split.lines.forEach(line => {
          line.style.overflow = 'hidden';
          line.style.paddingBottom = '.06em';
          line.style.marginBottom = '-.06em';
        });
      }
      gsap.from(split.words, {
        y: '105%', opacity: 0,
        stagger: .04, duration: 1.05, ease: 'power4.out',
        scrollTrigger: {
          trigger: el, start: 'top 87%',
          toggleActions: 'play none none reverse',
        },
      });
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

  // Pillar hover push
  qsa('.pillar').forEach(el => {
    el.addEventListener('mouseenter', () => gsap.to(el, { x: 4, duration: .35, ease: 'power3.out' }));
    el.addEventListener('mouseleave', () => gsap.to(el, { x: 0, duration: .55, ease: 'elastic.out(1,.55)' }));
  });
};

// ────────────────────────────────────────────
// ANIMATED COUNTERS (on scroll)
// ────────────────────────────────────────────
const initCounters = () => {
  qsa('[data-count]').forEach(el => {
    const target   = parseFloat(el.dataset.count);
    const decimals = target % 1 !== 0 ? 2 : 0;

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

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        const index = entry.target.dataset.index;

        badge.innerHTML =
          `${String(+index).padStart(2, '0')}<br>${id.toUpperCase()}`;
      }
    });
  }, { threshold: 0.4 });

  ids.forEach((id, index) => {
    const el = qs('#' + id);
    if (el) {
      el.dataset.index = index;
      observer.observe(el);
    }
  });
};
// ────────────────────────────────────────────
// toolkit FILTER
// ────────────────────────────────────────────
const initToolkitFilter = () => {
  const btns  = qsa('.tool-filter');
  const cards = qsa('.skill-card');
 
  // All cards visible by default (no cards hidden on load)
  // "all" button is already .active in HTML
 
  const applyFilter = (filter) => {
    cards.forEach((card, i) => {
      const show = filter === 'all' || card.dataset.type === filter;
      if (show) {
        // Remove hidden class and animate in
        card.classList.remove('sc-hidden');
        gsap.to(card, {
          opacity: 1, scale: 1, y: 0,
          duration: 0.32, delay: i * 0.015,
          ease: 'power2.out', pointerEvents: 'auto',
          overwrite: true,
        });
      } else {
        // Hide with animation then add class
        gsap.to(card, {
          opacity: 0, scale: 0.88, y: 10,
          duration: 0.22, ease: 'power2.in',
          pointerEvents: 'none', overwrite: true,
          onComplete: () => card.classList.add('sc-hidden'),
        });
      }
    });
  };
 
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(btn.dataset.filter);
    });
  });
 
  // Apply "all" on load (already all visible, but ensure state is clean)
  applyFilter('all');
};
// ────────────────────────────────────────────
// PROJECT FILTER
// ────────────────────────────────────────────
const initProjects = () => {
  const btns  = qsa('.filter-btn');
  const cards = qsa('.proj-card');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;

      cards.forEach((card, i) => {
        const show = f === 'all' || card.dataset.type === f;
        gsap.to(card, {
          opacity: show ? 1 : 0,
          y:       show ? 0 : 8,
          scale:   show ? 1 : 0.97,
          pointerEvents: show ? 'auto' : 'none',
          duration: .35, delay: show ? i * .04 : 0, ease: 'power2.out',
        });
      });
    });
  });
};

// ────────────────────────────────────────────
// CONTACT PARALLAX
// ────────────────────────────────────────────
const initContactParallax = () => {
  gsap.to('.contact-bg-text', {
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
  qs('#contactForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const sub  = encodeURIComponent('Portfolio Inquiry — Udit Agarwal');
    const body = encodeURIComponent(
      `Name: ${qs('#fname').value}\nEmail: ${qs('#femail').value}\nCompany: ${qs('#fcompany').value}\n\n${qs('#fmsg').value}`
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
<span class="t-hi">clear</span>          Clear output
<span class="t-sys">Tip: press \` to toggle terminal  ·  Tab autocompletes</span>`,

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

  // Inject fadeUp animation
  const sty = document.createElement('style');
  sty.textContent = '@keyframes tFadeUp{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}';
  document.head.appendChild(sty);

  const print = html => {
    const div = document.createElement('div');
    div.innerHTML = html;
    div.style.cssText = 'margin-bottom:4px;animation:tFadeUp .18s ease forwards';
    output.appendChild(div);
    output.scrollTop = output.scrollHeight;
  };

  const openPanel = () => {
    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
    if (!booted) {
      setTimeout(() => {
        print(`<span class="t-sys">portfolio terminal chatbot ready</span>`);
        print(`<span class="t-sys">type <span class="t-hi">help</span> for commands  ·  <span class="t-hi">chat</span> to ask anything  ·  press <span class="t-hi">\`</span> to toggle</span>`);
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
  };

  toggle.addEventListener('click', () => panel.classList.contains('open') ? closePanel() : openPanel());
  close?.addEventListener('click', closePanel);

  // ` key toggle
  document.addEventListener('keydown', e => {
    if ((e.key === '`' || e.key === '~') && document.activeElement !== input) {
      e.preventDefault();
      panel.classList.contains('open') ? closePanel() : openPanel();
    }
    if (e.key === 'Escape') closePanel();
  });

  const runCmd = raw => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    history.unshift(raw.trim()); hIdx = -1;

    print(`<span class="t-prompt">$</span> <span class="t-cmd">${raw.trim()}</span>`);

    // Chat mode
    if (chatMode) {
      if (cmd === 'exit' || cmd === 'quit') {
        chatMode = false;
        print(`<span class="t-sys">returned to terminal mode</span>`);
        return;
      }
      const match = CHAT_FAQ.find(f => f.q.test(raw));
      print(match
        ? `<span class="t-out">${match.a}</span>`
        : `<span class="t-out">I answer questions about Udit's skills, experience, projects, research, and availability. Try asking something specific, or type <span class="t-hi">exit</span> to return.</span>`
      );
      return;
    }

    if (cmd === 'clear') { output.innerHTML = ''; return; }
    if (cmd === 'exit' || cmd === 'quit') { closePanel(); return; }

    // Resolve alias
    const key = KB[cmd] && typeof KB[cmd] === 'string' && KB[KB[cmd]] ? KB[cmd] : cmd;
    const res  = KB[key] ?? KB[cmd];

    if (!res) {
      print(`<span class="t-err">✗ Unknown: '${cmd}'. Type <span class="t-hi">help</span>.</span>`);
    } else if (typeof res === 'string' && res.startsWith('__open__')) {
      const url = res.slice(8);
      print(`<span class="t-out">Opening → <span class="t-link">${url}</span></span>`);
      setTimeout(() => window.open(url, '_blank'), 500);
    } else if (res === '__chat__') {
      chatMode = true;
      print(`<span class="t-sys">Chat mode  ·  ask anything about Udit  ·  type <span class="t-hi">exit</span> to return</span>`);
    } else {
      print(`<span class="t-out">${res}</span>`);
    }
    output.scrollTop = output.scrollHeight;
  };

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const v = input.value; input.value = ''; runCmd(v);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      hIdx = Math.min(hIdx + 1, history.length - 1);
      input.value = history[hIdx] ?? '';
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      hIdx = Math.max(hIdx - 1, -1);
      input.value = hIdx < 0 ? '' : history[hIdx];
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const v = input.value.toLowerCase();
      const m = Object.keys(KB).find(k => k.startsWith(v) && v.length > 0);
      if (m) input.value = m;
    }
  });
};

// ────────────────────────────────────────────
// GLASS CARD HOVER GLOW
// Subtle mouse-tracked highlight inside glass cards
// ────────────────────────────────────────────
const initGlassHover = () => {
  if (!window.matchMedia('(hover: hover)').matches) return;
  qsa('.glass-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const x  = ((e.clientX - r.left) / r.width  * 100).toFixed(1);
      const y  = ((e.clientY - r.top)  / r.height * 100).toFixed(1);
      card.style.setProperty('--gx', x + '%');
      card.style.setProperty('--gy', y + '%');
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
    gsap.ticker.remove(gsap.updateRoot);
  } else {
    lenis?.start();
    gsap.ticker.add(gsap.updateRoot);
  }
});