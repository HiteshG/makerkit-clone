import { use } from 'react';

import { redirect } from 'next/navigation';
import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';
import AdminGuard from '~/app/admin/components/AdminGuard';

import ReactivateUserModal from '~/app/admin/users/@modal/[uid]/components/ReactivateUserModal';

interface Params {
  params: {
    uid: string;
  };
}

function ReactivateUserModalPage({ params }: Params) {
  const client = getSupabaseServerComponentClient({ admin: true });
  const { data, error } = use(client.auth.admin.getUserById(params.uid));

  if (!data || error) {
    throw new Error(`User not found`);
  }

  const user = data.user;
  const isActive = !('banned_until' in user) || user.banned_until === 'none';

  if (isActive) {
    redirect(`/admin/users`);
  }

  return <ReactivateUserModal user={user} />;
}

export default AdminGuard(ReactivateUserModalPage);
