'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/routing'
import { ChevronDown, ChevronRight } from 'lucide-react'

interface MenuLink {
  key: string
  href: string
}

interface MenuGroup {
  key: string
  links: MenuLink[]
}

interface MenuItem {
  key: string
  href: string
  groups: MenuGroup[]
}

const menuItems: MenuItem[] = [
  {
    key: 'thingsToDo',
    href: '/experiences',
    groups: [
      {
        key: 'experiences',
        links: [
          { key: 'boatTrips', href: '/experiences/whale-watching' },
          { key: 'teideTours', href: '/experiences/teide-tours' },
          { key: 'waterSports', href: '/experiences/water-sports' },
          { key: 'themeParks', href: '/family/theme-parks' },
        ],
      },
      {
        key: 'culture',
        links: [
          { key: 'museums', href: '/culture/museums' },
          { key: 'festivals', href: '/events' },
          { key: 'historicTowns', href: '/culture/historic-towns' },
        ],
      },
      {
        key: 'nature',
        links: [
          { key: 'hiking', href: '/nature/hiking-trails' },
          { key: 'teideNP', href: '/nature/teide-national-park' },
          { key: 'stargazing', href: '/experiences/teide-tours' },
        ],
      },
      {
        key: 'nightlife',
        links: [
          { key: 'beachClubs', href: '/nightlife/beach-clubs' },
          { key: 'clubs', href: '/nightlife/clubs' },
          { key: 'bars', href: '/nightlife/bars-pubs' },
        ],
      },
    ],
  },
  {
    key: 'whatToVisit',
    href: '/que-visitar',
    groups: [
      {
        key: 'beaches',
        links: [
          { key: 'southBeaches', href: '/beaches/south-beaches' },
          { key: 'northBeaches', href: '/beaches/north-beaches' },
          { key: 'familyBeaches', href: '/beaches/family-beaches' },
          { key: 'naturalPools', href: '/nature/natural-pools' },
        ],
      },
      {
        key: 'areas',
        links: [
          { key: 'costaAdeje', href: '/areas/costa-adeje' },
          { key: 'puertoCruz', href: '/areas/puerto-de-la-cruz' },
          { key: 'santaCruz', href: '/areas/santa-cruz' },
          { key: 'laLaguna', href: '/areas/la-laguna' },
          { key: 'losGigantes', href: '/areas/los-gigantes' },
        ],
      },
      {
        key: 'mustSee',
        links: [
          { key: 'teide', href: '/areas/teide' },
          { key: 'siamPark', href: '/family/theme-parks' },
          { key: 'masca', href: '/nature/hiking-trails' },
          { key: 'anaga', href: '/areas/anaga' },
        ],
      },
    ],
  },
  {
    key: 'gastronomy',
    href: '/food',
    groups: [
      {
        key: 'whereToEat',
        links: [
          { key: 'bestRestaurants', href: '/food/best-restaurants' },
          { key: 'guachinches', href: '/food/guachinches' },
          { key: 'canarianCuisine', href: '/food/canarian-cuisine' },
        ],
      },
      {
        key: 'whatToTry',
        links: [
          { key: 'wineTasting', href: '/food/wine-tasting' },
          { key: 'localProducts', href: '/shopping/local-products' },
        ],
      },
    ],
  },
  {
    key: 'planTrip',
    href: '/planifica',
    groups: [
      {
        key: 'beforeTravel',
        links: [
          { key: 'bestTime', href: '/blog/best-time-visit-tenerife' },
          { key: 'northVsSouth', href: '/blog/north-vs-south-tenerife' },
        ],
      },
      {
        key: 'onIsland',
        links: [
          { key: 'familyGuide', href: '/blog/tenerife-family-kids-guide' },
          { key: 'hikingGuide', href: '/blog/hiking-tenerife-best-trails' },
        ],
      },
    ],
  },
]

