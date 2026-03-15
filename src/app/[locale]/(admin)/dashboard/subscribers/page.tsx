'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Mail,
  Trash2,
  Download,
  Loader2,
  Users,
} from 'lucide-react'

interface Subscriber {
  id: string
  email: string
  locale: string | null
  subscribed: boolean
  created_at: string
}

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)

  const fetchSubscribers = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/subscribers')
      if (res.ok) {
        const data = await res.json()
        setSubscribers(data)
      }
    } catch (err) {
      console.error('Failed to fetch subscribers:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubscribers()
  }, [])

  const deleteSubscriber = async (id: string) => {
    if (!confirm('Are you sure you want to delete this subscriber?')) return
    try {
      const res = await fetch(`/api/admin/subscribers?id=${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        setSubscribers((prev) => prev.filter((s) => s.id !== id))
      }
    } catch (err) {
      console.error('Failed to delete subscriber:', err)
    }
  }

  const exportCsv = async () => {
    try {
      const res = await fetch('/api/admin/subscribers?export=csv')
      if (!res.ok) throw new Error('Export failed')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `subscribers-export-${new Date().toISOString().split('T')[0]}.csv`
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Export failed:', err)
    }
  }

  const byLocale = subscribers.reduce<Record<string, number>>((acc, sub) => {
    const locale = sub.locale || 'unknown'
    acc[locale] = (acc[locale] || 0) + 1
    return acc
  }, {})

  const activeCount = subscribers.filter((s) => s.subscribed).length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Subscribers</h1>
          <p className="mt-1 text-sm text-gray-400">
            Manage newsletter subscribers
          </p>
        </div>
        <Button
          onClick={exportCsv}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-slate-900/50 border-white/5">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-white">
              {subscribers.length}
            </div>
            <p className="text-xs text-gray-400">Total Subscribers</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900/50 border-white/5">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-400">
              {activeCount}
            </div>
            <p className="text-xs text-gray-400">Active</p>
          </CardContent>
        </Card>
        {Object.entries(byLocale)
          .sort(([, a], [, b]) => b - a)
          .map(([locale, count]) => (
            <Card key={locale} className="bg-slate-900/50 border-white/5">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-orange-400">
                  {count}
                </div>
                <p className="text-xs text-gray-400">
                  {locale.toUpperCase()} locale
                </p>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Subscribers List */}
      <Card className="bg-slate-900/50 border-white/5">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Users className="h-4 w-4" />
            All Subscribers ({subscribers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
            </div>
          ) : subscribers.length === 0 ? (
            <p className="text-center py-12 text-gray-500">
              No subscribers yet.
            </p>
          ) : (
            <div className="space-y-3">
              {subscribers.map((sub) => (
                <div
                  key={sub.id}
                  className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] p-4"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <p className="truncate text-sm font-medium text-white">
                        {sub.email}
                      </p>
                      {sub.locale && (
                        <Badge
                          variant="outline"
                          className="border-white/10 text-gray-400 text-[10px]"
                        >
                          {sub.locale.toUpperCase()}
                        </Badge>
                      )}
                      <Badge
                        className={
                          sub.subscribed
                            ? 'bg-green-500/10 text-green-400 border-0 text-[10px]'
                            : 'bg-red-500/10 text-red-400 border-0 text-[10px]'
                        }
                      >
                        {sub.subscribed ? 'Active' : 'Unsubscribed'}
                      </Badge>
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      {new Date(sub.created_at).toLocaleDateString()}{' '}
                      {new Date(sub.created_at).toLocaleTimeString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 ml-4">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => deleteSubscriber(sub.id)}
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
