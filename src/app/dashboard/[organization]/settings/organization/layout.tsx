import OrganizationSettingsTabs from '~/app/dashboard/[organization]/settings/organization/components/OrganizationSettingsTabs';
import SettingsContentContainer from '~/app/dashboard/[organization]/settings/components/SettingsContentContainer';
import { withI18n } from '~/i18n/with-i18n';

async function OrganizationSettingsLayout({
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
        <OrganizationSettingsTabs organizationId={params.organization} />
      </div>

      <SettingsContentContainer>{children}</SettingsContentContainer>
    </>
  );
}

export default withI18n(OrganizationSettingsLayout);
