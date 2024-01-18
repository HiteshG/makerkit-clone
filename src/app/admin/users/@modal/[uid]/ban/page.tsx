import { use } from 'react';

import BanUserModal from '../components/BanUserModal';
import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';
import AdminGuard from '~/app/admin/components/AdminGuard';

interface Params {
  params: {
    uid: string;
  };
}

function BanUserModalPage({ params }: Params) {
  const client = getSupabaseServerComponentClient({ admin: true });
  const { data, error } = use(client.auth.admin.getUserById(params.uid));

  if (!data || error) {
    throw new Error(`User not found`);
  }

  const user = data.user;
  const isBanned = 'banned_until' in user && user.banned_until !== 'none';

  if (isBanned) {
    throw new Error(`The user is already banned`);
  }

  return <BanUserModal user={user} />;
}

export default AdminGuard(BanUserModalPage);
