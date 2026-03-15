'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'
import {
  Users,
  Sparkles,
  Phone,
  Star,
  CheckCircle,
  XCircle,
  Loader2,
  Plus,
  X,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  ArrowUpDown,
  Download,
} from 'lucide-react'

interface Lead {
  id: string
  business_name: string
  contact_name: string | null
  email: string | null
  phone: string | null
  website: string | null
  category: string | null
  zone: string | null
  status: string
  priority: string
  contact_attempts: number
  notes: string | null
  last_contacted_at: string | null
  created_at: string
}

const STATUSES = ['all', 'new', 'contacted', 'interested', 'converted', 'rejected'] as const
const PRIORITIES = ['high', 'medium', 'low'] as const

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-500/10 text-blue-400',
  contacted: 'bg-yellow-500/10 text-yellow-400',
  interested: 'bg-purple-500/10 text-purple-400',
  converted: 'bg-green-500/10 text-green-400',
  rejected: 'bg-red-500/10 text-red-400',
}

const STATUS_ICONS: Record<string, typeof Users> = {
  new: Sparkles,
  contacted: Phone,
  interested: Star,
  converted: CheckCircle,
  rejected: XCircle,
}

const PRIORITY_COLORS: Record<string, string> = {
  high: 'bg-red-500/10 text-red-400',
  medium: 'bg-orange-500/10 text-orange-400',
  low: 'bg-gray-500/10 text-gray-400',
}

const emptyForm = {
  business_name: '',
  contact_name: '',
  email: '',
  phone: '',
  website: '',
  category: '',
  zone: '',
  priority: 'medium',
  notes: '',
}

type SortField = 'priority' | 'status' | 'created_at'

