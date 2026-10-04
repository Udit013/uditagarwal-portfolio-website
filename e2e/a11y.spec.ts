import AxeBuilder from '@axe-core/playwright'
import { test, expect } from './fixtures'
import type { Page } from '@playwright/test'

/**
 * axe-core against WCAG 2.x A/AA. Runs on both projects (desktop and mobile)
 * and in both themes, since contrast tokens differ per theme.
 */
async function audit(page: Page) {
  // Reveal animations fade content in on scroll; settle the page first so
  // axe measures final colours, not mid-fade opacity.
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const height = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0; y < height; y += 600) await page.evaluate((top) => window.scrollTo(0, top), y)
  await page.evaluate(() => window.scrollTo(0, 0))
  const { violations } = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
  return violations.map((v) => `${v.id} (${v.impact}): ${v.nodes.length} node(s) — ${v.nodes[0]?.target.join(' ')}`)
}

test('no WCAG A/AA violations — dark theme', async ({ ready }) => {
  expect(await audit(ready)).toEqual([])
})

test('no WCAG A/AA violations — light theme', async ({ ready }) => {
  await ready.getByRole('button', { name: 'Toggle color theme' }).click()
  await expect(ready.locator('html')).toHaveAttribute('data-theme', 'light')
  expect(await audit(ready)).toEqual([])
})

test('no WCAG A/AA violations — terminal open', async ({ ready }) => {
  await ready.getByRole('button', { name: /Open terminal/ }).click()
  await ready.getByRole('textbox', { name: 'Terminal input' }).fill('help')
  await ready.keyboard.press('Enter')
  expect(await audit(ready)).toEqual([])
})
