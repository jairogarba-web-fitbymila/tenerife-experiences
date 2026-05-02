'use client'

import { useState, useRef } from 'react'
import { useLocale } from 'next-intl'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/routing'

const LOADING_LABEL: Record<string, string> = {
  es: 'Enviando…',
  en: 'Submitting…',
  de: 'Wird gesendet…',
  fr: 'Envoi…',
  ru: 'Отправка…',
  it: 'Invio…',
}

interface NewsletterFormProps {
  placeholder: string
  ctaText: string
  privacyText: string
  /** Optional: consent label override */
  consentLabel?: string
}

export function NewsletterForm({ placeholder, ctaText, privacyText, consentLabel }: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [highlightConsent, setHighlightConsent] = useState(false)
  const consentRef = useRef<HTMLLabelElement>(null)
  const locale = useLocale()

  const defaultConsentLabel: Record<string, string> = {
    es: 'Acepto recibir comunicaciones y he leído la',
    en: 'I agree to receive communications and have read the',
    de: 'Ich stimme dem Erhalt von Mitteilungen zu und habe die',
    fr: "J'accepte de recevoir des communications et j'ai lu la",
    ru: 'Я согласен получать сообщения и ознакомился с',
    it: 'Accetto di ricevere comunicazioni e ho letto la',
  }

  const privacyLinkLabel: Record<string, string> = {
    es: 'Política de Privacidad',
    en: 'Privacy Policy',
    de: 'Datenschutzrichtlinie',
    fr: 'Politique de Confidentialité',
    ru: 'Политикой конфиденциальности',
    it: 'Informativa sulla Privacy',
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!consent) {
      setHighlightConsent(true)
      consentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      toast.error(
        locale === 'es'
          ? 'Marca la casilla de privacidad para continuar'
          : 'Tick the privacy box to continue',
      )
      window.setTimeout(() => setHighlightConsent(false), 2400)
      return
    }
    if (!email) return

    setLoading(true)

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          locale,
          consent_given: true,
          consent_date: new Date().toISOString(),
        }),
      })

      const data = await res.json()

      if (res.ok) {
        toast.success(locale === 'es' ? '¡Suscrito correctamente!' : 'Successfully subscribed!')
        setEmail('')
        setConsent(false)
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
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 rounded-xl disabled:opacity-60"
        >
          {loading ? (LOADING_LABEL[locale] || LOADING_LABEL.en) : ctaText}
        </Button>
      </div>

      {/* RGPD consent checkbox */}
      <label
        ref={consentRef}
        className={`mt-3 flex items-start gap-2 cursor-pointer group rounded-md p-1.5 -m-1.5 transition-all duration-300 ${
          highlightConsent ? 'ring-1 ring-red-400/60 bg-red-500/5 animate-pulse' : ''
        }`}
      >
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          aria-required="true"
          className={`mt-0.5 h-4 w-4 rounded bg-white/5 text-orange-500 focus:ring-orange-500/50 accent-orange-500 transition-colors ${
            highlightConsent ? 'border-red-400' : 'border-white/20'
          }`}
        />
        <span className={`text-xs transition-colors ${highlightConsent ? 'text-red-200' : 'text-gray-500 group-hover:text-gray-400'}`}>
          <span className="text-orange-400 mr-0.5">*</span>
          {consentLabel || defaultConsentLabel[locale] || defaultConsentLabel.en}{' '}
          <Link href="/privacidad" className="text-orange-400 hover:underline">
            {privacyLinkLabel[locale] || privacyLinkLabel.en}
          </Link>
        </span>
      </label>

      <p className="mt-2 text-xs text-gray-600">
        {privacyText}
      </p>
    </form>
  )
}
