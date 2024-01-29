'use client';

import type { Stripe } from 'stripe';
import { CheckIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

import Heading from '~/core/ui/Heading';
import Button from '~/core/ui/Button';
import Trans from '~/core/ui/Trans';
import configuration from '~/configuration';

/**
 * Retrieves the session status for a Stripe checkout session.
 * Since we should only arrive here for a successful checkout, we only check
 * for the `paid` status.
 *
 * @param {Stripe.Checkout.Session['status']} status - The status of the Stripe checkout session.
 * @param {string} customerEmail - The email address of the customer associated with the session.
 *
 * @returns {ReactElement} - The component to render based on the session status.
 */
export function StripeSessionStatus({
  customerEmail,
}: React.PropsWithChildren<{
  status: Stripe.Checkout.Session['status'];
  customerEmail: string;
}>) {
  return <SuccessSessionStatus customerEmail={customerEmail} />;
}

function SuccessSessionStatus({
  customerEmail,
}: React.PropsWithChildren<{
  customerEmail: string;
}>) {
  return (
    <section
      data-cy={'payment-return-success'}
      className={
        'max-w-xl mx-auto rounded-xl p-16 fade-in xl:drop-shadow-sm border' +
        ' border-gray-100 dark:border-dark-800' +
        ' bg-background animate-in ease-out slide-in-from-bottom-8' +
        ' zoom-in-50 duration-1000 dark:shadow-primary/40 dark:shadow-2xl'
      }
    >
      <div
        className={
          'flex flex-col space-y-4 items-center justify-center text-center'
        }
      >
        <CheckIcon
          className={
            'w-16 bg-green-500 p-1 text-white rounded-full ring-8' +
            ' ring-green-500/30 dark:ring-green-500/50'
          }
        />

        <Heading type={3}>
          <span className={'font-semibold mr-4'}>
            <Trans i18nKey={'subscription:checkoutSuccessTitle'} />
          </span>
          🎉
        </Heading>

        <div
          className={'flex flex-col space-y-4 text-gray-500 dark:text-gray-400'}
        >
          <p>
            <Trans
              i18nKey={'subscription:checkoutSuccessDescription'}
              values={{ customerEmail }}
            />
          </p>
        </div>

        <Button
          data-cy={'checkout-success-back-button'}
          href={configuration.paths.appHome}
          variant={'outline'}
        >
          <span className={'flex space-x-2.5 items-center'}>
            <span>
              <Trans i18nKey={'subscription:checkoutSuccessBackButton'} />
            </span>

            <ChevronRightIcon className={'h-4'} />
          </span>
        </Button>
      </div>
    </section>
  );
}
