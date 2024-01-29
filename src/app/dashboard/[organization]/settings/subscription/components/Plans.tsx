'use client';

import useCurrentOrganization from '~/lib/organizations/hooks/use-current-organization';

import If from '~/core/ui/If';
import Trans from '~/core/ui/Trans';

import SubscriptionCard from './SubscriptionCard';

import { canChangeBilling } from '~/lib/organizations/permissions';
import PlanSelectionForm from '~/app/dashboard/[organization]/settings/subscription/components/PlanSelectionForm';
import IfHasPermissions from '~/components/IfHasPermissions';
import BillingPortalRedirectButton from '~/app/dashboard/[organization]/settings/subscription/components/BillingRedirectButton';

const Plans: React.FC = () => {
  const organization = useCurrentOrganization();

  if (!organization) {
    return null;
  }

  const customerId = organization.subscription?.customerId;
  const subscription = organization.subscription?.data;

  if (!subscription) {
    return (
      <PlanSelectionForm customerId={customerId} organization={organization} />
    );
  }

  return (
    <div className={'flex flex-col space-y-4'}>
      <SubscriptionCard subscription={subscription} />

      <IfHasPermissions condition={canChangeBilling}>
        <If condition={customerId}>
          <div className={'flex flex-col space-y-2'}>
            <BillingPortalRedirectButton customerId={customerId as string}>
              <Trans i18nKey={'subscription:manageBilling'} />
            </BillingPortalRedirectButton>

            <span className={'text-xs text-gray-500 dark:text-gray-400'}>
              <Trans i18nKey={'subscription:manageBillingDescription'} />
            </span>
          </div>
        </If>
      </IfHasPermissions>
    </div>
  );
};

export default Plans;
