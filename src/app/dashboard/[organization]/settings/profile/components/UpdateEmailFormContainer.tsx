'use client';

import useUser from '~/core/hooks/use-user';
import UpdateEmailForm from '~/app/dashboard/[organization]/settings/profile/components/UpdateEmailForm';

function UpdateEmailFormContainer() {
  const { data: user } = useUser();

  if (!user) {
    return null;
  }

  return <UpdateEmailForm user={user} />;
}

export default UpdateEmailFormContainer;
