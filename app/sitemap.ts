import { MetadataRoute } from 'next'
import { getAllEvents } from '@/lib/content'
import { ROUTES } from '@/lib/constants'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://skgjs.gr'
  const events = await getAllEvents()

  // Paths come from ROUTES so every URL carries the trailing slash the static export serves;
  // without it each sitemap entry is a 301 redirect.
  const staticPages = [
    {
      url: `${baseUrl}${ROUTES.home}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}${ROUTES.events}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}${ROUTES.community}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}${ROUTES.aboutUs}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}${ROUTES.contact}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}${ROUTES.privacy}`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]

  // Dynamic event pages (if you add individual event pages later)
  const eventPages = events.map((event) => ({
    url: `${baseUrl}${ROUTES.events}${event.slug}/`,
    lastModified: new Date(event.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...eventPages]
}
