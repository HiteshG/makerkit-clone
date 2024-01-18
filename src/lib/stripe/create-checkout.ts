import type { Stripe } from 'stripe';
import getStripeInstance from '~/core/stripe/get-stripe';

interface CreateCheckoutParams {
  returnUrl: string;
  organizationUid: string;
  priceId: string;
  customerId?: string;
  trialPeriodDays?: Maybe<number>;
  customerEmail?: string;
  embedded: boolean;
}

export default async function createStripeCheckout(
  params: CreateCheckoutParams,
) {
  const clientReferenceId = params.organizationUid;

  const customer = params.customerId || undefined;

  const mode: Stripe.Checkout.SessionCreateParams.Mode = 'subscription';

  const stripe = await getStripeInstance();

  const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = {
    quantity: 1,
    price: params.priceId,
  };

  const subscriptionData: Stripe.Checkout.SessionCreateParams.SubscriptionData =
    {
      trial_period_days: params.trialPeriodDays,
      metadata: {
        organizationUid: params.organizationUid,
      },
    };

  const urls = getUrls({
    embedded: params.embedded,
    returnUrl: params.returnUrl,
  });

  const uiMode = params.embedded ? 'embedded' : 'hosted';

  return stripe.checkout.sessions.create({
    mode,
    ui_mode: uiMode,
    customer,
    line_items: [lineItem],
    client_reference_id: clientReferenceId.toString(),
    subscription_data: subscriptionData,
    customer_email: params.customerEmail,
    ...urls,
  });
}

function getUrls(params: { returnUrl: string; embedded?: boolean }) {
  const successUrl = `${params.returnUrl}?success=true`;
  const cancelUrl = `${params.returnUrl}?cancel=true`;
  const returnUrl = `${params.returnUrl}/return?session_id={CHECKOUT_SESSION_ID}`;

  return params.embedded
    ? {
        return_url: returnUrl,
      }
    : {
        success_url: successUrl,
        cancel_url: cancelUrl,
      };
}
