import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3'

// Tebi S3-compatible client - lazy initialization to avoid errors during build
let s3ClientInstance: S3Client | null = null

function getS3Client(): S3Client {
  if (!s3ClientInstance) {
    const accessKeyId = process.env.TEBI_ACCESS_KEY_ID
    const secretAccessKey = process.env.TEBI_SECRET_ACCESS_KEY

    if (!accessKeyId || !secretAccessKey) {
      throw new Error(
        'TEBI_ACCESS_KEY_ID and TEBI_SECRET_ACCESS_KEY must be set in environment variables'
      )
    }

    s3ClientInstance = new S3Client({
      endpoint: 'https://s3.tebi.io',
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      region: 'global',
    })
  }
  return s3ClientInstance
}

// Helper to get bucket config from env
export function getTebiBucketConfig() {
  const bucketName = process.env.TEBI_BUCKET_NAME

  if (!bucketName) {
    throw new Error('TEBI_BUCKET_NAME must be set in environment variables')
  }

  return { bucketName }
}

// Generate public URL for a file in Tebi bucket
export function getTebiPublicUrl(key: string): string {
  const { bucketName } = getTebiBucketConfig()
  // Using virtual-hosted style URL
  return `https://${bucketName}.s3.tebi.io/${key}`
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
 * Lists all photos for a specific event from Tebi bucket.
 * Photos are expected at: events/<eventIndex>/photos/
 * Returns public URLs for the bucket.
 */
export async function listEventPhotos(eventIndex: number): Promise<EventPhoto[]> {
  try {
    const client = getS3Client()
    const { bucketName } = getTebiBucketConfig()

    const prefix = `events/event-${eventIndex}/photos/`

    const command = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: prefix,
      MaxKeys: 100,
    })

    const response = await client.send(command)
    const contents = response.Contents || []

    // Filter for image files and build public URLs
    const photos: EventPhoto[] = contents
      .filter((obj) => obj.Key && isImageFile(obj.Key))
      .map((obj) => ({
        fileName: obj.Key!.split('/').pop() || obj.Key!,
        url: getTebiPublicUrl(obj.Key!),
      }))

    return photos
  } catch (error) {
    // Log error but return empty array to gracefully handle missing folders
    console.error(`Failed to list photos for event ${eventIndex}:`, error)
    return []
  }
}
