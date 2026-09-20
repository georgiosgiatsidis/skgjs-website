import { test, expect } from '@playwright/test'

test.describe('Contact Page', () => {
  // The form posts to a live inbox; block it so no test can ever send a real email.
  test.beforeEach(async ({ page }) => {
    await page.route('https://api.web3forms.com/**', (route) => route.abort())
  })

  test('should navigate to contact page', async ({ page }) => {
    await page.goto('/')
    await page.click('a[href="/contact/"]')
    await expect(page).toHaveURL('/contact/')
    await expect(page.locator('h1')).toContainText('Get in Touch')
  })

  test('should display contact form with all fields', async ({ page }) => {
    await page.goto('/contact/')

    await expect(page.locator('input[name="name"]')).toBeVisible()
    await expect(page.locator('input[name="email"]')).toBeVisible()
    await expect(page.locator('input#subject')).toBeVisible()
    await expect(page.locator('textarea[name="message"]')).toBeVisible()
    await expect(page.locator('button[type="submit"]')).toBeVisible()
  })

  test('should mark every field as required', async ({ page }) => {
    await page.goto('/contact/')

    const required = [
      'input[name="name"]',
      'input[name="email"]',
      'input#subject',
      'textarea[name="message"]',
    ]
    for (const selector of required) {
      await expect(page.locator(selector)).toHaveAttribute('required')
    }
  })

  test('should use a native email input for the email field', async ({ page }) => {
    await page.goto('/contact/')

    await expect(page.locator('input[name="email"]')).toHaveAttribute('type', 'email')
  })

  test('should render the hCaptcha widget', async ({ page }) => {
    await page.goto('/contact/')

    await expect(page.locator('iframe[src*="hcaptcha.com"]').first()).toBeAttached()
  })

  test('should keep submit disabled until the captcha is solved', async ({ page }) => {
    await page.goto('/contact/')

    await page.fill('input[name="name"]', 'John Doe')
    await page.fill('input[name="email"]', 'john@example.com')
    await page.fill('input#subject', 'Inquiry about meetups')
    await page.fill('textarea[name="message"]', 'I would like to know more about upcoming events.')

    // hCaptcha cannot be solved headlessly, so a fully valid form must still not submit.
    await expect(page.locator('button[type="submit"]')).toBeDisabled()
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
