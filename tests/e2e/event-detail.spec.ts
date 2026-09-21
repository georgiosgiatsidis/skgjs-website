import { test, expect } from '@playwright/test'

// The first meetup: the oldest event in the content and therefore the one entry that can never
// move out of the past bucket or be reordered by a new event. Its shape - two talks, two speakers
// with LinkedIn profiles, one presentation, three tags - covers every section of the page.
const event = {
  slug: '2024-12-05-kickoff-meetup',
  title: 'SKG JS Meetup #1: Kickoff Meetup',
  talks: ['The Evolution of Web Rendering Architectures', 'Angular Signals'],
  speakers: ['Evangelia Mitsopoulou', 'Konstantinos Ziazios'],
  tags: ['web-rendering', 'angular', 'signals'],
  time: '19:00',
  location: 'OK!Thess, Komotinis 2, 54655, Thessaloniki',
  presentationKey: 'events/event-1/web-rendering/presentation.pptx',
}

const url = `/events/${event.slug}/`

test.describe('Event Detail Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url)
  })

  test('should render the event title as the page heading', async ({ page }) => {
    await expect(page.locator('h1')).toContainText(event.title)
  })

  test('should list every talk on the event', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Talks', level: 2 })).toBeVisible()

    for (const talk of event.talks) {
      await expect(page.getByRole('heading', { name: talk, level: 3 })).toBeVisible()
    }
  })

  test('should name the speaker of each talk', async ({ page }) => {
    for (const speaker of event.speakers) {
      // The name appears on the talk and again in the sidebar card.
      await expect(page.getByText(speaker, { exact: true }).first()).toBeVisible()
    }
  })

  test('should open speaker profiles in a new tab safely', async ({ page }) => {
    const profiles = page.locator('a[href*="linkedin.com"]')
    expect(await profiles.count()).toBeGreaterThan(0)

    for (const profile of await profiles.all()) {
      await expect(profile).toHaveAttribute('target', '_blank')
      await expect(profile).toHaveAttribute('rel', 'noopener noreferrer')
    }
  })

  test('should display the topics of the event', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Topics' })).toBeVisible()

    for (const tag of event.tags) {
      await expect(page.getByText(tag, { exact: true })).toBeVisible()
    }
  })

  test('should display the date, time and location in the details sidebar', async ({ page }) => {
    const details = page
      .locator('div')
      .filter({ has: page.getByRole('heading', { name: 'Event Details' }) })
      .last()

    // The date is formatted on the server, so this assumes a timezone at or east of UTC - which
    // both CI (UTC) and the community (Europe/Athens) are.
    await expect(details).toContainText('December 5, 2024')
    await expect(details).toContainText(event.time)
    await expect(details).toContainText(event.location)
  })

  test('should offer a way back to the events list', async ({ page }) => {
    const back = page.getByRole('link', { name: 'Back to all events' })
    // One above the fold, one at the end of the page.
    await expect(back).toHaveCount(2)

    await back.last().click()
    await expect(page).toHaveURL('/events/')
  })

  // The presentation lives in Backblaze B2. The suite runs against `npm run dev`, which has no
  // credentials in CI or on a fresh clone, so the link is asserted by what the environment
  // actually configures rather than assumed present.
  test('should link the presentation only when the bucket is configured', async ({ page }) => {
    const bucket = process.env.B2_BUCKET_NAME
    const region = process.env.B2_REGION
    const download = page.getByRole('link', { name: 'Download Presentation' })

    if (!bucket || !region) {
      await expect(download).toHaveCount(0)
      return
    }

    await expect(download).toHaveCount(1)
    await expect(download).toHaveAttribute(
      'href',
      `https://${bucket}.s3.${region}.backblazeb2.com/${event.presentationKey}`
    )
    await expect(download).toHaveAttribute('target', '_blank')
    await expect(download).toHaveAttribute('rel', 'noopener noreferrer')
  })
})
