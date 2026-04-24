'use client'

import { useState, useCallback } from 'react'
import { useReview } from './review-context'
import { ImagePickerModal } from './image-picker-modal'

interface EditableImageProps {
  sectionId: string
  currentImage: string
  categoryFilter?: string
  label?: string
  onImageChange?: (newUrl: string) => void
  className?: string
  // New: support for direct entity updates
  target?: {
    table: string // 'items' | 'articles' | 'categories' | etc.
    id: string    // entity UUID
  }
}

export function EditableImage({
  sectionId,
  currentImage,
  categoryFilter,
  label,
  onImageChange,
  className = '',
  target,
}: EditableImageProps) {
  const { isReviewMode, canEdit } = useReview()
  const [pickerOpen, setPickerOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSelect = useCallback(async (newUrl: string) => {
    setSaving(true)
    try {
      let res: Response

      if (target) {
        // Direct entity update (items, articles, etc.)
        res = await fetch('/api/admin/update-image', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            table: target.table,
            id: target.id,
            image_url: newUrl,
          }),
        })
      } else {
        // Landing image override (original behavior)
        res = await fetch('/api/admin/landing-images', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            section_id: sectionId,
            image_url: newUrl,
            updated_by: 'admin',
          }),
        })
      }

      if (res.ok) {
        setSaved(true)
        onImageChange?.(newUrl)
        setTimeout(() => setSaved(false), 2000)
      }
    } catch (err) {
      console.error('Error updating image:', err)
    }
    setSaving(false)
    setPickerOpen(false)
  }, [sectionId, target, onImageChange])

  if (!isReviewMode || !canEdit) return null

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setPickerOpen(true)
        }}
        className={`z-[55] flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold shadow-lg cursor-pointer transition-all hover:scale-105 ${
          saved
            ? 'bg-green-500 text-white'
            : saving
              ? 'bg-yellow-500 text-black animate-pulse'
              : 'bg-blue-600 hover:bg-blue-500 text-white'
        } ${className}`}
      >
        {saved ? '✓ Guardado' : saving ? 'Guardando...' : '📷 Cambiar foto'}
      </button>

      <ImagePickerModal
        isOpen={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={handleSelect}
        currentImage={currentImage}
        categoryFilter={categoryFilter}
        sectionLabel={label}
      />
    </>
  )
}
