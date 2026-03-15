'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  ArrowLeft,
  Users,
  Sparkles,
  Phone,
  Star,
  CheckCircle,
  XCircle,
  Loader2,
  Save,
  Mail,
  Globe,
  MessageSquare,
  MapPin,
  Tag,
  DollarSign,
  CalendarClock,
  Clock,
  User,
  Building2,
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
  estimated_revenue: number | null
  source: string | null
  next_follow_up: string | null
  last_contacted_at: string | null
  created_at: string
}

const STATUSES = ['new', 'contacted', 'interested', 'converted', 'rejected'] as const
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

interface NoteEntry {
  timestamp: string
  text: string
}

function parseNotes(notes: string | null): NoteEntry[] {
  if (!notes) return []
  const entries: NoteEntry[] = []
  const regex = /\[([^\]]+)\]\s*([\s\S]*?)(?=\n\n\[|\s*$)/g
  let match
  while ((match = regex.exec(notes)) !== null) {
    entries.push({
      timestamp: match[1].trim(),
      text: match[2].trim(),
    })
  }
  // If no structured notes found, treat the whole thing as a single entry
  if (entries.length === 0 && notes.trim()) {
    entries.push({ timestamp: '', text: notes.trim() })
  }
  return entries
}

export default function LeadDetailPage() {
  const params = useParams()
  const router = useRouter()
  const leadId = params.id as string

  const [lead, setLead] = useState<Lead | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [savingNote, setSavingNote] = useState(false)
  const [noteInput, setNoteInput] = useState('')
  const [showEditForm, setShowEditForm] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const [form, setForm] = useState({
    business_name: '',
    contact_name: '',
    email: '',
    phone: '',
    website: '',
    category: '',
    zone: '',
    priority: 'medium',
    estimated_revenue: '',
    next_follow_up: '',
  })

  const fetchLead = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/leads?id=${leadId}`)
      if (res.ok) {
        const data = await res.json()
        setLead(data)
        setForm({
          business_name: data.business_name || '',
          contact_name: data.contact_name || '',
          email: data.email || '',
          phone: data.phone || '',
          website: data.website || '',
          category: data.category || '',
          zone: data.zone || '',
          priority: data.priority || 'medium',
          estimated_revenue: data.estimated_revenue?.toString() || '',
          next_follow_up: data.next_follow_up
            ? data.next_follow_up.split('T')[0]
            : '',
        })
      }
    } catch (err) {
      console.error('Failed to fetch lead:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (leadId) fetchLead()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leadId])

  const updateLead = async (updates: Partial<Lead>) => {
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: leadId, ...updates }),
      })
      if (res.ok) {
        const updated = await res.json()
        setLead(updated)
        return updated
      }
    } catch (err) {
      console.error('Failed to update lead:', err)
    }
    return null
  }

  const handleStatusChange = async (status: string) => {
    if (!lead) return
    const updates: Partial<Lead> = { status }
    if (['contacted', 'interested', 'converted'].includes(status)) {
      updates.contact_attempts = lead.contact_attempts + 1
    }
    await updateLead(updates)
  }

  const handleAddNote = async () => {
    if (!noteInput.trim() || !lead) return
    setSavingNote(true)
    const timestamp = new Date().toLocaleString()
    const existingNotes = lead.notes || ''
    const newNotes = existingNotes
      ? `${existingNotes}\n\n[${timestamp}] ${noteInput.trim()}`
      : `[${timestamp}] ${noteInput.trim()}`
    await updateLead({ notes: newNotes })
    setNoteInput('')
    setSavingNote(false)
  }

  const handleSaveForm = async () => {
    if (!form.business_name.trim()) return
    setSaving(true)
    const updates: Record<string, unknown> = {
      business_name: form.business_name,
      contact_name: form.contact_name || null,
      email: form.email || null,
      phone: form.phone || null,
      website: form.website || null,
      category: form.category || null,
      zone: form.zone || null,
      priority: form.priority,
      estimated_revenue: form.estimated_revenue
        ? parseFloat(form.estimated_revenue)
        : null,
      next_follow_up: form.next_follow_up || null,
    }
    const result = await updateLead(updates as Partial<Lead>)
    setSaving(false)
    if (result) {
      setSaveSuccess(true)
      setShowEditForm(false)
      setTimeout(() => setSaveSuccess(false), 3000)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    )
  }

  if (!lead) {
    return (
      <div className="space-y-4">
        <Button
          onClick={() => router.back()}
          variant="ghost"
          className="gap-2 text-gray-400 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div className="py-12 text-center text-gray-500">Lead not found.</div>
      </div>
    )
  }

  const StatusIcon = STATUS_ICONS[lead.status] || Users
  const noteEntries = parseNotes(lead.notes)

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button
        onClick={() => router.back()}
        variant="ghost"
        className="gap-2 text-gray-400 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Leads
      </Button>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10">
            <Building2 className="h-6 w-6 text-orange-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{lead.business_name}</h1>
            <div className="mt-1 flex items-center gap-2">
              <Badge className={STATUS_COLORS[lead.status] || 'bg-gray-500/10 text-gray-400'}>
                <StatusIcon className="mr-1 h-3 w-3" />
                {lead.status}
              </Badge>
              <Badge className={PRIORITY_COLORS[lead.priority] || 'bg-gray-500/10 text-gray-400'}>
                {lead.priority} priority
              </Badge>
              {saveSuccess && (
                <span className="text-xs text-green-400">Changes saved</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setShowEditForm(!showEditForm)}
            variant="outline"
            className="border-white/10 text-gray-300 hover:bg-white/5 hover:text-white"
          >
            {showEditForm ? 'Cancel Edit' : 'Edit Lead'}
          </Button>
        </div>
      </div>

      {/* Contact Info + Business Info */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Contact Info */}
        <Card className="bg-slate-900/50 border-white/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <User className="h-4 w-4 text-gray-400" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs text-gray-500">Contact Name</p>
                <p className="mt-1 text-sm text-gray-300">
                  {lead.contact_name || '-'}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="mt-1 text-sm">
                  {lead.email ? (
                    <a
                      href={`mailto:${lead.email}`}
                      className="flex items-center gap-1 text-blue-400 hover:text-blue-300"
                    >
                      <Mail className="h-3 w-3" />
                      {lead.email}
                    </a>
                  ) : (
                    <span className="text-gray-500">-</span>
                  )}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Phone</p>
                <p className="mt-1 text-sm">
                  {lead.phone ? (
                    <a
                      href={`tel:${lead.phone}`}
                      className="flex items-center gap-1 text-blue-400 hover:text-blue-300"
                    >
                      <Phone className="h-3 w-3" />
                      {lead.phone}
                    </a>
                  ) : (
                    <span className="text-gray-500">-</span>
                  )}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Website</p>
                <p className="mt-1 text-sm">
                  {lead.website ? (
                    <a
                      href={
                        lead.website.startsWith('http')
                          ? lead.website
                          : `https://${lead.website}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-400 hover:text-blue-300"
                    >
                      <Globe className="h-3 w-3" />
                      {lead.website}
                    </a>
                  ) : (
                    <span className="text-gray-500">-</span>
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Business Info */}
        <Card className="bg-slate-900/50 border-white/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Building2 className="h-4 w-4 text-gray-400" />
              Business Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="flex items-center gap-1 text-xs text-gray-500">
                  <Tag className="h-3 w-3" />
                  Category
                </p>
                <p className="mt-1 text-sm text-gray-300">
                  {lead.category || '-'}
                </p>
              </div>
              <div>
                <p className="flex items-center gap-1 text-xs text-gray-500">
                  <MapPin className="h-3 w-3" />
                  Zone
                </p>
                <p className="mt-1 text-sm text-gray-300">
                  {lead.zone || '-'}
                </p>
              </div>
              <div>
                <p className="flex items-center gap-1 text-xs text-gray-500">
                  <DollarSign className="h-3 w-3" />
                  Estimated Revenue
                </p>
                <p className="mt-1 text-sm text-gray-300">
                  {lead.estimated_revenue != null
                    ? `${lead.estimated_revenue.toLocaleString()}`
                    : '-'}
                </p>
              </div>
              <div>
                <p className="flex items-center gap-1 text-xs text-gray-500">
                  <Users className="h-3 w-3" />
                  Source
                </p>
                <p className="mt-1 text-sm text-gray-300">
                  {lead.source || '-'}
                </p>
              </div>
              <div>
                <p className="flex items-center gap-1 text-xs text-gray-500">
                  <Phone className="h-3 w-3" />
                  Contact Attempts
                </p>
                <p className="mt-1 text-sm text-gray-300">
                  {lead.contact_attempts}
                </p>
              </div>
              <div>
                <p className="flex items-center gap-1 text-xs text-gray-500">
                  <CalendarClock className="h-3 w-3" />
                  Next Follow-up
                </p>
                <p className="mt-1 text-sm text-gray-300">
                  {lead.next_follow_up
                    ? new Date(lead.next_follow_up).toLocaleDateString()
                    : '-'}
                </p>
              </div>
              <div>
                <p className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  Last Contacted
                </p>
                <p className="mt-1 text-sm text-gray-300">
                  {lead.last_contacted_at
                    ? new Date(lead.last_contacted_at).toLocaleDateString()
                    : '-'}
                </p>
              </div>
              <div>
                <p className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  Created
                </p>
                <p className="mt-1 text-sm text-gray-300">
                  {new Date(lead.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Actions */}
      <Card className="bg-slate-900/50 border-white/5">
        <CardHeader>
          <CardTitle className="text-white">Change Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {STATUSES.map((status) => {
              if (lead.status === status) return null
              const Icon = STATUS_ICONS[status] || Users
              const colorMap: Record<string, string> = {
                new: 'border-blue-400/20 text-blue-400 hover:bg-blue-400/10',
                contacted: 'border-yellow-400/20 text-yellow-400 hover:bg-yellow-400/10',
                interested: 'border-purple-400/20 text-purple-400 hover:bg-purple-400/10',
                converted: 'border-green-400/20 text-green-400 hover:bg-green-400/10',
                rejected: 'border-red-400/20 text-red-400 hover:bg-red-400/10',
              }
              return (
                <Button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  variant="outline"
                  size="sm"
                  className={`gap-1 ${colorMap[status]}`}
                >
                  <Icon className="h-3 w-3" />
                  {status === 'new' ? 'Reset to New' : `Mark ${status.charAt(0).toUpperCase() + status.slice(1)}`}
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Timeline / Notes */}
      <Card className="bg-slate-900/50 border-white/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <MessageSquare className="h-4 w-4 text-gray-400" />
            Activity Timeline
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {noteEntries.length > 0 ? (
            <div className="space-y-3">
              {noteEntries.map((entry, idx) => (
                <div
                  key={idx}
                  className="relative border-l-2 border-white/10 pl-4"
                >
                  {entry.timestamp && (
                    <p className="text-xs text-gray-500">{entry.timestamp}</p>
                  )}
                  <p className="mt-0.5 text-sm text-gray-300 whitespace-pre-wrap">
                    {entry.text}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No notes yet.</p>
          )}

          {/* Add Note */}
          <div className="border-t border-white/5 pt-4">
            <div className="flex gap-2">
              <Textarea
                placeholder="Add a note..."
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleAddNote()
                  }
                }}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                rows={2}
              />
              <Button
                onClick={handleAddNote}
                disabled={!noteInput.trim() || savingNote}
                className="self-end bg-orange-500 text-white hover:bg-orange-600"
              >
                {savingNote ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <MessageSquare className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Form */}
      {showEditForm && (
        <Card className="bg-slate-900/50 border-white/5">
          <CardHeader>
            <CardTitle className="text-white">Edit Lead</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs text-gray-500">
                  Business Name *
                </label>
                <Input
                  value={form.business_name}
                  onChange={(e) =>
                    setForm({ ...form, business_name: e.target.value })
                  }
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-500">
                  Contact Name
                </label>
                <Input
                  value={form.contact_name}
                  onChange={(e) =>
                    setForm({ ...form, contact_name: e.target.value })
                  }
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-500">
                  Email
                </label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-500">
                  Phone
                </label>
                <Input
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-500">
                  Website
                </label>
                <Input
                  value={form.website}
                  onChange={(e) =>
                    setForm({ ...form, website: e.target.value })
                  }
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-500">
                  Category
                </label>
                <Input
                  placeholder="e.g. restaurant, hotel"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-500">
                  Zone
                </label>
                <Input
                  placeholder="e.g. South, North"
                  value={form.zone}
                  onChange={(e) =>
                    setForm({ ...form, zone: e.target.value })
                  }
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-500">
                  Priority
                </label>
                <select
                  value={form.priority}
                  onChange={(e) =>
                    setForm({ ...form, priority: e.target.value })
                  }
                  className="h-8 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white"
                >
                  {PRIORITIES.map((p) => (
                    <option key={p} value={p} className="bg-slate-900">
                      {p.charAt(0).toUpperCase() + p.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-500">
                  Estimated Revenue
                </label>
                <Input
                  type="number"
                  placeholder="0"
                  value={form.estimated_revenue}
                  onChange={(e) =>
                    setForm({ ...form, estimated_revenue: e.target.value })
                  }
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-500">
                  Next Follow-up
                </label>
                <Input
                  type="date"
                  value={form.next_follow_up}
                  onChange={(e) =>
                    setForm({ ...form, next_follow_up: e.target.value })
                  }
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 border-t border-white/5 pt-4">
              <Button
                onClick={() => setShowEditForm(false)}
                variant="ghost"
                className="text-gray-400 hover:text-white"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveForm}
                disabled={saving || !form.business_name.trim()}
                className="gap-2 bg-orange-500 text-white hover:bg-orange-600"
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
