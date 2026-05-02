import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { logActivity, requireOwnerOrForbidden } from '@/lib/activity-log'

export async function GET(request: NextRequest) {
  if (!(await requireOwnerOrForbidden(request, 'invoice'))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('invoices')
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
  const user = await requireOwnerOrForbidden(request, 'invoice')
  if (!user) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await request.json()
  const {
    contract_id,
    partner_id,
    amount,
    currency,
    invoice_number,
    description,
    issued_at,
    due_at,
  } = body

  if (!partner_id || !amount) {
    return NextResponse.json(
      { error: 'Partner and amount are required' },
      { status: 400 }
    )
  }

  // Auto-generate invoice number if not provided
  const finalInvoiceNumber =
    invoice_number || `INV-${Date.now().toString(36).toUpperCase()}`

  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('invoices')
    .insert({
      contract_id: contract_id || null,
      partner_id,
      amount,
      currency: currency || 'EUR',
      invoice_number: finalInvoiceNumber,
      description: description || null,
      issued_at: issued_at || new Date().toISOString().split('T')[0],
      due_at: due_at || null,
      status: 'pending',
    })
    .select(`
      *,
      partners:partner_id ( id, name )
    `)
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  await logActivity({
    user,
    action: 'create',
    entityType: 'invoice',
    entityId: data?.id,
    entityLabel: data?.invoice_number ?? null,
    changes: { partner_id, amount, currency: currency || 'EUR' },
    request,
  })

  return NextResponse.json(data)
}

export async function PUT(request: NextRequest) {
  const user = await requireOwnerOrForbidden(request, 'invoice')
  if (!user) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await request.json()
  const { id, ...updates } = body

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 })
  }

  // If marking as paid, set paid_at
  if (updates.status === 'paid' && !updates.paid_at) {
    updates.paid_at = new Date().toISOString()
  }

  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('invoices')
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

  await logActivity({
    user,
    action: 'update',
    entityType: 'invoice',
    entityId: id,
    entityLabel: data?.invoice_number ?? null,
    changes: updates,
    request,
  })

  return NextResponse.json(data)
}
