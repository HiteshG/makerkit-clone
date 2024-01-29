import ProfileSettingsTabs from './components/ProfileSettingsTabs';
import SettingsContentContainer from '../components/SettingsContentContainer';
import { withI18n } from '~/i18n/with-i18n';

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

export default withI18n(ProfileSettingsLayout);
