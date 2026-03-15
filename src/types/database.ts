// Database types matching Supabase schema

export type Locale = 'es' | 'en' | 'de' | 'fr' | 'ru' | 'it'

export const LOCALES: Locale[] = ['es', 'en', 'de', 'fr', 'ru', 'it']

export const LOCALE_NAMES: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
  de: 'Deutsch',
  fr: 'Français',
  ru: 'Русский',
  it: 'Italiano',
}

// Multilingual text field stored as JSON in Supabase
export type MultiLangText = Partial<Record<Locale, string>>

export interface Category {
  id: string
  slug: string
  icon: string
  image: string | null
  name: MultiLangText
  description: MultiLangText
  sort_order: number
  visible: boolean
  created_at: string
  updated_at: string
}

export interface Subcategory {
  id: string
  category_id: string
  slug: string
  name: MultiLangText
  description: MultiLangText
  short_description: MultiLangText
  image: string | null
  sort_order: number
  visible: boolean
  created_at: string
  updated_at: string
}

export interface Item {
  id: string
  subcategory_id: string
  slug: string
  name: MultiLangText
  description: MultiLangText
  short_description: MultiLangText
  image: string | null
  images: string[]
  location: MultiLangText
  area: string | null // costa-adeje, puerto-cruz, santa-cruz, etc.
  coordinates: { lat: number; lng: number } | null
  rating: number
  review_count: number
  price_from: number | null
  currency: string
  duration: string | null
  highlights: MultiLangText[]
  includes: MultiLangText[]
  // Beach-specific fields
  sand_type: MultiLangText | null
  bathing_conditions: MultiLangText | null
  accessibility: MultiLangText | null
  typical_risk: MultiLangText | null
  // Booking
  bookable: boolean
  booking_url: string | null
  affiliate_url: string | null
  // Meta
  meta_title: MultiLangText | null
  meta_description: MultiLangText | null
  visible: boolean
  featured: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface Article {
  id: string
  slug: string
  title: MultiLangText
  excerpt: MultiLangText
  content: MultiLangText
  image: string | null
  category_id: string | null
  area: string | null
  tags: string[]
  author: string
  meta_title: MultiLangText | null
  meta_description: MultiLangText | null
  published: boolean
  ai_generated: boolean
  created_at: string
  updated_at: string
  published_at: string | null
}

export interface Partner {
  id: string
  slug: string
  name: string
  type: 'restaurant' | 'hotel' | 'operator' | 'shop' | 'service'
  description: MultiLangText
  image: string | null
  logo: string | null
  area: string | null
  address: string | null
  phone: string | null
  website: string | null
  coordinates: { lat: number; lng: number } | null
  featured: boolean
  plan: 'free' | 'basic' | 'premium'
  visible: boolean
  created_at: string
  updated_at: string
}

export interface Review {
  id: string
  item_id: string | null
  partner_id: string | null
  author_name: string
  rating: number
  comment: MultiLangText
  locale: Locale
  approved: boolean
  created_at: string
}

export interface Area {
  id: string
  slug: string
  name: MultiLangText
  description: MultiLangText
  image: string | null
  region: 'north' | 'south' | 'east' | 'west' | 'central'
  coordinates: { lat: number; lng: number } | null
  created_at: string
}

export interface Lead {
  id: string
  business_name: string
  contact_name: string | null
  email: string | null
  phone: string | null
  website: string | null
  category: string | null
  subcategory: string | null
  zone: string | null
  status: string
  priority: string
  contact_attempts: number
  notes: string | null
  source: string | null
  estimated_revenue: number | null
  next_follow_up: string | null
  last_contacted_at: string | null
  created_at: string
}

export interface Contract {
  id: string
  partner_id: string | null
  lead_id: string | null
  plan: 'free' | 'basic' | 'premium' | 'premium_plus'
  price: number
  currency: string
  billing_cycle: 'monthly' | 'yearly'
  status: 'draft' | 'pending' | 'active' | 'cancelled' | 'expired'
  start_date: string | null
  end_date: string | null
  auto_renew: boolean
  stripe_subscription_id: string | null
  stripe_customer_id: string | null
  notes: string | null
  created_at: string
  updated_at: string
  // Joined fields
  partner?: Partner
  lead?: Lead
}

export interface EmailLog {
  id: string
  lead_id: string | null
  partner_id: string | null
  template_number: number | null
  subject: string | null
  body: string | null
  recipient_email: string
  recipient_name: string | null
  status: 'sent' | 'delivered' | 'opened' | 'clicked' | 'bounced' | 'failed'
  opened_at: string | null
  clicked_at: string | null
  created_at: string
  // Joined
  lead?: Lead
  partner?: Partner
}

export interface Invoice {
  id: string
  contract_id: string | null
  partner_id: string | null
  amount: number
  currency: string
  status: 'pending' | 'paid' | 'overdue' | 'cancelled'
  invoice_number: string | null
  description: string | null
  issued_at: string
  due_at: string | null
  paid_at: string | null
  stripe_invoice_id: string | null
  pdf_url: string | null
  created_at: string
  // Joined
  contract?: Contract
  partner?: Partner
}

export interface PageView {
  id: string
  page_path: string
  locale: string | null
  referrer: string | null
  user_agent: string | null
  country: string | null
  device: string | null
  partner_id: string | null
  item_id: string | null
  session_id: string | null
  created_at: string
}

export interface Subscriber {
  id: string
  email: string
  locale: string | null
  subscribed: boolean
  created_at: string
}

export interface Event {
  id: string
  slug: string
  name: MultiLangText
  description: MultiLangText
  municipality: string
  municipality_slug: string
  area_id: string | null
  event_type: string
  start_date: string | null
  end_date: string | null
  month: number | null
  image: string | null
  highlights: MultiLangText[]
  traditions: MultiLangText[]
  practical_info: MultiLangText | null
  meta_title: MultiLangText | null
  meta_description: MultiLangText | null
  visible: boolean
  featured: boolean
  created_at: string
  updated_at: string
}

// API response types
export interface PaginatedResponse<T> {
  data: T[]
  count: number
  page: number
  per_page: number
  total_pages: number
}
