import Trans from '~/core/ui/Trans';
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

  switch (status) {
    case 'active':
      label = 'subscription:status.active.label';
      description = 'subscription:status.active.description';
      type = 'success';
      break;

    case 'trialing':
      label = 'subscription:status.trialing.label';
      description = 'subscription:status.trialing.description';
      type = 'success';
      break;

    case 'canceled':
      label = 'subscription:status.canceled.label';
      description = 'subscription:status.canceled.description';
      type = 'warn';
      break;

    case 'incomplete':
      label = 'subscription:status.incomplete.label';
      description = 'subscription:status.incomplete.description';
      type = 'warn';
      break;

    case 'incomplete_expired':
      label = 'subscription:status.incomplete_expired.label';
      description = 'subscription:status.incomplete_expired.description';
      type = 'error';
      break;

    case 'unpaid':
      label = 'subscription:status.unpaid.label';
      description = 'subscription:status.unpaid.description';
      type = 'error';
      break;

    case 'past_due':
      label = 'subscription:status.past_due.label';
      description = 'subscription:status.past_due.description';
      type = 'error';
      break;

    default:
      label = 'subscription:status.free.label';
      description = 'subscription:status.free.description';
      type = 'success';
      break;
  }

  return (
    <Tooltip>
      <TooltipTrigger>
        <Badge size={'small'} color={type}>
          <Trans i18nKey={label} />
        </Badge>
      </TooltipTrigger>

      <TooltipContent>
        <Trans i18nKey={description} values={getDates(subscription)} />
      </TooltipContent>
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
