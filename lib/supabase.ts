import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://taihjbdzrvuewsxibegz.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhaWhqYmR6cnZ1ZXdzeGliZWd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyMjQyNTcsImV4cCI6MjA2ODgwMDI1N30.IqTvVyktDwLEkq4UuHwj3Zowd4MS578mPU4QKDAu6TI";
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
