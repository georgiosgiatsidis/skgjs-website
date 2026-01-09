// Event utility functions for client-side status calculation
// Uses Europe/Athens timezone for consistent behavior (Thessaloniki meetup)

const TIMEZONE = 'Europe/Athens'

/**
 * Checks if an event is upcoming based on its date.
 * An event is considered "upcoming" if the event date is today or in the future.
 * It becomes "past" starting the day after the event.
 */
export function isUpcomingEvent(eventDate: string): boolean {
  // Get current date in Athens timezone (normalized to start of day)
  const now = new Date()
  const athensFormatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  const todayInAthens = athensFormatter.format(now) // Format: YYYY-MM-DD

  // Compare dates as strings (both in YYYY-MM-DD format)
  return eventDate >= todayInAthens
}

/**
 * Returns the event status based on the event date
 */
export function getEventStatus(eventDate: string): 'upcoming' | 'past' {
  return isUpcomingEvent(eventDate) ? 'upcoming' : 'past'
}
