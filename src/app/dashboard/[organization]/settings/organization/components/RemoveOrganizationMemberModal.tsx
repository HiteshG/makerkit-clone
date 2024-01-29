import { useCallback, useState, useTransition } from 'react';

import Trans from '~/core/ui/Trans';
import Button from '~/core/ui/Button';
import Modal from '~/core/ui/Modal';

import { deleteMemberAction } from '~/lib/memberships/actions';
import If from '~/core/ui/If';
import Alert from '~/core/ui/Alert';

const RemoveOrganizationMemberModal: React.FCC<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  membershipId: number;
}> = ({ isOpen, setIsOpen, membershipId }) => {
  return (
    <Modal
      heading={<Trans i18nKey="organization:removeMemberModalHeading" />}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <RemoveMemberForm setIsOpen={setIsOpen} membershipId={membershipId} />
    </Modal>
  );
};

export default RemoveOrganizationMemberModal;

function RemoveMemberForm({
  membershipId,
  setIsOpen,
}: {
  membershipId: number;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const [isSubmitting, startTransition] = useTransition();
  const [error, setError] = useState<boolean>();

  const onMemberRemoved = useCallback(() => {
    startTransition(async () => {
      try {
        await deleteMemberAction({ membershipId });

        setIsOpen(false);
      } catch (e) {
        setError(true);
      }
    });
  }, [membershipId, setIsOpen]);

  return (
    <form action={onMemberRemoved}>
      <div className={'flex flex-col space-y-6'}>
        <p className={'text-sm'}>
          <Trans i18nKey={'common:modalConfirmationQuestion'} />
        </p>

        <If condition={error}>
          <RemoveMemberErrorAlert />
        </If>

        <div className={'flex justify-end space-x-2'}>
          <Modal.CancelButton
            type={'button'}
            onClick={() => setIsOpen(false)}
          />

          <Button
            data-cy={'confirm-remove-member'}
            variant={'destructive'}
            loading={isSubmitting}
            onClick={onMemberRemoved}
          >
            <Trans i18nKey={'organization:removeMemberSubmitLabel'} />
          </Button>
        </div>
      </div>
    </form>
  );
}

function RemoveMemberErrorAlert() {
  return (
    <Alert type={'error'}>
      <Alert.Heading>
        <Trans i18nKey={'organization:removeMemberErrorHeading'} />
      </Alert.Heading>

      <Trans i18nKey={'organization:removeMemberErrorMessage'} />
    </Alert>
  );
}
