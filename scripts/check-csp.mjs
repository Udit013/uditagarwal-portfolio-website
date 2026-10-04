/**
 * vercel.json's Content-Security-Policy allows inline scripts by hash instead
 * of 'unsafe-inline', so an injected <script> cannot run. The catch: editing
 * an inline script in index.html changes its hash, and the browser then
 * silently refuses to run it in production (the theme bootstrap and the
 * curtain failsafe live there). This fails the check when the pinned hashes
 * and the inline scripts disagree, and prints the hashes to paste in.
 *
 * Run via `npm run check:csp` (included in `npm run lint`).
 */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8')
const vercel = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'))

const csp = vercel.headers
  .flatMap((h) => h.headers)
  .find((h) => h.key === 'Content-Security-Policy')?.value
if (!csp) {
  console.error('✗ vercel.json has no Content-Security-Policy header')
  process.exit(1)
}
const scriptSrc = csp.split(';').map((d) => d.trim()).find((d) => d.startsWith('script-src')) ?? ''

// Executable inline scripts: no src, and no non-JS type (JSON-LD data blocks
// are never executed, so CSP does not apply to them).
const inline = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)]
  .filter(([, attrs]) => !/\bsrc=/.test(attrs) && !/\btype="(?!module|text\/javascript)/.test(attrs))
  .map(([, , body]) => `'sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}'`)

const pinned = scriptSrc.match(/'sha256-[^']+'/g) ?? []
const problems = []
if (scriptSrc.includes("'unsafe-inline'")) problems.push("script-src still allows 'unsafe-inline'")
for (const h of inline) if (!pinned.includes(h)) problems.push(`inline script ${h} is not allowed by script-src`)
for (const h of pinned) if (!inline.includes(h)) problems.push(`script-src pins ${h}, which matches no inline script (stale)`)

if (problems.length) {
  console.error('\n✗ CSP script hashes are out of sync with index.html:\n')
  for (const p of problems) console.error('   ' + p)
  console.error(`\n  Expected script-src hashes:\n   ${inline.join(' ')}\n`)
  process.exit(1)
}
console.log(`✓ CSP pins all ${inline.length} inline scripts by hash, no 'unsafe-inline'`)
