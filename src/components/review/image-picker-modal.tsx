'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Photo {
  url: string
  label: string
  source: string // 'categories' | 'subcategories' | 'items'
  category?: string
}

interface ImagePickerModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (imageUrl: string) => void
  currentImage?: string
  categoryFilter?: string
  sectionLabel?: string
}

const CATEGORY_LABELS: Record<string, string> = {
  experiences: 'Experiencias',
  beaches: 'Playas',
  culture: 'Cultura',
  nature: 'Naturaleza',
  food: 'Gastronomía',
  nightlife: 'Vida Nocturna',
  family: 'Familia',
  shopping: 'Shopping',
  wellness: 'Wellness',
}

export function ImagePickerModal({
  isOpen,
  onClose,
  onSelect,
  currentImage,
  categoryFilter,
  sectionLabel,
}: ImagePickerModalProps) {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<string>(categoryFilter || 'all')
  const [search, setSearch] = useState('')
  const [saving, setSaving] = useState(false)

  // Load all photos from Supabase on mount
  const loadPhotos = useCallback(async () => {
    setLoading(true)
    const supabase = createClient()
    const allPhotos: Photo[] = []

    // Load from categories
    const { data: cats } = await supabase
      .from('categories')
      .select('slug, name, image')
    if (cats) {
      cats.forEach(c => {
        if (c.image) {
          allPhotos.push({
            url: c.image,
            label: c.name || c.slug,
            source: 'categories',
            category: c.slug,
          })
        }
      })
    }

    // Load from subcategories
    const { data: subs } = await supabase
      .from('subcategories')
      .select('slug, name, image, category_id, categories(slug)')
    if (subs) {
      subs.forEach((s: any) => {
        if (s.image) {
          allPhotos.push({
            url: s.image,
            label: s.name || s.slug,
            source: 'subcategories',
            category: s.categories?.slug,
          })
        }
      })
    }

    // Load from items (main image + images array)
    const { data: items } = await supabase
      .from('items')
      .select('slug, name, image, images, subcategory_id, subcategories(slug, category_id, categories(slug))')
    if (items) {
      items.forEach((item: any) => {
        const catSlug = item.subcategories?.categories?.slug
        if (item.image) {
          allPhotos.push({
            url: item.image,
            label: item.name || item.slug,
            source: 'items',
            category: catSlug,
          })
        }
        if (item.images && Array.isArray(item.images)) {
          item.images.forEach((img: string, i: number) => {
            if (img) {
              allPhotos.push({
                url: img,
                label: `${item.name || item.slug} (${i + 1})`,
                source: 'items',
                category: catSlug,
              })
            }
          })
        }
      })
    }

    setPhotos(allPhotos)
    setLoading(false)
  }, [])

  useEffect(() => {
    if (isOpen) {
      loadPhotos()
    }
  }, [isOpen, loadPhotos])

  // Filter photos by active tab and search
  const filteredPhotos = photos.filter(p => {
    if (activeTab !== 'all' && p.category !== activeTab) return false
    if (search && !p.label.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  // Get unique categories
  const categories = [...new Set(photos.map(p => p.category).filter(Boolean))] as string[]

  async function handleSelect(photo: Photo) {
    setSaving(true)
    onSelect(photo.url)
    setSaving(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative w-[95vw] max-w-5xl max-h-[85vh] bg-slate-900 rounded-2xl border border-orange-500/30 shadow-2xl flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
          <div>
            <h2 className="text-lg font-bold text-white">Seleccionar foto</h2>
            {sectionLabel && (
              <p className="text-sm text-orange-400 mt-0.5">Para: {sectionLabel}</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/40">{filteredPhotos.length} fotos</span>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Search + tabs */}
        <div className="px-6 py-3 border-b border-white/5 shrink-0 space-y-3">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar por nombre..."
            className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50"
          />
          <div className="flex gap-1.5 flex-wrap">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                activeTab === 'all'
                  ? 'bg-orange-500 text-black'
                  : 'bg-white/10 text-white/60 hover:bg-white/20'
              }`}
            >
              Todas ({photos.length})
            </button>
            {categories.map(cat => {
              const count = photos.filter(p => p.category === cat).length
              return (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    activeTab === cat
                      ? 'bg-orange-500 text-black'
                      : 'bg-white/10 text-white/60 hover:bg-white/20'
                  }`}
                >
                  {CATEGORY_LABELS[cat] || cat} ({count})
                </button>
              )
            })}
          </div>
        </div>

        {/* Current image */}
        {currentImage && (
          <div className="px-6 py-2 border-b border-white/5 shrink-0 flex items-center gap-3">
            <span className="text-xs text-white/40">Actual:</span>
            <img
              src={currentImage}
              alt="Foto actual"
              className="w-16 h-10 object-cover rounded border border-orange-500/30"
            />
          </div>
        )}

        {/* Photo grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-40 text-white/40">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                Cargando fotos de la base de datos...
              </div>
            </div>
          ) : filteredPhotos.length === 0 ? (
            <div className="flex items-center justify-center h-40 text-white/40">
              No se encontraron fotos
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {filteredPhotos.map((photo, i) => {
                const isSelected = photo.url === currentImage
                return (
                  <button
                    key={`${photo.url}-${i}`}
                    onClick={() => handleSelect(photo)}
                    disabled={saving}
                    className={`group relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all hover:scale-[1.03] cursor-pointer ${
                      isSelected
                        ? 'border-green-500 shadow-lg shadow-green-500/20'
                        : 'border-transparent hover:border-orange-500'
                    }`}
                  >
                    <img
                      src={photo.url}
                      alt={photo.label}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {/* Overlay label */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                      <p className="text-[10px] text-white/90 leading-tight line-clamp-2">{photo.label}</p>
                      <p className="text-[8px] text-white/40 mt-0.5">{CATEGORY_LABELS[photo.category || ''] || photo.category}</p>
                    </div>
                    {/* Selected indicator */}
                    {isSelected && (
                      <div className="absolute top-1.5 right-1.5 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-black font-bold text-xs">
                        ✓
                      </div>
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 transition-colors" />
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
