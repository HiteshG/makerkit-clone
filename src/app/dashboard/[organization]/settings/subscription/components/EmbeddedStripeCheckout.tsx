'use client';

import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';

import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js';

import classNames from 'clsx';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { Close as DialogPrimitiveClose } from '@radix-ui/react-dialog';

import { StripeCheckoutDisplayMode } from '~/lib/stripe/types';
import configuration from '~/configuration';

import { Dialog, DialogContent } from '~/core/ui/Dialog';
import IconButton from '~/core/ui/IconButton';
import If from '~/core/ui/If';
import LogoImage from '~/core/ui/Logo/LogoImage';
import Button from '~/core/ui/Button';
import Trans from '~/core/ui/Trans';

const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

if (!STRIPE_PUBLISHABLE_KEY) {
  throw new Error(
    'Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY environment variable. Did you forget to add it to your .env file?',
  );
}

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

export default function EmbeddedStripeCheckout({
  clientSecret,
  onClose,
}: React.PropsWithChildren<{
  clientSecret: string;
  onClose?: () => void;
}>) {
  return (
    <EmbeddedCheckoutPopup key={clientSecret} onClose={onClose}>
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ clientSecret }}
      >
        <EmbeddedCheckout className={'EmbeddedCheckoutClassName'} />
      </EmbeddedCheckoutProvider>
    </EmbeddedCheckoutPopup>
  );
}

function EmbeddedCheckoutPopup({
  onClose,
  children,
}: React.PropsWithChildren<{
  onClose?: () => void;
}>) {
  const [open, setOpen] = useState(true);

  const displayMode = configuration.stripe.displayMode;
  const isPopup = displayMode === StripeCheckoutDisplayMode.Popup;
  const isOverlay = displayMode === StripeCheckoutDisplayMode.Overlay;

  const className = classNames({
    [`bg-white p-4 max-h-[98vh] overflow-y-auto shadow-transparent border border-gray-200 dark:border-dark-700`]:
      isPopup,
    [`bg-background !flex flex-col flex-1 fixed top-0 !max-h-full !max-w-full left-0 w-screen h-screen border-transparent shadow-transparent py-4 px-8`]:
      isOverlay,
  });

  const close = () => {
    setOpen(false);

    if (onClose) {
      onClose();
    }
  };

  return (
    <Dialog
      defaultOpen
      open={open}
      onOpenChange={(open) => {
        if (!open && onClose) {
          onClose();
        }

        setOpen(open);
      }}
    >
      <DialogContent
        className={className}
        onOpenAutoFocus={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <If condition={isOverlay}>
          <div className={'mb-8'}>
            <div className={'flex justify-between items-center'}>
              <LogoImage />

              <Button onClick={close} variant={'outline'}>
                <Trans i18nKey={'common:cancel'} />
              </Button>
            </div>
          </div>
        </If>

        <If condition={isPopup}>
          <DialogPrimitiveClose asChild>
            <IconButton
              className={'absolute top-2 right-4 flex items-center'}
              label={'Close Checkout'}
              onClick={close}
            >
              <XMarkIcon className={'h-6 text-gray-900'} />
              <span className="sr-only">
                <Trans i18nKey={'common:cancel'} />
              </span>
            </IconButton>
          </DialogPrimitiveClose>
        </If>

        <div
          className={classNames({
            [`p-8 rounded-xl bg-white flex-1`]: isOverlay,
          })}
        >
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
