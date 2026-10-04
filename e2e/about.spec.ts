import { test, expect } from './fixtures'
import type { Page } from '@playwright/test'

/**
 * Layout contract for the About section. Credentials are a two-column band on
 * desktop — education stacked on the left, certifications on the right — and
 * stack on tablets and phones. The certification list is the part that grows,
 * so it has growth rules; the two sides are not required to end level.
 */
const rects = (page: Page, sel: string) =>
  page.locator(sel).evaluateAll((els) =>
    els.map((e) => { const r = e.getBoundingClientRect(); return { top: Math.round(r.top), left: Math.round(r.left), right: Math.round(r.right), w: Math.round(r.width) } }),
  )

/** Replace the certification list with n copies, as if more were added. */
const setCertCount = (page: Page, n: number) =>
  page.evaluate((n) => {
    const l = document.querySelector('.cert-list')!
    const base = [...l.children]
    l.replaceChildren(...Array.from({ length: n }, (_, i) => base[i % base.length].cloneNode(true)))
  }, n)

test.describe('About layout', () => {
  test('desktop: education stacks left, certifications list right', async ({ ready, isMobile }) => {
    test.skip(isMobile, 'desktop layout')
    const edu = await rects(ready, '.edu-card')
    expect(new Set(edu.map((e) => e.top)).size).toBe(edu.length) // one degree per row
    expect(new Set(edu.map((e) => e.left)).size).toBe(1)

    const certs = await rects(ready, '.cert-item')
    for (const c of certs) expect(c.left).toBeGreaterThan(edu[0].right) // beside, not below
    expect(new Set(certs.map((c) => c.left)).size).toBe(1) // a single vertical list
  })

  test('desktop: from the 7th certificate the list splits into two columns', async ({ ready, isMobile }) => {
    test.skip(isMobile, 'desktop layout')
    await setCertCount(ready, 6)
    expect(new Set((await rects(ready, '.cert-item')).map((c) => c.left)).size).toBe(1)
    await setCertCount(ready, 9)
    expect(new Set((await rects(ready, '.cert-item')).map((c) => c.left)).size).toBe(2)
    expect(await ready.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0)
  })

  test('tablet: credentials stack, certifications tile', async ({ page, isMobile }) => {
    test.skip(isMobile, 'runs once, with an explicit tablet viewport')
    await page.setViewportSize({ width: 820, height: 1180 })
    await page.goto('/')
    await expect(page.locator('#loader')).toHaveCount(0)
    const eduBottom = await page.locator('.edu-grid').evaluate((e) => e.getBoundingClientRect().bottom)
    const certs = await rects(page, '.cert-item')
    for (const c of certs) expect(c.top).toBeGreaterThan(eduBottom) // below education
    expect(new Set(certs.map((c) => c.left)).size).toBeGreaterThan(1) // tiles, not a list
  })

  test('mobile: single column in reading order', async ({ ready, isMobile }) => {
    test.skip(!isMobile, 'mobile layout')
    const order = ['.about-head', '.about-copy', '.about-intro .portrait', '.about-intro .philosophy-block', '.edu-grid', '.cert-list', '.pillar-stack']
    const tops = []
    for (const sel of order) tops.push((await ready.locator(sel).first().boundingBox())!.y)
    expect(tops).toEqual([...tops].sort((a, b) => a - b))
  })
})
