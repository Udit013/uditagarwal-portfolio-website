import { useEffect, useMemo, useRef, type MouseEvent } from 'react'
import gsap from 'gsap'
import { PROJECTS, type Project } from '../data/content'
import { useLenis } from '../hooks/useLenis'
import { Counter } from './Counter'
import { isTouch, prefersReducedMotion } from '../lib/utils'

const CYCLE_SECONDS = 26 // one full autonomous loop
const COPIES = 3 // duplicate the list for a seamless wrap
const AUTO_EASE = 0.08 // easing toward the autoplay speed
const WHEEL_SENS = 2.4 // wheel deltaY → belt velocity (px/sec) impulse
const MAX_VEL = 2800 // clamp belt velocity (px/sec)
const FRICTION = 3.2 // higher = the scroll momentum settles faster

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
  const lenis = useLenis()
  const reduced = prefersReducedMotion()
  const touch = isTouch()

  const trackRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  // all motion state lives in refs — no re-renders from the animation loop
  const pos = useRef(0)
  const vel = useRef(0)
  const setW = useRef(0)
  const autoSpeed = useRef(0)
  const hover = useRef(0) // pointer over belt → wheel-driven
  const focus = useRef(0) // keyboard focus inside → paused

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
    const t = window.setTimeout(measure, 400)

    // While hovering the belt, capture the wheel and turn it into horizontal
    // belt momentum (the page is frozen via lenis.stop()) — scroll speed maps
    // to belt speed; scroll up reverses.
    const onWheel = (e: WheelEvent) => {
      if (hover.current <= 0) return
      e.preventDefault()
      vel.current = Math.max(-MAX_VEL, Math.min(MAX_VEL, vel.current - e.deltaY * WHEEL_SENS))
    }
    window.addEventListener('wheel', onWheel, { passive: false })

    const tick = (_time: number, deltaMs: number) => {
      const sw = setW.current
      if (!sw) return
      const dt = Math.min(deltaMs, 50) / 1000
      if (hover.current > 0) {
        // wheel-driven: coast with friction so it feels physical
        vel.current *= Math.max(0, 1 - dt * FRICTION)
      } else if (focus.current > 0) {
        vel.current += (0 - vel.current) * AUTO_EASE // paused (keyboard)
      } else {
        vel.current += (-autoSpeed.current - vel.current) * AUTO_EASE // autoplay
      }
      let p = pos.current + vel.current * dt
      if (p <= -sw) p += sw
      else if (p > 0) p -= sw
      pos.current = p
      track.style.transform = `translate3d(${p}px,0,0)`
    }
    gsap.ticker.add(tick)

    return () => {
      gsap.ticker.remove(tick)
      window.removeEventListener('wheel', onWheel)
      ro.disconnect()
      window.clearTimeout(t)
    }
    // Runs once: the ticker must NOT be re-created when Lenis initializes,
    // or autoplay dies. Hover handlers read the live `lenis` from closure.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced])

  const onEnter = () => {
    if (touch || reduced) return
    hover.current += 1
    lenis?.stop() // freeze page scroll so the wheel drives the belt
    if (labelRef.current) labelRef.current.textContent = 'PROJECT BELT LINKED TO YOUR SCROLL'
  }
  const onLeave = () => {
    if (touch || reduced) return
    hover.current = Math.max(0, hover.current - 1)
    if (hover.current === 0) {
      lenis?.start()
      if (labelRef.current) labelRef.current.textContent = 'SCROLL TO EXPLORE →'
    }
  }
  const onFocusIn = () => {
    if (touch || reduced) return
    focus.current += 1
  }
  const onFocusOut = () => {
    if (touch || reduced) return
    focus.current = Math.max(0, focus.current - 1)
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
      {!touch && (
        <div className="belt-label">
          <span ref={labelRef}>SCROLL TO EXPLORE →</span>
        </div>
      )}
      <div
        className="belt-viewport"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onFocusCapture={onFocusIn}
        onBlurCapture={onFocusOut}
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
