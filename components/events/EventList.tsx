'use client'

import { Event } from '@/lib/types'
import { EventCard } from './EventCard'
import { motion, AnimatePresence } from 'framer-motion'

interface EventListProps {
  events: Event[]
  emptyMessage?: string
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
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
    },
  },
}

export function EventList({ events, emptyMessage = 'No events found.' }: EventListProps) {
  if (events.length === 0) {
    return (
      <motion.div
        className="py-20 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <svg className="h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </motion.div>
        <p className="text-lg text-gray-600 dark:text-gray-400">{emptyMessage}</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="grid gap-8 pb-12 sm:grid-cols-2 lg:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence mode="popLayout">
        {events.map((event, index) => (
          <motion.div key={event.slug} variants={itemVariants} layout>
            <EventCard event={event} index={index} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
