import type { SupabaseClient } from '@supabase/supabase-js';
import type UserData from '~/core/session/types/user-data';
import { USERS_TABLE } from '~/lib/db-tables';

export function updateUserData(
  client: SupabaseClient,
  { id, ...data }: WithId<Partial<UserData>>,
) {
  return client
    .from(USERS_TABLE)
    .update({
      display_name: data.displayName,
      photo_url: data.photoUrl,
    })
    .match({ id })
    .throwOnError();
}
