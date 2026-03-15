'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  LayoutGrid,
  Eye,
  EyeOff,
  Loader2,
  Save,
} from 'lucide-react'

interface Category {
  id: string
  slug: string
  name: Record<string, string>
  description: Record<string, string>
  icon: string | null
  sort_order: number
  visible: boolean
  subcategory_count?: number
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [editingSortOrder, setEditingSortOrder] = useState<Record<string, string>>({})
  const [savingSort, setSavingSort] = useState<string | null>(null)

  const fetchCategories = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/categories')
      if (res.ok) {
        const data = await res.json()
        setCategories(data)
      }
    } catch (err) {
      console.error('Failed to fetch categories:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const toggleVisible = async (id: string, current: boolean) => {
    try {
      const res = await fetch('/api/admin/categories', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, visible: !current }),
      })
      if (res.ok) {
        setCategories((prev) =>
          prev.map((c) => (c.id === id ? { ...c, visible: !current } : c))
        )
      }
    } catch (err) {
      console.error('Failed to toggle visibility:', err)
    }
  }

  const saveSortOrder = async (id: string) => {
    const newOrder = parseInt(editingSortOrder[id], 10)
    if (isNaN(newOrder)) return

    setSavingSort(id)
    try {
      const res = await fetch('/api/admin/categories', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, sort_order: newOrder }),
      })
      if (res.ok) {
        setCategories((prev) =>
          prev
            .map((c) => (c.id === id ? { ...c, sort_order: newOrder } : c))
            .sort((a, b) => a.sort_order - b.sort_order)
        )
        setEditingSortOrder((prev) => {
          const next = { ...prev }
          delete next[id]
          return next
        })
      }
    } catch (err) {
      console.error('Failed to update sort order:', err)
    } finally {
      setSavingSort(null)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Categories</h1>
        <p className="mt-1 text-sm text-gray-400">
          Manage experience categories and their ordering
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card className="bg-slate-900/50 border-white/5">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-white">
              {categories.length}
            </div>
            <p className="text-xs text-gray-400">Total Categories</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900/50 border-white/5">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-400">
              {categories.filter((c) => c.visible).length}
            </div>
            <p className="text-xs text-gray-400">Visible</p>
          </CardContent>
        </Card>
      </div>

      {/* Categories List */}
      <Card className="bg-slate-900/50 border-white/5">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <LayoutGrid className="h-4 w-4" />
            All Categories ({categories.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
            </div>
          ) : categories.length === 0 ? (
            <p className="text-center py-12 text-gray-500">
              No categories found.
            </p>
          ) : (
            <div className="space-y-3">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] p-4"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      {category.icon && (
                        <span className="text-lg">{category.icon}</span>
                      )}
                      <p className="truncate text-sm font-medium text-white">
                        {category.name?.es || category.name?.en || 'Sin nombre'}
                      </p>
                      <Badge
                        variant="outline"
                        className="border-white/10 text-gray-400 text-[10px]"
                      >
                        /{category.slug}
                      </Badge>
                      {!category.visible && (
                        <Badge className="bg-red-500/10 text-red-400 border-0 text-[10px]">
                          Hidden
                        </Badge>
                      )}
                    </div>
                    <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
                      <span>Order: {category.sort_order}</span>
                      {category.subcategory_count != null && (
                        <span>
                          {category.subcategory_count} subcategories
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    {/* Inline sort order edit */}
                    <div className="flex items-center gap-1">
                      <Input
                        type="number"
                        value={
                          editingSortOrder[category.id] ??
                          String(category.sort_order)
                        }
                        onChange={(e) =>
                          setEditingSortOrder((prev) => ({
                            ...prev,
                            [category.id]: e.target.value,
                          }))
                        }
                        className="w-16 h-7 text-xs text-center bg-slate-800/50 border-white/10 text-white"
                      />
                      {editingSortOrder[category.id] != null &&
                        editingSortOrder[category.id] !==
                          String(category.sort_order) && (
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => saveSortOrder(category.id)}
                            disabled={savingSort === category.id}
                            className="text-orange-400 hover:text-orange-300"
                            title="Save sort order"
                          >
                            {savingSort === category.id ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <Save className="h-3 w-3" />
                            )}
                          </Button>
                        )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() =>
                        toggleVisible(category.id, category.visible)
                      }
                      className={
                        category.visible
                          ? 'text-green-400 hover:text-green-300'
                          : 'text-gray-500 hover:text-green-400'
                      }
                      title={category.visible ? 'Hide' : 'Show'}
                    >
                      {category.visible ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <EyeOff className="h-4 w-4" />
                      )}
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
