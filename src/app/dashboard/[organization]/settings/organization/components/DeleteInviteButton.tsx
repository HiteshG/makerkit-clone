'use client';

import { useCallback, useState, useTransition } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import IconButton from '~/core/ui/IconButton';
import Modal from '~/core/ui/Modal';
import Button from '~/core/ui/Button';
import Trans from '~/core/ui/Trans';
import If from '~/core/ui/If';
import Alert from '~/core/ui/Alert';

import { deleteMemberAction } from '~/lib/memberships/actions';

const DeleteInviteButton: React.FCC<{
  membershipId: number;
  memberEmail: string;
}> = ({ membershipId, memberEmail }) => {
  return (
    <Modal
      heading={<Trans i18nKey={'organization:deleteInviteModalHeading'} />}
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
        <p>
          <Trans
            i18nKey={'organization:confirmDeletingMemberInvite'}
            values={{ email: memberEmail }}
            components={{ b: <b /> }}
          />
        </p>

        <p>
          <Trans i18nKey={'common:modalConfirmationQuestion'} />
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
            <Trans i18nKey={'organization:deleteInviteSubmitLabel'} />
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
        <Trans i18nKey={'organization:removeMemberErrorHeading'} />
      </Alert.Heading>

      <Trans i18nKey={'organization:removeMemberErrorMessage'} />
    </Alert>
  );
}
