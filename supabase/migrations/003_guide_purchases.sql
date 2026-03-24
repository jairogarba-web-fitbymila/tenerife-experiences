-- Guide purchases table for Stripe digital product sales
-- Run this migration in the Supabase SQL Editor

CREATE TABLE IF NOT EXISTS guide_purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  guide_id TEXT NOT NULL,
  locale TEXT DEFAULT 'es',
  stripe_session_id TEXT UNIQUE,
  stripe_payment_intent TEXT,
  amount_total INTEGER, -- in cents
  currency TEXT DEFAULT 'eur',
  status TEXT DEFAULT 'completed',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast lookups by email
CREATE INDEX IF NOT EXISTS idx_guide_purchases_email ON guide_purchases(email);

-- Index for Stripe session deduplication
CREATE INDEX IF NOT EXISTS idx_guide_purchases_stripe_session ON guide_purchases(stripe_session_id);

-- RLS: only service role can insert (from webhook)
ALTER TABLE guide_purchases ENABLE ROW LEVEL SECURITY;

-- No public access - only server-side via service_role key
CREATE POLICY "Service role full access" ON guide_purchases
  FOR ALL USING (auth.role() = 'service_role');
