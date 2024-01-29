import 'server-only';

import { cache } from 'react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import {
  isRedirectError,
  getURLFromRedirectError,
} from 'next/dist/client/components/redirect';

import getCurrentOrganization from '~/lib/server/organizations/get-current-organization';

import getUIStateCookies from '~/lib/server/loaders/utils/get-ui-state-cookies';
import { getUserDataById } from '../queries';

import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';
import requireSession from '~/lib/user/require-session';
import getLogger from '~/core/logger';

import configuration from '~/configuration';
import initializeServerI18n from '~/i18n/i18n.server';
import getLanguageCookie from '~/i18n/get-language-cookie';

const loadAppData = cache(async (organizationUid: string) => {
  try {
    const client = getSupabaseServerComponentClient();
    const session = await requireSession(client);

    const user = session.user;
    const userId = user.id;

    const [userRecord, organizationData] = await Promise.all([
      getUserDataById(client, userId),
      getCurrentOrganization({ organizationUid, userId }),
    ]);

    const isOnboarded = Boolean(userRecord?.onboarded);

    if (!isOnboarded || !userRecord) {
      return redirectToOnboarding();
    }

    if (!organizationData) {
      return redirect(configuration.paths.appHome);
    }

    const csrfToken = getCsrfToken();

    const { language } = await initializeServerI18n(getLanguageCookie());

    return {
      language,
      csrfToken,
      auth: {
        accessToken: session.access_token,
        user: {
          id: user.id,
          email: user.email,
          phone: user.phone,
        },
      },
      user: userRecord,
      organization: organizationData?.organization,
      role: organizationData?.role,
      ui: getUIStateCookies(),
    };
  } catch (error) {
    const logger = getLogger();

    if (isRedirectError(error)) {
      const url = getURLFromRedirectError(error);

      return redirect(url);
    }

    logger.warn(
      {
        error: JSON.stringify(error),
      },
      `Could not load application data`,
    );

    return redirectToHomePage();
  }
});

function redirectToOnboarding() {
  return redirect(configuration.paths.onboarding);
}

function redirectToHomePage() {
  return redirect('/');
}

function getCsrfToken() {
  return headers().get('X-CSRF-Token');
}

export default loadAppData;
