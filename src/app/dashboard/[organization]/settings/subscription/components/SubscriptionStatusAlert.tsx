import type { OrganizationSubscription } from '~/lib/organizations/types/organization-subscription';

import Alert from '~/core/ui/Alert';
import Trans from '~/core/ui/Trans';

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
      heading = 'subscription:status.active.heading';
      message = 'subscription:status.active.description';
      type = 'success';
      break;
    case 'trialing':
      heading = 'subscription:status.trialing.heading';
      message = 'subscription:status.trialing.description';
      type = 'success';
      break;
    case 'canceled':
      heading = 'subscription:status.canceled.heading';
      message = 'subscription:status.canceled.description';
      type = 'warn';
      break;
    case 'incomplete':
      heading = 'subscription:status.incomplete.heading';
      message = 'subscription:status.incomplete.description';
      type = 'warn';
      break;
    case 'incomplete_expired':
      heading = 'subscription:status.incomplete_expired.heading';
      message = 'subscription:status.incomplete_expired.description';
      type = 'error';
      break;
    case 'unpaid':
      heading = 'subscription:status.unpaid.heading';
      message = 'subscription:status.unpaid.description';
      type = 'error';
      break;
    case 'past_due':
      heading = 'subscription:status.past_due.heading';
      heading = 'subscription:status.past_due.description';
      type = 'error';

      break;
    default:
      return null;
  }

  return (
    <Alert type={type}>
      <Alert.Heading>
        <Trans i18nKey={heading} />
      </Alert.Heading>

      <span className={'block'}>
        <Trans i18nKey={message} values={props.values} />
      </span>
    </Alert>
  );
}

export default SubscriptionStatusAlert;
