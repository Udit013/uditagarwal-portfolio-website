/**
 * `npm audit` gate for CI: fails on any high or critical advisory, except
 * ones listed in ALLOW below. Each exception needs a reason and an expiry,
 * and the gate also fails once an exception is no longer needed (the
 * advisory is gone) or has expired, so nothing stays waived by accident.
 *
 * Run via `npm run audit:ci`.
 */
import { execSync } from 'node:child_process'

const ALLOW = {
  // picomatch ReDoS via repeated extglobs. Every published picomatch is
  // affected and there is no patched release yet; npm's suggested "fix"
  // downgrades Vite 8 to 6.2.7. Reaches us only through Vite/tinyglobby at
  // build and dev time, matching globs from our own config, never untrusted
  // input, and nothing from it ships to the browser.
  'GHSA-fc5q-39xc-vjpf': { expires: '2027-01-31' },
}

let report
try {
  report = execSync('npm audit --json', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })
} catch (e) {
  report = e.stdout // npm audit exits non-zero when it finds anything
}
const vulns = JSON.parse(report).vulnerabilities ?? {}

const found = new Map() // advisory id -> { severity, title, packages }
for (const v of Object.values(vulns)) {
  for (const via of v.via) {
    if (typeof via !== 'object') continue
    const id = via.url?.split('/').pop() ?? String(via.source)
    const entry = found.get(id) ?? { severity: via.severity, title: via.title, packages: new Set() }
    entry.packages.add(v.name)
    found.set(id, entry)
  }
}

const today = new Date().toISOString().slice(0, 10)
const problems = []
for (const [id, a] of found) {
  if (!['high', 'critical'].includes(a.severity)) continue
  const allow = ALLOW[id]
  if (!allow) problems.push(`${a.severity}: ${id} ${a.title} (${[...a.packages].join(', ')})`)
  else if (allow.expires < today) problems.push(`exception for ${id} expired on ${allow.expires}; re-check it`)
  else console.log(`! allowed until ${allow.expires}: ${id} ${a.title}`)
}
for (const id of Object.keys(ALLOW)) {
  if (!found.has(id)) problems.push(`exception for ${id} is no longer needed; remove it from scripts/audit.mjs`)
}

if (problems.length) {
  console.error('\n✗ npm audit gate failed:\n')
  for (const p of problems) console.error('   ' + p)
  console.error('')
  process.exit(1)
}
console.log('✓ no high or critical advisories outside the allowlist')
