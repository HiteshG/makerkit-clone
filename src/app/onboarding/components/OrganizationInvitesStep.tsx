import Heading from '~/core/ui/Heading';
import SubHeading from '~/core/ui/SubHeading';
import Button from '~/core/ui/Button';
import useUserSession from '~/core/hooks/use-user-session';
import MembershipRole from '~/lib/organizations/types/membership-role';

import InviteMembersForm from '~/app/dashboard/[organization]/settings/organization/components/InviteMembersForm';

type OrganizationInvitesStepData = Array<{
  email: string;
  role: MembershipRole;
}>;

function OrganizationInvitesStep({
  onSubmit,
}: {
  onSubmit: (data: OrganizationInvitesStepData) => void;
}) {
  const user = useUserSession();
  const userEmail = user?.auth.user.email;

  const SubmitButton = (
    <div className={'flex flex-col space-y-2'}>
      <Button type={'submit'}>
        Continue
      </Button>

      <Button
        data-cy={'skip-onboarding-step'}
        variant={'ghost'}
        type={'button'}
        onClick={() => onSubmit([])}
      >
        Skip
      </Button>
    </div>
  );

  return (
    <div className={'flex w-full flex-1 flex-col space-y-12'}>
      <div className={'flex flex-col space-y-2'}>
        <Heading type={1}>
          Invite members
        </Heading>

        <SubHeading>
          <span className={'text-base'}>
            Invite your team members to join your organization.
          </span>
        </SubHeading>
      </div>

      <div className={'flex flex-1 flex-col space-y-2'}>
        <InviteMembersForm
          currentUserRole={MembershipRole.Owner}
          SubmitButton={SubmitButton}
          currentUserEmail={userEmail}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}

export default OrganizationInvitesStep;
