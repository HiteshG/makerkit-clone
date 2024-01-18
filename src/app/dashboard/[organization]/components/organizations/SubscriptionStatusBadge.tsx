import type { OrganizationSubscription } from '~/lib/organizations/types/organization-subscription';
import { Tooltip, TooltipTrigger, TooltipContent } from '~/core/ui/Tooltip';
import Badge from '~/core/ui/Badge';

function SubscriptionStatusBadge({
  subscription,
}: React.PropsWithChildren<{
  subscription: Maybe<OrganizationSubscription>;
}>) {
  let label: string;
  let description: string;
  let type: 'success' | 'error' | 'warn' | 'info';

  const status = subscription?.status ?? 'free';

  const dates = getDates(subscription);

  switch (status) {
    case 'active':
      label = 'Active';
      description = "Your subscription is active. You can manage your subscription and billing in the Customer Portal.";
      type = 'success';
      break;

    case 'trialing':
      label = 'Trial';
      description = `Your trial will end on ${ dates.trialEndDate }.`;
      type = 'success';
      break;

    case 'canceled':
      label = 'Canceled';
      description = `Your subscription is canceled. It is scheduled to end on ${ dates.endDate }.`;
      type = 'warn';
      break;

    case 'incomplete':
      label = 'Incomplete';
      description = `We're waiting for your payment to go through. Please bear with us.`;
      type = 'warn';
      break;

    case 'incomplete_expired':
      label = 'Expired';
      description = 'Your payment has expired. Please update your payment method.';
      type = 'error';
      break;

    case 'unpaid':
      label = 'Unpaid';
      description = 'Your invoice is unpaid. Please update your payment method.';
      type = 'error';
      break;

    case 'past_due':
      label = 'Past Due';
      description = 'Your invoice is past due. Please update your payment method.';
      type = 'error';
      break;

    default:
      label = 'Free Plan';
      description = `You're on a free plan. You can upgrade to a paid plan at any time.`;
      type = 'success';
      break;
  }

  return (
    <Tooltip>
      <TooltipTrigger>
        <Badge size={'small'} color={type}>
          {label}
        </Badge>
      </TooltipTrigger>

      {description}
    </Tooltip>
  );
}

function getDates(subscription: Maybe<OrganizationSubscription>) {
  if (!subscription) {
    return {};
  }

  return {
    endDate: new Date(subscription.periodEndsAt).toDateString(),
    trialEndDate: subscription.trialEndsAt
      ? new Date(subscription.trialEndsAt).toDateString()
      : null,
  };
}

export default SubscriptionStatusBadge;
