import { useEffect, useRef } from 'react'
import { useThemeTone } from '../hooks/useThemeTone'
import { mouse } from '../lib/mouse'
import { isTouch, prefersReducedMotion } from '../lib/utils'

/**
 * Ambient particle field — hand-written WebGL, zero dependencies.
 * Replaces the previous Three.js/R3F scene (−218 KB gzip) with the same
 * visual: slowly drifting accent-colored points with subtle camera parallax
 * toward the cursor. Theme-reactive, reduced-motion aware, DPR-capped.
 */

const COUNT = 720
const FOV = (55 * Math.PI) / 180
const CAM_Z = 9

const VERT = `
attribute vec3 aPos;
uniform mat4 uVP;
uniform float uRotY;
uniform float uRotX;
uniform float uFocal;
varying float vDepth;
void main() {
  float cy = cos(uRotY), sy = sin(uRotY);
  float cx = cos(uRotX), sx = sin(uRotX);
  vec3 p = aPos;
  p = vec3(p.x * cy + p.z * sy, p.y, -p.x * sy + p.z * cy);
  p = vec3(p.x, p.y * cx - p.z * sx, p.y * sx + p.z * cx);
  gl_Position = uVP * vec4(p, 1.0);
  vDepth = gl_Position.w;
  /* clamp so near-camera points never blow up into screen-filling blobs */
  gl_PointSize = min(0.055 * uFocal / max(gl_Position.w, 0.1), 16.0);
}`

const FRAG = `
precision mediump float;
uniform vec3 uColor;
varying float vDepth;
void main() {
  float d = length(gl_PointCoord - 0.5);
  /* fade out points that drift too close to the camera */
  float a = smoothstep(0.5, 0.12, d) * 0.8 * smoothstep(0.6, 3.0, vDepth);
  gl_FragColor = vec4(uColor * a, a);
}`

/* ── Tiny matrix helpers (column-major, WebGL layout) ── */
function perspective(aspect: number): Float32Array {
  const f = 1 / Math.tan(FOV / 2)
  const near = 0.1
  const far = 100
  const nf = 1 / (near - far)
  // prettier-ignore
  return new Float32Array([
    f / aspect, 0, 0, 0,
    0, f, 0, 0,
    0, 0, (far + near) * nf, -1,
    0, 0, 2 * far * near * nf, 0,
  ])
}

function lookAtVP(proj: Float32Array, ex: number, ey: number, ez: number): Float32Array {
  // forward = normalize(eye - target), target = origin
  let fx = ex, fy = ey, fz = ez
  const fl = Math.hypot(fx, fy, fz) || 1
  fx /= fl; fy /= fl; fz /= fl
  // right = normalize(cross(up, f)), up = (0,1,0)
  let rx = fz, ry = 0, rz = -fx
  const rl = Math.hypot(rx, ry, rz) || 1
  rx /= rl; ry /= rl; rz /= rl
  // up' = cross(f, r)
  const ux = fy * rz - fz * ry
  const uy = fz * rx - fx * rz
  const uz = fx * ry - fy * rx
  // view matrix (rotation + translation), then VP = proj * view
  const tx = -(rx * ex + ry * ey + rz * ez)
  const ty = -(ux * ex + uy * ey + uz * ez)
  const tz = -(fx * ex + fy * ey + fz * ez)
  // prettier-ignore
  const v = [
    rx, ux, fx, 0,
    ry, uy, fy, 0,
    rz, uz, fz, 0,
    tx, ty, tz, 1,
  ]
  const out = new Float32Array(16)
  for (let c = 0; c < 4; c++) {
    for (let r = 0; r < 4; r++) {
      out[c * 4 + r] =
        proj[r] * v[c * 4] + proj[4 + r] * v[c * 4 + 1] + proj[8 + r] * v[c * 4 + 2] + proj[12 + r] * v[c * 4 + 3]
    }
  }
  return out
}

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

export default function BackgroundFX() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { accent } = useThemeTone()
  const colorRef = useRef<[number, number, number]>(hexToRgb(accent))
  // Writing a ref during render is an anti-pattern; the draw loop only needs
  // the latest value by the next frame, so sync it in an effect.
  useEffect(() => {
    colorRef.current = hexToRgb(accent)
  }, [accent])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl', { alpha: true, antialias: false, powerPreference: 'low-power' })
    if (!gl || gl.isContextLost()) return

    /* Compile program */
    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }
    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    /* Point cloud — same spread as the previous Three.js field */
    const positions = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 13
      positions[i * 3 + 2] = (Math.random() - 0.5) * 9
    }
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(prog, 'aPos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0)

    const uVP = gl.getUniformLocation(prog, 'uVP')
    const uRotY = gl.getUniformLocation(prog, 'uRotY')
    const uRotX = gl.getUniformLocation(prog, 'uRotX')
    const uFocal = gl.getUniformLocation(prog, 'uFocal')
    const uColor = gl.getUniformLocation(prog, 'uColor')

    gl.enable(gl.BLEND)
    // premultiplied-alpha pipeline (shader outputs uColor * a) — matches the
    // browser compositor's default expectation for WebGL canvases
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
    gl.disable(gl.DEPTH_TEST)
    gl.clearColor(0, 0, 0, 0)

    let proj = perspective(1)
    const applyProjection = () => {
      gl.viewport(0, 0, canvas.width, canvas.height)
      proj = perspective(canvas.width / canvas.height)
      gl.uniform1f(uFocal, canvas.height / 2 / Math.tan(FOV / 2))
    }
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr))
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr))
      if (w === canvas.width && h === canvas.height) return
      canvas.width = w
      canvas.height = h
      applyProjection()
    }
    resize()
    // Always apply on init — the buffer may already be sized (StrictMode
    // re-runs this effect on the same canvas), but THIS program's uniforms
    // still start at zero.
    applyProjection()
    // Observe the element itself — catches CSS-driven size changes, not just window resizes
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const reduced = prefersReducedMotion()
    const allowParallax = !isTouch() && !reduced
    let rotY = 0
    let rotX = 0
    let camX = 0
    let camY = 0
    let last = performance.now()
    let raf = 0

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      if (!reduced) {
        rotY += dt * 0.02
        rotX += dt * 0.008
      }
      if (allowParallax) {
        camX += (mouse.nx * 2.4 - camX) * 0.035
        camY += (-mouse.ny * 2.4 - camY) * 0.035
      }
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniformMatrix4fv(uVP, false, lookAtVP(proj, camX, camY, CAM_Z))
      gl.uniform1f(uRotY, rotY)
      gl.uniform1f(uRotX, rotX)
      const c = colorRef.current
      gl.uniform3f(uColor, c[0], c[1], c[2])
      gl.drawArrays(gl.POINTS, 0, COUNT)
    }
    raf = requestAnimationFrame(frame)

    /* If the GPU evicts the context, stop looping instead of spamming errors */
    const onLost = (e: Event) => {
      e.preventDefault()
      cancelAnimationFrame(raf)
    }
    canvas.addEventListener('webglcontextlost', onLost)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      canvas.removeEventListener('webglcontextlost', onLost)
      // NOTE: never loseContext() here — React StrictMode re-runs effects on
      // the same canvas node, and a canvas can only ever hand out one context.
    }
  }, [])

  return <canvas ref={canvasRef} className="bg-fx" aria-hidden="true" />
}
