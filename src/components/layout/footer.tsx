'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { MapPin, Mail, Phone, Instagram, Facebook, Youtube, Twitter, Heart } from 'lucide-react'

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

const latestArticles = [
  { key: 'article1', href: '/blog/top-10-things-to-do-tenerife' },
  { key: 'article2', href: '/blog/best-beaches-tenerife-guide' },
  { key: 'article3', href: '/blog/mount-teide-complete-guide' },
]

const socialLinks = [
  { name: 'Instagram', href: 'https://www.instagram.com/tenerifeexperiences/', icon: Instagram },
  { name: 'Facebook', href: 'https://www.facebook.com/tenerifeexperiences/', icon: Facebook },
  { name: 'Twitter', href: 'https://x.com/tenerifeexp', icon: Twitter },
  { name: 'YouTube', href: 'https://www.youtube.com/@tenerifeexperiences', icon: Youtube },
]

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.78a8.18 8.18 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.21z" />
    </svg>
  )
}

export function Footer() {
  const t = useTranslations('footer')
  const tc = useTranslations('categories')

  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* About + Social */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
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

            {/* Social Media Icons */}
            <div className="pt-2">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                {t('followUs')}
              </h4>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-gray-400 transition-all hover:bg-orange-400/20 hover:text-orange-400"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
                <a
                  href="https://www.tiktok.com/@tenerifeexperiences"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-gray-400 transition-all hover:bg-orange-400/20 hover:text-orange-400"
                >
                  <TikTokIcon className="h-4 w-4" />
                </a>
              </div>
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

          {/* Latest Articles */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">{t('latestArticles')}</h3>
            <ul className="space-y-3">
              {latestArticles.map((article) => (
                <li key={article.href}>
                  <Link
                    href={article.href}
                    className="group flex items-start gap-2 text-sm text-gray-400 hover:text-orange-400 transition-colors"
                  >
                    <span className="mt-1.5 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange-400/60 group-hover:bg-orange-400 transition-colors" />
                    <span className="leading-snug">{t(article.key)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">{t('legal')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacidad" className="text-sm text-gray-400 hover:text-orange-400 transition-colors">
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="text-sm text-gray-400 hover:text-orange-400 transition-colors">
                  {t('terms')}
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-sm text-gray-400 hover:text-orange-400 transition-colors">
                  {t('cookies')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-400 hover:text-orange-400 transition-colors">
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-8">
          {/* Made in Tenerife badge */}
          <div className="flex justify-center mb-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-gray-400">
              <span>🇮🇨</span>
              <span>{t('madeIn')}</span>
              <Heart className="h-3.5 w-3.5 text-red-400 fill-red-400" />
            </div>
          </div>
          <p className="text-sm text-gray-500 text-center">
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  )
}
