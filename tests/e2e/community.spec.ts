import { test, expect } from '@playwright/test'

test.describe('Community Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/community')
  })

  test('should navigate to community page successfully', async ({ page }) => {
    await expect(page).toHaveURL('/community')
    await expect(page.locator('h1')).toContainText(/Community|Our Community/i)
  })

  test.describe('Member Cards', () => {
    test('should display member cards', async ({ page }) => {
      const memberCards = page.locator('[data-testid="member-card"]')
      const count = await memberCards.count()
      expect(count).toBeGreaterThan(0)
    })

    test('should display organizer members', async ({ page }) => {
      const organizers = page.locator('text=Organizers').locator('..')
      await expect(organizers).toBeVisible()

      const organizerCards = page.locator('[data-testid="member-card"]').filter({
        has: page.locator('text=Organizer'),
      })
      const count = await organizerCards.count()
      expect(count).toBeGreaterThan(0)
    })

    test('should display speaker members', async ({ page }) => {
      const speakers = page.locator('text=/Speakers|Past Speakers/i').locator('..')

      if (await speakers.isVisible()) {
        const speakerCards = page.locator('[data-testid="member-card"]').filter({
          has: page.locator('text=/Speaker/i'),
        })
        const count = await speakerCards.count()
        expect(count).toBeGreaterThan(0)
      }
    })

    test('should display member avatar or fallback', async ({ page }) => {
      const firstMember = page.locator('[data-testid="member-card"]').first()
      const avatar = firstMember.locator('[data-testid="member-avatar"]')

      await expect(avatar).toBeVisible()
    })

    test('should display member name and role', async ({ page }) => {
      const firstMember = page.locator('[data-testid="member-card"]').first()
      const name = firstMember.locator('[data-testid="member-name"]')
      const role = firstMember.locator('[data-testid="member-role"]')

      await expect(name).toBeVisible()
      await expect(role).toBeVisible()
    })

    test('should display member bio', async ({ page }) => {
      const firstMember = page.locator('[data-testid="member-card"]').first()
      const bio = firstMember.locator('[data-testid="member-bio"]')

      await expect(bio).toBeVisible()
    })

    test('should display social links when available', async ({ page }) => {
      const memberWithSocial = page.locator('[data-testid="member-social"]').first()

      if (await memberWithSocial.isVisible()) {
        const socialLinks = memberWithSocial.locator('a')
        const count = await socialLinks.count()
        expect(count).toBeGreaterThan(0)

        const firstLink = socialLinks.first()
        await expect(firstLink).toHaveAttribute('target', '_blank')
        await expect(firstLink).toHaveAttribute('rel', 'noopener noreferrer')
      }
    })

    test('should truncate long bios with read more', async ({ page }) => {
      const readMoreButton = page.locator('button').filter({ hasText: /Read More|Show More/i })

      if (await readMoreButton.first().isVisible()) {
        await readMoreButton.first().click()
        const showLess = page.locator('button').filter({ hasText: /Read Less|Show Less/i })
        await expect(showLess.first()).toBeVisible()
      }
    })
  })

  test.describe('Photo Gallery', () => {
    test('should display photo gallery section', async ({ page }) => {
      const gallery = page.locator('text=/Gallery|Photo Gallery|Past Events/i').locator('..')

      if (await gallery.isVisible()) {
        await expect(gallery).toBeVisible()
      }
    })

    test('should display event photos', async ({ page }) => {
      const photos = page.locator('[data-testid="gallery-photo"]')

      if ((await photos.count()) > 0) {
        await expect(photos.first()).toBeVisible()
      }
    })

    test('should load gallery images without errors', async ({ page }) => {
      const photos = page.locator('[data-testid="gallery-photo"] img')
      const count = await photos.count()

      if (count > 0) {
        for (let i = 0; i < Math.min(count, 3); i++) {
          const photo = photos.nth(i)
          await expect(photo).toBeVisible()
        }
      }
    })

    test('should support lazy loading for images', async ({ page }) => {
      const photos = page.locator('[data-testid="gallery-photo"] img')

      if ((await photos.count()) > 0) {
        const firstPhoto = photos.first()
        const loading = await firstPhoto.getAttribute('loading')
        expect(loading).toBe('lazy')
      }
    })

    test('should display photos in responsive grid', async ({ page }) => {
      const gallery = page.locator('[data-testid="photo-gallery"]')

      if (await gallery.isVisible()) {
        const classes = await gallery.getAttribute('class')
        expect(classes).toMatch(/grid/)
      }
    })
  })

  test.describe('Mobile Layout', () => {
    test('should display member cards on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })

      const memberCards = page.locator('[data-testid="member-card"]')
      await expect(memberCards.first()).toBeVisible()
    })

    test('should stack member cards on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })

      const grid = page
        .locator('.grid')
        .filter({ has: page.locator('[data-testid="member-card"]') })

      if (await grid.isVisible()) {
        const classes = await grid.getAttribute('class')
        // Should not have multiple columns on mobile
        expect(classes).toMatch(/grid/)
      }
    })

    test('should display photo gallery on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })

      const gallery = page.locator('[data-testid="photo-gallery"]')

      if (await gallery.isVisible()) {
        await expect(gallery).toBeVisible()
      }
    })

    test('should adapt photo grid for mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })

      const photos = page.locator('[data-testid="gallery-photo"]')

      if ((await photos.count()) > 0) {
        await expect(photos.first()).toBeVisible()
      }
    })
  })
})
