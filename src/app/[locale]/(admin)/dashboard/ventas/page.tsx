'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  DollarSign,
  TrendingUp,
  Clock,
  AlertTriangle,
  Loader2,
  Plus,
  X,
  CheckCircle,
} from 'lucide-react'

interface Invoice {
  id: string
  contract_id: string | null
  partner_id: string
  amount: number
  currency: string
  invoice_number: string
  description: string | null
  issued_at: string
  due_at: string | null
  paid_at: string | null
  status: string
  created_at: string
  partners: { id: string; name: string } | null
}

interface Partner {
  id: string
  name: string
}

interface Contract {
  id: string
  partner_id: string
  plan: string
  price: number
  billing_cycle: string
  status: string
  partners: { id: string; name: string } | null
}

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-500/10 text-yellow-400',
  paid: 'bg-green-500/10 text-green-400',
  overdue: 'bg-red-500/10 text-red-400',
  cancelled: 'bg-gray-500/10 text-gray-400',
}

const emptyForm = {
  partner_id: '',
  amount: '',
  description: '',
  due_at: '',
}

export default function VentasPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [contracts, setContracts] = useState<Contract[]>([])
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)

  const fetchInvoices = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/invoices')
      if (res.ok) setInvoices(await res.json())
    } catch (err) {
      console.error('Failed to fetch invoices:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchData = async () => {
    try {
      const [partnersRes, contractsRes] = await Promise.all([
        fetch('/api/admin/partners'),
        fetch('/api/admin/contracts'),
      ])
      if (partnersRes.ok) setPartners(await partnersRes.json())
      if (contractsRes.ok) setContracts(await contractsRes.json())
    } catch (err) {
      console.error('Failed to fetch data:', err)
    }
  }

  useEffect(() => {
    fetchInvoices()
    fetchData()
  }, [])

  const handleCreate = async () => {
    if (!form.partner_id || !form.amount) return
    setSaving(true)
    try {
      const res = await fetch('/api/admin/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          partner_id: form.partner_id,
          amount: parseFloat(form.amount),
          description: form.description || null,
          due_at: form.due_at || null,
        }),
      })
      if (res.ok) {
        setForm(emptyForm)
        setShowForm(false)
        fetchInvoices()
      }
    } catch (err) {
      console.error('Failed to create invoice:', err)
    } finally {
      setSaving(false)
    }
  }

  const markAsPaid = async (id: string) => {
    try {
      const res = await fetch('/api/admin/invoices', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: 'paid' }),
      })
      if (res.ok) {
        const updated = await res.json()
        setInvoices((prev) => prev.map((inv) => (inv.id === id ? updated : inv)))
      }
    } catch (err) {
      console.error('Failed to mark as paid:', err)
    }
  }

  // Compute stats
  const activeContracts = contracts.filter((c) => c.status === 'active')
  const mrr = activeContracts.reduce((sum, c) => {
    if (c.billing_cycle === 'yearly') return sum + c.price / 12
    return sum + c.price
  }, 0)

  const paidInvoices = invoices.filter((i) => i.status === 'paid')
  const totalRevenue = paidInvoices.reduce((sum, i) => sum + i.amount, 0)

  const pendingInvoices = invoices.filter((i) => i.status === 'pending')
  const pendingTotal = pendingInvoices.reduce((sum, i) => sum + i.amount, 0)

  const now = new Date()
  const overdueInvoices = invoices.filter(
    (i) => i.status === 'pending' && i.due_at && new Date(i.due_at) < now
  )
  const overdueTotal = overdueInvoices.reduce((sum, i) => sum + i.amount, 0)

  const stats = [
    { label: 'MRR', value: mrr, icon: TrendingUp, color: 'text-emerald-400' },
    { label: 'Total Revenue', value: totalRevenue, icon: DollarSign, color: 'text-green-400' },
    { label: 'Pending Payments', value: pendingTotal, icon: Clock, color: 'text-yellow-400' },
    { label: 'Overdue', value: overdueTotal, icon: AlertTriangle, color: 'text-red-400' },
  ]

  // Revenue by month (last 6 months) from paid invoices
  const monthlyRevenue: { label: string; amount: number }[] = []
  for (let i = 5; i >= 0; i--) {
    const d = new Date()
    d.setMonth(d.getMonth() - i)
    const year = d.getFullYear()
    const month = d.getMonth()
    const label = d.toLocaleString('default', { month: 'short' })
    const amount = paidInvoices
      .filter((inv) => {
        const pd = new Date(inv.paid_at || inv.created_at)
        return pd.getFullYear() === year && pd.getMonth() === month
      })
      .reduce((sum, inv) => sum + inv.amount, 0)
    monthlyRevenue.push({ label, amount })
  }
  const maxRevenue = Math.max(...monthlyRevenue.map((m) => m.amount), 1)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Sales & Invoicing</h1>
          <p className="mt-1 text-sm text-gray-400">
            Track revenue, manage invoices, and monitor payments
          </p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="gap-2 bg-orange-500 text-white hover:bg-orange-600"
        >
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showForm ? 'Cancel' : 'Create Invoice'}
        </Button>
      </div>

      {/* Revenue Stats */}
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
                      {'\u20AC'}{stat.value.toFixed(0)}
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

      {/* Revenue by Month Chart */}
      <Card className="bg-slate-900/50 border-white/5">
        <CardHeader>
          <CardTitle className="text-white">Revenue by Month</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-3 h-48">
            {monthlyRevenue.map((m) => (
              <div key={m.label} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs text-gray-400">
                  {'\u20AC'}{m.amount.toFixed(0)}
                </span>
                <div
                  className="w-full rounded-t-md bg-orange-500/80 transition-all"
                  style={{
                    height: `${Math.max((m.amount / maxRevenue) * 100, 2)}%`,
                    minHeight: '4px',
                  }}
                />
                <span className="text-xs text-gray-500">{m.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Create Invoice Form */}
      {showForm && (
        <Card className="bg-slate-900/50 border-white/5">
          <CardHeader>
            <CardTitle className="text-white">New Invoice</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
                <label className="mb-1 block text-xs text-gray-400">Amount (EUR) *</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-400">Due Date</label>
                <Input
                  type="date"
                  value={form.due_at}
                  onChange={(e) => setForm({ ...form, due_at: e.target.value })}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
            </div>
            <Textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              rows={3}
            />
            <div className="flex justify-end">
              <Button
                onClick={handleCreate}
                disabled={saving || !form.partner_id || !form.amount}
                className="gap-2 bg-orange-500 text-white hover:bg-orange-600"
              >
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                Create Invoice
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Invoices Table */}
      <Card className="bg-slate-900/50 border-white/5">
        <CardHeader>
          <CardTitle className="text-white">Recent Invoices</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
            </div>
          ) : invoices.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              No invoices yet. Create your first invoice!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5 text-left text-xs text-gray-500">
                    <th className="p-4 pb-3">Invoice #</th>
                    <th className="p-4 pb-3">Partner</th>
                    <th className="p-4 pb-3">Amount</th>
                    <th className="p-4 pb-3">Status</th>
                    <th className="p-4 pb-3">Issued</th>
                    <th className="p-4 pb-3">Due</th>
                    <th className="p-4 pb-3">Paid</th>
                    <th className="p-4 pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {invoices.map((inv) => {
                    const isOverdue =
                      inv.status === 'pending' && inv.due_at && new Date(inv.due_at) < now
                    const displayStatus = isOverdue ? 'overdue' : inv.status

                    return (
                      <tr key={inv.id} className="text-sm">
                        <td className="p-4 text-white font-mono text-xs">
                          {inv.invoice_number}
                        </td>
                        <td className="p-4 text-gray-300">
                          {inv.partners?.name || 'Unknown'}
                        </td>
                        <td className="p-4 text-white font-medium">
                          {'\u20AC'}{inv.amount.toFixed(2)}
                        </td>
                        <td className="p-4">
                          <Badge
                            className={
                              STATUS_COLORS[displayStatus] || 'bg-gray-500/10 text-gray-400'
                            }
                          >
                            {displayStatus}
                          </Badge>
                        </td>
                        <td className="p-4 text-gray-400 whitespace-nowrap">
                          {inv.issued_at
                            ? new Date(inv.issued_at).toLocaleDateString()
                            : '-'}
                        </td>
                        <td className="p-4 text-gray-400 whitespace-nowrap">
                          {inv.due_at
                            ? new Date(inv.due_at).toLocaleDateString()
                            : '-'}
                        </td>
                        <td className="p-4 text-gray-400 whitespace-nowrap">
                          {inv.paid_at
                            ? new Date(inv.paid_at).toLocaleDateString()
                            : '-'}
                        </td>
                        <td className="p-4">
                          {inv.status !== 'paid' && inv.status !== 'cancelled' && (
                            <Button
                              onClick={() => markAsPaid(inv.id)}
                              variant="outline"
                              size="sm"
                              className="gap-1 border-green-400/20 text-green-400 hover:bg-green-400/10"
                            >
                              <CheckCircle className="h-3 w-3" />
                              Mark Paid
                            </Button>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
