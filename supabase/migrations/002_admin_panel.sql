-- Migration: Admin Panel Complete
-- New tables: contracts, email_log, invoices, page_views

-- ============================================
-- CONTRACTS (partner subscriptions)
-- ============================================
CREATE TABLE IF NOT EXISTS contracts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id uuid REFERENCES partners(id) ON DELETE SET NULL,
  lead_id uuid REFERENCES leads(id) ON DELETE SET NULL,
  plan text NOT NULL DEFAULT 'free', -- free/basic/premium/premium_plus
  price numeric(10,2) DEFAULT 0,
  currency text DEFAULT 'EUR',
  billing_cycle text DEFAULT 'monthly', -- monthly/yearly
  status text DEFAULT 'draft', -- draft/pending/active/cancelled/expired
  start_date date,
  end_date date,
  auto_renew boolean DEFAULT true,
  stripe_subscription_id text,
  stripe_customer_id text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ============================================
-- EMAIL LOG (sent emails tracking)
-- ============================================
CREATE TABLE IF NOT EXISTS email_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid REFERENCES leads(id) ON DELETE SET NULL,
  partner_id uuid REFERENCES partners(id) ON DELETE SET NULL,
  template_number int,
  subject text,
  body text,
  recipient_email text NOT NULL,
  recipient_name text,
  status text DEFAULT 'sent', -- sent/delivered/opened/clicked/bounced/failed
  opened_at timestamptz,
  clicked_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- ============================================
-- INVOICES (billing)
-- ============================================
CREATE TABLE IF NOT EXISTS invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_id uuid REFERENCES contracts(id) ON DELETE SET NULL,
  partner_id uuid REFERENCES partners(id) ON DELETE SET NULL,
  amount numeric(10,2) NOT NULL DEFAULT 0,
  currency text DEFAULT 'EUR',
  status text DEFAULT 'pending', -- pending/paid/overdue/cancelled
  invoice_number text UNIQUE,
  description text,
  issued_at date DEFAULT CURRENT_DATE,
  due_at date,
  paid_at date,
  stripe_invoice_id text,
  pdf_url text,
  created_at timestamptz DEFAULT now()
);

-- ============================================
-- PAGE VIEWS (analytics tracking)
-- ============================================
CREATE TABLE IF NOT EXISTS page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path text NOT NULL,
  locale text,
  referrer text,
  user_agent text,
  country text,
  device text, -- mobile/desktop/tablet
  partner_id uuid REFERENCES partners(id) ON DELETE SET NULL,
  item_id uuid REFERENCES items(id) ON DELETE SET NULL,
  session_id text,
  created_at timestamptz DEFAULT now()
);

-- Index for analytics queries
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at);
CREATE INDEX IF NOT EXISTS idx_page_views_page_path ON page_views(page_path);
CREATE INDEX IF NOT EXISTS idx_page_views_session_id ON page_views(session_id);

-- Index for contracts
CREATE INDEX IF NOT EXISTS idx_contracts_partner_id ON contracts(partner_id);
CREATE INDEX IF NOT EXISTS idx_contracts_status ON contracts(status);

-- Index for email_log
CREATE INDEX IF NOT EXISTS idx_email_log_lead_id ON email_log(lead_id);
CREATE INDEX IF NOT EXISTS idx_email_log_created_at ON email_log(created_at);

-- Index for invoices
CREATE INDEX IF NOT EXISTS idx_invoices_contract_id ON invoices(contract_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);

-- Add estimated_revenue and next_follow_up to leads (CRM enhancement)
ALTER TABLE leads ADD COLUMN IF NOT EXISTS estimated_revenue numeric(10,2);
ALTER TABLE leads ADD COLUMN IF NOT EXISTS next_follow_up date;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS subcategory text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS source text DEFAULT 'manual';

-- RLS policies
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Allow service role full access
CREATE POLICY "Service role full access on contracts" ON contracts FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access on email_log" ON email_log FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access on invoices" ON invoices FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access on page_views" ON page_views FOR ALL USING (true) WITH CHECK (true);

-- Allow anonymous inserts on page_views (for tracking)
CREATE POLICY "Anonymous insert on page_views" ON page_views FOR INSERT WITH CHECK (true);
