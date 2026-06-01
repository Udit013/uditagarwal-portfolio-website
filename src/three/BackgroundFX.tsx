import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { Points as ThreePoints } from 'three'
import { useThemeTone } from '../hooks/useThemeTone'
import { mouse } from '../lib/mouse'
import { isTouch, prefersReducedMotion } from '../lib/utils'

const COUNT = 720

/** A faint, slowly drifting particle field — the one WebGL accent on the site.
 *  Sits fixed behind all content, never overlaps text, cheap to render. */
function Field() {
  const ref = useRef<ThreePoints>(null)
  const { accent } = useThemeTone()
  const reduced = prefersReducedMotion()

  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20
      arr[i * 3 + 1] = (Math.random() - 0.5) * 13
      arr[i * 3 + 2] = (Math.random() - 0.5) * 9
    }
    return arr
  }, [])

  const allowParallax = !isTouch()

  useFrame((state, delta) => {
    if (ref.current && !reduced) {
      ref.current.rotation.y += delta * 0.02
      ref.current.rotation.x += delta * 0.008
    }
    // camera drift toward the cursor — gives the field depth/interactivity
    if (allowParallax) {
      const cam = state.camera
      cam.position.x += (mouse.nx * 2.4 - cam.position.x) * 0.035
      cam.position.y += (-mouse.ny * 2.4 - cam.position.y) * 0.035
      cam.lookAt(0, 0, 0)
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={accent} size={0.055} sizeAttenuation transparent opacity={0.8} depthWrite={false} />
    </points>
  )
}

export default function BackgroundFX() {
  const reduced = prefersReducedMotion()
  return (
    <Canvas
      className="bg-fx"
      // R3F sets position:relative inline by default — force fixed so the
      // canvas never takes flow space (it pushed the hero down otherwise).
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 9], fov: 55 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      frameloop={reduced ? 'demand' : 'always'}
    >
      <Field />
    </Canvas>
  )
}
