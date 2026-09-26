import { createClient } from "@supabase/supabase-js";

export const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || "https://mmpcjtmvnbybkarlbgxo.supabase.co";
export const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1tcGNqdG12bmJ5YmthcmxiZ3hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA0MjE1MzUsImV4cCI6MjEwNTk5NzUzNX0.AVym8SyclQw2ac7Vzg2EiWfZSwgdJZ0wEWsjTMsrI_Y";

const isBrowser = typeof window !== "undefined";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: isBrowser,
    autoRefreshToken: isBrowser,
    detectSessionInUrl: isBrowser,
  },
});
