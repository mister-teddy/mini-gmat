import { createClient } from "https://deno.land/x/supabase/mod.ts";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  detectSessionInUrl: false,
  persistSession: false,
  schema: "gmat",
});
