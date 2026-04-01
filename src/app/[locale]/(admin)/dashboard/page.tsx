import { createAdminClient } from '@/lib/supabase/admin'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import {
  MapPin,
  FileText,
  CalendarDays,
  Handshake,
  Users,
  Mail,
  Sparkles,
  Plus,
  Eye,
} from 'lucide-react'
import { ExportLeadsCsvButton } from './export-csv-button'

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const supabase = createAdminClient()

  // Fetch all counts and data in parallel
  const [
    { count: itemsCount },
    { count: articlesCount },
    { count: eventsCount },
    { count: partnersCount },
    { count: leadsCount },
    { count: subscribersCount },
    { data: allLeads },
    { data: recentLeads },
  ] = await Promise.all([
    supabase.from('items').select('*', { count: 'exact', head: true }),
    supabase.from('articles').select('*', { count: 'exact', head: true }),
    supabase.from('events').select('*', { count: 'exact', head: true }),
    supabase.from('partners').select('*', { count: 'exact', head: true }),
    supabase.from('leads').select('*', { count: 'exact', head: true }),
    supabase.from('subscribers').select('*', { count: 'exact', head: true }),
    supabase.from('leads').select('status, category'),
    supabase
      .from('leads')
      .select('id, business_name, category, zone, status, created_at')
      .order('created_at', { ascending: false })
      .limit(10),
  ])

  // Overview stats
  const overviewStats = [
    { label: 'Total Items', value: itemsCount ?? 0, icon: MapPin, color: 'text-green-400' },
    { label: 'Total Articles', value: articlesCount ?? 0, icon: FileText, color: 'text-orange-400' },
    { label: 'Total Events', value: eventsCount ?? 0, icon: CalendarDays, color: 'text-cyan-400' },
    { label: 'Total Partners', value: partnersCount ?? 0, icon: Handshake, color: 'text-purple-400' },
    { label: 'Total Leads', value: leadsCount ?? 0, icon: Users, color: 'text-blue-400' },
    { label: 'Total Subscribers', value: subscribersCount ?? 0, icon: Mail, color: 'text-pink-400' },
  ]

  // Leads pipeline
  const pipelineStatuses = ['new', 'contacted', 'interested', 'negotiating', 'converted'] as const
  const pipelineCounts: Record<string, number> = {}
  for (const s of pipelineStatuses) {
    pipelineCounts[s] = 0
  }
  const totalLeads = allLeads?.length ?? 0
  for (const lead of allLeads ?? []) {
    if (lead.status in pipelineCounts) {
      pipelineCounts[lead.status]++
    }
  }
  const conversionRate =
    totalLeads > 0
      ? ((pipelineCounts['converted'] / totalLeads) * 100).toFixed(1)
      : '0.0'

  const pipelineColors: Record<string, string> = {
    new: 'bg-blue-500',
    contacted: 'bg-yellow-500',
    interested: 'bg-purple-500',
    negotiating: 'bg-orange-500',
    converted: 'bg-green-500',
  }

  // Leads by category
  const categoryCounts: Record<string, number> = {}
  for (const lead of allLeads ?? []) {
    const cat = lead.category || 'uncategorized'
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1
  }
  const sortedCategories = Object.entries(categoryCounts).sort(
    (a, b) => b[1] - a[1]
  )

  // Status colors for recent leads
  const statusColors: Record<string, string> = {
    new: 'bg-blue-500/10 text-blue-400',
    contacted: 'bg-yellow-500/10 text-yellow-400',
    interested: 'bg-purple-500/10 text-purple-400',
    negotiating: 'bg-orange-500/10 text-orange-400',
    converted: 'bg-green-500/10 text-green-400',
    rejected: 'bg-red-500/10 text-red-400',
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-400">
          Overview of your Tenerife Experiences platform
        </p>
      </div>

      {/* Overview Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {overviewStats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card
              key={stat.label}
              className="bg-slate-900/50 border-white/5"
            >
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                    <p className="mt-1 text-3xl font-bold text-white">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`rounded-xl bg-white/5 p-3 ${stat.color}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Leads Pipeline */}
      <Card className="bg-slate-900/50 border-white/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Leads Pipeline</CardTitle>
            <span className="text-sm text-gray-400">
              Conversion rate:{' '}
              <span className="font-semibold text-green-400">
                {conversionRate}%
              </span>
            </span>
          </div>
        </CardHeader>
        <CardContent>
          {/* Pipeline bar */}
          {totalLeads > 0 && (
            <div className="mb-4 flex h-4 overflow-hidden rounded-full">
              {pipelineStatuses.map((status) => {
                const count = pipelineCounts[status]
                if (count === 0) return null
                const pct = (count / totalLeads) * 100
                return (
                  <div
                    key={status}
                    className={`${pipelineColors[status]} transition-all`}
                    style={{ width: `${pct}%` }}
                    title={`${status}: ${count}`}
                  />
                )
              })}
            </div>
          )}
          {/* Pipeline counts */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            {pipelineStatuses.map((status) => (
              <div
                key={status}
                className="rounded-lg border border-white/5 bg-white/[0.02] p-3 text-center"
              >
                <div
                  className={`mx-auto mb-1 h-2 w-2 rounded-full ${pipelineColors[status]}`}
                />
                <p className="text-xs capitalize text-gray-400">{status}</p>
                <p className="text-lg font-bold text-white">
                  {pipelineCounts[status]}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Leads by Category + Quick Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Leads by Category */}
        <Card className="bg-slate-900/50 border-white/5">
          <CardHeader>
            <CardTitle className="text-white">Leads by Category</CardTitle>
          </CardHeader>
          <CardContent>
            {sortedCategories.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                No leads yet
              </p>
            ) : (
              <div className="space-y-3">
                {sortedCategories.map(([category, count]) => {
                  const pct =
                    totalLeads > 0
                      ? Math.round((count / totalLeads) * 100)
                      : 0
                  return (
                    <div key={category}>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span className="capitalize text-gray-300">
                          {category}
                        </span>
                        <span className="text-gray-400">
                          {count}{' '}
                          <span className="text-xs text-gray-500">
                            ({pct}%)
                          </span>
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/5">
                        <div
                          className="h-full rounded-full bg-orange-500/60"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-slate-900/50 border-white/5">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <ExportLeadsCsvButton />
            <Link
              href={`/${locale}/dashboard/articles`}
              className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-4 text-sm text-gray-300 transition-colors hover:border-orange-400/20 hover:bg-white/5"
            >
              <div className="rounded-lg bg-orange-500/10 p-2">
                <Sparkles className="h-4 w-4 text-orange-400" />
              </div>
              Generate Article
            </Link>
            <Link
              href={`/${locale}/dashboard/partners`}
              className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-4 text-sm text-gray-300 transition-colors hover:border-purple-400/20 hover:bg-white/5"
            >
              <div className="rounded-lg bg-purple-500/10 p-2">
                <Plus className="h-4 w-4 text-purple-400" />
              </div>
              Add Partner
            </Link>
            <Link
              href={`/${locale}/dashboard/leads`}
              className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-4 text-sm text-gray-300 transition-colors hover:border-blue-400/20 hover:bg-white/5"
            >
              <div className="rounded-lg bg-blue-500/10 p-2">
                <Eye className="h-4 w-4 text-blue-400" />
              </div>
              View Leads
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Leads */}
      <Card className="bg-slate-900/50 border-white/5">
        <CardHeader>
          <CardTitle className="text-white">Recent Leads</CardTitle>
        </CardHeader>
        <CardContent>
          {(!recentLeads || recentLeads.length === 0) ? (
            <p className="text-sm text-gray-500 text-center py-4">
              No leads yet
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5 text-left text-xs text-gray-500">
                    <th className="pb-3 font-medium">Name</th>
                    <th className="pb-3 font-medium">Category</th>
                    <th className="pb-3 font-medium">Zone</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recentLeads.map((lead) => (
                    <tr key={lead.id}>
                      <td className="py-3 text-white">
                        {lead.business_name}
                      </td>
                      <td className="py-3 capitalize text-gray-400">
                        {lead.category || '-'}
                      </td>
                      <td className="py-3 text-gray-400">
                        {lead.zone || '-'}
                      </td>
                      <td className="py-3">
                        <Badge
                          className={
                            statusColors[lead.status] ||
                            'bg-gray-500/10 text-gray-400'
                          }
                        >
                          {lead.status}
                        </Badge>
                      </td>
                      <td className="py-3 text-gray-500">
                        {new Date(lead.created_at).toLocaleDateString()}
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
