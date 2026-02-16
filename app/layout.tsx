import type { Metadata } from 'next'
import { Ubuntu, JetBrains_Mono } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { GoogleAnalytics } from '@/components/ui/GoogleAnalytics'
import { getSiteConfig } from '@/lib/content'
import '@/styles/globals.css'

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-ubuntu',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Thessaloniki JavaScript Meetup | SKG JS',
  description:
    'Join the Thessaloniki JavaScript community for monthly meetups, talks, and networking with local developers.',
  keywords: ['JavaScript', 'Thessaloniki', 'Meetup', 'Community', 'Programming', 'Web Development'],
  authors: [{ name: 'SKG JS' }],
  metadataBase: new URL('https://skgjs.gr'),
  openGraph: {
    title: 'Thessaloniki JavaScript Meetup',
    description: 'JavaScript community in Thessaloniki',
    type: 'website',
    locale: 'en_US',
    url: 'https://skgjs.gr',
    siteName: 'Thessaloniki JavaScript Meetup',
    images: [
      {
        url: '/images/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Thessaloniki JavaScript Meetup',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thessaloniki JavaScript Meetup',
    description: 'JavaScript community in Thessaloniki',
    images: ['/images/og-image.svg'],
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const siteConfig = await getSiteConfig()

  return (
    <html lang="en" className={`dark ${ubuntu.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer social={siteConfig.social} email={siteConfig.contact?.email} />
      </body>
    </html>
  )
}
