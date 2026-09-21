import { test, expect } from '@playwright/test'

test.describe('Community Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/community/')
  })

  test('should navigate to community page successfully', async ({ page }) => {
    await expect(page).toHaveURL('/community/')
    await expect(page.locator('h1')).toContainText(/Community|Our Community/i)
  })

  test.describe('Member Cards', () => {
    test('should display member cards', async ({ page }) => {
      await expect(page.getByTestId('member-card').first()).toBeVisible()
    })

    test('should display organizer members', async ({ page }) => {
      await expect(page.getByRole('heading', { name: 'Organizers' })).toBeVisible()

      const organizerCards = page.getByTestId('member-card').filter({
        has: page.getByTestId('member-role').filter({ hasText: /^Organizer$/ }),
      })
      expect(await organizerCards.count()).toBeGreaterThan(0)
    })

    test('should display speaker members', async ({ page }) => {
      await expect(page.getByRole('heading', { name: 'Speakers' })).toBeVisible()

      const speakerCards = page.getByTestId('member-card').filter({
        has: page.getByTestId('member-role').filter({ hasText: /^Speaker$/ }),
      })
      expect(await speakerCards.count()).toBeGreaterThan(0)
    })

    test('should display member avatar or fallback', async ({ page }) => {
      const firstMember = page.getByTestId('member-card').first()

      await expect(firstMember.getByTestId('member-avatar')).toBeVisible()
    })

    test('should display member name and role', async ({ page }) => {
      const firstMember = page.getByTestId('member-card').first()

      await expect(firstMember.getByTestId('member-name')).toBeVisible()
      await expect(firstMember.getByTestId('member-role')).toBeVisible()
    })

    test('should display member bio', async ({ page }) => {
      const firstMember = page.getByTestId('member-card').first()

      await expect(firstMember.getByTestId('member-bio')).toBeVisible()
    })

    test('should display social links when available', async ({ page }) => {
      const socialContainers = page.getByTestId('member-social')
      expect(await socialContainers.count()).toBeGreaterThan(0)

      const socialLinks = socialContainers.first().locator('a')
      expect(await socialLinks.count()).toBeGreaterThan(0)

      const firstLink = socialLinks.first()
      await expect(firstLink).toHaveAttribute('target', '_blank')
      await expect(firstLink).toHaveAttribute('rel', 'noopener noreferrer')
    })

    test('should truncate long bios with read more', async ({ page }) => {
      const readMore = page.getByRole('button', { name: /Read More/i }).first()
      await expect(readMore).toBeVisible()

      await readMore.click()

      await expect(page.getByRole('button', { name: /Read Less/i }).first()).toBeVisible()
    })
  })

  test.describe('Mobile Layout', () => {
    test.use({ viewport: { width: 375, height: 667 } })

    test('should display member cards on mobile', async ({ page }) => {
      await expect(page.getByTestId('member-card').first()).toBeVisible()
    })

    test('should stack member cards on mobile', async ({ page }) => {
      const cards = page.getByTestId('member-card')
      expect(await cards.count()).toBeGreaterThan(1)

      const first = await cards.nth(0).boundingBox()
      const second = await cards.nth(1).boundingBox()

      expect(first).not.toBeNull()
      expect(second).not.toBeNull()
      // One column: the second card sits below the first, not beside it.
      expect(second!.x).toBeCloseTo(first!.x, 0)
      expect(second!.y).toBeGreaterThan(first!.y)
    })
  })
})
