/* Derived from the build rather than typed by hand; the old hardcoded
   "August 2026" was already stale. */
const [BUILD_YEAR, BUILD_MON] = __BUILD_MONTH__.split('-').map(Number)
const BUILD_LABEL = new Date(BUILD_YEAR, BUILD_MON - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

export function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="foot-logo">
        UDIT<span aria-hidden="true">.</span>DEV
      </div>
      <div className="foot-note">
        © {BUILD_YEAR} · Crafted with React · TypeScript · GSAP · custom WebGL
        <span className="foot-updated">
          <span className="foot-updated-dot" aria-hidden="true" />
          Last updated <time dateTime={__BUILD_MONTH__}>{BUILD_LABEL}</time>
        </span>
      </div>
      <nav className="foot-links" aria-label="Footer navigation">
        <a href="https://github.com/Udit013" target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in new tab)">
          GitHub
        </a>
        <a href="https://linkedin.com/in/udit013" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in new tab)">
          LinkedIn
        </a>
        <a href="mailto:agarwaludit13@gmail.com" aria-label="Send email">
          Email
        </a>
      </nav>
    </footer>
  )
}
