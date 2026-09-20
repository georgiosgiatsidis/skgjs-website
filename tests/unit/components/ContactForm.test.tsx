import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React, { forwardRef, useImperativeHandle, useState } from 'react'

const TOKEN = 'hcaptcha-token-value'

// Mirrors the real widget: hCaptcha injects its own h-captcha-response field
// into the surrounding form and populates it, as well as invoking onVerify.
vi.mock('@hcaptcha/react-hcaptcha', () => ({
  default: forwardRef(function MockHCaptcha(
    { onVerify }: { onVerify?: (token: string) => void },
    ref
  ) {
    const [token, setToken] = useState('')
    useImperativeHandle(ref, () => ({ resetCaptcha: () => setToken('') }))
    return (
      <>
        <textarea name="h-captcha-response" readOnly value={token} data-testid="hcaptcha-field" />
        <button
          type="button"
          onClick={() => {
            setToken(TOKEN)
            onVerify?.(TOKEN)
          }}
        >
          solve captcha
        </button>
      </>
    )
  }),
}))

import { ContactForm } from '@/components/contact/ContactForm'

describe('ContactForm', () => {
  let fetchMock: ReturnType<typeof vi.fn>

  beforeEach(() => {
    fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true }) })
    vi.stubGlobal('fetch', fetchMock)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  async function fillAndSubmit() {
    const user = userEvent.setup()
    await user.type(screen.getByLabelText('Name'), 'Test User')
    await user.type(screen.getByLabelText('Email'), 'test@example.com')
    await user.type(screen.getByLabelText('Subject'), 'Test subject')
    await user.type(screen.getByLabelText('Message'), 'Test message')
    await user.click(screen.getByRole('button', { name: 'solve captcha' }))
    await user.click(screen.getByRole('button', { name: /send message/i }))
    return user
  }

  it('should keep submit disabled until the captcha is solved', async () => {
    const user = userEvent.setup()
    render(<ContactForm accessKey="test-key" />)

    expect(screen.getByRole('button', { name: /send message/i })).toBeDisabled()
    await user.click(screen.getByRole('button', { name: 'solve captcha' }))
    expect(screen.getByRole('button', { name: /send message/i })).toBeEnabled()
  })

  it('should submit the captcha token exactly once', async () => {
    render(<ContactForm accessKey="test-key" />)
    await fillAndSubmit()

    await waitFor(() => expect(fetchMock).toHaveBeenCalled())
    const body = fetchMock.mock.calls[0][1].body as FormData

    // Submitting the field twice makes Web3Forms reject the token with
    // "Could not validate hCaptcha".
    expect(body.getAll('h-captcha-response')).toEqual([TOKEN])
  })

  it('should submit the configured access key', async () => {
    render(<ContactForm accessKey="test-key" />)
    await fillAndSubmit()

    await waitFor(() => expect(fetchMock).toHaveBeenCalled())
    const body = fetchMock.mock.calls[0][1].body as FormData
    expect(body.get('access_key')).toBe('test-key')
  })
})
