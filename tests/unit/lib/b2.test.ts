import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { getB2PublicUrl, listEventPhotos } from '@/lib/b2'

const B2_VARS = [
  'B2_ACCESS_KEY_ID',
  'B2_SECRET_ACCESS_KEY',
  'B2_BUCKET_NAME',
  'B2_REGION',
  'B2_REQUIRED',
] as const

describe('B2 helpers without credentials', () => {
  const original: Partial<Record<(typeof B2_VARS)[number], string | undefined>> = {}

  beforeEach(() => {
    for (const name of B2_VARS) {
      original[name] = process.env[name]
      delete process.env[name]
    }
  })

  afterEach(() => {
    for (const name of B2_VARS) {
      if (original[name] === undefined) {
        delete process.env[name]
      } else {
        process.env[name] = original[name]
      }
    }
    vi.restoreAllMocks()
  })

  describe('getB2PublicUrl', () => {
    it('returns the public URL when the bucket is configured', () => {
      process.env.B2_BUCKET_NAME = 'skgjs'
      process.env.B2_REGION = 'eu-central-003'

      expect(getB2PublicUrl('events/event-1/deck.pdf')).toBe(
        'https://skgjs.s3.eu-central-003.backblazeb2.com/events/event-1/deck.pdf'
      )
    })

    // Dev and fork builds never receive the secrets; the page drops the link rather than failing
    // to render.
    it('returns null when the bucket is unconfigured', () => {
      expect(getB2PublicUrl('events/event-1/deck.pdf')).toBeNull()
    })

    it('throws when the bucket is unconfigured but required', () => {
      process.env.B2_REQUIRED = 'true'

      expect(() => getB2PublicUrl('events/event-1/deck.pdf')).toThrow(/B2_BUCKET_NAME/)
    })
  })

  describe('listEventPhotos', () => {
    it('returns no photos when the credentials are unconfigured', async () => {
      await expect(listEventPhotos(1)).resolves.toEqual([])
    })

    it('rejects when the credentials are unconfigured but required', async () => {
      process.env.B2_REQUIRED = 'true'

      await expect(listEventPhotos(1)).rejects.toThrow(/B2_ACCESS_KEY_ID/)
    })
  })
})
