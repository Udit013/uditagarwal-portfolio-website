/**
 * Coordinates the intro curtain with the animations that should play *as it
 * lifts*. The loader used to run a fixed ~1.9s timeline while the hero started
 * on a blind `delay: 0.7`, so most of the hero entrance played behind an opaque
 * curtain and was never seen. Now the loader announces the moment the panels
 * start opening and the hero plays against that, whenever it happens.
 */

let revealed = false
const waiting = new Set<() => void>()

export const isRevealed = () => revealed

/** Called by the loader as the curtain begins to lift. Idempotent. */
export function markRevealed() {
  if (revealed) return
  revealed = true
  const fns = [...waiting]
  waiting.clear()
  fns.forEach((fn) => fn())
}

/** Runs `fn` when the curtain lifts (immediately if it already has). */
export function onReveal(fn: () => void): () => void {
  if (revealed) {
    fn()
    return () => {}
  }
  waiting.add(fn)
  return () => waiting.delete(fn)
}
