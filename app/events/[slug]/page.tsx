import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/layout/Container'
import { Card } from '@/components/ui/Card'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { getAllEvents, getEventBySlug } from '@/lib/content'
import { EventStatusBadge } from '@/components/events/EventStatusBadge'
import { EventRsvpButton } from '@/components/events/EventRsvpButton'
import { EventPhotoGallery } from '@/components/events/EventPhotoGallery'
import { listEventPhotos, getTebiPublicUrl } from '@/lib/tebi'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

function getPresentationUrl(eventIndex: number, presentationPath: string): string {
  return getTebiPublicUrl(`events/event-${eventIndex}/${presentationPath}`)
}

interface EventPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const events = getAllEvents()
  return events.map((event) => ({
    slug: event.slug,
  }))
}

export async function generateMetadata({ params }: EventPageProps) {
  const { slug } = await params
  const event = getEventBySlug(slug)

  if (!event) {
    return {
      title: 'Event Not Found | SKG JS',
    }
  }

  return {
    title: `${event.title} | SKG JS`,
    description: event.markdown.split('\n')[0] || `Join us for ${event.title}`,
  }
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params
  const event = getEventBySlug(slug)

  if (!event) {
    notFound()
  }

  // Fetch photos from B2 for this event
  const photos = await listEventPhotos(event.index)

  const eventDate = new Date(event.date)
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-js-black to-gray-900 pb-32 pt-24 md:pt-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-js-yellow/10 blur-3xl" />
          <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-js-yellow/5 blur-3xl" />
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        </div>

        <Container className="relative z-10">
          <ScrollReveal>
            <Link
              href="/events"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition-colors hover:text-js-yellow"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to all events
            </Link>
          </ScrollReveal>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <ScrollReveal delay={0.1}>
                <EventStatusBadge eventDate={event.date} variant="header" />
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <h1 className="mb-6 text-4xl font-black text-white md:text-5xl lg:text-6xl">
                  {event.title}
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <div className="flex flex-wrap gap-6 text-gray-300">
                  <div className="flex items-center gap-2">
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
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>{formattedDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
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
                    <span>{event.location}</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {event.rsvpLink && (
              <ScrollReveal delay={0.4}>
                <EventRsvpButton
                  eventDate={event.date}
                  rsvpLink={event.rsvpLink}
                  variant="primary"
                />
              </ScrollReveal>
            )}
          </div>
        </Container>
      </section>

      <section className="relative -mt-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ScrollReveal>
                <Card className="overflow-hidden">
                  {event.image && (
                    <div className="relative -mx-6 -mt-6 mb-6 h-64 md:h-80">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  )}

                  {event.markdown && event.markdown.trim() && (
                    <div className="prose prose-lg dark:prose-invert prose-headings:text-js-black dark:prose-headings:text-white prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-strong:text-js-black dark:prose-strong:text-white prose-ul:text-gray-600 dark:prose-ul:text-gray-300 prose-a:text-js-yellow prose-a:no-underline hover:prose-a:underline max-w-none">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{event.markdown}</ReactMarkdown>
                    </div>
                  )}

                  {event.talks && event.talks.length > 0 && (
                    <div className="mt-8 space-y-6">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Talks</h2>
                      {event.talks.map((talk, talkIndex) => (
                        <div
                          key={talkIndex}
                          className="rounded-lg border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-800/50"
                        >
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {talk.title}
                          </h3>
                          {talk.description && (
                            <p className="mt-2 text-gray-600 dark:text-gray-300">
                              {talk.description}
                            </p>
                          )}
                          {talk.speaker && talk.speaker.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-4">
                              {talk.speaker.map((speaker, speakerIndex) => (
                                <div key={speakerIndex} className="flex items-center gap-3">
                                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                                    {speaker.avatar ? (
                                      <Image
                                        src={speaker.avatar}
                                        alt={speaker.name}
                                        fill
                                        className="object-cover"
                                      />
                                    ) : (
                                      <div className="flex h-full w-full items-center justify-center text-sm font-bold text-gray-400">
                                        {speaker.name.charAt(0)}
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                      {speaker.name}
                                    </span>
                                    {speaker.social?.linkedin && (
                                      <a
                                        href={speaker.social.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 transition-colors hover:text-js-yellow"
                                      >
                                        <svg
                                          className="h-4 w-4"
                                          fill="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                      </a>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                          {talk.presentation && (
                            <div className="mt-4">
                              <a
                                href={getPresentationUrl(event.index, talk.presentation)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-md bg-js-yellow px-4 py-2 text-sm font-medium text-js-black transition-colors hover:bg-yellow-400"
                              >
                                <svg
                                  className="h-4 w-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                  />
                                </svg>
                                Download Presentation
                              </a>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {event.tags && event.tags.length > 0 && (
                    <div className="mt-8 border-t border-gray-100 pt-6 dark:border-gray-800">
                      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Topics
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {event.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              </ScrollReveal>
            </div>

            <div className="space-y-6">
              {event.speakers && event.speakers.length > 0 && (
                <ScrollReveal delay={0.1}>
                  <Card>
                    <h3 className="mb-6 text-lg font-bold text-gray-900 dark:text-white">
                      Speaker{event.speakers.length > 1 ? 's' : ''}
                    </h3>
                    <div className="space-y-6">
                      {event.speakers.map((speaker, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                            {speaker.avatar ? (
                              <Image
                                src={speaker.avatar}
                                alt={speaker.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-xl font-bold text-gray-400">
                                {speaker.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {speaker.name}
                            </h4>
                            {speaker.bio && (
                              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                {speaker.bio}
                              </p>
                            )}
                            {speaker.social && (
                              <div className="mt-2 flex gap-3">
                                {speaker.social.github && (
                                  <a
                                    href={`https://github.com/${speaker.social.github}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 transition-colors hover:text-js-yellow"
                                  >
                                    <svg
                                      className="h-4 w-4"
                                      fill="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                  </a>
                                )}
                                {speaker.social.twitter && (
                                  <a
                                    href={`https://twitter.com/${speaker.social.twitter}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 transition-colors hover:text-js-yellow"
                                  >
                                    <svg
                                      className="h-4 w-4"
                                      fill="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                  </a>
                                )}
                                {speaker.social.linkedin && (
                                  <a
                                    href={`https://linkedin.com/in/${speaker.social.linkedin}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 transition-colors hover:text-js-yellow"
                                  >
                                    <svg
                                      className="h-4 w-4"
                                      fill="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                  </a>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </ScrollReveal>
              )}

              <ScrollReveal delay={0.2}>
                <Card className="bg-gradient-to-br from-js-yellow via-yellow-400 to-amber-400">
                  <h3 className="mb-4 text-lg font-bold text-js-black">Event Details</h3>
                  <div className="space-y-4 text-js-black/80">
                    <div className="flex items-start gap-3">
                      <svg
                        className="mt-0.5 h-5 w-5 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-js-black/60">
                          Date
                        </div>
                        <div className="font-medium">{formattedDate}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg
                        className="mt-0.5 h-5 w-5 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-js-black/60">
                          Time
                        </div>
                        <div className="font-medium">{event.time}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg
                        className="mt-0.5 h-5 w-5 shrink-0"
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
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-js-black/60">
                          Location
                        </div>
                        <div className="font-medium">{event.location}</div>
                      </div>
                    </div>
                    {event.capacity && (
                      <div className="flex items-start gap-3">
                        <svg
                          className="mt-0.5 h-5 w-5 shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wider text-js-black/60">
                            Capacity
                          </div>
                          <div className="font-medium">{event.capacity} attendees</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {event.rsvpLink && (
                    <EventRsvpButton
                      eventDate={event.date}
                      rsvpLink={event.rsvpLink}
                      variant="sidebar"
                    />
                  )}
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </Container>
      </section>

      {photos.length > 0 && (
        <section className="py-16">
          <Container>
            <ScrollReveal>
              <EventPhotoGallery photos={photos} eventTitle={event.title} />
            </ScrollReveal>
          </Container>
        </section>
      )}

      <section className="py-16">
        <Container>
          <ScrollReveal>
            <div className="text-center">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-js-yellow dark:text-gray-400"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to all events
              </Link>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  )
}
