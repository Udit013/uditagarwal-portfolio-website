import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from '../lib/utils'

/**
 * Quick, premium curtain intro: brand mark fades in, then two panels split
 * away to reveal the site. ~1s total; skipped under reduced-motion.
 */
export function Loader() {
  const [done, setDone] = useState(false)
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setDone(true)
      return
    }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: () => setDone(true) })
      tl.to('.loader-mark', { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' })
        .to('.loader-bar-fill', { scaleX: 1, duration: 0.55, ease: 'power2.inOut' }, '-=.1')
        .to('.loader-mark', { opacity: 0, duration: 0.25, ease: 'power2.in' }, '+=.05')
        .to('.loader-panel', {
          scaleY: 0,
          duration: 0.6,
          ease: 'power4.inOut',
          stagger: 0.08,
          transformOrigin: 'top',
        }, '-=.05')
    }, root)
    return () => ctx.revert()
  }, [])

  if (done) return null

  return (
    <div className="loader" ref={root} aria-hidden="true">
      <div className="loader-panels">
        <div className="loader-panel" />
        <div className="loader-panel" />
        <div className="loader-panel" />
      </div>
      <div className="loader-center">
        <div className="loader-mark">
          UDIT<span>.</span>DEV
          <div className="loader-bar">
            <div className="loader-bar-fill" />
          </div>
        </div>
      </div>
    </div>
  )
}
