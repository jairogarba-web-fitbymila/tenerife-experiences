import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { logActivity, requireOwnerOrForbidden } from '@/lib/activity-log'

export async function GET(request: NextRequest) {
  if (!(await requireOwnerOrForbidden(request, 'email'))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('email_log')
    .select(`
      *,
      leads:lead_id ( business_name, contact_name ),
      partners:partner_id ( name )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
  const user = await requireOwnerOrForbidden(request, 'email')
  if (!user) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await request.json()
  const {
    lead_id,
    partner_id,
    recipient_email,
    recipient_name,
    subject,
    body: emailBody,
    template_number,
  } = body

  if (!recipient_email || !subject || !emailBody) {
    return NextResponse.json(
      { error: 'Recipient email, subject, and body are required' },
      { status: 400 }
    )
  }

  const supabase = createAdminClient()

  // For now, just log the email. Real Resend integration will come later.
  const { data, error } = await supabase
    .from('email_log')
    .insert({
      lead_id: lead_id || null,
      partner_id: partner_id || null,
      recipient_email,
      recipient_name: recipient_name || null,
      subject,
      body: emailBody,
      template_number: template_number || null,
      status: 'sent',
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  await logActivity({
    user,
    action: 'create',
    entityType: 'email',
    entityId: data?.id,
    entityLabel: `${subject} → ${recipient_email}`,
    metadata: { template_number, lead_id, partner_id },
    request,
  })

  return NextResponse.json(data)
}
