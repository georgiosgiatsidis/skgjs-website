import { getSiteConfig } from '@/lib/content'
import { Container } from '@/components/layout/Container'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export const metadata = {
  title: 'About Us | Thessaloniki JavaScript Meetup',
  description:
    'Learn about the Thessaloniki JavaScript Meetup community, our mission, and what we do.',
}

export default async function AboutUsPage() {
  const siteConfig = await getSiteConfig()

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-js-black via-gray-900 to-js-black py-20">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-1/4 top-10 h-72 w-72 rounded-full bg-js-yellow blur-3xl"></div>
          <div className="absolute bottom-10 right-1/4 h-96 w-96 rounded-full bg-js-yellow blur-3xl"></div>
        </div>

        <Container>
          <div className="relative z-10 text-center">
            <div className="mb-4 inline-block">
              <span className="text-sm font-semibold uppercase tracking-wider text-js-yellow">
                Who We Are
              </span>
            </div>
            <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl">
              About <span className="text-js-yellow">SKG JS</span>
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-gray-300">
              {siteConfig.description}
            </p>
          </div>
        </Container>
      </section>

      {/* Main Content Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50 py-24 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-js-yellow/10 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-js-yellow/10 blur-3xl"></div>
        </div>

        <Container>
          <div className="relative z-10 mx-auto max-w-5xl">
            {/* Content Card */}
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800">
              <div className="p-8 md:p-12">
                <div className="prose prose-lg dark:prose-invert prose-headings:text-js-black dark:prose-headings:text-white prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-strong:text-js-black dark:prose-strong:text-white prose-ul:text-gray-600 dark:prose-ul:text-gray-300 max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {siteConfig.aboutMarkdown}
                  </ReactMarkdown>
                </div>
              </div>

              {/* Decorative bottom accent */}
              <div className="h-2 bg-gradient-to-r from-js-yellow via-js-yellow/60 to-js-yellow"></div>
            </div>

            {/* Stats Section */}
            <div className="mt-16 grid gap-8 sm:grid-cols-3">
              <div className="rounded-xl border border-gray-100 bg-white p-8 text-center shadow-lg dark:border-gray-700 dark:bg-gray-800">
                <div className="mb-2 text-4xl font-bold text-js-yellow">2022</div>
                <div className="text-sm font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                  Founded
                </div>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-8 text-center shadow-lg dark:border-gray-700 dark:bg-gray-800">
                <div className="mb-2 text-4xl font-bold text-js-yellow">Monthly</div>
                <div className="text-sm font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                  Meetups
                </div>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-8 text-center shadow-lg dark:border-gray-700 dark:bg-gray-800">
                <div className="mb-2 text-4xl font-bold text-js-yellow">All Levels</div>
                <div className="text-sm font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                  Welcome
                </div>
              </div>
            </div>

            {/* Values Section */}
            <div className="mt-16">
              <h2 className="mb-8 text-center text-3xl font-bold text-js-black dark:text-white">
                Our Values
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                  <h3 className="mb-3 text-xl font-bold text-js-yellow">
                    Inclusivity
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Everyone is welcome regardless of experience level, background, or identity. We foster a safe and supportive environment for all.
                  </p>
                </div>
                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                  <h3 className="mb-3 text-xl font-bold text-js-yellow">
                    Knowledge Sharing
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We believe in the power of sharing knowledge and learning from each other through talks, workshops, and mentorship.
                  </p>
                </div>
                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                  <h3 className="mb-3 text-xl font-bold text-js-yellow">
                    Community First
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Building connections and relationships is at the heart of what we do. Come for the talks, stay for the community.
                  </p>
                </div>
                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                  <h3 className="mb-3 text-xl font-bold text-js-yellow">
                    Growth Mindset
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We encourage continuous learning and growth, celebrating both successes and learning opportunities.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="mt-16 rounded-2xl bg-gradient-to-r from-js-yellow to-amber-400 p-8 text-center shadow-xl md:p-12">
              <h2 className="mb-4 text-3xl font-bold text-js-black">
                Join Our Community
              </h2>
              <p className="mb-6 text-lg text-gray-800">
                Interested in speaking, sponsoring, or just attending? We'd love to hear from you!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={siteConfig.social.meetup}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-lg bg-js-black px-6 py-3 font-semibold text-white transition-transform hover:scale-105"
                >
                  Join on Meetup
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center rounded-lg border-2 border-js-black bg-transparent px-6 py-3 font-semibold text-js-black transition-transform hover:scale-105"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
