import { Event } from '@/lib/types'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  const eventDate = new Date(event.date)
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Card hover className="flex h-full flex-col">
      <div className="mb-4 flex-1">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{event.title}</h3>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              event.status === 'upcoming'
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            {event.status === 'upcoming' ? 'Upcoming' : 'Past'}
          </span>
        </div>

        <div className="mb-3 space-y-1 text-sm text-gray-600 dark:text-gray-400">
          <p>
            <strong>📅 Date:</strong> {formattedDate}
          </p>
          <p>
            <strong>🕒 Time:</strong> {event.time}
          </p>
          <p>
            <strong>📍 Location:</strong> {event.location}
          </p>
        </div>

        {event.speakers && event.speakers.length > 0 && (
          <div className="mb-3">
            <p className="mb-1 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Speaker{event.speakers.length > 1 ? 's' : ''}:
            </p>
            <ul className="space-y-1">
              {event.speakers.map((speaker, index) => (
                <li key={index} className="text-sm text-gray-600 dark:text-gray-400">
                  {speaker.name}
                  {speaker.bio && <span className="text-xs"> - {speaker.bio}</span>}
                </li>
              ))}
            </ul>
          </div>
        )}

        {event.tags && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {event.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-js-yellow/20 px-2 py-1 text-xs font-medium text-js-black dark:bg-js-yellow/10 dark:text-js-yellow"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {event.status === 'upcoming' && (
        <div className="mt-4">
          <Link href={event.rsvpLink} target="_blank" rel="noopener noreferrer" className="block">
            <Button variant="primary" className="w-full">
              RSVP on Meetup
            </Button>
          </Link>
        </div>
      )}
    </Card>
  )
}
