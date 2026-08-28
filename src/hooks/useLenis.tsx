import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { isTouch } from '../lib/utils'

gsap.registerPlugin(ScrollTrigger)

const LenisContext = createContext<Lenis | null>(null)

/**
 * Provides a single Lenis smooth-scroll instance (desktop only — native scroll
 * is smoother on touch). Drives Lenis from the GSAP ticker and keeps
 * ScrollTrigger in sync. Pauses while the tab is hidden.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    if (isTouch()) return

    const instance = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.85,
    })
    setLenis(instance)
    if (import.meta.env.DEV) (window as unknown as { lenis: Lenis }).lenis = instance

    instance.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => instance.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    const onVisibility = () => {
      if (document.hidden) instance.stop()
      else instance.start()
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      gsap.ticker.remove(raf)
      instance.destroy()
      setLenis(null)
    }
  }, [])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}

export const useLenis = () => useContext(LenisContext)

/** Smooth-scroll to an element id (with nav offset), via Lenis or native fallback. */
export function scrollToId(lenis: Lenis | null, id: string) {
  const target = document.getElementById(id)
  if (!target) return
  if (lenis) {
    lenis.scrollTo(target, { offset: -70, duration: 1.4 })
  } else {
    const y = target.getBoundingClientRect().top + window.scrollY - 70
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}
