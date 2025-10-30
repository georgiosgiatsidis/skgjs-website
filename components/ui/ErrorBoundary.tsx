'use client'

import { Component, ReactNode } from 'react'
import { Button } from './Button'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
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
