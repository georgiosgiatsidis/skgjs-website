'use client'

import { Event } from '@/lib/types'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import Image from 'next/image'

interface EventCardProps {
  event: Event
  index?: number
}

export function EventCard({ event, index = 0 }: EventCardProps) {
  const eventDate = new Date(event.date)
  const day = eventDate.getDate()
  const month = eventDate.toLocaleDateString('en-US', { month: 'short' })
  const year = eventDate.getFullYear()
  const weekday = eventDate.toLocaleDateString('en-US', { weekday: 'long' })

  return (
    <Card hover tilt glowOnHover className="group flex h-full flex-col overflow-hidden">
      <div className="relative">
        {event.image && (
          <div className="relative -mx-6 -mt-6 mb-6 h-48 overflow-hidden">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent dark:from-gray-900" />
          </div>
        )}

        <div className="absolute -bottom-4 left-6 flex h-20 w-20 flex-col items-center justify-center rounded-2xl bg-js-yellow text-js-black shadow-lg">
          <span className="text-2xl font-black">{day}</span>
          <span className="text-xs font-semibold uppercase">{month}</span>
        </div>
      </div>

      <div className={`flex-1 ${event.image ? 'pt-6' : ''}`}>
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-gray-900 transition-colors group-hover:text-js-yellow dark:text-white dark:group-hover:text-js-yellow">
              {event.title}
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {weekday}, {year}
            </p>
          </div>
          <span
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
              event.status === 'upcoming'
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
            }`}
          >
            {event.status === 'upcoming' ? 'Upcoming' : 'Past'}
          </span>
        </div>

        <div className="mb-4 space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <svg className="h-4 w-4 shrink-0 text-js-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <svg className="h-4 w-4 shrink-0 text-js-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{event.location}</span>
          </div>
        </div>

        {event.speakers && event.speakers.length > 0 && (
          <div className="mb-4">
            <div className="mb-2 flex items-center gap-2">
              <svg className="h-4 w-4 text-js-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Speaker{event.speakers.length > 1 ? 's' : ''}
              </span>
            </div>
            <div className="flex -space-x-2">
              {event.speakers.slice(0, 4).map((speaker, i) => (
                <div
                  key={i}
                  className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"
                  title={speaker.name}
                >
                  {speaker.avatar ? (
                    <Image src={speaker.avatar} alt={speaker.name} fill className="object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-gray-500 dark:text-gray-400">
                      {speaker.name.charAt(0)}
                    </div>
                  )}
                </div>
              ))}
              {event.speakers.length > 4 && (
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-js-yellow text-xs font-semibold text-js-black dark:border-gray-900">
                  +{event.speakers.length - 4}
                </div>
              )}
            </div>
          </div>
        )}

        {event.tags && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {event.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 transition-colors hover:bg-js-yellow/20 hover:text-js-black dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-js-yellow/20 dark:hover:text-js-yellow"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {event.status === 'upcoming' && (
        <div className="mt-6 border-t border-gray-100 pt-6 dark:border-gray-800">
          <Link href={event.rsvpLink} target="_blank" rel="noopener noreferrer" className="block">
            <Button variant="primary" glowOnHover className="w-full">
              <span>RSVP Now</span>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Button>
          </Link>
        </div>
      )}
    </Card>
  )
}
