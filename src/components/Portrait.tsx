import { useRef, useState, type CSSProperties, type PointerEvent } from 'react'
import { useReveal } from '../hooks/useReveal'

/**
 * Real ⇆ anime reveal slider. When the compare feature is ON, the divider
 * follows the cursor across the image (anime left, real right). The home
 * button toggles that hover feature on/off. Just a line — no handle, no labels.
 * Pointer moves are rAF-throttled and write a CSS var directly (no re-render).
 */
export function Portrait() {
  const frameRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef(false)
  const rafRef = useRef(0)
  const [active, setActive] = useState(false)
  const { ref, inView } = useReveal<HTMLDivElement>()

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!activeRef.current || rafRef.current) return
    const x = e.clientX
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0
      const el = frameRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const p = Math.max(0, Math.min(100, ((x - r.left) / r.width) * 100))
      el.style.setProperty('--pos', `${p}%`)
    })
  }

  const toggle = () => {
    const next = !activeRef.current
    activeRef.current = next
    setActive(next)
  }

  return (
    <div ref={ref} className={`portrait reveal-up${inView ? ' in' : ''}`}>
      <div className="portrait-device">
        <div
          className="portrait-frame"
          ref={frameRef}
          style={{ '--pos': '69%' } as CSSProperties}
          onPointerMove={onPointerMove}
          role="img"
          aria-label="Portrait of Udit Agarwal — anime on the left, real photo on the right"
        >
          {/* WebP first (~26 KB / 40 KB vs ~700 KB / 1.2 MB for the JPEGs) */}
          <picture>
            <source srcSet="/portrait.webp" type="image/webp" />
            <img
              className="portrait-img portrait-real"
              src="/portrait.jpeg"
              alt="Udit Agarwal"
              width={1082}
              height={1313}
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </picture>
          <picture>
            <source srcSet="/portrait-anime.webp" type="image/webp" />
            <img
              className="portrait-img portrait-anime"
              src="/portrait-anime.jpeg"
              alt=""
              aria-hidden="true"
              width={1083}
              height={1304}
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </picture>
          <span className="portrait-glass" aria-hidden="true" />
          <span className="portrait-divider" aria-hidden="true" />
        </div>

        <button
          type="button"
          className={`portrait-home${active ? ' on' : ''}`}
          onClick={toggle}
          aria-pressed={active}
          aria-label={active ? 'Pause portrait interaction' : 'Activate portrait interaction'}
          data-cursor={active ? 'Off' : 'On'}
        >
          <span aria-hidden="true" />
        </button>
      </div>
      <p className="portrait-caption">{active ? 'Hover to reveal both styles' : 'Interactive view paused'}</p>
    </div>
  )
}
