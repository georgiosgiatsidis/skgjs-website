'use client'

import { ReactNode, useRef, useState } from 'react'
import { clsx } from 'clsx'

interface MarqueeProps {
  children: ReactNode
  speed?: number
  direction?: 'left' | 'right'
  pauseOnHover?: boolean
  className?: string
}

export function Marquee({
  children,
  speed = 25,
  direction = 'left',
  pauseOnHover = true,
  className,
}: MarqueeProps) {
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const animationDirection = direction === 'left' ? 'normal' : 'reverse'

  return (
    <div
      ref={containerRef}
      className={clsx('group flex overflow-hidden', className)}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <div
        className="flex min-w-full shrink-0 items-center justify-around gap-8"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection,
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        {children}
      </div>
      <div
        className="flex min-w-full shrink-0 items-center justify-around gap-8"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection,
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
        aria-hidden="true"
      >
        {children}
      </div>
      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  )
}
