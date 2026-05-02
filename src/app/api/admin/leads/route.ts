import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { requireOwner } from '@/lib/auth'

export async function GET(request: NextRequest) {
  if (!(await requireOwner())) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { searchParams } = new URL(request.url)
  const supabase = createAdminClient()

  // Single lead by ID
  const id = searchParams.get('id')
  if (id) {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  }

  // List leads
  const status = searchParams.get('status')
  const search = searchParams.get('search')

  let query = supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (status && status !== 'all') {
    query = query.eq('status', status)
  }

  if (search && search.trim()) {
    query = query.ilike('business_name', `%${search.trim()}%`)
  }

  const { data, error } = await query

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
    business_name,
    contact_name,
    email,
    phone,
    website,
    category,
    zone,
    priority,
    notes,
  } = body

  if (!business_name) {
    return NextResponse.json(
      { error: 'Business name is required' },
      { status: 400 }
    )
  }

  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('leads')
    .insert({
      business_name,
      contact_name: contact_name || null,
      email: email || null,
      phone: phone || null,
      website: website || null,
      category: category || null,
      zone: zone || null,
      status: 'new',
      priority: priority || 'medium',
      contact_attempts: 0,
      notes: notes || null,
    })
    .select()
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

  // If status is being changed to contacted-like statuses, update last_contacted_at
  if (
    updates.status &&
    ['contacted', 'interested', 'converted'].includes(updates.status)
  ) {
    updates.last_contacted_at = new Date().toISOString()
  }

  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('leads')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
