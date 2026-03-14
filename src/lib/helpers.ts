import { type Locale, type MultiLangText } from '@/types/database'

/**
 * Get text in the current locale, falling back to English then Spanish
 */
export function t(text: MultiLangText | null | undefined, locale: Locale): string {
  if (!text) return ''
  return text[locale] || text['en'] || text['es'] || Object.values(text)[0] || ''
}

/**
 * Format price with currency
 */
export function formatPrice(price: number, currency: string = 'EUR'): string {
  return new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price)
}

/**
 * Generate star rating display
 */
export function formatRating(rating: number): string {
  return rating.toFixed(1)
}

/**
 * Truncate text to a maximum length
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + '...'
}

/**
 * Generate slug from text
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
