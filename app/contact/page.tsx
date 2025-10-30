import { Container } from '@/components/layout/Container'
import { ContactForm } from '@/components/contact/ContactForm'
import { getSiteConfig } from '@/lib/content'

export default function ContactPage() {
  const config = getSiteConfig()

  return (
    <Container className="py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">Get in Touch</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Have questions or want to get involved? We&apos;d love to hear from you!
        </p>
      </div>

      <ContactForm />

      <div className="mx-auto mt-16 max-w-2xl border-t border-gray-200 pt-12 dark:border-gray-700">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-white">
          Connect With Us
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <a
            href={config.social.meetup}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 rounded-lg border-2 border-gray-200 p-4 transition-all hover:border-js-yellow hover:bg-js-yellow/10 dark:border-gray-700 dark:hover:border-js-yellow"
          >
            <span className="text-lg font-semibold text-gray-900 dark:text-white">Meetup</span>
          </a>
          <a
            href={config.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 rounded-lg border-2 border-gray-200 p-4 transition-all hover:border-js-yellow hover:bg-js-yellow/10 dark:border-gray-700 dark:hover:border-js-yellow"
          >
            <span className="text-lg font-semibold text-gray-900 dark:text-white">GitHub</span>
          </a>
          <a
            href={config.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 rounded-lg border-2 border-gray-200 p-4 transition-all hover:border-js-yellow hover:bg-js-yellow/10 dark:border-gray-700 dark:hover:border-js-yellow"
          >
            <span className="text-lg font-semibold text-gray-900 dark:text-white">Instagram</span>
          </a>
          <a
            href={config.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 rounded-lg border-2 border-gray-200 p-4 transition-all hover:border-js-yellow hover:bg-js-yellow/10 dark:border-gray-700 dark:hover:border-js-yellow"
          >
            <span className="text-lg font-semibold text-gray-900 dark:text-white">LinkedIn</span>
          </a>
        </div>
        <p className="mt-8 text-center text-gray-600 dark:text-gray-400">
          Email us directly at{' '}
          <a
            href={`mailto:${config.contact.email}`}
            className="font-semibold text-js-yellow hover:underline"
          >
            {config.contact.email}
          </a>
        </p>
      </div>
    </Container>
  )
}
