import { Database } from '~/database.types';
import { SupabaseClient } from '@supabase/supabase-js';

import {
  ORGANIZATIONS_SUBSCRIPTIONS_TABLE,
  ORGANIZATIONS_TABLE,
} from '~/lib/db-tables';

import getSupabaseServerActionClient from '~/core/supabase/action-client';
import getLogger from '~/core/logger';
import getStripeInstance from '~/core/stripe/get-stripe';

export default async function deleteOrganization(
  client: SupabaseClient<Database>,
  params: {
    organizationId: number;
  },
) {
  const logger = getLogger();
  const { organizationId } = params;

  const subscriptionResponse = await client
    .from(ORGANIZATIONS_SUBSCRIPTIONS_TABLE)
    .select(
      `
      subscriptionId: subscription_id,
      organizationId: organization_id
    `,
    )
    .eq('organization_id', organizationId)
    .maybeSingle();

  if (subscriptionResponse.data) {
    const id = subscriptionResponse.data.subscriptionId;

    if (id) {
      await cancelStripeSubscription(id);
    }
  }

  const adminClient = getSupabaseServerActionClient({ admin: true });

  const response = await adminClient
    .from(ORGANIZATIONS_TABLE)
    .delete()
    .eq('id', organizationId);

  if (response.error) {
    logger.info(
      { ...params, error: response.error },
      `Error deleting organization`,
    );

    throw new Error(`Error deleting organization`);
  }

  logger.info(params, `User successfully deleted organization`);
}

async function cancelStripeSubscription(subscriptionId: string) {
  const stripe = await getStripeInstance();

  try {
    await stripe.subscriptions.cancel(subscriptionId, {
      invoice_now: true,
    });
  } catch (e) {
    getLogger().error(
      {
        e,
      },
      'Failed to cancel stripe subscription',
    );

    throw e;
  }
}
