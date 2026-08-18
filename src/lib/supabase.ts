import { createClient } from "@supabase/supabase-js";

export const SUPABASE_URL = "https://mljfswnypdqkjkfugcaa.supabase.co";
export const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1samZzd255cGRxa2prZnVnY2FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcwNjc0MTcsImV4cCI6MjEwMjY0MzQxN30.CPj9KvmKlFndT6b3iRSlY-uiy4khZ62AGZOVDgDl1mk";
export const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_kj-RIIwv8LBGNnJ_mtyG9Q_tR1X6jMb";
export const SUPABASE_SECRET_KEY = "sb_secret_hyDxup3hkpF0CgdjG1Kt_A_R94VPbgc";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
