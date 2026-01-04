'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { ParallaxWrapper } from '@/components/animations/ParallaxWrapper'

interface AboutSectionProps {
  content: string
}

export function AboutSection({ content }: AboutSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50 py-24 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <div className="pointer-events-none absolute inset-0">
        <ParallaxWrapper speed={-0.3} className="absolute left-10 top-20">
          <div className="h-72 w-72 rounded-full bg-js-yellow/10 blur-3xl" />
        </ParallaxWrapper>
        <ParallaxWrapper speed={0.2} className="absolute bottom-20 right-10">
          <div className="h-96 w-96 rounded-full bg-js-yellow/10 blur-3xl" />
        </ParallaxWrapper>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <motion.div
                className="mb-4 inline-block"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <span className="text-sm font-semibold uppercase tracking-widest text-js-yellow">
                  Who We Are
                </span>
              </motion.div>
              <h2 className="mb-6 text-4xl font-bold text-js-black dark:text-white md:text-5xl">
                About <span className="text-js-yellow">SKG JS</span>
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <motion.div
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white/80 shadow-2xl backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/80"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-8 md:p-12">
                <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-js-black prose-p:text-gray-600 prose-strong:text-js-black prose-ul:text-gray-600 dark:prose-headings:text-white dark:prose-p:text-gray-300 dark:prose-strong:text-white dark:prose-ul:text-gray-300">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
                </div>
              </div>

              <motion.div
                className="h-2 bg-gradient-to-r from-js-yellow via-yellow-400 to-js-yellow"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                viewport={{ once: true }}
                style={{ originX: 0 }}
              />
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
