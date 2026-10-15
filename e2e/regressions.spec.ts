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

test('terminal: project commands are generated from the project data', async ({ ready }) => {
  await ready.getByRole('button', { name: /Open terminal/ }).click()
  const input = ready.getByRole('textbox', { name: 'Terminal input' })
  const out = ready.getByRole('log', { name: 'Terminal output' })
  await input.fill('cipherwatch')
  await input.press('Enter')
  await expect(out).toContainText('Credential Exposure Ledger')
  await expect(out).toContainText('130 Backend Tests')
  await expect(out.getByRole('link', { name: 'live' }).last()).toHaveAttribute('href', 'https://cipherwatch-web.vercel.app')
  // A long answer opens at its start (the echoed command), not its last line.
  await expect(out.getByText('cipherwatch', { exact: true })).toBeInViewport()
  // Chat mode answers about a named project, not with the generic list.
  await input.fill('chat')
  await input.press('Enter')
  await input.fill('what is snapcast?')
  await input.press('Enter')
  await expect(out).toContainText('One-Take Video Editor')
})

test('terminal button never covers the footer links, open or closed', async ({ ready }) => {
  await ready.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
  await ready.waitForTimeout(600) // the lift is applied on the next frame after scroll
  const overlap = () =>
    ready.evaluate(() => {
      const t = document.querySelector('.term-toggle')!.getBoundingClientRect()
      return [...document.querySelectorAll('footer a')]
        .map((a) => ({ name: a.textContent!.trim(), r: a.getBoundingClientRect() }))
        .filter(({ r }) => !(t.right <= r.left || t.left >= r.right || t.bottom <= r.top || t.top >= r.bottom))
        .map((x) => x.name)
    })
  expect(await overlap()).toEqual([])
  const footerTop = await ready.locator('footer').evaluate((f) => f.getBoundingClientRect().top)
  const toggle = (await ready.locator('.term-toggle').boundingBox())!
  expect(toggle.y + toggle.height).toBeLessThanOrEqual(footerTop)

  await ready.getByRole('button', { name: /Open terminal/ }).click()
  await expect(ready.getByRole('textbox', { name: 'Terminal input' })).toBeFocused()
  const panel = (await ready.locator('.term-panel').boundingBox())!
  const toggleOpen = (await ready.locator('.term-toggle').boundingBox())!
  expect(panel.y).toBeGreaterThanOrEqual(0) // fully on screen
  expect(panel.y + panel.height).toBeLessThanOrEqual(toggleOpen.y) // above the button
  expect(await overlap()).toEqual([])
})

test('footer Email link is reachable and points at the mail address', async ({ ready }) => {
  await ready.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
  await ready.waitForTimeout(600)
  const email = ready.getByRole('contentinfo').getByRole('link', { name: /email/i })
  await expect(email).toBeVisible()
  await expect(email).toHaveAttribute('href', /^mailto:agarwaludit13@gmail\.com/)
  // Nothing sits on top of it: the element at its center is the link itself.
  const box = (await email.boundingBox())!
  const hit = await ready.evaluate(([x, y]) => document.elementFromPoint(x, y)?.closest('a')?.textContent?.trim(), [box.x + box.width / 2, box.y + box.height / 2])
  expect(hit).toMatch(/email/i)
})
