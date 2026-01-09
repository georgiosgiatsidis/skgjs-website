import B2 from 'backblaze-b2'

// B2 client singleton with automatic re-authorization
class B2Client {
  private client: B2
  private authorizedAt: number | null = null
  private authPromise: Promise<void> | null = null
  // B2 auth tokens expire after 24 hours, refresh at 23 hours
  private readonly AUTH_EXPIRY_MS = 23 * 60 * 60 * 1000

  constructor() {
    const keyId = process.env.B2_KEY_ID
    const appKey = process.env.B2_APP_KEY

    if (!keyId || !appKey) {
      throw new Error('B2_KEY_ID and B2_APP_KEY must be set in environment variables')
    }

    this.client = new B2({
      applicationKeyId: keyId,
      applicationKey: appKey,
    })
  }

  private isAuthExpired(): boolean {
    if (!this.authorizedAt) return true
    return Date.now() - this.authorizedAt > this.AUTH_EXPIRY_MS
  }

  async authorize(): Promise<void> {
    // Prevent concurrent authorization calls
    if (this.authPromise) {
      await this.authPromise
      return
    }

    if (!this.isAuthExpired()) {
      return
    }

    this.authPromise = this.client
      .authorize()
      .then(() => {
        this.authorizedAt = Date.now()
      })
      .finally(() => {
        this.authPromise = null
      })

    await this.authPromise
  }

  async getAuthorizedClient(): Promise<B2> {
    await this.authorize()
    return this.client
  }
}

// Singleton instance - lazy initialization to avoid errors during build
let b2ClientInstance: B2Client | null = null

export function getB2Client(): B2Client {
  if (!b2ClientInstance) {
    b2ClientInstance = new B2Client()
  }
  return b2ClientInstance
}

// Helper to get bucket config from env
export function getB2BucketConfig() {
  const bucketId = process.env.B2_BUCKET_ID
  const bucketName = process.env.B2_BUCKET_NAME

  if (!bucketId || !bucketName) {
    throw new Error('B2_BUCKET_ID and B2_BUCKET_NAME must be set in environment variables')
  }

  return { bucketId, bucketName }
}

// Supported image extensions for photo gallery
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif']

function isImageFile(fileName: string): boolean {
  const ext = fileName.toLowerCase().slice(fileName.lastIndexOf('.'))
  return IMAGE_EXTENSIONS.includes(ext)
}

export interface EventPhoto {
  url: string
  fileName: string
}

/**
 * Lists all photos for a specific event from B2 bucket.
 * Photos are expected at: events/<eventIndex>/photos/
 * Returns public URLs for a public bucket.
 */
export async function listEventPhotos(eventIndex: number): Promise<EventPhoto[]> {
  try {
    const b2Client = getB2Client()
    const client = await b2Client.getAuthorizedClient()
    const { bucketId, bucketName } = getB2BucketConfig()

    const prefix = `events/${eventIndex}/photos/`

    const response = await client.listFileNames({
      bucketId,
      prefix,
      maxFileCount: 100,
    })

    const files = response.data.files || []

    // Get download URL base from the authorized client
    // Falls back to standard B2 URL format if not available
    const downloadUrl =
      (client as unknown as { downloadUrl?: string }).downloadUrl ||
      'https://f003.backblazeb2.com'

    // Filter for image files and build public URLs
    const photos: EventPhoto[] = files
      .filter((file: { fileName: string }) => isImageFile(file.fileName))
      .map((file: { fileName: string }) => ({
        fileName: file.fileName.split('/').pop() || file.fileName,
        url: `${downloadUrl}/file/${bucketName}/${file.fileName}`,
      }))

    return photos
  } catch (error) {
    // Log error but return empty array to gracefully handle missing folders
    console.error(`Failed to list photos for event ${eventIndex}:`, error)
    return []
  }
}
