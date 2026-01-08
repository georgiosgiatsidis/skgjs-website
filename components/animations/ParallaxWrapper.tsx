'use client'

import { useRef, ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ParallaxWrapperProps {
  children: ReactNode
  speed?: number
  direction?: 'y' | 'x'
  className?: string
}

export function ParallaxWrapper({
  children,
  speed = 0.5,
  direction = 'y',
  className = '',
}: ParallaxWrapperProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const range = 100 * speed
  const transform = useTransform(scrollYProgress, [0, 1], [-range, range])

  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      style={{
        [direction === 'y' ? 'y' : 'x']: transform,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
