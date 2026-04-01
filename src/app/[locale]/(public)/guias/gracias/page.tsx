'use client'

import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/routing'
import { CheckCircle, Download, ArrowLeft } from 'lucide-react'
import { ScrollEffects } from '@/components/cinematic/scroll-effects'

export default function GraciasPage() {
  const t = useTranslations('guides.success')

  return (
    <>
      <ScrollEffects />
      <section className="min-h-[70vh] flex items-center justify-center py-20">
        <div className="mx-auto max-w-lg px-4 text-center">
          {/* Success icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 border border-green-500/30 mb-8">
            <CheckCircle className="h-10 w-10 text-green-400" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t('title')}
          </h1>
          <p className="text-gray-400 mb-8 text-lg">
            {t('subtitle')}
          </p>

          {/* Info box */}
          <div className="rounded-2xl bg-slate-900/80 border border-white/10 p-6 mb-8 text-left">
            <div className="flex items-start gap-3">
              <Download className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {t('emailNotice')}
                </p>
              </div>
            </div>
          </div>

          {/* Back link */}
          <Link
            href="/guias"
            className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('backToGuides')}
          </Link>
        </div>
      </section>
    </>
  )
}
