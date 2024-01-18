import type { SupabaseClient } from '@supabase/supabase-js';

interface Params {
  organizationName: string;
  userId: string;
  client: SupabaseClient;
}

async function completeOnboarding({
  userId,
  organizationName,
  client,
}: Params) {
  return client
    .rpc('create_new_organization', {
      user_id: userId,
      org_name: organizationName,
    })
    .single<string>();
}

export default completeOnboarding;
