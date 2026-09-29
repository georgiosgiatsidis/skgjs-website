'use client'

import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode, useState } from 'react'
import Link from 'next/link'
import { clsx } from 'clsx'

type ConflictingProps = 'onAnimationStart' | 'onDrag' | 'onDragEnd' | 'onDragStart'

interface CommonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  ripple?: boolean
  glowOnHover?: boolean
}

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, ConflictingProps> & { href?: undefined }

// With href the button renders as a link: a <button> nested in an <a> is invalid HTML and
// leaves assistive technology unsure whether the control navigates or acts.
type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, ConflictingProps> & { href: string }

type ButtonProps = ButtonAsButton | ButtonAsLink

interface Ripple {
  x: number
  y: number
  id: number
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
  const [ripples, setRipples] = useState<Ripple[]>([])

  const addRipple = (e: React.MouseEvent<HTMLElement>) => {
    if (!ripple) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()

    setRipples((prev) => [...prev, { x, y, id }])
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id))
    }, 600)
  }

  const classes = clsx(
    'relative overflow-hidden rounded-lg font-semibold transition-all duration-300 ease-out-expo focus:outline-none focus:ring-2 focus:ring-offset-2',
    {
      // Matches the inline-block a <button> gets from the browser.
      'inline-block': props.href !== undefined,
      'bg-js-yellow text-js-black hover:bg-yellow-400 focus:ring-js-yellow': variant === 'primary',
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
  )

  const content = (
    <>
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      <RippleLayer ripples={ripples} />
    </>
  )

  if (props.href !== undefined) {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      addRipple(e)
      props.onClick?.(e)
    }

    // Internal routes keep client-side navigation and prefetching.
    if (props.href.startsWith('/')) {
      return (
        <Link onClick={handleClick} className={classes} {...props}>
          {content}
        </Link>
      )
    }

    return (
      <a onClick={handleClick} className={classes} {...props}>
        {content}
      </a>
    )
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    addRipple(e)
    props.onClick?.(e)
  }

  return (
    <button onClick={handleClick} className={classes} {...props}>
      {content}
    </button>
  )
}

function RippleLayer({ ripples }: { ripples: Ripple[] }) {
  return (
    <>
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
    </>
  )
}
