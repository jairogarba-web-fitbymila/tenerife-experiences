'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { usePathname } from '@/i18n/routing'

export function SearchInput({
  defaultValue = '',
  placeholder = 'Search...',
}: {
  defaultValue?: string
  placeholder?: string
}) {
  const [value, setValue] = useState(defaultValue)
  const router = useRouter()
  const pathname = usePathname()

  // Derive locale from the current path
  const locale = typeof window !== 'undefined' ? window.location.pathname.split('/')[1] : ''
  const prefix = locale && locale.length === 2 ? `/${locale}` : ''

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = value.trim()
    if (trimmed) {
      router.push(`${prefix}/search?q=${encodeURIComponent(trimmed)}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
      <Input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="h-14 pl-12 pr-4 text-lg bg-slate-900/50 border-white/10 text-white placeholder:text-gray-500 rounded-xl focus-visible:border-orange-400/50 focus-visible:ring-orange-400/20"
      />
    </form>
  )
}
