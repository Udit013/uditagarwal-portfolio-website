import { useEffect, useMemo, useRef, type MouseEvent } from 'react'
import gsap from 'gsap'
import { PROJECTS, type Project } from '../data/content'
import { Counter } from './Counter'
import { isTouch, prefersReducedMotion } from '../lib/utils'

const CYCLE_SECONDS = 26 // one full autonomous loop
const COPIES = 3 // duplicate the list for a seamless wrap
const VEL_EASE = 0.07 // inertia / interpolation on the belt velocity

function BeltCard({ project, tilt, dim }: { project: Project; tilt: boolean; dim: boolean }) {
  const ref = useRef<HTMLElement>(null)

  const onMove = (e: MouseEvent<HTMLElement>) => {
    if (!tilt) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    gsap.to(el, {
      rotateY: px * 7,
      rotateX: -py * 7,
      scale: 1.035,
      duration: 0.5,
      ease: 'power3.out',
      transformPerspective: 900,
      transformOrigin: 'center',
      overwrite: true,
    })
  }
  const onLeave = () => {
    if (!tilt) return
    gsap.to(ref.current, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.7, ease: 'power3.out', overwrite: true })
  }

  const linkTab = dim ? -1 : undefined
  return (
    <article
      ref={ref}
      className="proj-card glass-card belt-card"
      data-type={project.types.join(' ')}
      aria-label={dim ? undefined : `Project: ${project.title}`}
      aria-hidden={dim || undefined}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="proj-card-top">
        <div className="proj-tags-wrap">
          {project.badges.map((b) => (
            <span className={`proj-badge ${b.cls}`} key={b.label}>
              {b.label}
            </span>
          ))}
        </div>
      </div>
      <div className="proj-card-num" aria-hidden="true">
        {project.num}
      </div>
      <h3 className="proj-card-title">{project.title}</h3>
      <p className="proj-card-desc">{project.desc}</p>
      {project.stats && (
        <div className="proj-card-stats" aria-label="Key metrics">
          {project.stats.map((s) => (
            <div className="proj-stat" key={s.label}>
              <Counter raw={s.value} className="proj-stat-val" />
              {s.suffix && <small>{s.suffix}</small>}
              <span className="proj-stat-lbl">{s.label}</span>
            </div>
          ))}
        </div>
      )}
      <div className="proj-card-chips" aria-label="Technologies">
        {project.chips.map((c) => (
          <span className="chip" key={c}>
            {c}
          </span>
        ))}
      </div>
      <div className="proj-card-links" aria-label="Project links">
        {project.live ? (
          <a className="proj-link proj-link-live" href={project.live} target="_blank" rel="noopener noreferrer" data-cursor="Live" tabIndex={linkTab}>
            Live Demo ↗
          </a>
        ) : project.demoSoon ? (
          <span className="proj-link proj-link-soon" aria-disabled="true">
            Demo coming soon
          </span>
        ) : null}
        {project.repo && (
          <a className="proj-link" href={project.repo} target="_blank" rel="noopener noreferrer" data-cursor="Code" tabIndex={linkTab}>
            Code ↗
          </a>
        )}
        {project.paper && (
          <a className="proj-link proj-link-paper" href={project.paper} target="_blank" rel="noopener noreferrer" data-cursor="Paper" tabIndex={linkTab}>
            IEEE Paper ↗
          </a>
        )}
        {project.note && (
          <span className="proj-link proj-link-soon" aria-disabled="true">
            {project.note}
          </span>
        )}
      </div>
    </article>
  )
}

export function ProjectsBelt() {
  const reduced = prefersReducedMotion()
  const touch = isTouch()

  const trackRef = useRef<HTMLDivElement>(null)

  // all motion state lives in refs — no re-renders from the animation loop
  const pos = useRef(0)
  const vel = useRef(0)
  const setW = useRef(0)
  const autoSpeed = useRef(0)
  const paused = useRef(0) // hover / focus engagement count

  useEffect(() => {
    if (reduced) return
    const track = trackRef.current
    if (!track) return

    const measure = () => {
      const kids = track.children
      const n = PROJECTS.length
      if (kids.length > n) {
        setW.current = (kids[n] as HTMLElement).offsetLeft - (kids[0] as HTMLElement).offsetLeft
      }
      autoSpeed.current = setW.current / CYCLE_SECONDS
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(track)
    const t = window.setTimeout(measure, 400) // re-measure once fonts/images settle

    const tick = (_time: number, deltaMs: number) => {
      const sw = setW.current
      if (!sw) return
      const dt = Math.min(deltaMs, 50) / 1000
      // pause on hover/focus (eased) so cards are easy to read and click
      const target = paused.current > 0 ? 0 : -autoSpeed.current
      vel.current += (target - vel.current) * VEL_EASE
      let p = pos.current + vel.current * dt
      if (p <= -sw) p += sw
      else if (p > 0) p -= sw
      pos.current = p
      track.style.transform = `translate3d(${p}px,0,0)`
    }
    gsap.ticker.add(tick)

    return () => {
      gsap.ticker.remove(tick)
      ro.disconnect()
      window.clearTimeout(t)
    }
  }, [reduced])

  const engage = () => {
    if (touch || reduced) return
    paused.current += 1
  }
  const disengage = () => {
    if (touch || reduced) return
    paused.current = Math.max(0, paused.current - 1)
  }

  const cards = useMemo(
    () => Array.from({ length: COPIES }).flatMap((_, ci) => PROJECTS.map((p) => ({ p, ci }))),
    [],
  )

  // Reduced motion → static, horizontally scrollable row (no autonomous motion)
  if (reduced) {
    return (
      <div className="belt-wrap">
        <div className="belt-viewport belt-static">
          <div className="belt-track">
            {PROJECTS.map((p) => (
              <BeltCard key={p.num} project={p} tilt={false} dim={false} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="belt-wrap">
      <div
        className="belt-viewport"
        onMouseEnter={engage}
        onMouseLeave={disengage}
        onFocusCapture={engage}
        onBlurCapture={disengage}
        role="list"
        aria-label="Projects"
      >
        <div className="belt-track" ref={trackRef}>
          {cards.map(({ p, ci }) => (
            <BeltCard key={`${ci}-${p.num}`} project={p} tilt={!touch} dim={ci > 0} />
          ))}
        </div>
      </div>
    </div>
  )
}
