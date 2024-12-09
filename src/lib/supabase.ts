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

// Wait for window.env to be populated
const getSupabaseClient = () => {
  if (!window.env) {
    console.warn('window.env is not initialized yet');
    return null;
  }

  const { SUPABASE_URL, SUPABASE_ANON_KEY } = window.env;
  
  console.log('Supabase initialization attempt:', {
    hasWindowEnv: !!window.env,
    hasUrl: !!SUPABASE_URL,
    hasKey: !!SUPABASE_ANON_KEY
  });

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('Missing Supabase credentials:', {
      url: SUPABASE_URL ? '[PRESENT]' : '[MISSING]',
      key: SUPABASE_ANON_KEY ? '[PRESENT]' : '[MISSING]'
    });
    return null;
  }

  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
};

// Initialize with retry mechanism
let retryCount = 0;
const MAX_RETRIES = 3;

const initializeSupabase = () => {
  const client = getSupabaseClient();
  
  if (!client && retryCount < MAX_RETRIES) {
    retryCount++;
    console.log(`Retrying Supabase initialization (attempt ${retryCount}/${MAX_RETRIES})...`);
    setTimeout(initializeSupabase, 1000); // Retry after 1 second
    return null;
  }
  
  if (!client) {
    throw new Error('Missing Supabase environment variables. Make sure you have connected your Supabase project in the Lovable interface.');
  }
  
  return client;
};

export const supabase = initializeSupabase();