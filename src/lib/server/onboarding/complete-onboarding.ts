import type { SupabaseClient } from '@supabase/supabase-js';

interface Params {
  organizationName: string;
  userId: string;
  source: string;
  client: SupabaseClient;
}

async function completeOnboarding({
  userId,
  source,
  organizationName,
  client,
}: Params) {
  return client
    .rpc('create_new_organization', {
      user_id: userId,
      org_name: organizationName,
      create_user: true,
      ref_src: source,
    })
    .single<string>();
}

export default completeOnboarding;
