import { getAllCommunityMembers } from '@/lib/content'
import { Container } from '@/components/layout/Container'
import { MemberGrid } from '@/components/community/MemberGrid'
import { PhotoGallery } from '@/components/community/PhotoGallery'

export const metadata = {
  title: 'Community | Thessaloniki JavaScript Meetup',
  description:
    'Meet the organizers, speakers, and members of the Thessaloniki JavaScript Meetup community.',
}

export default async function CommunityPage() {
  const allMembers = await getAllCommunityMembers()

  // Separate members by role
  const organizers = allMembers.filter((m) => m.role === 'organizer')
  const speakers = allMembers.filter((m) => m.role === 'speaker')

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

  return (
    <Container>
      <div className="py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Our Community
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Meet the passionate individuals who make the Thessaloniki JavaScript
            Meetup a vibrant and welcoming community for developers of all
            levels.
          </p>
        </div>

        {/* Organizers */}
        {organizers.length > 0 && (
          <MemberGrid members={organizers} title="Organizers" />
        )}

        {/* Speakers */}
        {speakers.length > 0 && (
          <MemberGrid members={speakers} title="Past Speakers" />
        )}

        {/* Photo Gallery */}
        <PhotoGallery photos={photos} />
      </div>
    </Container>
  )
}
