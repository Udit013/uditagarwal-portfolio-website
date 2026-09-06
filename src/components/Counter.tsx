import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from '../lib/utils'

interface CounterProps {
  /** e.g. "99.84", "7023", "3.84/4.0" — only the part before "/" is animated. */
  raw: string
  className?: string
  ariaLabel?: string
}

/** Counts up to a number when scrolled into view (GSAP tween). */
export function Counter({ raw, className, ariaLabel }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [numeric, scale] = raw.split('/')
  const target = parseFloat(numeric)
  const decimals = numeric.includes('.') ? 2 : 0
  const done = useRef(false)

  useEffect(() => {
    if (isNaN(target)) return
    const el = ref.current
    if (!el) return

    if (prefersReducedMotion()) {
      el.textContent = target.toFixed(decimals)
      done.current = true
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || done.current) return
        io.disconnect()
        done.current = true
        const obj = { v: 0 }
        gsap.to(obj, {
          v: target,
          duration: 0.9,
          ease: 'power2.out',
          onUpdate() {
            el.textContent = obj.v.toFixed(decimals)
          },
          onComplete() {
            el.textContent = target.toFixed(decimals)
          },
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0 },
    )
    io.observe(el)
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* The tween writes textContent on `ref`, so the scale has to live in a
     sibling node. The outer span keeps the caller's className so layout and
     type styling are unchanged; aria-label already states the full scale, so
     the visible "/4.0" is hidden from assistive tech to avoid a double read. */
  return (
    <span className={className} aria-label={ariaLabel}>
      <span ref={ref}>0</span>
      {scale && (
        <span className="counter-scale" aria-hidden="true">
          /{scale}
        </span>
      )}
    </span>
  )
}
