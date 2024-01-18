import type { SignInWithOAuthCredentials } from '@supabase/gotrue-js';
import useMutation from 'swr/mutation';
import useSupabase from '~/core/hooks/use-supabase';

function useSignInWithProvider() {
  const client = useSupabase();
  const key = ['auth', 'sign-in-with-provider'];

  return useMutation(
    key,
    async (_, { arg: credentials }: { arg: SignInWithOAuthCredentials }) => {
      return client.auth.signInWithOAuth(credentials).then((response) => {
        if (response.error) {
          throw response.error.message;
        }

        return response.data;
      });
    }
  );
}

export default useSignInWithProvider;
