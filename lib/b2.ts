import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3'

// Backblaze B2 S3-compatible client - lazy initialization to avoid errors during build
let s3ClientInstance: S3Client | null = null

function getS3Client(): S3Client {
  if (!s3ClientInstance) {
    const accessKeyId = process.env.B2_ACCESS_KEY_ID
    const secretAccessKey = process.env.B2_SECRET_ACCESS_KEY
    const region = process.env.B2_REGION

    if (!accessKeyId || !secretAccessKey || !region) {
      throw new Error(
        'B2_ACCESS_KEY_ID, B2_SECRET_ACCESS_KEY, and B2_REGION must be set in environment variables'
      )
    }

    s3ClientInstance = new S3Client({
      endpoint: `https://s3.${region}.backblazeb2.com`,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      region,
    })
  }
  return s3ClientInstance
}

// Helper to get bucket config from env
export function getB2BucketConfig() {
  const bucketName = process.env.B2_BUCKET_NAME
  const region = process.env.B2_REGION

  if (!bucketName || !region) {
    throw new Error('B2_BUCKET_NAME and B2_REGION must be set in environment variables')
  }

  return { bucketName, region }
}

// Generate public URL for a file in B2 bucket (S3-style URL)
export function getB2PublicUrl(key: string): string {
  const { bucketName, region } = getB2BucketConfig()
  return `https://${bucketName}.s3.${region}.backblazeb2.com/${key}`
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
 * Returns public URLs for the bucket.
 */
export async function listEventPhotos(eventIndex: number): Promise<EventPhoto[]> {
  try {
    const client = getS3Client()
    const { bucketName } = getB2BucketConfig()

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
        url: getB2PublicUrl(obj.Key!),
      }))

    return photos
  } catch (error) {
    // Log error but return empty array to gracefully handle missing folders
    console.error(`Failed to list photos for event ${eventIndex}:`, error)
    return []
  }
}
