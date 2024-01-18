import { useCallback, useState, useTransition } from 'react';

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
      heading={"You are removing this user"}
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
          Are you sure you want to continue?
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
            Remove User from Organization
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
        Sorry, we couldn&apos;t remove the selected member.
      </Alert.Heading>

      Sorry, we encountered an error. Please try again
    </Alert>
  );
}
