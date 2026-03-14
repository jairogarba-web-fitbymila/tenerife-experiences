import { Locale } from '@/types/database'

export const defaultLocale: Locale = 'en'
export const locales: Locale[] = ['es', 'en', 'de', 'fr', 'ru', 'it']

export const localeNames: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
  de: 'Deutsch',
  fr: 'Français',
  ru: 'Русский',
  it: 'Italiano',
}

export const localeFlags: Record<Locale, string> = {
  es: '🇪🇸',
  en: '🇬🇧',
  de: '🇩🇪',
  fr: '🇫🇷',
  ru: '🇷🇺',
  it: '🇮🇹',
}
