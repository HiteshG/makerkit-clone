import MembershipRole from '~/lib/organizations/types/membership-role';

export function canUpdateUser(
  currentUserRole: MembershipRole,
  targetUser: MembershipRole
) {
  return currentUserRole > targetUser;
}

export function canChangeBilling(currentUserRole: MembershipRole) {
  return currentUserRole === MembershipRole.Owner;
}

export function canInviteUsers(currentUserRole: MembershipRole) {
  return currentUserRole >= MembershipRole.Admin;
}

export function canInviteUser(
  inviterRole: MembershipRole,
  inviteeRole: MembershipRole
) {
  const canInvite = canInviteUsers(inviterRole);
  const hasGreaterRole = inviterRole >= inviteeRole;
  const isNotOwner = inviteeRole !== MembershipRole.Owner;

  return canInvite && hasGreaterRole && isNotOwner;
}

export function canDeleteInvites(inviterRole: MembershipRole) {
  return canInviteUsers(inviterRole);
}
