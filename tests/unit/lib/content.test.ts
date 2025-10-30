import { describe, it, expect, beforeAll } from 'vitest'
import {
  getAllEvents,
  getUpcomingEvents,
  getPastEvents,
  getNextEvent,
  getAllCommunityMembers,
  getAllSponsors,
  getSiteConfig,
} from '@/lib/content'

describe('Content Loading Utilities', () => {
  describe('getAllEvents', () => {
    it('should load all events', async () => {
      const events = await getAllEvents()
      expect(events).toBeDefined()
      expect(Array.isArray(events)).toBe(true)
      expect(events.length).toBeGreaterThan(0)
    })

    it('should have required event fields', async () => {
      const events = await getAllEvents()
      const event = events[0]

      expect(event).toHaveProperty('slug')
      expect(event).toHaveProperty('title')
      expect(event).toHaveProperty('date')
      expect(event).toHaveProperty('time')
      expect(event).toHaveProperty('location')
      expect(event).toHaveProperty('status')
      expect(event).toHaveProperty('speakers')
      expect(event).toHaveProperty('markdown')
    })

    it('should have valid status values', async () => {
      const events = await getAllEvents()
      events.forEach((event) => {
        expect(['upcoming', 'past']).toContain(event.status)
      })
    })
  })

  describe('getUpcomingEvents', () => {
    it('should return only upcoming events', async () => {
      const events = await getUpcomingEvents()
      expect(Array.isArray(events)).toBe(true)
      events.forEach((event) => {
        expect(event.status).toBe('upcoming')
      })
    })

    it('should sort upcoming events by date ascending', async () => {
      const events = await getUpcomingEvents()
      if (events.length > 1) {
        for (let i = 0; i < events.length - 1; i++) {
          const date1 = new Date(events[i].date)
          const date2 = new Date(events[i + 1].date)
          expect(date1.getTime()).toBeLessThanOrEqual(date2.getTime())
        }
      }
    })
  })

  describe('getPastEvents', () => {
    it('should return only past events', async () => {
      const events = await getPastEvents()
      expect(Array.isArray(events)).toBe(true)
      events.forEach((event) => {
        expect(event.status).toBe('past')
      })
    })

    it('should sort past events by date descending', async () => {
      const events = await getPastEvents()
      if (events.length > 1) {
        for (let i = 0; i < events.length - 1; i++) {
          const date1 = new Date(events[i].date)
          const date2 = new Date(events[i + 1].date)
          expect(date1.getTime()).toBeGreaterThanOrEqual(date2.getTime())
        }
      }
    })
  })

  describe('getNextEvent', () => {
    it('should return the next upcoming event or null', async () => {
      const nextEvent = await getNextEvent()

      if (nextEvent) {
        expect(nextEvent.status).toBe('upcoming')
        expect(nextEvent).toHaveProperty('title')
        expect(nextEvent).toHaveProperty('date')
      } else {
        expect(nextEvent).toBeNull()
      }
    })

    it('should return the earliest upcoming event', async () => {
      const nextEvent = await getNextEvent()
      const upcomingEvents = await getUpcomingEvents()

      if (upcomingEvents.length > 0) {
        expect(nextEvent).toEqual(upcomingEvents[0])
      }
    })
  })

  describe('getAllCommunityMembers', () => {
    it('should load all community members', async () => {
      const members = await getAllCommunityMembers()
      expect(members).toBeDefined()
      expect(Array.isArray(members)).toBe(true)
      expect(members.length).toBeGreaterThan(0)
    })

    it('should have required member fields', async () => {
      const members = await getAllCommunityMembers()
      const member = members[0]

      expect(member).toHaveProperty('slug')
      expect(member).toHaveProperty('name')
      expect(member).toHaveProperty('role')
      expect(member).toHaveProperty('bio')
    })

    it('should have valid role values', async () => {
      const members = await getAllCommunityMembers()
      members.forEach((member) => {
        expect(['organizer', 'speaker', 'member']).toContain(member.role)
      })
    })
  })

  describe('getAllSponsors', () => {
    it('should load all sponsors', async () => {
      const sponsors = await getAllSponsors()
      expect(sponsors).toBeDefined()
      expect(Array.isArray(sponsors)).toBe(true)
    })

    it('should filter active sponsors when requested', async () => {
      const activeSponsors = await getAllSponsors(true)
      activeSponsors.forEach((sponsor) => {
        expect(sponsor.active).toBe(true)
      })
    })

    it('should have required sponsor fields', async () => {
      const sponsors = await getAllSponsors()
      if (sponsors.length > 0) {
        const sponsor = sponsors[0]

        expect(sponsor).toHaveProperty('slug')
        expect(sponsor).toHaveProperty('name')
        expect(sponsor).toHaveProperty('logo')
        expect(sponsor).toHaveProperty('website')
        expect(sponsor).toHaveProperty('active')
        expect(sponsor).toHaveProperty('description')
      }
    })
  })

  describe('getSiteConfig', () => {
    it('should load site configuration', async () => {
      const config = await getSiteConfig()
      expect(config).toBeDefined()
      expect(config).toHaveProperty('siteName')
      expect(config).toHaveProperty('tagline')
      expect(config).toHaveProperty('description')
      expect(config).toHaveProperty('social')
      expect(config).toHaveProperty('contact')
    })

    it('should have valid social links', async () => {
      const config = await getSiteConfig()
      expect(config.social).toHaveProperty('meetup')
      expect(config.social).toHaveProperty('github')
      expect(config.social).toHaveProperty('instagram')
      expect(config.social).toHaveProperty('linkedin')
    })

    it('should have contact email', async () => {
      const config = await getSiteConfig()
      expect(config.contact.email).toBeDefined()
      expect(typeof config.contact.email).toBe('string')
    })

    it('should have about markdown content', async () => {
      const config = await getSiteConfig()
      expect(config.aboutMarkdown).toBeDefined()
      expect(typeof config.aboutMarkdown).toBe('string')
      expect(config.aboutMarkdown.length).toBeGreaterThan(0)
    })
  })
})
