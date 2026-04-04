'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Photo {
  url: string
  label: string
  source: string
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

function getLocaleName(name: unknown, fallback: string = ''): string {
  if (!name) return fallback
  if (typeof name === 'string') return name
  if (typeof name === 'object' && name !== null) {
    const obj = name as Record<string, string>
    return obj.es || obj.en || Object.values(obj)[0] || fallback
  }
  return fallback
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

type TabMode = 'url' | 'upload' | 'gallery'

export function ImagePickerModal({
  isOpen,
  onClose,
  onSelect,
  currentImage,
  categoryFilter,
  sectionLabel,
}: ImagePickerModalProps) {
  const [activeMode, setActiveMode] = useState<TabMode>('url')
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<string>(categoryFilter || 'all')
  const [search, setSearch] = useState('')

  // URL mode state
  const [urlInput, setUrlInput] = useState('')
  const [urlPreview, setUrlPreview] = useState('')
  const [urlError, setUrlError] = useState('')

  // Upload mode state
  const [uploading, setUploading] = useState(false)
  const [uploadPreview, setUploadPreview] = useState('')
  const [uploadedUrl, setUploadedUrl] = useState('')
  const [uploadError, setUploadError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setUrlInput('')
      setUrlPreview('')
      setUrlError('')
      setUploadPreview('')
      setUploadedUrl('')
      setUploadError('')
    }
  }, [isOpen])

  // Load gallery photos
  const loadPhotos = useCallback(async () => {
    if (activeMode !== 'gallery') return
    setLoading(true)
    const supabase = createClient()
    const allPhotos: Photo[] = []

    const { data: cats } = await supabase.from('categories').select('slug, name, image')
    if (cats) {
      cats.forEach(c => {
        if (c.image) allPhotos.push({ url: c.image, label: getLocaleName(c.name, c.slug), source: 'categories', category: c.slug })
      })
    }

    const { data: subs } = await supabase.from('subcategories').select('slug, name, image, category_id, categories(slug)')
    if (subs) {
      subs.forEach((s: any) => {
        if (s.image) allPhotos.push({ url: s.image, label: getLocaleName(s.name, s.slug), source: 'subcategories', category: s.categories?.slug })
      })
    }

    const { data: items } = await supabase.from('items').select('slug, name, image, images, subcategory_id, subcategories(slug, category_id, categories(slug))')
    if (items) {
      items.forEach((item: any) => {
        const catSlug = item.subcategories?.categories?.slug
        if (item.image) {
          allPhotos.push({ url: item.image, label: getLocaleName(item.name, item.slug), source: 'items', category: catSlug })
        }
        if (item.images && Array.isArray(item.images)) {
          item.images.forEach((img: string, i: number) => {
            if (img) allPhotos.push({ url: img, label: `${getLocaleName(item.name, item.slug)} (${i + 1})`, source: 'items', category: catSlug })
          })
        }
      })
    }

    setPhotos(allPhotos)
    setLoading(false)
  }, [activeMode])

  useEffect(() => {
    if (isOpen && activeMode === 'gallery') loadPhotos()
  }, [isOpen, activeMode, loadPhotos])

  // URL validation
  function handleUrlCheck() {
    setUrlError('')
    const url = urlInput.trim()
    if (!url) { setUrlError('Introduce una URL'); return }
    try {
      new URL(url)
      setUrlPreview(url)
    } catch {
      setUrlError('URL no válida')
    }
  }

  // File upload handler
  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadError('')
    setUploadedUrl('')

    // Validate
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Máximo 5MB')
      return
    }
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)) {
      setUploadError('Solo JPEG, PNG, WebP o GIF')
      return
    }

    // Preview
    const reader = new FileReader()
    reader.onload = (ev) => setUploadPreview(ev.target?.result as string)
    reader.readAsDataURL(file)

    // Upload
    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/admin/upload-image', { method: 'POST', body: formData })
      const data = await res.json()
      if (res.ok && data.url) {
        setUploadedUrl(data.url)
      } else {
        setUploadError(data.error || 'Error al subir')
      }
    } catch {
      setUploadError('Error de conexión')
    }
    setUploading(false)
  }

  // Filter gallery photos
  const filteredPhotos = photos.filter(p => {
    if (activeTab !== 'all' && p.category !== activeTab) return false
    if (search && !p.label.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })
  const categories = [...new Set(photos.map(p => p.category).filter(Boolean))] as string[]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-[95vw] max-w-4xl max-h-[85vh] bg-slate-900 rounded-2xl border border-orange-500/30 shadow-2xl flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
          <div>
            <h2 className="text-lg font-bold text-white">Cambiar imagen</h2>
            {sectionLabel && <p className="text-sm text-orange-400 mt-0.5">{sectionLabel}</p>}
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">✕</button>
        </div>

        {/* Current image */}
        {currentImage && (
          <div className="px-6 py-2 border-b border-white/5 shrink-0 flex items-center gap-3">
            <span className="text-xs text-white/40">Actual:</span>
            <img src={currentImage} alt="Actual" className="w-20 h-12 object-cover rounded border border-orange-500/30" />
          </div>
        )}

        {/* Mode tabs */}
        <div className="px-6 py-3 border-b border-white/5 shrink-0 flex gap-2">
          {([
            { id: 'url' as TabMode, icon: '🔗', label: 'Pegar URL' },
            { id: 'upload' as TabMode, icon: '📤', label: 'Subir foto' },
            { id: 'gallery' as TabMode, icon: '🖼️', label: 'Galería existente' },
          ]).map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveMode(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                activeMode === tab.id
                  ? 'bg-orange-500 text-black'
                  : 'bg-white/10 text-white/60 hover:bg-white/20'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto p-6">

          {/* === URL MODE === */}
          {activeMode === 'url' && (
            <div className="space-y-4">
              <p className="text-sm text-white/50">Busca una imagen en Google, haz clic derecho &gt; &quot;Copiar dirección de imagen&quot; y pégala aquí:</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={urlInput}
                  onChange={e => { setUrlInput(e.target.value); setUrlError(''); setUrlPreview('') }}
                  onKeyDown={e => e.key === 'Enter' && handleUrlCheck()}
                  placeholder="https://ejemplo.com/foto-tenerife.jpg"
                  className="flex-1 bg-slate-800 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50"
                />
                <button
                  onClick={handleUrlCheck}
                  className="px-4 py-3 bg-orange-500 hover:bg-orange-400 text-black rounded-lg text-sm font-semibold transition-colors"
                >
                  Ver
                </button>
              </div>
              {urlError && <p className="text-red-400 text-sm">{urlError}</p>}
              {urlPreview && (
                <div className="space-y-3">
                  <div className="relative rounded-xl overflow-hidden border border-white/10 max-h-80">
                    <img src={urlPreview} alt="Preview" className="w-full h-full object-contain bg-black" onError={() => setUrlError('No se pudo cargar la imagen')} />
                  </div>
                  <button
                    onClick={() => onSelect(urlPreview)}
                    className="w-full py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-bold transition-colors"
                  >
                    ✓ Usar esta imagen
                  </button>
                </div>
              )}
            </div>
          )}

          {/* === UPLOAD MODE === */}
          {activeMode === 'upload' && (
            <div className="space-y-4">
              <p className="text-sm text-white/50">Sube una foto desde tu dispositivo (máx. 5MB, JPEG/PNG/WebP):</p>

              <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={handleFileUpload} className="hidden" />

              {!uploadPreview ? (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-12 border-2 border-dashed border-white/20 rounded-xl text-white/40 hover:border-orange-500/50 hover:text-orange-400 transition-all flex flex-col items-center gap-2"
                >
                  <span className="text-4xl">📤</span>
                  <span className="text-sm font-medium">Haz clic para elegir foto</span>
                  <span className="text-xs">o arrastra y suelta</span>
                </button>
              ) : (
                <div className="space-y-3">
                  <div className="relative rounded-xl overflow-hidden border border-white/10 max-h-80">
                    <img src={uploadPreview} alt="Preview" className="w-full h-full object-contain bg-black" />
                    {uploading && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                          <span className="text-sm">Subiendo...</span>
                        </div>
                      </div>
                    )}
                  </div>
                  {uploadError && <p className="text-red-400 text-sm">{uploadError}</p>}
                  {uploadedUrl && (
                    <button
                      onClick={() => onSelect(uploadedUrl)}
                      className="w-full py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-bold transition-colors"
                    >
                      ✓ Usar esta imagen
                    </button>
                  )}
                  <button
                    onClick={() => { setUploadPreview(''); setUploadedUrl(''); setUploadError(''); fileInputRef.current?.click() }}
                    className="w-full py-2 bg-white/10 hover:bg-white/20 text-white/60 rounded-lg text-sm transition-colors"
                  >
                    Elegir otra foto
                  </button>
                </div>
              )}
            </div>
          )}

          {/* === GALLERY MODE === */}
          {activeMode === 'gallery' && (
            <div className="space-y-3">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Buscar por nombre..."
                className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50"
              />
              <div className="flex gap-1.5 flex-wrap">
                <button onClick={() => setActiveTab('all')} className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${activeTab === 'all' ? 'bg-orange-500 text-black' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}>
                  Todas ({photos.length})
                </button>
                {categories.map(cat => (
                  <button key={cat} onClick={() => setActiveTab(cat)} className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${activeTab === cat ? 'bg-orange-500 text-black' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}>
                    {CATEGORY_LABELS[cat] || cat} ({photos.filter(p => p.category === cat).length})
                  </button>
                ))}
              </div>

              {loading ? (
                <div className="flex items-center justify-center h-40 text-white/40">
                  <div className="text-center">
                    <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    Cargando fotos...
                  </div>
                </div>
              ) : filteredPhotos.length === 0 ? (
                <div className="flex items-center justify-center h-40 text-white/40">No se encontraron fotos</div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {filteredPhotos.map((photo, i) => {
                    const isSelected = photo.url === currentImage
                    return (
                      <button
                        key={`${photo.url}-${i}`}
                        onClick={() => onSelect(photo.url)}
                        className={`group relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all hover:scale-[1.03] cursor-pointer ${
                          isSelected ? 'border-green-500 shadow-lg shadow-green-500/20' : 'border-transparent hover:border-orange-500'
                        }`}
                      >
                        <img src={photo.url} alt={photo.label} className="w-full h-full object-cover" loading="lazy" />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                          <p className="text-[10px] text-white/90 leading-tight line-clamp-2">{photo.label}</p>
                        </div>
                        {isSelected && (
                          <div className="absolute top-1.5 right-1.5 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-black font-bold text-xs">✓</div>
                        )}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
