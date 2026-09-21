import { test, expect, type Page } from '@playwright/test'

// The list swaps between a wide card, a two-column and a three-column layout depending on how many
// events the current date puts in each bucket. Content assertions therefore run against the past
// view, which only ever accumulates events, and the upcoming view is asserted by branch.
const pastEventsUrl = '/events/?filter=past'

// The page is statically rendered with the upcoming filter and switches to the one in the URL on
// hydration, with an exit animation that briefly leaves the outgoing card mounted. Tests that read
// the list must wait for that switch to settle.
async function showEvents(page: Page, filter: 'upcoming' | 'past') {
  await page.goto(`/events/?filter=${filter}`)

  const pressed = filter === 'past' ? 'Past' : 'Upcoming'
  await expect(page.getByRole('button', { name: pressed })).toHaveAttribute('aria-pressed', 'true')

  const outgoingBadge = filter === 'past' ? 'Upcoming' : 'Past'
  await expect(
    page.getByTestId('event-card').filter({ has: page.getByText(outgoingBadge, { exact: true }) })
  ).toHaveCount(0)
}

test.describe('Events Page', () => {
  test('should navigate to events page', async ({ page }) => {
    await page.goto('/')
    await page.locator('header').getByRole('link', { name: 'Events', exact: true }).click()

    await expect(page).toHaveURL('/events/')
    await expect(page.locator('h1')).toContainText('Events')
  })

  test('should display upcoming and past filter buttons', async ({ page }) => {
    await page.goto('/events/')

    await expect(page.getByRole('button', { name: 'Upcoming' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Past' })).toBeVisible()
  })

  test('should filter events between upcoming and past', async ({ page }) => {
    await page.goto('/events/')

    const upcoming = page.getByRole('button', { name: 'Upcoming' })
    const past = page.getByRole('button', { name: 'Past' })

    await expect(upcoming).toHaveAttribute('aria-pressed', 'true')
    await expect(past).toHaveAttribute('aria-pressed', 'false')

    await past.click()
    await expect(past).toHaveAttribute('aria-pressed', 'true')
    await expect(upcoming).toHaveAttribute('aria-pressed', 'false')
    await expect(page).toHaveURL(pastEventsUrl)

    await upcoming.click()
    await expect(upcoming).toHaveAttribute('aria-pressed', 'true')
    await expect(past).toHaveAttribute('aria-pressed', 'false')
    await expect(page).toHaveURL('/events/?filter=upcoming')
  })

  test('should adopt the filter from the URL without rewriting it', async ({ page }) => {
    await page.goto('/events/')
    await expect(page.getByRole('button', { name: 'Upcoming' })).toHaveAttribute(
      'aria-pressed',
      'true'
    )
    await expect(page).toHaveURL('/events/')

    await page.goto(pastEventsUrl)
    await expect(page.getByRole('button', { name: 'Past' })).toHaveAttribute('aria-pressed', 'true')
    await expect(page).toHaveURL(pastEventsUrl)
  })

  test('should display event cards with title, date and time', async ({ page }) => {
    await showEvents(page, 'past')

    const firstCard = page.getByTestId('event-card').first()
    await expect(firstCard).toBeVisible()

    await expect(firstCard.getByRole('heading')).toBeVisible()
    // The card's text nodes run together, so these patterns carry no word boundaries.
    await expect(firstCard).toContainText(
      /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{1,2},\s\d{4}/
    )
    await expect(firstCard).toContainText(/\d{1,2}:\d{2}/)
    await expect(firstCard).toContainText('Past')
  })

  test('should open the event detail page from a card', async ({ page }) => {
    await showEvents(page, 'past')

    const firstCard = page.getByTestId('event-card').first()
    const title = (await firstCard.getByRole('heading').innerText()).trim()

    await firstCard.click()

    await expect(page).toHaveURL(/\/events\/[^/]+\/$/)
    await expect(page.locator('h1')).toContainText(title)
  })

  test('should link to Meetup for RSVP on an upcoming event', async ({ page }) => {
    await showEvents(page, 'upcoming')

    const cards = page.getByTestId('event-card')
    test.skip((await cards.count()) === 0, 'No upcoming events in the content at this date')

    await cards.first().click()
    await expect(page).toHaveURL(/\/events\/[^/]+\/$/)

    // The detail page offers the same RSVP link in the header and the sidebar.
    const rsvp = page.getByRole('link', { name: /RSVP/i }).first()
    await expect(rsvp).toBeVisible()
    await expect(rsvp).toHaveAttribute('target', '_blank')
    await expect(rsvp).toHaveAttribute('rel', 'noopener noreferrer')
    await expect(rsvp).toHaveAttribute('href', /meetup\.com/)
  })

  test('should show either events or the documented empty state', async ({ page }) => {
    const views = [
      { filter: 'upcoming', emptyText: /No Upcoming Events Yet/i },
      { filter: 'past', emptyText: /Event history coming soon/i },
    ] as const

    for (const { filter, emptyText } of views) {
      await showEvents(page, filter)

      const cards = page.getByTestId('event-card')
      if ((await cards.count()) === 0) {
        await expect(page.getByText(emptyText)).toBeVisible()
      } else {
        await expect(cards.first()).toBeVisible()
        await expect(page.getByText(emptyText)).toHaveCount(0)
      }
    }
  })

  test.describe('Mobile Layout', () => {
    test.use({ viewport: { width: 375, height: 667 } })

    test('should stack event cards on mobile', async ({ page }) => {
      await showEvents(page, 'past')

      const cards = page.getByTestId('event-card')
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
