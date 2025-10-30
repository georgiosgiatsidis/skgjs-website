import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface AboutSectionProps {
  content: string
}

export function AboutSection({ content }: AboutSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50 py-24 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-js-yellow/10 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-js-yellow/10 blur-3xl"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-16 text-center">
            <div className="mb-4 inline-block">
              <span className="text-sm font-semibold uppercase tracking-wider text-js-yellow">
                Who We Are
              </span>
            </div>
            <h2 className="mb-6 text-4xl font-bold text-js-black dark:text-white md:text-5xl">
              About <span className="text-js-yellow">SKG JS</span>
            </h2>
          </div>

          {/* Content Card */}
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800">
            <div className="p-8 md:p-12">
              <div className="prose prose-lg dark:prose-invert prose-headings:text-js-black dark:prose-headings:text-white prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-strong:text-js-black dark:prose-strong:text-white prose-ul:text-gray-600 dark:prose-ul:text-gray-300 max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
              </div>
            </div>

            {/* Decorative bottom accent */}
            <div className="h-2 bg-gradient-to-r from-js-yellow via-js-yellow/60 to-js-yellow"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
