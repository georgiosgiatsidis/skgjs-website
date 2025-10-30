import Image from 'next/image'
import Link from 'next/link'
import { getAllPartners } from '@/lib/content'

export async function PartnersSection() {
  const allPartners = await getAllPartners(true) // Only active partners

  if (allPartners.length === 0) {
    return null
  }

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-20 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-js-black dark:text-white md:text-4xl">
              Our Community Partners
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Amazing organizations helping us build the JavaScript community in Thessaloniki! 🤝
            </p>
          </div>

          {/* Partners Grid */}
          <div className="grid grid-cols-2 items-center gap-8 md:grid-cols-3 md:gap-12 lg:grid-cols-4">
            {allPartners.map((partner) => (
              <Link
                key={partner.slug}
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:scale-105 hover:border-js-yellow hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-js-yellow"
              >
                <div className="relative flex h-20 w-full items-center justify-center">
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    width={160}
                    height={80}
                    className="max-h-20 w-auto object-contain grayscale transition-all duration-300 [filter:brightness(0)_saturate(100%)] group-hover:grayscale-0 group-hover:[filter:none] dark:[filter:brightness(0)_saturate(100%)_invert(1)] dark:group-hover:[filter:none]"
                  />
                </div>

                {/* Tooltip on hover */}
                <div className="pointer-events-none absolute -bottom-12 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-js-black px-3 py-1 text-sm text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-gray-700">
                  {partner.name}
                </div>
              </Link>
            ))}
          </div>

          {/* Become a Partner CTA */}
          <div className="mt-16 text-center">
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Interested in supporting our community?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 font-semibold text-js-yellow transition-colors duration-200 hover:text-js-yellow/80"
            >
              Become a Partner
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
