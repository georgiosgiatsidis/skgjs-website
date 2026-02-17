'use client'

import { Event } from '@/lib/types'
import { EventCard } from './EventCard'
import { EventCardWide } from './EventCardWide'
import { motion, AnimatePresence } from 'framer-motion'

interface EventListProps {
  events: Event[]
  emptyMessage?: string
  filterType?: 'upcoming' | 'past'
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

export function EventList({ events, emptyMessage = 'No events found.', filterType = 'upcoming' }: EventListProps) {
  const isUpcoming = filterType === 'upcoming'
  const eventCount = events.length

  // Empty state - enhanced for upcoming, simple for past
  if (eventCount === 0) {
    if (isUpcoming) {
      return (
        <motion.div
          className="py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mx-auto max-w-2xl overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg dark:from-gray-800 dark:to-gray-900">
            {/* Illustration area */}
            <div className="relative flex h-64 items-center justify-center bg-gradient-to-br from-js-yellow/10 via-js-yellow/5 to-transparent">
              {/* Decorative elements */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-js-yellow/20 blur-3xl" />
                <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-js-yellow/10 blur-3xl" />
              </div>

              {/* Central illustration */}
              <motion.div
                className="relative z-10 flex flex-col items-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                {/* Community illustration - stylized people icons */}
                <div className="mb-4 flex -space-x-4">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-js-yellow to-yellow-400 text-2xl font-bold text-js-black shadow-lg dark:border-gray-800"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </motion.div>
                  ))}
                </div>
                <div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm backdrop-blur dark:bg-gray-900/80">
                  <svg className="h-5 w-5 text-js-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Stay tuned!</span>
                </div>
              </motion.div>
            </div>

            {/* Content area */}
            <div className="p-8 text-center">
              <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                No Upcoming Events Yet
              </h3>
              <p className="mb-4 text-gray-600 dark:text-gray-400">
                Stay tuned for upcoming events from the Thessaloniki JS community.
              </p>
            </div>
          </div>
        </motion.div>
      )
    }

    // Simple empty state for past events
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

  // Single upcoming event - wide card layout, centered
  if (isUpcoming && eventCount === 1) {
    return (
      <motion.div
        className="mx-auto max-w-4xl pb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} initial="hidden" animate="visible">
          <EventCardWide event={events[0]} />
        </motion.div>
      </motion.div>
    )
  }

  // Two upcoming events - centered 2-column layout
  if (isUpcoming && eventCount === 2) {
    return (
      <motion.div
        className="mx-auto grid max-w-4xl gap-8 pb-12 sm:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="popLayout">
          {events.map((event, index) => (
            <motion.div
              key={event.slug}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
            >
              <EventCard event={event} index={index} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    )
  }

  // 3+ upcoming events OR any past events - standard 3-column grid
  return (
    <motion.div
      className="grid gap-8 pb-12 sm:grid-cols-2 lg:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence mode="popLayout">
        {events.map((event, index) => (
          <motion.div
            key={event.slug}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
          >
            <EventCard event={event} index={index} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
