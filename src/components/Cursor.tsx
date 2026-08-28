import { useEffect, useRef, useState } from 'react'
import { mouse } from '../lib/mouse'
import { isTouch, lerp } from '../lib/utils'

/** Custom dual-ring cursor with contextual labels (desktop / fine-pointer only). */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const glow = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState('')
  const [enabled] = useState(() => !isTouch())

  useEffect(() => {
    if (!enabled) return
    let rx = mouse.x
    let ry = mouse.y
    let gx = mouse.x
    let gy = mouse.y
    let raf = 0

    const tick = () => {
      rx = lerp(rx, mouse.x, 0.11)
      ry = lerp(ry, mouse.y, 0.11)
      // slower follow for the ambient glow → soft trailing light
      gx = lerp(gx, mouse.x, 0.06)
      gy = lerp(gy, mouse.y, 0.06)
      // translate3d + the -50% centering offset, so nothing touches layout
      if (dot.current) {
        dot.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`
      }
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`
      }
      if (glow.current) {
        glow.current.style.transform = `translate3d(${gx}px, ${gy}px, 0)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const body = document.body
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const labelled = target.closest<HTMLElement>('[data-cursor]')
      if (labelled?.dataset.cursor) {
        setLabel(labelled.dataset.cursor)
        body.classList.add('cur-label-show')
      }
      if (target.closest('a, button')) body.classList.add('cur-hover')
      if (target.closest('[data-magnetic], .btn-primary, .form-submit')) body.classList.add('cur-action')
    }
    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      // mouseout also fires when moving onto a *child* of the same control,
      // which used to drop the hover state for a frame and flicker the ring.
      // Ignore any move that stays inside the element we're leaving.
      const next = e.relatedTarget as Node | null
      if (next && target.contains(next)) return
      if (target.closest('[data-cursor]')) body.classList.remove('cur-label-show')
      if (target.closest('a, button')) body.classList.remove('cur-hover', 'cur-action', 'cur-label-show')
      if (target.closest('[data-magnetic], .btn-primary, .form-submit')) body.classList.remove('cur-action')
    }
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      body.classList.remove('cur-hover', 'cur-action', 'cur-label-show')
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div id="cursor-glow" ref={glow} aria-hidden="true" />
      <div id="cur-dot" ref={dot} aria-hidden="true" />
      <div id="cur-ring" ref={ring} aria-hidden="true">
        <span className="cur-label" aria-hidden="true">
          {label}
        </span>
      </div>
    </>
  )
}
