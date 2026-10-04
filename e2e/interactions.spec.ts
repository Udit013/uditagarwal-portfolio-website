import { test, expect, assertNoErrors } from './fixtures'

test.describe('skills toolkit', () => {
  test('tabs follow the WAI-ARIA keyboard pattern', async ({ ready }) => {
    const tabs = ready.getByRole('tablist', { name: 'Skill categories' }).getByRole('tab')
    await expect(tabs).toHaveCount(6)
    const first = tabs.nth(0)
    await first.focus()
    await expect(first).toHaveAttribute('aria-selected', 'true')

    await ready.keyboard.press('ArrowRight')
    await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true')
    await expect(tabs.nth(1)).toBeFocused()
    await expect(first).toHaveAttribute('tabindex', '-1')

    await ready.keyboard.press('End')
    await expect(tabs.nth(5)).toHaveAttribute('aria-selected', 'true')
    await ready.keyboard.press('ArrowRight') // wraps
    await expect(first).toHaveAttribute('aria-selected', 'true')
  })

  test('each tab shows its own skills', async ({ ready }) => {
    const panel = ready.locator('#skills-panel')
    const tabs = ready.getByRole('tablist', { name: 'Skill categories' }).getByRole('tab')
    await tabs.nth(3).click()
    await expect(panel).toContainText('LangChain')
    await expect(panel).not.toContainText('Tailwind CSS')
    await tabs.nth(0).click()
    await expect(panel).toContainText('Tailwind CSS')
  })
})

test.describe('project case-study drawer', () => {
  // The belt is an endless marquee, so its buttons are never "stable" for a
  // pointer click. Keyboard is the deterministic path (focus pauses the belt
  // on desktop); the pointer path is covered below on the static
  // reduced-motion belt.
  test('opens from the keyboard, focuses close, Escape restores focus', async ({ ready, errors }) => {
    const open = ready.getByRole('button', { name: /View case study: PrepWise/ })
    await open.focus()
    await ready.keyboard.press('Enter')

    const dialog = ready.getByRole('dialog', { name: /PrepWise/ })
    await expect(dialog).toBeVisible()
    await expect(dialog).toHaveAttribute('aria-modal', 'true')
    await expect(ready.getByRole('button', { name: 'Close project details' })).toBeFocused()

    // Screenshot is served as WebP with the PNG as fallback.
    const shot = dialog.locator('.pdrawer-shot img')
    await expect(shot).toHaveJSProperty('complete', true)
    expect(await shot.evaluate((img: HTMLImageElement) => img.currentSrc)).toMatch(/prepwise\.webp$/)

    await ready.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
    await expect(open).toBeFocused()
    assertNoErrors(errors)
  })

  test('reduced motion: static belt, opens with a pointer, closes via button', async ({ page, errors }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    await expect(page.locator('.belt-static')).toBeVisible()
    await page.getByRole('button', { name: /View case study: CipherWatch/ }).click()
    const dialog = page.getByRole('dialog', { name: /CipherWatch/ })
    await expect(dialog).toBeVisible()
    await page.getByRole('button', { name: 'Close project details' }).click()
    await expect(dialog).toBeHidden()
    assertNoErrors(errors)
  })
})

test.describe('terminal', () => {
  test('runs commands and renders real links', async ({ ready, errors }) => {
    await ready.getByRole('button', { name: /Open terminal/ }).click()
    const input = ready.getByRole('textbox', { name: 'Terminal input' })
    await expect(input).toBeFocused()

    await input.fill('projects')
    await input.press('Enter')
    const out = ready.getByRole('log', { name: 'Terminal output' })
    const links = out.locator('a.t-link')
    await expect(links).toHaveCount(7)
    for (const link of await links.all()) {
      await expect(link).toHaveAttribute('href', /^https:\/\//)
      await expect(link).toHaveAttribute('target', '_blank')
      await expect(link).toHaveAttribute('rel', /noopener/)
    }
    assertNoErrors(errors)
  })

  test('escapes user input instead of rendering it as HTML', async ({ ready }) => {
    await ready.getByRole('button', { name: /Open terminal/ }).click()
    const input = ready.getByRole('textbox', { name: 'Terminal input' })
    await input.fill('<img src=x onerror="window.__pwned=1">')
    await input.press('Enter')
    const out = ready.getByRole('log', { name: 'Terminal output' })
    await expect(out).toContainText('command not found')
    await expect(out.locator('img')).toHaveCount(0)
    expect(await ready.evaluate(() => (window as unknown as { __pwned?: number }).__pwned)).toBeUndefined()
  })

  test('closes with Escape and returns focus to the toggle', async ({ ready }) => {
    const toggle = ready.getByRole('button', { name: /Open terminal/ })
    await toggle.click()
    await expect(ready.getByRole('textbox', { name: 'Terminal input' })).toBeFocused()
    await ready.keyboard.press('Escape')
    await expect(ready.getByRole('button', { name: /terminal/i }).first()).toBeFocused()
  })
})

test.describe('contact form', () => {
  test('validates before handing off to the mail app', async ({ ready, errors }) => {
    const form = ready.getByRole('form', { name: 'Contact form' })
    await form.scrollIntoViewIfNeeded()
    const submit = form.getByRole('button', { name: /Send Message/ })
    const alert = form.getByRole('alert')

    await submit.click()
    await expect(alert).toHaveText('Please enter your email.')

    await form.getByLabel(/Email/).fill('not-an-email')
    await submit.click()
    await expect(alert).toHaveText('Please enter a valid email address.')

    await form.getByLabel(/Email/).fill('recruiter@example.com')
    await submit.click()
    await expect(alert).toHaveText('Please enter a message.')

    // Stop the mailto: navigation; the confirmation panel must still appear.
    await ready.evaluate(() => window.addEventListener('beforeunload', (e) => e.preventDefault()))
    await form.getByLabel(/Message/).fill('Hello from the e2e suite')
    await submit.click()
    await expect(ready.getByRole('status').filter({ hasText: 'Your mail app should be opening' })).toBeVisible()
    assertNoErrors(errors)
  })
})
