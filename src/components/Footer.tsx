export function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="foot-logo">
        UDIT<span aria-hidden="true">.</span>DEV
      </div>
      <div className="foot-note">© 2026 · Crafted with React · TypeScript · GSAP · custom WebGL</div>
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
