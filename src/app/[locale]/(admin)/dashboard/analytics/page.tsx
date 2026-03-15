'use client'

import { useEffect, useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Eye, Users, TrendingUp, Monitor, Smartphone, Tablet, Globe, ExternalLink, BarChart3, Loader2 } from 'lucide-react'

type Period = '7d' | '30d' | '90d'

interface DayData {
  date: string
  count: number
}

interface PageData {
  page: string
  count: number
}

interface LocaleData {
  locale: string
  count: number
}

interface Referrer {
  source: string
  count: number
}

interface Summary {
  total_views: number
  unique_sessions: number
  top_referrers: Referrer[]
}

interface DeviceCounts {
  mobile: number
  desktop: number
  tablet: number
}

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<Period>('30d')
  const [loading, setLoading] = useState(true)
  const [summary, setSummary] = useState<Summary | null>(null)
  const [dayData, setDayData] = useState<DayData[]>([])
  const [pageData, setPageData] = useState<PageData[]>([])
  const [deviceData, setDeviceData] = useState<DeviceCounts | null>(null)
  const [localeData, setLocaleData] = useState<LocaleData[]>([])

  const fetchData = useCallback(async (p: Period) => {
    setLoading(true)
    try {
      const [dayRes, pageRes, deviceRes, localeRes] = await Promise.all([
        fetch(`/api/admin/analytics?period=${p}&group_by=day`),
        fetch(`/api/admin/analytics?period=${p}&group_by=page`),
        fetch(`/api/admin/analytics?period=${p}&group_by=device`),
        fetch(`/api/admin/analytics?period=${p}&group_by=locale`),
      ])

      const dayJson = await dayRes.json()
      const pageJson = await pageRes.json()
      const deviceJson = await deviceRes.json()
      const localeJson = await localeRes.json()

      setSummary(dayJson.summary)
      setDayData(dayJson.grouped || [])
      setPageData(pageJson.grouped || [])
      setDeviceData(deviceJson.grouped || null)
      setLocaleData(localeJson.grouped || [])
    } catch {
      // Silent fail
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData(period)
  }, [period, fetchData])

  const totalViews = summary?.total_views ?? 0
  const uniqueSessions = summary?.unique_sessions ?? 0
  const periodDays = period === '7d' ? 7 : period === '90d' ? 90 : 30
  const avgPerDay = periodDays > 0 ? (totalViews / periodDays).toFixed(1) : '0'
  const maxDayCount = dayData.length > 0 ? Math.max(...dayData.map((d) => d.count), 1) : 1
  const maxPageCount = pageData.length > 0 ? Math.max(...pageData.map((p) => p.count), 1) : 1
  const totalDevices = deviceData ? deviceData.mobile + deviceData.desktop + deviceData.tablet : 0
  const totalLocale = localeData.reduce((acc, l) => acc + l.count, 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics</h1>
          <p className="mt-1 text-sm text-gray-400">Page views and visitor insights</p>
        </div>
        <div className="flex gap-2">
          {(['7d', '30d', '90d'] as Period[]).map((p) => (
            <Button
              key={p}
              variant={period === p ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPeriod(p)}
              className={
                period === p
                  ? 'bg-orange-500 text-white hover:bg-orange-600'
                  : 'border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
              }
            >
              {p === '7d' ? '7 days' : p === '30d' ? '30 days' : '90 days'}
            </Button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Card className="bg-slate-900/50 border-white/5">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Total Views</p>
                    <p className="mt-1 text-3xl font-bold text-white">{totalViews.toLocaleString()}</p>
                  </div>
                  <div className="rounded-xl bg-orange-500/10 p-3 text-orange-400">
                    <Eye className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-slate-900/50 border-white/5">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Unique Sessions</p>
                    <p className="mt-1 text-3xl font-bold text-white">{uniqueSessions.toLocaleString()}</p>
                  </div>
                  <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
                    <Users className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-slate-900/50 border-white/5">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Avg Views/Day</p>
                    <p className="mt-1 text-3xl font-bold text-white">{avgPerDay}</p>
                  </div>
                  <div className="rounded-xl bg-green-500/10 p-3 text-green-400">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Views per Day Chart */}
          <Card className="bg-slate-900/50 border-white/5">
            <CardHeader>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-orange-400" />
                <CardTitle className="text-white">Views per Day</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {dayData.length === 0 ? (
                <p className="py-8 text-center text-sm text-gray-500">No data for this period</p>
              ) : (
                <div className="flex items-end gap-[2px]" style={{ height: 200 }}>
                  {dayData.map((d) => {
                    const heightPct = maxDayCount > 0 ? (d.count / maxDayCount) * 100 : 0
                    const dateLabel = new Date(d.date + 'T00:00:00').toLocaleDateString('en', {
                      month: 'short',
                      day: 'numeric',
                    })
                    return (
                      <div
                        key={d.date}
                        className="group relative flex-1 min-w-0"
                        style={{ height: '100%' }}
                      >
                        {/* Tooltip */}
                        <div className="pointer-events-none absolute -top-10 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                          {dateLabel}: {d.count}
                        </div>
                        <div className="flex h-full items-end">
                          <div
                            className="w-full rounded-t bg-orange-500 transition-all group-hover:bg-orange-400"
                            style={{
                              height: `${Math.max(heightPct, d.count > 0 ? 2 : 0)}%`,
                              minHeight: d.count > 0 ? 2 : 0,
                            }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
              {/* X-axis labels */}
              {dayData.length > 0 && (
                <div className="mt-2 flex gap-[2px]">
                  {dayData.map((d, i) => {
                    // Show label every ~7 bars or first/last
                    const showLabel =
                      i === 0 ||
                      i === dayData.length - 1 ||
                      (dayData.length <= 14) ||
                      (dayData.length > 14 && i % 7 === 0)
                    return (
                      <div key={d.date} className="flex-1 min-w-0 text-center">
                        {showLabel && (
                          <span className="text-[10px] text-gray-500">
                            {new Date(d.date + 'T00:00:00').toLocaleDateString('en', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Top Pages & Devices/Locale */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Top Pages */}
            <Card className="bg-slate-900/50 border-white/5">
              <CardHeader>
                <CardTitle className="text-white">Top Pages</CardTitle>
              </CardHeader>
              <CardContent>
                {pageData.length === 0 ? (
                  <p className="py-4 text-center text-sm text-gray-500">No data</p>
                ) : (
                  <div className="space-y-3">
                    {pageData.slice(0, 10).map((p, i) => {
                      const pct = maxPageCount > 0 ? Math.round((p.count / maxPageCount) * 100) : 0
                      return (
                        <div key={p.page}>
                          <div className="mb-1 flex items-center justify-between text-sm">
                            <span className="truncate text-gray-300 max-w-[70%]" title={p.page}>
                              <span className="mr-2 text-gray-500">{i + 1}.</span>
                              {p.page}
                            </span>
                            <span className="text-gray-400 tabular-nums">{p.count.toLocaleString()}</span>
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

            {/* Device & Locale */}
            <div className="space-y-6">
              {/* Device Breakdown */}
              <Card className="bg-slate-900/50 border-white/5">
                <CardHeader>
                  <CardTitle className="text-white">Devices</CardTitle>
                </CardHeader>
                <CardContent>
                  {!deviceData || totalDevices === 0 ? (
                    <p className="py-4 text-center text-sm text-gray-500">No data</p>
                  ) : (
                    <div className="space-y-4">
                      {[
                        { key: 'desktop' as const, label: 'Desktop', icon: Monitor, barColor: 'bg-blue-500/60' },
                        { key: 'mobile' as const, label: 'Mobile', icon: Smartphone, barColor: 'bg-orange-500/60' },
                        { key: 'tablet' as const, label: 'Tablet', icon: Tablet, barColor: 'bg-purple-500/60' },
                      ].map(({ key, label, icon: Icon, barColor }) => {
                        const count = deviceData[key]
                        const pct = totalDevices > 0 ? Math.round((count / totalDevices) * 100) : 0
                        return (
                          <div key={key}>
                            <div className="mb-1 flex items-center justify-between text-sm">
                              <span className="flex items-center gap-2 text-gray-300">
                                <Icon className="h-4 w-4 text-gray-400" />
                                {label}
                              </span>
                              <span className="text-gray-400">
                                {count.toLocaleString()}{' '}
                                <span className="text-xs text-gray-500">({pct}%)</span>
                              </span>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-white/5">
                              <div className={`h-full rounded-full ${barColor}`} style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Locale Breakdown */}
              <Card className="bg-slate-900/50 border-white/5">
                <CardHeader>
                  <CardTitle className="text-white">Languages</CardTitle>
                </CardHeader>
                <CardContent>
                  {localeData.length === 0 ? (
                    <p className="py-4 text-center text-sm text-gray-500">No data</p>
                  ) : (
                    <div className="space-y-3">
                      {localeData.map((l) => {
                        const pct = totalLocale > 0 ? Math.round((l.count / totalLocale) * 100) : 0
                        const localeLabel =
                          l.locale === 'es' ? 'Spanish' :
                          l.locale === 'en' ? 'English' :
                          l.locale === 'de' ? 'German' :
                          l.locale === 'fr' ? 'French' :
                          l.locale === 'it' ? 'Italian' :
                          l.locale
                        return (
                          <div key={l.locale}>
                            <div className="mb-1 flex items-center justify-between text-sm">
                              <span className="flex items-center gap-2 text-gray-300">
                                <Globe className="h-4 w-4 text-gray-400" />
                                {localeLabel}
                                <span className="text-xs text-gray-500">({l.locale})</span>
                              </span>
                              <span className="text-gray-400">
                                {l.count.toLocaleString()}{' '}
                                <span className="text-xs text-gray-500">({pct}%)</span>
                              </span>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-white/5">
                              <div className="h-full rounded-full bg-cyan-500/60" style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Top Referrers */}
          <Card className="bg-slate-900/50 border-white/5">
            <CardHeader>
              <div className="flex items-center gap-2">
                <ExternalLink className="h-5 w-5 text-orange-400" />
                <CardTitle className="text-white">Top Referrers</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {!summary?.top_referrers || summary.top_referrers.length === 0 ? (
                <p className="py-4 text-center text-sm text-gray-500">No referrer data yet</p>
              ) : (
                <div className="space-y-3">
                  {summary.top_referrers.map((r, i) => {
                    const maxRef = summary.top_referrers[0].count
                    const pct = maxRef > 0 ? Math.round((r.count / maxRef) * 100) : 0
                    return (
                      <div key={r.source}>
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span className="truncate text-gray-300 max-w-[70%]">
                            <span className="mr-2 text-gray-500">{i + 1}.</span>
                            {r.source}
                          </span>
                          <span className="text-gray-400 tabular-nums">{r.count.toLocaleString()}</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-white/5">
                          <div className="h-full rounded-full bg-emerald-500/60" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
