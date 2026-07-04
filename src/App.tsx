import { lazy, Suspense, useEffect, useState } from 'react'
import { LenisProvider } from './hooks/useLenis'
import { useSiteAnimations } from './hooks/useSiteAnimations'
import { initMouse } from './lib/mouse'
import { Loader } from './components/Loader'
import { Cursor } from './components/Cursor'
import { ScrollProgress } from './components/ScrollProgress'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { About } from './components/About'
import { Skills } from './components/Skills'
import { Journey } from './components/Journey'
import { Projects } from './components/Projects'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Terminal } from './components/Terminal'

const BackgroundFX = lazy(() => import('./components/BackgroundFX'))

function Site() {
  useSiteAnimations()
  const [showFX, setShowFX] = useState(false)

  useEffect(() => {
    initMouse()
  }, [])

  /* Defer the WebGL background (heavy Three.js chunk) until the page has
     fully loaded and the main thread is idle — it's ambience, not content,
     so it should never compete with fonts, hero paint, or interactivity. */
  useEffect(() => {
    const ric = window.requestIdleCallback?.bind(window)
    const cic = window.cancelIdleCallback?.bind(window)
    let idleId = 0
    const start = () => {
      idleId = ric ? ric(() => setShowFX(true), { timeout: 2500 }) : window.setTimeout(() => setShowFX(true), 600)
    }
    if (document.readyState === 'complete') start()
    else window.addEventListener('load', start, { once: true })
    return () => {
      window.removeEventListener('load', start)
      if (cic) cic(idleId)
      else window.clearTimeout(idleId)
    }
  }, [])

  return (
    <>
      <a className="skip-link" href="#about">
        Skip to content
      </a>
      <Loader />
      {showFX && (
        <Suspense fallback={null}>
          <BackgroundFX />
        </Suspense>
      )}
      <Cursor />
      <ScrollProgress />
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Journey />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <Terminal />
    </>
  )
}

export default function App() {
  return (
    <LenisProvider>
      <Site />
    </LenisProvider>
  )
}
