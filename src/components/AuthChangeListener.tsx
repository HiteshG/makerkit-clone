'use client';

import { useCallback, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import isBrowser from '~/core/generic/is-browser';
import useSupabase from '~/core/hooks/use-supabase';
import UserSessionContext from '~/core/session/contexts/user-session';

const AuthRedirectListener: React.FCC<{
  whenSignedOut?: string;
  accessToken: Maybe<string>;
}> = ({ children, whenSignedOut, accessToken }) => {
  const client = useSupabase();
  const router = useRouter();
  const redirectUserAway = useRedirectUserAway();
  const { setUserSession } = useContext(UserSessionContext);

  useEffect(() => {
    // keep this running for the whole session
    // unless the component was unmounted, for example, on log-outs
    const listener = client.auth.onAuthStateChange((state, user) => {
      // log user out if user is falsy
      // and if the consumer provided a route to redirect the user
      const shouldLogOut = !user && whenSignedOut;

      if (shouldLogOut) {
        return redirectUserAway(whenSignedOut);
      }

      const isOutOfSync = user?.access_token !== accessToken;

      // server and client are out of sync.
      // We need to recall active loaders after actions complete
      if (isOutOfSync) {
        void router.refresh();
      } else {
        if (!user) {
          setUserSession(undefined);
        }
      }
    });

    // destroy listener on un-mounts
    return () => listener.data.subscription.unsubscribe();
  }, [
    client.auth,
    redirectUserAway,
    router,
    accessToken,
    whenSignedOut,
    setUserSession,
  ]);

  return <>{children}</>;
};

export default function AuthChangeListener({
  children,
  whenSignedOut,
  accessToken,
}: React.PropsWithChildren<{
  whenSignedOut?: string;
  accessToken: Maybe<string>;
}>) {
  const shouldActivateListener = isBrowser();

  // we only activate the listener if
  // we are rendering in the browser
  if (!shouldActivateListener) {
    return <>{children}</>;
  }

  return (
    <AuthRedirectListener
      accessToken={accessToken}
      whenSignedOut={whenSignedOut}
    >
      {children}
    </AuthRedirectListener>
  );
}

function useRedirectUserAway() {
  return useCallback((path: string) => {
    const currentPath = window.location.pathname;
    const isNotCurrentPage = currentPath !== path;

    // we then redirect the user to the page
    // specified in the props of the component
    if (isNotCurrentPage) {
      window.location.assign(path);
    }
  }, []);
}
