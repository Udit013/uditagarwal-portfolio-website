import { createContext, useContext } from 'react'
import type Lenis from 'lenis'

/** The shared Lenis instance; null on touch devices and before mount. Provided
    by <LenisProvider> (components/LenisProvider.tsx), kept in its own file so
    Fast Refresh can hot-swap it. */
export const LenisContext = createContext<Lenis | null>(null)

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
