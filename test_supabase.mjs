import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://mljfswnypdqkjkfugcaa.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1samZzd255cGRxa2prZnVnY2FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcwNjc0MTcsImV4cCI6MjEwMjY0MzQxN30.CPj9KvmKlFndT6b3iRSlY-uiy4khZ62AGZOVDgDl1mk";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function run() {
  console.log("Testing Supabase connection...");
  const { data, error } = await supabase.from("sign_ins").select("*");
  if (error) {
    console.error("Error querying sign_ins table:", error.message, error.details, error.code);
  } else {
    console.log("Successfully queried sign_ins table. Row count:", data.length);
  }
}

run();
