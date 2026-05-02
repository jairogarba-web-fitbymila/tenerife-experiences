import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { logActivity, requireOwnerOrForbidden } from '@/lib/activity-log'

function escapeCsvField(value: string | null | undefined): string {
  if (value == null) return ''
  const str = String(value)
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

export async function GET(request: NextRequest) {
  if (!(await requireOwnerOrForbidden(request, 'subscriber'))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { searchParams } = new URL(request.url)
  const exportCsv = searchParams.get('export')

  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('subscribers')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (exportCsv === 'csv') {
    const columns = ['email', 'locale', 'subscribed', 'created_at'] as const
    const header = columns.join(',')
    const rows = (data ?? []).map((sub) =>
      columns.map((col) => escapeCsvField(sub[col])).join(',')
    )
    const csv = [header, ...rows].join('\n')

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="subscribers-export-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    })
  }

  return NextResponse.json(data)
}

export async function DELETE(request: NextRequest) {
  const user = await requireOwnerOrForbidden(request, 'subscriber')
  if (!user) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 })
  }

  const supabase = createAdminClient()
  const { data: existing } = await supabase
    .from('subscribers')
    .select('email')
    .eq('id', id)
    .maybeSingle()

  const { error } = await supabase.from('subscribers').delete().eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  await logActivity({
    user,
    action: 'delete',
    entityType: 'subscriber',
    entityId: id,
    entityLabel: existing?.email ?? null,
    request,
  })

  return NextResponse.json({ success: true })
}
