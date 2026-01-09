'use client'

import { Button } from '@/components/ui/Button'
import { isUpcomingEvent } from '@/lib/event-utils'

interface EventRsvpButtonProps {
  eventDate: string
  rsvpLink: string
  variant?: 'primary' | 'sidebar'
}

export function EventRsvpButton({ eventDate, rsvpLink, variant = 'primary' }: EventRsvpButtonProps) {
  const isUpcoming = isUpcomingEvent(eventDate)

  if (!isUpcoming) {
    return null
  }

  if (variant === 'sidebar') {
    return (
      <a href={rsvpLink} target="_blank" rel="noopener noreferrer" className="mt-6 block">
        <Button variant="secondary" className="w-full bg-js-black text-white hover:bg-js-black/90">
          RSVP on Meetup
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </Button>
      </a>
    )
  }

  return (
    <a href={rsvpLink} target="_blank" rel="noopener noreferrer">
      <Button variant="primary" size="lg" className="whitespace-nowrap">
        RSVP Now
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </Button>
    </a>
  )
}
