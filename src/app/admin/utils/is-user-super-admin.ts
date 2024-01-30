import { cache } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import GlobalRole from '~/core/session/types/global-role';
import { Database } from '~/database.types';
import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';

const ENFORCE_MFA = false;

const isUserSuperAdmin = cache(
  async (
    params: {
      client: SupabaseClient<Database>;
      enforceMfa?: boolean;
    } = {
      client: getSupabaseServerComponentClient(),
      enforceMfa: ENFORCE_MFA,
    },
  ) => {
    const client = params.client ?? getSupabaseServerComponentClient();
    const enforceMfa = params.enforceMfa ?? ENFORCE_MFA;

    const { data, error } = await client.auth.getUser();

    if (error) {
      return false;
    }

    if (enforceMfa) {
      const isMfaAuthenticated = await verifyIsMultiFactorAuthenticated(client);

      if (!isMfaAuthenticated) {
        return false;
      }
    }

    const adminMetadata = data.user?.app_metadata;
    const role = adminMetadata?.role;

    return role === GlobalRole.SuperAdmin;
  },
);

export default isUserSuperAdmin;

async function verifyIsMultiFactorAuthenticated(client: SupabaseClient) {
  const { data, error } =
    await client.auth.mfa.getAuthenticatorAssuranceLevel();

  if (error || !data) {
    return false;
  }

  return data.currentLevel === 'aal2';
}
