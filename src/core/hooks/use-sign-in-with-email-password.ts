import useMutation from 'swr/mutation';
import useSupabase from './use-supabase';

interface Credentials {
  email: string;
  password: string;
}

function useSignInWithEmailPassword() {
  const client = useSupabase();
  const key = ['auth', 'sign-in-with-email-password'];

  return useMutation(key, (_, { arg: credentials }: { arg: Credentials }) => {
    return client.auth.signInWithPassword(credentials).then((response) => {
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
  });
}

export default useSignInWithEmailPassword;
