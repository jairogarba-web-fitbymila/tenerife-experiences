'use client'

import { useState } from 'react'
import { useLocale } from 'next-intl'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

interface NewsletterFormProps {
  placeholder: string
  ctaText: string
  privacyText: string
}

export function NewsletterForm({ placeholder, ctaText, privacyText }: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const locale = useLocale()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!email) return

    setLoading(true)

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, locale }),
      })

      const data = await res.json()

      if (res.ok) {
        toast.success('Successfully subscribed!')
        setEmail('')
      } else {
        toast.error(data.error || 'Something went wrong')
      }
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          required
          className="flex-1 bg-slate-900/80 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-orange-400/50"
        />
        <Button
          type="submit"
          disabled={loading}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 rounded-xl disabled:opacity-50"
        >
          {loading ? '...' : ctaText}
        </Button>
      </div>
      <p className="mt-3 text-xs text-gray-500">
        {privacyText}
      </p>
    </form>
  )
}
