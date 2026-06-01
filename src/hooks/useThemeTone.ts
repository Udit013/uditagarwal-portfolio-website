import { useEffect, useState } from 'react'

/**
 * Reactively tracks the active theme (light/dark) by observing the
 * `data-theme` attribute on <html>. Lets WebGL materials/text recolor when the
 * user toggles the theme, without remounting the Canvas.
 */
export function useThemeTone() {
  const [light, setLight] = useState(
    () => typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'light',
  )

  useEffect(() => {
    const update = () => setLight(document.documentElement.getAttribute('data-theme') === 'light')
    const obs = new MutationObserver(update)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    update()
    return () => obs.disconnect()
  }, [])

  return {
    light,
    accent: light ? '#c05020' : '#e8855a',
    fg: light ? '#1a1814' : '#f0ece4',
  }
}
