// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://bhwencvmvhajmunxnpkt.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJod2VuY3Ztdmhham11bnhucGt0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczNjUzNjQsImV4cCI6MjA2Mjk0MTM2NH0.6cJwMwdYWPdO8YhnQ0Dl9ht5uZU6aq1DnrE6l-aQzVw";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);