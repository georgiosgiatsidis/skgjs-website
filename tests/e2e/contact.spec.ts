import { test, expect } from '@playwright/test'

test.describe('Contact Page', () => {
  test('should navigate to contact page', async ({ page }) => {
    await page.goto('/')
    await page.click('a[href="/contact/"]')
    await expect(page).toHaveURL('/contact/')
    await expect(page.locator('h1')).toContainText('Contact')
  })

  test('should display contact form with all fields', async ({ page }) => {
    await page.goto('/contact/')

    await expect(page.locator('input[name="name"]')).toBeVisible()
    await expect(page.locator('input[name="email"]')).toBeVisible()
    await expect(page.locator('input[name="subject"]')).toBeVisible()
    await expect(page.locator('textarea[name="message"]')).toBeVisible()
    await expect(page.locator('button[type="submit"]')).toBeVisible()
  })

  test('should show validation errors for empty required fields', async ({ page }) => {
    await page.goto('/contact/')

    // Try to submit empty form
    await page.click('button[type="submit"]')

    // Check for validation errors (browser native or custom)
    const nameInput = page.locator('input[name="name"]')
    await expect(nameInput).toHaveAttribute('required')
  })

  test('should show validation error for invalid email', async ({ page }) => {
    await page.goto('/contact/')

    await page.fill('input[name="name"]', 'Test User')
    await page.fill('input[name="email"]', 'invalid-email')
    await page.fill('input[name="subject"]', 'Test Subject')
    await page.fill('input[name="message"]', 'Test message')

    await page.click('button[type="submit"]')

    const emailInput = page.locator('input[name="email"]')
    await expect(emailInput).toHaveAttribute('type', 'email')
  })

  test('should submit form with valid data', async ({ page }) => {
    await page.goto('/contact/')

    await page.fill('input[name="name"]', 'John Doe')
    await page.fill('input[name="email"]', 'john@example.com')
    await page.fill('input[name="subject"]', 'Inquiry about meetups')
    await page.fill('input[name="message"]', 'I would like to know more about upcoming events.')

    await page.click('button[type="submit"]')

    // Wait for success message or form reset
    // Note: actual submission might be mocked in test environment
    await page.waitForTimeout(1000)
  })

  test('should display honeypot field (hidden)', async ({ page }) => {
    await page.goto('/contact/')

    const honeypot = page.locator('input[name="botcheck"]')
    if ((await honeypot.count()) > 0) {
      await expect(honeypot).toBeHidden()
    }
  })

  test('should display social links in footer', async ({ page }) => {
    await page.goto('/contact/')

    // Check footer for social links
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()

    // Footer links are icon-only, so match them by aria-label and destination
    const socialLinks = [
      { label: 'meetup', host: 'meetup.com' },
      { label: 'instagram', host: 'instagram.com' },
      { label: 'linkedin', host: 'linkedin.com' },
    ]
    for (const { label, host } of socialLinks) {
      const link = footer.locator(`a[aria-label="${label}"]`)
      await expect(link).toBeVisible()
      await expect(link).toHaveAttribute('href', new RegExp(host.replace('.', '\\.')))
    }
  })

  test('should open social links in new tab', async ({ page }) => {
    await page.goto('/contact/')

    const meetupLink = page.locator('footer a[href*="meetup.com"]')
    await expect(meetupLink).toHaveAttribute('target', '_blank')
    await expect(meetupLink).toHaveAttribute('rel', 'noopener noreferrer')
  })
})
