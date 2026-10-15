import { useEffect, useRef, useState, type RefObject } from 'react'
import { prefersReducedMotion } from '../lib/utils'

const TYPE_SPEED = 70
const DELETE_SPEED = 35
const PAUSE_TIME = 2000
const START_DELAY = 1200

/**
 * Typewriter cycling through a list of phrases. Pauses when the tab is hidden
 * and, given `watch`, while that element is off-screen: it re-rendered ~11
 * times a second for the whole visit, long after the hero had scrolled away.
 * Under prefers-reduced-motion it shows the first phrase, still: endless
 * typing is exactly the kind of motion that setting asks to stop.
 */
export function useTyping(roles: string[], watch?: RefObject<Element | null>) {
  const [reduced] = useState(prefersReducedMotion)
  const [text, setText] = useState(reduced ? roles[0] : '')
  const state = useRef({ idx: 0, charIndex: 0, deleting: false })
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    if (reduced) return
    const tick = () => {
      const s = state.current
      const current = roles[s.idx]
      if (!s.deleting) {
        s.charIndex++
        setText(current.substring(0, s.charIndex))
        if (s.charIndex === current.length) {
          s.deleting = true
          timer.current = setTimeout(tick, PAUSE_TIME)
          return
        }
      } else {
        s.charIndex--
        setText(current.substring(0, s.charIndex))
        if (s.charIndex === 0) {
          s.deleting = false
          s.idx = (s.idx + 1) % roles.length
        }
      }
      timer.current = setTimeout(tick, s.deleting ? DELETE_SPEED : TYPE_SPEED)
    }

    timer.current = setTimeout(tick, START_DELAY)

    let onScreen = true
    const resume = () => {
      // Always clear first: a repeated resume would otherwise start a second
      // tick chain alongside the first and permanently double the speed.
      clearTimeout(timer.current)
      if (!document.hidden && onScreen) timer.current = setTimeout(tick, TYPE_SPEED)
    }
    document.addEventListener('visibilitychange', resume)

    const target = watch?.current
    const io = target
      ? new IntersectionObserver(([e]) => {
          if (e.isIntersecting === onScreen) return
          onScreen = e.isIntersecting
          resume()
        })
      : null
    if (target) io!.observe(target)

    return () => {
      clearTimeout(timer.current)
      document.removeEventListener('visibilitychange', resume)
      io?.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return text
}
