import fs from 'node:fs'
import path from 'node:path'
import { describe, it, expect } from 'vitest'
import {
  CommunityMemberSchema,
  EventSchema,
  SiteConfigSchema,
  validateCommunityMember,
  validateEventFrontmatter,
  validateSiteConfig,
} from '@/lib/schemas'
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

  it('should accept a missing rsvpLink for events announced before their Meetup page exists', () => {
    const { rsvpLink: _rsvpLink, ...event } = validEvent
    expect(EventSchema.safeParse(event).success).toBe(true)
  })

  it('should reject a non-https rsvpLink', () => {
    expect(
      EventSchema.safeParse({ ...validEvent, rsvpLink: 'http://www.meetup.com/skg-js/' }).success
    ).toBe(false)
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

const validMember = {
  index: 10,
  name: 'Jane Doe',
  role: 'speaker',
  avatar: '/images/community/jane-doe.jpeg',
  social: {
    linkedin: 'https://www.linkedin.com/in/jane-doe/',
    website: 'https://jane.dev/',
  },
  contributedTalks: ['Talk Title'],
}

describe('CommunityMemberSchema', () => {
  it('should accept a valid member', () => {
    expect(CommunityMemberSchema.safeParse(validMember).success).toBe(true)
  })

  it('should accept optional organizer fields', () => {
    const member = {
      ...validMember,
      role: 'organizer',
      title: 'Software Engineer',
      company: 'Example Co',
      joinedDate: '2023-06-10',
      skills: ['JavaScript'],
    }
    expect(CommunityMemberSchema.safeParse(member).success).toBe(true)
  })

  it('should reject a missing index', () => {
    const { index: _index, ...member } = validMember
    expect(CommunityMemberSchema.safeParse(member).success).toBe(false)
  })

  it('should reject an invalid role', () => {
    expect(CommunityMemberSchema.safeParse({ ...validMember, role: 'host' }).success).toBe(false)
  })

  it('should reject an unknown top-level key', () => {
    expect(CommunityMemberSchema.safeParse({ ...validMember, avtar: 'x.jpeg' }).success).toBe(false)
  })

  it('should reject an unknown social key', () => {
    const member = { ...validMember, social: { linkdin: 'https://linkedin.com/in/jane' } }
    expect(CommunityMemberSchema.safeParse(member).success).toBe(false)
  })
})

describe('validateCommunityMember', () => {
  it('should return the parsed frontmatter when valid', () => {
    expect(validateCommunityMember(validMember, 'Short bio.', 'valid.md')).toEqual(validMember)
  })

  it('should throw an error naming the file when the bio is empty', () => {
    expect(() => validateCommunityMember(validMember, '  \n', 'no-bio.md')).toThrow(
      /no-bio\.md[\s\S]*bio/
    )
  })

  it('should throw an error naming the file and the invalid field', () => {
    expect(() =>
      validateCommunityMember({ ...validMember, role: 'host' }, 'Bio.', 'broken.md')
    ).toThrow(/broken\.md[\s\S]*role/)
  })

  it('should accept every member file in content/community', () => {
    const communityDir = path.join(process.cwd(), 'content', 'community')
    const files = fs.readdirSync(communityDir).flatMap((roleDir) =>
      fs
        .readdirSync(path.join(communityDir, roleDir))
        .filter((filename) => filename.endsWith('.md'))
        .map((filename) => path.join(communityDir, roleDir, filename))
    )

    expect(files.length).toBeGreaterThan(0)
    files.forEach((file) => {
      const { frontmatter, markdown } = parseMarkdown(fs.readFileSync(file, 'utf-8'))
      expect(() => validateCommunityMember(frontmatter, markdown, file)).not.toThrow()
    })
  })
})

const validSiteConfig = {
  siteName: 'Thessaloniki JavaScript Meetup',
  tagline: 'JavaScript community in Thessaloniki',
  description: 'Join the Thessaloniki JavaScript community for meetups, talks, and networking.',
  social: {
    meetup: 'https://www.meetup.com/skg-js/',
    linkedin: 'https://www.linkedin.com/company/skg-js/',
    instagram: 'https://www.instagram.com/skgjs.gr/',
  },
  contact: {
    email: 'info@skgjs.gr',
    enableContactForm: true,
    web3formsKey: '00000000-0000-0000-0000-000000000000',
  },
  speakerFormUrl: 'https://docs.google.com/forms/d/e/example/viewform',
}

describe('SiteConfigSchema', () => {
  it('should accept a valid site config', () => {
    expect(SiteConfigSchema.safeParse(validSiteConfig).success).toBe(true)
  })

  it('should reject unknown top-level keys', () => {
    expect(SiteConfigSchema.safeParse({ ...validSiteConfig, siteNmae: 'Typo' }).success).toBe(false)
  })

  it('should reject unknown social keys', () => {
    const config = {
      ...validSiteConfig,
      social: { ...validSiteConfig.social, meetupUrl: 'https://www.meetup.com/skg-js/' },
    }
    expect(SiteConfigSchema.safeParse(config).success).toBe(false)
  })

  it('should reject a missing meetup link', () => {
    const { meetup: _meetup, ...social } = validSiteConfig.social
    expect(SiteConfigSchema.safeParse({ ...validSiteConfig, social }).success).toBe(false)
  })

  it('should accept a contact block without a web3forms key', () => {
    const { web3formsKey: _key, ...contact } = validSiteConfig.contact
    expect(SiteConfigSchema.safeParse({ ...validSiteConfig, contact }).success).toBe(true)
  })

  it('should reject unknown contact keys', () => {
    const contact = { ...validSiteConfig.contact, web3FormsKey: 'wrong-casing' }
    expect(SiteConfigSchema.safeParse({ ...validSiteConfig, contact }).success).toBe(false)
  })
})

describe('validateSiteConfig', () => {
  it('should return the parsed frontmatter when valid', () => {
    expect(validateSiteConfig(validSiteConfig, 'site-config.md')).toEqual(validSiteConfig)
  })

  it('should throw an error naming the file and the invalid field', () => {
    const config = { ...validSiteConfig, social: { ...validSiteConfig.social, meetup: 'skg-js' } }
    expect(() => validateSiteConfig(config, 'broken.md')).toThrow(/broken\.md[\s\S]*social\.meetup/)
  })

  it('should accept content/site-config.md', () => {
    const file = path.join(process.cwd(), 'content', 'site-config.md')
    const { frontmatter } = parseMarkdown(fs.readFileSync(file, 'utf-8'))
    expect(() => validateSiteConfig(frontmatter, file)).not.toThrow()
  })
})
