import { useEffect, useState } from 'react'
import { NAV_LINKS } from '../data/content'
import { useTheme } from '../hooks/useTheme'
import { useActiveSection } from '../hooks/useActiveSection'
import { scrollToId, useLenis } from '../hooks/useLenis'

export function Nav() {
  const { theme, toggle } = useTheme()
  const lenis = useLenis()
  const active = useActiveSection()
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  /* Glass-on-scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Close drawer on Escape */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const handleNav = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    scrollToId(lenis, id)
    setDrawerOpen(false)
  }

  return (
    <>
      <header id="site-nav" className={scrolled ? 'scrolled' : ''} role="banner">
        <a href="#home" className="nav-logo" aria-label="Udit.dev, Back to top" onClick={(e) => handleNav(e, 'home')}>
          <span className="nav-logo-mark" aria-hidden="true">
            𐌵𐌀
          </span>
          <span className="nav-logo-text">Udit.dev</span>
        </a>
        <nav className="nav-links" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              className={`nav-link${active === link.id ? ' active' : ''}`}
              href={`#${link.id}`}
              onClick={(e) => handleNav(e, link.id)}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <a
            className="nav-resume"
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="Open"
            aria-label="Open resume PDF in new tab"
          >
            Resume ↗
          </a>
          <button className="theme-btn" aria-label="Toggle color theme" type="button" onClick={toggle}>
            <span className="theme-icon" aria-hidden="true">
              {theme === 'dark' ? '🔆' : '🌒'}
            </span>
          </button>
          <button
            className={`burger${drawerOpen ? ' open' : ''}`}
            aria-label={drawerOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={drawerOpen}
            aria-controls="mobile-drawer"
            type="button"
            onClick={() => setDrawerOpen((o) => !o)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </header>

      <nav id="mobile-drawer" className={drawerOpen ? 'open' : ''} aria-hidden={!drawerOpen} aria-label="Mobile navigation">
        <div className="drawer-inner">
          {NAV_LINKS.map((link) => (
            <a key={link.id} className="drawer-link" href={`#${link.id}`} onClick={(e) => handleNav(e, link.id)}>
              {link.label}
            </a>
          ))}
          <a
            className="drawer-link drawer-resume"
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setDrawerOpen(false)}
          >
            Resume ↗
          </a>
        </div>
      </nav>
    </>
  )
}
