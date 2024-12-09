import { createClient } from '@supabase/supabase-js';

// In Lovable, Supabase URL and key are automatically injected when the integration is active
declare global {
  interface Window {
    env: {
      SUPABASE_URL: string;
      SUPABASE_ANON_KEY: string;
    };
  }
}

console.log('Window env object:', window.env);
console.log('Supabase URL:', window.env?.SUPABASE_URL);
console.log('Supabase Key:', window.env?.SUPABASE_ANON_KEY ? '[PRESENT]' : '[MISSING]');

const supabaseUrl = window.env?.SUPABASE_URL;
const supabaseKey = window.env?.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase connection error:', {
    hasWindowEnv: !!window.env,
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseKey
  });
  throw new Error('Missing Supabase environment variables. Make sure you have connected your Supabase project in the Lovable interface.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);