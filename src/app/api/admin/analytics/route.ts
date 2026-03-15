import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { isAuthenticated } from '@/lib/auth'

function getPeriodDays(period: string): number {
  switch (period) {
    case '7d': return 7
    case '90d': return 90
    default: return 30
  }
}

export async function GET(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const period = searchParams.get('period') || '30d'
  const groupBy = searchParams.get('group_by') || 'day'

  const days = getPeriodDays(period)
  const sinceDate = new Date()
  sinceDate.setDate(sinceDate.getDate() - days)
  const sinceISO = sinceDate.toISOString()

  const supabase = createAdminClient()

  // Fetch all page views for the period
  const { data: views, error } = await supabase
    .from('page_views')
    .select('id, page_path, locale, referrer, session_id, device, created_at')
    .gte('created_at', sinceISO)
    .order('created_at', { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const allViews = views || []

  // Summary
  const totalViews = allViews.length
  const uniqueSessions = new Set(allViews.map((v) => v.session_id)).size

  // Top referrers
  const referrerCounts: Record<string, number> = {}
  for (const v of allViews) {
    if (v.referrer) {
      try {
        const host = new URL(v.referrer).hostname
        referrerCounts[host] = (referrerCounts[host] || 0) + 1
      } catch {
        referrerCounts[v.referrer] = (referrerCounts[v.referrer] || 0) + 1
      }
    }
  }
  const topReferrers = Object.entries(referrerCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([source, count]) => ({ source, count }))

  const summary = { total_views: totalViews, unique_sessions: uniqueSessions, top_referrers: topReferrers }

  // Group data
  let grouped: unknown = null

  if (groupBy === 'day') {
    const dayCounts: Record<string, number> = {}
    // Pre-fill all days in the period
    for (let i = 0; i < days; i++) {
      const d = new Date()
      d.setDate(d.getDate() - (days - 1 - i))
      const key = d.toISOString().split('T')[0]
      dayCounts[key] = 0
    }
    for (const v of allViews) {
      const key = v.created_at.split('T')[0]
      if (key in dayCounts) {
        dayCounts[key]++
      }
    }
    grouped = Object.entries(dayCounts).map(([date, count]) => ({ date, count }))
  }

  if (groupBy === 'page') {
    const pageCounts: Record<string, number> = {}
    for (const v of allViews) {
      pageCounts[v.page_path] = (pageCounts[v.page_path] || 0) + 1
    }
    grouped = Object.entries(pageCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([page, count]) => ({ page, count }))
  }

  if (groupBy === 'device') {
    const deviceCounts: Record<string, number> = { mobile: 0, desktop: 0, tablet: 0 }
    for (const v of allViews) {
      const dev = v.device || 'desktop'
      deviceCounts[dev] = (deviceCounts[dev] || 0) + 1
    }
    grouped = deviceCounts
  }

  if (groupBy === 'locale') {
    const localeCounts: Record<string, number> = {}
    for (const v of allViews) {
      const loc = v.locale || 'unknown'
      localeCounts[loc] = (localeCounts[loc] || 0) + 1
    }
    grouped = Object.entries(localeCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([locale, count]) => ({ locale, count }))
  }

  return NextResponse.json({ summary, grouped })
}
