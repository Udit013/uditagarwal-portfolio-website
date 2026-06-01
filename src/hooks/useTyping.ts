import { useEffect, useRef, useState } from 'react'

const TYPE_SPEED = 70
const DELETE_SPEED = 35
const PAUSE_TIME = 2000
const START_DELAY = 1200

/** Typewriter cycling through a list of phrases. Pauses when the tab is hidden. */
export function useTyping(roles: string[]) {
  const [text, setText] = useState('')
  const state = useRef({ idx: 0, charIndex: 0, deleting: false })
  const timer = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
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

    const onVisibility = () => {
      if (document.hidden) clearTimeout(timer.current)
      else timer.current = setTimeout(tick, TYPE_SPEED)
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      clearTimeout(timer.current)
      document.removeEventListener('visibilitychange', onVisibility)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return text
}
