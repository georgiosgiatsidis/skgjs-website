import { test, expect } from '@playwright/test'

// The hero renders a three.js animation. Creating a WebGL context is not something a browser
// guarantees - a GPU-less CI runner, a VM, blocklisted drivers or webgl.disabled all take it away -
// and an uncaught failure there used to replace the whole document with Next's error page.
//
// webgl.disabled is a Firefox preference, so the other projects would run this with WebGL still
// available and pass without testing anything. They skip instead.
test.use({ launchOptions: { firefoxUserPrefs: { 'webgl.disabled': true } } })

test.describe('Homepage without WebGL', () => {
  test.skip(
    ({ browserName }) => browserName !== 'firefox',
    'webgl.disabled is a Firefox preference'
  )

  test('should still render and stay interactive', async ({ page }) => {
    const pageErrors: string[] = []
    page.on('pageerror', (error) => pageErrors.push(error.message))

    await page.goto('/')

    // Next stamps this on the document root when a client component throws past every boundary.
    await expect(page.locator('html#__next_error__')).toHaveCount(0)

    // The error page has an h1 of its own, so this asserts the real one.
    await expect(page.locator('h1')).toContainText(/Thessaloniki/i)

    await page.locator('header').getByRole('link', { name: 'Contact', exact: true }).click()
    await expect(page).toHaveURL('/contact/')

    expect(pageErrors).toEqual([])
  })
})