const PRIORITY_ORDER: Record<string, number> = { high: 0, medium: 1, low: 2 }
const STATUS_ORDER: Record<string, number> = {
  new: 0,
  contacted: 1,
  interested: 2,
  converted: 3,
  rejected: 4,
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<string>('all')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [noteInput, setNoteInput] = useState('')
  const [noteLeadId, setNoteLeadId] = useState<string | null>(null)
  const [sortField, setSortField] = useState<SortField>('created_at')
  const [sortAsc, setSortAsc] = useState(false)

  const fetchLeads = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/leads')
      if (res.ok) {
        const data = await res.json()
        setLeads(data)
      }
    } catch (err) {
      console.error('Failed to fetch leads:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeads()
  }, [])

  const handleCreate = async () => {
    if (!form.business_name.trim()) return
    setSaving(true)
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setForm(emptyForm)
        setShowForm(false)
        fetchLeads()
      }
    } catch (err) {
      console.error('Failed to create lead:', err)
    } finally {
      setSaving(false)
    }
  }

  const updateLead = async (id: string, updates: Partial<Lead>) => {
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updates }),
      })
      if (res.ok) {
        const updated = await res.json()
        setLeads((prev) => prev.map((l) => (l.id === id ? updated : l)))
      }
    } catch (err) {
      console.error('Failed to update lead:', err)
    }
  }

  const handleStatusChange = (id: string, status: string) => {
    const lead = leads.find((l) => l.id === id)
    if (!lead) return
    const updates: Partial<Lead> = { status }
    if (['contacted', 'interested', 'converted'].includes(status)) {
      updates.contact_attempts = lead.contact_attempts + 1
    }
    updateLead(id, updates)
  }

  const handleAddNote = (id: string) => {
    if (!noteInput.trim()) return
    const lead = leads.find((l) => l.id === id)
    if (!lead) return
    const timestamp = new Date().toLocaleString()
    const existingNotes = lead.notes || ''
    const newNotes = existingNotes
      ? `${existingNotes}\n\n[${timestamp}] ${noteInput.trim()}`
      : `[${timestamp}] ${noteInput.trim()}`
    updateLead(id, { notes: newNotes })
    setNoteInput('')
    setNoteLeadId(null)
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc)
    } else {
      setSortField(field)
      setSortAsc(false)
    }
  }

  // Filter leads by active tab
  const filteredLeads = activeTab === 'all'
    ? leads
    : leads.filter((l) => l.status === activeTab)

  // Sort leads
  const sortedLeads = [...filteredLeads].sort((a, b) => {
    let cmp = 0
    if (sortField === 'priority') {
      cmp = (PRIORITY_ORDER[a.priority] ?? 1) - (PRIORITY_ORDER[b.priority] ?? 1)
    } else if (sortField === 'status') {
      cmp = (STATUS_ORDER[a.status] ?? 0) - (STATUS_ORDER[b.status] ?? 0)
    } else {
      cmp = new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    }
    return sortAsc ? -cmp : cmp
  })

  // Stats
  const stats = [
    { label: 'Total Leads', value: leads.length, icon: Users, color: 'text-blue-400' },
    { label: 'New', value: leads.filter((l) => l.status === 'new').length, icon: Sparkles, color: 'text-cyan-400' },
    { label: 'Contacted', value: leads.filter((l) => l.status === 'contacted').length, icon: Phone, color: 'text-yellow-400' },
    { label: 'Interested', value: leads.filter((l) => l.status === 'interested').length, icon: Star, color: 'text-purple-400' },
    { label: 'Converted', value: leads.filter((l) => l.status === 'converted').length, icon: CheckCircle, color: 'text-green-400' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Leads CRM</h1>
          <p className="mt-1 text-sm text-gray-400">
            Manage your business leads and track conversions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={async () => {
              try {
                const res = await fetch('/api/admin/leads/export')
                if (!res.ok) throw new Error('Export failed')
                const blob = await res.blob()
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = `leads-export-${new Date().toISOString().split('T')[0]}.csv`
                document.body.appendChild(a)
                a.click()
                a.remove()
                URL.revokeObjectURL(url)
              } catch (err) {
                console.error('Export failed:', err)
              }
            }}
            variant="outline"
            className="gap-2 border-white/10 text-gray-300 hover:bg-white/5 hover:text-white"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="gap-2 bg-orange-500 text-white hover:bg-orange-600"
          >
            {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {showForm ? 'Cancel' : 'New Lead'}
          </Button>
        </div>
      </div>

      {/* Create Lead Form */}
      {showForm && (
        <Card className="bg-slate-900/50 border-white/5">
          <CardHeader>
            <CardTitle className="text-white">Add New Lead</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Input
                placeholder="Business Name *"
                value={form.business_name}
                onChange={(e) => setForm({ ...form, business_name: e.target.value })}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              />
              <Input
                placeholder="Contact Name"
                value={form.contact_name}
                onChange={(e) => setForm({ ...form, contact_name: e.target.value })}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              />
              <Input
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              />
              <Input
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              />
              <Input
                placeholder="Website"
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              />
              <Input
                placeholder="Category (e.g. restaurant, hotel)"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              />
              <Input
                placeholder="Zone (e.g. South, North)"
                value={form.zone}
                onChange={(e) => setForm({ ...form, zone: e.target.value })}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              />
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
                className="h-8 rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white"
              >
                {PRIORITIES.map((p) => (
                  <option key={p} value={p} className="bg-slate-900">
                    {p.charAt(0).toUpperCase() + p.slice(1)} Priority
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4">
              <Textarea
                placeholder="Notes"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                rows={3}
              />
            </div>
            <div className="mt-4 flex justify-end">
              <Button
                onClick={handleCreate}
                disabled={saving || !form.business_name.trim()}
                className="gap-2 bg-orange-500 text-white hover:bg-orange-600"
              >
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                Create Lead
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="bg-slate-900/50 border-white/5">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400">{stat.label}</p>
                    <p className="mt-1 text-2xl font-bold text-white">{stat.value}</p>
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

      {/* Sort Controls */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500">Sort by:</span>
        {(['created_at', 'priority', 'status'] as SortField[]).map((field) => (
          <button
            key={field}
            onClick={() => handleSort(field)}
            className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs transition-colors ${
              sortField === field
                ? 'bg-white/10 text-white'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {field === 'created_at' ? 'Date' : field.charAt(0).toUpperCase() + field.slice(1)}
            {sortField === field && (
              <ArrowUpDown className="h-3 w-3" />
            )}
          </button>
        ))}
      </div>

      {/* Leads List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        </div>
      ) : sortedLeads.length === 0 ? (
        <div className="py-12 text-center text-gray-500">
          {activeTab === 'all' ? 'No leads yet. Add your first lead!' : `No ${activeTab} leads.`}
        </div>
      ) : (
        <div className="space-y-3">
          {sortedLeads.map((lead) => {
            const isExpanded = expandedId === lead.id
            const StatusIcon = STATUS_ICONS[lead.status] || Users

            return (
              <Card
                key={lead.id}
                className="bg-slate-900/50 border-white/5 transition-colors hover:border-white/10"
              >
                <CardContent className="p-0">
                  {/* Lead Row */}
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : lead.id)}
                    className="flex w-full items-center gap-4 p-4 text-left"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/dashboard/leads/${lead.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="truncate text-sm font-medium text-white hover:text-orange-400 transition-colors"
                        >
                          {lead.business_name}
                        </Link>
                        <Badge className={STATUS_COLORS[lead.status] || 'bg-gray-500/10 text-gray-400'}>
                          <StatusIcon className="mr-1 h-3 w-3" />
                          {lead.status}
                        </Badge>
                        <Badge className={PRIORITY_COLORS[lead.priority] || 'bg-gray-500/10 text-gray-400'}>
                          {lead.priority}
                        </Badge>
                      </div>
                      <div className="mt-1 flex items-center gap-4 text-xs text-gray-500">
                        {lead.category && <span>{lead.category}</span>}
                        {lead.zone && <span>{lead.zone}</span>}
                        <span>{lead.contact_attempts} contacts</span>
                        {lead.last_contacted_at && (
                          <span>
                            Last: {new Date(lead.last_contacted_at).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                    {lead.website && (
                      <a
                        href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-gray-400 hover:text-blue-400"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </button>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="border-t border-white/5 p-4 space-y-4">
                      {/* Details Grid */}
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                        <div>
                          <p className="text-xs text-gray-500">Contact Name</p>
                          <p className="text-sm text-gray-300">{lead.contact_name || '-'}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Email</p>
                          <p className="text-sm text-gray-300">
                            {lead.email ? (
                              <a href={`mailto:${lead.email}`} className="hover:text-blue-400">
                                {lead.email}
                              </a>
                            ) : '-'}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Phone</p>
                          <p className="text-sm text-gray-300">
                            {lead.phone ? (
                              <a href={`tel:${lead.phone}`} className="hover:text-blue-400">
                                {lead.phone}
                              </a>
                            ) : '-'}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Created</p>
                          <p className="text-sm text-gray-300">
                            {new Date(lead.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {/* Notes */}
                      {lead.notes && (
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Notes</p>
                          <pre className="whitespace-pre-wrap rounded-lg bg-white/5 p-3 text-sm text-gray-300 font-sans">
                            {lead.notes}
                          </pre>
                        </div>
                      )}

                      {/* Add Note */}
                      {noteLeadId === lead.id ? (
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add a note..."
                            value={noteInput}
                            onChange={(e) => setNoteInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddNote(lead.id)}
                            className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                          />
                          <Button
                            onClick={() => handleAddNote(lead.id)}
                            disabled={!noteInput.trim()}
                            className="bg-orange-500 text-white hover:bg-orange-600"
                            size="sm"
                          >
                            Save
                          </Button>
                          <Button
                            onClick={() => { setNoteLeadId(null); setNoteInput('') }}
                            variant="ghost"
                            size="sm"
                            className="text-gray-400"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          onClick={() => setNoteLeadId(lead.id)}
                          variant="ghost"
                          size="sm"
                          className="gap-2 text-gray-400 hover:text-white"
                        >
                          <MessageSquare className="h-4 w-4" />
                          Add Note
                        </Button>
                      )}

                      {/* Status Actions */}
                      <div className="flex flex-wrap gap-2 border-t border-white/5 pt-4">
                        {lead.status !== 'contacted' && (
                          <Button
                            onClick={() => handleStatusChange(lead.id, 'contacted')}
                            variant="outline"
                            size="sm"
                            className="gap-1 border-yellow-400/20 text-yellow-400 hover:bg-yellow-400/10"
                          >
                            <Phone className="h-3 w-3" />
                            Mark Contacted
                          </Button>
                        )}
                        {lead.status !== 'interested' && (
                          <Button
                            onClick={() => handleStatusChange(lead.id, 'interested')}
                            variant="outline"
                            size="sm"
                            className="gap-1 border-purple-400/20 text-purple-400 hover:bg-purple-400/10"
                          >
                            <Star className="h-3 w-3" />
                            Mark Interested
                          </Button>
                        )}
                        {lead.status !== 'converted' && (
                          <Button
                            onClick={() => handleStatusChange(lead.id, 'converted')}
                            variant="outline"
                            size="sm"
                            className="gap-1 border-green-400/20 text-green-400 hover:bg-green-400/10"
                          >
                            <CheckCircle className="h-3 w-3" />
                            Mark Converted
                          </Button>
                        )}
                        {lead.status !== 'rejected' && (
                          <Button
                            onClick={() => handleStatusChange(lead.id, 'rejected')}
                            variant="outline"
                            size="sm"
                            className="gap-1 border-red-400/20 text-red-400 hover:bg-red-400/10"
                          >
                            <XCircle className="h-3 w-3" />
                            Mark Rejected
                          </Button>
                        )}
                        {lead.status !== 'new' && (
                          <Button
                            onClick={() => handleStatusChange(lead.id, 'new')}
                            variant="outline"
                            size="sm"
                            className="gap-1 border-blue-400/20 text-blue-400 hover:bg-blue-400/10"
                          >
                            <Sparkles className="h-3 w-3" />
                            Reset to New
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
