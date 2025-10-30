'use client'

import { useState } from 'react'
import { EventFilter } from './EventFilter'
import { EventList } from './EventList'
import type { Event } from '@/lib/types'

interface EventsClientProps {
  upcomingEvents: Event[]
  pastEvents: Event[]
}

export function EventsClient({ upcomingEvents, pastEvents }: EventsClientProps) {
  const [activeFilter, setActiveFilter] = useState<'upcoming' | 'past'>('upcoming')

  const displayedEvents = activeFilter === 'upcoming' ? upcomingEvents : pastEvents
  const emptyMessage =
    activeFilter === 'upcoming'
      ? 'No upcoming events scheduled. Check back soon!'
      : 'Event history coming soon.'

  return (
    <>
      <EventFilter activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <EventList events={displayedEvents} emptyMessage={emptyMessage} />
    </>
  )
}
