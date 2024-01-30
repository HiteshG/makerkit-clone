'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import type { User } from '@supabase/gotrue-js';

import Modal from '~/core/ui/Modal';
import Button from '~/core/ui/Button';
import { reactivateUser } from '~/app/admin/users/@modal/[uid]/actions.server';
import useCsrfToken from '~/core/hooks/use-csrf-token';
import Trans from '~/core/ui/Trans';

function ReactivateUserModal({
  user,
}: React.PropsWithChildren<{
  user: User;
}>) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [pending, startTransition] = useTransition();
  const csrfToken = useCsrfToken();
  const displayText = user.email ?? user.phone ?? '';

  const onDismiss = () => {
    router.back();

    setIsOpen(false);
  };

  const onConfirm = () => {
    startTransition(async () => {
      await reactivateUser({
        userId: user.id,
        csrfToken,
      });

      onDismiss();
    });
  };

  return (
    <Modal heading={'Reactivate User'} isOpen={isOpen} setIsOpen={onDismiss}>
      <div className={'flex flex-col space-y-4'}>
        <div className={'flex flex-col space-y-2 text-sm'}>
          <p>
            <Trans
              i18nKey={'admin:userReactiveConfirm'}
              values={{ user: displayText }}
              components={{ b: <b /> }}
            />
          </p>

          <p>
            <Trans i18nKey={'admin:reallyWantThis'} />
          </p>
        </div>

        <div className={'flex space-x-2.5 justify-end'}>
          <Modal.CancelButton disabled={pending} onClick={onDismiss}>
            <Trans i18nKey={'admin:cancel'} />
          </Modal.CancelButton>

          <Button loading={pending} onClick={onConfirm}>
            <Trans i18nKey={'admin:reactivateUserOkay'} />
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ReactivateUserModal;
