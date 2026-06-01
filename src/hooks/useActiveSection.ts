import { useEffect, useState } from 'react'
import { SECTION_IDS } from '../data/content'

/** Tracks which section is currently in view via IntersectionObserver. */
export function useActiveSection() {
  const [active, setActive] = useState('home')

  useEffect(() => {
    const observers = SECTION_IDS.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const io = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) setActive(id)
        },
        { rootMargin: '-52px 0px -55% 0px', threshold: 0 },
      )
      io.observe(el)
      return io
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [])

  return active
}
