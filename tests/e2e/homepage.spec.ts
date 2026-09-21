import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Thessaloniki JavaScript Meetup/)
  })

  test.describe('Complete Homepage Flow', () => {
    test('should display all homepage sections', async ({ page }) => {
      await page.goto('/')

      await expect(page.locator('h1')).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Next Event' })).toBeVisible()
      // The section heading and the markdown body it renders both read "About SKG JS".
      await expect(page.getByRole('heading', { name: 'About SKG JS' }).first()).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Our Community Partners' })).toBeVisible()
    })

    test('should navigate to all pages from homepage', async ({ page }) => {
      await page.goto('/')
      const header = page.locator('header')

      const destinations = [
        { name: 'Events', url: '/events/' },
        { name: 'Community', url: '/community/' },
        { name: 'Contact', url: '/contact/' },
      ] as const

      for (const { name, url } of destinations) {
        await header.getByRole('link', { name, exact: true }).click()
        await expect(page).toHaveURL(url)

        await page.goBack()
        await expect(page).toHaveURL('/')
      }
    })

    test('should display hero with logo and tagline', async ({ page }) => {
      await page.goto('/')

      await expect(page.locator('img[alt*="Logo"]').first()).toBeVisible()
      await expect(page.getByText(/Join the vibrant JavaScript community/i)).toBeVisible()
    })

    test('should display CTA buttons in hero', async ({ page }) => {
      await page.goto('/')

      await expect(page.getByRole('link', { name: /Explore Events/i })).toBeVisible()
      await expect(page.getByRole('link', { name: /Meet the Community/i })).toBeVisible()
    })
  })

  test.describe('Community Partners', () => {
    // Scoped to the partners section so the header and footer logos cannot match. The marquee
    // renders a second, aria-hidden copy of every partner, which role selectors already exclude.
    const partnerLink = (page: import('@playwright/test').Page) =>
      page
        .locator('section')
        .filter({ has: page.getByRole('heading', { name: 'Our Community Partners' }) })
        .getByRole('link', { name: /logo/i })

    test('should display partner logos on homepage', async ({ page }) => {
      await page.goto('/')

      await expect(page.getByRole('heading', { name: 'Our Community Partners' })).toBeVisible()
      expect(await partnerLink(page).count()).toBeGreaterThan(0)
    })

    test('should make partner logos clickable with correct attributes', async ({ page }) => {
      await page.goto('/')

      const firstPartner = partnerLink(page).first()
      await expect(firstPartner).toHaveAttribute('target', '_blank')
      await expect(firstPartner).toHaveAttribute('rel', 'noopener noreferrer')
      await expect(firstPartner).toHaveAttribute('href', /^https:\/\//)
    })

    test('should display partners on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto('/')

      await expect(page.getByRole('heading', { name: 'Our Community Partners' })).toBeVisible()
      expect(await partnerLink(page).count()).toBeGreaterThan(0)
    })
  })

  test.describe('Next Event Preview', () => {
    test('should show either the next event or the no-event placeholder', async ({ page }) => {
      await page.goto('/')
      await expect(page.getByRole('heading', { name: 'Next Event' })).toBeVisible()

      const eventTitle = page.getByTestId('next-event-title')
      const placeholder = page.getByTestId('home-page-no-event-container')

      if ((await eventTitle.count()) > 0) {
        await expect(eventTitle).toBeVisible()
        await expect(placeholder).toHaveCount(0)
      } else {
        await expect(placeholder).toBeVisible()
      }
    })

    test('should display the next event details when one is scheduled', async ({ page }) => {
      await page.goto('/')

      const eventTitle = page.getByTestId('next-event-title')
      test.skip((await eventTitle.count()) === 0, 'No upcoming event in the content at this date')

      await expect(eventTitle).toBeVisible()
      await expect(page.getByTestId('next-event-date')).toBeVisible()
      await expect(page.getByTestId('next-event-location')).toBeVisible()
      await expect(page.getByTestId('next-event-description')).toBeVisible()

      const rsvp = page.getByRole('link', { name: /RSVP/i }).first()
      await expect(rsvp).toHaveAttribute('href', /meetup\.com/)
      await expect(rsvp).toHaveAttribute('target', '_blank')
      await expect(rsvp).toHaveAttribute('rel', 'noopener noreferrer')
    })

    test('should link to full events page', async ({ page }) => {
      await page.goto('/')

      const viewAllLink = page.getByRole('link', { name: /View All Events/i })
      test.skip((await viewAllLink.count()) === 0, 'No upcoming event in the content at this date')

      await expect(viewAllLink).toHaveAttribute('href', '/events/')
    })

    test('should be responsive on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto('/')

      await expect(page.getByRole('heading', { name: 'Next Event' })).toBeVisible()
    })
  })
})
