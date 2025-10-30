'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Container } from './Container'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { ROUTES, SITE_SHORT_NAME } from '@/lib/constants'

// Menu items configuration
const menuItems = [
  {
    label: 'Home',
    href: ROUTES.home,
    showInDesktop: false, // Home link is already in logo
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

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent scroll when menu is open
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
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-js-yellow focus:px-4 focus:py-2 focus:text-js-black focus:outline-none focus:ring-2 focus:ring-js-yellow focus:ring-offset-2"
      >
        Skip to main content
      </a>
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? 'border-gray-300 bg-white/95 shadow-lg dark:border-gray-700 dark:bg-gray-900/95'
            : 'border-gray-200 bg-white/80 dark:border-gray-800 dark:bg-gray-900/80'
        } backdrop-blur-sm`}
      >
        <Container>
          <nav className="flex h-16 items-center justify-between">
            <Link
              href={ROUTES.home}
              className="group z-50 flex items-center gap-2"
              onClick={closeMenu}
            >
              <div className="relative">
                <Image
                  src="/images/logo.svg"
                  alt={`${SITE_SHORT_NAME} Logo`}
                  width={40}
                  height={40}
                  className="h-10 w-10 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
                />
              </div>
              <span className="text-xl font-bold text-js-black dark:text-white">
                {SITE_SHORT_NAME}
              </span>
            </Link>

            <div className="hidden items-center gap-6 md:flex">
              <ul className="flex items-center gap-6">
                {menuItems
                  .filter((item) => item.showInDesktop)
                  .map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="group relative flex items-center gap-2 font-medium text-gray-700 transition-all duration-300 hover:text-js-yellow dark:text-gray-300 dark:hover:text-js-yellow"
                      >
                        <span>{item.label}</span>
                        <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-js-yellow transition-all duration-300 group-hover:w-full" />
                      </Link>
                    </li>
                  ))}
              </ul>
              <ThemeToggle />
            </div>

            <div className="z-50 flex items-center gap-4 md:hidden">
              <ThemeToggle />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="group relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 focus:outline-none"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                <span
                  className={`block h-0.5 w-6 bg-js-black transition-all duration-300 dark:bg-white ${
                    isMenuOpen ? 'translate-y-2 rotate-45' : 'group-hover:w-7'
                  }`}
                />
                <span
                  className={`block h-0.5 w-6 bg-js-black transition-all duration-300 dark:bg-white ${
                    isMenuOpen ? 'opacity-0' : 'group-hover:w-5'
                  }`}
                />
                <span
                  className={`block h-0.5 w-6 bg-js-black transition-all duration-300 dark:bg-white ${
                    isMenuOpen ? '-translate-y-2 -rotate-45' : 'group-hover:w-7'
                  }`}
                />
              </button>
            </div>
          </nav>
        </Container>

        <div
          className={`fixed inset-0 z-40 transition-all duration-500 md:hidden ${
            isMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-js-black opacity-98 h-screen"
            onClick={closeMenu}
          />

          <div className="relative flex flex-col items-center justify-center px-8 py-20 bg-js-black">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div
                className={`absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-js-yellow/10 blur-3xl transition-all duration-1000 ${
                  isMenuOpen ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
                }`}
              />
              <div
                className={`absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-js-yellow/5 blur-3xl transition-all delay-200 duration-1000 ${
                  isMenuOpen ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
                }`}
              />
            </div>

            <nav className="relative z-10 mb-12 flex flex-col items-center gap-6">
              {menuItems
                .filter((item) => item.showInMobile)
                .map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className={`group flex transform items-center gap-4 text-4xl font-black text-white transition-all duration-300 hover:scale-110 hover:text-js-yellow sm:text-5xl ${
                      isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <span className="relative">
                      {item.label}
                      <span className="absolute -bottom-2 left-0 h-1 w-0 bg-js-yellow transition-all duration-300 group-hover:w-full" />
                    </span>
                  </Link>
                ))}
            </nav>
          </div>
        </div>
      </header>
    </>
  )
}
