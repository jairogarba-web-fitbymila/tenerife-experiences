'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Star, FileText, Store, ArrowRight, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'
import { createClient } from '@/lib/supabase/client'
import { t as getLocalizedText } from '@/lib/helpers'
import type { Locale } from '@/types/database'

interface SearchResult {
  id: string
  type: 'item' | 'article' | 'partner'
  title: string
  subtitle: string
  href: string
  image?: string | null
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debouncedValue
}

export function SearchDialog({ locale }: { locale: string }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const loc = locale as Locale

  const debouncedQuery = useDebounce(query, 300)

  // Cmd+K keyboard shortcut
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Focus input when dialog opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setQuery('')
      setResults([])
    }
  }, [open])

  // Search on debounced query change
  const search = useCallback(
    async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([])
        return
      }

      setLoading(true)
      try {
        const supabase = createClient()
        const searchPattern = `%${searchQuery}%`
        const allResults: SearchResult[] = []

        // Search items
        const { data: items } = await supabase
          .from('items')
          .select('id, slug, name, short_description, image, subcategory:subcategories(slug, category:categories(slug))')
          .eq('visible', true)
          .or(`name->>en.ilike.${searchPattern},name->>es.ilike.${searchPattern},description->>en.ilike.${searchPattern}`)
          .limit(5)

        items?.forEach((item) => {
          const sub = item.subcategory as unknown as { slug: string; category: { slug: string } } | null
          allResults.push({
            id: item.id,
            type: 'item',
            title: getLocalizedText(item.name as Record<string, string>, loc),
            subtitle: getLocalizedText(item.short_description as Record<string, string>, loc),
            href: sub ? `/${sub.category.slug}/${sub.slug}/${item.slug}` : '#',
            image: item.image,
          })
        })

        // Search articles
        const { data: articles } = await supabase
          .from('articles')
          .select('id, slug, title, excerpt, image')
          .eq('published', true)
          .or(`title->>en.ilike.${searchPattern},title->>es.ilike.${searchPattern}`)
          .limit(5)

        articles?.forEach((article) => {
          allResults.push({
            id: article.id,
            type: 'article',
            title: getLocalizedText(article.title as Record<string, string>, loc),
            subtitle: getLocalizedText(article.excerpt as Record<string, string>, loc),
            href: `/blog/${article.slug}`,
            image: article.image,
          })
        })

        // Search partners
        const { data: partners } = await supabase
          .from('partners')
          .select('id, slug, name, description, image, type')
          .eq('visible', true)
          .or(`name.ilike.${searchPattern},description->>en.ilike.${searchPattern}`)
          .limit(5)

        partners?.forEach((partner) => {
          allResults.push({
            id: partner.id,
            type: 'partner',
            title: partner.name,
            subtitle: getLocalizedText(partner.description as Record<string, string>, loc),
            image: partner.image,
            href: '#',
          })
        })

        setResults(allResults)
      } catch {
        // silently fail
      } finally {
        setLoading(false)
      }
    },
    [loc]
  )

  useEffect(() => {
    search(debouncedQuery)
  }, [debouncedQuery, search])

  function handleNavigate(href: string) {
    setOpen(false)
    router.push(href)
  }

  function handleFullSearch() {
    if (query.trim()) {
      setOpen(false)
      const prefix = locale && locale.length === 2 && locale !== 'en' ? `/${locale}` : ''
      router.push(`${prefix}/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const typeIcon = {
    item: <Star className="h-4 w-4 text-orange-400 shrink-0" />,
    article: <FileText className="h-4 w-4 text-blue-400 shrink-0" />,
    partner: <Store className="h-4 w-4 text-green-400 shrink-0" />,
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-gray-400 hover:text-white"
        onClick={() => setOpen(true)}
      >
        <Search className="h-5 w-5" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg bg-slate-950 border-white/10 p-0 gap-0" showCloseButton={false}>
          <DialogTitle className="sr-only">Search</DialogTitle>
          <div className="flex items-center border-b border-white/10 px-4">
            <Search className="h-5 w-5 text-gray-500 shrink-0" />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleFullSearch()
                }
              }}
              placeholder={locale === 'es' ? 'Buscar...' : locale === 'de' ? 'Suchen...' : 'Search...'}
              className="flex-1 h-12 bg-transparent border-0 text-white placeholder:text-gray-500 outline-none px-3 text-sm"
            />
            {loading && <Loader2 className="h-4 w-4 text-gray-500 animate-spin" />}
            <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 text-[10px] font-medium text-gray-500 ml-2">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div className="max-h-80 overflow-y-auto py-2">
            {results.length > 0 ? (
              <div>
                {results.map((result) => (
                  <button
                    key={`${result.type}-${result.id}`}
                    onClick={() => handleNavigate(result.href)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left"
                  >
                    {typeIcon[result.type]}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {result.title}
                      </p>
                      {result.subtitle && (
                        <p className="text-xs text-gray-500 truncate">
                          {result.subtitle}
                        </p>
                      )}
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-600 shrink-0" />
                  </button>
                ))}

                {/* Full search link */}
                {query.trim() && (
                  <button
                    onClick={handleFullSearch}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left border-t border-white/5 mt-1"
                  >
                    <Search className="h-4 w-4 text-orange-400 shrink-0" />
                    <span className="text-sm text-orange-400">
                      {locale === 'es' ? `Ver todos los resultados para "${query}"` : `See all results for "${query}"`}
                    </span>
                  </button>
                )}
              </div>
            ) : query.trim() && !loading ? (
              <div className="px-4 py-8 text-center">
                <p className="text-sm text-gray-500">
                  {locale === 'es' ? 'Sin resultados' : locale === 'de' ? 'Keine Ergebnisse' : 'No results found'}
                </p>
              </div>
            ) : !query.trim() ? (
              <div className="px-4 py-8 text-center">
                <p className="text-xs text-gray-600">
                  {locale === 'es' ? 'Escribe para buscar experiencias, artículos y más' : 'Type to search experiences, articles and more'}
                </p>
              </div>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
