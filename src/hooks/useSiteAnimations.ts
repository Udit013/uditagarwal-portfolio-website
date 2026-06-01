import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { mouse } from '../lib/mouse'
import { isTouch, prefersReducedMotion } from '../lib/utils'

gsap.registerPlugin(ScrollTrigger)

/**
 * Centralized GSAP/ScrollTrigger setup, run once after the page has mounted.
 * Only touches stable nodes (hero, headings, static cards) — the filterable
 * grids manage their own state in React, so there's no className tug-of-war.
 */
export function useSiteAnimations() {
  useLayoutEffect(() => {
    const reduced = prefersReducedMotion()
    const touch = isTouch()
    const tickers: gsap.TickerCallback[] = []

    const ctx = gsap.context(() => {
      /* ── Hero entrance ── */
      gsap.set(['#nameRow1', '#nameRow2'], { y: '105%' })
      gsap.set('#heroEyebrow', { opacity: 0, y: 14 })
      gsap.set('#heroRole', { opacity: 0 })
      gsap.set('#heroMeta', { opacity: 0, y: 10 })
      gsap.set('#heroBadge', { opacity: 0, scale: 0.9 })

      if (reduced) {
        gsap.set(['#nameRow1', '#nameRow2'], { y: '0%' })
        gsap.set(['#heroEyebrow', '#heroRole', '#heroMeta', '#heroBadge'], {
          opacity: 1,
          y: 0,
          scale: 1,
        })
      } else {
        // Starts as the intro curtain lifts (~0.7s), kept snappy.
        const tl = gsap.timeline({ delay: 0.7 })
        tl.to(['#nameRow1', '#nameRow2'], {
          y: '0%',
          duration: 0.7,
          stagger: 0.08,
          ease: 'power4.out',
        })
          .to('#heroEyebrow', { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=.5')
          .to('#heroRole', { opacity: 1, duration: 0.4, ease: 'power3.out' }, '-=.35')
          .to('#heroMeta', { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }, '-=.3')
          .to('#heroBadge', { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }, '-=.4')

        gsap.to('.hero-name', {
          y: -70,
          ease: 'none',
          scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: 1.4 },
        })
        gsap.to('#heroEyebrow', {
          opacity: 0,
          y: -16,
          ease: 'none',
          scrollTrigger: { trigger: '#home', start: '10% top', end: '35% top', scrub: 1 },
        })
      }

      /* ── SplitType heading word reveals ── */
      if (!reduced) {
        const splits = new Map<HTMLElement, SplitType>()
        const elements = gsap.utils.toArray<HTMLElement>('.split-h')

        const applyLineStyles = (split: SplitType) => {
          split.lines?.forEach((line) => {
            line.style.overflow = 'hidden'
            line.style.paddingBottom = '.06em'
            line.style.marginBottom = '-.06em'
          })
        }

        document.fonts.ready.then(() => {
          elements.forEach((el) => {
            const split = new SplitType(el, { types: 'lines,words' })
            splits.set(el, split)
            applyLineStyles(split)
            if (split.words) {
              gsap.from(split.words, {
                y: '105%',
                opacity: 0,
                stagger: 0.04,
                duration: 1.05,
                ease: 'power4.out',
                scrollTrigger: { trigger: el, start: 'top 87%', toggleActions: 'play none none reverse' },
              })
            }
          })
          ScrollTrigger.refresh()
        })
      }

      /* ── Contact background text parallax ── */
      if (!reduced) {
        gsap.to('.contact-bg-text', {
          y: -50,
          ease: 'none',
          scrollTrigger: { trigger: '#contact', start: 'top bottom', end: 'bottom top', scrub: 2 },
        })
      }

      /* ── Desktop pointer-driven effects ── */
      if (!touch) {
        // Smoothed, transform-only parallax + subtle 3D tilt on the hero.
        // Transforms are GPU-composited (no layout/paint), and the values are
        // lerped so there's no jitter even on fast pointer moves.
        const heroInner = document.querySelector<HTMLElement>('.hero-inner')
        const badge = document.querySelector<HTMLElement>('#heroBadge')
        const name = document.querySelector<HTMLElement>('.hero-name')
        const role = document.querySelector<HTMLElement>('#heroRole')
        if (heroInner || badge) {
          let cx = 0
          let cy = 0
          const parallaxTick = () => {
            cx += (mouse.nx - cx) * 0.08
            cy += (mouse.ny - cy) * 0.08
            if (heroInner)
              gsap.set(heroInner, {
                rotateY: cx * 4.5,
                rotateX: -cy * 3.5,
                transformPerspective: 1200,
                transformOrigin: 'center',
                overwrite: 'auto',
              })
            if (badge) gsap.set(badge, { x: cx * 16, y: cy * 16, overwrite: 'auto' })
            if (name) gsap.set(name, { x: cx * 10, y: cy * 7, overwrite: 'auto' })
            if (role) gsap.set(role, { x: cx * 6, y: cy * 4, overwrite: 'auto' })
          }
          gsap.ticker.add(parallaxTick)
          tickers.push(parallaxTick)
        }

        // Magnetic buttons
        gsap.utils.toArray<HTMLElement>('[data-magnetic]').forEach((el) => {
          const onMove = (e: MouseEvent) => {
            const r = el.getBoundingClientRect()
            gsap.to(el, {
              x: (e.clientX - (r.left + r.width / 2)) * 0.18,
              y: (e.clientY - (r.top + r.height / 2)) * 0.18,
              duration: 0.5,
              ease: 'power3.out',
            })
          }
          const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.75, ease: 'elastic.out(1,.55)' })
          el.addEventListener('mousemove', onMove)
          el.addEventListener('mouseleave', onLeave)
        })

        // Pillar hover push
        gsap.utils.toArray<HTMLElement>('.pillar').forEach((el) => {
          el.addEventListener('mouseenter', () => gsap.to(el, { x: 4, duration: 0.35, ease: 'power3.out' }))
          el.addEventListener('mouseleave', () => gsap.to(el, { x: 0, duration: 0.55, ease: 'elastic.out(1,.55)' }))
        })

        // Glass card hover glow (RAF-throttled position vars)
        gsap.utils.toArray<HTMLElement>('.glass-card').forEach((card) => {
          let rafId: number | null = null
          card.addEventListener('mousemove', (e) => {
            if (rafId) return
            rafId = requestAnimationFrame(() => {
              const r = card.getBoundingClientRect()
              card.style.setProperty('--gx', `${(((e as MouseEvent).clientX - r.left) / r.width) * 100}%`)
              card.style.setProperty('--gy', `${(((e as MouseEvent).clientY - r.top) / r.height) * 100}%`)
              rafId = null
            })
          })
          card.addEventListener('mouseleave', () => {
            if (rafId) {
              cancelAnimationFrame(rafId)
              rafId = null
            }
          })
        })
      }
    })

    const onLoad = () => ScrollTrigger.refresh()
    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      tickers.forEach((t) => gsap.ticker.remove(t))
      window.removeEventListener('load', onLoad)
      window.removeEventListener('resize', onResize)
      ctx.revert()
    }
  }, [])
}
