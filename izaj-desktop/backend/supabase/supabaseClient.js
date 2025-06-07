import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rhckwqhpnzjqfsjohvzk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJoY2t3cWhwbnpqcWZzam9odnprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxNzU2OTMsImV4cCI6MjA2Mzc1MTY5M30.eNKzXDHWEI1piuqGU4VC3Vv3VRQuY9rXPqAZ1BCWngs';
export const supabase = createClient(supabaseUrl, supabaseKey);