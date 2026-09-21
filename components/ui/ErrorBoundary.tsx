'use client'

import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Button } from './Button'

interface Props {
  children: ReactNode
  /**
   * Rendered in place of the children once they throw. Omit it for the recovery panel below;
   * pass null to drop the subtree silently, which only suits content the page can do without.
   */
  fallback?: ReactNode
  /** What this wraps, for the console message. */
  label: string
}

interface State {
  hasError: boolean
  error?: Error
}

/**
 * Contains a failure to the subtree it wraps.
 *
 * React unmounts the whole tree when a client component throws past every boundary, which on a
 * Next app means the page is replaced by its error page. A boundary keeps that trade the right
 * way round: the fallback shows and the rest of the page survives.
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`${this.props.label} failed and was replaced:`, error, errorInfo.componentStack)
  }

  render() {
    if (this.state.hasError) {
      // Compared against undefined rather than tested for truthiness, so that an explicit
      // fallback={null} drops the subtree silently. A caller who left it out - or passed an
      // undefined by accident - gets the visible panel instead of a blank.
      if (this.props.fallback !== undefined) {
        return this.props.fallback
      }

      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center px-4 py-12">
          <div className="max-w-md text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Something went wrong
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              We apologize for the inconvenience. Please try refreshing the page.
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-6 rounded-lg bg-red-50 p-4 text-left dark:bg-red-900/20">
                <summary className="cursor-pointer font-semibold text-red-800 dark:text-red-400">
                  Error Details
                </summary>
                <pre className="mt-2 overflow-auto text-xs text-red-700 dark:text-red-300">
                  {this.state.error.message}
                  {'\n\n'}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
            <Button
              onClick={() => {
                this.setState({ hasError: false, error: undefined })
                window.location.reload()
              }}
            >
              Refresh Page
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
