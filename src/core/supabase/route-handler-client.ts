import 'server-only';

import { CookieOptions, createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { cache } from 'react';

import { Database } from '~/database.types';
import getSupabaseClientKeys from './get-supabase-client-keys';

const getSupabaseRouteHandlerClient = cache(
  (
    params = {
      admin: false,
    },
  ) => {
    const keys = getSupabaseClientKeys();

    if (params.admin) {
      const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

      if (!serviceRoleKey) {
        throw new Error('Supabase Service Role Key not provided');
      }

      return createServerClient<Database>(keys.url, serviceRoleKey, {
        auth: {
          persistSession: false,
        },
        cookies: {},
      });
    }

    return createServerClient<Database>(keys.url, keys.anonKey, {
      cookies: getCookiesStrategy(),
    });
  },
);

export default getSupabaseRouteHandlerClient;

function getCookiesStrategy() {
  const cookieStore = cookies();

  return {
    set: (name: string, value: string, options: CookieOptions) => {
      cookieStore.set({ name, value, ...options });
    },
    get: (name: string) => {
      return cookieStore.get(name)?.value;
    },
    remove: (name: string, options: CookieOptions) => {
      cookieStore.set({ name, value: '', ...options });
    },
  };
}
