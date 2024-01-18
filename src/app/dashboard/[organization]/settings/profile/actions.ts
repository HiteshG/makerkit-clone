'use server';

import getSupabaseServerActionClient from '~/core/supabase/action-client';

/**
 * Refreshes the user session on the server when updating the user profile.
 */
export async function refreshSessionAction() {
  const supabase = getSupabaseServerActionClient();

  await supabase.auth.refreshSession();
}
