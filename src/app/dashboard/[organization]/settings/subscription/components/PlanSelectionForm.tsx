'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

import type Organization from '~/lib/organizations/types/organization';
import { canChangeBilling } from '~/lib/organizations/permissions';

import If from '~/core/ui/If';
import Alert from '~/core/ui/Alert';

import PricingTable from '~/components/PricingTable';
import IfHasPermissions from '~/components/IfHasPermissions';
import CheckoutRedirectButton from '../components/CheckoutRedirectButton';
import BillingPortalRedirectButton from '../components/BillingRedirectButton';

import Button from '~/core/ui/Button';
import ErrorBoundary from '~/core/ui/ErrorBoundary';

const EmbeddedStripeCheckout = dynamic(
  () => import('./EmbeddedStripeCheckout'),
  {
    ssr: false,
  },
);

const PlanSelectionForm: React.FCC<{
  organization: WithId<Organization>;
  customerId: Maybe<string>;
}> = ({ organization, customerId }) => {
  const [clientSecret, setClientSecret] = useState<string>();
  const [retry, setRetry] = useState(0);

  return (
    <div className={'flex flex-col space-y-6'}>
      <IfHasPermissions
        condition={canChangeBilling}
        fallback={<NoPermissionsAlert />}
      >
        <If condition={clientSecret}>
          <EmbeddedStripeCheckout clientSecret={clientSecret as string} />
        </If>

        <div className={'flex w-full flex-col space-y-8 justify-center'}>
          <PricingTable
            CheckoutButton={(props) => {
              return (
                <ErrorBoundary
                  key={retry}
                  fallback={
                    <CheckoutErrorMessage
                      onRetry={() => setRetry((retry) => retry + 1)}
                    />
                  }
                >
                  <CheckoutRedirectButton
                    organizationUid={organization.uuid}
                    stripePriceId={props.stripePriceId}
                    recommended={props.recommended}
                    onCheckoutCreated={setClientSecret}
                  >
                    Checkout
                  </CheckoutRedirectButton>
                </ErrorBoundary>
              );
            }}
          />

          <If condition={customerId}>
            <div className={'flex flex-col space-y-2'}>
              <BillingPortalRedirectButton customerId={customerId as string}>
                Go to Customer Portal
              </BillingPortalRedirectButton>

              <span className={'text-xs text-gray-500 dark:text-gray-400'}>
                Visit your Customer Portal to manage your subscription and billing.
              </span>
            </div>
          </If>
        </div>
      </IfHasPermissions>
    </div>
  );
};

export default PlanSelectionForm;

function NoPermissionsAlert() {
  return (
    <Alert type={'warn'}>
      <Alert.Heading>
        You don&apos;t have permissions to change the billing
      </Alert.Heading>

      Please contact your organization owner to change the billing settings for your organization.
    </Alert>
  );
}

function CheckoutErrorMessage({ onRetry }: { onRetry: () => void }) {
  return (
    <div className={'flex flex-col space-y-2'}>
      <span className={'text-red-500 text-sm font-medium'}>
        Sorry, something went wrong
      </span>

      <Button onClick={onRetry} variant={'ghost'}>
        Retry
      </Button>
    </div>
  );
}
