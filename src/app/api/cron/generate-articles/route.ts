import { NextRequest, NextResponse } from 'next/server'

// Topics to rotate through for automated content generation
const ARTICLE_TOPICS = [
  // Practical guides
  'Complete guide to public transport in Tenerife: buses, trams, and getting around',
  'Best time to visit Tenerife: month by month weather guide',
  'Tenerife on a budget: how to enjoy the island without breaking the bank',
  'Ultimate packing list for a Tenerife holiday',
  'Renting a car in Tenerife: everything you need to know',
  // Experiences
  'Top 10 things to do in Tenerife for first-time visitors',
  'Best whale and dolphin watching tours in Tenerife compared',
  'Stargazing on Mount Teide: a complete guide to observing the night sky',
  'Best sunrise and sunset spots in Tenerife',
  'Hidden gems in Tenerife that most tourists miss',
  // Beaches
  'The 15 best beaches in Tenerife for every type of traveler',
  'Black sand beaches of Tenerife: why they are unique and which to visit',
  'Best snorkeling spots in Tenerife for beginners and experts',
  'Family-friendly beaches in Tenerife with calm waters and facilities',
  // Food & Drink
  'What are Guachinches? A guide to Tenerife\'s best-kept culinary secret',
  'Traditional Canarian dishes you must try in Tenerife',
  'Wine tasting in Tenerife: a guide to the island\'s volcanic wines',
  'Best restaurants in Costa Adeje for every budget',
  'Street food and local markets in Tenerife',
  // Nature & Hiking
  'Hiking in Anaga: the best trails through ancient laurel forests',
  'Mount Teide: cable car, permit, hiking routes and tips',
  'Natural pools in Tenerife: the best spots for a volcanic swim',
  'Tenerife\'s Masca Valley hike: everything you need to know',
  // Culture
  'Tenerife Carnival: the second biggest carnival in the world',
  'The Guanche people: Tenerife\'s mysterious original inhabitants',
  'La Laguna walking tour: exploring the UNESCO World Heritage city',
  'Best museums in Tenerife: from science to art',
  // Areas
  'North vs South Tenerife: which side should you stay in?',
  'Costa Adeje guide: everything to see, do, eat and experience',
  'Puerto de la Cruz: the authentic side of Tenerife tourism',
  'Los Gigantes: cliffs, whales, and the wild west coast',
]

/**
 * Cron endpoint for automated article generation.
 * Call this from Vercel Cron or an external scheduler.
 *
 * Recommended: Run 2-3 times per week to build content gradually.
 *
 * Vercel cron config (in vercel.json):
 * { "crons": [{ "path": "/api/cron/generate-articles", "schedule": "0 9 * * 1,3,5" }] }
 */
export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization')
  if (!process.env.CRON_SECRET || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Pick a random topic
  const topic = ARTICLE_TOPICS[Math.floor(Math.random() * ARTICLE_TOPICS.length)]

  // Determine category based on topic keywords
  let category_slug: string | undefined
  const topicLower = topic.toLowerCase()
  if (topicLower.includes('beach') || topicLower.includes('sand') || topicLower.includes('snorkel')) {
    category_slug = 'beaches'
  } else if (topicLower.includes('restaurant') || topicLower.includes('food') || topicLower.includes('wine') || topicLower.includes('guachinch')) {
    category_slug = 'food'
  } else if (topicLower.includes('hik') || topicLower.includes('teide') || topicLower.includes('nature') || topicLower.includes('pool')) {
    category_slug = 'nature'
  } else if (topicLower.includes('carnival') || topicLower.includes('museum') || topicLower.includes('guanche') || topicLower.includes('laguna')) {
    category_slug = 'culture'
  } else {
    category_slug = 'experiences'
  }

  try {
    // Call the generate endpoint using internal server-to-server call
    // Use CRON_SECRET instead of exposing SUPABASE_SERVICE_ROLE_KEY
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.tenerifeexperiences.com'
    const response = await fetch(`${baseUrl}/api/articles/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.CRON_SECRET}`,
      },
      body: JSON.stringify({
        topic,
        category_slug,
        tags: ['auto-generated'],
      }),
    })

    const result = await response.json()

    return NextResponse.json({
      success: true,
      topic,
      category_slug,
      result,
    })
  } catch (error) {
    console.error('Cron article generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate article' },
      { status: 500 }
    )
  }
}
