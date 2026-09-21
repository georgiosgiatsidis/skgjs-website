import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DecorativeBoundary } from '@/components/ui/DecorativeBoundary'

function Exploding(): never {
  throw new Error('no WebGL context')
}

describe('DecorativeBoundary', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders its children when nothing throws', () => {
    render(
      <DecorativeBoundary label="Test decoration">
        <p>decoration</p>
      </DecorativeBoundary>
    )

    expect(screen.getByText('decoration')).toBeInTheDocument()
  })

  it('drops the decoration instead of the page when a child throws', () => {
    // React logs the caught error itself; keep the suite output readable.
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <div>
        <span>rest of the page</span>
        <DecorativeBoundary label="Test decoration">
          <Exploding />
        </DecorativeBoundary>
      </div>
    )

    expect(screen.getByText('rest of the page')).toBeInTheDocument()
    expect(screen.queryByText('decoration')).not.toBeInTheDocument()
    expect(consoleError).toHaveBeenCalled()
  })
})
