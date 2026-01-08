import { NextRequest, NextResponse } from 'next/server'
import { getFileUrl } from '@/utils/b2Utils'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const fileName = searchParams.get('file')
    const expirationStr = searchParams.get('expiration')

    if (!fileName) {
      return NextResponse.json(
        { error: 'file parameter is required' },
        { status: 400 }
      )
    }

    // Validate and sanitize fileName - prevent path traversal
    if (fileName.includes('..') || fileName.startsWith('/')) {
      return NextResponse.json(
        { error: 'Invalid file name' },
        { status: 400 }
      )
    }

    // Default 1 hour, max 7 days (604800 seconds - B2 limit)
    let expiration = 3600
    if (expirationStr) {
      expiration = parseInt(expirationStr, 10)
      if (isNaN(expiration) || expiration < 1 || expiration > 604800) {
        return NextResponse.json(
          { error: 'expiration must be between 1 and 604800 seconds' },
          { status: 400 }
        )
      }
    }

    const result = await getFileUrl(fileName, expiration)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error getting B2 file URL:', error)

    const message = error instanceof Error ? error.message : 'Unknown error'

    // Don't expose internal errors to client
    if (message.includes('B2_')) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to get file URL' },
      { status: 500 }
    )
  }
}
