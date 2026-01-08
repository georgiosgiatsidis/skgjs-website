import { NextRequest, NextResponse } from 'next/server'
import { listFiles } from '@/utils/b2Utils'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const prefix = searchParams.get('prefix') || ''
    const maxCount = parseInt(searchParams.get('maxCount') || '100', 10)

    // Validate maxCount
    if (isNaN(maxCount) || maxCount < 1 || maxCount > 10000) {
      return NextResponse.json(
        { error: 'maxCount must be between 1 and 10000' },
        { status: 400 }
      )
    }

    const result = await listFiles(prefix, maxCount)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error listing B2 files:', error)

    const message = error instanceof Error ? error.message : 'Unknown error'

    // Don't expose internal errors to client
    if (message.includes('B2_')) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to list files' },
      { status: 500 }
    )
  }
}
