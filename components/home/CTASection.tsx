'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { MagneticButton } from '@/components/animations/MagneticButton'
import { ScrollReveal } from '@/components/animations/ScrollReveal'

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-js-black py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-js-yellow/10 via-transparent to-js-yellow/5" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <motion.div
          className="absolute -left-40 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-js-yellow/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -right-40 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-js-yellow/20 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <ScrollReveal>
          <div className="mx-auto max-w-4xl text-center">
            <motion.span
              className="mb-6 inline-block text-sm font-semibold uppercase tracking-widest text-js-yellow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Join Us
            </motion.span>

            <motion.h2
              className="mb-6 text-4xl font-black text-white md:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Ready to be part of the{' '}
              <span className="bg-gradient-to-r from-js-yellow to-yellow-400 bg-clip-text text-transparent">
                JavaScript
              </span>{' '}
              community?
            </motion.h2>

            <motion.p
              className="mx-auto mb-10 max-w-2xl text-lg text-gray-400 md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Connect with fellow developers, learn from industry experts, and grow your skills at
              our monthly meetups in Thessaloniki.
            </motion.p>

            <motion.div
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <MagneticButton strength={0.2}>
                <a
                  href="https://www.meetup.com/thessaloniki-javascript-meetup/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="primary" size="lg" glowOnHover className="px-10">
                    Join on Meetup
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </Button>
                </a>
              </MagneticButton>
              <MagneticButton strength={0.2}>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/30 text-white hover:border-js-yellow hover:bg-js-yellow/10 hover:text-js-yellow"
                  >
                    Get in Touch
                  </Button>
                </Link>
              </MagneticButton>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
