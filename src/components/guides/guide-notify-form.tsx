'use client'

import { useState } from 'react'
import { useLocale } from 'next-intl'
import { toast } from 'sonner'
import { Link } from '@/i18n/routing'

interface GuideNotifyFormProps {
  placeholder: string
  buttonText: string
}

export function GuideNotifyForm({ placeholder, buttonText }: GuideNotifyFormProps) {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [loading, setLoading] = useState(false)
  const locale = useLocale()

  const consentLabels: Record<string, string> = {
    es: 'Acepto recibir comunicaciones y he leído la',
    en: 'I agree to receive communications and have read the',
    de: 'Ich stimme dem Erhalt von Mitteilungen zu und habe die',
    fr: "J'accepte de recevoir des communications et j'ai lu la",
    ru: 'Я согласен получать сообщения и ознакомился с',
    it: 'Accetto di ricevere comunicazioni e ho letto la',
  }

  const privacyLinkLabels: Record<string, string> = {
    es: 'Política de Privacidad',
    en: 'Privacy Policy',
    de: 'Datenschutzrichtlinie',
    fr: 'Politique de Confidentialité',
    ru: 'Политикой конфиденциальности',
    it: 'Informativa sulla Privacy',
  }

  const successMessages: Record<string, string> = {
    es: '¡Te avisaremos cuando estén disponibles!',
    en: "We'll notify you when they're available!",
    de: 'Wir benachrichtigen Sie, wenn sie verfügbar sind!',
    fr: 'Nous vous préviendrons quand ils seront disponibles !',
    ru: 'Мы уведомим вас, когда они станут доступны!',
    it: 'Ti avviseremo quando saranno disponibili!',
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!email || !consent) {
      if (!consent) {
        toast.error(
          locale === 'es'
            ? 'Debes aceptar la política de privacidad'
            : 'You must accept the privacy policy'
        )
      }
      return
    }

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
        toast.success(successMessages[locale] || successMessages.en)
        setEmail('')
        setConsent(false)
      } else if (res.status === 409) {
        toast.success(
          locale === 'es'
            ? '¡Ya estás en nuestra lista!'
            : "You're already on our list!"
        )
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
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          required
          className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors"
        />
        <button
          type="submit"
          disabled={loading || !consent}
          className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? '...' : buttonText}
        </button>
      </div>

      {/* RGPD consent checkbox */}
      <label className="mt-3 flex items-start gap-2 cursor-pointer group">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/5 text-orange-500 focus:ring-orange-500/50 accent-orange-500"
        />
        <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors text-left">
          {consentLabels[locale] || consentLabels.en}{' '}
          <Link href="/privacidad" className="text-orange-400 hover:underline">
            {privacyLinkLabels[locale] || privacyLinkLabels.en}
          </Link>
        </span>
      </label>
    </form>
  )
}
