'use client';

import Alert from '~/core/ui/Alert';
import { PageBody } from '~/core/ui/Page';

function UsersAdminPageError() {
  return (
    <PageBody>
      <Alert type={'error'}>
        <Alert.Heading>Could not load users</Alert.Heading>
        <p>
          There was an error loading the users. Please check your console
          errors.
        </p>
      </Alert>
    </PageBody>
  );
}

export default UsersAdminPageError;
