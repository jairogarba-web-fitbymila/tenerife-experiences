import { Link } from '@/i18n/routing'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const allItems: BreadcrumbItem[] = [{ label: 'Home', href: '/' }, ...items]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href && {
        item: `https://www.tenerifeexperiences.com${item.href}`,
      }),
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-gray-500 flex-wrap">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1
          return (
            <span key={index} className="flex items-center gap-1.5">
              {index > 0 && <ChevronRight className="h-3.5 w-3.5 text-gray-600 shrink-0" />}
              {isLast || !item.href ? (
                <span className="text-gray-300">{item.label}</span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-orange-400 transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </span>
          )
        })}
      </nav>
    </>
  )
}
