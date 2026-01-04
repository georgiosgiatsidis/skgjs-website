import { Container } from '@/components/layout/Container'
import { EventsClient } from '@/components/events/EventsClient'
import { getUpcomingEvents, getPastEvents } from '@/lib/content'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { AnimatedText } from '@/components/animations/AnimatedText'

export default function EventsPage() {
  const upcomingEvents = getUpcomingEvents()
  const pastEvents = getPastEvents()

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-js-black to-gray-900 py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-js-yellow/10 blur-3xl" />
          <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-js-yellow/5 blur-3xl" />
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        </div>

        <Container className="relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <ScrollReveal>
              <span className="mb-4 inline-block rounded-full bg-js-yellow/10 px-4 py-2 text-sm font-medium text-js-yellow">
                Join Our Meetups
              </span>
            </ScrollReveal>

            <AnimatedText
              text="Events"
              type="chars"
              animation="slide"
              stagger={0.05}
              className="mb-6 text-5xl font-black text-white md:text-6xl lg:text-7xl"
              as="h1"
            />

            <ScrollReveal delay={0.3}>
              <p className="text-lg text-gray-300 md:text-xl">
                Join us for talks, workshops, and networking with fellow JavaScript developers in
                Thessaloniki.
              </p>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <section className="relative -mt-8 md:-mt-12">
        <Container>
          <EventsClient upcomingEvents={upcomingEvents} pastEvents={pastEvents} />
        </Container>
      </section>
    </>
  )
}
