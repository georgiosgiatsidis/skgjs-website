'use client'

import { motion } from 'framer-motion'
import { clsx } from 'clsx'

interface EventFilterProps {
  activeFilter: 'upcoming' | 'past'
  onFilterChange: (filter: 'upcoming' | 'past') => void
}

export function EventFilter({ activeFilter, onFilterChange }: EventFilterProps) {
  return (
    <motion.div
      className="mb-12 flex justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="relative inline-flex rounded-2xl bg-white p-1.5 shadow-lg dark:bg-gray-800">
        <motion.div
          className="absolute inset-y-1.5 rounded-xl bg-js-yellow"
          initial={false}
          animate={{
            x: activeFilter === 'upcoming' ? 0 : '100%',
            width: activeFilter === 'upcoming' ? '50%' : '50%',
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
        <button
          onClick={() => onFilterChange('upcoming')}
          className={clsx(
            'relative z-10 rounded-xl px-8 py-3 text-sm font-semibold transition-colors duration-200',
            activeFilter === 'upcoming' ? 'text-js-black' : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
          )}
        >
          <span className="flex items-center gap-2">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Upcoming
          </span>
        </button>
        <button
          onClick={() => onFilterChange('past')}
          className={clsx(
            'relative z-10 rounded-xl px-8 py-3 text-sm font-semibold transition-colors duration-200',
            activeFilter === 'past' ? 'text-js-black' : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
          )}
        >
          <span className="flex items-center gap-2">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Past
          </span>
        </button>
      </div>
    </motion.div>
  )
}
