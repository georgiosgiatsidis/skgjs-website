import fs from 'fs'
import path from 'path'
import { describe, it, expect } from 'vitest'
import manifest from '@/app/manifest'
import { getSiteConfig } from '@/lib/content'

// Chromium only offers "Install" when these members are present (see MDN, "Making PWAs installable")
describe('Web app manifest', () => {
  const result = manifest()

  it('should take name and description from site-config.md', () => {
    const { siteName, description } = getSiteConfig()

    expect(result.name).toBe(siteName)
    expect(result.description).toBe(description)
  })

  it('should keep the home-screen label short enough to avoid truncation', () => {
    expect(result.short_name).toBe('SKG JS')
  })

  it('should declare the members required for installability', () => {
    expect(result.start_url).toBe('/')
    expect(result.display).toBe('standalone')
    expect(result.prefer_related_applications).toBeUndefined()
  })

  it('should provide 192px, 512px and maskable icons', () => {
    const icons = result.icons ?? []
    const anyIcons = icons.filter((icon) => (icon.purpose ?? 'any') === 'any')

    expect(anyIcons.map((icon) => icon.sizes)).toEqual(
      expect.arrayContaining(['192x192', '512x512'])
    )
    expect(icons.some((icon) => icon.purpose === 'maskable' && icon.sizes === '512x512')).toBe(true)
  })

  it('should only reference icon files that exist in public/', () => {
    for (const icon of result.icons ?? []) {
      expect(fs.existsSync(path.join(process.cwd(), 'public', icon.src))).toBe(true)
    }
  })
})
