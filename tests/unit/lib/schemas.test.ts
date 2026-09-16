import fs from 'node:fs'
import path from 'node:path'
import { describe, it, expect } from 'vitest'
import { EventSchema, validateEventFrontmatter } from '@/lib/schemas'
import { parseMarkdown } from '@/lib/markdown'

const validEvent = {
  index: 9,
  title: 'SKG JS Meetup #9: Test Event',
  date: '2026-10-15',
  time: '19:00',
  location: 'OK!Thess, Komotinis 2, 54655, Thessaloniki',
  rsvpLink: 'https://www.meetup.com/skg-js/events/123456/',
  talks: [
    {
      title: 'Talk Title',
      description: 'Brief description of the talk.',
      presentation: 'talk/presentation.pdf',
      speaker: [{ path: 'content/community/speakers/speaker-slug' }],
    },
  ],
  tags: ['react'],
  image: 'https://example.com/event-image.jpeg',
}

describe('EventSchema', () => {
  it('should accept a valid event', () => {
    expect(EventSchema.safeParse(validEvent).success).toBe(true)
  })

  it('should accept an event without talks', () => {
    const { talks: _talks, ...event } = validEvent
    expect(EventSchema.safeParse(event).success).toBe(true)
  })

  it('should accept a non-integer index for special events', () => {
    expect(EventSchema.safeParse({ ...validEvent, index: 7.5 }).success).toBe(true)
  })

  it('should accept an inline speaker object', () => {
    const event = {
      ...validEvent,
      talks: [{ title: 'Talk Title', speaker: [{ name: 'Jane Doe' }] }],
    }
    expect(EventSchema.safeParse(event).success).toBe(true)
  })

  it('should reject an unquoted date parsed by YAML', () => {
    const { frontmatter } = parseMarkdown(
      `---\nindex: 9\ntitle: 'SKG JS Meetup #9'\ndate: 2026-10-15\ntime: '19:00'\nlocation: 'OK!Thess, Komotinis 2'\nrsvpLink: 'https://www.meetup.com/skg-js/'\n---\n`
    )
    expect(EventSchema.safeParse(frontmatter).success).toBe(false)
  })

  it('should reject an unknown top-level key', () => {
    const { rsvpLink, ...event } = validEvent
    expect(EventSchema.safeParse({ ...event, rsvplink: rsvpLink }).success).toBe(false)
  })

  it('should reject an unknown talk key', () => {
    const event = {
      ...validEvent,
      talks: [{ ...validEvent.talks[0], slides: 'talk/slides.pdf' }],
    }
    expect(EventSchema.safeParse(event).success).toBe(false)
  })

  it('should reject a talk without speakers', () => {
    const event = { ...validEvent, talks: [{ title: 'Talk Title', speaker: [] }] }
    expect(EventSchema.safeParse(event).success).toBe(false)
  })

  it('should reject an invalid time', () => {
    expect(EventSchema.safeParse({ ...validEvent, time: '7pm' }).success).toBe(false)
  })

  it('should reject a missing rsvpLink', () => {
    const { rsvpLink: _rsvpLink, ...event } = validEvent
    expect(EventSchema.safeParse(event).success).toBe(false)
  })

  it('should reject a missing index', () => {
    const { index: _index, ...event } = validEvent
    expect(EventSchema.safeParse(event).success).toBe(false)
  })
})

describe('validateEventFrontmatter', () => {
  it('should return the parsed frontmatter when valid', () => {
    expect(validateEventFrontmatter(validEvent, 'valid.md')).toEqual(validEvent)
  })

  it('should throw an error naming the file and the invalid field', () => {
    expect(() => validateEventFrontmatter({ ...validEvent, time: '7pm' }, 'broken.md')).toThrow(
      /broken\.md[\s\S]*time/
    )
  })

  it('should accept every event file in content/events', () => {
    const eventsDir = path.join(process.cwd(), 'content', 'events')
    const filenames = fs.readdirSync(eventsDir).filter((filename) => filename.endsWith('.md'))

    expect(filenames.length).toBeGreaterThan(0)
    filenames.forEach((filename) => {
      const { frontmatter } = parseMarkdown(
        fs.readFileSync(path.join(eventsDir, filename), 'utf-8')
      )
      expect(() => validateEventFrontmatter(frontmatter, filename)).not.toThrow()
    })
  })
})
