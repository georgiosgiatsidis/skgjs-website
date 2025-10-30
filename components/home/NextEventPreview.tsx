import Link from 'next/link'
import { Event } from '@/lib/types'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

interface NextEventPreviewProps {
  event: Event | null
}

export function NextEventPreview({ event }: NextEventPreviewProps) {
  if (!event) {
    return (
      <section className="py-16 bg-gradient-to-br from-js-yellow/5 to-js-yellow/10 dark:from-js-yellow/10 dark:to-js-yellow/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-js-black dark:text-white">
              Next Event
            </h2>
            
            <Card className="p-12 text-center">
              <div className="space-y-4">
                <svg
                  className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                  No Upcoming Events
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Check back soon for our next meetup!
                </p>
                <div className="pt-4">
                  <Link href="/events">
                    <Button variant="outline">View Past Events</Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
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
    <section className="relative py-20 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-js-yellow/10 via-transparent to-purple-500/10 dark:from-js-yellow/5 dark:via-transparent dark:to-purple-900/10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-js-yellow/20 via-transparent to-transparent dark:from-js-yellow/10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Modern header with accent line */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-js-yellow"></div>
              <span className="text-sm font-semibold uppercase tracking-widest text-js-yellow">
                Coming Up
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-js-yellow"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-js-black to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Next Event
            </h2>
          </div>

          <Card className="overflow-hidden border-2 border-gray-200 dark:border-gray-700 shadow-2xl hover:shadow-js-yellow/20 transition-all duration-300 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <div className="md:flex relative">              
              {/* Modern Date Badge */}
              <div className="md:w-56 bg-gradient-to-br from-js-yellow via-js-yellow to-yellow-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
                <div className="relative flex flex-col items-center justify-center p-10 md:p-8 text-center">
                  <div className="mb-2 text-xs font-bold uppercase tracking-widest text-js-black/70">
                    {eventDate.toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  <div className="text-6xl md:text-7xl font-black mb-2 text-js-black drop-shadow-sm">
                    {eventDate.getDate()}
                  </div>
                  <div className="text-xl md:text-2xl font-bold uppercase tracking-wider text-js-black/90 mb-1">
                    {eventDate.toLocaleDateString('en-US', { month: 'short' })}
                  </div>
                  <div className="text-base font-semibold text-js-black/70">
                    {eventDate.getFullYear()}
                  </div>
                  <div className="mt-4 px-4 py-1.5 bg-js-black/10 backdrop-blur-sm rounded-full">
                    <span className="text-xs font-bold text-js-black">{formattedTime}</span>
                  </div>
                </div>
              </div>

              {/* Event Details with modern styling */}
              <div className="flex-1 p-8 md:p-10">
                <div className="space-y-6">
                  <div>
                    <h3
                      data-testid="next-event-title"
                      className="text-3xl md:text-4xl font-black text-js-black dark:text-white mb-3 leading-tight"
                    >
                      {event.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <p
                        data-testid="next-event-date"
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 font-medium"
                      >
                        <svg
                          className="w-5 h-5 text-js-yellow"
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

                  <div
                    data-testid="next-event-location"
                    className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700"
                  >
                    <svg
                      className="w-6 h-6 mt-0.5 flex-shrink-0 text-js-yellow"
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
                      <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                        Location
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{event.location}</span>
                    </div>
                  </div>

                  <p
                    data-testid="next-event-description"
                    className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg"
                  >
                    {event.markdown.split('\n')[0] || 'Join us for an exciting JavaScript meetup!'}
                  </p>

                  {/* Speakers with avatars */}
                  {event.speakers && event.speakers.length > 0 && (
                    <div className="pt-2">
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                        Featured Speakers
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {event.speakers.map((speaker, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-800/50 rounded-full border border-gray-200 dark:border-gray-700 hover:border-js-yellow dark:hover:border-js-yellow transition-colors"
                          >
                            <div className="w-6 h-6 rounded-full bg-js-yellow flex items-center justify-center text-xs font-bold text-js-black">
                              {speaker.name.charAt(0)}
                            </div>
                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                              {speaker.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Modern Tags */}
                  {event.tags && event.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {event.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-4 py-1.5 bg-js-yellow/10 hover:bg-js-yellow/20 border border-js-yellow/30 text-js-black dark:text-js-yellow rounded-lg text-sm font-bold uppercase tracking-wide transition-colors"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Modern CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    {event.rsvpLink && (
                      <a
                        href={event.rsvpLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center justify-center"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-js-yellow to-yellow-400 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                        <Button variant="primary" className="relative w-full sm:w-auto flex items-center gap-2 text-base font-bold">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          RSVP Now
                        </Button>
                      </a>
                    )}
                    <Link href="/events" className="inline-block">
                      <Button variant="outline" className="w-full sm:w-auto text-base font-semibold hover:border-js-yellow hover:text-js-yellow transition-colors">
                        View All Events →
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
