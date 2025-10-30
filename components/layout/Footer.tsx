import { Container } from './Container'
import { getSiteConfig } from '@/lib/content'

export function Footer() {
  const config = getSiteConfig()

  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-8 dark:border-gray-800 dark:bg-gray-800">
      <Container>
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex gap-6">
            <a
              href={config.social.meetup}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 transition-colors hover:text-js-yellow dark:text-gray-400"
              aria-label="Meetup"
            >
              Meetup
            </a>
            <a
              href={config.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 transition-colors hover:text-js-yellow dark:text-gray-400"
              aria-label="GitHub"
            >
              GitHub
            </a>
            <a
              href={config.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 transition-colors hover:text-js-yellow dark:text-gray-400"
              aria-label="Instagram"
            >
              Instagram
            </a>
            <a
              href={config.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 transition-colors hover:text-js-yellow dark:text-gray-400"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Thessaloniki JavaScript Meetup. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}
