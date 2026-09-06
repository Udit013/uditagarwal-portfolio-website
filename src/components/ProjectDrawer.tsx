import { useEffect, useRef, useState } from 'react'
import type { Project } from '../data/content'
import { useLenis } from '../hooks/useLenis'

/**
 * Project case-study drawer — slides in from the right on desktop, up from the
 * bottom on mobile. Self-contained: no routing, no new dependencies.
 * Implements a proper modal contract — focus trap, Escape to close, focus
 * restoration, inert background, and locked page scroll.
 */
/**
 * Case-study screenshot. Renders nothing when a project has no `image`, and
 * removes itself if the file fails to load, so a missing asset never leaves a
 * broken-image box in the drawer.
 */
function ProjectShot({ src, title }: { src?: string; title: string }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) return null
  return (
    <figure className="pdrawer-shot">
      <img
        src={src}
        alt={`Screenshot of ${title}`}
        loading="lazy"
        decoding="async"
        draggable={false}
        onError={() => setFailed(true)}
      />
    </figure>
  )
}

export function ProjectDrawer({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const lenis = useLenis()
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const restoreRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!project) return

    restoreRef.current = document.activeElement as HTMLElement
    // Lenis owns page scroll — stop it rather than setting body.overflow, which
    // it ignores. (The belt also stops Lenis on hover, and the drawer is opened
    // from a hovered card, so the drawer must own restart on close.)
    lenis?.stop()
    // Move initial focus into the dialog
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 60)

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      const panel = panelRef.current
      if (!panel) return
      const focusables = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (!focusables.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey, true)

    return () => {
      document.removeEventListener('keydown', onKey, true)
      window.clearTimeout(focusTimer)
      lenis?.start()
      restoreRef.current?.focus?.()
    }
  }, [project, onClose, lenis])

  if (!project) return null
  const study = project.study

  return (
    <div className="pdrawer-root">
      <div className="pdrawer-scrim" onClick={onClose} aria-hidden="true" />
      <div
        className="pdrawer"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pdrawer-title"
        data-lenis-prevent
      >
        <header className="pdrawer-head">
          <div className="pdrawer-head-top">
            <div className="proj-tags-wrap">
              {project.badges.map((b) => (
                <span className={`proj-badge ${b.cls}`} key={b.label}>
                  {b.label}
                </span>
              ))}
            </div>
            <button ref={closeRef} type="button" className="pdrawer-close" onClick={onClose} aria-label="Close project details">
              ✕
            </button>
          </div>
          <h2 className="pdrawer-title" id="pdrawer-title">
            {project.title}
          </h2>
          <p className="pdrawer-lede">{project.desc}</p>
        </header>

        <div className="pdrawer-body">
          <ProjectShot src={project.image} title={project.title} />

          {project.stats && (
            <div className="pdrawer-stats">
              {project.stats.map((s) => (
                <div className="pdrawer-stat" key={s.label}>
                  <span className="pdrawer-stat-val">
                    {s.value}
                    {s.suffix && <small>{s.suffix}</small>}
                  </span>
                  <span className="pdrawer-stat-lbl">{s.label}</span>
                </div>
              ))}
            </div>
          )}

          {study && (
            <>
              <section className="pdrawer-section">
                <h3 className="pdrawer-h">Problem</h3>
                <p>{study.problem}</p>
              </section>
              <section className="pdrawer-section">
                <h3 className="pdrawer-h">Approach</h3>
                <p>{study.approach}</p>
              </section>
              <section className="pdrawer-section">
                <h3 className="pdrawer-h">Result</h3>
                <p>{study.result}</p>
              </section>
              <section className="pdrawer-section">
                <h3 className="pdrawer-h">Key work</h3>
                <ul className="pdrawer-list">
                  {study.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </section>
            </>
          )}

          <section className="pdrawer-section">
            <h3 className="pdrawer-h">Stack</h3>
            <div className="proj-card-chips">
              {project.chips.map((c) => (
                <span className="chip" key={c}>
                  {c}
                </span>
              ))}
            </div>
          </section>
        </div>

        <footer className="pdrawer-foot">
          {project.live && (
            <a className="proj-link proj-link-live" href={project.live} target="_blank" rel="noopener noreferrer">
              Live Demo ↗
            </a>
          )}
          {project.repo && (
            <a className="proj-link" href={project.repo} target="_blank" rel="noopener noreferrer">
              Code ↗
            </a>
          )}
          {project.model && (
            <a className="proj-link" href={project.model} target="_blank" rel="noopener noreferrer">
              Model ↗
            </a>
          )}
          {project.paper && (
            <a className="proj-link proj-link-paper" href={project.paper} target="_blank" rel="noopener noreferrer">
              IEEE Paper ↗
            </a>
          )}
        </footer>
      </div>
    </div>
  )
}
