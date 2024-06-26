import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const supabaseUrl = "https://uknsjpotpffumbnzynhc.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Key:", supabaseKey);

const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
