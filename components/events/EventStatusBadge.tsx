'use client'

import { isUpcomingEvent } from '@/lib/event-utils'

interface EventStatusBadgeProps {
  eventDate: string
  variant?: 'header' | 'card'
}

export function EventStatusBadge({ eventDate, variant = 'header' }: EventStatusBadgeProps) {
  const isUpcoming = isUpcomingEvent(eventDate)

  if (variant === 'header') {
    return (
      <span
        className={`mb-4 inline-block rounded-full px-4 py-2 text-sm font-semibold ${
          isUpcoming ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
        }`}
      >
        {isUpcoming ? 'Upcoming Event' : 'Past Event'}
      </span>
    )
  }

  return (
    <span
      className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
        isUpcoming
          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
          : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
      }`}
    >
      {isUpcoming ? 'Upcoming' : 'Past'}
    </span>
  )
}
