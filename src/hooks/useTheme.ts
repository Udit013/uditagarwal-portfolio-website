import { useCallback, useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

const STORAGE_KEY = 'udit-theme'

/** Reads/writes the data-theme attribute on <html> and persists the choice. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document === 'undefined') return 'dark'
    return (document.documentElement.getAttribute('data-theme') as Theme) || 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggle }
}
