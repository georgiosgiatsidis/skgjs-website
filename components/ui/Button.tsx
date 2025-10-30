import { ButtonHTMLAttributes, ReactNode } from 'react'
import { clsx } from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2',
        {
          'bg-js-yellow text-js-black hover:bg-yellow-400 focus:ring-js-yellow':
            variant === 'primary',
          'bg-gray-800 text-white hover:bg-gray-700 focus:ring-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600':
            variant === 'secondary',
          'border-2 border-js-black bg-transparent text-js-black hover:bg-js-yellow dark:border-js-yellow dark:text-js-yellow dark:hover:bg-js-yellow dark:hover:text-js-black':
            variant === 'outline',
          'px-4 py-2 text-sm': size === 'sm',
          'px-6 py-3 text-base': size === 'md',
          'px-8 py-4 text-lg': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
