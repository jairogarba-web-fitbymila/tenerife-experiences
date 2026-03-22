'use client'

import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/routing'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { LanguageSwitcher } from './language-switcher'
import { SearchDialog } from './search-dialog'
import { MegaMenuDesktop, MegaMenuMobile } from './mega-menu'

export function Header() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/95 backdrop-blur-xl border-b border-orange-500/20 shadow-lg'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
            Tenerife
          </span>
          <span className="text-xl font-light text-white">Experiences</span>
        </Link>

        {/* Desktop Nav - Mega Menu */}
        <MegaMenuDesktop />

        {/* Actions */}
        <div className="flex items-center gap-2">
          <SearchDialog locale={locale} />

          <LanguageSwitcher />

          <Link href="/reservas">
            <Button className="hidden sm:flex bg-orange-500 hover:bg-orange-600 text-white">
              {t('bookNow')}
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-gray-400">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-slate-950 border-white/10">
              <MegaMenuMobile onNavigate={() => setOpen(false)} />
              <div className="mt-4 px-4">
                <Link href="/reservas">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                    {t('bookNow')}
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
