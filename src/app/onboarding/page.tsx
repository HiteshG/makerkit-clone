import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import OnboardingContainer from './components/OnboardingContainer';
import requireSession from '~/lib/user/require-session';
import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';
import { getUserDataById } from '~/lib/server/queries';
import { withI18n } from '~/i18n/with-i18n';
import configuration from '~/configuration';
import I18nProvider from '~/i18n/I18nProvider';
import getLanguageCookie from '~/i18n/get-language-cookie';
import initializeServerI18n from '~/i18n/i18n.server';

export const metadata = {
  title: 'Onboarding',
};

async function OnboardingPage() {
  const { csrfToken, language } = await loadData();

  return (
    <I18nProvider lang={language}>
      <OnboardingContainer csrfToken={csrfToken} />
    </I18nProvider>
  );
}

export default withI18n(OnboardingPage);

async function loadData() {
  const client = getSupabaseServerComponentClient();
  const { user } = await requireSession(client);

  const csrfToken = headers().get('X-CSRF-Token');
  const { language } = await initializeServerI18n(getLanguageCookie());

  const userData = await getUserDataById(client, user.id);
  const payload = { csrfToken, language };

  // if we cannot find the user's Database record
  // the user should go to the onboarding flow
  // so that the record wil be created after the end of the flow
  if (!userData) {
    return payload;
  }

  // if the user has already been onboarded
  // we redirect the user to the app home page
  if (userData.onboarded) {
    redirect(configuration.paths.appHome);
  }

  return payload;
}
