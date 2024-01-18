import useMutation from 'swr/mutation';

import type {
  AuthError,
  SignInWithPasswordlessCredentials,
} from '@supabase/gotrue-js';

import useSupabase from '~/core/hooks/use-supabase';
import configuration from '~/configuration';

function useSignInWithOtp() {
  const client = useSupabase();
  const key = ['auth', 'sign-in-with-otp'];

  return useMutation(
    key,
    async (
      _,
      {
        arg: credentials,
      }: {
        arg: SignInWithPasswordlessCredentials;
      },
    ) => {
      const result = await client.auth.signInWithOtp(credentials);

      if (result.error) {
        if (shouldIgnoreError(result.error)) {
          console.warn(
            `Ignoring error during development: ${result.error.message}`,
          );

          return {} as never;
        }

        throw result.error.message;
      }

      return result.data;
    },
  );
}

export default useSignInWithOtp;

function shouldIgnoreError(error: AuthError) {
  return !configuration.production && isSmsProviderNotSetupError(error);
}

function isSmsProviderNotSetupError(error: AuthError) {
  return (
    error.message === `Error sending sms: sms Provider  could not be found`
  );
}
