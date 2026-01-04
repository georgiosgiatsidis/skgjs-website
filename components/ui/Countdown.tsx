'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface CountdownProps {
  targetDate: Date
  onComplete?: () => void
  className?: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calculateTimeLeft(targetDate: Date): TimeLeft {
  const difference = targetDate.getTime() - new Date().getTime()

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  }
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <motion.div
          key={value}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex h-16 w-16 items-center justify-center rounded-xl bg-js-black text-3xl font-bold text-js-yellow shadow-lg dark:bg-gray-800 sm:h-20 sm:w-20 sm:text-4xl"
        >
          {value.toString().padStart(2, '0')}
        </motion.div>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 to-transparent" />
      </div>
      <span className="mt-2 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 sm:text-sm">
        {label}
      </span>
    </div>
  )
}

export function Countdown({ targetDate, onComplete, className = '' }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(targetDate))
  const [hasCompleted, setHasCompleted] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(targetDate)
      setTimeLeft(newTimeLeft)

      if (
        !hasCompleted &&
        newTimeLeft.days === 0 &&
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        setHasCompleted(true)
        onComplete?.()
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate, onComplete, hasCompleted])

  if (hasCompleted) {
    return (
      <div className={`text-center ${className}`}>
        <motion.p
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-2xl font-bold text-js-yellow"
        >
          Event is live!
        </motion.p>
      </div>
    )
  }

  return (
    <div className={`flex justify-center gap-3 sm:gap-4 ${className}`}>
      <TimeUnit value={timeLeft.days} label="Days" />
      <div className="flex items-center text-2xl font-bold text-gray-400">:</div>
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <div className="flex items-center text-2xl font-bold text-gray-400">:</div>
      <TimeUnit value={timeLeft.minutes} label="Min" />
      <div className="flex items-center text-2xl font-bold text-gray-400">:</div>
      <TimeUnit value={timeLeft.seconds} label="Sec" />
    </div>
  )
}
