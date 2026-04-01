import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createAdminClient } from '@/lib/supabase/admin'
import { slugify } from '@/lib/helpers'

const anthropic = new Anthropic()

const LOCALES = ['en', 'es', 'de', 'fr', 'ru', 'it'] as const

interface ArticleRequest {
  topic: string
  category_slug?: string
  area_slug?: string
  tags?: string[]
  author_name?: string
  author_bio?: string
  author_tone?: string
  search_context?: string
}

export async function POST(request: NextRequest) {
  // Verify API key for security (accepts CRON_SECRET or SUPABASE_SERVICE_ROLE_KEY)
  const authHeader = request.headers.get('authorization')
  const token = authHeader?.replace('Bearer ', '')
  const isAuthorized = process.env.CRON_SECRET && token === process.env.CRON_SECRET
  if (!isAuthorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body: ArticleRequest = await request.json()
  const { topic, category_slug, area_slug, tags = [], author_name, author_bio, author_tone, search_context } = body

  if (!topic) {
    return NextResponse.json({ error: 'Topic is required' }, { status: 400 })
  }

  try {
    // Generate article content in all languages
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 8000,
      messages: [
        {
          role: 'user',
          content: `You are a professional travel writer creating content for tenerifeexperiences.com, a premium tourism website about Tenerife, Canary Islands.
${author_name ? `\nYou are writing as ${author_name}: ${author_bio}\nYour tone: ${author_tone}\n` : ''}
Write a comprehensive, SEO-optimized article about: "${topic}"
${search_context ? `\n---\nUSE THIS REAL, CURRENT INFORMATION FROM GOOGLE TO GROUND YOUR ARTICLE:\n${search_context}\n\nIMPORTANT: Base your specific facts, prices, places and recommendations on the above search results. Do not invent details. If the search results mention specific venues, prices or times, use them. Cite real sources naturally within the text.\n---\n` : ''}
The article should:
- Be genuinely helpful and informative for tourists
- Include practical tips, best times to visit, prices where relevant
- Have a natural, engaging writing style (not AI-sounding)
- Be 800-1200 words in the main language
- Include local knowledge that shows expertise

Respond in this exact JSON format:
{
  "slug": "url-friendly-slug",
  "title": { "en": "...", "es": "...", "de": "...", "fr": "...", "ru": "...", "it": "..." },
  "excerpt": { "en": "2-3 sentence summary", "es": "...", "de": "...", "fr": "...", "ru": "...", "it": "..." },
  "content": { "en": "Full article in markdown format...", "es": "...", "de": "...", "fr": "...", "ru": "...", "it": "..." },
  "meta_title": { "en": "SEO title (max 60 chars)", "es": "...", "de": "...", "fr": "...", "ru": "...", "it": "..." },
  "meta_description": { "en": "SEO description (max 155 chars)", "es": "...", "de": "...", "fr": "...", "ru": "...", "it": "..." },
  "tags": ["tag1", "tag2", "tag3"]
}

IMPORTANT:
- Each language should be a COMPLETE translation, not just a machine-translated version
- Adapt cultural references and phrasing for each target audience
- Return ONLY valid JSON, no extra text`,
        },
      ],
    })

    const textContent = message.content.find((c) => c.type === 'text')
    if (!textContent || textContent.type !== 'text') {
      throw new Error('No text content in response')
    }

    const articleData = JSON.parse(textContent.text)

    // Store in Supabase
    const supabase = createAdminClient()

    // Find category and area IDs if provided
    let category_id = null
    let area_id = null

    if (category_slug) {
      const { data: cat } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', category_slug)
        .single()
      category_id = cat?.id || null
    }

    if (area_slug) {
      const { data: area } = await supabase
        .from('areas')
        .select('id')
        .eq('slug', area_slug)
        .single()
      area_id = area?.id || null
    }

    const { data: article, error } = await supabase
      .from('articles')
      .insert({
        slug: articleData.slug || slugify(articleData.title.en),
        title: articleData.title,
        excerpt: articleData.excerpt,
        content: articleData.content,
        meta_title: articleData.meta_title,
        meta_description: articleData.meta_description,
        tags: [...(articleData.tags || []), ...tags],
        category_id,
        area_id,
        author: author_name || 'Tenerife Experiences',
        ai_generated: true,
        published: false, // Always draft first, publish manually
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({
      success: true,
      article,
      message: 'Article generated and saved as draft',
    })
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error)
    console.error('Article generation error:', errMsg)
    return NextResponse.json(
      { error: 'Failed to generate article', detail: errMsg },
      { status: 500 }
    )
  }
}
