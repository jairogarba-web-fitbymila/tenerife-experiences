'use client'

import { useEffect } from 'react'

export function ScrollEffects() {
  useEffect(() => {
    // Intersection Observer for reveal animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => {
      observer.observe(el)
    })

    // Parallax effect for cinematic backgrounds
    const handleScroll = () => {
      document.querySelectorAll('[data-parallax]').forEach((el) => {
        const rect = (el as HTMLElement).parentElement?.getBoundingClientRect()
        if (!rect) return
        const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
        const yOffset = scrollPercent * 50 - 25
        ;(el as HTMLElement).style.transform = `translateY(${yOffset}px)`
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return null
}
