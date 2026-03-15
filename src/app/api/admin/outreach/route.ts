import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getEmailTemplate } from '@/lib/email-templates'
import { isAuthenticated } from '@/lib/auth'

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { leadId, templateNumber } = body

  if (!leadId) {
    return NextResponse.json({ error: 'leadId is required' }, { status: 400 })
  }

  if (![1, 2, 3].includes(templateNumber)) {
    return NextResponse.json(
      { error: 'templateNumber must be 1, 2, or 3' },
      { status: 400 }
    )
  }

  const supabase = createAdminClient()

  // Fetch the lead
  const { data: lead, error: fetchError } = await supabase
    .from('leads')
    .select('*')
    .eq('id', leadId)
    .single()

  if (fetchError || !lead) {
    return NextResponse.json(
      { error: fetchError?.message || 'Lead not found' },
      { status: 404 }
    )
  }

  if (!lead.email) {
    return NextResponse.json(
      { error: 'Lead does not have an email address' },
      { status: 400 }
    )
  }

  // Generate email from template
  const { subject, html } = getEmailTemplate(templateNumber as 1 | 2 | 3, {
    businessName: lead.business_name,
    zone: lead.zone || 'Tenerife',
    category: lead.category,
    recipientEmail: lead.email,
    unsubscribeUrl: `https://tenerife-experiences.com/unsubscribe?email=${encodeURIComponent(lead.email)}`,
  })

  // TODO: Send email via Resend
  // const resend = new Resend(process.env.RESEND_API_KEY)
  // await resend.emails.send({
  //   from: 'Jairo <jairo@tenerife-experiences.com>',
  //   to: lead.email,
  //   subject,
  //   html,
  // })

  // Update the lead
  const isFirstContact = lead.contact_attempts === 0
  const { error: updateError } = await supabase
    .from('leads')
    .update({
      contact_attempts: (lead.contact_attempts || 0) + 1,
      last_contacted_at: new Date().toISOString(),
      ...(isFirstContact ? { status: 'contacted' } : {}),
    })
    .eq('id', leadId)

  if (updateError) {
    return NextResponse.json(
      { error: `Email generated but failed to update lead: ${updateError.message}` },
      { status: 500 }
    )
  }

  return NextResponse.json({
    success: true,
    subject,
    html,
    lead: {
      id: lead.id,
      business_name: lead.business_name,
      email: lead.email,
      status: isFirstContact ? 'contacted' : lead.status,
      contact_attempts: (lead.contact_attempts || 0) + 1,
    },
    message: 'Email generated successfully. Resend integration pending.',
  })
}
