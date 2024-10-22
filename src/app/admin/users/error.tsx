'use client';

import Alert from '~/core/ui/Alert';
import { PageBody } from '~/core/ui/Page';
import Trans from '~/core/ui/Trans';
import I18nProvider from '~/i18n/I18nProvider';

function UsersAdminPageError() {
  return (
    <I18nProvider>
      <PageBody>
        <Alert type={'error'}>
          <Alert.Heading>
            <Trans i18nKey={'admin:loadUserError'} />
          </Alert.Heading>
          <p>
            <Trans i18nKey={'admin:loadUserErrorDetail'} />
          </p>
        </Alert>
      </PageBody>
    </I18nProvider>
  );
}

export default UsersAdminPageError;
