const config = {
  ENV: import.meta.env.MODE,
  BASE_URL: import.meta.env.VITE_BASE_URL,
  DATABASE_URL: `https://teddyfullstack.github.io/gmat-database`,
  SUPABASE_URL: `https://przvyntsigxljcvmzyos.supabase.co`,
  SUPABASE_PUBLIC_ANON_KEY: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByenZ5bnRzaWd4bGpjdm16eW9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc5MDk5NTAsImV4cCI6MTk5MzQ4NTk1MH0.SR7cteHreLMDz234A9dqOONCVzIerpDDgrflTl2jR_Q`,
  COVER_URL: `https://teddyfullstack.github.io/mini-gmat/cover.webp`,
  ICS_URL: `https://teddyfullstack.github.io/mini-gmat/gmat-time.ics`,
};

export default config;
