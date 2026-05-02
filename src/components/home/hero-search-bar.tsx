'use client'

import { useState } from 'react'
import { useRouter } from '@/i18n/routing'
import { MapPin, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function HeroSearchBar({ placeholder }: { placeholder: string }) {
  const [query, setQuery] = useState('')
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = query.trim()
    if (trimmed) {
      router.push({ pathname: '/search', query: { q: trimmed } })
    }
  }

  return (
    <div className="mx-auto max-w-xl">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity blur" />
        <div className="relative flex items-center bg-slate-900 rounded-xl border border-white/10 px-4 py-3">
          <MapPin className="h-5 w-5 text-orange-400 mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-lg"
          />
          <Button
            type="submit"
            size="sm"
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg ml-2"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}
