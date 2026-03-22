import { getTranslations } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import { Link } from '@/i18n/routing'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock } from 'lucide-react'
import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import { ReadingProgress } from '@/components/cinematic/reading-progress'
import { ScrollEffects } from '@/components/cinematic/scroll-effects'
import { t as getLocalizedText } from '@/lib/helpers'
import type { Locale } from '@/types/database'
import { notFound } from 'next/navigation'
import { ReviewSection } from '@/components/review/review-panel'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const supabase = await createClient()

  const { data: article } = await supabase
    .from('articles')
    .select('title, meta_title, meta_description, excerpt, image')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (!article) return { title: 'Article' }

  const title = getLocalizedText(article.meta_title || article.title, locale as Locale)
  const description = getLocalizedText(
    article.meta_description || article.excerpt,
    locale as Locale
  )

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: article.image ? [article.image] : [],
    },
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const supabase = await createClient()
  const t = await getTranslations({ locale, namespace: 'blog' })

  const { data: article } = await supabase
    .from('articles')
    .select('*, category:categories(slug, name)')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (!article) notFound()

  const content = getLocalizedText(article.content, locale as Locale)
  const articleTitle = getLocalizedText(article.title, locale as Locale)

  // FAQPage structured data
  const isSpanish = locale === 'es'
  const isGerman = locale === 'de'
  const faqQuestions = [
    {
      question: isSpanish
        ? `¿Qué es ${articleTitle}?`
        : isGerman
          ? `Was ist ${articleTitle}?`
          : `What is ${articleTitle}?`,
      answer: getLocalizedText(article.excerpt || article.title, locale as Locale),
    },
    {
      question: isSpanish
        ? `¿Cuánto cuesta ${articleTitle}?`
        : isGerman
          ? `Was kostet ${articleTitle}?`
          : `How much does ${articleTitle} cost?`,
      answer: isSpanish
        ? `Consulta nuestro artículo completo sobre ${articleTitle} para obtener información actualizada sobre precios y opciones disponibles.`
        : isGerman
          ? `Lesen Sie unseren vollständigen Artikel über ${articleTitle} für aktuelle Preis- und Optionsinformationen.`
          : `Check our full article about ${articleTitle} for up-to-date pricing and available options.`,
    },
    {
      question: isSpanish
        ? `¿Cuál es la mejor época para ${articleTitle}?`
        : isGerman
          ? `Wann ist die beste Zeit für ${articleTitle}?`
          : `When is the best time for ${articleTitle}?`,
      answer: isSpanish
        ? `Tenerife disfruta de un clima agradable durante todo el año. Lee nuestro artículo completo sobre ${articleTitle} para encontrar recomendaciones detalladas.`
        : isGerman
          ? `Teneriffa genießt das ganze Jahr über ein angenehmes Klima. Lesen Sie unseren vollständigen Artikel über ${articleTitle} für detaillierte Empfehlungen.`
          : `Tenerife enjoys pleasant weather year-round. Read our full article about ${articleTitle} for detailed recommendations.`,
    },
  ]

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqQuestions.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  // JSON-LD Article structured data
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: getLocalizedText(article.title, locale as Locale),
    description: getLocalizedText(article.excerpt || article.title, locale as Locale),
    ...(article.image && { image: article.image }),
    ...(article.author && {
      author: {
        '@type': 'Person',
        name: article.author,
      },
    }),
    ...(article.published_at && { datePublished: article.published_at }),
    ...(article.updated_at && { dateModified: article.updated_at }),
    publisher: {
      '@type': 'Organization',
      name: 'Tenerife Experiences',
      url: 'https://www.tenerifeexperiences.com',
      ...(true && {
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.tenerifeexperiences.com/logo.png',
        },
      }),
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.tenerifeexperiences.com/${locale}/blog/${slug}`,
    },
  }

  // Calculate estimated reading time (150 words per minute)
  const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length
  const readingTime = Math.max(1, Math.ceil(wordCount / 150))

  return (
    <>
      <ReadingProgress />
      <ScrollEffects />
      <article className="min-h-screen bg-black text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

        {/* Breadcrumbs */}
        <div className="fixed top-12 left-0 right-0 z-40 bg-black/40 backdrop-blur-sm border-b border-white/5">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-3">
            <Breadcrumbs
              items={[
                { label: t('title'), href: '/blog' },
                { label: articleTitle },
              ]}
            />
          </div>
        </div>

        {/* Header Section: Category, Date, Read Time */}
        <ReviewSection page="article" sectionId={`header-${slug}`} sectionLabel={`Header: ${articleTitle}`}>
        <div className="pt-28 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            {/* Category Pill */}
            {article.category && (
              <div className="mb-6">
                <Badge
                  variant="outline"
                  className="border-orange-400/40 text-orange-400 bg-orange-400/10 hover:bg-orange-400/20"
                >
                  {getLocalizedText(article.category.name, locale as Locale)}
                </Badge>
              </div>
            )}

            {/* Meta Info (Date + Read Time) */}
            <div className="flex items-center gap-4 mb-8 text-sm text-gray-400">
              {article.published_at && (
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(article.published_at).toLocaleDateString(locale, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              )}
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {readingTime} {readingTime === 1 ? t('readTime') : t('readTime')}
              </span>
            </div>

            {/* Massive Title (Immersive) */}
            <h1
              className="font-bold text-white leading-tight tracking-tight mb-12 reveal"
              style={{
                fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                lineHeight: '1.1',
              }}
            >
              {getLocalizedText(article.title, locale as Locale)}
            </h1>
          </div>
        </div>
        </ReviewSection>

        {/* Full-Width Featured Image (70vh) */}
        {article.image && (
          <ReviewSection page="article" sectionId={`image-${slug}`} sectionLabel={`Imagen: ${articleTitle}`}>
          <div className="w-full h-[70vh] overflow-hidden reveal">
            <img
              src={article.image}
              alt={getLocalizedText(article.title, locale as Locale)}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
          </ReviewSection>
        )}

        {/* Article Content */}
        <ReviewSection page="article" sectionId={`content-${slug}`} sectionLabel={`Contenido: ${articleTitle}`}>
        <div className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            {/* Content Section with Prose Dark */}
            <div className="prose-dark reveal">
              <div
                className="prose-dark"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          </div>
        </div>
        </ReviewSection>

        {/* Related Articles Section */}
        {/* Placeholder for related articles */}
        <ReviewSection page="article" sectionId={`related-${slug}`} sectionLabel="Artículos Relacionados">
        <div className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-white mb-12 reveal">
              {locale === 'es'
                ? 'Artículos Relacionados'
                : locale === 'de'
                  ? 'Verwandte Artikel'
                  : 'Related Articles'}
            </h2>

            {/* Related Articles Grid (3 columns, stack on mobile) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Placeholder cards - replace with actual related articles query */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="group reveal">
                  <div className="aspect-video bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden mb-4">
                    <div className="w-full h-full flex items-center justify-center text-gray-600">
                      [Related Article {i}]
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-orange-400 transition-colors">
                    {locale === 'es'
                      ? `Artículo Relacionado ${i}`
                      : locale === 'de'
                        ? `Verwandter Artikel ${i}`
                        : `Related Article ${i}`}
                  </h3>
                  <p className="text-gray-400 text-sm mt-2">
                    {locale === 'es'
                      ? 'Descubre más experiencias en Tenerife'
                      : locale === 'de'
                        ? 'Entdecke mehr Erfahrungen auf Teneriffa'
                        : 'Discover more Tenerife experiences'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        </ReviewSection>

        {/* Bottom spacing */}
        <div className="h-20" />
      </article>
    </>
  )
}
