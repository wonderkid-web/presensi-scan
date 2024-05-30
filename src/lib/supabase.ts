// lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseRoleKey = process.env.NEXT_PUBLIC_SUPABASE_ROLE_KEY!;
// export const supabase = createClient(supabaseUrl, supabaseKey);

export const supabase = createClient(supabaseUrl, supabaseRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})