export function MegaMenuDesktop() {
  const t = useTranslations('megaMenu')
  const pathname = usePathname()
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = useCallback((key: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setActiveMenu(key)
  }, [])

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null)
    }, 150)
  }, [])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <nav className="hidden lg:flex items-center gap-1">
      {menuItems.map((item) => {
        const isActive = pathname.startsWith(item.href)
        const isOpen = activeMenu === item.key

        return (
          <div
            key={item.key}
            className="relative"
            onMouseEnter={() => handleMouseEnter(item.key)}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href={item.href}
              className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? 'text-orange-400 bg-orange-400/10'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {t(`items.${item.key}`)}
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </Link>

            {/* Dropdown Panel */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 top-full pt-2 transition-all duration-200 ${
                isOpen
                  ? 'opacity-100 visible translate-y-0'
                  : 'opacity-0 invisible -translate-y-2'
              }`}
              style={{ minWidth: item.groups.length > 2 ? '560px' : '380px' }}
            >
              <div className="bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-6">
                <div
                  className="grid gap-x-8 gap-y-5"
                  style={{
                    gridTemplateColumns: `repeat(${Math.min(item.groups.length, 3)}, minmax(0, 1fr))`,
                  }}
                >
                  {item.groups.map((group) => (
                    <div key={group.key}>
                      <h3 className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-2.5">
                        {t(`groups.${group.key}`)}
                      </h3>
                      <ul className="space-y-0.5">
                        {group.links.map((link) => (
                          <li key={link.key}>
                            <Link
                              href={link.href}
                              className="block text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-md px-2 py-1.5 transition-colors"
                            >
                              {t(`links.${link.key}`)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                {/* View all link to the menu's hub page */}
                <div className="mt-5 pt-4 border-t border-white/10">
                  <Link
                    href={item.href}
                    className="flex items-center justify-between text-sm text-orange-400 hover:text-orange-300 transition-colors group"
                  >
                    <span className="font-medium">{t('viewAll')} {t(`items.${item.key}`)}</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )
      })}

      {/* Blog - simple link */}
      <Link
        href="/blog"
        className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
          pathname.startsWith('/blog')
            ? 'text-orange-400 bg-orange-400/10'
            : 'text-gray-300 hover:text-white hover:bg-white/5'
        }`}
      >
        {t('items.blog')}
      </Link>

      {/* Guides - simple link */}
      <Link
        href="/guias"
        className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
          pathname.startsWith('/guias')
            ? 'text-orange-400 bg-orange-400/10'
            : 'text-gray-300 hover:text-white hover:bg-white/5'
        }`}
      >
        {t('items.guides')}
      </Link>
    </nav>
  )
}

interface MegaMenuMobileProps {
  onNavigate: () => void
}

export function MegaMenuMobile({ onNavigate }: MegaMenuMobileProps) {
  const t = useTranslations('megaMenu')
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  const toggleItem = (key: string) => {
    setExpandedItem((prev) => (prev === key ? null : key))
  }

  return (
    <nav className="flex flex-col gap-1 mt-8">
      {menuItems.map((item) => (
        <div key={item.key}>
          {/* Top-level menu item */}
          <button
            onClick={() => toggleItem(item.key)}
            className="flex items-center justify-between w-full px-4 py-3 text-lg font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            <span>{t(`items.${item.key}`)}</span>
            <ChevronRight
              className={`h-4 w-4 transition-transform duration-200 ${
                expandedItem === item.key ? 'rotate-90' : ''
              }`}
            />
          </button>

          {/* Expandable groups */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              expandedItem === item.key
                ? 'max-h-[1000px] opacity-100'
                : 'max-h-0 opacity-0'
            }`}
          >
            <div className="pl-4 pb-2">
              {item.groups.map((group) => (
                <div key={group.key} className="mb-3">
                  <h4 className="px-4 py-1.5 text-xs font-bold text-orange-400 uppercase tracking-wider">
                    {t(`groups.${group.key}`)}
                  </h4>
                  {group.links.map((link) => (
                    <Link
                      key={link.key}
                      href={link.href}
                      onClick={onNavigate}
                      className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                      {t(`links.${link.key}`)}
                    </Link>
                  ))}
                </div>
              ))}
              {/* View all link */}
              <Link
                href={item.href}
                onClick={onNavigate}
                className="block px-4 py-2 text-sm font-medium text-orange-400 hover:text-orange-300 transition-colors"
              >
                {t('viewAll')} &rarr;
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Blog - simple link */}
      <Link
        href="/blog"
        onClick={onNavigate}
        className="px-4 py-3 text-lg font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
      >
        {t('items.blog')}
      </Link>

      {/* Guides - simple link */}
      <Link
        href="/guias"
        onClick={onNavigate}
        className="px-4 py-3 text-lg font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
      >
        {t('items.guides')}
      </Link>
    </nav>
  )
}
