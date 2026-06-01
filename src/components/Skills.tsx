import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type MouseEvent } from 'react'
import gsap from 'gsap'
import { SKILL_CATEGORIES } from '../data/content'
import { isTouch, prefersReducedMotion } from '../lib/utils'

/* "All" aggregates every skill (deduped, preserving first-seen order). */
const ALL_SKILLS = Array.from(new Set(SKILL_CATEGORIES.flatMap((c) => c.techs)))
const CATEGORIES = [{ id: 'all', label: 'All', techs: ALL_SKILLS }, ...SKILL_CATEGORIES]

export function Skills() {
  const [active, setActive] = useState('all')
  const [displayed, setDisplayed] = useState('all')
  const stageRef = useRef<HTMLDivElement>(null)
  const current = CATEGORIES.find((c) => c.id === displayed) ?? CATEGORIES[0]

  /* Smoothly fade the current skills OUT, then swap to the new category. */
  useEffect(() => {
    if (active === displayed) return
    const stage = stageRef.current
    if (!stage || prefersReducedMotion()) {
      setDisplayed(active)
      return
    }
    const inners = gsap.utils.toArray<HTMLElement>('.toolkit-skill-inner', stage)
    gsap.to(inners, {
      opacity: 0,
      scale: 0.9,
      y: 6,
      duration: 0.2,
      stagger: 0.012,
      ease: 'power2.in',
      overwrite: true,
      onComplete: () => setDisplayed(active),
    })
  }, [active, displayed])

  /* Entrance for the displayed set + bounded idle drift (paused off-screen). */
  useLayoutEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const outers = gsap.utils.toArray<HTMLElement>('.toolkit-skill', stage)
    const inners = gsap.utils.toArray<HTMLElement>('.toolkit-skill-inner', stage)
    const reduced = prefersReducedMotion()

    if (reduced) {
      gsap.set(inners, { opacity: 1, scale: 1, y: 0 })
      return
    }

    gsap.fromTo(
      inners,
      { opacity: 0, scale: 0.9, y: 10 },
      { opacity: 1, scale: 1, y: 0, duration: 0.42, stagger: 0.025, ease: 'power3.out' },
    )

    const tweens = outers.map((el, i) =>
      gsap.to(el, {
        x: i % 2 ? 6 : -6,
        y: i % 3 ? -5 : 5,
        rotation: i % 2 ? 1 : -1,
        duration: 3 + (i % 5) * 0.4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 0.4 + i * 0.04,
        paused: true,
      }),
    )
    const io = new IntersectionObserver(
      ([entry]) => tweens.forEach((t) => (entry.isIntersecting ? t.play() : t.pause())),
      { threshold: 0 },
    )
    io.observe(stage)

    return () => {
      io.disconnect()
      tweens.forEach((t) => t.kill())
      gsap.set(outers, { clearProps: 'transform' })
    }
  }, [displayed])

  /* Desktop cursor reactions: scale up + magnetic pull toward the cursor. */
  const interactive = !isTouch() && !prefersReducedMotion()
  const innerEl = (e: MouseEvent<HTMLElement>) => e.currentTarget.querySelector<HTMLElement>('.toolkit-skill-inner')
  const onEnter = (e: MouseEvent<HTMLElement>) => {
    const el = innerEl(e)
    if (!interactive || !el) return
    gsap.to(el, { scale: 1.16, duration: 0.3, ease: 'power3.out', overwrite: 'auto' })
  }
  const onMove = (e: MouseEvent<HTMLElement>) => {
    const el = innerEl(e)
    if (!interactive || !el) return
    const r = e.currentTarget.getBoundingClientRect()
    gsap.to(el, {
      x: (e.clientX - (r.left + r.width / 2)) * 0.35,
      y: (e.clientY - (r.top + r.height / 2)) * 0.35,
      duration: 0.4,
      ease: 'power3.out',
      overwrite: 'auto',
    })
  }
  const onLeave = (e: MouseEvent<HTMLElement>) => {
    const el = innerEl(e)
    if (!interactive || !el) return
    gsap.to(el, { scale: 1, x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.6)', overwrite: 'auto' })
  }

  return (
    <section id="skills" className="section" aria-labelledby="skills-heading">
      <div className="sec-label">
        <span className="sec-num">02</span> Technical Skills
      </div>
      <div className="contact-bg-text" aria-hidden="true">
        SKILLS
      </div>
      <h2 id="skills-heading" className="display-h split-h" style={{ marginBottom: '1.25rem' }}>
        The <span className="stroke-text">Tool</span>kit
      </h2>
      <p className="toolkit-intro serif-body">
        Pick a category — {current.techs.length} technologies in <span>{current.label}</span>.
      </p>

      <div className="toolkit-cats" role="tablist" aria-label="Skill categories">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={active === cat.id}
            className={`toolkit-cat-pill${active === cat.id ? ' active' : ''}`}
            onClick={() => setActive(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="toolkit-stage" ref={stageRef} role="tabpanel" aria-label={`${current.label} technologies`}>
        <div className="toolkit-stage-inner" key={displayed}>
          {current.techs.map((tech, i) => (
            <span
              className="toolkit-skill"
              style={{ '--i': i } as CSSProperties}
              key={tech}
              onMouseEnter={onEnter}
              onMouseMove={onMove}
              onMouseLeave={onLeave}
            >
              <span className="toolkit-skill-inner">{tech}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
