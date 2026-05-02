import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { requireOwner } from '@/lib/auth'

export async function GET() {
  if (!(await requireOwner())) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('contracts')
    .select(`
      *,
      partners:partner_id ( id, name )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
  if (!(await requireOwner())) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await request.json()
  const {
    partner_id,
    lead_id,
    plan,
    price,
    billing_cycle,
    start_date,
    end_date,
    notes,
    status,
  } = body

  if (!partner_id || !plan) {
    return NextResponse.json(
      { error: 'Partner and plan are required' },
      { status: 400 }
    )
  }

  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('contracts')
    .insert({
      partner_id,
      lead_id: lead_id || null,
      plan,
      price: price || 0,
      billing_cycle: billing_cycle || 'monthly',
      start_date: start_date || new Date().toISOString().split('T')[0],
      end_date: end_date || null,
      notes: notes || null,
      status: status || 'draft',
    })
    .select(`
      *,
      partners:partner_id ( id, name )
    `)
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function PUT(request: NextRequest) {
  if (!(await requireOwner())) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await request.json()
  const { id, ...updates } = body

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 })
  }

  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('contracts')
    .update(updates)
    .eq('id', id)
    .select(`
      *,
      partners:partner_id ( id, name )
    `)
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function DELETE(request: NextRequest) {
  if (!(await requireOwner())) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 })
  }

  const supabase = createAdminClient()
  const { error } = await supabase.from('contracts').delete().eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
