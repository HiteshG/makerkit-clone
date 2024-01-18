import 'server-only';

import { cache } from 'react';

import { getOrganizationByUid } from '~/lib/organizations/database/queries';
import { getUserMembershipByOrganization } from '~/lib/memberships/queries';
import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';

export default async function getCurrentOrganization(params: {
  organizationUid: string;
  userId: string;
}) {
  const { userId, organizationUid } = params;
  const { data, error } = await fetchOrganization(organizationUid);

  if (error) {
    throw error;
  }

  const organization = data || undefined;
  const role = await fetchUserRole(organizationUid, userId);

  return {
    organization,
    role,
  };
}

const fetchOrganization = cache(async (uid: string) => {
  const client = getSupabaseServerComponentClient();

  return getOrganizationByUid(client, uid);
});


const fetchUserRole = cache(async (organizationUid: string, userId: string) => {
  const client = getSupabaseServerComponentClient();

  const data = await getUserMembershipByOrganization(client, {
    organizationUid,
    userId,
  });

  return data?.role;
});
