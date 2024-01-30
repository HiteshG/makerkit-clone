'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

import Modal from '~/core/ui/Modal';
import Button from '~/core/ui/Button';
import Trans from '~/core/ui/Trans';
import useCsrfToken from '~/core/hooks/use-csrf-token';
import { TextFieldInput, TextFieldLabel } from '~/core/ui/TextField';
import Organization from '~/lib/organizations/types/organization';
import { deleteOrganizationAction } from '~/app/admin/organizations/@modal/[uid]/actions.server';

function DeleteOrganizationModal({
  organization,
}: React.PropsWithChildren<{
  organization: Organization;
}>) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [pending, startTransition] = useTransition();
  const csrfToken = useCsrfToken();

  const onDismiss = () => {
    router.back();

    setIsOpen(false);
  };

  const onConfirm = () => {
    startTransition(async () => {
      await deleteOrganizationAction({
        id: organization.id,
        csrfToken,
      });

      onDismiss();
    });
  };

  return (
    <Modal
      heading={'Deleting Organization'}
      isOpen={isOpen}
      setIsOpen={onDismiss}
    >
      <form action={onConfirm}>
        <div className={'flex flex-col space-y-4'}>
          <div className={'flex flex-col space-y-2 text-sm'}>
            <p>
              <Trans
                i18nKey={'admin:organizationDeleteConfirm'}
                values={{ organization: organization.name }}
                components={{ b: <b /> }}
              />
            </p>

            <p>
              <Trans i18nKey={'admin:deleteAssociatedData'} />
            </p>

            <p>
              <b><Trans i18nKey={'admin:actionNotReversible'} /></b>.
            </p>

            <p>
              <Trans i18nKey={'admin:reallyWantThis'} />
            </p>
          </div>

          <div>
            <TextFieldLabel>
              <Trans
                i18nKey={'admin:confirmByTyping'}
                values={{ delete: 'DELETE' }}
                components={{ b: <b /> }}
              />
              <TextFieldInput required type={'text'} pattern={'DELETE'} />
            </TextFieldLabel>
          </div>

          <div className={'flex space-x-2.5 justify-end'}>
            <Modal.CancelButton disabled={pending} onClick={onDismiss}>
              <Trans i18nKey={'admin:cancel'} />
            </Modal.CancelButton>

            <Button loading={pending} variant={'destructive'}>
              <Trans i18nKey={'admin:deleteOrganization'} />
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default DeleteOrganizationModal;
