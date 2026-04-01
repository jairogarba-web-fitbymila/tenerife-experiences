const locales = ['es', 'en', 'de', 'fr', 'ru', 'it'] as const

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tenerifeexperiences.com'

export function buildAlternates(locale: string, path: string = '') {
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  const languages: Record<string, string> = {}

  for (const loc of locales) {
    languages[loc] = `${baseUrl}/${loc}${cleanPath}`
  }
  languages['x-default'] = `${baseUrl}/es${cleanPath}`

  return {
    canonical: `${baseUrl}/${locale}${cleanPath}`,
    languages,
  }
}
