import type { SupabaseClient } from '@supabase/supabase-js';
import type { User } from '@supabase/gotrue-js';
import type { Database } from '~/database.types';

import { MEMBERSHIPS_TABLE, ORGANIZATIONS_TABLE } from '~/lib/db-tables';
import type Membership from '~/lib/organizations/types/membership';
import type MembershipRole from '~/lib/organizations/types/membership-role';
import type Organization from '~/lib/organizations/types/organization';
import type { OrganizationSubscription } from '~/lib/organizations/types/organization-subscription';
import type UserData from '~/core/session/types/user-data';

type Client = SupabaseClient<Database>;

const FETCH_ORGANIZATION_QUERY = `
  id,
  uuid,
  name,
  logoURL: logo_url,
  subscription: organizations_subscriptions (
    customerId: customer_id,
    data: subscription_id (
      status,
      currency,
      interval,
      cancelAtPeriodEnd: cancel_at_period_end,
      intervalCount: interval_count,
      priceId: price_id,
      createdAt: created_at,
      periodStartsAt: period_starts_at,
      periodEndsAt: period_ends_at,
      trialStartsAt: trial_starts_at,
      trialEndsAt: trial_ends_at
    )
  )
`;

export type UserOrganizationData = {
  role: MembershipRole;
  organization: Organization & {
    subscription?: {
      customerId: Maybe<string>;
      data: OrganizationSubscription;
    };
  };
};

export function getOrganizationsByUserId(client: Client, userId: string) {
  return client
    .from(MEMBERSHIPS_TABLE)
    .select<
      string,
      {
        role: MembershipRole;
        organization: UserOrganizationData['organization'];
        userId: string;
      }
    >(
      `
        role,
        userId: user_id,
        organization:organization_id (${FETCH_ORGANIZATION_QUERY})`,
    )
    .eq('user_id', userId)
    .throwOnError();
}

export async function getOrganizationInvitedMembers(
  client: Client,
  organizationId: number,
) {
  return client
    .from(MEMBERSHIPS_TABLE)
    .select<string, Membership>(
      `
      id,
      role,
      invitedEmail: invited_email
    `,
    )
    .eq('organization_id', organizationId)
    .not('code', 'is', null)
    .throwOnError();
}

export function getOrganizationMembers(client: Client, organizationId: number) {
  return client
    .from(MEMBERSHIPS_TABLE)
    .select<
      string,
      {
        membershipId: number;
        role: MembershipRole;
        data: UserData;
      }
    >(
      `
        membershipId: id,
        role,
        data: user_id (
          id,
          photoUrl: photo_url,
          displayName: display_name
        )
       `,
    )
    .eq('organization_id', organizationId)
    .is('code', null);
}

export function getOrganizationByUid(client: Client, uid: string) {
  return client
    .from(ORGANIZATIONS_TABLE)
    .select<string, UserOrganizationData['organization']>(
      FETCH_ORGANIZATION_QUERY,
    )
    .eq('uuid', uid)
    .throwOnError()
    .maybeSingle();
}

export function getOrganizationById(client: Client, organizationId: number) {
  return client
    .from(ORGANIZATIONS_TABLE)
    .select<string, UserOrganizationData['organization']>(
      FETCH_ORGANIZATION_QUERY,
    )
    .eq('id', organizationId)
    .throwOnError()
    .single();
}

export async function getOrganizationByCustomerId(
  client: Client,
  customerId: string,
) {
  return client
    .from(ORGANIZATIONS_TABLE)
    .select(
      `
      id,
      name,
      logoURL: logo_url,
      uuid,
      subscription: organizations_subscriptions !inner (
        customerId: customer_id
      )
      `,
    )
    .eq('organizations_subscriptions.customer_id', customerId)
    .throwOnError()
    .single();
}

export async function getMembersAuthMetadata(
  client: Client,
  userIds: string[],
) {
  const users = await Promise.all(
    userIds.map((userId) => {
      const response = client.auth.admin.getUserById(userId);

      return response
        .then((response) => {
          return response.data.user as User;
        })
        .catch((error) => {
          console.error(
            {
              userId,
            },
            `Error fetching user: ${error}`,
          );

          return undefined;
        });
    }) ?? [],
  );

  return users.filter(Boolean) as User[];
}
