import { NextRequest, NextResponse } from 'next/server'
import { getStripe, GUIDE_PRODUCTS, type GuideId } from '@/lib/stripe/config'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { guideId, locale = 'es' } = body as { guideId: string; locale: string }

    // Validate guide ID
    if (!guideId || !(guideId in GUIDE_PRODUCTS)) {
      return NextResponse.json(
        { error: 'Invalid guide ID' },
        { status: 400 }
      )
    }

    const guide = GUIDE_PRODUCTS[guideId as GuideId]
    const lang = (locale in guide.name ? locale : 'en') as keyof typeof guide.name

    const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'https://tenerifeexperiences.com'

    // Map locale to Stripe-supported locale
    const stripeLocale = (['es', 'de', 'fr', 'it'].includes(locale) ? locale : 'en') as 'es' | 'de' | 'fr' | 'it' | 'en'

    // Create Stripe Checkout Session for one-time payment
    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      locale: stripeLocale,
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: guide.name[lang],
              metadata: {
                guide_id: guideId,
              },
            },
            unit_amount: guide.price,
          },
          quantity: 1,
        },
      ],
      metadata: {
        guide_id: guideId,
        locale,
      },
      success_url: `${origin}/${locale}/guias/gracias?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/${locale}/guias`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
