import type { SupabaseClient } from '@supabase/supabase-js';

const ASSURANCE_LEVEL_2 = 'aal2';

async function checkSessionRequiresMultiFactorAuthentication(
  client: SupabaseClient
) {
  const assuranceLevel = await client.auth.mfa.getAuthenticatorAssuranceLevel();

  if (assuranceLevel.error) {
    throw new Error(assuranceLevel.error.message);
  }

  const { nextLevel, currentLevel } = assuranceLevel.data;

  return nextLevel === ASSURANCE_LEVEL_2 && nextLevel !== currentLevel;
}

export default checkSessionRequiresMultiFactorAuthentication;
