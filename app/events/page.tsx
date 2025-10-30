import { Container } from '@/components/layout/Container'
import { EventsClient } from '@/components/events/EventsClient'
import { getUpcomingEvents, getPastEvents } from '@/lib/content'

export default function EventsPage() {
  const upcomingEvents = getUpcomingEvents()
  const pastEvents = getPastEvents()

  return (
    <Container className="py-12">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">Events</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Join us for talks, workshops, and networking
        </p>
      </div>

      <EventsClient upcomingEvents={upcomingEvents} pastEvents={pastEvents} />
    </Container>
  )
}
