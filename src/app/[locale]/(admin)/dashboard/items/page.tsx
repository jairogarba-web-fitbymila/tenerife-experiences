'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Package,
  Trash2,
  Eye,
  EyeOff,
  Star,
  StarOff,
  Loader2,
  Search,
} from 'lucide-react'

interface Item {
  id: string
  slug: string
  name: Record<string, string>
  subcategory_id: string | null
  image: string | null
  visible: boolean
  featured: boolean
  price_from: number | null
  rating: number | null
  created_at: string
}

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const fetchItems = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/items')
      if (res.ok) {
        const data = await res.json()
        setItems(data)
      }
    } catch (err) {
      console.error('Failed to fetch items:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const toggleField = async (
    id: string,
    field: 'visible' | 'featured',
    current: boolean
  ) => {
    try {
      const res = await fetch('/api/admin/items', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, [field]: !current }),
      })
      if (res.ok) {
        setItems((prev) =>
          prev.map((i) => (i.id === id ? { ...i, [field]: !current } : i))
        )
      }
    } catch (err) {
      console.error(`Failed to toggle ${field}:`, err)
    }
  }

  const deleteItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return
    try {
      const res = await fetch(`/api/admin/items?id=${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        setItems((prev) => prev.filter((i) => i.id !== id))
      }
    } catch (err) {
      console.error('Failed to delete item:', err)
    }
  }

  const filtered = items.filter((item) => {
    if (!search) return true
    const q = search.toLowerCase()
    const nameEs = item.name?.es?.toLowerCase() || ''
    const nameEn = item.name?.en?.toLowerCase() || ''
    return nameEs.includes(q) || nameEn.includes(q)
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Items</h1>
        <p className="mt-1 text-sm text-gray-400">
          Manage experiences, activities, and listings
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="bg-slate-900/50 border-white/5">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-white">{items.length}</div>
            <p className="text-xs text-gray-400">Total Items</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900/50 border-white/5">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-400">
              {items.filter((i) => i.visible).length}
            </div>
            <p className="text-xs text-gray-400">Visible</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900/50 border-white/5">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-amber-400">
              {items.filter((i) => i.featured).length}
            </div>
            <p className="text-xs text-gray-400">Featured</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search items by name..."
          className="pl-10 bg-slate-900/50 border-white/10 text-white placeholder:text-gray-500"
        />
      </div>

      {/* Items List */}
      <Card className="bg-slate-900/50 border-white/5">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Package className="h-4 w-4" />
            All Items ({filtered.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center py-12 text-gray-500">
              {search ? 'No items match your search.' : 'No items found.'}
            </p>
          ) : (
            <div className="space-y-3">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] p-4"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      {item.image && (
                        <img
                          src={item.image}
                          alt=""
                          className="h-8 w-8 rounded object-cover"
                        />
                      )}
                      <p className="truncate text-sm font-medium text-white">
                        {item.name?.es || item.name?.en || 'Sin nombre'}
                      </p>
                      {item.featured && (
                        <Badge className="bg-amber-500/10 text-amber-400 border-0 text-[10px]">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
                      {item.subcategory_id && (
                        <span>Sub: {item.subcategory_id}</span>
                      )}
                      {item.price_from != null && (
                        <span>From {item.price_from}EUR</span>
                      )}
                      {item.rating != null && (
                        <span>{item.rating} rating</span>
                      )}
                      <span>
                        {new Date(item.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 ml-4">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() =>
                        toggleField(item.id, 'featured', item.featured)
                      }
                      className={
                        item.featured
                          ? 'text-amber-400 hover:text-amber-300'
                          : 'text-gray-500 hover:text-amber-400'
                      }
                      title={item.featured ? 'Unfeature' : 'Feature'}
                    >
                      {item.featured ? (
                        <Star className="h-4 w-4 fill-amber-400" />
                      ) : (
                        <StarOff className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() =>
                        toggleField(item.id, 'visible', item.visible)
                      }
                      className={
                        item.visible
                          ? 'text-green-400 hover:text-green-300'
                          : 'text-gray-500 hover:text-green-400'
                      }
                      title={item.visible ? 'Hide' : 'Show'}
                    >
                      {item.visible ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <EyeOff className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => deleteItem(item.id)}
                      className="text-gray-400 hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
