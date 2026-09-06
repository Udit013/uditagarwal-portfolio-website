import { useEffect, useRef, type CSSProperties, type PointerEvent } from 'react'
import { useReveal } from '../hooks/useReveal'

/** Where the split sits before the pointer has ever touched the frame. */
const START = '69%'

/**
 * Real ⇆ anime reveal slider. The divider simply follows the cursor across the
 * image (anime left, real right) — no toggle, no handle, no labels. Pointer
 * moves are rAF-throttled and write a CSS var directly (no re-render).
 *
 * The split deliberately STAYS where you left it. An earlier version eased it
 * back to a resting position on pointerleave, but the frame is only ~300px
 * wide, so simply moving left or right crossed its edge and yanked the image
 * back mid-gesture.
 */
export function Portrait() {
  const frameRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef(0)
  const { ref, inView } = useReveal<HTMLDivElement>()

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (rafRef.current) return
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

  /* Drop any frame still queued when the component goes away */
  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div ref={ref} className={`portrait reveal-up${inView ? ' in' : ''}`}>
      <div className="portrait-device">
        <div
          className="portrait-frame"
          ref={frameRef}
          style={{ '--pos': START } as CSSProperties}
          onPointerMove={onPointerMove}
          role="img"
          aria-label="Portrait of Udit Agarwal: anime on the left, real photo on the right"
        >
          {/* WebP first; the JPEGs are same-size fallbacks for pre-2020 browsers
              (recompressed from 1.8 MB to 156 KB — they are almost never fetched). */}
          <picture>
            <source srcSet="/portrait.webp" type="image/webp" />
            <img
              className="portrait-img portrait-real"
              src="/portrait.jpeg"
              alt="Udit Agarwal"
              width={720}
              height={874}
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
              width={720}
              height={867}
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </picture>
          <span className="portrait-glass" aria-hidden="true" />
          <span className="portrait-divider" aria-hidden="true" />
        </div>
      </div>
      <p className="portrait-caption">Hover to reveal both styles</p>
    </div>
  )
}
