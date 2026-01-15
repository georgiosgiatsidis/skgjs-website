'use client'

import { useState, useMemo, useCallback, useEffect } from 'react'
import { EventFilter } from './EventFilter'
import { EventList } from './EventList'
import type { Event } from '@/lib/types'
import { isUpcomingEvent } from '@/lib/event-utils'

interface EventsClientProps {
  events: Event[]
  speakerFormUrl?: string
}

const defaultFilter = 'upcoming'

function getFilterFromURL() {
  if (typeof window === 'undefined') return defaultFilter
  const params = new URLSearchParams(window.location.search)
  const filter = params.get('filter')
  return filter === 'past' ? 'past' : defaultFilter
}

export function EventsClient({ events, speakerFormUrl }: EventsClientProps) {
  const [activeFilter, setActiveFilter] = useState<'upcoming' | 'past'>(defaultFilter)

  const setFilter = useCallback((filter: 'upcoming' | 'past') => {
    setActiveFilter(filter)
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      params.set('filter', filter)
      const newUrl = `${window.location.pathname}?${params.toString()}`
      window.history.replaceState({}, '', newUrl)
    }
  }, [])

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

  useEffect(() => {
    const filter = getFilterFromURL()
    setFilter(filter)
  }, [])

  return (
    <>
      <EventFilter activeFilter={activeFilter} onFilterChange={setFilter} />
      <EventList
        events={displayedEvents}
        emptyMessage={emptyMessage}
        filterType={activeFilter}
        speakerFormUrl={speakerFormUrl}
      />
    </>
  )
}
