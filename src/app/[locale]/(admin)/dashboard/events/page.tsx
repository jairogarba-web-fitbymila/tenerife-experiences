'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  CalendarDays,
  Trash2,
  Eye,
  EyeOff,
  Star,
  StarOff,
  Loader2,
  Filter,
} from 'lucide-react'

interface Event {
  id: string
  slug: string
  name: Record<string, string>
  description: Record<string, string>
  municipality: string | null
  municipality_slug: string | null
  event_type: string | null
  start_date: string | null
  end_date: string | null
  month: number | null
  image: string | null
  highlights: Record<string, string[]> | null
  featured: boolean
  visible: boolean
}

const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [filterMonth, setFilterMonth] = useState<string>('all')
  const [filterMunicipality, setFilterMunicipality] = useState<string>('all')

  const fetchEvents = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/events')
      if (res.ok) {
        const data = await res.json()
        setEvents(data)
      }
    } catch (err) {
      console.error('Failed to fetch events:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const toggleField = async (
    id: string,
    field: 'visible' | 'featured',
    current: boolean
  ) => {
    try {
      const res = await fetch('/api/admin/events', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, [field]: !current }),
      })
      if (res.ok) {
        setEvents((prev) =>
          prev.map((e) => (e.id === id ? { ...e, [field]: !current } : e))
        )
      }
    } catch (err) {
      console.error(`Failed to toggle ${field}:`, err)
    }
  }

  const deleteEvent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return
    try {
      const res = await fetch(`/api/admin/events?id=${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        setEvents((prev) => prev.filter((e) => e.id !== id))
      }
    } catch (err) {
      console.error('Failed to delete event:', err)
    }
  }

  const municipalities = Array.from(
    new Set(events.map((e) => e.municipality).filter(Boolean))
  ).sort() as string[]

  const filtered = events.filter((event) => {
    if (filterMonth !== 'all' && String(event.month) !== filterMonth)
      return false
    if (
      filterMunicipality !== 'all' &&
      event.municipality !== filterMunicipality
    )
      return false
    return true
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Events</h1>
        <p className="mt-1 text-sm text-gray-400">
          Manage local events and festivals
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="bg-slate-900/50 border-white/5">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-white">{events.length}</div>
            <p className="text-xs text-gray-400">Total Events</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900/50 border-white/5">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-400">
              {events.filter((e) => e.visible).length}
            </div>
            <p className="text-xs text-gray-400">Visible</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900/50 border-white/5">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-amber-400">
              {events.filter((e) => e.featured).length}
            </div>
            <p className="text-xs text-gray-400">Featured</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <Filter className="h-4 w-4 text-gray-400" />
        <select
          value={filterMonth}
          onChange={(e) => setFilterMonth(e.target.value)}
          className="h-8 rounded-lg border border-white/10 bg-slate-800/50 px-2.5 text-sm text-white outline-none focus:border-ring focus:ring-3 focus:ring-ring/50"
        >
          <option value="all">All months</option>
          {MONTHS.map((m, i) => (
            <option key={i + 1} value={String(i + 1)}>
              {m}
            </option>
          ))}
        </select>
        <select
          value={filterMunicipality}
          onChange={(e) => setFilterMunicipality(e.target.value)}
          className="h-8 rounded-lg border border-white/10 bg-slate-800/50 px-2.5 text-sm text-white outline-none focus:border-ring focus:ring-3 focus:ring-ring/50"
        >
          <option value="all">All municipalities</option>
          {municipalities.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      {/* Events List */}
      <Card className="bg-slate-900/50 border-white/5">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            Events ({filtered.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center py-12 text-gray-500">
              {filterMonth !== 'all' || filterMunicipality !== 'all'
                ? 'No events match your filters.'
                : 'No events found.'}
            </p>
          ) : (
            <div className="space-y-3">
              {filtered.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] p-4"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-medium text-white">
                        {event.name?.es || event.name?.en || 'Sin nombre'}
                      </p>
                      {event.event_type && (
                        <Badge
                          variant="outline"
                          className="border-white/10 text-gray-400 text-[10px]"
                        >
                          {event.event_type}
                        </Badge>
                      )}
                      {event.featured && (
                        <Badge className="bg-amber-500/10 text-amber-400 border-0 text-[10px]">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
                      {event.municipality && (
                        <span>{event.municipality}</span>
                      )}
                      {event.month && (
                        <span>{MONTHS[event.month - 1]}</span>
                      )}
                      {event.start_date && (
                        <span>
                          {new Date(event.start_date).toLocaleDateString()}
                          {event.end_date &&
                            ` - ${new Date(event.end_date).toLocaleDateString()}`}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 ml-4">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() =>
                        toggleField(event.id, 'featured', event.featured)
                      }
                      className={
                        event.featured
                          ? 'text-amber-400 hover:text-amber-300'
                          : 'text-gray-500 hover:text-amber-400'
                      }
                      title={event.featured ? 'Unfeature' : 'Feature'}
                    >
                      {event.featured ? (
                        <Star className="h-4 w-4 fill-amber-400" />
                      ) : (
                        <StarOff className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() =>
                        toggleField(event.id, 'visible', event.visible)
                      }
                      className={
                        event.visible
                          ? 'text-green-400 hover:text-green-300'
                          : 'text-gray-500 hover:text-green-400'
                      }
                      title={event.visible ? 'Hide' : 'Show'}
                    >
                      {event.visible ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <EyeOff className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => deleteEvent(event.id)}
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
