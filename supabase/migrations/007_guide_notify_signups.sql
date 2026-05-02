-- Migration: Notify-me signups for upcoming PDF guides
CREATE TABLE IF NOT EXISTS guide_notify_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guide_id text NOT NULL,
  email text NOT NULL,
  locale text,
  ip_address text,
  user_agent text,
  notified_at timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE (guide_id, email)
);

CREATE INDEX IF NOT EXISTS idx_guide_notify_guide
  ON guide_notify_signups(guide_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_guide_notify_email
  ON guide_notify_signups(email);

ALTER TABLE guide_notify_signups ENABLE ROW LEVEL SECURITY;
-- Only service role accesses; public inserts go through API route.
