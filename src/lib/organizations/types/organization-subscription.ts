import type { Stripe } from 'stripe';

export interface OrganizationSubscription {
  id: string;

  priceId: string;

  status: Stripe.Subscription.Status;
  cancelAtPeriodEnd: boolean;
  currency: string | null;

  interval: string | null;
  intervalCount: number | null;

  createdAt: string;
  periodStartsAt: string;
  periodEndsAt: string;
  trialStartsAt: string | null;
  trialEndsAt: string | null;
}
