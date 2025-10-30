import { CommunityMember } from '@/lib/types'
import { MemberCard } from './MemberCard'

interface MemberGridProps {
  members: CommunityMember[]
  title?: string
}

export function MemberGrid({ members, title }: MemberGridProps) {
  if (members.length === 0) {
    return null
  }

  return (
    <div className="mb-16">
      {title && (
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <MemberCard key={member.slug} member={member} />
        ))}
      </div>
    </div>
  )
}
