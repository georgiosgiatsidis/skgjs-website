'use client'

import Script from 'next/script'

interface GoogleAnalyticsProps {
  gaId?: string
}

// Analytics are deliberately off: NEXT_PUBLIC_GA_ID is unset in CI, so nothing
// loads. /privacy states that this site runs no analytics and sets no cookies of
// its own - setting the variable would make that statement false and would also
// require a consent mechanism before this script may run for EU visitors.
export function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  if (!gaId) {
    return null
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}
