import { Container } from '@/components/layout/Container'
import { ContactForm } from '@/components/contact/ContactForm'
import { getSiteConfig } from '@/lib/content'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SOCIAL_PLATFORMS } from '@/components/ui/SocialPlatforms'

export default function ContactPage() {
  const config = getSiteConfig()
  const contactFormDisabled =
    !config.contact?.email || !config.contact?.enableContactForm || !config.contact?.web3formsKey

  const socialWithLinks = SOCIAL_PLATFORMS.flatMap((platform) => {
    const href = config.social[platform.key]
    return href ? [{ ...platform, href }] : []
  })

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-js-black to-gray-900 py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-js-yellow/10 blur-3xl" />
          <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-js-yellow/5 blur-3xl" />
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        </div>

        <Container className="relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <ScrollReveal>
              <span className="mb-4 inline-block rounded-full bg-js-yellow/10 px-4 py-2 text-sm font-medium text-js-yellow">
                Say Hello
              </span>
            </ScrollReveal>

            <h1 className="mb-6 text-3xl font-black text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Get in Touch
            </h1>

            <ScrollReveal delay={0.3}>
              <p className="text-lg text-gray-300 md:text-xl">
                Have questions or want to get involved? We&apos;d love to hear from you!
              </p>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2">
            <div className="rounded-3xl bg-white p-8 shadow-xl dark:bg-gray-900 md:p-10 md:pt-0">
              <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                Send us a message{contactFormDisabled ? ' (Coming soon)' : ''}
              </h2>
              <ContactForm
                disabled={contactFormDisabled}
                accessKey={config.contact?.web3formsKey}
              />
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                  Connect With Us
                </h2>
                <p className="mb-8 text-gray-600 dark:text-gray-400">
                  Follow us on social media to stay updated with our latest events, announcements,
                  and community highlights.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {socialWithLinks.map(({ key, label, Icon, href }) => (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-js-yellow hover:shadow-lg hover:shadow-js-yellow/10 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-js-yellow"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition-colors group-hover:bg-js-yellow group-hover:text-js-black dark:bg-gray-800 dark:text-gray-400 dark:group-hover:bg-js-yellow dark:group-hover:text-js-black">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      {label}
                    </span>
                  </a>
                ))}
              </div>

              {config.contact?.email && (
                <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-js-yellow/10 to-transparent p-6 dark:border-gray-800">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-js-yellow text-js-black">
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
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Email Us Directly
                    </h3>
                  </div>
                  <a
                    href={`mailto:${config.contact?.email}`}
                    className="text-lg font-medium text-js-yellow transition-colors hover:text-yellow-500"
                  >
                    {config.contact?.email}
                  </a>
                </div>
              )}

              <div className="rounded-2xl border border-gray-200 p-6 dark:border-gray-800">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Location</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">Thessaloniki, Greece</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
