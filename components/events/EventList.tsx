import { Event } from '@/lib/types'
import { EventCard } from './EventCard'

interface EventListProps {
  events: Event[]
  emptyMessage?: string
}

export function EventList({ events, emptyMessage = 'No events found.' }: EventListProps) {
  if (events.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-gray-600 dark:text-gray-400">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event.slug} event={event} />
      ))}
    </div>
  )
}
