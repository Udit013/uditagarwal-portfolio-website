import { useEffect, useRef, useState } from 'react'

/** Top progress bar reflecting scroll position. */
export function ScrollProgress() {
  const fill = useRef<HTMLDivElement>(null)
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const next = max > 0 ? Math.round((window.scrollY / max) * 100) : 0
      setPct(next)
      if (fill.current) fill.current.style.width = `${next}%`
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div id="scroll-prog" aria-hidden="true" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}>
      <div id="scroll-fill" ref={fill} />
    </div>
  )
}
