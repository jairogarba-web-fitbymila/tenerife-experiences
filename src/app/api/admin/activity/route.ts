import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { requireOwnerOrForbidden } from '@/lib/activity-log'

export async function GET(request: NextRequest) {
  if (!(await requireOwnerOrForbidden(request, 'session'))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('user_id')
  const entityType = searchParams.get('entity_type')
  const action = searchParams.get('action')
  const since = searchParams.get('since')
  const page = Math.max(parseInt(searchParams.get('page') || '1'), 1)
  const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 200)
  const offset = (page - 1) * limit

  const supabase = createAdminClient()
  let query = supabase
    .from('admin_activity_log')
    .select('*', { count: 'exact' })

  if (userId) query = query.eq('user_id', userId)
  if (entityType && entityType !== 'all') query = query.eq('entity_type', entityType)
  if (action && action !== 'all') query = query.eq('action', action)
  if (since) query = query.gte('created_at', since)

  const { data, error, count } = await query
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data, count, page, limit })
}
