import Trans from '~/core/ui/Trans';

import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '~/core/ui/Select';

import type MembershipRole from '~/lib/organizations/types/membership-role';
import roles from '~/lib/organizations/roles';
import { canInviteUser } from '~/lib/organizations/permissions';

const MembershipRoleSelector: React.FCC<{
  value?: MembershipRole;
  onChange?: (role: MembershipRole) => unknown;
  targetUserRole?: MembershipRole;
  currentUserRole: Maybe<MembershipRole>;
}> = ({ value, onChange, currentUserRole, targetUserRole }) => {
  const selectedRole = getSelectedRoleModel(value);

  const allowedRoles = roles.filter((role) => {
    if (currentUserRole === undefined || targetUserRole === role.value) {
      return false;
    }

    return canInviteUser(currentUserRole, role.value);
  });

  return (
    <Select
      value={selectedRole.value.toString()}
      onValueChange={(value) => {
        onChange && onChange(Number(value));
      }}
    >
      <SelectTrigger data-cy={'role-selector-trigger'}>
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {allowedRoles.map((role) => {
          return (
            <SelectItem
              key={role.value}
              data-cy={`role-item-${role.value}`}
              value={role.value.toString()}
            >
              <span className={'text-sm'}>
                <Trans i18nKey={role.label} />
              </span>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

function getSelectedRoleModel(currentRole: MembershipRole | undefined) {
  const memberRole = roles[2];

  return (
    roles.find((role) => {
      return role.value === currentRole;
    }) ?? memberRole
  );
}

export default MembershipRoleSelector;
