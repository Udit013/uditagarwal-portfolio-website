import { test, expect } from './fixtures'

/** Bugs found in the October audit, pinned so they can't quietly return. */

test('project stats keep their source precision, with readable units', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' }) // counters settle immediately
  await page.goto('/')
  await expect(page.locator('#loader')).toHaveCount(0)
  // NeuroClass lists 11.7M parameters; the counter used to force "11.70".
  const stat = page.locator('.belt-card:not([aria-hidden]) .proj-stat', { hasText: 'Parameters' }).first()
  await expect(stat.locator('.counter-live')).toHaveText('11.7')
  const unit = stat.locator('small')
  await expect(unit).toHaveText('M')
  expect(await unit.evaluate((e) => parseFloat(getComputedStyle(e).fontSize))).toBeGreaterThanOrEqual(12)
})

test('reduced motion: the role is static text, not a typewriter', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  const role = page.locator('.hero-role > span[aria-hidden="true"]').first()
  await expect(role).toHaveText(/\S/) // shown immediately, not blank for 1.2s
  const first = await role.textContent()
  await page.waitForTimeout(2500)
  await expect(role).toHaveText(first!) // and it doesn't cycle
})

test('contact links: the accessible name contains the visible text (WCAG 2.5.3)', async ({ ready }) => {
  const links = ready.getByRole('group', { name: 'Contact methods' }).getByRole('link')
  await expect(links).toHaveCount(4)
  for (const link of await links.all()) {
    const visible = (await link.locator('.clink-label').textContent())!.trim()
    await expect(link).toHaveAccessibleName(new RegExp(visible, 'i'))
  }
  // External links still announce that they open a new tab.
  await expect(links.filter({ hasText: 'GitHub' })).toHaveAccessibleName(/GitHub.*opens in new tab/i)
})

test('phones: skill categories are one swipeable row', async ({ ready, isMobile }) => {
  test.skip(!isMobile, 'phone layout')
  const row = ready.getByRole('tablist', { name: 'Skill categories' })
  const box = (await row.boundingBox())!
  expect(box.height).toBeLessThan(60) // was ~230px of stacked rows
  expect(await row.evaluate((e) => e.scrollWidth > e.clientWidth)).toBe(true)
})
