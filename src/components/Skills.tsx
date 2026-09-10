import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react'
import gsap from 'gsap'
import { SKILL_CATEGORIES } from '../data/content'
import { prefersReducedMotion } from '../lib/utils'

const CATEGORIES = SKILL_CATEGORIES

export function Skills() {
  const [active, setActive] = useState(CATEGORIES[0].id)
  const [displayed, setDisplayed] = useState(CATEGORIES[0].id)
  const stageRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  /* WAI-ARIA tabs pattern: one tab stop for the whole list (roving tabindex),
     arrows/Home/End move between categories. Previously every pill was its own
     Tab stop and the arrow keys did nothing. */
  const onTabKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = CATEGORIES.findIndex((c) => c.id === active)
    const last = CATEGORIES.length - 1
    const next =
      e.key === 'ArrowRight' || e.key === 'ArrowDown' ? (i + 1) % CATEGORIES.length
      : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? (i - 1 + CATEGORIES.length) % CATEGORIES.length
      : e.key === 'Home' ? 0
      : e.key === 'End' ? last
      : -1
    if (next < 0) return
    e.preventDefault()
    setActive(CATEGORIES[next].id)
    tabRefs.current[next]?.focus()
  }
  const current = CATEGORIES.find((c) => c.id === displayed) ?? CATEGORIES[0]
  const count = current.groups.reduce((n, g) => n + g.skills.length, 0)

  /* Fade the current sub-groups out, then swap to the selected category. */
  useEffect(() => {
    if (active === displayed) return
    const stage = stageRef.current
    if (!stage || prefersReducedMotion()) {
      setDisplayed(active)
      return
    }
    gsap.to(gsap.utils.toArray<HTMLElement>('.toolkit-group', stage), {
      opacity: 0,
      y: 6,
      duration: 0.18,
      stagger: 0.04,
      ease: 'power2.in',
      overwrite: true,
      onComplete: () => setDisplayed(active),
    })
  }, [active, displayed])

  /* Entrance for the displayed category's sub-groups. */
  useLayoutEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const groups = gsap.utils.toArray<HTMLElement>('.toolkit-group', stage)
    if (prefersReducedMotion()) {
      gsap.set(groups, { opacity: 1, y: 0 })
      return
    }
    gsap.fromTo(groups, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.07, ease: 'power3.out' })
  }, [displayed])

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
        {count} technologies across {current.groups.length} areas in <span>{current.label}</span>.
      </p>

      <div className="toolkit-cats" role="tablist" aria-label="Skill categories" onKeyDown={onTabKey}>
        {CATEGORIES.map((cat, idx) => (
          <button
            key={cat.id}
            ref={(el) => {
              tabRefs.current[idx] = el
            }}
            id={`skills-tab-${cat.id}`}
            type="button"
            role="tab"
            aria-selected={active === cat.id}
            aria-controls="skills-panel"
            tabIndex={active === cat.id ? 0 : -1}
            className={`toolkit-cat-pill${active === cat.id ? ' active' : ''}`}
            onClick={() => setActive(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div
        className="toolkit-stage toolkit-stage-skills"
        ref={stageRef}
        id="skills-panel"
        role="tabpanel"
        aria-labelledby={`skills-tab-${displayed}`}
        tabIndex={0}
      >
        <div className="toolkit-groups" key={displayed}>
          {current.groups.map((group) => (
            <div className="toolkit-group" key={group.label}>
              <div className="toolkit-group-label">{group.label}</div>
              <div className="toolkit-group-chips">
                {group.skills.map((skill) => (
                  <span className="toolkit-skill-inner" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
