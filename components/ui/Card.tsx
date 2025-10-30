import { ReactNode } from 'react'
import { clsx } from 'clsx'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-lg bg-white p-6 shadow-md dark:bg-gray-800',
        {
          'transition-transform hover:scale-105 hover:shadow-lg': hover,
        },
        className
      )}
    >
      {children}
    </div>
  )
}
