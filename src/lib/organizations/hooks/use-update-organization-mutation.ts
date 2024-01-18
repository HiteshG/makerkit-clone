import useSWRMutation from 'swr/mutation';
import type Organization from '~/lib/organizations/types/organization';
import useSupabase from '~/core/hooks/use-supabase';
import { updateOrganization } from '~/lib/organizations/database/mutations';
import useUserId from '~/core/hooks/use-user-id';

function useUpdateOrganizationMutation() {
  const client = useSupabase();
  const userId = useUserId();
  const key = ['organizations', userId];

  return useSWRMutation(
    key,
    (_, { arg: organization }: { arg: WithId<Partial<Organization>> }) => {
      return updateOrganization(client, {
        data: organization,
        id: organization.id,
      });
    }
  );
}

export default useUpdateOrganizationMutation;
