import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'

const BASE_URL = 'https://www.tenerifeexperiences.com'
const locales = ['en', 'es', 'de', 'fr', 'ru', 'it']

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

function alternateRefs(path: string) {
  return locales.map((locale) => ({
    hreflang: locale,
    href: `${BASE_URL}/${locale}${path}`,
  }))
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = []

  // Static pages per locale
  const staticPaths = ['', '/blog']
  for (const path of staticPaths) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === '' ? 'daily' : 'weekly',
        priority: path === '' ? 1.0 : 0.7,
        alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${BASE_URL}/${l}${path}`])) },
      })
    }
  }

  // Categories
  const { data: categories } = await supabase
    .from('categories')
    .select('slug')
    .eq('visible', true)

  if (categories) {
    for (const cat of categories) {
      for (const locale of locales) {
        entries.push({
          url: `${BASE_URL}/${locale}/${cat.slug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.8,
          alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${BASE_URL}/${l}/${cat.slug}`])) },
        })
      }
    }
  }

  // Subcategories
  const { data: subcategories } = await supabase
    .from('subcategories')
    .select('slug, category:categories(slug)')
    .eq('visible', true)

  if (subcategories) {
    for (const sub of subcategories) {
      const catSlug = (sub.category as any)?.slug
      if (!catSlug) continue
      const path = `/${catSlug}/${sub.slug}`
      for (const locale of locales) {
        entries.push({
          url: `${BASE_URL}/${locale}${path}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.7,
          alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${BASE_URL}/${l}${path}`])) },
        })
      }
    }
  }

  // Items
  const { data: items } = await supabase
    .from('items')
    .select('slug, updated_at, subcategory:subcategories(slug, category:categories(slug))')
    .eq('visible', true)

  if (items) {
    for (const item of items) {
      const sub = item.subcategory as any
      const catSlug = sub?.category?.slug
      const subSlug = sub?.slug
      if (!catSlug || !subSlug) continue
      const path = `/${catSlug}/${subSlug}/${item.slug}`
      for (const locale of locales) {
        entries.push({
          url: `${BASE_URL}/${locale}${path}`,
          lastModified: item.updated_at ? new Date(item.updated_at) : new Date(),
          changeFrequency: 'weekly',
          priority: 0.6,
          alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${BASE_URL}/${l}${path}`])) },
        })
      }
    }
  }

  // Articles
  const { data: articles } = await supabase
    .from('articles')
    .select('slug, updated_at, published_at')
    .eq('published', true)

  if (articles) {
    for (const article of articles) {
      const path = `/blog/${article.slug}`
      for (const locale of locales) {
        entries.push({
          url: `${BASE_URL}/${locale}${path}`,
          lastModified: article.updated_at ? new Date(article.updated_at) : new Date(),
          changeFrequency: 'monthly',
          priority: 0.6,
          alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${BASE_URL}/${l}${path}`])) },
        })
      }
    }
  }

  // Areas
  const { data: areas } = await supabase
    .from('areas')
    .select('slug')

  if (areas) {
    for (const area of areas) {
      const path = `/areas/${area.slug}`
      for (const locale of locales) {
        entries.push({
          url: `${BASE_URL}/${locale}${path}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.6,
          alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${BASE_URL}/${l}${path}`])) },
        })
      }
    }
  }

  return entries
}
