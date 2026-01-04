'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Event } from '@/lib/types'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Countdown } from '@/components/ui/Countdown'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { MagneticButton } from '@/components/animations/MagneticButton'

interface NextEventPreviewProps {
  event: Event | null
}

export function NextEventPreview({ event }: NextEventPreviewProps) {
  if (!event) {
    return (
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950" />
        <div className="container relative mx-auto px-4">
          <ScrollReveal>
            <div className="mx-auto max-w-4xl">
              <div className="mb-12 text-center">
                <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-js-yellow">
                  Coming Up
                </span>
                <h2 className="text-4xl font-bold text-js-black dark:text-white md:text-5xl">
                  Next Event
                </h2>
              </div>

              <Card className="p-12 text-center" hover glowOnHover>
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.svg
                    className="mx-auto h-20 w-20 text-gray-300 dark:text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </motion.svg>
                  <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                    No Upcoming Events
                  </h3>
                  <p className="text-lg text-gray-500 dark:text-gray-400">
                    Stay tuned! We&apos;re planning something amazing.
                  </p>
                  <div className="pt-6">
                    <Link href="/events">
                      <Button variant="outline" size="lg">
                        View Past Events
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </Card>
            </div>
          </ScrollReveal>
        </div>
      </section>
    )
  }

  const eventDate = new Date(event.date)
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const formattedTime = eventDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <section className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-js-yellow/5 via-transparent to-purple-500/5 dark:from-js-yellow/10 dark:via-transparent dark:to-purple-900/10" />
        <div className="absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-js-yellow/10 blur-3xl" />
        <div className="absolute -right-20 bottom-1/4 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <div className="mb-4 inline-flex items-center gap-3">
                <motion.div
                  className="h-px w-12 bg-gradient-to-r from-transparent to-js-yellow"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                />
                <span className="text-sm font-semibold uppercase tracking-widest text-js-yellow">
                  Coming Up
                </span>
                <motion.div
                  className="h-px w-12 bg-gradient-to-l from-transparent to-js-yellow"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                />
              </div>
              <h2 className="bg-gradient-to-r from-js-black to-gray-600 bg-clip-text text-4xl font-bold text-transparent dark:from-white dark:to-gray-300 md:text-5xl">
                Next Event
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="mb-10">
              <Countdown targetDate={eventDate} />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <Card
              className="overflow-hidden border-2 border-gray-200 bg-white/90 shadow-2xl backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/90"
              hover
              glowOnHover
            >
              <div className="relative md:flex">
                <motion.div
                  className="relative overflow-hidden bg-gradient-to-br from-js-yellow via-js-yellow to-yellow-500 md:w-56"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-grid-pattern opacity-20" />
                  <div className="relative flex flex-col items-center justify-center p-10 text-center md:p-8">
                    <div className="mb-2 text-xs font-bold uppercase tracking-widest text-js-black/70">
                      {eventDate.toLocaleDateString('en-US', { weekday: 'short' })}
                    </div>
                    <motion.div
                      className="mb-2 text-6xl font-black text-js-black drop-shadow-sm md:text-7xl"
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                      viewport={{ once: true }}
                    >
                      {eventDate.getDate()}
                    </motion.div>
                    <div className="mb-1 text-xl font-bold uppercase tracking-wider text-js-black/90 md:text-2xl">
                      {eventDate.toLocaleDateString('en-US', { month: 'short' })}
                    </div>
                    <div className="text-base font-semibold text-js-black/70">
                      {eventDate.getFullYear()}
                    </div>
                    <div className="mt-4 rounded-full bg-js-black/10 px-4 py-1.5 backdrop-blur-sm">
                      <span className="text-xs font-bold text-js-black">{formattedTime}</span>
                    </div>
                  </div>
                </motion.div>

                <div className="flex-1 p-8 md:p-10">
                  <div className="space-y-6">
                    <div>
                      <h3
                        data-testid="next-event-title"
                        className="mb-3 text-3xl font-black leading-tight text-js-black dark:text-white md:text-4xl"
                      >
                        {event.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <p
                          data-testid="next-event-date"
                          className="flex items-center gap-2 font-medium text-gray-600 dark:text-gray-400"
                        >
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
                          {formattedDate}
                        </p>
                      </div>
                    </div>

                    <motion.div
                      data-testid="next-event-location"
                      className="flex items-start gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50"
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg
                        className="mt-0.5 h-6 w-6 flex-shrink-0 text-js-yellow"
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
                        <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                          Location
                        </div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                          {event.location}
                        </span>
                      </div>
                    </motion.div>

                    <p
                      data-testid="next-event-description"
                      className="text-lg leading-relaxed text-gray-700 dark:text-gray-300"
                    >
                      {event.markdown.split('\n')[0] || 'Join us for an exciting JavaScript meetup!'}
                    </p>

                    {event.speakers && event.speakers.length > 0 && (
                      <div className="pt-2">
                        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                          Featured Speakers
                        </p>
                        <div className="flex flex-wrap gap-3">
                          {event.speakers.map((speaker, index) => (
                            <motion.div
                              key={index}
                              className="flex items-center gap-2 rounded-full border border-gray-200 bg-gradient-to-r from-gray-100 to-gray-50 px-4 py-2 transition-colors hover:border-js-yellow dark:border-gray-700 dark:from-gray-800 dark:to-gray-800/50 dark:hover:border-js-yellow"
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 }}
                              viewport={{ once: true }}
                              whileHover={{ scale: 1.05 }}
                            >
                              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-js-yellow text-xs font-bold text-js-black">
                                {speaker.name.charAt(0)}
                              </div>
                              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                {speaker.name}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {event.tags && event.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {event.tags.map((tag, index) => (
                          <motion.span
                            key={index}
                            className="rounded-lg border border-js-yellow/30 bg-js-yellow/10 px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-js-black transition-colors hover:bg-js-yellow/20 dark:text-js-yellow"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            viewport={{ once: true }}
                          >
                            #{tag}
                          </motion.span>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-col gap-4 pt-6 sm:flex-row">
                      {event.rsvpLink && (
                        <MagneticButton strength={0.15}>
                          <a
                            href={event.rsvpLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative inline-flex items-center justify-center"
                          >
                            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-js-yellow to-yellow-400 opacity-75 blur transition-opacity group-hover:opacity-100" />
                            <Button
                              variant="primary"
                              size="lg"
                              glowOnHover
                              className="relative flex w-full items-center gap-2 text-base font-bold sm:w-auto"
                            >
                              <svg
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              RSVP Now
                            </Button>
                          </a>
                        </MagneticButton>
                      )}
                      <Link href="/events" className="inline-block">
                        <Button
                          variant="outline"
                          size="lg"
                          className="w-full text-base font-semibold transition-colors hover:border-js-yellow hover:text-js-yellow sm:w-auto"
                        >
                          View All Events
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </svg>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
