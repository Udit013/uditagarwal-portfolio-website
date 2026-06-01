import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../lib/utils'

/**
 * Scroll-reveal via IntersectionObserver. Returns a ref to attach and an
 * `inView` flag — the consumer adds the `in` class so React stays the single
 * source of truth for className (no GSAP/React reconciliation fights on
 * re-render, which matters for the filterable skill/project grids).
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(() => prefersReducedMotion())

  useEffect(() => {
    if (inView) return
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -11% 0px', threshold: 0 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [inView])

  return { ref, inView }
}
