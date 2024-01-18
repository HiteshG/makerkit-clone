import OrganizationSettingsTabs from '~/app/dashboard/[organization]/settings/organization/components/OrganizationSettingsTabs';
import SettingsContentContainer from '~/app/dashboard/[organization]/settings/components/SettingsContentContainer';

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

export default OrganizationSettingsLayout;
