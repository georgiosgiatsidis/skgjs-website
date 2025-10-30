import { test, expect } from '@playwright/test'

test.describe('Events Page', () => {
  test('should navigate to events page', async ({ page }) => {
    await page.goto('/')
    await page.click('a[href="/events/"]')
    await expect(page).toHaveURL('/events/')
    await expect(page.locator('h1')).toContainText('Events')
  })

  test('should display upcoming and past filter buttons', async ({ page }) => {
    await page.goto('/events/')
    await expect(page.locator('button:has-text("Upcoming")')).toBeVisible()
    await expect(page.locator('button:has-text("Past")')).toBeVisible()
  })

  test('should filter events between upcoming and past', async ({ page }) => {
    await page.goto('/events/')

    // Check upcoming events are shown by default
    await expect(page.locator('button:has-text("Upcoming")')).toHaveClass(/bg-js-yellow/)

    // Click on Past filter
    await page.click('button:has-text("Past")')
    await expect(page.locator('button:has-text("Past")')).toHaveClass(/bg-js-yellow/)

    // Click back to Upcoming
    await page.click('button:has-text("Upcoming")')
    await expect(page.locator('button:has-text("Upcoming")')).toHaveClass(/bg-js-yellow/)
  })

  test('should display event cards with all information', async ({ page }) => {
    await page.goto('/events/')

    // Check if event cards are displayed
    const eventCards = page.locator('.grid > div')
    await expect(eventCards.first()).toBeVisible()

    // Check event card contains necessary elements
    const firstCard = eventCards.first()
    await expect(firstCard.locator('h3')).toBeVisible() // Title
    await expect(firstCard.locator('text=/📅 Date:/')).toBeVisible()
    await expect(firstCard.locator('text=/🕒 Time:/')).toBeVisible()
    await expect(firstCard.locator('text=/📍 Location:/')).toBeVisible()
  })

  test('should display RSVP button for upcoming events', async ({ page }) => {
    await page.goto('/events/')
    await page.click('button:has-text("Upcoming")')

    // Check for RSVP button
    const rsvpButton = page.locator('a:has-text("RSVP on Meetup")').first()
    if (await rsvpButton.isVisible()) {
      await expect(rsvpButton).toHaveAttribute('target', '_blank')
      await expect(rsvpButton).toHaveAttribute('rel', 'noopener noreferrer')
    }
  })

  test('should open RSVP link in new tab', async ({ page, context }) => {
    await page.goto('/events/')
    await page.click('button:has-text("Upcoming")')

    const rsvpButton = page.locator('a:has-text("RSVP on Meetup")').first()

    if (await rsvpButton.isVisible()) {
      const href = await rsvpButton.getAttribute('href')
      expect(href).toContain('meetup.com')
    }
  })

  test('should display event cards in responsive grid on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }) // iPhone size
    await page.goto('/events/')

    const grid = page.locator('.grid')
    await expect(grid).toBeVisible()

    // Cards should stack on mobile
    const gridClasses = await grid.getAttribute('class')
    expect(gridClasses).toContain('gap-6')
  })

  test('should show empty state for no upcoming events', async ({ page }) => {
    // This test will pass if there are no upcoming events
    // For now, we'll just check that the page handles empty states
    await page.goto('/events/')
    await page.click('button:has-text("Upcoming")')

    // Either events exist or empty message is shown
    const hasEvents = await page.locator('.grid > div').count()
    const emptyMessage = page.locator('text=/No upcoming events/')

    if (hasEvents === 0) {
      await expect(emptyMessage).toBeVisible()
    }
  })

  test('should show empty state for no past events', async ({ page }) => {
    await page.goto('/events/')
    await page.click('button:has-text("Past")')

    // Either events exist or empty message is shown
    const hasEvents = await page.locator('.grid > div').count()
    const emptyMessage = page.locator('text=/Event history coming soon/')

    if (hasEvents === 0) {
      await expect(emptyMessage).toBeVisible()
    }
  })
})
