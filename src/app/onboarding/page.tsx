import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import OnboardingContainer from './components/OnboardingContainer';
import requireSession from '~/lib/user/require-session';
import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';
import { getUserDataById } from '~/lib/server/queries';
import configuration from '~/configuration';

export const metadata = {
  title: 'Onboarding',
};

async function OnboardingPage() {
  const { csrfToken } = await loadData();

  return (
    <OnboardingContainer csrfToken={csrfToken} />
  );
}

export default OnboardingPage;

async function loadData() {
  const client = getSupabaseServerComponentClient();
  const { user } = await requireSession(client);

  const csrfToken = headers().get('X-CSRF-Token');

  const userData = await getUserDataById(client, user.id);
  const payload = { csrfToken };

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
