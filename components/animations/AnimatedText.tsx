'use client'

import { useRef, useEffect, ReactNode } from 'react'
import { motion, useInView, useAnimation, Variants } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  type?: 'chars' | 'words' | 'lines'
  animation?: 'fade' | 'slide' | 'blur' | 'scale'
  stagger?: number
  delay?: number
  duration?: number
  once?: boolean
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'
}

const getAnimation = (animation: string): Variants => {
  const animations: Record<string, Variants> = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    slide: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
    },
    blur: {
      hidden: { opacity: 0, filter: 'blur(10px)' },
      visible: { opacity: 1, filter: 'blur(0px)' },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
  }

  return animations[animation] || animations.fade
}

export function AnimatedText({
  text,
  type = 'words',
  animation = 'slide',
  stagger = 0.03,
  delay = 0,
  duration = 0.5,
  once = true,
  className = '',
  as: Component = 'div',
}: AnimatedTextProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: 0.5 })
  const controls = useAnimation()
  const variants = getAnimation(animation)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      controls.set('visible')
      return
    }

    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  const splitText = (): string[] => {
    switch (type) {
      case 'chars':
        return text.split('')
      case 'words':
        return text.split(' ')
      case 'lines':
        return text.split('\n')
      default:
        return [text]
    }
  }

  const parts = splitText()

  const MotionComponent = motion[Component] as typeof motion.div

  return (
    <MotionComponent ref={ref} className={className} aria-label={text}>
      {parts.map((part, index) => (
        <motion.span
          key={index}
          initial="hidden"
          animate={controls}
          variants={variants}
          transition={{
            duration,
            delay: delay + index * stagger,
            ease: [0.25, 0.1, 0.25, 1] as const,
          }}
          className="inline-block"
          style={{ whiteSpace: type === 'chars' ? 'pre' : undefined }}
          aria-hidden="true"
        >
          {part}
          {type === 'words' && index < parts.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </MotionComponent>
  )
}
