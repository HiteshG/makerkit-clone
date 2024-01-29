'use client';

import { useCallback, useState, useTransition } from 'react';

import Trans from '~/core/ui/Trans';
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
      heading={<Trans i18nKey="organization:transferOwnership" />}
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

      <p>
        <Trans
          i18nKey={'organization:transferOwnershipDisclaimer'}
          values={{
            member: targetDisplayName,
          }}
          components={{ b: <b /> }}
        />
      </p>

      <p>
        <Trans i18nKey={'common:modalConfirmationQuestion'} />
      </p>

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
            fallback={<Trans i18nKey={'organization:transferOwnership'} />}
          >
            <Trans i18nKey={'organization:transferringOwnership'} />
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
        <Trans i18nKey={'organization:transferOrganizationErrorHeading'} />
      </Alert.Heading>

      <Trans i18nKey={'organization:transferOrganizationErrorMessage'} />
    </Alert>
  );
}
