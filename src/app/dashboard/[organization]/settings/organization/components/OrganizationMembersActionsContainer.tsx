import { useState } from 'react';
import type { User } from '@supabase/gotrue-js';

import MembershipRole from '~/lib/organizations/types/membership-role';
import type UserData from '~/core/session/types/user-data';
import If from '~/core/ui/If';

import OrganizationMemberActionsDropdown from './OrganizationMemberActionsDropdown';
import RemoveOrganizationMemberModal from './RemoveOrganizationMemberModal';
import UpdateMemberRoleModal from './UpdateMemberRoleModal';

import TransferOrganizationOwnershipModal from '../components/TransferOrganizationOwnershipModal';

const OrganizationMembersActionsContainer: React.FCC<{
  targetMember: {
    role: MembershipRole;
    membershipId: number;
    auth: User;
    data: UserData;
  };
  currentUserRole: MembershipRole;
  disabled: boolean;
}> = (props) => {
  const [isUpdatingRole, setIsUpdatingRole] = useState(false);
  const [isRemovingUser, setIsRemovingUser] = useState(false);
  const [isTransferringOwnership, setIsTransferringOwnership] = useState(false);

  const isOwner = props.currentUserRole === MembershipRole.Owner;

  const targetDisplayName =
    props.targetMember.data.displayName ?? props.targetMember.auth.email ?? '';

  return (
    <>
      <OrganizationMemberActionsDropdown
        disabled={props.disabled}
        isOwner={isOwner}
        onRemoveSelected={() => setIsRemovingUser(true)}
        onChangeRoleSelected={() => setIsUpdatingRole(true)}
        onTransferOwnershipSelected={() => setIsTransferringOwnership(true)}
      />

      <RemoveOrganizationMemberModal
        setIsOpen={setIsRemovingUser}
        isOpen={isRemovingUser}
        membershipId={props.targetMember.membershipId}
      />

      <UpdateMemberRoleModal
        setIsOpen={setIsUpdatingRole}
        isOpen={isUpdatingRole}
        membershipId={props.targetMember.membershipId}
        memberRole={props.targetMember.role}
      />

      <If condition={isOwner}>
        <TransferOrganizationOwnershipModal
          setIsOpen={setIsTransferringOwnership}
          isOpen={isTransferringOwnership}
          membershipId={props.targetMember.membershipId}
          targetDisplayName={targetDisplayName}
        />
      </If>
    </>
  );
};

export default OrganizationMembersActionsContainer;
