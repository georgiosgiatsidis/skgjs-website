import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3'

// Backblaze B2 S3-compatible client - lazy initialization to avoid errors during build
let s3ClientInstance: S3Client | null = null

const MISSING_CREDENTIALS =
  'B2_ACCESS_KEY_ID, B2_SECRET_ACCESS_KEY, and B2_REGION must be set in environment variables'
const MISSING_BUCKET = 'B2_BUCKET_NAME and B2_REGION must be set in environment variables'

/**
 * Whether an unconfigured bucket is an error rather than an absence. CI sets it on the runs that
 * publish, so a missing secret fails those builds loudly while dev and fork builds - which never
 * receive the secrets - render the pages without their B2-backed parts.
 */
function isB2Required(): boolean {
  return process.env.B2_REQUIRED === 'true'
}

function readB2Config(): { bucketName: string; region: string } | null {
  const bucketName = process.env.B2_BUCKET_NAME
  const region = process.env.B2_REGION

  if (!bucketName || !region) {
    return null
  }

  return { bucketName, region }
}

function hasB2Credentials(): boolean {
  return !!(process.env.B2_ACCESS_KEY_ID && process.env.B2_SECRET_ACCESS_KEY && readB2Config())
}

function buildB2PublicUrl(bucketName: string, region: string, key: string): string {
  return `https://${bucketName}.s3.${region}.backblazeb2.com/${key}`
}

function getS3Client(): S3Client {
  if (!s3ClientInstance) {
    const accessKeyId = process.env.B2_ACCESS_KEY_ID
    const secretAccessKey = process.env.B2_SECRET_ACCESS_KEY
    const region = process.env.B2_REGION

    if (!accessKeyId || !secretAccessKey || !region) {
      throw new Error(MISSING_CREDENTIALS)
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
  const config = readB2Config()

  if (!config) {
    throw new Error(MISSING_BUCKET)
  }

  return config
}

/**
 * Generates the public URL for a file in the B2 bucket (S3-style URL).
 * Returns null when the bucket is unconfigured so callers can omit the link instead of failing
 * to render the whole page; see isB2Required for where that absence is still an error.
 */
export function getB2PublicUrl(key: string): string | null {
  const config = readB2Config()

  if (!config) {
    if (isB2Required()) {
      throw new Error(MISSING_BUCKET)
    }
    return null
  }

  return buildB2PublicUrl(config.bucketName, config.region, key)
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
  // Checked before the try so a required-but-missing configuration is not swallowed as a
  // missing folder would be.
  if (!hasB2Credentials()) {
    if (isB2Required()) {
      throw new Error(MISSING_CREDENTIALS)
    }
    return []
  }

  try {
    const client = getS3Client()
    const { bucketName, region } = getB2BucketConfig()

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
        url: buildB2PublicUrl(bucketName, region, obj.Key!),
      }))

    return photos
  } catch (error) {
    // Log error but return empty array to gracefully handle missing folders
    console.error(`Failed to list photos for event ${eventIndex}:`, error)
    return []
  }
}
