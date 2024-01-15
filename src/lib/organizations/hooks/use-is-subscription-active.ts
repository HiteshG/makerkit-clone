import type { Stripe } from "stripe";
import { useCurrentOrganization } from "./use-current-organization";

const ACTIVE_STATUSES: Stripe.Subscription.Status[] = ["active", "trialing"];

/**
 * @name useIsSubscriptionActive
 * @description Returns whether the organization is on any paid
 * subscription, regardless of plan.
 */
function useIsSubscriptionActive() {
  const organization = useCurrentOrganization();
  const status = organization?.subscription?.status;

  if (!status) {
    return false;
  }

  return ACTIVE_STATUSES.includes(status);
}

export default useIsSubscriptionActive;
