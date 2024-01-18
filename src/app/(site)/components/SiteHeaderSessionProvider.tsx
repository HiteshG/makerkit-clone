'use client';

import { useState } from 'react';

import SiteHeader from '~/app/(site)/components/SiteHeader';
import UserSessionContext from '~/core/session/contexts/user-session';
import UserSession from '~/core/session/types/user-session';
import AuthChangeListener from '~/components/AuthChangeListener';

function SiteHeaderSessionProvider(
  props: React.PropsWithChildren<{
    data: Maybe<{
      auth: UserSession['auth'];
      data: UserSession['data'];
      role: UserSession['role'];
    }>;
  }>,
) {
  const [userSession, setUserSession] = useState(props.data);

  return (
    <UserSessionContext.Provider value={{ userSession, setUserSession }}>
      <AuthChangeListener accessToken={props.data?.auth?.accessToken}>
        <SiteHeader />
      </AuthChangeListener>
    </UserSessionContext.Provider>
  );
}

export default SiteHeaderSessionProvider;
