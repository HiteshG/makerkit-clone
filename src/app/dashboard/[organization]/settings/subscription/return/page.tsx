import { notFound, redirect } from 'next/navigation';

import requireSession from '~/lib/user/require-session';
import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';
import getStripeInstance from '~/core/stripe/get-stripe';
import { StripeSessionStatus } from './components/StripeSessionStatus';
import RecoverStripeCheckout from './components/RecoverStripeCheckout';
import { withI18n } from '~/i18n/with-i18n';

interface SessionPageProps {
  searchParams: {
    session_id: string;
  };
}

async function ReturnStripeSessionPage({ searchParams }: SessionPageProps) {
  const { status, customerEmail, clientSecret } = await loadStripeSession(
    searchParams.session_id,
  );

  if (clientSecret) {
    return <RecoverStripeCheckout clientSecret={clientSecret} />;
  }

  return (
    <>
      <div className={'fixed left-0 top-48 w-full mx-auto z-50'}>
        <StripeSessionStatus
          status={status}
          customerEmail={customerEmail ?? ''}
        />
      </div>

      <div
        className={
          'bg-background/30 backdrop-blur-sm fixed top-0 left-0 w-full' +
          ' h-full !m-0'
        }
      />
    </>
  );
}

export default withI18n(ReturnStripeSessionPage);

export async function loadStripeSession(sessionId: string) {
  await requireSession(getSupabaseServerComponentClient());

  // now we fetch the session from Stripe
  // and check if it's still open
  const stripe = await getStripeInstance();

  const session = await stripe.checkout.sessions
    .retrieve(sessionId)
    .catch(() => undefined);

  if (!session) {
    notFound();
  }

  const isSessionOpen = session.status === 'open';
  const clientSecret = isSessionOpen ? session.client_secret : null;
  const isEmbeddedMode = session.ui_mode === 'embedded';

  // if the session is still open, we redirect the user to the checkout page
  // in Stripe self hosted mode
  if (isSessionOpen && !isEmbeddedMode && session.url) {
    redirect(session.url);
  }

  // otherwise - we show the user the return page
  // and display the details of the session
  return {
    status: session.status,
    customerEmail: session.customer_details?.email,
    clientSecret,
  };
}
