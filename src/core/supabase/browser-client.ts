import { createBrowserClient } from '@supabase/ssr';

import invariant from 'tiny-invariant';
import type { Database } from '~/database.types';

let client: ReturnType<typeof createBrowserClient<Database>>;

function getSupabaseBrowserClient() {
  if (client) {
    return client;
  }

  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  invariant(SUPABASE_URL, `Supabase URL was not provided`);
  invariant(SUPABASE_ANON_KEY, `Supabase Anon key was not provided`);

  client = createBrowserClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);

  return client;
}

export default getSupabaseBrowserClient;
