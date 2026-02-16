'use client'

import { useState, FormEvent } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { clsx } from 'clsx'

export function ContactForm() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormState('submitting')
    setErrorMessage('')

    const formData = new FormData(e.currentTarget)

    // Honeypot check
    if (formData.get('botcheck')) {
      setFormState('error')
      setErrorMessage('Bot detected')
      return
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setFormState('success')
        ;(e.target as HTMLFormElement).reset()
      } else {
        setFormState('error')
        setErrorMessage(data.message || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setFormState('error')
      setErrorMessage('Network error. Please check your connection and try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6">
      <input type="hidden" name="access_key" value={process.env.NEXT_PUBLIC_WEB3FORMS_KEY || ''} />
      <input type="hidden" name="subject" value="SKG JS Contact Form Submission" />
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          label="Name"
          name="name"
          type="text"
          required
          placeholder="Your name"
          disabled={formState === 'submitting'}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          required
          placeholder="your@email.com"
          disabled={formState === 'submitting'}
        />
      </div>

      <Input
        label="Subject"
        name="subject"
        type="text"
        required
        placeholder="What is this about?"
        disabled={formState === 'submitting'}
      />

      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          placeholder="Your message..."
          disabled={formState === 'submitting'}
          className={clsx(
            'w-full rounded-lg border border-gray-300 px-4 py-2 transition-colors',
            'focus:border-js-yellow focus:outline-none focus:ring-2 focus:ring-js-yellow focus:ring-opacity-50',
            'dark:border-gray-600 dark:bg-gray-700 dark:text-white',
            'disabled:cursor-not-allowed disabled:opacity-50'
          )}
        />
      </div>

      {formState === 'success' && (
        <div className="rounded-lg bg-green-50 p-4 text-green-800 dark:bg-green-900/30 dark:text-green-200">
          <p className="font-semibold">Thank you for your message!</p>
          <p className="text-sm">We&apos;ll get back to you as soon as possible.</p>
        </div>
      )}

      {formState === 'error' && (
        <div className="rounded-lg bg-red-50 p-4 text-red-800 dark:bg-red-900/30 dark:text-red-200">
          <p className="font-semibold">Error</p>
          <p className="text-sm">{errorMessage}</p>
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={formState === 'submitting'}
        className="w-full sm:w-auto"
      >
        {formState === 'submitting' ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  )
}
