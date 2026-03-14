'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Handshake,
  Plus,
  Trash2,
  Edit2,
  Eye,
  EyeOff,
  Star,
  StarOff,
  Loader2,
  X,
} from 'lucide-react'

interface Partner {
  id: string
  slug: string
  name: string
  type: string
  description: Record<string, string>
  area: string | null
  address: string | null
  phone: string | null
  website: string | null
  featured: boolean
  plan: string
  visible: boolean
  created_at: string
}

const PARTNER_TYPES = ['restaurant', 'hotel', 'operator', 'shop', 'service']
const PARTNER_PLANS = ['free', 'basic', 'premium']

const emptyForm = {
  name: '',
  type: 'restaurant',
  description_es: '',
  description_en: '',
  area: '',
  address: '',
  phone: '',
  website: '',
  plan: 'free',
}

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)

  const fetchPartners = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/partners')
      if (res.ok) {
        const data = await res.json()
        setPartners(data)
      }
    } catch (err) {
      console.error('Failed to fetch partners:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPartners()
  }, [])

  const resetForm = () => {
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(false)
  }

  const startEdit = (partner: Partner) => {
    setForm({
      name: partner.name,
      type: partner.type,
      description_es: partner.description?.es || '',
      description_en: partner.description?.en || '',
      area: partner.area || '',
      address: partner.address || '',
      phone: partner.phone || '',
      website: partner.website || '',
      plan: partner.plan,
    })
    setEditingId(partner.id)
    setShowForm(true)
  }

  const savePartner = async () => {
    if (!form.name.trim()) return
    setSaving(true)
    try {
      const body = {
        ...(editingId && { id: editingId }),
        name: form.name,
        type: form.type,
        description: { es: form.description_es, en: form.description_en },
        area: form.area || null,
        address: form.address || null,
        phone: form.phone || null,
        website: form.website || null,
        plan: form.plan,
      }

      const res = await fetch('/api/admin/partners', {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (res.ok) {
        resetForm()
        await fetchPartners()
      } else {
        const data = await res.json()
        alert(data.error || 'Failed to save partner')
      }
    } catch (err) {
      console.error('Failed to save partner:', err)
    } finally {
      setSaving(false)
    }
  }

  const deletePartner = async (id: string) => {
    if (!confirm('Are you sure you want to delete this partner?')) return
    try {
      const res = await fetch(`/api/admin/partners?id=${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        setPartners((prev) => prev.filter((p) => p.id !== id))
      }
    } catch (err) {
      console.error('Failed to delete partner:', err)
    }
  }

  const toggleField = async (
    id: string,
    field: 'visible' | 'featured',
    current: boolean
  ) => {
    try {
      const res = await fetch('/api/admin/partners', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, [field]: !current }),
      })
      if (res.ok) {
        setPartners((prev) =>
          prev.map((p) => (p.id === id ? { ...p, [field]: !current } : p))
        )
      }
    } catch (err) {
      console.error(`Failed to toggle ${field}:`, err)
    }
  }

  const planColors: Record<string, string> = {
    free: 'bg-gray-500/10 text-gray-400',
    basic: 'bg-blue-500/10 text-blue-400',
    premium: 'bg-amber-500/10 text-amber-400',
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Partners</h1>
          <p className="mt-1 text-sm text-gray-400">
            Manage restaurant, hotel, and service partners
          </p>
        </div>
        <Button
          onClick={() => {
            resetForm()
            setShowForm(true)
          }}
          className="bg-orange-500 hover:bg-orange-600 text-white"
        >
          <Plus className="h-4 w-4" />
          Add Partner
        </Button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <Card className="bg-slate-900/50 border-orange-400/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">
                {editingId ? 'Edit Partner' : 'New Partner'}
              </CardTitle>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={resetForm}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-400">
                  Name *
                </label>
                <Input
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className="bg-slate-800/50 border-white/10 text-white"
                  placeholder="Partner name"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-400">
                  Type
                </label>
                <select
                  value={form.type}
                  onChange={(e) =>
                    setForm({ ...form, type: e.target.value })
                  }
                  className="h-8 w-full rounded-lg border border-white/10 bg-slate-800/50 px-2.5 text-sm text-white outline-none focus:border-ring focus:ring-3 focus:ring-ring/50"
                >
                  {PARTNER_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-400">
                  Description (ES)
                </label>
                <Textarea
                  value={form.description_es}
                  onChange={(e) =>
                    setForm({ ...form, description_es: e.target.value })
                  }
                  className="bg-slate-800/50 border-white/10 text-white"
                  placeholder="Descripcion en espanol"
                  rows={3}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-400">
                  Description (EN)
                </label>
                <Textarea
                  value={form.description_en}
                  onChange={(e) =>
                    setForm({ ...form, description_en: e.target.value })
                  }
                  className="bg-slate-800/50 border-white/10 text-white"
                  placeholder="Description in English"
                  rows={3}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-400">
                  Area
                </label>
                <Input
                  value={form.area}
                  onChange={(e) =>
                    setForm({ ...form, area: e.target.value })
                  }
                  className="bg-slate-800/50 border-white/10 text-white"
                  placeholder="e.g., costa-adeje"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-400">
                  Address
                </label>
                <Input
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                  className="bg-slate-800/50 border-white/10 text-white"
                  placeholder="Street address"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-400">
                  Phone
                </label>
                <Input
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                  className="bg-slate-800/50 border-white/10 text-white"
                  placeholder="+34 ..."
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-400">
                  Website
                </label>
                <Input
                  value={form.website}
                  onChange={(e) =>
                    setForm({ ...form, website: e.target.value })
                  }
                  className="bg-slate-800/50 border-white/10 text-white"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-400">
                  Plan
                </label>
                <select
                  value={form.plan}
                  onChange={(e) =>
                    setForm({ ...form, plan: e.target.value })
                  }
                  className="h-8 w-full rounded-lg border border-white/10 bg-slate-800/50 px-2.5 text-sm text-white outline-none focus:border-ring focus:ring-3 focus:ring-ring/50"
                >
                  {PARTNER_PLANS.map((p) => (
                    <option key={p} value={p}>
                      {p.charAt(0).toUpperCase() + p.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="ghost" onClick={resetForm} className="text-gray-400">
                Cancel
              </Button>
              <Button
                onClick={savePartner}
                disabled={saving || !form.name.trim()}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : editingId ? (
                  'Update Partner'
                ) : (
                  'Create Partner'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Partners List */}
      <Card className="bg-slate-900/50 border-white/5">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Handshake className="h-4 w-4" />
            All Partners ({partners.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
            </div>
          ) : partners.length === 0 ? (
            <p className="text-center py-12 text-gray-500">
              No partners yet. Add your first one above.
            </p>
          ) : (
            <div className="space-y-3">
              {partners.map((partner) => (
                <div
                  key={partner.id}
                  className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] p-4"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-medium text-white">
                        {partner.name}
                      </p>
                      <Badge
                        variant="outline"
                        className="border-white/10 text-gray-400 text-[10px]"
                      >
                        {partner.type}
                      </Badge>
                      <Badge className={`${planColors[partner.plan] || ''} text-[10px] border-0`}>
                        {partner.plan}
                      </Badge>
                    </div>
                    <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
                      {partner.area && <span>{partner.area}</span>}
                      {partner.phone && <span>{partner.phone}</span>}
                      <span>
                        {new Date(partner.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 ml-4">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() =>
                        toggleField(partner.id, 'featured', partner.featured)
                      }
                      className={
                        partner.featured
                          ? 'text-amber-400 hover:text-amber-300'
                          : 'text-gray-500 hover:text-amber-400'
                      }
                      title={partner.featured ? 'Unfeature' : 'Feature'}
                    >
                      {partner.featured ? (
                        <Star className="h-4 w-4 fill-amber-400" />
                      ) : (
                        <StarOff className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() =>
                        toggleField(partner.id, 'visible', partner.visible)
                      }
                      className={
                        partner.visible
                          ? 'text-green-400 hover:text-green-300'
                          : 'text-gray-500 hover:text-green-400'
                      }
                      title={partner.visible ? 'Hide' : 'Show'}
                    >
                      {partner.visible ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <EyeOff className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => startEdit(partner)}
                      className="text-gray-400 hover:text-white"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => deletePartner(partner.id)}
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
