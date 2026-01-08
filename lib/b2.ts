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
