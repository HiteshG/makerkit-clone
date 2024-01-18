import ArrowLeftIcon from '@heroicons/react/24/outline/ArrowLeftIcon';

import SettingsTile from '~/app/dashboard/[organization]/settings/components/SettingsTile';
import Button from '~/core/ui/Button';
import InviteMembersFormContainer from '../../components/InviteMembersFormContainer';

export const metadata = {
  title: 'Invite Members',
};

const OrganizationMembersInvitePage = () => {
  return (
    <>
      <SettingsTile
        heading={"Invite Members"}
        subHeading={"Invite members to your organization"}
      >
        <InviteMembersFormContainer />
      </SettingsTile>

      <div className={'mt-4'}>
        <GoBackToMembersButton />
      </div>
    </>
  );
};

export default OrganizationMembersInvitePage;

function GoBackToMembersButton() {
  return (
    <Button size={'small'} variant={'ghost'} href={'../members'}>
      <span className={'flex items-center space-x-1'}>
        <ArrowLeftIcon className={'h-3'} />

        <span>
          Go back to members
        </span>
      </span>
    </Button>
  );
}
