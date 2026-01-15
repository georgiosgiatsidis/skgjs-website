'use client'

import { CommunityMember } from '@/lib/types'
import { MemberCard } from './MemberCard'
import { motion } from 'framer-motion'

interface MemberGridProps {
  members: CommunityMember[]
  title?: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
}

export function MemberGrid({ members, title }: MemberGridProps) {
  if (members.length === 0) {
    return null
  }

  return (
    <div className="mb-20">
      {title && (
        <div className="mb-10 flex items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
            {title}
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent dark:from-gray-800" />
        </div>
      )}
      <motion.div
        className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {members.map((member) => (
          <motion.div key={member.slug} variants={itemVariants}>
            <MemberCard member={member} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
