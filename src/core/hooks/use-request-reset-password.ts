import useSWRMutation from 'swr/mutation';
import useSupabase from '~/core/hooks/use-supabase';

interface Params {
  email: string;
  redirectTo: string;
}

function useRequestResetPassword() {
  const client = useSupabase();
  const key = ['auth', 'reset-password'];

  return useSWRMutation(key, (_, { arg: params }: { arg: Params }) => {
    return client.auth
      .resetPasswordForEmail(params.email, {
        redirectTo: params.redirectTo,
      })
      .then((result) => {
        if (result.error) {
          throw result.error;
        }

        return result.data;
      });
  });
}

export default useRequestResetPassword;
