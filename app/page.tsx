import { getNextEvent, getSiteConfig } from '@/lib/content'
import { getStats } from '@/lib/stats'
import { Hero } from '@/components/home/Hero'
import { NextEventPreview } from '@/components/home/NextEventPreview'
import { AboutSection } from '@/components/home/AboutSection'
import { PartnersSection } from '@/components/home/PartnersSection'
import { BecomeASpeakerSection } from '@/components/home/BecomeASpeakerSection'
import { CTASection } from '@/components/home/CTASection'

export default async function HomePage() {
  const nextEvent = await getNextEvent()
  const siteConfig = await getSiteConfig()
  const stats = getStats()

  return (
    <div>
      <Hero stats={stats} />
      <NextEventPreview event={nextEvent} />
      <BecomeASpeakerSection speakerFormUrl={siteConfig.speakerFormUrl} />
      <AboutSection content={siteConfig.aboutMarkdown} />
      <PartnersSection />
      <CTASection />
    </div>
  )
}
