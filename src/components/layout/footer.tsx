'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { MapPin, Mail, Phone } from 'lucide-react'

const categoryLinks = [
  { key: 'experiences', href: '/experiences' },
  { key: 'beaches', href: '/beaches' },
  { key: 'culture', href: '/culture' },
  { key: 'nature', href: '/nature' },
  { key: 'food', href: '/food' },
  { key: 'nightlife', href: '/nightlife' },
  { key: 'family', href: '/family' },
  { key: 'wellness', href: '/wellness' },
]

export function Footer() {
  const t = useTranslations('footer')
  const tc = useTranslations('categories')

  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                Tenerife
              </span>
              <span className="text-xl font-light text-white">Experiences</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              {t('aboutText')}
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <MapPin className="h-4 w-4 text-orange-400" />
              Tenerife, Canary Islands, Spain
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">{t('categories')}</h3>
            <ul className="space-y-2">
              {categoryLinks.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-orange-400 transition-colors"
                  >
                    {tc(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/areas" className="text-sm text-gray-400 hover:text-orange-400 transition-colors">
                  Areas
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-sm text-gray-400 hover:text-orange-400 transition-colors">
                  Festivals
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-gray-400 hover:text-orange-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-sm text-gray-400 hover:text-orange-400 transition-colors">
                  {t('partners')}
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-sm text-gray-400 hover:text-orange-400 transition-colors">
                  {t('advertise')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">{t('legal')}</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-orange-400 transition-colors">
                  {t('privacy')}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-orange-400 transition-colors">
                  {t('terms')}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-orange-400 transition-colors">
                  {t('cookies')}
                </a>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-400 hover:text-orange-400 transition-colors">
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center">
          <p className="text-sm text-gray-500">
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  )
}
