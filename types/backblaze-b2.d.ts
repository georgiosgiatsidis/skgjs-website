declare module 'backblaze-b2' {
  interface B2Options {
    applicationKeyId: string
    applicationKey: string
    axios?: unknown
    retry?: {
      retries?: number
      retryDelay?: (retryCount: number, error: unknown) => number
    }
  }

  interface B2Response<T = unknown> {
    status: number
    statusText: string
    headers: Record<string, string>
    config: unknown
    request: unknown
    data: T
  }

  interface AuthorizeResponse {
    absoluteMinimumPartSize: number
    accountId: string
    allowed: {
      bucketId: string | null
      bucketName: string | null
      capabilities: string[]
      namePrefix: string | null
    }
    apiUrl: string
    authorizationToken: string
    downloadUrl: string
    recommendedPartSize: number
    s3ApiUrl: string
  }

  interface ListFileNamesOptions {
    bucketId: string
    startFileName?: string
    maxFileCount?: number
    prefix?: string
    delimiter?: string
  }

  interface B2FileInfo {
    accountId: string
    action: string
    bucketId: string
    contentLength: number
    contentMd5: string | null
    contentSha1: string
    contentType: string
    fileId: string
    fileInfo: Record<string, string>
    fileName: string
    uploadTimestamp: number
  }

  interface ListFileNamesResponse {
    files: B2FileInfo[]
    nextFileName: string | null
  }

  interface GetDownloadAuthorizationOptions {
    bucketId: string
    fileNamePrefix: string
    validDurationInSeconds: number
    b2ContentDisposition?: string
  }

  interface DownloadAuthorizationResponse {
    bucketId: string
    fileNamePrefix: string
    authorizationToken: string
  }

  interface DownloadFileOptions {
    bucketName?: string
    fileName?: string
    fileId?: string
    responseType?: string
    onDownloadProgress?: (event: ProgressEvent) => void
  }

  class B2 {
    downloadUrl: string

    constructor(options: B2Options)

    authorize(): Promise<B2Response<AuthorizeResponse>>

    listFileNames(
      options: ListFileNamesOptions
    ): Promise<B2Response<ListFileNamesResponse>>

    getDownloadAuthorization(
      options: GetDownloadAuthorizationOptions
    ): Promise<B2Response<DownloadAuthorizationResponse>>

    downloadFileByName(
      options: DownloadFileOptions
    ): Promise<B2Response<ArrayBuffer>>

    downloadFileById(
      options: DownloadFileOptions
    ): Promise<B2Response<ArrayBuffer>>
  }

  export = B2
}
