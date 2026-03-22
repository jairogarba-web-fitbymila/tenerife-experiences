'use client'

import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link, usePathname, useRouter } from '@/i18n/routing'
import type { Locale } from '@/types/database'

const navLinks = [
  { href: '/experiencias', key: 'experiences' },
  { href: '/playas', key: 'beaches' },
  { href: '/cultura', key: 'culture' },
  { href: '/naturaleza', key: 'nature' },
  { href: '/gastronomia', key: 'food' },
  { href: '/vida-nocturna', key: 'nightlife' },
] as const

const displayLocales: Locale[] = ['en', 'es', 'de']

export function Header() {
  const t = useTranslations('nav')
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  function handleLocaleChange(newLocale: Locale) {
    router.replace(pathname, { locale: newLocale })
    setMobileOpen(false)
  }

  function closeMobile() {
    setMobileOpen(false)
  }

  return (
    <>
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? 'bg-[rgba(10,14,26,0.95)] backdrop-blur-[10px] border-b border-[rgba(249,115,22,0.3)] py-4 px-8'
            : 'bg-transparent border-b border-transparent py-6 px-8'
        }`}
      >
        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold tracking-tight" style={{
          background: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '-1px',
        }}>
          TENERIFE
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex items-center gap-10 list-none">
          {navLinks.map(({ href, key }) => (
            <li key={key}>
              <Link
                href={href as any}
                className="nav-link-cinematic text-[0.95rem] font-medium text-white/80 no-underline transition-colors duration-300 hover:text-[#f97316] relative"
              >
                {t(key)}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Language Selector */}
        <div className="hidden lg:flex items-center gap-2">
          {displayLocales.map((loc) => (
            <button
              key={loc}
              onClick={() => handleLocaleChange(loc)}
              className={`w-9 h-9 rounded-full text-[0.8rem] font-semibold cursor-pointer transition-all duration-300 ${
                loc === locale
                  ? 'bg-[#f97316] text-white border border-[#f97316]'
                  : 'bg-transparent text-white/70 border border-[rgba(249,115,22,0.3)] hover:border-[#f97316] hover:text-[#f97316]'
              }`}
            >
              {loc.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Hamburger (mobile) */}
        <button
          className={`flex lg:hidden flex-col gap-[5px] cursor-pointer p-2 z-[1100] bg-transparent border-none ${
            mobileOpen ? 'hamburger-active' : ''
          }`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-[2px] bg-white rounded-sm transition-all duration-300 ${
            mobileOpen ? 'rotate-45 translate-y-[7px]' : ''
          }`} />
          <span className={`block w-6 h-[2px] bg-white rounded-sm transition-all duration-300 ${
            mobileOpen ? 'opacity-0' : ''
          }`} />
          <span className={`block w-6 h-[2px] bg-white rounded-sm transition-all duration-300 ${
            mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''
          }`} />
        </button>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-[999] backdrop-blur-[20px] transition-opacity duration-300 lg:hidden ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'rgba(10, 14, 26, 0.96)' }}
        onClick={closeMobile}
      />

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 w-full h-dvh z-[1000] flex flex-col items-center justify-center gap-8 p-8 transition-all duration-400 lg:hidden ${
          mobileOpen ? 'right-0' : '-right-full'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        {navLinks.map(({ href, key }) => (
          <Link
            key={key}
            href={href as any}
            onClick={closeMobile}
            className="text-[2rem] font-bold text-white/90 no-underline tracking-tight transition-colors duration-300 hover:text-[#f97316] active:text-[#f97316] py-2 px-4"
          >
            {t(key)}
          </Link>
        ))}

        {/* Mobile Language Buttons */}
        <div className="flex gap-3 mt-4">
          {displayLocales.map((loc) => (
            <button
              key={loc}
              onClick={() => handleLocaleChange(loc)}
              className={`w-11 h-11 rounded-full text-[0.85rem] font-semibold cursor-pointer transition-all duration-300 ${
                loc === locale
                  ? 'bg-[#f97316] text-white border border-[#f97316]'
                  : 'bg-transparent text-white/70 border border-[rgba(249,115,22,0.4)] hover:border-[#f97316] hover:text-[#f97316]'
              }`}
            >
              {loc.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
