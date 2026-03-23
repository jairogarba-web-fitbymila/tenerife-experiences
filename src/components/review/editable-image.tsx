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
  children: React.ReactNode
}

export function EditableImage({
  sectionId,
  currentImage,
  categoryFilter,
  label,
  onImageChange,
  children,
}: EditableImageProps) {
  const { isReviewMode } = useReview()
  const [pickerOpen, setPickerOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSelect = useCallback(async (newUrl: string) => {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/landing-images', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section_id: sectionId,
          image_url: newUrl,
          updated_by: 'admin',
        }),
      })

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
  }, [sectionId, onImageChange])

  if (!isReviewMode) {
    return <>{children}</>
  }

  return (
    <div className="relative group/edit">
      {children}

      {/* Edit button overlay */}
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setPickerOpen(true)
        }}
        className={`absolute z-[55] flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold shadow-lg cursor-pointer transition-all hover:scale-105 ${
          saved
            ? 'bg-green-500 text-white top-2 right-2'
            : saving
              ? 'bg-yellow-500 text-black top-2 right-2'
              : 'bg-blue-500 hover:bg-blue-400 text-white top-2 right-2 opacity-60 group-hover/edit:opacity-100'
        }`}
      >
        {saved ? '✓ Guardado' : saving ? '...' : '📷 Cambiar'}
      </button>

      <ImagePickerModal
        isOpen={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={handleSelect}
        currentImage={currentImage}
        categoryFilter={categoryFilter}
        sectionLabel={label}
      />
    </div>
  )
}
