'use client'

import { useEffect, useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  ImageIcon,
  Check,
  X,
  Trash2,
  Loader2,
  Search,
  Filter,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  CheckCheck,
  XCircle,
  Eye,
  Copy,
} from 'lucide-react'

interface Photo {
  id: string
  unsplash_id: string
  url: string
  width: number
  height: number
  description: string | null
  photographer: string | null
  photographer_url: string | null
  search_term: string | null
  category: string
  tags: string[]
  color: string | null
  likes: number
  status: 'pending' | 'approved' | 'rejected'
  used_in: string[] | null
  notes: string | null
  created_at: string
}

const CATEGORIES = [
  'all', 'beaches', 'teide', 'nature', 'water', 'towns',
  'food', 'events', 'landscapes', 'activities', 'general',
]

const STATUS_OPTIONS = ['all', 'pending', 'approved', 'rejected']

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  approved: 'bg-green-500/10 text-green-400 border-green-500/20',
  rejected: 'bg-red-500/10 text-red-400 border-red-500/20',
}

const categoryColors: Record<string, string> = {
  beaches: 'bg-blue-500/10 text-blue-400',
  teide: 'bg-orange-500/10 text-orange-400',
  nature: 'bg-green-500/10 text-green-400',
  water: 'bg-cyan-500/10 text-cyan-400',
  towns: 'bg-purple-500/10 text-purple-400',
  food: 'bg-red-500/10 text-red-400',
  events: 'bg-pink-500/10 text-pink-400',
  landscapes: 'bg-emerald-500/10 text-emerald-400',
  activities: 'bg-amber-500/10 text-amber-400',
  general: 'bg-gray-500/10 text-gray-400',
}

