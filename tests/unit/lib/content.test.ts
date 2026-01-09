import { describe, it, expect } from 'vitest'
import {
  getAllEvents,
  getEventsSortedAscending,
  getEventsSortedDescending,
  getNextEvent,
  getAllCommunityMembers,
  getAllPartners,
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
      expect(event).toHaveProperty('speakers')
      expect(event).toHaveProperty('markdown')
    })

    it('should have valid date format (YYYY-MM-DD)', async () => {
      const events = await getAllEvents()
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/
      events.forEach((event) => {
        expect(event.date).toMatch(dateRegex)
      })
    })
  })

  describe('getEventsSortedAscending', () => {
    it('should return events sorted by date ascending', async () => {
      const events = await getEventsSortedAscending()
      expect(Array.isArray(events)).toBe(true)
      if (events.length > 1) {
        for (let i = 0; i < events.length - 1; i++) {
          const date1 = new Date(events[i].date)
          const date2 = new Date(events[i + 1].date)
          expect(date1.getTime()).toBeLessThanOrEqual(date2.getTime())
        }
      }
    })
  })

  describe('getEventsSortedDescending', () => {
    it('should return events sorted by date descending', async () => {
      const events = await getEventsSortedDescending()
      expect(Array.isArray(events)).toBe(true)
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
    it('should return an event or null', async () => {
      const nextEvent = await getNextEvent()

      if (nextEvent) {
        expect(nextEvent).toHaveProperty('title')
        expect(nextEvent).toHaveProperty('date')
      } else {
        expect(nextEvent).toBeNull()
      }
    })

    it('should return the earliest event by date', async () => {
      const nextEvent = await getNextEvent()
      const sortedEvents = await getEventsSortedAscending()

      if (sortedEvents.length > 0) {
        expect(nextEvent).toEqual(sortedEvents[0])
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

  describe('getAllPartners', () => {
    it('should load all partners', async () => {
      const partners = await getAllPartners()
      expect(partners).toBeDefined()
      expect(Array.isArray(partners)).toBe(true)
    })

    it('should filter active partners when requested', async () => {
      const activePartners = await getAllPartners(true)
      activePartners.forEach((partner) => {
        expect(partner.active).toBe(true)
      })
    })

    it('should have required partner fields', async () => {
      const partners = await getAllPartners()
      if (partners.length > 0) {
        const partner = partners[0]

        expect(partner).toHaveProperty('slug')
        expect(partner).toHaveProperty('name')
        expect(partner).toHaveProperty('logo')
        expect(partner).toHaveProperty('website')
        expect(partner).toHaveProperty('active')
        expect(partner).toHaveProperty('description')
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
