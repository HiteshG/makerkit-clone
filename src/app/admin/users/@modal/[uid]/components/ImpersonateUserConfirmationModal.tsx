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
import LoadingOverlay from '~/core/ui/LoadingOverlay';
import { Alert, AlertHeading } from '~/core/ui/Alert';
import Trans from '~/core/ui/Trans';

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

              <LoadingOverlay>
                <Trans i18nKey={'admin:settingUpSession'} />
              </LoadingOverlay>
            </>
          );
        }}
      </If>

      <If condition={error}>
        <Alert type={'error'}>
          <AlertHeading>
            <Trans i18nKey={'admin:impersonationError'} />
          </AlertHeading>
          
          <Trans i18nKey={'admin:impersonationErrorDetail'} />
        </Alert>
      </If>

      <If condition={!error && !tokens}>
        <div className={'flex flex-col space-y-4'}>
          <div className={'flex flex-col space-y-2 text-sm'}>
            <p>
              <Trans
                i18nKey={'admin:impersonateUserDetail1'}
                values={{ user: displayText, userId: user.id }}
                components={{ b: <b /> }}
              />
            </p>

            <p>
              <Trans i18nKey={'admin:impersonateUserDetail2'} />
            </p>

            <p>
              <Trans i18nKey={'admin:impersonateUserDetail3'} />
            </p>
          </div>

          <div className={'flex space-x-2.5 justify-end'}>
            <Modal.CancelButton disabled={pending} onClick={onDismiss}>
              <Trans i18nKey={'admin:cancel'} />
            </Modal.CancelButton>

            <Button
              type={'button'}
              loading={pending}
              variant={'destructive'}
              onClick={onConfirm}
            >
              <Trans i18nKey={'admin:letsDoIt'} />
            </Button>
          </div>
        </div>
      </If>
    </Modal>
  );
}

export default ImpersonateUserConfirmationModal;
