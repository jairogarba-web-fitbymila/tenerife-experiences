'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Loader2, Activity, Filter, RefreshCw } from 'lucide-react'

interface ActivityRow {
  id: string
  user_id: string | null
  user_name: string | null
  user_role: string | null
  action: string
  entity_type: string
  entity_id: string | null
  entity_label: string | null
  changes: Record<string, unknown> | null
  ip_address: string | null
  user_agent: string | null
  metadata: Record<string, unknown> | null
  created_at: string
}

interface ActivityResponse {
  data: ActivityRow[]
  count: number
  page: number
  limit: number
}

const ACTION_COLORS: Record<string, string> = {
  create: 'bg-green-500/10 text-green-400',
  update: 'bg-blue-500/10 text-blue-400',
  delete: 'bg-red-500/10 text-red-400',
  login: 'bg-emerald-500/10 text-emerald-400',
  logout: 'bg-gray-500/10 text-gray-400',
  login_failed: 'bg-amber-500/10 text-amber-400',
  forbidden: 'bg-rose-500/10 text-rose-400',
}

const ACTION_LABELS: Record<string, string> = {
  create: 'Crear',
  update: 'Editar',
  delete: 'Borrar',
  login: 'Login',
  logout: 'Logout',
  login_failed: 'Login fallido',
  forbidden: 'Acceso bloqueado',
}

const ENTITY_LABELS: Record<string, string> = {
  article: 'Artículo',
  item: 'Item',
  category: 'Categoría',
  event: 'Evento',
  partner: 'Partner',
  photo: 'Foto',
  landing_image: 'Imagen landing',
  item_image: 'Imagen',
  lead: 'Lead',
  subscriber: 'Suscriptor',
  contract: 'Contrato',
  invoice: 'Factura',
  email: 'Email',
  outreach: 'Outreach',
  session: 'Sesión',
  auth: 'Auth',
}

const ENTITY_OPTIONS = ['all', ...Object.keys(ENTITY_LABELS)]
const ACTION_OPTIONS = ['all', ...Object.keys(ACTION_LABELS)]

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function ActivityPage() {
  const [rows, setRows] = useState<ActivityRow[]>([])
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1)
  const [limit] = useState(50)
  const [loading, setLoading] = useState(true)
  const [filterEntity, setFilterEntity] = useState('all')
  const [filterAction, setFilterAction] = useState('all')
  const [expanded, setExpanded] = useState<string | null>(null)

  const fetchActivity = async () => {
    setLoading(true)
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    })
    if (filterEntity !== 'all') params.set('entity_type', filterEntity)
    if (filterAction !== 'all') params.set('action', filterAction)
    try {
      const res = await fetch(`/api/admin/activity?${params}`)
      const json: ActivityResponse | { error: string } = await res.json()
      if ('data' in json) {
        setRows(json.data)
        setCount(json.count)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchActivity()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filterEntity, filterAction])

  const totalPages = Math.max(1, Math.ceil(count / limit))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white flex items-center gap-2">
            <Activity className="h-6 w-6 text-orange-400" />
            Actividad del panel
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Quién hizo qué y cuándo. Solo visible para owner.
          </p>
        </div>
        <Button onClick={fetchActivity} variant="outline" size="sm" disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refrescar
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <select
            value={filterAction}
            onChange={(e) => {
              setFilterAction(e.target.value)
              setPage(1)
            }}
            className="rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white"
          >
            {ACTION_OPTIONS.map((a) => (
              <option key={a} value={a}>
                {a === 'all' ? 'Todas las acciones' : ACTION_LABELS[a] || a}
              </option>
            ))}
          </select>
          <select
            value={filterEntity}
            onChange={(e) => {
              setFilterEntity(e.target.value)
              setPage(1)
            }}
            className="rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white"
          >
            {ENTITY_OPTIONS.map((e) => (
              <option key={e} value={e}>
                {e === 'all' ? 'Todas las entidades' : ENTITY_LABELS[e] || e}
              </option>
            ))}
          </select>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-white/10 text-left text-xs uppercase text-gray-400">
                <tr>
                  <th className="px-4 py-3 font-medium">Fecha</th>
                  <th className="px-4 py-3 font-medium">Usuario</th>
                  <th className="px-4 py-3 font-medium">Acción</th>
                  <th className="px-4 py-3 font-medium">Entidad</th>
                  <th className="px-4 py-3 font-medium">Detalle</th>
                  <th className="px-4 py-3 font-medium">IP</th>
                </tr>
              </thead>
              <tbody>
                {loading && rows.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-gray-400">
                      <Loader2 className="h-6 w-6 animate-spin inline" />
                    </td>
                  </tr>
                ) : rows.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-gray-500">
                      Sin actividad registrada con estos filtros.
                    </td>
                  </tr>
                ) : (
                  rows.map((row) => {
                    const isExpanded = expanded === row.id
                    return (
                      <>
                        <tr
                          key={row.id}
                          className="border-b border-white/5 hover:bg-white/5 cursor-pointer"
                          onClick={() => setExpanded(isExpanded ? null : row.id)}
                        >
                          <td className="px-4 py-3 text-gray-300 whitespace-nowrap">
                            {formatDate(row.created_at)}
                          </td>
                          <td className="px-4 py-3">
                            <div className="text-white">{row.user_name || '—'}</div>
                            {row.user_role && (
                              <div className="text-xs text-gray-500">{row.user_role}</div>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <Badge className={ACTION_COLORS[row.action] || 'bg-gray-500/10 text-gray-400'}>
                              {ACTION_LABELS[row.action] || row.action}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-gray-300">
                            {ENTITY_LABELS[row.entity_type] || row.entity_type}
                          </td>
                          <td className="px-4 py-3 text-gray-300 max-w-md truncate">
                            {row.entity_label || row.entity_id || '—'}
                          </td>
                          <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">
                            {row.ip_address || '—'}
                          </td>
                        </tr>
                        {isExpanded && (
                          <tr className="border-b border-white/5 bg-slate-900/50">
                            <td colSpan={6} className="px-4 py-3 text-xs">
                              {row.changes && (
                                <div className="mb-2">
                                  <div className="text-gray-400 font-medium mb-1">Cambios</div>
                                  <pre className="bg-slate-950 rounded p-2 overflow-x-auto text-gray-300">
                                    {JSON.stringify(row.changes, null, 2)}
                                  </pre>
                                </div>
                              )}
                              {row.metadata && (
                                <div className="mb-2">
                                  <div className="text-gray-400 font-medium mb-1">Metadata</div>
                                  <pre className="bg-slate-950 rounded p-2 overflow-x-auto text-gray-300">
                                    {JSON.stringify(row.metadata, null, 2)}
                                  </pre>
                                </div>
                              )}
                              {row.user_agent && (
                                <div>
                                  <span className="text-gray-400 font-medium">User-agent:</span>{' '}
                                  <span className="text-gray-300">{row.user_agent}</span>
                                </div>
                              )}
                              {row.entity_id && (
                                <div>
                                  <span className="text-gray-400 font-medium">Entity ID:</span>{' '}
                                  <span className="text-gray-300 font-mono">{row.entity_id}</span>
                                </div>
                              )}
                            </td>
                          </tr>
                        )}
                      </>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-white/10">
              <span className="text-xs text-gray-400">
                {count} eventos · página {page} de {totalPages}
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 1 || loading}
                  onClick={() => setPage(page - 1)}
                >
                  Anterior
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= totalPages || loading}
                  onClick={() => setPage(page + 1)}
                >
                  Siguiente
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
