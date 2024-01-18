'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Spinner from '~/core/ui/Spinner';
import useSupabase from '~/core/hooks/use-supabase';

function ImpersonateUserAuthSetter({
  tokens,
}: React.PropsWithChildren<{
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}>) {
  const supabase = useSupabase();
  const router = useRouter();

  useEffect(() => {
    async function setAuth() {
      await supabase.auth.setSession({
        refresh_token: tokens.refreshToken,
        access_token: tokens.accessToken,
      });

      router.push('/dashboard');
    }

    void setAuth();
  }, [router, tokens, supabase.auth]);

  return (
    <div
      className={
        'flex flex-col flex-1 h-screen w-screen items-center justify-center'
      }
    >
      <div className={'flex flex-col space-y-4 items-center'}>
        <Spinner />

        <div>
          <p>Setting up your session...</p>
        </div>
      </div>
    </div>
  );
}

export default ImpersonateUserAuthSetter;
