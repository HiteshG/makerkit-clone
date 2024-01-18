import { useMemo } from 'react';
import getSupabaseBrowserClient from '~/core/supabase/browser-client';

function useSupabase() {
  return useMemo(getSupabaseBrowserClient, []);
}

export default useSupabase;
