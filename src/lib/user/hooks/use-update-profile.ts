import useMutation from 'swr/mutation';

import type UserData from '~/core/session/types/user-data';
import { updateUserData } from '~/lib/user/database/mutations';
import useSupabase from '~/core/hooks/use-supabase';

type Payload = WithId<Partial<UserData>>;

function useUpdateProfile() {
  const client = useSupabase();
  const key = 'useUpdateProfile';

  return useMutation(key, async (_, { arg: data }: { arg: Payload }) => {
    return updateUserData(client, data);
  });
}

export default useUpdateProfile;
