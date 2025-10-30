import { InputHTMLAttributes } from 'react'
import { clsx } from 'clsx'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={clsx(
          'w-full rounded-lg border border-gray-300 px-4 py-2 transition-colors',
          'focus:border-js-yellow focus:outline-none focus:ring-2 focus:ring-js-yellow focus:ring-opacity-50',
          'dark:border-gray-600 dark:bg-gray-700 dark:text-white',
          {
            'border-red-500 focus:border-red-500 focus:ring-red-500': error,
          },
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}
