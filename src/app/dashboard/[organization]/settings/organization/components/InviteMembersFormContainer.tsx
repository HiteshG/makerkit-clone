'use client';

import { useCallback, useTransition } from 'react';
import { toast } from 'sonner';

import useUserSession from '~/core/hooks/use-user-session';
import { inviteMembersToOrganizationAction } from '~/lib/organizations/actions';
import useCurrentOrganization from '~/lib/organizations/hooks/use-current-organization';
import MembershipRole from '~/lib/organizations/types/membership-role';
import InviteMembersForm from './InviteMembersForm';

import Button from '~/core/ui/Button';
import If from '~/core/ui/If';

const InviteMembersFormContainer = () => {
  const user = useUserSession();
  const organization = useCurrentOrganization();

  const [isSubmitting, startTransition] = useTransition();

  const onSubmit = useCallback(
    (
      invites: Array<{
        email: string;
        role: MembershipRole;
      }>,
    ) => {
      startTransition(async () => {
        if (!organization) {
          return;
        }

        const id = toast.loading("Inviting members...");

        try {
          await inviteMembersToOrganizationAction({
            invites,
            organizationUid: organization.uuid,
          });

          toast.success("Members invited successfully!", {
            id,
          });
        } catch (e) {
          toast.error("Sorry, we encountered an error! Please try again", {
            id,
          });
        }
      });
    },
    [organization],
  );

  const SubmitButton = (
    <div>
      <Button
        className={'w-full lg:w-auto'}
        data-cy={'send-invites-button'}
        type={'submit'}
        loading={isSubmitting}
      >
        <If condition={!isSubmitting}>
          Send Invites
        </If>

        <If condition={isSubmitting}>
          Inviting members...
        </If>
      </Button>
    </div>
  );

  return (
    <InviteMembersForm
      currentUserRole={user?.role}
      onSubmit={onSubmit}
      currentUserEmail={user?.auth.user.email}
      SubmitButton={SubmitButton}
    />
  );
};

export default InviteMembersFormContainer;
