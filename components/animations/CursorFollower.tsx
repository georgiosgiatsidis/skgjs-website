'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export function CursorFollower() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const isMobile = useRef(false)

  const springConfig = { damping: 25, stiffness: 400 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    isMobile.current = window.matchMedia('(max-width: 768px)').matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0

    if (isMobile.current) {
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer')

      setIsHovering(!!isInteractive)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleElementHover)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleElementHover)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [cursorX, cursorY, isVisible])

  if (typeof window !== 'undefined' && (window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window)) {
    return null
  }

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      >
        <motion.div
          className="relative -left-4 -top-4 rounded-full bg-white"
          animate={{
            width: isHovering ? 60 : isClicking ? 24 : 32,
            height: isHovering ? 60 : isClicking ? 24 : 32,
            marginLeft: isHovering ? -14 : isClicking ? 4 : 0,
            marginTop: isHovering ? -14 : isClicking ? 4 : 0,
          }}
          transition={{
            type: 'spring',
            damping: 20,
            stiffness: 300,
          }}
        />
      </motion.div>
      <style jsx global>{`
        @media (min-width: 769px) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  )
}
