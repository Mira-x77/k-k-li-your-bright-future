import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://mljfswnypdqkjkfugcaa.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1samZzd255cGRxa2prZnVnY2FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcwNjc0MTcsImV4cCI6MjEwMjY0MzQxN30.CPj9KvmKlFndT6b3iRSlY-uiy4khZ62AGZOVDgDl1mk";
const SUPABASE_SECRET_KEY = "sb_secret_hyDxup3hkpF0CgdjG1Kt_A_R94VPbgc";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function setup() {
  console.log("Checking Supabase connection...");
  
  // Try inserting into sign_ins to see if table exists
  const { data, error } = await supabase.from("sign_ins").select("count");
  console.log("Select result:", { data, error });
}

setup();
