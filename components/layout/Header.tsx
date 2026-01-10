'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from './Container'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { ScrollProgress } from '@/components/animations/ScrollProgress'
import { ROUTES, SITE_SHORT_NAME } from '@/lib/constants'

const menuVariants = {
  closed: {
    opacity: 0,
    transition: {
      duration: 0.3,
      when: 'afterChildren',
    },
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.3,
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  closed: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.2 },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

const menuItems = [
  {
    label: 'Home',
    href: ROUTES.home,
    showInDesktop: false,
    showInMobile: true,
  },
  {
    label: 'About Us',
    href: ROUTES.aboutUs,
    showInDesktop: true,
    showInMobile: true,
  },
  {
    label: 'Events',
    href: ROUTES.events,
    showInDesktop: true,
    showInMobile: true,
  },
  {
    label: 'Community',
    href: ROUTES.community,
    showInDesktop: true,
    showInMobile: true,
  },
  {
    label: 'Contact',
    href: ROUTES.contact,
    showInDesktop: true,
    showInMobile: true,
  },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const closeMenu = () => setIsMenuOpen(false)

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      <ScrollProgress />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-js-yellow focus:px-4 focus:py-2 focus:text-js-black focus:outline-none focus:ring-2 focus:ring-js-yellow focus:ring-offset-2"
      >
        Skip to main content
      </a>
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ease-out-expo ${
          scrolled
            ? 'border-b border-gray-200/50 bg-white/90 shadow-lg shadow-black/5 dark:border-gray-700/50 dark:bg-gray-900/90'
            : 'border-b border-transparent bg-white/70 dark:bg-gray-900/70'
        } backdrop-blur-md`}
      >
        <Container>
          <nav className="flex h-16 items-center justify-between md:h-20">
            <Link
              href={ROUTES.home}
              className="group z-50 flex items-center gap-3"
              onClick={closeMenu}
            >
              <motion.div
                className="relative"
                whileHover={{ rotate: 12, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <Image
                  src="/images/logo.svg"
                  alt={`${SITE_SHORT_NAME} Logo`}
                  width={44}
                  height={44}
                  className="h-10 w-10 md:h-11 md:w-11"
                />
                <div className="absolute inset-0 rounded-full bg-js-yellow/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
              </motion.div>
              <span className="text-xl font-bold text-js-black dark:text-white md:text-2xl">
                {SITE_SHORT_NAME}
              </span>
            </Link>

            <div className="hidden items-center gap-8 md:flex">
              <ul className="flex items-center gap-1">
                {menuItems
                  .filter((item) => item.showInDesktop)
                  .map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`group relative overflow-hidden rounded-lg px-4 py-2 font-medium transition-all duration-300 ${
                          isActive(item.href)
                            ? 'text-js-yellow'
                            : 'text-gray-600 hover:text-js-black dark:text-gray-400 dark:hover:text-white'
                        }`}
                      >
                        <span className="relative z-10">{item.label}</span>
                        <span
                          className={`absolute bottom-1 left-4 right-4 h-0.5 origin-left bg-js-yellow transition-transform duration-300 ease-out-expo ${
                            isActive(item.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                          }`}
                        />
                        <span className="absolute inset-0 -z-10 rounded-lg bg-js-yellow/0 transition-colors duration-300 group-hover:bg-js-yellow/5" />
                      </Link>
                    </li>
                  ))}
              </ul>
              <div className="h-6 w-px bg-gray-200 dark:bg-gray-700" />
              <ThemeToggle />
            </div>

            <div className="z-50 flex items-center gap-4 md:hidden">
              <ThemeToggle />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="group relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-js-yellow dark:hover:bg-gray-800"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                <motion.span
                  className="block h-0.5 w-6 bg-js-black dark:bg-white"
                  animate={{
                    rotate: isMenuOpen ? 45 : 0,
                    y: isMenuOpen ? 8 : 0,
                    width: isMenuOpen ? 24 : 24,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="block h-0.5 w-6 bg-js-black dark:bg-white"
                  animate={{
                    opacity: isMenuOpen ? 0 : 1,
                    scaleX: isMenuOpen ? 0 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="block h-0.5 w-6 bg-js-black dark:bg-white"
                  animate={{
                    rotate: isMenuOpen ? -45 : 0,
                    y: isMenuOpen ? -8 : 0,
                    width: isMenuOpen ? 24 : 24,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </button>
            </div>
          </nav>
        </Container>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="fixed inset-0 z-40 md:hidden"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
            >
              <motion.div
                className="absolute inset-0 bg-js-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.98 }}
                exit={{ opacity: 0 }}
                onClick={closeMenu}
              />

              <div className="relative flex h-full flex-col items-center justify-center px-8">
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  <motion.div
                    className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-js-yellow/10 blur-3xl"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.8 }}
                  />
                  <motion.div
                    className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-js-yellow/5 blur-3xl"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                  />
                </div>

                <nav className="relative z-10 flex flex-col items-center gap-6">
                  {menuItems
                    .filter((item) => item.showInMobile)
                    .map((item) => (
                      <motion.div key={item.href} variants={itemVariants}>
                        <Link
                          href={item.href}
                          onClick={closeMenu}
                          className={`group relative block text-4xl font-black transition-colors duration-300 sm:text-5xl ${
                            isActive(item.href)
                              ? 'text-js-yellow'
                              : 'text-white hover:text-js-yellow'
                          }`}
                        >
                          <span className="relative">
                            {item.label}
                            <span
                              className={`absolute -bottom-2 left-0 h-1 bg-js-yellow transition-all duration-300 ${
                                isActive(item.href)
                                  ? 'w-full'
                                  : 'w-0 group-hover:w-full'
                              }`}
                            />
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                </nav>

                <motion.div
                  className="absolute bottom-12 flex gap-6"
                  variants={itemVariants}
                >
                  <span className="text-sm text-gray-500">Follow us</span>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
