'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Mail,
  Send,
  CheckCircle,
  Eye,
  MousePointerClick,
  Loader2,
  FileText,
  X,
} from 'lucide-react'

interface EmailLog {
  id: string
  lead_id: string | null
  partner_id: string | null
  recipient_email: string
  recipient_name: string | null
  subject: string
  body: string
  template_number: number | null
  status: string
  created_at: string
  leads: { business_name: string; contact_name: string | null } | null
  partners: { name: string } | null
}

interface Lead {
  id: string
  business_name: string
  contact_name: string | null
  email: string | null
}

interface Partner {
  id: string
  name: string
}

const STATUS_COLORS: Record<string, string> = {
  sent: 'bg-blue-500/10 text-blue-400',
  delivered: 'bg-green-500/10 text-green-400',
  opened: 'bg-purple-500/10 text-purple-400',
  clicked: 'bg-amber-500/10 text-amber-400',
  bounced: 'bg-red-500/10 text-red-400',
  failed: 'bg-red-500/10 text-red-400',
}

const TEMPLATES: Record<number, { name: string; subject: string; body: string }> = {
  1: {
    name: 'Introduction',
    subject: 'Discover Tenerife Experiences - Your Gateway to More Customers',
    body: `Hi {name},

I'm reaching out from Tenerife Experiences, the leading tourism platform connecting visitors with the best local businesses in Tenerife.

We help businesses like yours reach thousands of tourists actively looking for experiences, restaurants, and activities on the island.

I'd love to show you how we can help increase your visibility and bring more customers through your door.

Would you be open to a quick chat this week?

Best regards,
Tenerife Experiences Team`,
  },
  2: {
    name: 'Value Proposition',
    subject: 'How Tenerife Experiences Can Grow Your Business',
    body: `Hi {name},

Did you know that over 5 million tourists visit Tenerife every year, and most of them search online for things to do?

Tenerife Experiences helps you capture that demand by:

- Featuring your business on our high-traffic tourism platform
- Professional listing with photos, descriptions in multiple languages
- Direct booking integration and contact information
- SEO-optimized pages that rank on Google
- Social media promotion to our growing audience

Our partners typically see a 30-40% increase in tourist customers within the first 3 months.

Ready to get started? I'd be happy to walk you through our plans and find the best fit for your business.

Best regards,
Tenerife Experiences Team`,
  },
  3: {
    name: 'Follow-up',
    subject: 'Following Up - Tenerife Experiences Partnership',
    body: `Hi {name},

I wanted to follow up on my previous message about partnering with Tenerife Experiences.

I understand you're busy, so I'll keep this brief: we're currently onboarding new partners in your area and I'd hate for you to miss out on the peak season traffic.

We have flexible plans starting from free listings, so there's no risk in trying us out.

Would 10 minutes this week work for a quick call? I can show you exactly how your business would appear on our platform.

Looking forward to hearing from you.

Best regards,
Tenerife Experiences Team`,
  },
}

const emptyCompose = {
  recipient_email: '',
  recipient_name: '',
  subject: '',
  body: '',
  lead_id: '',
  partner_id: '',
}

