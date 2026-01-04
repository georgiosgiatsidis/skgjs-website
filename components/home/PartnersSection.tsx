import Image from 'next/image'
import Link from 'next/link'
import { getAllPartners } from '@/lib/content'
import { Marquee } from '@/components/ui/Marquee'
import { ScrollReveal } from '@/components/animations/ScrollReveal'

export async function PartnersSection() {
  const allPartners = await getAllPartners(true)

  if (allPartners.length === 0) {
    return null
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-24 dark:from-gray-900 dark:to-gray-950">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-js-yellow/30 to-transparent" />
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-js-yellow/30 to-transparent" />
      </div>

      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-js-yellow">
              Supported By
            </span>
            <h2 className="mb-4 text-3xl font-bold text-js-black dark:text-white md:text-4xl">
              Our Community Partners
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              Amazing organizations helping us build the JavaScript community in Thessaloniki
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="relative">
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-white to-transparent dark:from-gray-900" />
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-white to-transparent dark:from-gray-900" />

            <Marquee speed={30} pauseOnHover className="py-8">
              {allPartners.map((partner) => (
                <Link
                  key={partner.slug}
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative mx-8 flex h-24 w-40 items-center justify-center rounded-xl border border-gray-200 bg-white p-4 transition-all duration-300 hover:border-js-yellow hover:shadow-lg hover:shadow-js-yellow/10 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-js-yellow"
                >
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    width={120}
                    height={60}
                    className="max-h-12 w-auto object-contain opacity-60 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                  />
                  <div className="pointer-events-none absolute -bottom-10 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-lg bg-js-black px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 dark:bg-gray-700">
                    {partner.name}
                    <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-js-black dark:bg-gray-700" />
                  </div>
                </Link>
              ))}
            </Marquee>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="mt-12 text-center">
            <p className="mb-4 text-gray-500 dark:text-gray-400">
              Interested in supporting our community?
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 font-semibold text-js-yellow transition-all duration-300 hover:gap-3"
            >
              Become a Partner
              <svg
                className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
