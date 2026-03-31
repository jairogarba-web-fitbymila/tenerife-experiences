'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'

export interface ReviewNote {
  id: string
  page: string
  sectionId: string
  sectionLabel: string
  status: 'pending' | 'approved' | 'changes_requested'
  note: string
  photoIssue: boolean
  createdAt: string
  updatedAt: string
}

interface ReviewContextType {
  isReviewMode: boolean
  notes: ReviewNote[]
  saveNote: (note: Omit<ReviewNote, 'id' | 'createdAt' | 'updatedAt'>) => void
  getNote: (page: string, sectionId: string) => ReviewNote | undefined
  exportNotes: () => string
  stats: { total: number; approved: number; changes: number; pending: number }
  logout: () => Promise<void>
}

const ReviewContext = createContext<ReviewContextType | null>(null)

const STORAGE_KEY = 'tenerife-review-notes'

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? decodeURIComponent(match[2]) : null
}

export function ReviewProvider({ children }: { children: ReactNode }) {
  const [isReviewMode, setIsReviewMode] = useState(false)
  const [notes, setNotes] = useState<ReviewNote[]>([])

  // Check for admin session via cookie (set at login) or legacy URL param
  useEffect(() => {
    // Check admin_review cookie (set by /api/admin/login only)
    if (getCookie('admin_review') === 'true') {
      setIsReviewMode(true)
    }
  }, [])

  // Load notes from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setNotes(JSON.parse(stored))
    } catch {}
  }, [])

  const saveNote = useCallback((note: Omit<ReviewNote, 'id' | 'createdAt' | 'updatedAt'>) => {
    setNotes(prev => {
      const existing = prev.findIndex(n => n.page === note.page && n.sectionId === note.sectionId)
      const now = new Date().toISOString()
      let updated: ReviewNote[]

      if (existing >= 0) {
        updated = [...prev]
        updated[existing] = {
          ...updated[existing],
          ...note,
          updatedAt: now,
        }
      } else {
        updated = [...prev, {
          ...note,
          id: crypto.randomUUID(),
          createdAt: now,
          updatedAt: now,
        }]
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const getNote = useCallback((page: string, sectionId: string) => {
    return notes.find(n => n.page === page && n.sectionId === sectionId)
  }, [notes])

  const exportNotes = useCallback(() => {
    const lines: string[] = [
      '=== REVISIÓN TENERIFE EXPERIENCES ===',
      `Fecha: ${new Date().toLocaleString('es-ES')}`,
      `Total secciones revisadas: ${notes.length}`,
      `✅ Aprobadas: ${notes.filter(n => n.status === 'approved').length}`,
      `🔄 Con cambios: ${notes.filter(n => n.status === 'changes_requested').length}`,
      `⏳ Pendientes: ${notes.filter(n => n.status === 'pending').length}`,
      '',
      '--- CAMBIOS SOLICITADOS ---',
      '',
    ]

    const changes = notes.filter(n => n.status === 'changes_requested')
    if (changes.length === 0) {
      lines.push('(ninguno)')
    } else {
      changes.forEach(n => {
        lines.push(`📍 ${n.page} > ${n.sectionLabel}`)
        if (n.photoIssue) lines.push('   🖼️ FOTO: necesita cambio')
        if (n.note) lines.push(`   📝 Nota: ${n.note}`)
        lines.push('')
      })
    }

    lines.push('', '--- APROBADAS ---', '')
    const approved = notes.filter(n => n.status === 'approved')
    if (approved.length === 0) {
      lines.push('(ninguna)')
    } else {
      approved.forEach(n => {
        lines.push(`✅ ${n.page} > ${n.sectionLabel}`)
        if (n.note) lines.push(`   📝 ${n.note}`)
      })
    }

    return lines.join('\n')
  }, [notes])

  const logout = useCallback(async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
    } catch {}
    // Clear client-side state
    document.cookie = 'admin_review=; path=/; max-age=0'
    sessionStorage.removeItem('review-mode')
    setIsReviewMode(false)
    window.location.href = '/'
  }, [])

  const stats = {
    total: notes.length,
    approved: notes.filter(n => n.status === 'approved').length,
    changes: notes.filter(n => n.status === 'changes_requested').length,
    pending: notes.filter(n => n.status === 'pending').length,
  }

  return (
    <ReviewContext.Provider value={{ isReviewMode, notes, saveNote, getNote, exportNotes, stats, logout }}>
      {children}
    </ReviewContext.Provider>
  )
}

export function useReview() {
  const ctx = useContext(ReviewContext)
  if (!ctx) throw new Error('useReview must be inside ReviewProvider')
  return ctx
}
