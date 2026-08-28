import { useSyncExternalStore } from 'react'
import { SECTION_IDS } from '../data/content'

/**
 * Tracks which section is currently in view.
 *
 * Backed by one shared observer set rather than one per caller: Nav and Hero
 * both need this, and mounting a second IntersectionObserver per section to
 * compute the same value was pure duplicated work.
 */

let active = 'home'
let observers: IntersectionObserver[] = []
const listeners = new Set<() => void>()

function start() {
  observers = SECTION_IDS.flatMap((id) => {
    const el = document.getElementById(id)
    if (!el) return []
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || active === id) return
        active = id
        listeners.forEach((fn) => fn())
      },
      { rootMargin: '-52px 0px -55% 0px', threshold: 0 },
    )
    io.observe(el)
    return [io]
  })
}

function stop() {
  observers.forEach((io) => io.disconnect())
  observers = []
}

function subscribe(fn: () => void) {
  listeners.add(fn)
  if (listeners.size === 1) start()
  return () => {
    listeners.delete(fn)
    if (listeners.size === 0) stop()
  }
}

const getSnapshot = () => active

export function useActiveSection() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}
