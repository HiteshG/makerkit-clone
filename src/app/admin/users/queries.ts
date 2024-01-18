import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';
import { USERS_TABLE } from '~/lib/db-tables';

export async function getUsers(ids: string[]) {
  const client = getSupabaseServerComponentClient({ admin: true });

  const { data: users, error } = await client
    .from(USERS_TABLE)
    .select(
      `
      id,
      photoURL: photo_url,
      displayName: display_name,
      onboarded
    `,
    )
    .in('id', ids);

  if (error) {
    throw error;
  }

  return users;
}
