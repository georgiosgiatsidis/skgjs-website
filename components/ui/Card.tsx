'use client'

import { ReactNode, useRef, useState } from 'react'
import { clsx } from 'clsx'
import { motion } from 'framer-motion'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  tilt?: boolean
  glowOnHover?: boolean
  as?: 'div' | 'article' | 'section'
}

export function Card({
  children,
  className,
  hover = false,
  tilt = false,
  glowOnHover = false,
  as: Component = 'div',
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || !cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    const rotateXValue = (mouseY / (rect.height / 2)) * -8
    const rotateYValue = (mouseX / (rect.width / 2)) * 8

    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  const MotionComponent = motion[Component]

  if (tilt) {
    return (
      <MotionComponent
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX,
          rotateY,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
        style={{
          transformStyle: 'preserve-3d',
          perspective: 1000,
        }}
        className={clsx(
          'rounded-xl bg-white p-6 shadow-md transition-shadow duration-300 dark:bg-gray-800',
          {
            'hover:shadow-xl': hover,
            'hover:shadow-lg hover:shadow-js-yellow/20': glowOnHover,
          },
          className
        )}
      >
        <div style={{ transform: 'translateZ(20px)' }}>{children}</div>
      </MotionComponent>
    )
  }

  return (
    <MotionComponent
      className={clsx(
        'rounded-xl bg-white p-6 shadow-md transition-all duration-300 dark:bg-gray-800',
        {
          'hover:shadow-xl': hover,
          'hover:shadow-lg hover:shadow-js-yellow/20': glowOnHover,
        },
        className
      )}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {children}
    </MotionComponent>
  )
}
