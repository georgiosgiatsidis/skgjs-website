import fs from 'node:fs'
import path from 'node:path'
import { parseMarkdown } from './markdown'
import type { Event, CommunityMember, Sponsor, SiteConfig } from './types'

const contentDir = path.join(process.cwd(), 'content')

export function getAllEvents(): Event[] {
  const eventsDir = path.join(contentDir, 'events')

  if (!fs.existsSync(eventsDir)) {
    return []
  }

  const filenames = fs.readdirSync(eventsDir)

  const events = filenames
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => {
      const filePath = path.join(eventsDir, filename)
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const { frontmatter, markdown } = parseMarkdown(fileContent)

      return {
        slug: filename.replace('.md', ''),
        ...frontmatter,
        markdown,
      } as Event
    })

  return events
}

export function getUpcomingEvents(): Event[] {
  const events = getAllEvents()
  return events
    .filter((event) => event.status === 'upcoming')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

export function getPastEvents(): Event[] {
  const events = getAllEvents()
  return events
    .filter((event) => event.status === 'past')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getEventBySlug(slug: string): Event | null {
  const events = getAllEvents()
  return events.find((event) => event.slug === slug) || null
}

export function getAllCommunityMembers(role?: string): CommunityMember[] {
  const communityDir = path.join(contentDir, 'community')
  const members: CommunityMember[] = []

  if (!fs.existsSync(communityDir)) {
    return []
  }

  const roles = role ? [role] : ['organizers', 'members', 'speakers']

  roles.forEach((r) => {
    const roleDir = path.join(communityDir, r)
    if (!fs.existsSync(roleDir)) return

    const filenames = fs.readdirSync(roleDir)
    filenames
      .filter((filename) => filename.endsWith('.md'))
      .forEach((filename) => {
        const filePath = path.join(roleDir, filename)
        const fileContent = fs.readFileSync(filePath, 'utf-8')
        const { frontmatter, markdown } = parseMarkdown(fileContent)

        members.push({
          slug: filename.replace('.md', ''),
          ...frontmatter,
          bio: markdown,
        } as CommunityMember)
      })
  })

  return members
}

export function getAllPartners(activeOnly = false): Sponsor[] {
  const partnersDir = path.join(contentDir, 'partners')

  if (!fs.existsSync(partnersDir)) {
    return []
  }

  const filenames = fs.readdirSync(partnersDir)

  const partners = filenames
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => {
      const filePath = path.join(partnersDir, filename)
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const { frontmatter, markdown } = parseMarkdown(fileContent)

      return {
        slug: filename.replace('.md', ''),
        ...frontmatter,
        markdown,
      } as Sponsor
    })

  if (activeOnly) {
    return partners.filter((partner) => partner.active)
  }

  return partners
}

export function getSiteConfig(): SiteConfig {
  const configPath = path.join(contentDir, 'site-config.md')

  if (!fs.existsSync(configPath)) {
    // Return default config if file doesn't exist
    return {
      siteName: 'Thessaloniki JavaScript Meetup',
      tagline: 'JavaScript community in Thessaloniki',
      description: 'Join the Thessaloniki JavaScript community for meetups and networking.',
      social: {
        meetup: 'https://www.meetup.com/skgjs/',
        github: 'https://github.com/skgjs',
        instagram: 'https://instagram.com/skgjs',
        linkedin: 'https://www.linkedin.com/company/skgjs',
      },
      contact: {
        email: 'organizers@skgjs.gr',
      },
      aboutMarkdown: '',
    }
  }

  const fileContent = fs.readFileSync(configPath, 'utf-8')
  const { frontmatter, markdown } = parseMarkdown(fileContent)

  return {
    ...frontmatter,
    aboutMarkdown: markdown,
  } as SiteConfig
}

export function getNextEvent(): Event | null {
  const config = getSiteConfig()
  if (!config.nextEvent?.slug) {
    // Return the next upcoming event if not specified
    const upcomingEvents = getUpcomingEvents()
    return upcomingEvents[0] || null
  }

  return getEventBySlug(config.nextEvent.slug)
}
