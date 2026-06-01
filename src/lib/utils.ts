export const lerp = (a: number, b: number, t: number) => a + (b - a) * t

/** True when the device has no fine hover pointer (touch / coarse). */
export const isTouch = () =>
  typeof window !== 'undefined' &&
  !window.matchMedia('(hover: hover) and (pointer: fine)').matches

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