export default function PhotosPage() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  const [page, setPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState('pending')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [previewPhoto, setPreviewPhoto] = useState<Photo | null>(null)
  const [updating, setUpdating] = useState<string | null>(null)
  const limit = 30

  const fetchPhotos = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        status: statusFilter,
        category: categoryFilter,
      })
      if (search) params.set('search', search)

      const res = await fetch(`/api/admin/photos?${params}`)
      if (res.ok) {
        const result = await res.json()
        setPhotos(result.data || [])
        setTotalCount(result.count || 0)
      }
    } catch (err) {
      console.error('Failed to fetch photos:', err)
    } finally {
      setLoading(false)
    }
  }, [page, statusFilter, categoryFilter, search, limit])

  useEffect(() => {
    fetchPhotos()
  }, [fetchPhotos])

  useEffect(() => {
    setPage(1)
    setSelected(new Set())
  }, [statusFilter, categoryFilter, search])

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id)
    try {
      const res = await fetch('/api/admin/photos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      })
      if (res.ok) {
        setPhotos((prev) =>
          prev.map((p) => (p.id === id ? { ...p, status: status as Photo['status'] } : p))
        )
      }
    } catch (err) {
      console.error('Failed to update status:', err)
    } finally {
      setUpdating(null)
    }
  }

  const bulkUpdateStatus = async (status: string) => {
    if (selected.size === 0) return
    setUpdating('bulk')
    try {
      const res = await fetch('/api/admin/photos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: Array.from(selected), status }),
      })
      if (res.ok) {
        setPhotos((prev) =>
          prev.map((p) =>
            selected.has(p.id) ? { ...p, status: status as Photo['status'] } : p
          )
        )
        setSelected(new Set())
      }
    } catch (err) {
      console.error('Failed to bulk update:', err)
    } finally {
      setUpdating(null)
    }
  }

  const deletePhoto = async (id: string) => {
    if (!confirm('Delete this photo from the bank?')) return
    try {
      const res = await fetch(`/api/admin/photos?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        setPhotos((prev) => prev.filter((p) => p.id !== id))
        setTotalCount((c) => c - 1)
      }
    } catch (err) {
      console.error('Failed to delete photo:', err)
    }
  }

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const selectAll = () => {
    if (selected.size === photos.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(photos.map((p) => p.id)))
    }
  }

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
  }

  const totalPages = Math.ceil(totalCount / limit)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearch(searchInput)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Photo Bank</h1>
          <p className="mt-1 text-sm text-gray-400">
            {totalCount} photos &middot; Review and approve photos for the website
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card className="bg-slate-900/50 border-white/5">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search by description, location, photographer..."
                  className="pl-9 bg-slate-800/50 border-white/10 text-white placeholder:text-gray-500"
                />
              </div>
              <Button type="submit" variant="outline" className="border-white/10 text-gray-300 hover:text-white">
                Search
              </Button>
            </form>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <div className="flex rounded-lg border border-white/10 overflow-hidden">
                {STATUS_OPTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                      statusFilter === s
                        ? 'bg-orange-500 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mt-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  categoryFilter === cat
                    ? 'bg-orange-500 text-white'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selected.size > 0 && (
        <div className="flex items-center gap-3 rounded-lg border border-orange-500/20 bg-orange-500/5 px-4 py-3">
          <span className="text-sm text-orange-400 font-medium">
            {selected.size} selected
          </span>
          <div className="flex gap-2 ml-auto">
            <Button
              size="sm"
              onClick={() => bulkUpdateStatus('approved')}
              disabled={updating === 'bulk'}
              className="bg-green-600 hover:bg-green-700 text-white text-xs"
            >
              <CheckCheck className="h-3.5 w-3.5 mr-1" />
              Approve All
            </Button>
            <Button
              size="sm"
              onClick={() => bulkUpdateStatus('rejected')}
              disabled={updating === 'bulk'}
              className="bg-red-600 hover:bg-red-700 text-white text-xs"
            >
              <XCircle className="h-3.5 w-3.5 mr-1" />
              Reject All
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setSelected(new Set())}
              className="text-gray-400 text-xs"
            >
              Clear
            </Button>
          </div>
        </div>
      )}

      {/* Photo Grid */}
      <Card className="bg-slate-900/50 border-white/5">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            Photos
            {!loading && (
              <Badge className="bg-white/5 text-gray-400 border-0 ml-2">
                {totalCount}
              </Badge>
            )}
          </CardTitle>
          {photos.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={selectAll}
              className="text-gray-400 hover:text-white text-xs"
            >
              {selected.size === photos.length ? 'Deselect All' : 'Select All'}
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
            </div>
          ) : photos.length === 0 ? (
            <p className="text-center py-20 text-gray-500">
              No photos found with current filters.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className={`group relative rounded-lg overflow-hidden border transition-all cursor-pointer ${
                    selected.has(photo.id)
                      ? 'border-orange-500 ring-2 ring-orange-500/30'
                      : 'border-white/5 hover:border-white/20'
                  }`}
                >
                  {/* Image */}
                  <div
                    className="aspect-[4/3] bg-slate-800"
                    onClick={() => toggleSelect(photo.id)}
                  >
                    <img
                      src={`${photo.url}&w=400&h=300&fit=crop`}
                      alt={photo.description || 'Photo'}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Selection Indicator */}
                  {selected.has(photo.id) && (
                    <div className="absolute top-2 left-2 h-6 w-6 rounded-full bg-orange-500 flex items-center justify-center">
                      <Check className="h-3.5 w-3.5 text-white" />
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className="absolute top-2 right-2">
                    <Badge className={`text-[10px] border ${statusColors[photo.status]}`}>
                      {photo.status}
                    </Badge>
                  </div>

                  {/* Info Overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3 pt-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-xs text-white truncate font-medium">
                      {photo.description || photo.search_term || 'No description'}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[10px] text-gray-400">
                        {photo.photographer || 'Unknown'}
                      </span>
                      <Badge className={`text-[10px] border-0 ${categoryColors[photo.category] || categoryColors.general}`}>
                        {photo.category}
                      </Badge>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-1 mt-2">
                      {photo.status !== 'approved' && (
                        <Button
                          size="icon-sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            updateStatus(photo.id, 'approved')
                          }}
                          disabled={updating === photo.id}
                          className="h-7 w-7 bg-green-600 hover:bg-green-700 text-white"
                        >
                          <Check className="h-3.5 w-3.5" />
                        </Button>
                      )}
                      {photo.status !== 'rejected' && (
                        <Button
                          size="icon-sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            updateStatus(photo.id, 'rejected')
                          }}
                          disabled={updating === photo.id}
                          className="h-7 w-7 bg-red-600 hover:bg-red-700 text-white"
                        >
                          <X className="h-3.5 w-3.5" />
                        </Button>
                      )}
                      <Button
                        size="icon-sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation()
                          setPreviewPhoto(photo)
                        }}
                        className="h-7 w-7 text-gray-300 hover:text-white"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        size="icon-sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation()
                          copyUrl(photo.url)
                        }}
                        className="h-7 w-7 text-gray-300 hover:text-white"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        size="icon-sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation()
                          deletePhoto(photo.id)
                        }}
                        className="h-7 w-7 text-gray-300 hover:text-red-400"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
              <span className="text-xs text-gray-500">
                Page {page} of {totalPages}
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="border-white/10 text-gray-300"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className="border-white/10 text-gray-300"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Preview Modal */}
      {previewPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setPreviewPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full mx-4 bg-slate-900 rounded-2xl overflow-hidden border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Preview Image */}
            <div className="relative aspect-video bg-slate-800">
              <img
                src={`${previewPhoto.url}&w=1200&q=85`}
                alt={previewPhoto.description || 'Photo preview'}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Preview Info */}
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {previewPhoto.description || 'No description'}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    by {previewPhoto.photographer || 'Unknown'} &middot;{' '}
                    {previewPhoto.width}x{previewPhoto.height} &middot;{' '}
                    {previewPhoto.likes} likes
                  </p>
                </div>
                <Badge className={`${statusColors[previewPhoto.status]} border`}>
                  {previewPhoto.status}
                </Badge>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge className={`${categoryColors[previewPhoto.category] || categoryColors.general} border-0`}>
                  {previewPhoto.category}
                </Badge>
                {previewPhoto.search_term && (
                  <Badge className="bg-white/5 text-gray-400 border-0">
                    Search: {previewPhoto.search_term}
                  </Badge>
                )}
                {previewPhoto.tags?.map((tag) => (
                  <Badge key={tag} className="bg-white/5 text-gray-400 border-0 text-[10px]">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Button
                  onClick={() => {
                    updateStatus(previewPhoto.id, 'approved')
                    setPreviewPhoto({ ...previewPhoto, status: 'approved' })
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Approve
                </Button>
                <Button
                  onClick={() => {
                    updateStatus(previewPhoto.id, 'rejected')
                    setPreviewPhoto({ ...previewPhoto, status: 'rejected' })
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <X className="h-4 w-4 mr-2" />
                  Reject
                </Button>
                <Button
                  variant="outline"
                  onClick={() => copyUrl(previewPhoto.url)}
                  className="border-white/10 text-gray-300"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy URL
                </Button>
                <a
                  href={`https://unsplash.com/photos/${previewPhoto.unsplash_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto"
                >
                  <Button variant="ghost" className="text-gray-400 hover:text-white">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Unsplash
                  </Button>
                </a>
                <Button
                  variant="ghost"
                  onClick={() => setPreviewPhoto(null)}
                  className="text-gray-400"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
