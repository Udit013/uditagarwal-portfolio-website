import { useCallback, useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

const STORAGE_KEY = 'udit-theme'

/** Reads/writes the data-theme attribute on <html> and persists the choice. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document === 'undefined') return 'dark'
    return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    // Storage access throws (SecurityError) when a browser blocks site data.
    // Unguarded, that throw escaped this effect into the error boundary and
    // replaced the entire site with the error screen. Persisting the theme is
    // a convenience; the toggle still works for the visit without it.
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      /* storage unavailable: theme simply isn't remembered */
    }
    // Keep the mobile browser chrome in sync with the manual toggle
    // (the static meta tags only track the OS-level preference)
    document
      .querySelectorAll('meta[name="theme-color"]')
      .forEach((m) => m.setAttribute('content', theme === 'dark' ? '#0d0d0d' : '#F2F3F4'))
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggle }
}
