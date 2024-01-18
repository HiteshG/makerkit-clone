'use client';

import { useCallback, useState, useTransition } from 'react';

import Button from '~/core/ui/Button';
import Modal from '~/core/ui/Modal';
import If from '~/core/ui/If';
import Alert from '~/core/ui/Alert';

import { transferOrganizationOwnershipAction } from '~/lib/organizations/actions';
import useCurrentOrganization from '~/lib/organizations/hooks/use-current-organization';

const TransferOrganizationOwnershipModal: React.FC<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  membershipId: number;
  targetDisplayName: string;
}> = ({ isOpen, setIsOpen, targetDisplayName, membershipId }) => {
  return (
    <Modal
      heading={"Transfer Ownership"}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <TransferOrganizationOwnershipForm
        membershipId={membershipId}
        targetDisplayName={targetDisplayName}
        setIsOpen={setIsOpen}
      />
    </Modal>
  );
};

function TransferOrganizationOwnershipForm({
  membershipId,
  targetDisplayName,
  setIsOpen,
}: {
  membershipId: number;
  targetDisplayName: string;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<boolean>();
  const organization = useCurrentOrganization();
  const organizationUid = organization?.uuid ?? '';

  const onSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      startTransition(async () => {
        try {
          await transferOrganizationOwnershipAction({
            membershipId,
            organizationUid,
          });

          setIsOpen(false);
        } catch (error) {
          setError(true);
        }
      });
    },
    [membershipId, organizationUid, setIsOpen],
  );

  return (
    <form className={'flex flex-col space-y-6 text-sm'} onSubmit={onSubmit}>
      <If condition={error}>
        <TransferOwnershipErrorAlert />
      </If>

      <p>You are transferring ownership of the selected organization to <b>{ targetDisplayName }</b>. Your new role will be <b>Admin</b>.</p>

      <div className={'flex justify-end space-x-2'}>
        <Modal.CancelButton onClick={() => setIsOpen(false)} />

        <Button
          type={'submit'}
          data-cy={'confirm-transfer-ownership-button'}
          variant={'destructive'}
          loading={pending}
        >
          <If
            condition={pending}
            fallback={"Transfer Ownership"}
          >
            Transferring ownership...
          </If>
        </Button>
      </div>
    </form>
  );
}

export default TransferOrganizationOwnershipModal;

function TransferOwnershipErrorAlert() {
  return (
    <Alert type={'error'}>
      <Alert.Heading>
        Sorry, we couldn&apos;t transfer ownership of your organization.
      </Alert.Heading>

      We encountered an error transferring ownership of your organization. Please try again.
    </Alert>
  );
}
