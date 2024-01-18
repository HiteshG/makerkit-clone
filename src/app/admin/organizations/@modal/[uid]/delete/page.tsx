import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';
import AdminGuard from '~/app/admin/components/AdminGuard';
import { getOrganizationByUid } from '~/lib/organizations/database/queries';
import DeleteOrganizationModal from '../components/DeleteOrganizationModal';

interface Params {
  params: {
    uid: string;
  };
}

async function DeleteOrganizationModalPage({ params }: Params) {
  const client = getSupabaseServerComponentClient({ admin: true });
  const { data, error } = await getOrganizationByUid(client, params.uid);

  if (!data || error) {
    throw new Error(`Organization not found`);
  }

  return <DeleteOrganizationModal organization={data} />;
}

export default AdminGuard(DeleteOrganizationModalPage);
