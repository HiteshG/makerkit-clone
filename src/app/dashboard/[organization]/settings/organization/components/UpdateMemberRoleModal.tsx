import { useCallback, useState, useTransition } from 'react';
import Trans from '~/core/ui/Trans';

import Button from '~/core/ui/Button';
import Modal from '~/core/ui/Modal';
import If from '~/core/ui/If';
import Alert from '~/core/ui/Alert';

import type MembershipRole from '~/lib/organizations/types/membership-role';
import { updateMemberAction } from '~/lib/memberships/actions';

import MembershipRoleSelector from './MembershipRoleSelector';
import useCurrentUserRole from '~/lib/organizations/hooks/use-current-user-role';

const UpdateMemberRoleModal: React.FCC<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  membershipId: number;
  memberRole: MembershipRole;
}> = ({ isOpen, setIsOpen, memberRole, membershipId }) => {
  return (
    <Modal
      heading={<Trans i18nKey={'organization:updateMemberRoleModalHeading'} />}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <UpdateMemberForm
        setIsOpen={setIsOpen}
        memberRole={memberRole}
        membershipId={membershipId}
      />
    </Modal>
  );
};

function UpdateMemberForm({
  membershipId,
  setIsOpen,
  memberRole,
}: React.PropsWithChildren<{
  membershipId: number;
  memberRole: MembershipRole;
  setIsOpen: (isOpen: boolean) => void;
}>) {
  const [role, setRole] = useState<MembershipRole>(memberRole);
  const [isSubmitting, startTransition] = useTransition();
  const currentUserRole = useCurrentUserRole();
  const [error, setError] = useState<boolean>();

  const onRoleUpdated = useCallback(async () => {
    if (role !== undefined) {
      startTransition(async () => {
        try {
          await updateMemberAction({ membershipId, role });

          setIsOpen(false);
        } catch (e) {
          setError(true);
        }
      });
    }
  }, [membershipId, role, setIsOpen]);

  return (
    <div className={'flex flex-col space-y-6'}>
      <MembershipRoleSelector
        targetUserRole={memberRole}
        currentUserRole={currentUserRole}
        value={role}
        onChange={setRole}
      />

      <If condition={error}>
        <UpdateRoleErrorAlert />
      </If>

      <div className={'flex justify-end space-x-2'}>
        <Modal.CancelButton onClick={() => setIsOpen(false)} />

        <Button
          type={'button'}
          data-cy={'confirm-update-member-role'}
          loading={isSubmitting}
          onClick={onRoleUpdated}
        >
          <Trans i18nKey={'organization:updateRoleSubmitLabel'} />
        </Button>
      </div>
    </div>
  );
}

export default UpdateMemberRoleModal;

function UpdateRoleErrorAlert() {
  return (
    <Alert type={'error'}>
      <Alert.Heading>
        <Trans i18nKey={'organization:updateRoleErrorHeading'} />
      </Alert.Heading>

      <Trans i18nKey={'organization:updateRoleErrorMessage'} />
    </Alert>
  );
}
