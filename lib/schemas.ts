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

export const SpeakerRefSchema = z.object({
  path: z.string().min(1),
})

export const TalkSchema = z
  .object({
    title: z.string().min(1),
    description: z.string().optional(),
    presentation: z.string().optional(),
    speaker: z.array(z.union([SpeakerRefSchema.strict(), SpeakerSchema])).min(1),
  })
  .strict()

// Strict so that typos in frontmatter keys fail instead of being silently dropped
export const EventSchema = z
  .object({
    index: z.number().positive(),
    title: z.string().min(5).max(100),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    time: z.string().regex(/^\d{2}:\d{2}(-\d{2}:\d{2})?$/),
    location: z.string().min(10),
    // Optional so events can be announced before their Meetup page exists; the UI hides RSVP without it
    rsvpLink: z.string().url().startsWith('https://').optional(),
    description: z.string().optional(),
    talks: z.array(TalkSchema).optional(),
    tags: z.array(z.string()).optional(),
    capacity: z.number().positive().optional(),
    image: z.string().optional(),
  })
  .strict()

function formatIssues(issues: z.ZodIssue[]) {
  return issues
    .map((issue) => `  - ${issue.path.join('.') || '(root)'}: ${issue.message}`)
    .join('\n')
}

export function validateEventFrontmatter(frontmatter: unknown, source: string) {
  const result = EventSchema.safeParse(frontmatter)

  if (!result.success) {
    throw new Error(`Invalid event frontmatter in ${source}:\n${formatIssues(result.error.issues)}`)
  }

  return result.data
}

// Frontmatter only: the bio is the markdown body and is checked in validateCommunityMember
export const CommunityMemberSchema = z
  .object({
    index: z.number().positive(),
    name: z.string().min(2).max(50),
    role: z.enum(['organizer', 'member', 'speaker']),
    title: z.string().optional(),
    company: z.string().optional(),
    avatar: z.string().optional(),
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
      .strict()
      .optional(),
    skills: z.array(z.string()).optional(),
    contributedTalks: z.array(z.string()).optional(),
  })
  .strict()

export function validateCommunityMember(frontmatter: unknown, bio: string, source: string) {
  const result = CommunityMemberSchema.safeParse(frontmatter)
  const issues = result.success ? [] : [...result.error.issues]

  if (bio.trim().length === 0) {
    issues.push({
      code: z.ZodIssueCode.custom,
      path: ['bio'],
      message: 'Markdown body must not be empty',
    })
  }

  if (!result.success || issues.length > 0) {
    throw new Error(`Invalid community member in ${source}:\n${formatIssues(issues)}`)
  }

  return result.data
}

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
