import { getTranslations } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import { Link } from '@/i18n/routing'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import { t as getLocalizedText } from '@/lib/helpers'
import type { Locale } from '@/types/database'
import { notFound } from 'next/navigation'

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

  return (
    <article className="pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* Header */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-8">
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: t('title'), href: '/blog' },
              { label: articleTitle },
            ]}
          />
        </div>

        <div className="flex items-center gap-3 mb-4">
          {article.category && (
            <Badge
              variant="outline"
              className="border-orange-400/30 text-orange-400"
            >
              {getLocalizedText(article.category.name, locale as Locale)}
            </Badge>
          )}
          {article.tags?.map((tag: string) => (
            <Badge key={tag} variant="outline" className="border-white/10 text-gray-500">
              {tag}
            </Badge>
          ))}
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
          {getLocalizedText(article.title, locale as Locale)}
        </h1>

        <div className="mt-6 flex items-center gap-6 text-sm text-gray-400">
          <span>{article.author}</span>
          {article.published_at && (
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(article.published_at).toLocaleDateString(locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            5 {t('readTime')}
          </span>
        </div>
      </div>

      {/* Featured Image */}
      {article.image && (
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-8">
          <div className="aspect-[21/9] rounded-2xl overflow-hidden">
            <img
              src={article.image}
              alt={getLocalizedText(article.title, locale as Locale)}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 mt-12">
        <div
          className="prose prose-invert prose-lg max-w-none
            prose-headings:text-white prose-headings:font-bold
            prose-p:text-gray-300 prose-p:leading-relaxed
            prose-a:text-orange-400 prose-a:no-underline hover:prose-a:text-orange-300
            prose-strong:text-white
            prose-li:text-gray-300
            prose-blockquote:border-orange-400 prose-blockquote:text-gray-400"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </article>
  )
}
