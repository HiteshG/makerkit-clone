import { OrganizationDangerZone } from './components/OrganizationDangerZone';
import UpdateOrganizationForm from './components/UpdateOrganizationForm';
import SettingsTile from '../components/SettingsTile';
import If from '~/core/ui/If';
import configuration from '~/configuration';

export const metadata = {
  title: 'Organization Details',
};

const allowOrganizationDelete =
  configuration.features.enableOrganizationDeletion;

const OrganizationSettingsPage = () => {
  return (
    <div className={'flex flex-col space-y-4'}>
      <SettingsTile
        heading={"General"}
        subHeading={"Manage your Organization"}
      >
        <UpdateOrganizationForm />
      </SettingsTile>

      <If condition={allowOrganizationDelete}>
        <SettingsTile
          heading={"Danger Zone"}
          subHeading={"Delete or leave your organization"}
        >
          <OrganizationDangerZone />
        </SettingsTile>
      </If>
    </div>
  );
};

export default OrganizationSettingsPage;
