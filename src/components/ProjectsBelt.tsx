import { useEffect, useMemo, useRef, useState, type MouseEvent, lazy, Suspense } from 'react'
import gsap from 'gsap'
import { PROJECTS, type Project } from '../data/content'
import { useLenis } from '../hooks/useLenis'
import { Counter } from './Counter'
import { isTouch, prefersReducedMotion } from '../lib/utils'

/* The case-study drawer is only reachable by opening a project, so it and its
   long-form copy stay out of the initial bundle. It is prefetched on idle
   (below) so the chunk is already warm by the time anyone clicks a card —
   lazy here buys a smaller critical path, not a slower first open. */
const loadDrawer = () => import('./ProjectDrawer')
const ProjectDrawer = lazy(() => loadDrawer().then((m) => ({ default: m.ProjectDrawer })))

const CYCLE_SECONDS = 26 // one full autonomous loop
const COPIES = 3 // duplicate the list for a seamless wrap
const AUTO_EASE = 0.08 // easing toward the autoplay speed
const WHEEL_SENS = 2.4 // wheel deltaY → belt velocity (px/sec) impulse
const MAX_VEL = 2800 // clamp belt velocity (px/sec)
const FRICTION = 3.2 // higher = the scroll momentum settles faster

function BeltCard({
  project,
  tilt,
  dim,
  onOpen,
}: {
  project: Project
  tilt: boolean
  dim: boolean
  onOpen: (p: Project) => void
}) {
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
        {project.live && (
          <a className="proj-link proj-link-live" href={project.live} target="_blank" rel="noopener noreferrer" data-cursor="Live" tabIndex={linkTab}>
            Live Demo ↗
          </a>
        )}
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
        {project.study && (
          <button
            type="button"
            className="proj-link proj-link-more"
            onClick={() => onOpen(project)}
            tabIndex={linkTab}
            aria-label={`View case study: ${project.title}`}
          >
            Case study →
          </button>
        )}
      </div>
    </article>
  )
}

export function ProjectsBelt() {
  const lenis = useLenis()
  const reduced = prefersReducedMotion()
  const touch = isTouch()

  const [openProject, setOpenProject] = useState<Project | null>(null)
  // The drawer owns page scroll while open; the belt's hover handlers must not
  // restart Lenis underneath it (the scrim fires onMouseLeave on the card).
  const drawerOpen = useRef(false)

  /* Warm the drawer chunk once the main thread is free, so opening a case
     study is instant even though the code isn't in the initial bundle. */
  useEffect(() => {
    const ric = window.requestIdleCallback?.bind(window)
    const cic = window.cancelIdleCallback?.bind(window)
    let id = 0
    if (ric) id = ric(() => void loadDrawer(), { timeout: 4000 })
    else id = window.setTimeout(() => void loadDrawer(), 1500)
    return () => (cic ? cic(id) : window.clearTimeout(id))
  }, [])

  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  // all motion state lives in refs — no re-renders from the animation loop
  const pos = useRef(0)
  const vel = useRef(0)
  const setW = useRef(0)
  const autoSpeed = useRef(0)
  const hover = useRef(0) // pointer over belt → wheel-driven
  const focus = useRef(0) // keyboard focus inside → paused
  const drag = useRef(0) // pointer/touch drag in progress
  const visible = useRef(true) // belt in viewport → skip all work off-screen

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

    // ── Pointer / touch drag (works on mobile; momentum on release) ──
    const vp = viewportRef.current
    let dragId = -1
    let downX = 0
    let downY = 0
    let lastX = 0
    let lastT = 0
    let dvel = 0
    const onDown = (e: PointerEvent) => {
      if (e.button > 0) return
      dragId = e.pointerId
      downX = lastX = e.clientX
      downY = e.clientY
      lastT = performance.now()
      dvel = 0
    }
    const onPMove = (e: PointerEvent) => {
      if (dragId < 0 || e.pointerId !== dragId) return
      if (drag.current === 0) {
        const tx = e.clientX - downX
        const ty = e.clientY - downY
        if (Math.abs(ty) > Math.abs(tx) && Math.abs(ty) > 8) {
          dragId = -1 // vertical intent → let the page scroll
          return
        }
        if (Math.abs(tx) > 8) drag.current = 1
        else return
      }
      const now = performance.now()
      const dtm = Math.max(8, now - lastT)
      const dx = e.clientX - lastX
      dvel = (dx / dtm) * 1000
      lastX = e.clientX
      lastT = now
      const sw = setW.current
      let p = pos.current + dx
      if (sw) {
        if (p <= -sw) p += sw
        else if (p > 0) p -= sw
      }
      pos.current = p
      track.style.transform = `translate3d(${p}px,0,0)`
      e.preventDefault()
    }
    const onUp = () => {
      if (dragId < 0) return
      if (drag.current > 0) {
        vel.current = Math.max(-MAX_VEL, Math.min(MAX_VEL, dvel))
        drag.current = 0
      }
      dragId = -1
    }
    vp?.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onPMove, { passive: false })
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)

    // Skip all per-frame work while the belt is off-screen
    const io = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting
    })
    if (vp) io.observe(vp)

    const tick = (_time: number, deltaMs: number) => {
      const sw = setW.current
      if (!sw || !visible.current || drag.current > 0) return
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
      vp?.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onPMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
      ro.disconnect()
      io.disconnect()
      window.clearTimeout(t)
    }
    // Runs once: the ticker must NOT be re-created when Lenis initializes,
    // or autoplay dies. Hover handlers read the live `lenis` from closure.
  }, [reduced])

  const onEnter = () => {
    if (touch || reduced || drawerOpen.current) return
    hover.current += 1
    lenis?.stop() // freeze page scroll so the wheel drives the belt
    if (labelRef.current) labelRef.current.textContent = 'PROJECT BELT LINKED TO YOUR SCROLL'
  }
  const onLeave = () => {
    if (touch || reduced) return
    hover.current = Math.max(0, hover.current - 1)
    if (hover.current === 0) {
      if (!drawerOpen.current) lenis?.start()
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

  const openDrawer = (p: Project) => {
    drawerOpen.current = true
    hover.current = 0 // belt is covered by the scrim; drop wheel-capture state
    vel.current = 0
    if (labelRef.current) labelRef.current.textContent = 'SCROLL TO EXPLORE →'
    setOpenProject(p)
  }
  const closeDrawer = () => {
    drawerOpen.current = false
    setOpenProject(null)
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
              <BeltCard key={p.num} project={p} tilt={false} dim={false} onOpen={openDrawer} />
            ))}
          </div>
        </div>
        {openProject && (
          <Suspense fallback={null}>
            <ProjectDrawer project={openProject} onClose={closeDrawer} />
          </Suspense>
        )}
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
        ref={viewportRef}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onFocusCapture={onFocusIn}
        onBlurCapture={onFocusOut}
        role="list"
        aria-label="Projects"
      >
        <div className="belt-track" ref={trackRef}>
          {cards.map(({ p, ci }) => (
            <BeltCard key={`${ci}-${p.num}`} project={p} tilt={!touch} dim={ci > 0} onOpen={openDrawer} />
          ))}
        </div>
      </div>
      {openProject && (
        <Suspense fallback={null}>
          <ProjectDrawer project={openProject} onClose={closeDrawer} />
        </Suspense>
      )}
    </div>
  )
}
