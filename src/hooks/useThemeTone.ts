import { useEffect, useState } from 'react'

/**
 * Reactively tracks the active theme and reads the tone colours the WebGL layer
 * needs straight off the CSS custom properties.
 *
 * These used to be hardcoded here, which meant every palette change had to be
 * made in two places — and they had already drifted (`--fg` was #121010 in CSS
 * but #1a1814 here). main.css is now the single source of truth; the only
 * unavoidable copy is the pre-paint loader block in index.html, which
 * `npm run check:tokens` keeps honest.
 */

/** Fallbacks only matter before the stylesheet has applied. */
const FALLBACK = {
  dark: { accent: '#e8855a', fg: '#f0ece4' },
  light: { accent: '#b54a1c', fg: '#121010' },
}

function readToken(name: string, fallback: string): string {
  if (typeof document === 'undefined') return fallback
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  // The WebGL shader path parses hex; anything else means the token moved to a
  // format it can't read, so keep the known-good default rather than crash.
  return v.startsWith('#') && (v.length === 7 || v.length === 4) ? v : fallback
}

function readTone(light: boolean) {
  const fb = light ? FALLBACK.light : FALLBACK.dark
  return { accent: readToken('--accent2', fb.accent), fg: readToken('--fg', fb.fg) }
}

const isLight = () =>
  typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'light'

export function useThemeTone() {
  const [tone, setTone] = useState(() => {
    const light = isLight()
    return { light, ...readTone(light) }
  })

  useEffect(() => {
    const update = () => {
      const light = isLight()
      setTone((prev) => {
        const next = { light, ...readTone(light) }
        // Same values → same object, so BackgroundFX doesn't re-run on noise.
        return prev.light === next.light && prev.accent === next.accent && prev.fg === next.fg ? prev : next
      })
    }
    const obs = new MutationObserver(update)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    update()
    return () => obs.disconnect()
  }, [])

  return tone
}
