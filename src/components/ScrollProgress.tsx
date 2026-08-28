import { useEffect, useRef } from 'react'

/**
 * Top progress bar reflecting scroll position.
 *
 * Purely decorative, so it is hidden from assistive tech and holds no React
 * state — it used to carry both `aria-hidden` and a `role="progressbar"` whose
 * `aria-valuenow` nothing could read, while re-rendering on every scroll event
 * to maintain it. The fill is written straight to the DOM instead.
 */
export function ScrollProgress() {
  const fill = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const el = fill.current
      if (!el) return
      const max = document.documentElement.scrollHeight - window.innerHeight
      el.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`
    }
    // Coalesce bursts of scroll events into one write per frame.
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    update()
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div id="scroll-prog" aria-hidden="true">
      <div id="scroll-fill" ref={fill} />
    </div>
  )
}
