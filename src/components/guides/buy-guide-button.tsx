'use client'

import { useState } from 'react'
import { useLocale } from 'next-intl'
import { toast } from 'sonner'
import { ShoppingCart, Loader2 } from 'lucide-react'

interface BuyGuideButtonProps {
  guideId: string
  price: string
  disabled?: boolean
  label?: string
  className?: string
}

export function BuyGuideButton({ guideId, price, disabled, label, className }: BuyGuideButtonProps) {
  const [loading, setLoading] = useState(false)
  const locale = useLocale()

  const defaultLabels: Record<string, string> = {
    es: 'Comprar',
    en: 'Buy Now',
    de: 'Jetzt kaufen',
    fr: 'Acheter',
    ru: 'Купить',
    it: 'Acquista',
  }

  const comingSoonLabels: Record<string, string> = {
    es: 'Próximamente',
    en: 'Coming Soon',
    de: 'Demnächst',
    fr: 'Bientôt',
    ru: 'Скоро',
    it: 'Prossimamente',
  }

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

  if (disabled) {
    return (
      <button
        disabled
        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 text-gray-500 text-sm font-medium cursor-not-allowed border border-white/5 ${className || ''}`}
      >
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
      {label || defaultLabels[locale] || defaultLabels.en} — {price}€
    </button>
  )
}
