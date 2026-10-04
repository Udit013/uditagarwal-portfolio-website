import { test, expect, assertNoErrors, waitForSite } from './fixtures'

test.describe('page health', () => {
  test('loads every section with no errors', async ({ ready, errors }) => {
    for (const id of ['home', 'about', 'skills', 'journey', 'projects', 'contact']) {
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
