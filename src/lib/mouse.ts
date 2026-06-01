/**
 * Shared mouse state with a single global listener.
 * Multiple consumers (custom cursor, hero parallax, hero tilt, mesh background)
 * read from one object instead of each attaching its own mousemove handler.
 */
export const mouse = {
  x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
  y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
  nx: 0, // normalized -0.5 .. 0.5
  ny: 0,
}

let attached = false

export function initMouse() {
  if (attached || typeof window === 'undefined') return
  attached = true
  window.addEventListener(
    'mousemove',
    (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.nx = e.clientX / window.innerWidth - 0.5
      mouse.ny = e.clientY / window.innerHeight - 0.5
    },
    { passive: true },
  )
}
