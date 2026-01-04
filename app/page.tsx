import { getNextEvent, getSiteConfig } from '@/lib/content'
import { Hero } from '@/components/home/Hero'
import { NextEventPreview } from '@/components/home/NextEventPreview'
import { AboutSection } from '@/components/home/AboutSection'
import { PartnersSection } from '@/components/home/PartnersSection'
import { CTASection } from '@/components/home/CTASection'

export default async function HomePage() {
  const nextEvent = await getNextEvent()
  const siteConfig = await getSiteConfig()

  return (
    <div>
      <Hero />
      <NextEventPreview event={nextEvent} />
      <AboutSection content={siteConfig.aboutMarkdown} />
      <PartnersSection />
      <CTASection />
    </div>
  )
}
