import useMutation from 'swr/mutation';
import useSupabase from '~/core/hooks/use-supabase';
import type { VerifyOtpParams } from '@supabase/gotrue-js';

function useVerifyOtp() {
  const client = useSupabase();

  return useMutation(
    ['verify-otp'],
    async (_, { arg }: { arg: VerifyOtpParams }) => {
      const { data, error } = await client.auth.verifyOtp(arg);

      if (error) {
        throw error;
      }

      return data;
    }
  );
}

export default useVerifyOtp;
