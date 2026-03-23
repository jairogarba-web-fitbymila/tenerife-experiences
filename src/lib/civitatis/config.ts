/**
 * Civitatis Affiliate Integration Config
 *
 * Once approved, set NEXT_PUBLIC_CIVITATIS_AID in .env.local
 * and flip NEXT_PUBLIC_CIVITATIS_ENABLED to "true"
 */

export const CIVITATIS_CONFIG = {
  baseUrl: 'https://www.civitatis.com',
  aid: process.env.NEXT_PUBLIC_CIVITATIS_AID || '',
  enabled: process.env.NEXT_PUBLIC_CIVITATIS_ENABLED === 'true',
  cookieDays: 30,
  commission: {
    base: 0.08,
    premium: 0.10,
    freeTourPerPerson: 1.0,
  },
  destination: 'tenerife',
}

/** Locale map: our locale → Civitatis locale prefix */
const LOCALE_MAP: Record<string, string> = {
  es: 'es',
  en: 'en',
  de: 'de',
  fr: 'fr',
  ru: 'ru',
  it: 'it',
}

/**
 * Build a Civitatis affiliate URL
 * @param path - Path after locale, e.g. "tenerife/avistamiento-cetaceos"
 * @param locale - User's current locale
 */
export function buildCivitatisUrl(path: string, locale: string = 'es'): string {
  const { baseUrl, aid, enabled } = CIVITATIS_CONFIG
  const civiLocale = LOCALE_MAP[locale] || 'en'

  const url = `${baseUrl}/${civiLocale}/${path}`

  if (!enabled || !aid) return url
  return `${url}${url.includes('?') ? '&' : '?'}aid=${aid}`
}

/**
 * Build a Civitatis destination URL (all Tenerife activities)
 */
export function buildCivitatisDestinationUrl(locale: string = 'es'): string {
  return buildCivitatisUrl('tenerife/', locale)
}

/**
 * Check if Civitatis integration is active
 */
export function isCivitatisEnabled(): boolean {
  return CIVITATIS_CONFIG.enabled && !!CIVITATIS_CONFIG.aid
}
