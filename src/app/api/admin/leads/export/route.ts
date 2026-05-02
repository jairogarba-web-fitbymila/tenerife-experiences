import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { requireOwner } from '@/lib/auth'

function escapeCsvField(value: string | null | undefined): string {
  if (value == null) return ''
  const str = String(value)
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

export async function GET() {
  if (!(await requireOwner())) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const supabase = createAdminClient()
  const { data: leads, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const columns = [
    'business_name',
    'category',
    'subcategory',
    'zone',
    'email',
    'phone',
    'website',
    'status',
    'priority',
    'contact_attempts',
    'source',
    'created_at',
  ] as const

  const header = columns.join(',')
  const rows = (leads ?? []).map((lead) =>
    columns.map((col) => escapeCsvField(lead[col])).join(',')
  )
  const csv = [header, ...rows].join('\n')

  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="leads-export-${new Date().toISOString().split('T')[0]}.csv"`,
    },
  })
}
