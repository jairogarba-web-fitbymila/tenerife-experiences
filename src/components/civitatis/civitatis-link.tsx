'use client'

import { useLocale } from 'next-intl'
import { buildCivitatisUrl } from '@/lib/civitatis'
import { ExternalLink } from 'lucide-react'

interface CivitatisLinkProps {
  /** Path after /tenerife/ on Civitatis, e.g. "avistamiento-de-cetaceos/" */
  slug: string
  children: React.ReactNode
  className?: string
  showIcon?: boolean
}

/**
 * Affiliate link component — automatically appends ?aid=XXX
 * and opens in a new tab with proper rel attributes.
 */
export function CivitatisLink({ slug, children, className = '', showIcon = false }: CivitatisLinkProps) {
  const locale = useLocale()
  const href = buildCivitatisUrl(`tenerife/${slug}`, locale)

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={className}
    >
      {children}
      {showIcon && <ExternalLink className="ml-1 inline h-3.5 w-3.5 opacity-60" />}
    </a>
  )
}
