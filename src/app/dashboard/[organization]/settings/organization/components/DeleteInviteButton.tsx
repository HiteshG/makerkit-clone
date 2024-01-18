'use client';

import { useCallback, useState, useTransition } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import IconButton from '~/core/ui/IconButton';
import Modal from '~/core/ui/Modal';
import Button from '~/core/ui/Button';
import If from '~/core/ui/If';
import Alert from '~/core/ui/Alert';

import { deleteMemberAction } from '~/lib/memberships/actions';

const DeleteInviteButton: React.FCC<{
  membershipId: number;
  memberEmail: string;
}> = ({ membershipId, memberEmail }) => {
  return (
    <Modal
      heading={"Deleting Invite"}
      Trigger={
        <IconButton data-cy={'delete-invite-button'} label={'Delete Invite'}>
          <XMarkIcon className={'h-6'} />
        </IconButton>
      }
    >
      <DeleteInviteForm membershipId={membershipId} memberEmail={memberEmail} />
    </Modal>
  );
};

function DeleteInviteForm({
  membershipId,
  memberEmail,
}: {
  membershipId: number;
  memberEmail: string;
}) {
  const [isSubmitting, startTransition] = useTransition();
  const [error, setError] = useState<boolean>();

  const onInviteDeleteRequested = useCallback(async () => {
    startTransition(async () => {
      try {
        await deleteMemberAction({ membershipId });
      } catch (e) {
        setError(true);
      }
    });
  }, [membershipId]);

  return (
    <form>
      <div className={'flex flex-col space-y-4 text-sm'}>
        <p>You are deleting the invite to <b>{ memberEmail }</b></p>

        <p>
          Are you sure you want to continue?
        </p>

        <If condition={error}>
          <RemoveMemberErrorAlert />
        </If>

        <div className={'flex justify-end'}>
          <Button
            loading={isSubmitting}
            data-cy={'confirm-delete-invite-button'}
            variant={'destructive'}
            formAction={onInviteDeleteRequested}
          >
            Delete Invite
          </Button>
        </div>
      </div>
    </form>
  );
}

export default DeleteInviteButton;

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
