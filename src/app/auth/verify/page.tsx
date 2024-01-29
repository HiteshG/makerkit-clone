import { redirect } from 'next/navigation';

import verifyRequiresMfa from '~/core/session/utils/check-requires-mfa';
import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';
import VerifyFormContainer from './components/VerifyFormContainer';

import getLanguageCookie from '~/i18n/get-language-cookie';
import initializeServerI18n from '~/i18n/i18n.server';
import I18nProvider from '~/i18n/I18nProvider';
import { withI18n } from '~/i18n/with-i18n';

import configuration from '~/configuration';

export const metadata = {
  title: 'Verify Authentication',
};

async function VerifyPage() {
  const client = getSupabaseServerComponentClient();
  const needsMfa = await verifyRequiresMfa(client);

  if (!needsMfa) {
    redirect(configuration.paths.signIn);
  }

  const { language } = await initializeServerI18n(getLanguageCookie());

  return (
    <I18nProvider lang={language}>
      <VerifyFormContainer />
    </I18nProvider>
  );
}

export default withI18n(VerifyPage);
