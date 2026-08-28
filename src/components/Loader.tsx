import { useEffect } from 'react'
import gsap from 'gsap'
import { markRevealed } from '../lib/boot'
import { prefersReducedMotion } from '../lib/utils'

/**
 * Controller for the intro curtain. The curtain markup itself lives in
 * index.html so it paints on the first frame instead of waiting for this
 * bundle — this component only decides *when* to lift it, then removes it.
 *
 * The lift is driven by readiness rather than a fixed timeline: it waits for
 * the display fonts (so the hero doesn't reflow the moment it's uncovered),
 * with a floor so the mark never flashes and a ceiling so a stalled font can
 * never strand the visitor behind an opaque panel.
 */

/** Don't blink the brand mark out of existence on a warm cache. */
const MIN_MS = 700
/** Never hold the site hostage to a slow font. */
const MAX_MS = 2600

export function Loader() {
  useEffect(() => {
    const el = document.getElementById('loader')
    if (!el) {
      markRevealed()
      return
    }

    // The curtain is display:none under reduced motion (see index.html), so
    // there is nothing to animate — drop it and let the hero render settled.
    if (prefersReducedMotion()) {
      el.remove()
      markRevealed()
      return
    }

    // Tells the index.html failsafe timer that React is alive and owns the
    // curtain, so it doesn't yank the node mid-animation.
    el.dataset.claimed = '1'

    let cancelled = false
    const timers: number[] = []
    const after = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(window.setTimeout(resolve, Math.max(0, ms)))
      })

    // NB: the timeline is built inside a promise callback, so a gsap.context()
    // could not collect it (contexts only capture synchronous work). Hold the
    // reference and kill it explicitly instead.
    let tl: gsap.core.Timeline | null = null

    /* Hand the CSS intro animations over to GSAP.
       Animation declarations outrank inline styles in the cascade, so a
       `forwards`-filled keyframe would silently override everything GSAP
       writes — the mark would never fade and the bar would stick at 70%.
       Freeze each element at its current computed value, then drop the
       animation so GSAP's inline styles win. */
    const takeOver = () => {
      el.querySelectorAll<HTMLElement>('.loader-mark, .loader-bar-fill').forEach((node) => {
        const cs = getComputedStyle(node)
        const { opacity, transform } = cs
        node.style.animation = 'none'
        node.style.opacity = opacity
        node.style.transform = transform
      })
    }

    const lift = () => {
      if (cancelled) return
      cancelled = true // whichever of ready/cap wins, only lift once
      takeOver()
      tl = gsap
        .timeline({ onComplete: () => el.remove() })
        // finish the progress bar honestly before the panels move
        .to('#loader .loader-bar-fill', { scaleX: 1, duration: 0.22, ease: 'power2.out' })
        .to('#loader .loader-mark', { opacity: 0, duration: 0.22, ease: 'power2.in' })
        .to(
          '#loader .loader-panel',
          { scaleY: 0, duration: 0.6, ease: 'power4.inOut', stagger: 0.08, transformOrigin: 'top' },
          '-=.05',
        )
        // hero entrance starts with the panels, so it plays in full view
        .add(markRevealed, '<')
    }

    // performance.now() is measured from navigation start, which is when the
    // curtain actually appeared — not when this bundle finished parsing.
    const fonts = document.fonts?.ready ?? Promise.resolve()
    const ready = Promise.all([fonts, after(MIN_MS - performance.now())])
    Promise.race([ready, after(MAX_MS - performance.now())]).then(lift)

    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
      tl?.kill()
    }
  }, [])

  return null
}
