import { useCallback } from 'react';
import useSupabase from '~/core/hooks/use-supabase';

function useSignOut() {
  const client = useSupabase();

  return useCallback(async () => {
    await client.auth.signOut();
  }, [client.auth]);
}

export default useSignOut;
