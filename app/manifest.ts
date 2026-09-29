import { MetadataRoute } from 'next'
import { getSiteConfig } from '@/lib/content'

export const dynamic = 'force-static'

// Matches the body background (gray-900) so the splash screen and title bar blend with the page
const DARK_BACKGROUND = '#111827'

export default function manifest(): MetadataRoute.Manifest {
  const { siteName, description } = getSiteConfig()

  return {
    id: '/',
    name: siteName,
    // Kept short so home-screen labels are not truncated
    short_name: 'SKG JS',
    description,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: DARK_BACKGROUND,
    theme_color: DARK_BACKGROUND,
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      // Padded copy: the favicon artwork reaches the edges and would be cropped by the mask
      {
        src: '/icons/icon-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
