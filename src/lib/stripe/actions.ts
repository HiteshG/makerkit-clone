'use server';

import { z } from 'zod';
import { join } from 'path';
import type { SupabaseClient } from '@supabase/supabase-js';

import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { RedirectType } from 'next/dist/client/components/redirect';

import getLogger from '~/core/logger';
import getApiRefererPath from '~/core/generic/get-api-referer-path';

import createStripeCheckout from '~/lib/stripe/create-checkout';
import { canChangeBilling } from '~/lib/organizations/permissions';
import { getUserMembershipByOrganization } from '~/lib/memberships/queries';

import requireSession from '~/lib/user/require-session';

import {
  getOrganizationByCustomerId,
  getOrganizationByUid,
} from '~/lib/organizations/database/queries';

import configuration from '~/configuration';
import createBillingPortalSession from '~/lib/stripe/create-billing-portal-session';
import { withSession } from '~/core/generic/actions-utils';
import getSupabaseServerActionClient from '~/core/supabase/action-client';

export const createCheckoutAction = withSession(
  async (_, formData: FormData) => {
    const logger = getLogger();

    const bodyResult = await getCheckoutBodySchema().safeParseAsync(
      Object.fromEntries(formData),
    );

    const redirectToErrorPage = (error?: string) => {
      const referer = getApiRefererPath(headers());
      const url = join(referer, `?error=true`);

      logger.error({ error }, `Could not create Stripe Checkout session`);

      return redirect(url);
    };

    if (!bodyResult.success) {
      return redirectToErrorPage(`Invalid request body`);
    }

    const { organizationUid, priceId, returnUrl } = bodyResult.data;

    const client = getSupabaseServerActionClient();

    const sessionResult = await requireSession(client);
    const userId = sessionResult.user.id;
    const customerEmail = sessionResult.user.email;

    const { error, data } = await getOrganizationByUid(client, organizationUid);

    if (error) {
      return redirectToErrorPage(`Organization not found`);
    }

    const customerId = data?.subscription?.customerId;

    if (customerId) {
      logger.info({ customerId }, `Customer ID found for organization`);
    }

    const plan = getPlanByPriceId(priceId);

    if (!plan) {
      console.warn(
        `Plan not found for price ID "${priceId}". Did you forget to add it to the configuration? If the Price ID is incorrect, the checkout will be rejected. Please check the Stripe dashboard`,
      );
    }

    const canChangeBilling = await getUserCanAccessCheckout(client, {
      organizationUid,
      userId,
    });

    if (!canChangeBilling) {
      logger.debug(
        {
          userId,
          organizationUid,
        },
        `User attempted to access checkout but lacked permissions`,
      );

      return redirectToErrorPage(
        `You do not have permission to access this page`,
      );
    }

    const trialPeriodDays =
      plan && 'trialPeriodDays' in plan
        ? (plan.trialPeriodDays as number)
        : undefined;

    const embedded = configuration.stripe.embedded;

    const session = await createStripeCheckout({
      returnUrl,
      organizationUid,
      priceId,
      customerId,
      trialPeriodDays,
      customerEmail,
      embedded,
    }).catch((e) => {
      logger.error(e, `Stripe Checkout error`);
    });

    if (!session) {
      return redirectToErrorPage();
    }

    logger.info(
      {
        id: session.id,
        organizationUid,
      },
      `Created Stripe Checkout session`,
    );

    if (embedded) {
      logger.info(
        { id: session.id },
        `Using embedded checkout mode. Sending client secret back to client.`,
      );

      return {
        clientSecret: session.client_secret,
      };
    }

    if (!session.url) {
      logger.error(
        { id: session.id },
        `Could not retrieve Stripe Checkout URL`,
      );

      return redirectToErrorPage();
    }

    return redirect(session.url, RedirectType.replace);
  },
);

async function getUserCanAccessCheckout(
  client: SupabaseClient,
  params: {
    organizationUid: string;
    userId: string;
  },
) {
  try {
    const { role } = await getUserMembershipByOrganization(client, params);

    if (role === undefined) {
      return false;
    }

    return canChangeBilling(role);
  } catch (error) {
    getLogger().error({ error }, `Could not retrieve user role`);

    return false;
  }
}

export const createBillingPortalSessionAction = withSession(
  async (formData: FormData) => {
    const body = Object.fromEntries(formData);
    const bodyResult = await getBillingPortalBodySchema().safeParseAsync(body);
    const referrerPath = getApiRefererPath(headers());

    if (!bodyResult.success) {
      return redirectToErrorPage(referrerPath);
    }

    const { customerId } = bodyResult.data;

    const client = getSupabaseServerActionClient();
    const logger = getLogger();
    const session = await requireSession(client);

    const userId = session.user.id;

    const canAccess = await getUserCanAccessCustomerPortal(client, {
      customerId,
      userId,
    });

    if (!canAccess) {
      return redirectToErrorPage(referrerPath);
    }

    const referer = headers().get('referer');
    const origin = headers().get('origin');
    const returnUrl = referer || origin || configuration.paths.appHome;

    const { url } = await createBillingPortalSession({
      returnUrl,
      customerId,
    }).catch((e) => {
      logger.error(e, `Stripe Billing Portal redirect error`);

      return redirectToErrorPage(referrerPath);
    });

    return redirect(url, RedirectType.replace);
  },
);

async function getUserCanAccessCustomerPortal(
  client: SupabaseClient,
  params: {
    customerId: string;
    userId: string;
  },
) {
  const logger = getLogger();

  const { data: organization, error } = await getOrganizationByCustomerId(
    client,
    params.customerId,
  );

  if (error) {
    logger.error(
      {
        error,
        customerId: params.customerId,
      },
      `Could not retrieve organization by Customer ID`,
    );

    return false;
  }

  try {
    const organizationUid = organization.uuid;

    const { role } = await getUserMembershipByOrganization(client, {
      organizationUid,
      userId: params.userId,
    });

    if (role === undefined) {
      return false;
    }

    return canChangeBilling(role);
  } catch (error) {
    logger.error({ error }, `Could not retrieve user role`);

    return false;
  }
}

function getBillingPortalBodySchema() {
  return z.object({
    customerId: z.string().min(1),
  });
}

function getCheckoutBodySchema() {
  return z.object({
    organizationUid: z.string().uuid(),
    priceId: z.string().min(1),
    returnUrl: z.string().min(1),
  });
}

function getPlanByPriceId(priceId: string) {
  const products = configuration.stripe.products;

  type Plan = (typeof products)[0]['plans'][0];

  return products.reduce<Maybe<Plan>>((acc, product) => {
    if (acc) {
      return acc;
    }

    return product.plans.find(({ stripePriceId }) => stripePriceId === priceId);
  }, undefined);
}

function redirectToErrorPage(referrerPath: string) {
  const url = join(referrerPath, `?error=true`);

  return redirect(url);
}
