import type { SupabaseClient } from '@supabase/supabase-js';
import { USERS_TABLE } from '~/lib/db-tables';

export function getUserById(client: SupabaseClient, userId: string) {
  return client
    .from(USERS_TABLE)
    .select(
      `
      id,
      displayName: display_name,
      photoUrl: photo_url,
      onboarded
    `,
    )
    .eq('id', userId)
    .maybeSingle();
}
