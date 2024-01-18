import 'server-only';

import { redirect } from 'next/navigation';
import configuration from '~/configuration';

import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';
import verifyRequiresMfa from '~/core/session/utils/check-requires-mfa';

const loadAuthPageData = async () => {
  const client = getSupabaseServerComponentClient();

  const {
    data: { user },
  } = await client.auth.getUser();

  const requiresMultiFactorAuthentication = await verifyRequiresMfa(client);

  if (user && !requiresMultiFactorAuthentication) {
    redirect(configuration.paths.appHome);
  }

  return {};
};

export default loadAuthPageData;
