import 'server-only';

import { getUserDataById } from '~/lib/server/queries';
import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';
import initializeServerI18n from '~/i18n/i18n.server';
import getLanguageCookie from '~/i18n/get-language-cookie';

async function loadUserData() {
  const client = getSupabaseServerComponentClient();

  try {
    const { data, error } = await client.auth.getSession();

    if (!data.session || error) {
      return emptyUserData();
    }

    const session = data.session;
    const userId = session.user.id;

    const userData = await getUserDataById(client, userId);
    const language = await getLanguage();

    return {
      session: {
        auth: {
          accessToken: session.access_token,
          user: {
            id: session.user.id,
            email: session.user.email,
            phone: session.user.phone,
          },
        },
        data: userData || undefined,
        role: undefined,
      },
      language,
    };
  } catch (e) {
    return emptyUserData();
  }
}

async function emptyUserData() {
  const language = await getLanguage();

  return {
    accessToken: undefined,
    language,
    session: undefined,
  };
}

export default loadUserData;

async function getLanguage() {
  const { language } = await initializeServerI18n(getLanguageCookie());

  return language;
}
