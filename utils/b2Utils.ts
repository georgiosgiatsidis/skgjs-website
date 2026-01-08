import { getB2Client, getB2BucketConfig } from '@/lib/b2'
import type { B2File, B2FileListResponse, B2SignedUrl } from '@/lib/types'

// Default expiration for signed URLs (1 hour)
const DEFAULT_URL_EXPIRATION_SECONDS = 3600

/**
 * List files in the B2 bucket with optional prefix filtering
 */
export async function listFiles(
  prefix: string = '',
  maxFileCount: number = 100
): Promise<B2FileListResponse> {
  const b2Client = getB2Client()
  const client = await b2Client.getAuthorizedClient()
  const { bucketId } = getB2BucketConfig()

  const response = await client.listFileNames({
    bucketId,
    prefix,
    maxFileCount,
    delimiter: '',
  })

  const files: B2File[] = response.data.files.map(
    (file: {
      fileId: string
      fileName: string
      contentLength: number
      contentType: string
      uploadTimestamp: number
    }) => ({
      fileId: file.fileId,
      fileName: file.fileName,
      contentLength: file.contentLength,
      contentType: file.contentType,
      uploadTimestamp: file.uploadTimestamp,
    })
  )

  return {
    files,
    nextFileName: response.data.nextFileName || null,
  }
}

/**
 * Get a signed download URL for a file
 * Returns a URL with auth token that expires after the specified duration
 */
export async function getFileUrl(
  fileName: string,
  validDurationInSeconds: number = DEFAULT_URL_EXPIRATION_SECONDS
): Promise<B2SignedUrl> {
  const b2Client = getB2Client()
  const client = await b2Client.getAuthorizedClient()
  const { bucketId, bucketName } = getB2BucketConfig()

  // Get download authorization token for this specific file
  const authResponse = await client.getDownloadAuthorization({
    bucketId,
    fileNamePrefix: fileName,
    validDurationInSeconds,
  })

  const authToken = authResponse.data.authorizationToken

  // Construct the signed URL
  // B2 download URL format: {downloadUrl}/file/{bucketName}/{fileName}?Authorization={token}
  const downloadUrl = (client as unknown as { downloadUrl: string }).downloadUrl
  const encodedFileName = encodeURIComponent(fileName).replace(/%2F/g, '/')
  const url = `${downloadUrl}/file/${bucketName}/${encodedFileName}?Authorization=${encodeURIComponent(authToken)}`

  return {
    url,
    expiresAt: Date.now() + validDurationInSeconds * 1000,
  }
}

/**
 * Get public URL for a file (only works if bucket is public)
 */
export async function getPublicFileUrl(fileName: string): Promise<string> {
  const b2Client = getB2Client()
  const client = await b2Client.getAuthorizedClient()
  const { bucketName } = getB2BucketConfig()

  const downloadUrl = (client as unknown as { downloadUrl: string }).downloadUrl
  const encodedFileName = encodeURIComponent(fileName).replace(/%2F/g, '/')

  return `${downloadUrl}/file/${bucketName}/${encodedFileName}`
}
