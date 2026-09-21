'use client'

import { Component, type ErrorInfo, type ReactNode } from 'react'

interface DecorativeBoundaryProps {
  children: ReactNode
  /** What this wraps, for the console message. */
  label: string
}

interface DecorativeBoundaryState {
  failed: boolean
}

/**
 * Contains a failure in purely decorative content.
 *
 * React unmounts the whole tree when a client component throws past every boundary, which on a
 * Next app means the page is replaced by its error page. For an animation sitting behind the hero
 * that trade is wrong: losing the decoration is fine, losing the page is not.
 */
export class DecorativeBoundary extends Component<
  DecorativeBoundaryProps,
  DecorativeBoundaryState
> {
  state: DecorativeBoundaryState = { failed: false }

  static getDerivedStateFromError(): DecorativeBoundaryState {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`${this.props.label} failed and was dropped:`, error, info.componentStack)
  }

  render() {
    return this.state.failed ? null : this.props.children
  }
}
