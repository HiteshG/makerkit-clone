import useSWR from 'swr';
import useSupabase from '~/core/hooks/use-supabase';
import { getOrganizationsByUserId } from '~/lib/organizations/database/queries';

function useUserOrganizationsQuery(userId: string) {
  const client = useSupabase();
  const key = ['organizations', userId];

  return useSWR(key, async () => {
    return getOrganizationsByUserId(client, userId).then(
      (result) => result.data
    );
  });
}

export default useUserOrganizationsQuery;
