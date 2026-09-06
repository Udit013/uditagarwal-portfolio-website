/**
 * The intro curtain in index.html paints before main.css loads, so its palette
 * has to be written out literally — it is the one place a design token is
 * legitimately duplicated. This fails the build if that copy drifts from the
 * stylesheet it mirrors.
 *
 * Run via `npm run check:tokens` (included in `npm run lint`).
 */
import { readFileSync } from 'node:fs'

const css = readFileSync(new URL('../src/styles/main.css', import.meta.url), 'utf8')
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8')

/** loader var -> stylesheet var it mirrors */
const MIRROR = { '--l-bg': '--bg-deep', '--l-fg': '--fg', '--l-a2': '--accent2', '--l-a3': '--accent3', '--l-bd': '--border2' }

const block = (src, start) => {
  const i = src.indexOf(start)
  if (i === -1) throw new Error(`could not find block: ${start}`)
  return src.slice(i, src.indexOf('}', i))
}
const tokens = (text) => {
  const out = {}
  for (const [, k, v] of text.matchAll(/(--[\w-]+):\s*([^;]+);/g)) out[k] = v.trim().replace(/\s*\/\*.*$/, '')
  return out
}
const norm = (v) => v.toLowerCase().replace(/\s+/g, '')

const cssDark = tokens(block(css, '[data-theme="dark"] {'))
const cssLight = tokens(block(css, ':root,\n[data-theme="light"] {'))
const loaderDark = tokens(block(html, '#loader {'))
const loaderLight = tokens(block(html, '[data-theme="light"] #loader {'))

const problems = []
for (const [theme, loader, source] of [['dark', loaderDark, cssDark], ['light', loaderLight, cssLight]]) {
  for (const [lv, cv] of Object.entries(MIRROR)) {
    const got = loader[lv]
    const want = source[cv]
    if (got === undefined) { problems.push(`${theme}: index.html is missing ${lv}`); continue }
    if (want === undefined) { problems.push(`${theme}: main.css is missing ${cv}`); continue }
    if (norm(got) !== norm(want)) {
      problems.push(`${theme}: ${lv} is "${got}" but main.css ${cv} is "${want}"`)
    }
  }
}

if (problems.length) {
  console.error('\n✗ Loader tokens in index.html have drifted from main.css:\n')
  for (const p of problems) console.error('   ' + p)
  console.error('\n  main.css is the source of truth — update the #loader block to match.\n')
  process.exit(1)
}
console.log(`✓ loader tokens match main.css (${Object.keys(MIRROR).length} tokens × 2 themes)`)
