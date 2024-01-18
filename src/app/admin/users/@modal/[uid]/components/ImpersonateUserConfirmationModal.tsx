'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import type { User } from '@supabase/gotrue-js';

import Modal from '~/core/ui/Modal';
import Button from '~/core/ui/Button';
import If from '~/core/ui/If';

import { impersonateUser } from '~/app/admin/users/@modal/[uid]/actions.server';
import useCsrfToken from '~/core/hooks/use-csrf-token';

import ImpersonateUserAuthSetter from '../components/ImpersonateUserAuthSetter';
import PageLoadingIndicator from '~/core/ui/PageLoadingIndicator';
import { Alert, AlertHeading } from '~/core/ui/Alert';

function ImpersonateUserConfirmationModal({
  user,
}: React.PropsWithChildren<{
  user: User;
}>) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [pending, startTransition] = useTransition();
  const csrfToken = useCsrfToken();
  const [error, setError] = useState<boolean>();

  const [tokens, setTokens] = useState<{
    accessToken: string;
    refreshToken: string;
  }>();

  const displayText = user.email ?? user.phone ?? '';

  const onDismiss = () => {
    router.back();

    setIsOpen(false);
  };

  const onConfirm = () => {
    startTransition(async () => {
      try {
        const response = await impersonateUser({
          userId: user.id,
          csrfToken,
        });

        setTokens(response);
      } catch (e) {
        setError(true);
      }
    });
  };

  return (
    <Modal heading={'Impersonate User'} isOpen={isOpen} setIsOpen={onDismiss}>
      <If condition={tokens}>
        {(tokens) => {
          return (
            <>
              <ImpersonateUserAuthSetter tokens={tokens} />

              <PageLoadingIndicator>
                Setting up your session...
              </PageLoadingIndicator>
            </>
          );
        }}
      </If>

      <If condition={error}>
        <Alert type={'error'}>
          <AlertHeading>Impersonation Error</AlertHeading>
          Sorry, something went wrong. Please check the logs.
        </Alert>
      </If>

      <If condition={!error && !tokens}>
        <div className={'flex flex-col space-y-4'}>
          <div className={'flex flex-col space-y-2 text-sm'}>
            <p>
              You are about to impersonate the account belonging to{' '}
              <b>{displayText}</b> with ID <b>{user.id}</b>.
            </p>

            <p>
              You will be able to log in as them, see and do everything they
              can. To return to your own account, simply log out.
            </p>

            <p>
              Like Uncle Ben said, with great power comes great responsibility.
              Use this power wisely.
            </p>
          </div>

          <div className={'flex space-x-2.5 justify-end'}>
            <Modal.CancelButton disabled={pending} onClick={onDismiss}>
              Cancel
            </Modal.CancelButton>

            <Button
              type={'button'}
              loading={pending}
              variant={'destructive'}
              onClick={onConfirm}
            >
              Yes, let&apos;s do it
            </Button>
          </div>
        </div>
      </If>
    </Modal>
  );
}

export default ImpersonateUserConfirmationModal;
