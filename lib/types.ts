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

export interface Event {
  slug: string
  title: string
  date: string
  time: string
  location: string
  rsvpLink: string
  speakers: Speaker[]
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
  }
  analytics?: {
    googleAnalyticsId?: string
  }
  aboutMarkdown: string
}

// B2 Storage Types
export interface B2File {
  fileId: string
  fileName: string
  contentLength: number
  contentType: string
  uploadTimestamp: number
}

export interface B2FileListResponse {
  files: B2File[]
  nextFileName: string | null
}

export interface B2SignedUrl {
  url: string
  expiresAt: number
}
