import { test as base, expect, type Page } from '@playwright/test'

/**
 * Shared fixture: every test gets the page loaded past the intro curtain, with
 * uncaught exceptions and console errors collected. `assertNoErrors()` fails
 * the test if anything was recorded — most regressions in this app (a throw in
 * an effect, a blocked script) surface there first.
 */
type Fixtures = {
  ready: Page
  errors: string[]
}

export async function waitForSite(page: Page) {
  // The curtain is static HTML that React lifts once fonts are ready.
  await expect(page.locator('#loader')).toHaveCount(0, { timeout: 10_000 })
  await expect(page.locator('#main, main').first()).toBeVisible()
}

export const test = base.extend<Fixtures>({
  errors: async ({ page }, use) => {
    const errors: string[] = []
    page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`))
    page.on('console', (m) => {
      if (m.type() === 'error') errors.push(`console: ${m.text()}`)
    })
    await use(errors)
  },
  ready: async ({ page, errors: _errors }, use) => {
    await page.goto('/')
    await waitForSite(page)
    await use(page)
  },
})

export function assertNoErrors(errors: string[]) {
  expect(errors, 'uncaught errors or console errors').toEqual([])
}

export { expect }
