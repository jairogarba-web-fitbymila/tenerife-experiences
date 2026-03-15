'use client'

import dynamic from 'next/dynamic'
import type { MapPin } from '@/components/shared/tenerife-map'

const TenerifeMap = dynamic(() => import('@/components/shared/tenerife-map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[350px] md:h-[500px] rounded-2xl bg-slate-800/50 animate-pulse flex items-center justify-center">
      <span className="text-gray-500">Loading map...</span>
    </div>
  ),
})

interface MapSectionProps {
  items: MapPin[]
}

export function MapSection({ items }: MapSectionProps) {
  return <TenerifeMap items={items} />
}
