import { SupabaseClient } from '@supabase/supabase-js';

import { MEMBERSHIPS_TABLE, ORGANIZATIONS_TABLE } from '~/lib/db-tables';
import { UserOrganizationData } from '~/lib/organizations/database/queries';
import MembershipRole from '~/lib/organizations/types/membership-role';
import { Database } from '~/database.types';

type Client = SupabaseClient<Database>;

export async function getOrganizations(
  client: Client,
  search: string,
  page = 1,
  perPage = 20,
) {
  const startOffset = (page - 1) * perPage;
  const endOffset = startOffset - 1 + perPage;

  let query = client.from(ORGANIZATIONS_TABLE).select<
    string,
    UserOrganizationData['organization'] & {
      memberships: Array<{
        userId: string;
        role: MembershipRole;
        code: string;
      }>;
    }
  >(
    `
      id,
      uuid,
      name,
      logoURL: logo_url,
      memberships (
        userId: user_id,
        role,
        code
      ),
      subscription: organizations_subscriptions (
        customerId: customer_id,
        data: subscription_id (
          id,
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
      )`,
    {
      count: 'exact',
    },
  );

  if (search) {
    query = query.ilike('name', `%${search}%`);
  }

  console.log({ startOffset, endOffset });

  const {
    data: organizations,
    count,
    error,
  } = await query.range(startOffset, endOffset);

  if (error) {
    throw error;
  }

  return {
    organizations,
    count,
  };
}

export async function getMembershipsByOrganizationUid(
  client: Client,
  params: {
    uid: string;
    page: number;
    perPage: number;
  },
) {
  const startOffset = (params.page - 1) * params.perPage;
  const endOffset = startOffset + params.perPage;

  const { data, error, count } = await client
    .from(MEMBERSHIPS_TABLE)
    .select<
      string,
      {
        id: number;
        role: MembershipRole;
        user: {
          id: string;
          displayName: string;
          photoURL: string;
        };
      }
    >(
      `
      id,
      role,
      user: user_id (
        id,
        displayName: display_name,
        photoURL: photo_url
      ),
      organization: organization_id !inner (
        id,
        uuid
      )`,
      {
        count: 'exact',
      },
    )
    .eq('organization.uuid', params.uid)
    .is('code', null)
    .range(startOffset, endOffset);

  if (error) {
    throw error;
  }

  return { data, count };
}
