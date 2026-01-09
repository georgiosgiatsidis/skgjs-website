import { z } from 'zod'

export const SpeakerSchema = z.object({
  name: z.string().min(2).max(50),
  bio: z.string().max(200).optional(),
  avatar: z.string().optional(),
  social: z
    .object({
      twitter: z.string().optional(),
      github: z.string().optional(),
      linkedin: z.string().optional(),
    })
    .optional(),
})

export const EventSchema = z.object({
  title: z.string().min(5).max(100),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}(-\d{2}:\d{2})?$/),
  location: z.string().min(10),
  rsvpLink: z.string().url().startsWith('https://'),
  speakers: z.array(SpeakerSchema).min(1),
  tags: z.array(z.string()).optional(),
  capacity: z.number().positive().optional(),
  image: z.string().optional(),
})

export const CommunityMemberSchema = z.object({
  name: z.string().min(2).max(50),
  role: z.enum(['organizer', 'member', 'speaker']),
  title: z.string().optional(),
  company: z.string().optional(),
  avatar: z.string().optional(),
  bio: z.string().min(50).max(500),
  joinedDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  social: z
    .object({
      twitter: z.string().optional(),
      github: z.string().optional(),
      linkedin: z.string().optional(),
      website: z.string().url().optional(),
    })
    .optional(),
  skills: z.array(z.string()).optional(),
  contributedTalks: z.array(z.string()).optional(),
})

export const SponsorSchema = z.object({
  name: z.string().min(2).max(50),
  logo: z.string(),
  website: z.string().url(),
  tier: z.enum(['gold', 'silver', 'bronze', 'community']).optional(),
  active: z.boolean(),
  since: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  description: z.string().min(20).max(200),
})

export const SiteConfigSchema = z.object({
  siteName: z.string(),
  tagline: z.string(),
  description: z.string().min(50).max(160),
  nextEvent: z
    .object({
      slug: z.string(),
      highlight: z.boolean(),
    })
    .optional(),
  social: z.object({
    meetup: z.string().url(),
    github: z.string().url(),
    instagram: z.string().url(),
    linkedin: z.string().url(),
  }),
  contact: z.object({
    email: z.string().email(),
  }),
  analytics: z
    .object({
      googleAnalyticsId: z.string().optional(),
    })
    .optional(),
})
