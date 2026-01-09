'use client'

import { useState, useMemo } from 'react'
import { EventFilter } from './EventFilter'
import { EventList } from './EventList'
import type { Event } from '@/lib/types'
import { isUpcomingEvent } from '@/lib/event-utils'

interface EventsClientProps {
  events: Event[]
  speakerFormUrl?: string
}

export function EventsClient({ events, speakerFormUrl }: EventsClientProps) {
  const [activeFilter, setActiveFilter] = useState<'upcoming' | 'past'>('upcoming')

  // Filter and sort events client-side based on current date
  const { upcomingEvents, pastEvents } = useMemo(() => {
    const upcoming = events
      .filter((event) => isUpcomingEvent(event.date))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    const past = events
      .filter((event) => !isUpcomingEvent(event.date))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return { upcomingEvents: upcoming, pastEvents: past }
  }, [events])

  const displayedEvents = activeFilter === 'upcoming' ? upcomingEvents : pastEvents
  const emptyMessage =
    activeFilter === 'upcoming'
      ? 'No upcoming events scheduled. Check back soon!'
      : 'Event history coming soon.'

  return (
    <>
      <EventFilter activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <EventList events={displayedEvents} emptyMessage={emptyMessage} filterType={activeFilter} speakerFormUrl={speakerFormUrl} />
    </>
  )
}
