import { createClient } from '@supabase/supabase-js'
const sb = createClient('https://sqesgghvaazyajzjkoap.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxZXNnZ2h2YWF6eWFqemprb2FwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzUxMzgwOSwiZXhwIjoyMDg5MDg5ODA5fQ.UvbRfWU9seJPT9lyCyLmpD4uZrP9jXzsNoeSAjT9HnI')

async function main() {
  const tables = ['areas', 'categories', 'subcategories', 'items', 'articles', 'partners', 'events', 'subscribers']
  for (const t of tables) {
    const { count, error } = await sb.from(t).select('*', { count: 'exact', head: true })
    if (error) console.log(`${t}: ERROR - ${error.message}`)
    else console.log(`${t}: ${count}`)
  }
}
main()
