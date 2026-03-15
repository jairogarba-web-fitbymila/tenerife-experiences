import { NextRequest, NextResponse } from 'next/server'

// Placeholder - replace with real Stripe price IDs
const PLANS = {
  basic: { price: 5900, name: 'Partner Verificado' },
  premium: { price: 14900, name: 'Partner Premium' },
  premium_plus: { price: 29900, name: 'Partner Premium Plus' },
}

export async function POST(request: NextRequest) {
  const { plan, email } = await request.json()

  const selectedPlan = PLANS[plan as keyof typeof PLANS]

  if (!selectedPlan) {
    return NextResponse.json(
      { error: 'Invalid plan selected' },
      { status: 400 }
    )
  }

  // For now, return a message that Stripe is being configured
  // When Stripe is ready, this will create a real checkout session
  return NextResponse.json({
    message: 'Stripe checkout coming soon. Contact us at info@tenerifeexperiences.com',
    plan: selectedPlan,
    email: email || null,
  })
}
