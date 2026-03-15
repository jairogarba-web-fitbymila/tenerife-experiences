'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  FileText,
  DollarSign,
  Clock,
  AlertTriangle,
  Loader2,
  Plus,
  X,
  Trash2,
} from 'lucide-react'

interface Contract {
  id: string
  partner_id: string
  lead_id: string | null
  plan: string
  price: number
  billing_cycle: string
  start_date: string
  end_date: string | null
  notes: string | null
  status: string
  created_at: string
  partners: { id: string; name: string } | null
}

interface Partner {
  id: string
  name: string
}

const STATUSES = ['all', 'draft', 'pending', 'active', 'cancelled', 'expired'] as const
const PLANS = ['free', 'basic', 'premium', 'premium_plus'] as const
const BILLING_CYCLES = ['monthly', 'yearly'] as const

const PLAN_COLORS: Record<string, string> = {
  free: 'bg-gray-500/10 text-gray-400',
  basic: 'bg-blue-500/10 text-blue-400',
  premium: 'bg-amber-500/10 text-amber-400',
  premium_plus: 'bg-emerald-500/10 text-emerald-400',
}

const PLAN_LABELS: Record<string, string> = {
  free: 'Free',
  basic: 'Basic',
  premium: 'Premium',
  premium_plus: 'Premium+',
}

const STATUS_COLORS: Record<string, string> = {
  draft: 'bg-gray-500/10 text-gray-400',
  pending: 'bg-yellow-500/10 text-yellow-400',
  active: 'bg-green-500/10 text-green-400',
  cancelled: 'bg-red-500/10 text-red-400',
  expired: 'bg-gray-500/10 text-gray-400',
}

const emptyForm = {
  partner_id: '',
  plan: 'basic' as string,
  price: '',
  billing_cycle: 'monthly' as string,
  start_date: new Date().toISOString().split('T')[0],
  end_date: '',
  notes: '',
}