export default function EmailsPage() {
  const [emails, setEmails] = useState<EmailLog[]>([])
  const [leads, setLeads] = useState<Lead[]>([])
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [compose, setCompose] = useState(emptyCompose)
  const [showCompose, setShowCompose] = useState(false)
  const [activeTemplate, setActiveTemplate] = useState<number | null>(null)

  const fetchEmails = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/emails')
      if (res.ok) {
        const data = await res.json()
        setEmails(data)
      }
    } catch (err) {
      console.error('Failed to fetch emails:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchLeadsAndPartners = async () => {
    try {
      const [leadsRes, partnersRes] = await Promise.all([
        fetch('/api/admin/leads'),
        fetch('/api/admin/partners'),
      ])
      if (leadsRes.ok) setLeads(await leadsRes.json())
      if (partnersRes.ok) setPartners(await partnersRes.json())
    } catch (err) {
      console.error('Failed to fetch leads/partners:', err)
    }
  }

  useEffect(() => {
    fetchEmails()
    fetchLeadsAndPartners()
  }, [])

  const loadTemplate = (num: number) => {
    const tpl = TEMPLATES[num]
    if (!tpl) return

    let body = tpl.body
    const subject = tpl.subject

    // Replace {name} with recipient name if available
    const name = compose.recipient_name || '{name}'
    body = body.replace(/{name}/g, name)

    setCompose((prev) => ({ ...prev, subject, body }))
    setActiveTemplate(num)
  }

  const handleLeadSelect = (leadId: string) => {
    const lead = leads.find((l) => l.id === leadId)
    if (lead) {
      setCompose((prev) => ({
        ...prev,
        lead_id: leadId,
        recipient_email: lead.email || prev.recipient_email,
        recipient_name: lead.contact_name || lead.business_name,
      }))
    } else {
      setCompose((prev) => ({ ...prev, lead_id: '' }))
    }
  }

  const handlePartnerSelect = (partnerId: string) => {
    setCompose((prev) => ({ ...prev, partner_id: partnerId }))
  }

  const handleSend = async () => {
    if (!compose.recipient_email || !compose.subject || !compose.body) return
    setSending(true)
    try {
      const res = await fetch('/api/admin/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead_id: compose.lead_id || null,
          partner_id: compose.partner_id || null,
          recipient_email: compose.recipient_email,
          recipient_name: compose.recipient_name || null,
          subject: compose.subject,
          body: compose.body,
          template_number: activeTemplate,
        }),
      })
      if (res.ok) {
        setCompose(emptyCompose)
        setActiveTemplate(null)
        setShowCompose(false)
        fetchEmails()
      }
    } catch (err) {
      console.error('Failed to send email:', err)
    } finally {
      setSending(false)
    }
  }

  // Stats
  const totalSent = emails.filter((e) => e.status === 'sent').length
  const totalDelivered = emails.filter((e) => e.status === 'delivered').length
  const totalOpened = emails.filter((e) => e.status === 'opened').length
  const totalClicked = emails.filter((e) => e.status === 'clicked').length

  const stats = [
    { label: 'Total Sent', value: emails.length, icon: Mail, color: 'text-blue-400' },
    { label: 'Delivered', value: totalDelivered || totalSent, icon: CheckCircle, color: 'text-green-400' },
    { label: 'Opened', value: totalOpened, icon: Eye, color: 'text-purple-400' },
    { label: 'Clicked', value: totalClicked, icon: MousePointerClick, color: 'text-amber-400' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Email & Communications</h1>
          <p className="mt-1 text-sm text-gray-400">
            Send emails and track communication with leads and partners
          </p>
        </div>
        <Button
          onClick={() => setShowCompose(!showCompose)}
          className="gap-2 bg-orange-500 text-white hover:bg-orange-600"
        >
          {showCompose ? <X className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
          {showCompose ? 'Cancel' : 'Compose Email'}
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

      {/* Compose Section */}
      {showCompose && (
        <Card className="bg-slate-900/50 border-white/5">
          <CardHeader>
            <CardTitle className="text-white">Compose Email</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Templates */}
            <div>
              <p className="mb-2 text-xs text-gray-400">Quick Templates</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(TEMPLATES).map(([num, tpl]) => (
                  <Button
                    key={num}
                    onClick={() => loadTemplate(Number(num))}
                    variant="outline"
                    size="sm"
                    className={`gap-2 ${
                      activeTemplate === Number(num)
                        ? 'border-orange-500/50 bg-orange-500/10 text-orange-400'
                        : 'border-white/10 text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <FileText className="h-3 w-3" />
                    {tpl.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Lead / Partner Select */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs text-gray-400">Link to Lead (optional)</label>
                <select
                  value={compose.lead_id}
                  onChange={(e) => handleLeadSelect(e.target.value)}
                  className="h-8 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white"
                >
                  <option value="" className="bg-slate-900">-- Select Lead --</option>
                  {leads.map((l) => (
                    <option key={l.id} value={l.id} className="bg-slate-900">
                      {l.business_name} {l.email ? `(${l.email})` : ''}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-400">Link to Partner (optional)</label>
                <select
                  value={compose.partner_id}
                  onChange={(e) => handlePartnerSelect(e.target.value)}
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
            </div>

            {/* Recipient Fields */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                placeholder="Recipient Email *"
                type="email"
                value={compose.recipient_email}
                onChange={(e) => setCompose({ ...compose, recipient_email: e.target.value })}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              />
              <Input
                placeholder="Recipient Name"
                value={compose.recipient_name}
                onChange={(e) => setCompose({ ...compose, recipient_name: e.target.value })}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              />
            </div>

            {/* Subject */}
            <Input
              placeholder="Subject *"
              value={compose.subject}
              onChange={(e) => setCompose({ ...compose, subject: e.target.value })}
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
            />

            {/* Body */}
            <Textarea
              placeholder="Email body *"
              value={compose.body}
              onChange={(e) => setCompose({ ...compose, body: e.target.value })}
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              rows={10}
            />

            {/* Send */}
            <div className="flex justify-end">
              <Button
                onClick={handleSend}
                disabled={sending || !compose.recipient_email || !compose.subject || !compose.body}
                className="gap-2 bg-orange-500 text-white hover:bg-orange-600"
              >
                {sending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                Send Email
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Email Log */}
      <Card className="bg-slate-900/50 border-white/5">
        <CardHeader>
          <CardTitle className="text-white">Email Log</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
            </div>
          ) : emails.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              No emails sent yet. Compose your first email!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5 text-left text-xs text-gray-500">
                    <th className="pb-3 pr-4">Date</th>
                    <th className="pb-3 pr-4">Recipient</th>
                    <th className="pb-3 pr-4">Subject</th>
                    <th className="pb-3 pr-4">Lead / Partner</th>
                    <th className="pb-3 pr-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {emails.map((email) => (
                    <tr key={email.id} className="text-sm">
                      <td className="py-3 pr-4 text-gray-400 whitespace-nowrap">
                        {new Date(email.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 pr-4">
                        <div className="text-white">{email.recipient_name || '-'}</div>
                        <div className="text-xs text-gray-500">{email.recipient_email}</div>
                      </td>
                      <td className="py-3 pr-4 text-gray-300 max-w-[200px] truncate">
                        {email.subject}
                      </td>
                      <td className="py-3 pr-4 text-gray-400 text-xs">
                        {email.leads?.business_name || email.partners?.name || '-'}
                      </td>
                      <td className="py-3 pr-4">
                        <Badge className={STATUS_COLORS[email.status] || 'bg-gray-500/10 text-gray-400'}>
                          {email.status}
                        </Badge>
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
