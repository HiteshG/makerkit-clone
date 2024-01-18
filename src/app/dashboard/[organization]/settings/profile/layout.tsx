import ProfileSettingsTabs from './components/ProfileSettingsTabs';
import SettingsContentContainer from '../components/SettingsContentContainer';

function ProfileSettingsLayout({
  children,
  params,
}: React.PropsWithChildren<{
  params: {
    organization: string;
  };
}>) {
  return (
    <>
      <div>
        <ProfileSettingsTabs organizationId={params.organization} />
      </div>

      <SettingsContentContainer>{children}</SettingsContentContainer>
    </>
  );
}

export default ProfileSettingsLayout;
