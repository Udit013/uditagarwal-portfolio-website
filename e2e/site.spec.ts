import { test, expect, assertNoErrors, waitForSite } from './fixtures'
import { SECTION_IDS, SHOW_EXPERIENCE } from '../src/data/content'

test.describe('page health', () => {
  test('loads every section with no errors', async ({ ready, errors }) => {
    for (const id of SECTION_IDS) {
      await expect(ready.locator(`#${id}`), `#${id}`).toBeAttached()
    }
    await expect(ready.getByRole('heading', { level: 1 })).toBeVisible()
    assertNoErrors(errors)
  })

  test('never scrolls horizontally', async ({ ready }) => {
    // Walk the whole page so lazily revealed sections are laid out too.
    const height = await ready.evaluate(() => document.documentElement.scrollHeight)
    for (let y = 0; y < height; y += 700) await ready.evaluate((top) => window.scrollTo(0, top), y)
    const overflow = await ready.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    expect(overflow).toBeLessThanOrEqual(0)
  })
})

test.describe('theme', () => {
  test('toggles and persists across reloads', async ({ ready, errors }) => {
    const html = ready.locator('html')
    await expect(html).toHaveAttribute('data-theme', 'dark')
    await ready.getByRole('button', { name: 'Toggle color theme' }).click()
    await expect(html).toHaveAttribute('data-theme', 'light')
    await ready.reload()
    await waitForSite(ready)
    await expect(html).toHaveAttribute('data-theme', 'light')
    assertNoErrors(errors)
  })

  test('ignores an unknown stored theme', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('udit-theme', 'neon'))
    await page.goto('/')
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  })

  // Regression: an unguarded localStorage write in useTheme replaced the whole
  // site with the error screen when the browser blocks site storage.
  test('site still works when storage is blocked', async ({ page, errors }) => {
    await page.addInitScript(() => {
      Object.defineProperty(window, 'localStorage', {
        configurable: true,
        get() {
          throw new DOMException('The operation is insecure.', 'SecurityError')
        },
      })
    })
    await page.goto('/')
    await waitForSite(page)
    await expect(page.locator('.errfb')).toHaveCount(0)
    await page.getByRole('button', { name: 'Toggle color theme' }).click()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
    assertNoErrors(errors)
  })
})

test.describe('navigation', () => {
  test('nav links scroll to their section', async ({ ready, isMobile }) => {
    if (isMobile) {
      await ready.getByRole('button', { name: 'Open navigation menu' }).click()
      await ready.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Projects' }).click()
    } else {
      await ready.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Projects' }).click()
    }
    await expect(ready.locator('#projects-heading')).toBeInViewport({ timeout: 5_000 })
  })

  test('mobile menu opens and closes', async ({ ready, isMobile }) => {
    test.skip(!isMobile, 'mobile-only control')
    const toggle = ready.getByRole('button', { name: 'Open navigation menu' })
    await toggle.click()
    await expect(ready.getByRole('button', { name: 'Close navigation menu' })).toHaveAttribute('aria-expanded', 'true')
    await ready.getByRole('button', { name: 'Close navigation menu' }).click()
    await expect(ready.getByRole('button', { name: 'Open navigation menu' })).toHaveAttribute('aria-expanded', 'false')
  })
})

// The Experience section is archived behind SHOW_EXPERIENCE (content.ts).
test.describe('experience visibility', () => {
  test('follows SHOW_EXPERIENCE: section, nav link, numbering, terminal', async ({ ready, isMobile }) => {
    await expect(ready.locator('#journey')).toHaveCount(SHOW_EXPERIENCE ? 1 : 0)
    // By target, not role: the closed mobile menu is aria-hidden.
    const nav = ready.locator(isMobile ? '#mobile-drawer' : 'nav[aria-label="Main navigation"]')
    await expect(nav.locator('a[href="#journey"]')).toHaveCount(SHOW_EXPERIENCE ? 1 : 0)
    // Section numbers stay consecutive: Projects is 03 with Experience hidden.
    await expect(ready.locator('#projects .sec-num')).toHaveText(SHOW_EXPERIENCE ? '04' : '03')
    await expect(ready.locator('#contact .sec-num')).toHaveText(SHOW_EXPERIENCE ? '05' : '04')

    await ready.getByRole('button', { name: /Open terminal/ }).click()
    const input = ready.getByRole('textbox', { name: 'Terminal input' })
    const out = ready.getByRole('log', { name: 'Terminal output' })
    await input.fill('experience')
    await input.press('Enter')
    await input.fill('about')
    await input.press('Enter')
    if (SHOW_EXPERIENCE) {
      await expect(out).toContainText('Heartland Community Network')
    } else {
      await expect(out).toContainText("command not found: 'experience'")
      await expect(out).not.toContainText('Heartland')
      await expect(out).not.toContainText('UITS')
    }
  })
})
