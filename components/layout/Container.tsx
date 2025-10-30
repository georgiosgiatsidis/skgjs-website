import { ReactNode } from 'react'
import { clsx } from 'clsx'

interface ContainerProps {
  children: ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'full'
}

export function Container({ children, className, size = 'lg' }: ContainerProps) {
  return (
    <div
      className={clsx(
        'mx-auto px-4 sm:px-6 lg:px-8',
        {
          'max-w-3xl': size === 'sm',
          'max-w-5xl': size === 'md',
          'max-w-7xl': size === 'lg',
          'max-w-full': size === 'full',
        },
        className
      )}
    >
      {children}
    </div>
  )
}
