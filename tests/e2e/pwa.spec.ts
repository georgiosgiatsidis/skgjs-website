import { test, expect } from '@playwright/test'

test.describe('Installable PWA', () => {
  test('should link a manifest whose icons are all served', async ({ page, request }) => {
    await page.goto('/')

    const href = await page.locator('link[rel="manifest"]').getAttribute('href')
    expect(href).toBeTruthy()

    const response = await request.get(href!)
    expect(response.ok()).toBe(true)

    const manifest = await response.json()
    expect(manifest.display).toBe('standalone')

    for (const icon of manifest.icons) {
      const iconResponse = await request.get(icon.src)
      expect(iconResponse.ok(), icon.src).toBe(true)
      expect(iconResponse.headers()['content-type']).toContain('image/png')
    }
  })

  test('should link an apple-touch-icon for iOS home screens', async ({ page, request }) => {
    await page.goto('/')

    const href = await page.locator('link[rel="apple-touch-icon"]').getAttribute('href')
    expect(href).toBeTruthy()
    expect((await request.get(href!)).ok()).toBe(true)
  })
})