export default function ContractsPage() {
  const [contracts, setContracts] = useState<Contract[]>([])
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [activeTab, setActiveTab] = useState<string>('all')

  const fetchContracts = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/contracts')
      if (res.ok) {
        const data = await res.json()
        setContracts(data)
      }
    } catch (err) {
      console.error('Failed to fetch contracts:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchPartners = async () => {
    try {
      const res = await fetch('/api/admin/partners')
      if (res.ok) setPartners(await res.json())
    } catch (err) {
      console.error('Failed to fetch partners:', err)
    }
  }

  useEffect(() => {
    fetchContracts()
    fetchPartners()
  }, [])

  const handleCreate = async () => {
    if (!form.partner_id || !form.plan) return
    setSaving(true)
    try {
      const res = await fetch('/api/admin/contracts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          partner_id: form.partner_id,
          plan: form.plan,
          price: parseFloat(form.price) || 0,
          billing_cycle: form.billing_cycle,
          start_date: form.start_date,
          end_date: form.end_date || null,
          notes: form.notes || null,
          status: 'draft',
        }),
      })
      if (res.ok) {
        setForm(emptyForm)
        setShowForm(false)
        fetchContracts()
      }
    } catch (err) {
      console.error('Failed to create contract:', err)
    } finally {
      setSaving(false)
    }
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch('/api/admin/contracts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      })
      if (res.ok) {
        const updated = await res.json()
        setContracts((prev) => prev.map((c) => (c.id === id ? updated : c)))
      }
    } catch (err) {
      console.error('Failed to update contract:', err)
    }
  }

  const deleteContract = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contract?')) return
    try {
      const res = await fetch(`/api/admin/contracts?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        setContracts((prev) => prev.filter((c) => c.id !== id))
      }
    } catch (err) {
      console.error('Failed to delete contract:', err)
    }
  }

  // Filter
  const filtered =
    activeTab === 'all' ? contracts : contracts.filter((c) => c.status === activeTab)

  // Stats
  const activeContracts = contracts.filter((c) => c.status === 'active')
  const mrr = activeContracts.reduce((sum, c) => {
    if (c.billing_cycle === 'yearly') return sum + c.price / 12
    return sum + c.price
  }, 0)
  const pendingCount = contracts.filter((c) => c.status === 'pending').length
  const now = new Date()
  const in30Days = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
  const expiringSoon = activeContracts.filter(
    (c) => c.end_date && new Date(c.end_date) <= in30Days && new Date(c.end_date) >= now
  ).length

  const stats = [
    { label: 'Active Contracts', value: activeContracts.length, icon: FileText, color: 'text-green-400' },
    { label: 'MRR', value: `${mrr.toFixed(0)}`, icon: DollarSign, color: 'text-emerald-400', prefix: '\u20AC' },
    { label: 'Pending', value: pendingCount, icon: Clock, color: 'text-yellow-400' },
    { label: 'Expiring Soon', value: expiringSoon, icon: AlertTriangle, color: 'text-red-400' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Contracts & Subscriptions</h1>
          <p className="mt-1 text-sm text-gray-400">
            Manage partner contracts, plans, and billing
          </p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="gap-2 bg-orange-500 text-white hover:bg-orange-600"
        >
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showForm ? 'Cancel' : 'New Contract'}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="bg-slate-900/50 border-white/5">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400">{stat.label}</p>
                    <p className="mt-1 text-2xl font-bold text-white">
                      {'prefix' in stat ? `${stat.prefix}${stat.value}` : stat.value}
                    </p>
                  </div>
                  <div className={`rounded-xl bg-white/5 p-2 ${stat.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* New Contract Form */}
      {showForm && (
        <Card className="bg-slate-900/50 border-white/5">
          <CardHeader>
            <CardTitle className="text-white">New Contract</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs text-gray-400">Partner *</label>
                <select
                  value={form.partner_id}
                  onChange={(e) => setForm({ ...form, partner_id: e.target.value })}
                  className="h-8 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white"
                >
                  <option value="" className="bg-slate-900">-- Select Partner --</option>
                  {partners.map((p) => (
                    <option key={p.id} value={p.id} className="bg-slate-900">
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-400">Plan *</label>
                <select
                  value={form.plan}
                  onChange={(e) => setForm({ ...form, plan: e.target.value })}
                  className="h-8 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white"
                >
                  {PLANS.map((p) => (
                    <option key={p} value={p} className="bg-slate-900">
                      {PLAN_LABELS[p]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-400">Price (EUR)</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-400">Billing Cycle</label>
                <select
                  value={form.billing_cycle}
                  onChange={(e) => setForm({ ...form, billing_cycle: e.target.value })}
                  className="h-8 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white"
                >
                  {BILLING_CYCLES.map((b) => (
                    <option key={b} value={b} className="bg-slate-900">
                      {b.charAt(0).toUpperCase() + b.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-400">Start Date</label>
                <Input
                  type="date"
                  value={form.start_date}
                  onChange={(e) => setForm({ ...form, start_date: e.target.value })}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-400">End Date</label>
                <Input
                  type="date"
                  value={form.end_date}
                  onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
            </div>
            <Textarea
              placeholder="Notes"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              rows={3}
            />
            <div className="flex justify-end">
              <Button
                onClick={handleCreate}
                disabled={saving || !form.partner_id || !form.plan}
                className="gap-2 bg-orange-500 text-white hover:bg-orange-600"
              >
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                Create Contract
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {STATUSES.map((status) => (
          <button
            key={status}
            onClick={() => setActiveTab(status)}
            className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
              activeTab === status
                ? 'bg-orange-500/20 text-orange-400'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Contracts Table */}
      <Card className="bg-slate-900/50 border-white/5">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              {activeTab === 'all'
                ? 'No contracts yet. Create your first contract!'
                : `No ${activeTab} contracts.`}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5 text-left text-xs text-gray-500">
                    <th className="p-4 pb-3">Partner</th>
                    <th className="p-4 pb-3">Plan</th>
                    <th className="p-4 pb-3">Price</th>
                    <th className="p-4 pb-3">Billing</th>
                    <th className="p-4 pb-3">Status</th>
                    <th className="p-4 pb-3">Start</th>
                    <th className="p-4 pb-3">End</th>
                    <th className="p-4 pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filtered.map((contract) => (
                    <tr key={contract.id} className="text-sm">
                      <td className="p-4 text-white font-medium">
                        {contract.partners?.name || 'Unknown'}
                      </td>
                      <td className="p-4">
                        <Badge className={PLAN_COLORS[contract.plan] || 'bg-gray-500/10 text-gray-400'}>
                          {PLAN_LABELS[contract.plan] || contract.plan}
                        </Badge>
                      </td>
                      <td className="p-4 text-gray-300">
                        {'\u20AC'}{contract.price}
                      </td>
                      <td className="p-4 text-gray-400 capitalize">
                        {contract.billing_cycle}
                      </td>
                      <td className="p-4">
                        <Badge className={STATUS_COLORS[contract.status] || 'bg-gray-500/10 text-gray-400'}>
                          {contract.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-gray-400 whitespace-nowrap">
                        {contract.start_date
                          ? new Date(contract.start_date).toLocaleDateString()
                          : '-'}
                      </td>
                      <td className="p-4 text-gray-400 whitespace-nowrap">
                        {contract.end_date
                          ? new Date(contract.end_date).toLocaleDateString()
                          : '-'}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <select
                            value={contract.status}
                            onChange={(e) => updateStatus(contract.id, e.target.value)}
                            className="h-7 rounded border border-white/10 bg-white/5 px-2 text-xs text-white"
                          >
                            {STATUSES.filter((s) => s !== 'all').map((s) => (
                              <option key={s} value={s} className="bg-slate-900">
                                {s.charAt(0).toUpperCase() + s.slice(1)}
                              </option>
                            ))}
                          </select>
                          <Button
                            onClick={() => deleteContract(contract.id)}
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 text-gray-500 hover:text-red-400"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
