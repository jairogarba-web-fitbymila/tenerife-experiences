'use client'

import { useState } from 'react'
import { useReview } from './review-context'

interface ReviewSectionProps {
  page: string
  sectionId: string
  sectionLabel: string
  children: React.ReactNode
}

export function ReviewSection({ page, sectionId, sectionLabel, children }: ReviewSectionProps) {
  const { isReviewMode, canEdit, saveNote, getNote } = useReview()
  const [open, setOpen] = useState(false)
  const [note, setNote] = useState('')
  const [photoIssue, setPhotoIssue] = useState(false)

  if (!isReviewMode) return <>{children}</>

  const existing = getNote(page, sectionId)
  const statusColor = existing?.status === 'approved'
    ? 'bg-green-500'
    : existing?.status === 'changes_requested'
      ? 'bg-red-500'
      : 'bg-yellow-500'

  const statusIcon = existing?.status === 'approved'
    ? '✅'
    : existing?.status === 'changes_requested'
      ? '🔄'
      : '⏳'

  function handleSave(status: 'approved' | 'changes_requested') {
    saveNote({
      page,
      sectionId,
      sectionLabel,
      status,
      note: note || existing?.note || '',
      photoIssue: photoIssue || existing?.photoIssue || false,
    })
    setOpen(false)
    setNote('')
    setPhotoIssue(false)
  }

  return (
    <div className="relative group/review">
      {/* Section highlight border in review mode */}
      <div className="absolute inset-0 border-2 border-dashed border-orange-500/30 pointer-events-none z-[50] group-hover/review:border-orange-500/60 transition-colors" />

      {/* Floating badge - always visible */}
      <button
        onClick={() => {
          setOpen(!open)
          if (existing?.note) setNote(existing.note)
          if (existing?.photoIssue) setPhotoIssue(existing.photoIssue)
        }}
        className={`absolute top-20 left-3 z-[60] flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg cursor-pointer transition-all hover:scale-105 ${
          existing ? statusColor : 'bg-orange-500 animate-pulse'
        }`}
      >
        <span>{existing ? statusIcon : '📝'}</span>
        <span className="hidden sm:inline">{sectionLabel}</span>
      </button>

      {/* Review form overlay */}
      {open && (
        <div className="absolute top-28 left-3 z-[70] w-80 bg-slate-900 border border-orange-500/40 rounded-xl shadow-2xl p-4 space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white">{sectionLabel}</h4>
            <button onClick={() => setOpen(false)} className="text-white/50 hover:text-white text-lg leading-none">&times;</button>
          </div>

          {canEdit ? (
            <>
              {/* Photo issue toggle */}
              <label className="flex items-center gap-2 text-sm text-white/80 cursor-pointer">
                <input
                  type="checkbox"
                  checked={photoIssue}
                  onChange={e => setPhotoIssue(e.target.checked)}
                  className="w-4 h-4 rounded border-orange-500/50 accent-orange-500"
                />
                🖼️ La foto no va / necesita cambio
              </label>

              {/* Note textarea */}
              <textarea
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="Escribe tu nota aquí... (ej: cambiar foto por una del Teide, texto incorrecto, etc.)"
                className="w-full h-20 bg-slate-800 border border-white/10 rounded-lg p-2 text-sm text-white placeholder-white/30 resize-none focus:outline-none focus:border-orange-500/50"
              />

              {/* Existing note display */}
              {existing?.note && !note && (
                <p className="text-xs text-white/50 italic">Nota anterior: {existing.note}</p>
              )}

              {/* Action buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleSave('approved')}
                  className="flex-1 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white text-sm font-semibold transition-colors"
                >
                  ✅ Aprobar
                </button>
                <button
                  onClick={() => handleSave('changes_requested')}
                  className="flex-1 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-sm font-semibold transition-colors"
                >
                  🔄 Cambiar
                </button>
              </div>
            </>
          ) : (
            <p className="text-xs text-white/50 italic text-center py-2">
              👁️ Solo lectura — no puedes editar
            </p>
          )}
        </div>
      )}

      {children}
    </div>
  )
}
