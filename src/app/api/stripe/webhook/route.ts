import type { Stripe } from 'stripe';
import type { SupabaseClient } from '@supabase/supabase-js';

import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

import getStripeInstance from '~/core/stripe/get-stripe';
import StripeWebhooks from '~/core/stripe/stripe-webhooks.enum';
import getLogger from '~/core/logger';

import {
  throwBadRequestException,
  throwInternalServerErrorException,
} from '~/core/http-exceptions';

import {
  addSubscription,
  deleteSubscription,
  updateSubscriptionById,
} from '~/lib/subscriptions/mutations';

import getSupabaseRouteHandlerClient from '~/core/supabase/route-handler-client';
import { setOrganizationSubscriptionData } from '~/lib/organizations/database/mutations';

const STRIPE_SIGNATURE_HEADER = 'stripe-signature';

const webhookSecretKey = process.env.STRIPE_WEBHOOK_SECRET as string;

export async function POST(request: Request) {
  const logger = getLogger();
  const signature = headers().get(STRIPE_SIGNATURE_HEADER);

  logger.info(`[Stripe] Received Stripe Webhook`);

  if (!webhookSecretKey) {
    return throwInternalServerErrorException(
      `The variable STRIPE_WEBHOOK_SECRET is unset. Please add the STRIPE_WEBHOOK_SECRET environment variable`,
    );
  }

  if (!signature) {
    return throwBadRequestException();
  }

  const rawBody = await request.text();
  const stripe = await getStripeInstance();

  const client = getSupabaseRouteHandlerClient({
    admin: true,
  });

  try {
    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      webhookSecretKey,
    );

    logger.info(
      {
        type: event.type,
      },
      `[Stripe] Processing Stripe Webhook...`,
    );

    switch (event.type) {
      case StripeWebhooks.Completed: {
        const session = event.data.object as Stripe.Checkout.Session;
        const subscriptionId = session.subscription as string;

        const subscription =
          await stripe.subscriptions.retrieve(subscriptionId);

        await onCheckoutCompleted(client, session, subscription);

        break;
      }

      case StripeWebhooks.SubscriptionDeleted: {
        const subscription = event.data.object as Stripe.Subscription;

        await deleteSubscription(client, subscription.id);

        break;
      }

      case StripeWebhooks.SubscriptionUpdated: {
        const subscription = event.data.object as Stripe.Subscription;

        await updateSubscriptionById(client, subscription);

        break;
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error(
      {
        error,
      },
      `[Stripe] Webhook handling failed`,
    );

    return throwInternalServerErrorException();
  }
}

async function onCheckoutCompleted(
  client: SupabaseClient,
  session: Stripe.Checkout.Session,
  subscription: Stripe.Subscription,
) {
  const organizationUid = getOrganizationUidFromClientReference(session);
  const customerId = session.customer as string;

  const { error, data } = await addSubscription(client, subscription);

  if (error) {
    return Promise.reject(
      `Failed to add subscription to the database: ${error}`,
    );
  }

  return setOrganizationSubscriptionData(client, {
    organizationUid,
    customerId,
    subscriptionId: data.id,
  });
}

function getOrganizationUidFromClientReference(
  session: Stripe.Checkout.Session,
) {
  return session.client_reference_id as string;
}
