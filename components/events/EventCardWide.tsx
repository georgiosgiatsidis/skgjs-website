'use client'

import { Event } from '@/lib/types'
import { Card } from '@/components/ui/Card'
import Link from 'next/link'
import Image from 'next/image'

interface EventCardWideProps {
  event: Event
}

// Extract first 2-3 sentences from markdown for preview
function getDescriptionPreview(markdown: string, maxSentences = 3): string {
  // Remove markdown headers, links, code blocks, and other formatting
  const plainText = markdown
    .replace(/^#+\s+.+$/gm, '') // Remove headers
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert links to text
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]+`/g, '') // Remove inline code
    .replace(/[*_~]+/g, '') // Remove emphasis markers
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim()

  // Split into sentences and take first few
  const sentences = plainText.match(/[^.!?]+[.!?]+/g) || []
  return sentences.slice(0, maxSentences).join(' ').trim()
}

export function EventCardWide({ event }: EventCardWideProps) {
  const eventDate = new Date(event.date)
  const day = eventDate.getDate()
  const month = eventDate.toLocaleDateString('en-US', { month: 'short' })
  const monthLong = eventDate.toLocaleDateString('en-US', { month: 'long' })
  const year = eventDate.getFullYear()
  const weekday = eventDate.toLocaleDateString('en-US', { weekday: 'long' })

  const descriptionPreview = getDescriptionPreview(event.markdown)

  return (
    <Link href={`/events/${event.slug}`} className="block">
      <Card hover glowOnHover className="group overflow-hidden">
        {/* Horizontal layout: image left, content right */}
        <div className="flex flex-col md:flex-row">
          {/* Left side: Image with date badge */}
          <div className="relative md:w-2/5">
            {event.image ? (
              <div className="relative -mx-6 -mt-6 h-64 overflow-hidden md:-my-6 md:-ml-6 md:mr-0 md:h-auto md:min-h-[320px]">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent dark:from-gray-900 md:bg-gradient-to-r" />
              </div>
            ) : (
              <div className="relative -mx-6 -mt-6 flex h-64 items-center justify-center bg-gradient-to-br from-js-yellow/20 to-js-yellow/5 md:-my-6 md:-ml-6 md:mr-0 md:h-auto md:min-h-[320px]">
                <div className="text-6xl font-black text-js-yellow/30">SKG.js</div>
              </div>
            )}

            {/* Date badge */}
            <div className="absolute bottom-4 left-4 flex h-24 w-24 flex-col items-center justify-center rounded-2xl bg-js-yellow text-js-black shadow-lg md:bottom-auto md:left-auto md:right-4 md:top-4">
              <span className="text-3xl font-black">{day}</span>
              <span className="text-sm font-semibold uppercase">{month}</span>
              <span className="text-xs font-medium">{year}</span>
            </div>
          </div>

          {/* Right side: Content */}
          <div className="flex flex-1 flex-col pt-8 md:pl-8 md:pt-0">
            {/* Status badge */}
            <div className="mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-sm font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                Upcoming Event
              </span>
            </div>

            {/* Title */}
            <h3 className="mb-3 text-2xl font-bold text-gray-900 transition-colors group-hover:text-js-yellow dark:text-white dark:group-hover:text-js-yellow md:text-3xl">
              {event.title}
            </h3>

            {/* Date and time */}
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              {weekday}, {monthLong} {day}, {year} at {event.time}
            </p>

            {/* Description preview */}
            {descriptionPreview && (
              <p className="mb-6 line-clamp-3 text-gray-600 dark:text-gray-400">
                {descriptionPreview}
              </p>
            )}

            {/* Meta info grid */}
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Location */}
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-js-yellow/10">
                  <svg
                    className="h-5 w-5 text-js-yellow"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <span>{event.location}</span>
              </div>

              {/* Capacity */}
              {event.capacity && (
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-js-yellow/10">
                    <svg
                      className="h-5 w-5 text-js-yellow"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <span>{event.capacity} spots</span>
                </div>
              )}
            </div>

            {/* Speakers section */}
            {event.speakers && event.speakers.length > 0 && (
              <div className="mb-6">
                <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Speaker{event.speakers.length > 1 ? 's' : ''}
                </h4>
                <div className="space-y-3">
                  {event.speakers.map((speaker, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-js-yellow/20 bg-gray-200 dark:bg-gray-700">
                        {speaker.avatar ? (
                          <Image
                            src={speaker.avatar}
                            alt={speaker.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-lg font-semibold text-gray-500 dark:text-gray-400">
                            {speaker.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {speaker.name}
                        </p>
                        {speaker.bio && (
                          <p className="line-clamp-1 text-sm text-gray-500 dark:text-gray-400">
                            {speaker.bio}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {event.tags && event.tags.length > 0 && (
              <div className="mb-6 flex flex-wrap gap-2">
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600 transition-colors hover:bg-js-yellow/20 hover:text-js-black dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-js-yellow/20 dark:hover:text-js-yellow"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* CTA */}
            <div className="mt-auto border-t border-gray-100 pt-6 dark:border-gray-800">
              <span className="inline-flex items-center gap-2 rounded-lg bg-js-yellow px-6 py-3 font-semibold text-js-black transition-all group-hover:gap-3 group-hover:shadow-lg group-hover:shadow-js-yellow/25">
                View Event Details
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
