import 'server-only';

import { redirect } from 'next/navigation';
import configuration from '~/configuration';

import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';
import initializeServerI18n from '~/i18n/i18n.server';
import getLanguageCookie from '~/i18n/get-language-cookie';
import verifyRequiresMfa from '~/core/session/utils/check-requires-mfa';

const loadAuthPageData = async () => {
  const { language } = await initializeServerI18n(getLanguageCookie());
  const client = getSupabaseServerComponentClient();

  const {
    data: { user },
  } = await client.auth.getUser();

  const requiresMultiFactorAuthentication = await verifyRequiresMfa(client);

  if (user && !requiresMultiFactorAuthentication) {
    redirect(configuration.paths.appHome);
  }

  return {
    language,
  };
};

export default loadAuthPageData;
