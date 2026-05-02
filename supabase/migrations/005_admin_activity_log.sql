-- Migration: Admin activity log
-- Records every write action in the admin panel + login/logout + 403 forbidden attempts
-- Read-only for the application (writes go through service role)

CREATE TABLE IF NOT EXISTS admin_activity_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES admin_users(id) ON DELETE SET NULL,
  user_name text,
  user_role text,
  action text NOT NULL,
  entity_type text NOT NULL,
  entity_id text,
  entity_label text,
  changes jsonb,
  ip_address text,
  user_agent text,
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_activity_user_created
  ON admin_activity_log(user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_activity_entity
  ON admin_activity_log(entity_type, entity_id);

CREATE INDEX IF NOT EXISTS idx_activity_action_created
  ON admin_activity_log(action, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_activity_created
  ON admin_activity_log(created_at DESC);

ALTER TABLE admin_activity_log ENABLE ROW LEVEL SECURITY;

-- No public policies — only service role (which bypasses RLS) can read/write.
-- The admin API uses createAdminClient() with the service role key.
