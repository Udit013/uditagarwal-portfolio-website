import { useEffect, useRef, useState } from 'react'
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
  const numeric = raw.split('/')[0]
  const target = parseFloat(numeric)
  const decimals = numeric.includes('.') ? 2 : 0
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (isNaN(target)) return
    const el = ref.current
    if (!el) return

    if (prefersReducedMotion()) {
      el.textContent = target.toFixed(decimals)
      setDone(true)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || done) return
        io.disconnect()
        setDone(true)
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

  return (
    <span ref={ref} className={className} aria-label={ariaLabel}>
      0
    </span>
  )
}
