-- Migration: Contact messages from public contact form
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  locale text,
  ip_address text,
  user_agent text,
  status text NOT NULL DEFAULT 'new',
  read_at timestamptz,
  replied_at timestamptz,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_contact_messages_created
  ON contact_messages(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_messages_status
  ON contact_messages(status, created_at DESC);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
-- Only service role (admin) reads/writes; public inserts go through the API route.
