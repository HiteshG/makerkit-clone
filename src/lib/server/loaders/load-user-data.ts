import 'server-only';

import { getUserDataById } from '~/lib/server/queries';
import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';

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
    };
  } catch (e) {
    return emptyUserData();
  }
}

async function emptyUserData() {
  return {
    accessToken: undefined,
    session: undefined,
  };
}

export default loadUserData;
