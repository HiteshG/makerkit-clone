import MembershipRole from '~/lib/organizations/types/membership-role';

const OWNER = {
  label: 'Owner',
  description: 'Can change any setting, invite new members and manage billing',
  value: MembershipRole.Owner,
};

const ADMIN = {
  label: 'Admin',
  description: 'Can change some settings, invite members, perform disruptive actions',
  value: MembershipRole.Admin,
};

const MEMBER = {
  label: 'Member',
  description: 'Cannot invite members or change settings',
  value: MembershipRole.Member,
};

const roles = [OWNER, ADMIN, MEMBER];

export default roles;
