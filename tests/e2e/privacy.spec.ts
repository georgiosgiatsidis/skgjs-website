import { test, expect } from '@playwright/test'

test.describe('Privacy Page', () => {
  test('should be reachable from the footer on any page', async ({ page }) => {
    await page.goto('/')
    await page.locator('footer a[href="/privacy/"]').click()

    await expect(page).toHaveURL('/privacy/')
    await expect(page.locator('h1')).toContainText('How we handle your data')
  })

  test('should name every third party that receives personal data', async ({ page }) => {
    await page.goto('/privacy/')

    // Each of these is a real data flow verified in the codebase; if one is
    // removed from the site, this page has to change with it.
    for (const processor of [
      'Web3Forms',
      'hCaptcha',
      'CleanTalk',
      'Akismet',
      'GitHub Pages',
      'Backblaze B2',
    ]) {
      await expect(page.getByText(processor, { exact: false }).first()).toBeVisible()
    }
  })

  test('should state how long Web3Forms keeps a submission', async ({ page }) => {
    await page.goto('/privacy/')

    await expect(page.getByText(/up to three years from the date of submission/i)).toBeVisible()
  })

  test('should state the data subject rights and the supervisory authority', async ({ page }) => {
    await page.goto('/privacy/')

    await expect(page.getByRole('heading', { name: 'Your rights' })).toBeVisible()
    await expect(page.locator('a[href="https://www.dpa.gr/en"]')).toBeVisible()
  })

  test('should link from the contact form disclosure', async ({ page }) => {
    await page.route('https://api.web3forms.com/**', (route) => route.abort())
    await page.goto('/contact/')

    await page.locator('form a[href="/privacy/"]').click()
    await expect(page).toHaveURL('/privacy/')
  })
})
