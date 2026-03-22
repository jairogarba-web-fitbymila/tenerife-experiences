import { getTranslations } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import { Link } from '@/i18n/routing'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock } from 'lucide-react'
import { t as getLocalizedText } from '@/lib/helpers'
import { ScrollEffects } from '@/components/cinematic/scroll-effects'
import type { Locale } from '@/types/database'
import { ReviewSection } from '@/components/review/review-panel'

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

  // Get unique categories for filter bar
  const categories = Array.from(
    new Map(
      articles?.map((a) => [a.category?.slug, getLocalizedText(a.category?.name, locale as Locale)])
    ).entries()
  ).map(([slug, name]) => ({ slug, name }))

  // Featured articles: alternate pattern (every 3rd item)
  const isFeatured = (index: number) => index % 3 === 0

  return (
    <>
      <ScrollEffects />

      {/* Hero Section */}
      <ReviewSection page="blog" sectionId="blog-hero" sectionLabel="Hero: Blog">
        <section className="relative h-screen min-h-[40vh] flex items-center justify-center overflow-hidden bg-slate-950">
          {/* Gradient background */}
          <div className="absolute inset-0 opacity-50">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center">
            <h1 className="text-7xl md:text-8xl font-black text-white mb-6 tracking-tight">
              Blog
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>
        </section>
      </ReviewSection>

      {/* Category Filter Bar */}
      <ReviewSection page="blog" sectionId="blog-filters" sectionLabel="Filtros: Blog">
        <section className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur border-b border-white/5 py-4">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2">
              <button className="px-4 py-2 rounded-full border border-orange-500/50 bg-orange-500/10 text-orange-400 text-sm font-medium hover:bg-orange-500/20 transition-colors">
                All Articles
              </button>
              {categories.map((category) => (
                <button
                  key={category.slug}
                  className="px-4 py-2 rounded-full border border-white/10 bg-slate-900/50 text-gray-300 text-sm font-medium hover:border-white/30 hover:text-white transition-colors"
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>
      </ReviewSection>

      {/* Masonry Grid */}
      <ReviewSection page="blog" sectionId="blog-grid" sectionLabel="Grid: Artículos">
      <section className="py-16 sm:py-24 bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {(!articles || articles.length === 0) ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">{tc('noResults')}</p>
              <p className="mt-2 text-gray-600 text-sm">Articles coming soon...</p>
            </div>
          ) : (
            <div className="masonry-grid reveal stagger-children">
              {articles.map((article, index) => {
                const featured = isFeatured(index)
                return (
                  <Link key={article.id} href={`/blog/${article.slug}`}>
                    <div
                      className={`group relative overflow-hidden rounded-lg bg-slate-900/50 border border-white/5 hover:border-orange-500/30 transition-all duration-300 cursor-pointer h-full ${
                        featured ? 'min-h-[500px]' : ''
                      }`}
                    >
                      {/* Image */}
                      {article.image && (
                        <div className="absolute inset-0 overflow-hidden">
                          <img
                            src={article.image}
                            alt={getLocalizedText(article.title, locale as Locale)}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          {/* Dark overlay */}
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/80"></div>
                          {/* Hover glow shadow */}
                          <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-orange-500/10 transition-colors duration-300"></div>
                        </div>
                      )}

                      {/* Content */}
                      <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6">
                        {/* Top: Category badge */}
                        <div>
                          {article.category && (
                            <Badge className="w-fit bg-orange-500/20 text-orange-300 border-orange-500/30 hover:bg-orange-500/30">
                              {getLocalizedText(article.category.name, locale as Locale)}
                            </Badge>
                          )}
                        </div>

                        {/* Bottom: Title, excerpt, metadata */}
                        <div className="space-y-3">
                          <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-3">
                            {getLocalizedText(article.title, locale as Locale)}
                          </h2>

                          {/* Excerpt only on featured items */}
                          {featured && (
                            <p className="text-sm text-gray-300 line-clamp-2">
                              {getLocalizedText(article.excerpt, locale as Locale)}
                            </p>
                          )}

                          {/* Metadata */}
                          {article.published_at && (
                            <div className="flex items-center gap-3 text-xs text-gray-400 pt-2">
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
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>
      </ReviewSection>
    </>
  )
}
