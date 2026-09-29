'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState, type ComponentProps } from 'react'

// Split out so three.js is only downloaded where the animation actually runs.
const LiquidEther = dynamic(() => import('./LiquidEther'), { ssr: false })

// The effect is decorative and mouse-driven: on touch and small screens it adds little and costs
// battery and bytes, and reduced-motion users asked for no animation.
const SKIP_QUERY = '(pointer: coarse), (max-width: 767px), (prefers-reduced-motion: reduce)'

/**
 * Mounts LiquidEther only after the page has loaded and the browser is idle, so the WebGL setup
 * never competes with the content visitors came for.
 */
export function DeferredLiquidEther(props: ComponentProps<typeof LiquidEther>) {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (window.matchMedia(SKIP_QUERY).matches) return

    let idleId: number | undefined
    let timeoutId: ReturnType<typeof setTimeout> | undefined

    const scheduleMount = () => {
      // Safari has no requestIdleCallback.
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(() => setEnabled(true), { timeout: 2000 })
      } else {
        timeoutId = setTimeout(() => setEnabled(true), 200)
      }
    }

    if (document.readyState === 'complete') {
      scheduleMount()
    } else {
      window.addEventListener('load', scheduleMount, { once: true })
    }

    return () => {
      window.removeEventListener('load', scheduleMount)
      if (idleId !== undefined) window.cancelIdleCallback(idleId)
      if (timeoutId !== undefined) clearTimeout(timeoutId)
    }
  }, [])

  return enabled ? <LiquidEther {...props} /> : null
}
