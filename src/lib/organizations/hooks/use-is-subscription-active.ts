import type { Stripe } from 'stripe';
import useCurrentOrganization from '~/lib/organizations/hooks/use-current-organization';

const ACTIVE_STATUSES: Stripe.Subscription.Status[] = ['active', 'trialing'];

function useIsSubscriptionActive() {
  const organization = useCurrentOrganization();
  const status = organization?.subscription?.data.status;

  if (!status) {
    return false;
  }

  return ACTIVE_STATUSES.includes(status);
}

export default useIsSubscriptionActive;
