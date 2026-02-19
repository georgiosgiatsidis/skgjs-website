export interface Speaker {
  name: string
  bio?: string
  avatar?: string
  social?: {
    twitter?: string
    github?: string
    linkedin?: string
  }
}

export interface SpeakerRef {
  path: string
}

export interface Talk {
  title: string
  description?: string
  presentation?: string
  speaker: Speaker[]
}

export interface Event {
  slug: string
  index: number
  title: string
  date: string
  time: string
  location: string
  rsvpLink: string
  description: string
  speakers: Speaker[]
  talks?: Talk[]
  tags?: string[]
  capacity?: number
  image?: string
  markdown: string
}

export interface SocialLinks {
  twitter?: string
  github?: string
  linkedin?: string
  website?: string
}

export interface CommunityMember {
  index: number
  slug: string
  name: string
  role: 'organizer' | 'member' | 'speaker'
  title?: string
  company?: string
  avatar?: string
  bio: string
  joinedDate?: string
  social?: SocialLinks
  skills?: string[]
  contributedTalks?: string[]
  markdown: string
}

export interface Sponsor {
  slug: string
  name: string
  logo: string
  website: string
  tier?: 'gold' | 'silver' | 'bronze' | 'community'
  active: boolean
  since?: string
  description: string
  markdown: string
}

export interface SiteConfig {
  siteName: string
  tagline: string
  description: string
  nextEvent?: {
    slug: string
    highlight: boolean
  }
  social: {
    meetup: string
    github: string
    instagram: string
    linkedin: string
  }
  contact: {
    email: string
    enableContactForm?: boolean
  }
  analytics?: {
    googleAnalyticsId?: string
  }
  speakerFormUrl?: string
  aboutMarkdown: string
}
