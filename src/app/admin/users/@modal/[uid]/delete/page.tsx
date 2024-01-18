import { use } from 'react';

import DeleteUserModal from '../components/DeleteUserModal';
import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';
import AdminGuard from '~/app/admin/components/AdminGuard';

interface Params {
  params: {
    uid: string;
  };
}

function DeleteUserModalPage({ params }: Params) {
  const client = getSupabaseServerComponentClient({ admin: true });
  const { data, error } = use(client.auth.admin.getUserById(params.uid));

  if (!data || error) {
    throw new Error(`User not found`);
  }

  return <DeleteUserModal user={data.user} />;
}

export default AdminGuard(DeleteUserModalPage);
