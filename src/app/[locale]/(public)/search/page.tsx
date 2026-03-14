import { createClient } from '@/lib/supabase/server'
import { Link } from '@/i18n/routing'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, MapPin, Star, FileText, Store } from 'lucide-react'
import { t as getLocalizedText } from '@/lib/helpers'
import type { Locale } from '@/types/database'
import { SearchInput } from './search-input'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const titles: Record<string, string> = {
    es: 'Buscar - Tenerife Experiences',
    en: 'Search - Tenerife Experiences',
    de: 'Suche - Tenerife Experiences',
  }
  return {
    title: titles[locale] || titles.en,
  }
}

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ q?: string }>
}) {
  const { locale } = await params
  const { q } = await searchParams
  const query = q?.trim() || ''
  const loc = locale as Locale

  const labels: Record<string, Record<string, string>> = {
    title: { es: 'Buscar', en: 'Search', de: 'Suche' },
    placeholder: { es: 'Buscar experiencias, artículos, lugares...', en: 'Search experiences, articles, places...', de: 'Erfahrungen, Artikel, Orte suchen...' },
    experiences: { es: 'Experiencias', en: 'Experiences', de: 'Erlebnisse' },
    articles: { es: 'Artículos', en: 'Articles', de: 'Artikel' },
    partners: { es: 'Colaboradores', en: 'Partners', de: 'Partner' },
    noResults: { es: 'No se encontraron resultados', en: 'No results found', de: 'Keine Ergebnisse gefunden' },
    tryDifferent: { es: 'Intenta con otros términos de búsqueda', en: 'Try different search terms', de: 'Versuchen Sie andere Suchbegriffe' },
    startSearching: { es: 'Escribe algo para buscar', en: 'Type something to search', de: 'Geben Sie etwas ein, um zu suchen' },
    resultsFor: { es: 'Resultados para', en: 'Results for', de: 'Ergebnisse für' },
  }

  let items: Record<string, unknown>[] = []
  let articles: Record<string, unknown>[] = []
  let partners: Record<string, unknown>[] = []

  if (query) {
    const supabase = await createClient()
    const searchPattern = `%${query}%`

    // Search items by name->en and description->en
    const { data: itemResults } = await supabase
      .from('items')
      .select('id, slug, name, short_description, image, rating, area, subcategory:subcategories(slug, category:categories(slug))')
      .eq('visible', true)
      .or(`name->>en.ilike.${searchPattern},description->>en.ilike.${searchPattern},name->>es.ilike.${searchPattern}`)
      .limit(12)

    // Search articles by title->en and content->en
    const { data: articleResults } = await supabase
      .from('articles')
      .select('id, slug, title, excerpt, image, published_at')
      .eq('published', true)
      .or(`title->>en.ilike.${searchPattern},content->>en.ilike.${searchPattern},title->>es.ilike.${searchPattern}`)
      .limit(12)

    // Search partners by name and description->en
    const { data: partnerResults } = await supabase
      .from('partners')
      .select('id, slug, name, description, image, type, area')
      .eq('visible', true)
      .or(`name.ilike.${searchPattern},description->>en.ilike.${searchPattern}`)
      .limit(12)

    items = (itemResults || []) as Record<string, unknown>[]
    articles = (articleResults || []) as Record<string, unknown>[]
    partners = (partnerResults || []) as Record<string, unknown>[]
  }

  const totalResults = items.length + articles.length + partners.length

  return (
    <>
      {/* Hero */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white text-center mb-8">
            {labels.title[locale] || labels.title.en}
          </h1>
          <SearchInput
            defaultValue={query}
            placeholder={labels.placeholder[locale] || labels.placeholder.en}
          />
        </div>
      </section>

      {/* Results */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {query && totalResults > 0 && (
            <p className="text-sm text-gray-500 mb-8">
              {totalResults} {labels.resultsFor[locale] || labels.resultsFor.en} &quot;{query}&quot;
            </p>
          )}

          {/* Items / Experiences */}
          {items.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <Star className="h-5 w-5 text-orange-400" />
                {labels.experiences[locale] || labels.experiences.en}
                <Badge variant="outline" className="border-white/10 text-gray-500 text-xs ml-2">
                  {items.length}
                </Badge>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => {
                  const sub = item.subcategory as { slug: string; category: { slug: string } } | null
                  const href = sub
                    ? `/${sub.category.slug}/${sub.slug}/${item.slug as string}`
                    : '#'
                  return (
                    <Link key={item.id as string} href={href}>
                      <Card className="group bg-slate-900/50 border-white/5 hover:border-orange-400/20 transition-all duration-300 overflow-hidden h-full cursor-pointer">
                        {item.image ? (
                          <div className="aspect-[16/9] overflow-hidden">
                            <img
                              src={item.image as string}
                              alt={getLocalizedText(item.name as Record<string, string>, loc)}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                        ) : null}
                        <CardContent className="p-5">
                          <h3 className="text-base font-semibold text-white group-hover:text-orange-400 transition-colors line-clamp-2">
                            {getLocalizedText(item.name as Record<string, string>, loc)}
                          </h3>
                          <p className="mt-2 text-sm text-gray-400 line-clamp-2">
                            {getLocalizedText(item.short_description as Record<string, string>, loc)}
                          </p>
                          {(item.rating as number) > 0 && (
                            <div className="mt-3 flex items-center gap-1 text-sm text-amber-400">
                              <Star className="h-3.5 w-3.5 fill-amber-400" />
                              {item.rating as number}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {/* Articles */}
          {articles.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-400" />
                {labels.articles[locale] || labels.articles.en}
                <Badge variant="outline" className="border-white/10 text-gray-500 text-xs ml-2">
                  {articles.length}
                </Badge>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <Link key={article.id as string} href={`/blog/${article.slug as string}`}>
                    <Card className="group bg-slate-900/50 border-white/5 hover:border-blue-400/20 transition-all duration-300 overflow-hidden h-full cursor-pointer">
                      {article.image ? (
                        <div className="aspect-[16/9] overflow-hidden">
                          <img
                            src={article.image as string}
                            alt={getLocalizedText(article.title as Record<string, string>, loc)}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      ) : null}
                      <CardContent className="p-5">
                        <h3 className="text-base font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                          {getLocalizedText(article.title as Record<string, string>, loc)}
                        </h3>
                        <p className="mt-2 text-sm text-gray-400 line-clamp-2">
                          {getLocalizedText(article.excerpt as Record<string, string>, loc)}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Partners */}
          {partners.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <Store className="h-5 w-5 text-green-400" />
                {labels.partners[locale] || labels.partners.en}
                <Badge variant="outline" className="border-white/10 text-gray-500 text-xs ml-2">
                  {partners.length}
                </Badge>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {partners.map((partner) => (
                  <Card key={partner.id as string} className="group bg-slate-900/50 border-white/5 hover:border-green-400/20 transition-all duration-300 overflow-hidden h-full">
                    {partner.image ? (
                      <div className="aspect-[16/9] overflow-hidden">
                        <img
                          src={partner.image as string}
                          alt={partner.name as string}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ) : null}
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="border-green-400/30 text-green-400 text-xs">
                          {partner.type as string}
                        </Badge>
                      </div>
                      <h3 className="text-base font-semibold text-white group-hover:text-green-400 transition-colors">
                        {partner.name as string}
                      </h3>
                      <p className="mt-2 text-sm text-gray-400 line-clamp-2">
                        {getLocalizedText(partner.description as Record<string, string>, loc)}
                      </p>
                      {partner.area ? (
                        <div className="mt-3 flex items-center gap-1 text-xs text-gray-500">
                          <MapPin className="h-3 w-3" />
                          {String(partner.area)}
                        </div>
                      ) : null}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Empty states */}
          {query && totalResults === 0 && (
            <div className="text-center py-20">
              <Search className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">{labels.noResults[locale] || labels.noResults.en}</p>
              <p className="mt-2 text-gray-600 text-sm">{labels.tryDifferent[locale] || labels.tryDifferent.en}</p>
            </div>
          )}

          {!query && (
            <div className="text-center py-20">
              <Search className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">{labels.startSearching[locale] || labels.startSearching.en}</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
