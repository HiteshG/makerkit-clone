import type { SupabaseClient } from '@supabase/supabase-js';
import { nanoid } from 'nanoid';

import { MEMBERSHIPS_TABLE } from '~/lib/db-tables';
import type Membership from '~/lib/organizations/types/membership';
import type { Database } from '../../database.types';
import MembershipRole from '~/lib/organizations/types/membership-role';

type Client = SupabaseClient<Database>;

export async function acceptInviteToOrganization(
  client: Client,
  params: {
    code: string;
    userId: string;
  },
) {
  return client
    .rpc('accept_invite_to_organization', {
      invite_user_id: params.userId,
      invite_code: params.code,
    })
    .single();
}

export async function createOrganizationMembership(
  adminClient: Client,
  membership: Partial<Membership>,
) {
  const code = nanoid(36);

  if (membership.role === MembershipRole.Owner) {
    throw new Error('Cannot create an owner membership');
  }

  return getMembershipsTable(adminClient)
    .insert({
      role: membership.role,
      organization_id: membership.organizationId,
      invited_email: membership.invitedEmail,
      code,
    })
    .select('id, code')
    .throwOnError()
    .single();
}

export async function updateMembershipById(
  client: Client,
  membership: Partial<Membership> & { id: number },
) {
  const { id, ...params } = membership;

  return getMembershipsTable(client)
    .update(params)
    .match({ id })
    .throwOnError();
}

export async function deleteMembershipById(
  client: Client,
  membershipId: number,
) {
  return client
    .from(MEMBERSHIPS_TABLE)
    .delete()
    .eq('id', membershipId)
    .throwOnError();
}

export async function transferOwnership(
  client: Client,
  params: {
    organizationId: number;
    targetUserMembershipId: number;
  },
) {
  return client.rpc('transfer_organization', {
    org_id: params.organizationId,
    target_user_membership_id: params.targetUserMembershipId,
  });
}

function getMembershipsTable(client: SupabaseClient) {
  return client.from(MEMBERSHIPS_TABLE);
}
