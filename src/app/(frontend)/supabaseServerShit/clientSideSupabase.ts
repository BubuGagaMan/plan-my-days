// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export async function clientSideSupabase() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}