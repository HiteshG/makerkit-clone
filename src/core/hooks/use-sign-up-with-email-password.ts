import useSWRMutation from 'swr/mutation';
import useSupabase from './use-supabase';
import configuration from '~/configuration';

interface Credentials {
  email: string;
  password: string;
}

function useSignUpWithEmailAndPassword() {
  const client = useSupabase();
  const key = ['auth', 'sign-up-with-email-password'];

  return useSWRMutation(
    key,
    (_, { arg: credentials }: { arg: Credentials }) => {
      const emailRedirectTo = getRedirectUrl();

      return client.auth
        .signUp({
          ...credentials,
          options: {
            emailRedirectTo,
          },
        })
        .then((response) => {
          if (response.error) {
            throw response.error.message;
          }

          const user = response.data?.user;
          const identities = user?.identities ?? [];

          if (identities.length === 0) {
            throw new Error('User already registered');
          }

          return response.data;
        });
    },
  );
}

export default useSignUpWithEmailAndPassword;

function getRedirectUrl() {
  const nextPath = configuration.paths.onboarding;
  const callbackPath = configuration.paths.authCallback;
  const fullPath = `${callbackPath}?next=${nextPath}`;

  return new URL(fullPath, window.location.origin).href;
}
