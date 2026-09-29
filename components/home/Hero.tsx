'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { CountUp } from '@/components/animations/CountUp'
import { DeferredLiquidEther } from '@/components/ui/LiquidEther/DeferredLiquidEther'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import type { SiteStats } from '@/lib/stats'

interface HeroProps {
  stats: SiteStats
}

function buildStats(s: SiteStats) {
  return [
    { value: s.meetups, suffix: '', label: 'Meetups' },
    { value: s.members, suffix: '+', label: 'Members' },
    { value: s.speakers, suffix: '', label: 'Speakers' },
    { value: s.founded, suffix: '', label: 'Founded' },
  ]
}

export function Hero({ stats: siteStats }: HeroProps) {
  const stats = buildStats(siteStats)
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0 z-10 opacity-30">
        <ErrorBoundary label="Hero background animation" fallback={null}>
          <DeferredLiquidEther
            colors={['#F7DD3E', '#FFD700', '#FFA500']}
            mouseForce={30}
            cursorSize={100}
            isViscous={false}
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={false}
            autoDemo={true}
            autoSpeed={0.5}
            autoIntensity={2.2}
            takeoverDuration={0.25}
            autoResumeDelay={500}
            autoRampDuration={0.6}
            style={{ width: '100%', height: '100%' }}
          />
        </ErrorBoundary>
      </div>

      <div className="pointer-events-none absolute inset-0 z-[0]">
        <Image
          // src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop"
          src="/images/hero-cover.webp"
          alt="JavaScript developers collaborating"
          fill
          className="object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-js-black/90 via-js-black/85 to-js-black/80" />
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      </div>

      <div className="container relative z-20 mx-auto px-4 py-20">
        <div className="mx-auto mb-6 max-w-5xl text-center">
          <div className="mb-8 flex justify-center">
            <motion.div
              className="relative"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Image
                src="/images/logo.svg"
                alt="Thessaloniki JavaScript Meetup Logo"
                width={140}
                height={140}
                className="h-28 w-28 drop-shadow-2xl md:h-36 md:w-36"
                loading="eager"
              />
              <motion.div
                className="absolute inset-0 rounded-full bg-js-yellow/30 blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>
          </div>

          <h1 className="mb-2 text-5xl font-black tracking-tight text-white md:text-7xl lg:text-8xl">
            Thessaloniki
          </h1>

          <span className="mb-8 block text-4xl font-black text-js-yellow md:text-6xl lg:text-7xl">
            JavaScript Meetup
          </span>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-300 md:text-xl lg:text-2xl">
            Join the vibrant JavaScript community in Thessaloniki. Learn, share, and connect with
            fellow developers.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              href="/events"
              variant="primary"
              size="lg"
              glowOnHover
              className="w-full px-10 sm:w-auto"
            >
              Explore Events
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Button>
            <Button
              href="/community"
              variant="outline"
              size="lg"
              className="w-full border-white/30 text-white hover:border-js-yellow hover:bg-js-yellow/10 hover:text-js-yellow sm:w-auto"
            >
              Meet the Community
            </Button>
          </div>

          <div className="mt-20 grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="group relative">
                <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-js-yellow/30 hover:bg-white/10">
                  <div className="mb-2 text-4xl font-black text-js-yellow md:text-5xl">
                    <CountUp end={stat.value} duration={2} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm font-medium text-gray-400 md:text-base">{stat.label}</div>
                  <motion.div
                    className="absolute bottom-0 left-1/2 h-1 -translate-x-1/2 rounded-full bg-js-yellow"
                    initial={{ width: 0 }}
                    whileInView={{ width: '50%' }}
                    transition={{ delay: 1.5 + index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        data-testid="scroll-to-explore-container"
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-xs font-medium uppercase tracking-widest text-gray-400">
            Scroll to explore
          </span>
          <svg
            className="h-6 w-6 text-js-yellow"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </div>
    </section>
  )
}
