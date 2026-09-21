import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'

function Exploding(): never {
  throw new Error('no WebGL context')
}

// React logs the caught error itself; keep the suite output readable.
function silenceConsole() {
  return vi.spyOn(console, 'error').mockImplementation(() => {})
}

describe('ErrorBoundary', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders its children when nothing throws', () => {
    render(
      <ErrorBoundary label="Test subtree">
        <p>content</p>
      </ErrorBoundary>
    )

    expect(screen.getByText('content')).toBeInTheDocument()
  })

  it('shows the recovery panel when no fallback is given', () => {
    silenceConsole()

    render(
      <ErrorBoundary label="Test subtree">
        <Exploding />
      </ErrorBoundary>
    )

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  it('renders a given fallback instead of the panel', () => {
    silenceConsole()

    render(
      <ErrorBoundary label="Test subtree" fallback={<p>quietly replaced</p>}>
        <Exploding />
      </ErrorBoundary>
    )

    expect(screen.getByText('quietly replaced')).toBeInTheDocument()
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument()
  })

  // How the hero wraps its background animation: losing the decoration is fine, and the panel
  // would be worse than nothing behind it.
  it('drops the subtree silently when the fallback is explicitly null', () => {
    silenceConsole()

    render(
      <div>
        <span>rest of the page</span>
        <ErrorBoundary label="Test subtree" fallback={null}>
          <Exploding />
        </ErrorBoundary>
      </div>
    )

    expect(screen.getByText('rest of the page')).toBeInTheDocument()
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument()
  })

  it('names what failed in the console message', () => {
    const consoleError = silenceConsole()

    render(
      <ErrorBoundary label="Hero background animation" fallback={null}>
        <Exploding />
      </ErrorBoundary>
    )

    expect(consoleError).toHaveBeenCalledWith(
      'Hero background animation failed and was replaced:',
      expect.any(Error),
      expect.anything()
    )
  })
})
