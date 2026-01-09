'use client'

import { useState } from 'react'
import type { B2File, B2FileListResponse, B2SignedUrl } from '@/lib/types'

export default function B2FileBrowser() {
  const [prefix, setPrefix] = useState('')
  const [files, setFiles] = useState<B2File[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null)

  async function handleListFiles() {
    setLoading(true)
    setError(null)
    setSelectedFileUrl(null)

    try {
      const params = new URLSearchParams()
      if (prefix) params.set('prefix', prefix)

      const response = await fetch(`/api/b2/files?${params}`)
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to list files')
      }

      const data: B2FileListResponse = await response.json()
      setFiles(data.files)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      setFiles([])
    } finally {
      setLoading(false)
    }
  }

  async function handleGetUrl(fileName: string) {
    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams({ file: fileName })
      const response = await fetch(`/api/b2/file-url?${params}`)

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to get URL')
      }

      const data: B2SignedUrl = await response.json()
      setSelectedFileUrl(data.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
  }

  return (
    <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
      <h2 className="mb-4 text-xl font-semibold">B2 File Browser</h2>

      {/* Search */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={prefix}
          onChange={(e) => setPrefix(e.target.value)}
          placeholder="Enter prefix (e.g., images/)"
          className="flex-1 rounded border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-800"
        />
        <button
          onClick={handleListFiles}
          disabled={loading}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'List Files'}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 rounded bg-red-100 p-3 text-red-700 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Files */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file) => (
            <div
              key={file.fileId}
              className="flex items-center justify-between rounded bg-gray-50 p-3 dark:bg-gray-800"
            >
              <div>
                <p className="font-medium">{file.fileName}</p>
                <p className="text-sm text-gray-500">
                  {formatBytes(file.contentLength)} • {file.contentType}
                </p>
              </div>
              <button
                onClick={() => handleGetUrl(file.fileName)}
                disabled={loading}
                className="rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700 disabled:opacity-50"
              >
                Get URL
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Selected URL */}
      {selectedFileUrl && (
        <div className="mt-4 rounded bg-gray-100 p-3 dark:bg-gray-800">
          <p className="mb-2 text-sm font-medium">Signed URL:</p>
          <a
            href={selectedFileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="break-all text-sm text-blue-600 hover:underline dark:text-blue-400"
          >
            {selectedFileUrl}
          </a>
        </div>
      )}
    </div>
  )
}
