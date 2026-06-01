import { lazy, Suspense, useEffect } from 'react'
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

const BackgroundFX = lazy(() => import('./three/BackgroundFX'))

function Site() {
  useSiteAnimations()
  useEffect(() => {
    initMouse()
  }, [])

  return (
    <>
      <Loader />
      <Suspense fallback={null}>
        <BackgroundFX />
      </Suspense>
      <Cursor />
      <ScrollProgress />
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Skills />
      <Journey />
      <Projects />
      <Contact />
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
