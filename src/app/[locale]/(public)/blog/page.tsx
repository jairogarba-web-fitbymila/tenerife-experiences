import { getTranslations } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import { Link } from '@/i18n/routing'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock } from 'lucide-react'
import { t as getLocalizedText } from '@/lib/helpers'
import type { Locale } from '@/types/database'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'blog' })
  return {
    title: t('title'),
    description: t('subtitle'),
  }
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const supabase = await createClient()
  const t = await getTranslations({ locale, namespace: 'blog' })
  const tc = await getTranslations({ locale, namespace: 'common' })

  const { data: articles } = await supabase
    .from('articles')
    .select('*, category:categories(slug, name)')
    .eq('published', true)
    .order('published_at', { ascending: false })
    .limit(20)

  return (
    <>
      {/* Hero */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-white">{t('title')}</h1>
            <p className="mt-4 text-lg text-gray-400">{t('subtitle')}</p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles?.map((article) => (
              <Link key={article.id} href={`/blog/${article.slug}`}>
                <Card className="group bg-slate-900/50 border-white/5 hover:border-orange-400/20 transition-all duration-300 overflow-hidden h-full cursor-pointer">
                  {article.image && (
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={article.image}
                        alt={getLocalizedText(article.title, locale as Locale)}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      {article.category && (
                        <Badge
                          variant="outline"
                          className="border-orange-400/30 text-orange-400 text-xs"
                        >
                          {getLocalizedText(article.category.name, locale as Locale)}
                        </Badge>
                      )}
                    </div>

                    <h2 className="text-lg font-semibold text-white group-hover:text-orange-400 transition-colors line-clamp-2">
                      {getLocalizedText(article.title, locale as Locale)}
                    </h2>

                    <p className="mt-2 text-sm text-gray-400 line-clamp-3">
                      {getLocalizedText(article.excerpt, locale as Locale)}
                    </p>

                    {article.published_at && (
                      <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(article.published_at).toLocaleDateString(locale)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          5 {t('readTime')}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {(!articles || articles.length === 0) && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">{tc('noResults')}</p>
              <p className="mt-2 text-gray-600 text-sm">Articles coming soon...</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
