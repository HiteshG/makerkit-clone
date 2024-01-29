'use client';

import type { User } from '@supabase/gotrue-js';
import { useMemo, useState } from 'react';
import { UserPlusIcon } from '@heroicons/react/24/outline';

import If from '~/core/ui/If';
import Badge from '~/core/ui/Badge';
import RoleBadge from './RoleBadge';
import Trans from '~/core/ui/Trans';
import Button from '~/core/ui/Button';
import { TextFieldInput } from '~/core/ui/TextField';

import { canUpdateUser } from '~/lib/organizations/permissions';
import OrganizationMembersActionsContainer from './OrganizationMembersActionsContainer';
import type UserData from '~/core/session/types/user-data';
import type MembershipRole from '~/lib/organizations/types/membership-role';
import ProfileAvatar from '~/components/ProfileAvatar';
import useUserId from '~/core/hooks/use-user-id';
import useUserCanInviteUsers from '~/lib/organizations/hooks/use-user-can-invite-users';
import { useTranslation } from 'react-i18next';

function OrganizationMembersList({
  members,
}: React.PropsWithChildren<{
  members: Array<{
    role: MembershipRole;
    membershipId: number;
    auth: User;
    data: UserData;
  }>;
}>) {
  const currentUserId = useUserId();
  const [search, setSearch] = useState('');
  const { t } = useTranslation('organization');

  const currentUser = useMemo(() => {
    return members.find((member) => {
      return member.auth.id === currentUserId;
    });
  }, [currentUserId, members]);

  if (!currentUser) {
    return null;
  }

  const userRole = currentUser.role;

  return (
    <div className={'w-full space-y-8'}>
      <div
        className={
          'flex flex-col space-y-4 lg:space-y-0 lg:flex-row justify-between' +
          ' lg:space-x-4 w-full'
        }
      >
        <TextFieldInput
          value={search}
          placeholder={t('organization:searchMembersPlaceholder')}
          className={'w-full'}
          onInput={(event: React.FormEvent<HTMLInputElement>) =>
            setSearch(event.currentTarget.value)
          }
        />

        <div className={'w-full flex justify-end lg:w-auto lg:min-w-[200px]'}>
          <InviteMembersLinkButton href={'members/invite'} />
        </div>
      </div>

      <div className="flex flex-col divide-y divide-gray-100 dark:divide-dark-800">
        {members.map((member) => {
          const userDisplayName = member.data.displayName ?? '';
          const userEmail = member.auth.email ?? '';

          const displayName = userDisplayName ? userDisplayName : userEmail;

          if (
            search &&
            !displayName.toLowerCase().includes(search) &&
            !userEmail.toLowerCase().includes(search)
          ) {
            return null;
          }

          const memberId = member.auth.id;
          const isCurrentUser = currentUserId === memberId;

          // check if user has the permissions to update another member of
          // the organization. If it returns false, the actions' dropdown
          // should be disabled
          const shouldEnableActions = canUpdateUser(userRole, member.role);
          const key = `${memberId}:${userRole}`;

          return (
            <div
              key={key}
              data-cy={'organization-member'}
              className={
                'flex flex-col py-2 lg:flex-row lg:items-center lg:space-x-2' +
                ' justify-between space-y-2 lg:space-y-0'
              }
            >
              <div className={'flex flex-auto items-center space-x-4'}>
                <div className={'flex items-center space-x-4'}>
                  <ProfileAvatar text={displayName} />

                  <div className={'block truncate text-sm'}>{displayName}</div>
                </div>

                <If condition={isCurrentUser}>
                  <Badge color={'info'} size={'small'}>
                    <Trans i18nKey={'organization:youBadgeLabel'} />
                  </Badge>
                </If>
              </div>

              <div className={'flex items-center justify-end space-x-4'}>
                <div>
                  <RoleBadge role={member.role} />
                </div>

                <OrganizationMembersActionsContainer
                  disabled={!shouldEnableActions}
                  targetMember={member}
                  currentUserRole={userRole}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrganizationMembersList;

function InviteMembersLinkButton(
  props: React.PropsWithChildren<{
    href: string;
  }>,
) {
  const canInviteUsers = useUserCanInviteUsers();

  if (!canInviteUsers) {
    return null;
  }

  return (
    <Button
      variant={'outline'}
      block
      data-cy={'invite-form-link'}
      type="button"
      href={props.href}
    >
      <UserPlusIcon className="h-5 mr-2" />

      <span>
        <Trans i18nKey={'organization:inviteMembersButtonLabel'} />
      </span>
    </Button>
  );
}
