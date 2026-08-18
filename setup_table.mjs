async function run() {
  const url = "https://mljfswnypdqkjkfugcaa.supabase.co/rest/v1/";
  const secretKey = "sb_secret_hyDxup3hkpF0CgdjG1Kt_A_R94VPbgc";
  const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1samZzd255cGRxa2prZnVnY2FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcwNjc0MTcsImV4cCI6MjEwMjY0MzQxN30.CPj9KvmKlFndT6b3iRSlY-uiy4khZ62AGZOVDgDl1mk";

  console.log("Checking REST API root...");
  const res = await fetch(url, {
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
    },
  });
  console.log("Status:", res.status);
  const json = await res.json();
  console.log("OpenAPI definitions:", Object.keys(json.definitions || {}));
}

run();
