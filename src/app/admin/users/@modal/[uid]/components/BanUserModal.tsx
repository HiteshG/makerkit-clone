'use client';

import { useRouter } from 'next/navigation';
import { useFormStatus } from 'react-dom';
import { useState } from 'react';
import type { User } from '@supabase/gotrue-js';

import { banUser } from '~/app/admin/users/@modal/[uid]/actions.server';

import Modal from '~/core/ui/Modal';
import Button from '~/core/ui/Button';
import useCsrfToken from '~/core/hooks/use-csrf-token';
import { TextFieldInput, TextFieldLabel } from '~/core/ui/TextField';
import ErrorBoundary from '~/core/ui/ErrorBoundary';
import Alert from '~/core/ui/Alert';
import Trans from '~/core/ui/Trans';

function BanUserModal({
  user,
}: React.PropsWithChildren<{
  user: User;
}>) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const csrfToken = useCsrfToken();
  const displayText = user.email ?? user.phone ?? '';

  const onDismiss = () => {
    router.back();

    setIsOpen(false);
  };

  const onConfirm = async () => {
    await banUser({
      userId: user.id,
      csrfToken,
    });

    onDismiss();
  };

  return (
    <Modal heading={'Ban User'} isOpen={isOpen} setIsOpen={onDismiss}>
      <ErrorBoundary fallback={<BanErrorAlert />}>
        <form action={onConfirm}>
          <div className={'flex flex-col space-y-4'}>
            <div className={'flex flex-col space-y-2 text-sm'}>
              <p>
                <Trans
                  i18nKey={'admin:userBanConfirm'}
                  values={{ user: displayText }}
                  components={{ b: <b /> }}
                />
              </p>

              <p>
                <Trans i18nKey={'admin:userBanDetail'} />
              </p>

              <TextFieldLabel>
                <Trans
                  i18nKey={'admin:confirmBanByTyping'}
                  values={{ ban: "BAN" }}
                  components={{ b: <b /> }}
                />
                <TextFieldInput type="text" required pattern={'BAN'} />
              </TextFieldLabel>

              <p>
                <Trans i18nKey={'admin:reallyWantThis'} />
              </p>
            </div>

            <div className={'flex space-x-2.5 justify-end'}>
              <Modal.CancelButton onClick={onDismiss}>
                <Trans i18nKey={'admin:cancel'} />
              </Modal.CancelButton>

              <SubmitButton />
            </div>
          </div>
        </form>
      </ErrorBoundary>
    </Modal>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button loading={pending} variant={'destructive'}>
      <Trans i18nKey={'admin:banUserOkay'} />
    </Button>
  );
}

export default BanUserModal;

function BanErrorAlert() {
  return (
    <Alert type={'error'}>
      <Alert.Heading>
        <Trans i18nKey={'admin:banUserError'} />
      </Alert.Heading>
      
      <Trans i18nKey={'admin:banUserErrorDetail'} />
    </Alert>
  );
}
