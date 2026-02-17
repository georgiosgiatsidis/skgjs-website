'use client'

import { motion } from 'framer-motion'

interface BecomeASpeakerSectionProps {
  speakerFormUrl?: string
}

export function BecomeASpeakerSection({ speakerFormUrl }: BecomeASpeakerSectionProps) {
  if (!speakerFormUrl) return null

  return (
    <section className="relative overflow-hidden py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-js-yellow/5 via-transparent to-js-yellow/5 dark:from-js-yellow/10 dark:via-transparent dark:to-js-yellow/10" />
        <motion.div
          className="absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-js-yellow/15 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -right-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-js-yellow/15 blur-3xl"
          animate={{ scale: [1.15, 1, 1.15], opacity: [0.25, 0.15, 0.25] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-js-yellow">
            Share Your Knowledge
          </span>
          <h2 className="mb-4 text-3xl font-black text-gray-900 dark:text-white md:text-4xl">
            Want to speak at our next meetup?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-lg text-gray-600 dark:text-gray-400">
            Share your experience with the Thessaloniki JS community. We&apos;re always looking for
            passionate developers to present their ideas.
          </p>

          <a
            href={speakerFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center"
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-js-yellow to-yellow-400 opacity-75 blur transition-opacity group-hover:opacity-100" />
            <span className="relative inline-flex items-center gap-3 rounded-xl bg-js-yellow px-8 py-4 text-lg font-bold text-js-black shadow-lg transition-all hover:gap-4 hover:shadow-xl hover:shadow-js-yellow/25">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
              Become a Speaker
              <svg
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
