'use client';

import React from 'react';
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';

import If from '~/core/ui/If';
import Alert from '~/core/ui/Alert';
import Trans from '~/core/ui/Trans';

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
            <Trans i18nKey={'subscription:checkOutCanceledAlertHeading'} />
          </Alert.Heading>

          <p>
            <Trans i18nKey={'subscription:checkOutCanceledAlert'} />
          </p>
        </Alert>
      );

    case SubscriptionStatusQueryParams.Error:
      return (
        <Alert type={'error'} useCloseButton={true}>
          <Alert.Heading>
            <Trans i18nKey={'subscription:unknownErrorAlertHeading'} />
          </Alert.Heading>

          <p>
            <Trans i18nKey={'subscription:unknownErrorAlert'} />
          </p>
        </Alert>
      );

    case SubscriptionStatusQueryParams.Success:
      return (
        <Alert type={'success'} useCloseButton={true}>
          <Alert.Heading>
            <Trans i18nKey={'subscription:checkOutCompletedAlertHeading'} />
          </Alert.Heading>

          <p>
            <Trans i18nKey={'subscription:checkOutCompletedAlert'} />
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
