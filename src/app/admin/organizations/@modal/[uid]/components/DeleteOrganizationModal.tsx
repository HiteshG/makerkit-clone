'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

import Modal from '~/core/ui/Modal';
import Button from '~/core/ui/Button';
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
              You are about to delete the organization{' '}
              <b>{organization.name}</b>.
            </p>

            <p>
              Delete this organization will potentially delete the data
              associated with it.
            </p>

            <p>
              <b>This action is not reversible</b>.
            </p>

            <p>Are you sure you want to do this?</p>
          </div>

          <div>
            <TextFieldLabel>
              Confirm by typing <b>DELETE</b>
              <TextFieldInput required type={'text'} pattern={'DELETE'} />
            </TextFieldLabel>
          </div>

          <div className={'flex space-x-2.5 justify-end'}>
            <Modal.CancelButton disabled={pending} onClick={onDismiss}>
              Cancel
            </Modal.CancelButton>

            <Button loading={pending} variant={'destructive'}>
              Yes, delete organization
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default DeleteOrganizationModal;
