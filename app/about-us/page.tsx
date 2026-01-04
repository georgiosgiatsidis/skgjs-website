import { getSiteConfig } from '@/lib/content'
import { Container } from '@/components/layout/Container'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { AnimatedText } from '@/components/animations/AnimatedText'
import { CountUp } from '@/components/animations/CountUp'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { MagneticButton } from '@/components/animations/MagneticButton'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export const metadata = {
  title: 'About Us | Thessaloniki JavaScript Meetup',
  description:
    'Learn about the Thessaloniki JavaScript Meetup community, our mission, and what we do.',
}

const values = [
  {
    title: 'Inclusivity',
    description:
      'Everyone is welcome regardless of experience level, background, or identity. We foster a safe and supportive environment for all.',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: 'Knowledge Sharing',
    description:
      'We believe in the power of sharing knowledge and learning from each other through talks, workshops, and mentorship.',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    title: 'Community First',
    description:
      'Building connections and relationships is at the heart of what we do. Come for the talks, stay for the community.',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: 'Growth Mindset',
    description:
      'We encourage continuous learning and growth, celebrating both successes and learning opportunities.',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
]

const stats = [
  { value: 2022, label: 'Founded' },
  { value: 300, suffix: '+', label: 'Members' },
  { value: 5, suffix: '+', label: 'Meetups' },
  { value: 10, suffix: '+', label: 'Speakers' },
]

export default async function AboutUsPage() {
  const siteConfig = await getSiteConfig()

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
                Who We Are
              </span>
            </ScrollReveal>

            <AnimatedText
              text="About SKG JS"
              type="chars"
              animation="slide"
              stagger={0.04}
              className="mb-6 text-5xl font-black text-white md:text-6xl lg:text-7xl"
              as="h1"
            />

            <ScrollReveal delay={0.3}>
              <p className="text-lg text-gray-300 md:text-xl">{siteConfig.description}</p>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <section className="relative -mt-16 z-20">
        <Container>
          <ScrollReveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-xl dark:border-gray-800 dark:bg-gray-900"
                >
                  <div className="mb-2 text-4xl font-black text-js-yellow">
                    <CountUp end={stat.value} duration={2} suffix={stat.suffix || ''} />
                  </div>
                  <div className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <Card className="overflow-hidden p-0">
                <div className="p-8 md:p-12">
                  <div className="prose prose-lg dark:prose-invert prose-headings:text-js-black dark:prose-headings:text-white prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-strong:text-js-black dark:prose-strong:text-white prose-ul:text-gray-600 dark:prose-ul:text-gray-300 prose-a:text-js-yellow prose-a:no-underline hover:prose-a:underline max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {siteConfig.aboutMarkdown}
                    </ReactMarkdown>
                  </div>
                </div>
                <div className="h-2 bg-gradient-to-r from-js-yellow via-yellow-400 to-js-yellow" />
              </Card>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <section className="bg-gray-50 py-24 dark:bg-gray-900/50">
        <Container>
          <ScrollReveal>
            <div className="mb-16 text-center">
              <span className="mb-4 inline-block rounded-full bg-js-yellow/10 px-4 py-2 text-sm font-medium text-js-yellow dark:bg-js-yellow/20">
                What We Stand For
              </span>
              <h2 className="text-4xl font-black text-gray-900 dark:text-white md:text-5xl">
                Our Values
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid gap-8 md:grid-cols-2">
            {values.map((value, index) => (
              <ScrollReveal key={value.title} delay={index * 0.1}>
                <Card hover tilt glowOnHover className="group h-full p-8">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-js-yellow/10 text-js-yellow transition-colors group-hover:bg-js-yellow group-hover:text-js-black">
                    {value.icon}
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-js-yellow via-yellow-400 to-amber-400 p-12 text-center shadow-2xl md:p-16">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/20 blur-3xl" />
                <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-white/20 blur-3xl" />
              </div>

              <div className="relative z-10">
                <h2 className="mb-4 text-4xl font-black text-js-black md:text-5xl">
                  Join Our Community
                </h2>
                <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-800">
                  Interested in speaking, sponsoring, or just attending? We&apos;d love to hear from
                  you!
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <MagneticButton strength={0.2}>
                    <a
                      href={siteConfig.social.meetup}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="secondary" size="lg" glowOnHover>
                        Join on Meetup
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </Button>
                    </a>
                  </MagneticButton>
                  <MagneticButton strength={0.2}>
                    <Link href="/contact">
                      <Button variant="outline" size="lg" className="border-js-black text-js-black hover:bg-js-black hover:text-white">
                        Contact Us
                      </Button>
                    </Link>
                  </MagneticButton>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  )
}
