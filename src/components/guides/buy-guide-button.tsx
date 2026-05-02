'use client'

import { useState } from 'react'
import { useLocale } from 'next-intl'
import { toast } from 'sonner'
import { ShoppingCart, Loader2, Bell, CheckCircle2, X } from 'lucide-react'

interface BuyGuideButtonProps {
  guideId: string
  price: string
  disabled?: boolean
  label?: string
  className?: string
}

const defaultLabels: Record<string, string> = {
  es: 'Comprar',
  en: 'Buy Now',
  de: 'Jetzt kaufen',
  fr: 'Acheter',
  ru: 'Купить',
  it: 'Acquista',
}

const comingSoonLabels: Record<string, string> = {
  es: 'Avísame',
  en: 'Notify me',
  de: 'Benachrichtigen',
  fr: 'M’avertir',
  ru: 'Сообщить',
  it: 'Avvisami',
}

const notifyHelper: Record<string, string> = {
  es: 'Te avisamos cuando salga',
  en: 'We’ll email you on launch',
  de: 'Wir benachrichtigen dich',
  fr: 'On te prévient au lancement',
  ru: 'Сообщим, когда выйдет',
  it: 'Ti avvisiamo al lancio',
}

const successLabels: Record<string, string> = {
  es: '¡Listo! Te avisaremos.',
  en: 'Done! We’ll let you know.',
  de: 'Erledigt! Wir melden uns.',
  fr: 'Fait ! On te tient au courant.',
  ru: 'Готово! Сообщим тебе.',
  it: 'Fatto! Ti avvisiamo.',
}

const emailPlaceholder: Record<string, string> = {
  es: 'tu@email.com',
  en: 'you@email.com',
  de: 'du@email.com',
  fr: 'toi@email.com',
  ru: 'ты@email.com',
  it: 'tu@email.com',
}

export function BuyGuideButton({ guideId, price, disabled, label, className }: BuyGuideButtonProps) {
  const [loading, setLoading] = useState(false)
  const [notifyOpen, setNotifyOpen] = useState(false)
  const [notifyEmail, setNotifyEmail] = useState('')
  const [notifyDone, setNotifyDone] = useState(false)
  const [notifyLoading, setNotifyLoading] = useState(false)
  const locale = useLocale()

  async function handleBuy() {
    if (disabled) return
    setLoading(true)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guideId, locale }),
      })

      const data = await res.json()

      if (res.ok && data.url) {
        window.location.href = data.url
      } else {
        toast.error(data.error || 'Something went wrong')
        setLoading(false)
      }
    } catch {
      toast.error('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  async function handleNotifySubmit(e: React.FormEvent) {
    e.preventDefault()
    if (notifyLoading) return
    setNotifyLoading(true)
    try {
      const res = await fetch('/api/guides/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guideId, email: notifyEmail, locale }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        setNotifyDone(true)
      } else {
        toast.error(
          data?.error === 'invalid_email'
            ? locale === 'es' ? 'Revisa tu correo' : 'Check your email'
            : locale === 'es' ? 'No se ha podido guardar' : 'Could not save',
        )
      }
    } catch {
      toast.error(locale === 'es' ? 'Algo salió mal' : 'Something went wrong')
    } finally {
      setNotifyLoading(false)
    }
  }

  if (disabled) {
    if (notifyDone) {
      return (
        <div
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 text-emerald-300 text-sm font-medium border border-emerald-500/20 ${className || ''}`}
        >
          <CheckCircle2 className="h-4 w-4" />
          {successLabels[locale] || successLabels.en}
        </div>
      )
    }

    if (notifyOpen) {
      return (
        <form
          onSubmit={handleNotifySubmit}
          className={`inline-flex flex-col sm:flex-row items-stretch gap-2 ${className || ''}`}
        >
          <input
            type="email"
            value={notifyEmail}
            onChange={(e) => setNotifyEmail(e.target.value)}
            placeholder={emailPlaceholder[locale] || emailPlaceholder.en}
            required
            autoFocus
            disabled={notifyLoading}
            className="flex-1 sm:w-56 px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-sm placeholder-gray-500 outline-none focus:border-orange-400/60"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={notifyLoading}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-colors disabled:opacity-70"
            >
              {notifyLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Bell className="h-4 w-4" />
              )}
              {comingSoonLabels[locale] || comingSoonLabels.en}
            </button>
            <button
              type="button"
              onClick={() => {
                setNotifyOpen(false)
                setNotifyEmail('')
              }}
              aria-label="cancel"
              className="px-2 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/30"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </form>
      )
    }

    return (
      <button
        type="button"
        onClick={() => setNotifyOpen(true)}
        title={notifyHelper[locale] || notifyHelper.en}
        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-orange-500/10 hover:text-orange-300 text-gray-300 text-sm font-medium border border-white/10 hover:border-orange-500/30 transition-colors ${className || ''}`}
      >
        <Bell className="h-4 w-4" />
        {comingSoonLabels[locale] || comingSoonLabels.en}
      </button>
    )
  }

  return (
    <button
      onClick={handleBuy}
      disabled={loading}
      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-colors disabled:opacity-70 ${className || ''}`}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <ShoppingCart className="h-4 w-4" />
      )}
      {label || defaultLabels[locale] || defaultLabels.en}
      <span className="hidden sm:inline">— {price}€</span>
    </button>
  )
}
