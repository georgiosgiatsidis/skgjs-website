'use client'

import { ButtonHTMLAttributes, ReactNode, useRef, useState } from 'react'
import { clsx } from 'clsx'

type ConflictingProps = 'onAnimationStart' | 'onDrag' | 'onDragEnd' | 'onDragStart'

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, ConflictingProps> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  ripple?: boolean
  glowOnHover?: boolean
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  ripple = true,
  glowOnHover = false,
  className,
  ...props
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ripple || !buttonRef.current) {
      props.onClick?.(e)
      return
    }

    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()

    setRipples((prev) => [...prev, { x, y, id }])
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id))
    }, 600)

    props.onClick?.(e)
  }

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className={clsx(
        'relative overflow-hidden rounded-lg font-semibold transition-all duration-300 ease-out-expo focus:outline-none focus:ring-2 focus:ring-offset-2',
        {
          'bg-js-yellow text-js-black hover:bg-yellow-400 focus:ring-js-yellow':
            variant === 'primary',
          'bg-gray-800 text-white hover:bg-gray-700 focus:ring-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600':
            variant === 'secondary',
          'border-2 border-js-black bg-transparent text-js-black hover:bg-js-yellow dark:border-js-yellow dark:text-js-yellow dark:hover:bg-js-yellow dark:hover:text-js-black':
            variant === 'outline',
          'bg-transparent text-gray-700 hover:bg-gray-100 hover:text-js-black dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white':
            variant === 'ghost',
          'px-4 py-2 text-sm': size === 'sm',
          'px-6 py-3 text-base': size === 'md',
          'px-8 py-4 text-lg': size === 'lg',
          'hover:shadow-lg hover:shadow-js-yellow/30': glowOnHover && variant === 'primary',
          'hover:shadow-lg hover:shadow-gray-900/30': glowOnHover && variant === 'secondary',
        },
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute animate-ping rounded-full bg-white/30"
          style={{
            left: r.x,
            top: r.y,
            width: 10,
            height: 10,
            transform: 'translate(-50%, -50%)',
            animation: 'ripple 0.6s linear forwards',
          }}
        />
      ))}
      <style jsx>{`
        @keyframes ripple {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.5;
          }
          100% {
            transform: translate(-50%, -50%) scale(20);
            opacity: 0;
          }
        }
      `}</style>
    </button>
  )
}
