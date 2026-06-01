import { TYPING_ROLES, SECTION_IDS } from '../data/content'
import { useTyping } from '../hooks/useTyping'
import { useActiveSection } from '../hooks/useActiveSection'
import { scrollToId, useLenis } from '../hooks/useLenis'

export function Hero() {
  const typed = useTyping(TYPING_ROLES)
  const active = useActiveSection()
  const lenis = useLenis()
  const idx = Math.max(0, SECTION_IDS.indexOf(active))

  return (
    <section id="home" className="hero" aria-label="Introduction">
      <div className="hero-inner">
        <div className="hero-eyebrow" id="heroEyebrow" aria-label="Availability status">
          <span className="eyebrow-line" aria-hidden="true" />
          <span className="avail-dot" aria-hidden="true" />
          <span>Available · Full-time · June 2026</span>
          <span className="eyebrow-line" aria-hidden="true" />
          <span className="eyebrow-loc">Bloomington, IN, USA · EST</span>
        </div>

        <div className="hero-badge" id="heroBadge" aria-hidden="true">
          <svg viewBox="0 0 120 120" className="badge-svg" aria-hidden="true">
            <defs>
              <path id="bp" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
            </defs>
            <text className="badge-text">
              <textPath href="#bp">
                SOFTWARE ENGINEER • AI/ML • DATA • SYSTEMS • SOFTWARE ENGINEER •
              </textPath>
            </text>
          </svg>
          <div className="hero-badge-center" id="badgeCenter" aria-hidden="true">
            {String(idx).padStart(2, '0')}
            <br />
            {SECTION_IDS[idx].toUpperCase()}
          </div>
        </div>

        <h1 className="hero-name" aria-label="Udit Agarwal">
          <span className="name-row">
            <span className="name-inner" id="nameRow1" aria-hidden="true">
              UDIT
            </span>
          </span>
          <span className="name-row">
            <span className="name-inner name-ghost" id="nameRow2" aria-hidden="true">
              AGARWAL
            </span>
          </span>
        </h1>

        <div className="hero-role-wrap" id="heroRole" aria-label="Current role">
          <span className="role-bar" aria-hidden="true" />
          <p className="hero-role">
            <span aria-live="polite" aria-atomic="true">
              {typed}
            </span>
            <span className="type-cursor" aria-hidden="true" />
          </p>
        </div>
      </div>

      <div className="hero-meta" id="heroMeta">
        <div className="hero-meta-left">
          <p className="hero-desc">
            Building intelligent systems and interfaces that <em>feel alive</em> — from research to production.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn-primary" data-magnetic data-cursor="Connect" onClick={(e) => { e.preventDefault(); scrollToId(lenis, 'contact') }}>
              Let's Connect →
            </a>
            <a href="https://github.com/Udit013" target="_blank" rel="noopener noreferrer" className="hero-pill" data-cursor="GitHub" aria-label="GitHub profile (opens in new tab)">
              GitHub ↗
            </a>
            <a href="https://linkedin.com/in/udit013" target="_blank" rel="noopener noreferrer" className="hero-pill" data-cursor="LinkedIn" aria-label="LinkedIn profile (opens in new tab)">
              LinkedIn ↗
            </a>
            <a href="mailto:agarwaludit13@gmail.com" className="hero-pill" data-cursor="Email" aria-label="Send email to Udit">
              Email ↗
            </a>
          </div>
          <div className="hero-stat-row" aria-label="Contact summary">
            <span>
              <span aria-hidden="true">📍</span> Bloomington, IN, USA
            </span>
            <span>
              <span aria-hidden="true">📞</span> +1 (930) 904-4901
            </span>
            <span>
              <span className="live-dot" aria-hidden="true" /> Responds &lt; 24h
            </span>
          </div>
        </div>
        <div className="hero-scroll-hint" aria-hidden="true">
          <span className="scroll-line" />
          <span>Scroll</span>
        </div>
      </div>
    </section>
  )
}
