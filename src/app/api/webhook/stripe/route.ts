import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe/config'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Handle checkout.session.completed
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object

    const guideId = session.metadata?.guide_id
    const locale = session.metadata?.locale || 'es'
    const customerEmail = session.customer_details?.email

    if (guideId && customerEmail) {
      try {
        const supabase = createAdminClient()

        // Record the purchase in a guide_purchases table
        await supabase.from('guide_purchases').insert({
          email: customerEmail.toLowerCase().trim(),
          guide_id: guideId,
          locale,
          stripe_session_id: session.id,
          stripe_payment_intent: session.payment_intent as string,
          amount_total: session.amount_total,
          currency: session.currency,
          status: 'completed',
        })

        // TODO: Send download email with PDF link via Resend/Sendgrid
        console.log(`Purchase completed: ${guideId} for ${customerEmail}`)
      } catch (dbError) {
        console.error('Database error recording purchase:', dbError)
      }
    }
  }

  return NextResponse.json({ received: true })
}
