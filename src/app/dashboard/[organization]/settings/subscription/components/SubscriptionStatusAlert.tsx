import type { OrganizationSubscription } from '~/lib/organizations/types/organization-subscription';

import Alert from '~/core/ui/Alert';

function SubscriptionStatusAlert(
  props: React.PropsWithChildren<{
    subscription: OrganizationSubscription;
    values: {
      endDate: string;
      trialEndDate: string | null;
    };
  }>
) {
  const status = props.subscription.status;

  let message = '';
  let heading = '';
  let type: 'success' | 'error' | 'warn' | 'info';

  switch (status) {
    case 'active':
      heading = 'Your subscription is active';
      message = 'Your subscription is active. You can manage your subscription and billing in the Customer Portal.';
      type = 'success';
      break;
    case 'trialing':
      heading = `You're on a trial`;
      message = `Your trial will end on ${ props.values.trialEndDate }.`;
      type = 'success';
      break;
    case 'canceled':
      heading = 'Your subscription is canceled';
      message = `Your subscription is canceled. It is scheduled to end on ${ props.values.trialEndDate }.`;
      type = 'warn';
      break;
    case 'incomplete':
      heading = `We're waiting for your payment`;
      message = `We're waiting for your payment to go through. Please bear with us.`;
      type = 'warn';
      break;
    case 'incomplete_expired':
      heading = `Your payment has expired`;
      message = `Your payment has expired. Please update your payment method.`;
      type = 'error';
      break;
    case 'unpaid':
      heading = `Your invoice is unpaid`;
      message = `Your invoice is unpaid. Please update your payment method.`;
      type = 'error';
      break;
    case 'past_due':
      heading = `Your invoice is past due`;
      heading = `Your invoice is past due. Please update your payment method.`;
      type = 'error';

      break;
    default:
      return null;
  }

  return (
    <Alert type={type}>
      <Alert.Heading>
        {heading}
      </Alert.Heading>

      <span className={'block'}>
        {message}
      </span>
    </Alert>
  );
}

export default SubscriptionStatusAlert;
