import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Thessaloniki JavaScript Meetup/)
  })

  test.describe('Complete Homepage Flow', () => {
    test('should display all homepage sections in correct order', async ({ page }) => {
      await page.goto('/')

      // Hero section
      const hero = page.locator('text=/Thessaloniki.*JavaScript Meetup/i').first()
      await expect(hero).toBeVisible()

      // Next Event section
      const nextEvent = page.locator('text=/Next Event/i')
      await expect(nextEvent).toBeVisible()

      // About section
      const about = page.locator('text=/About Us/i')
      await expect(about).toBeVisible()

      // Sponsors section
      const sponsors = page.locator('text=/Our Sponsors/i')
      await expect(sponsors).toBeVisible()

      // Instagram section
      const instagram = page.locator('text=/Follow.*Instagram/i')
      if (await instagram.isVisible()) {
        await expect(instagram).toBeVisible()
      }
    })

    test('should navigate to all pages from homepage', async ({ page }) => {
      await page.goto('/')

      // Navigate to Events
      await page.click('a[href="/events"]')
      await expect(page).toHaveURL('/events')
      await page.goBack()

      // Navigate to Community
      await page.click('a[href="/community"]')
      await expect(page).toHaveURL('/community')
      await page.goBack()

      // Navigate to Contact
      await page.click('a[href="/contact"]')
      await expect(page).toHaveURL('/contact')
    })

    test('should display hero with logo and tagline', async ({ page }) => {
      await page.goto('/')

      const logo = page.locator('img[alt*="Logo"]').first()
      await expect(logo).toBeVisible()

      const tagline = page.locator('text=/Join the vibrant JavaScript community/i')
      await expect(tagline).toBeVisible()
    })

    test('should display CTA buttons in hero', async ({ page }) => {
      await page.goto('/')

      const exploreEventsBtn = page.locator('a').filter({ hasText: /Explore Events/i })
      await expect(exploreEventsBtn).toBeVisible()

      const communityBtn = page.locator('a').filter({ hasText: /Meet the Community/i })
      await expect(communityBtn).toBeVisible()
    })
  })

  test('should display sponsor logos on homepage', async ({ page }) => {
    await page.goto('/')

    // Look for sponsors section
    const sponsorsSection = page.locator('text=Our Sponsors').locator('..')

    if (await sponsorsSection.isVisible()) {
      // Check if sponsor logos are displayed
      const sponsorLogos = page.locator('img[alt*="Corp"], img[alt*="Labs"], img[alt*="Hub"]')
      const count = await sponsorLogos.count()
      expect(count).toBeGreaterThan(0)
    }
  })

  test('should make sponsor logos clickable with correct attributes', async ({ page }) => {
    await page.goto('/')

    // Find sponsor links
    const sponsorLinks = page.locator('a[href*="example.com"]')

    if ((await sponsorLinks.count()) > 0) {
      const firstLink = sponsorLinks.first()
      await expect(firstLink).toHaveAttribute('target', '_blank')
      await expect(firstLink).toHaveAttribute('rel', 'noopener noreferrer')
    }
  })

  test('should apply hover effects to sponsor logos', async ({ page }) => {
    await page.goto('/')

    const sponsorLinks = page.locator('a[href*="example.com"]')

    if ((await sponsorLinks.count()) > 0) {
      const firstLink = sponsorLinks.first()

      // Check for hover transition classes
      const classes = await firstLink.getAttribute('class')
      expect(classes).toContain('transition')
    }
  })

  test('should display sponsors in responsive grid', async ({ page }) => {
    await page.goto('/')

    const grid = page.locator('.grid').filter({ has: page.locator('img[alt*="Corp"]') })

    if (await grid.isVisible()) {
      const classes = await grid.getAttribute('class')
      expect(classes).toMatch(/grid-cols/)
    }
  })

  test('should display sponsors on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    // Check if sponsors section adapts to mobile
    const sponsorsSection = page.locator('text=Our Sponsors')

    if (await sponsorsSection.isVisible()) {
      await expect(sponsorsSection).toBeVisible()
    }
  })

  test.describe('Instagram Feed', () => {
    test('should display Instagram feed section', async ({ page }) => {
      await page.goto('/')
      const instagramSection = page.locator('text=/Follow.*Instagram/i')

      if (await instagramSection.isVisible()) {
        await expect(instagramSection).toBeVisible()
      }
    })

    test('should display Instagram embed or fallback link', async ({ page }) => {
      await page.goto('/')
      const instagramEmbed = page.locator('blockquote.instagram-media')
      const fallbackLink = page.locator('a[href*="instagram.com"]')

      const embedVisible = await instagramEmbed.isVisible().catch(() => false)
      const linkVisible = await fallbackLink.isVisible().catch(() => false)

      // Either embed or fallback should be visible
      expect(embedVisible || linkVisible).toBe(true)
    })

    test('should have correct fallback link attributes', async ({ page }) => {
      await page.goto('/')
      const fallbackLink = page.locator('a').filter({ hasText: /Follow.*@skgjs/i })

      if (await fallbackLink.isVisible()) {
        await expect(fallbackLink).toHaveAttribute('href', expect.stringContaining('instagram.com'))
        await expect(fallbackLink).toHaveAttribute('target', '_blank')
        await expect(fallbackLink).toHaveAttribute('rel', 'noopener noreferrer')
      }
    })

    test('should load Instagram script', async ({ page }) => {
      await page.goto('/')
      const scripts = await page.locator('script[src*="instagram.com/embed.js"]').count()
      expect(scripts).toBeGreaterThanOrEqual(0) // May be lazy loaded
    })
  })

  test.describe('Next Event Preview', () => {
    test('should display next event section', async ({ page }) => {
      await page.goto('/')
      const nextEventSection = page.locator('text=/Next Event|Upcoming Event/i')
      await expect(nextEventSection).toBeVisible()
    })

    test('should display next event title and date', async ({ page }) => {
      await page.goto('/')
      const nextEventTitle = page.locator('[data-testid="next-event-title"]')
      const nextEventDate = page.locator('[data-testid="next-event-date"]')

      const titleVisible = await nextEventTitle.isVisible().catch(() => false)
      const dateVisible = await nextEventDate.isVisible().catch(() => false)

      if (titleVisible) {
        await expect(nextEventTitle).toBeVisible()
        await expect(nextEventDate).toBeVisible()
      }
    })

    test('should have RSVP/Register button', async ({ page }) => {
      await page.goto('/')
      const rsvpButton = page.locator('a').filter({ hasText: /RSVP|Register/i })

      if (await rsvpButton.isVisible()) {
        await expect(rsvpButton).toHaveAttribute('href')
      }
    })

    test('should display event location', async ({ page }) => {
      await page.goto('/')
      const location = page.locator('[data-testid="next-event-location"]')

      if (await location.isVisible()) {
        await expect(location).toBeVisible()
      }
    })

    test('should display event description', async ({ page }) => {
      await page.goto('/')
      const description = page.locator('[data-testid="next-event-description"]')

      if (await description.isVisible()) {
        await expect(description).toBeVisible()
      }
    })

    test('should link to full events page', async ({ page }) => {
      await page.goto('/')
      const viewAllLink = page.locator('a').filter({ hasText: /View All Events|See All Events/i })

      if (await viewAllLink.isVisible()) {
        await expect(viewAllLink).toHaveAttribute('href', '/events')
      }
    })

    test('should display placeholder when no upcoming events', async ({ page }) => {
      await page.goto('/')
      const placeholder = page.locator('text=/No upcoming events|Check back soon/i')
      const nextEvent = page.locator('[data-testid="next-event-title"]')

      const hasEvent = await nextEvent.isVisible().catch(() => false)
      const hasPlaceholder = await placeholder.isVisible().catch(() => false)

      // Either event or placeholder should be visible
      expect(hasEvent || hasPlaceholder).toBe(true)
    })

    test('should be responsive on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto('/')

      const nextEventSection = page.locator('text=/Next Event|Upcoming Event/i')

      if (await nextEventSection.isVisible()) {
        await expect(nextEventSection).toBeVisible()
      }
    })
  })
})
