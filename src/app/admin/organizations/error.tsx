'use client';

import Alert from '~/core/ui/Alert';
import { PageBody } from '~/core/ui/Page';

function OrganizationsAdminPageError() {
  return (
    <PageBody>
      <Alert type={'error'}>
        <Alert.Heading>Could not load organizations</Alert.Heading>
        <p>
          There was an error loading the organizations. Please check your
          console errors.
        </p>
      </Alert>
    </PageBody>
  );
}

export default OrganizationsAdminPageError;
