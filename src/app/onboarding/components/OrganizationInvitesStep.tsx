import Heading from '~/core/ui/Heading';
import Trans from '~/core/ui/Trans';
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
        <Trans i18nKey={'common:continue'} />
      </Button>

      <Button
        data-cy={'skip-onboarding-step'}
        variant={'ghost'}
        type={'button'}
        onClick={() => onSubmit([])}
      >
        <Trans i18nKey={'common:skip'} />
      </Button>
    </div>
  );

  return (
    <div className={'flex w-full flex-1 flex-col space-y-12'}>
      <div className={'flex flex-col space-y-2'}>
        <Heading type={1}>
          <Trans i18nKey={'onboarding:inviteMembers'} />
        </Heading>

        <SubHeading>
          <span className={'text-base'}>
            <Trans i18nKey={'onboarding:inviteMembersDescription'} />
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
