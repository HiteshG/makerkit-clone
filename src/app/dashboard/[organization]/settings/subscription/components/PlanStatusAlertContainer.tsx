'use client';

import React from 'react';
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';

import If from '~/core/ui/If';
import Alert from '~/core/ui/Alert';

enum SubscriptionStatusQueryParams {
  Success = 'success',
  Cancel = 'cancel',
  Error = 'error',
}

function PlansStatusAlertContainer() {
  const status = useSubscriptionStatus();

  return (
    <If condition={status !== undefined}>
      <PlansStatusAlert status={status as SubscriptionStatusQueryParams} />
    </If>
  );
}

export default PlansStatusAlertContainer;

function PlansStatusAlert({
  status,
}: {
  status: SubscriptionStatusQueryParams;
}) {
  switch (status) {
    case SubscriptionStatusQueryParams.Cancel:
      return (
        <Alert type={'warn'} useCloseButton={true}>
          <Alert.Heading>
            The checkout was canceled
          </Alert.Heading>

          <p>
            The checkout was canceled. Please contact us if you&apos;re experiencing any issues.
          </p>
        </Alert>
      );

    case SubscriptionStatusQueryParams.Error:
      return (
        <Alert type={'error'} useCloseButton={true}>
          <Alert.Heading>
            Sorry, something went wrong
          </Alert.Heading>

          <p>
            We encountered an unknown error while processing your payment. Please try again or contact support.
          </p>
        </Alert>
      );

    case SubscriptionStatusQueryParams.Success:
      return (
        <Alert type={'success'} useCloseButton={true}>
          <Alert.Heading>
            Checkout successfully completed
          </Alert.Heading>

          <p>
            Yay, your payment went through!
          </p>
        </Alert>
      );
  }
}

function useSubscriptionStatus() {
  const params = useSearchParams();

  return getStatus(params);
}

function getStatus(params: ReadonlyURLSearchParams | null) {
  if (!params) {
    return;
  }

  const error = params.has(SubscriptionStatusQueryParams.Error);
  const canceled = params.has(SubscriptionStatusQueryParams.Cancel);
  const success = params.has(SubscriptionStatusQueryParams.Success);

  if (canceled) {
    return SubscriptionStatusQueryParams.Cancel;
  } else if (success) {
    return SubscriptionStatusQueryParams.Success;
  } else if (error) {
    return SubscriptionStatusQueryParams.Error;
  }
}
