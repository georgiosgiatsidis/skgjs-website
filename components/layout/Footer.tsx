'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Container } from './Container'
import { ROUTES, SITE_SHORT_NAME } from '@/lib/constants'
import { SOCIAL_PLATFORMS, type SocialPlatformKey } from '@/components/ui/SocialPlatforms'

interface FooterProps {
  social?: Partial<Record<SocialPlatformKey, string>>
  email?: string
}

const footerLinks = [
  { label: 'Home', href: ROUTES.home },
  { label: 'About Us', href: ROUTES.aboutUs },
  { label: 'Events', href: ROUTES.events },
  { label: 'Community', href: ROUTES.community },
  { label: 'Contact', href: ROUTES.contact },
]

export function Footer({ social = {}, email }: FooterProps) {
  return (
    <footer className="relative overflow-hidden border-t border-gray-200 bg-gradient-to-b from-gray-50 to-white dark:border-gray-800 dark:from-gray-900 dark:to-gray-950">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-js-yellow/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-js-yellow/5 blur-3xl" />
      </div>

      <Container>
        <div className="relative py-16">
          <div className="grid gap-12 md:grid-cols-3 md:gap-8">
            <div className="space-y-6">
              <Link href={ROUTES.home} className="group inline-flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <Image
                    src="/images/logo.svg"
                    alt={`${SITE_SHORT_NAME} Logo`}
                    width={48}
                    height={48}
                    className="h-12 w-12"
                  />
                </motion.div>
                <span className="text-2xl font-bold text-js-black dark:text-white">
                  {SITE_SHORT_NAME}
                </span>
              </Link>
              <p className="max-w-xs text-gray-600 dark:text-gray-400">
                The JavaScript community in Thessaloniki. Join us for meetups, talks, and networking
                with local developers.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Navigation
              </h3>
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-1">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center text-gray-600 transition-colors duration-300 hover:text-js-yellow dark:text-gray-400 dark:hover:text-js-yellow"
                    >
                      <span className="relative">
                        {link.label}
                        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-js-yellow transition-all duration-300 group-hover:w-full" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Connect with us
              </h3>
              <div className="flex gap-4">
                {SOCIAL_PLATFORMS.map(({ key, label, Icon }) => {
                  const url = social[key]
                  if (!url) return null
                  return (
                    // The wrapper stays unanimated so the tooltip does not inherit
                    // the icon's hover rotation and scale.
                    <div key={key} className="relative">
                      <motion.a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="peer flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all duration-300 hover:bg-js-yellow hover:text-js-black dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-js-yellow dark:hover:text-js-black"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={label}
                      >
                        <Icon className="h-5 w-5" />
                      </motion.a>
                      <span
                        role="tooltip"
                        aria-hidden="true"
                        className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-js-black px-2 py-1 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 peer-hover:opacity-100 peer-focus-visible:opacity-100 dark:bg-gray-700"
                      >
                        {label}
                      </span>
                    </div>
                  )
                })}
              </div>
              {email && (
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  <a href={`mailto:${email}`} className="transition-colors hover:text-js-yellow">
                    {email}
                  </a>
                </p>
              )}
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-8 dark:border-gray-800 md:flex-row">
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
              <p className="text-sm text-gray-500 dark:text-gray-500">
                {new Date().getFullYear()} Thessaloniki JavaScript Meetup. All rights reserved.
              </p>
              <Link
                href={ROUTES.privacy}
                className="text-sm text-gray-500 transition-colors hover:text-js-yellow dark:text-gray-500"
              >
                Privacy
              </Link>
            </div>
            <p className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-500">
              Made with
              <motion.span
                className="inline-block text-red-500"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
              >
                &hearts;
              </motion.span>
              in Thessaloniki
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
