import { getAllCommunityMembers } from '@/lib/content'
import { getStats } from '@/lib/stats'
import { Container } from '@/components/layout/Container'
import { MemberGrid } from '@/components/community/MemberGrid'
import { PhotoGallery } from '@/components/community/PhotoGallery'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { CountUp } from '@/components/animations/CountUp'

export const metadata = {
  title: 'Community | Thessaloniki JavaScript Meetup',
  description:
    'Meet the organizers, speakers, and members of the Thessaloniki JavaScript Meetup community.',
}

export default async function CommunityPage() {
  const allMembers = await getAllCommunityMembers()

  // Separate members by role
  const organizers = allMembers
    .filter((m) => m.role === 'organizer')
    .sort((a, b) => a.index - b.index)
  const speakers = allMembers.filter((m) => m.role === 'speaker').sort((a, b) => a.index - b.index)

  // Photo gallery data
  const photos = [
    {
      src: '/images/gallery/event-march-2024.svg',
      alt: 'Thessaloniki JS Meetup - March 2024 Event',
    },
    {
      src: '/images/gallery/react-workshop-april-2024.svg',
      alt: 'React Workshop - April 2024',
    },
    {
      src: '/images/gallery/vue-deepdive-may-2024.svg',
      alt: 'Vue.js Deep Dive - May 2024',
    },
    {
      src: '/images/gallery/nodejs-performance-june-2024.svg',
      alt: 'Node.js Performance - June 2024',
    },
    {
      src: '/images/gallery/typescript-masterclass-july-2024.svg',
      alt: 'TypeScript Masterclass - July 2024',
    },
    {
      src: '/images/gallery/community-gathering-august-2024.svg',
      alt: 'Community Gathering - August 2024',
    },
  ]

  const siteStats = getStats()

  const stats = [
    { value: siteStats.members, suffix: '+', label: 'Members' },
    { value: siteStats.organizers, suffix: '', label: 'Organizers' },
    { value: siteStats.speakers, suffix: '', label: 'Speakers' },
    { value: siteStats.meetups, suffix: '', label: 'Meetups' },
  ]

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
                Meet Our People
              </span>
            </ScrollReveal>

            <h1 className="mb-6 text-3xl font-black text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Our Community
            </h1>

            <ScrollReveal delay={0.3}>
              <p className="mb-12 text-lg text-gray-300 md:text-xl">
                Meet the passionate individuals who make the Thessaloniki JavaScript Meetup a
                vibrant and welcoming community for developers of all levels.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                >
                  <div className="mb-1 text-3xl font-black text-js-yellow md:text-4xl">
                    <CountUp end={stat.value} duration={2} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          {/* Organizers */}
          {organizers.length > 0 && <MemberGrid members={organizers} title="Organizers" />}

          {/* Speakers */}
          {speakers.length > 0 && <MemberGrid members={speakers} title="Past Speakers" />}

          {/* Photo Gallery */}
          {/* [TODO] Bring back when we have some photos */}
          {/* <PhotoGallery photos={photos} /> */}
        </Container>
      </section>
    </>
  )
}
