import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://smrjlckzaccstidvjzog.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtcmpsY2t6YWNjc3RpZHZqem9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5OTUxMjUsImV4cCI6MjA2MDU3MTEyNX0.I3uzNSw_GXxLfG-3anR908sNxz8j0UVeaopng-KuvHs'

export const supabase = createClient(supabaseUrl, supabaseKey)
