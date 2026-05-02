'use client'

import { useEffect, useState } from 'react'

/**
 * Hides itself when the user scrolls near the bottom of the page,
 * so the floating booking card stops overlapping the final sections.
 */
export function StickyBookingCard({ children }: { children: React.ReactNode }) {
  const [nearBottom, setNearBottom] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const scrollBottom = window.scrollY + window.innerHeight
      const distanceFromBottom = document.documentElement.scrollHeight - scrollBottom
      setNearBottom(distanceFromBottom < 320)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div
      className={`hidden md:block fixed bottom-8 right-8 z-30 max-w-sm transition-all duration-300 ${
        nearBottom ? 'opacity-0 pointer-events-none translate-y-4' : 'opacity-100 pointer-events-auto translate-y-0'
      }`}
    >
      {children}
    </div>
  )
}
