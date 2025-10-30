'use client'

import { useState } from 'react'
import { clsx } from 'clsx'

interface EventFilterProps {
  activeFilter: 'upcoming' | 'past'
  onFilterChange: (filter: 'upcoming' | 'past') => void
}

export function EventFilter({ activeFilter, onFilterChange }: EventFilterProps) {
  return (
    <div className="mb-8 flex justify-center">
      <div className="inline-flex rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
        <button
          onClick={() => onFilterChange('upcoming')}
          className={clsx(
            'rounded-md px-6 py-2 text-sm font-medium transition-all',
            activeFilter === 'upcoming'
              ? 'bg-js-yellow text-js-black shadow-sm'
              : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
          )}
        >
          Upcoming
        </button>
        <button
          onClick={() => onFilterChange('past')}
          className={clsx(
            'rounded-md px-6 py-2 text-sm font-medium transition-all',
            activeFilter === 'past'
              ? 'bg-js-yellow text-js-black shadow-sm'
              : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
          )}
        >
          Past
        </button>
      </div>
    </div>
  )
}
