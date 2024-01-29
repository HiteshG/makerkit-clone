import Trans from '~/core/ui/Trans';
import { withI18n } from '~/i18n/with-i18n';
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
        heading={<Trans i18nKey={'organization:generalTabLabel'} />}
        subHeading={
          <Trans i18nKey={'organization:generalTabLabelSubheading'} />
        }
      >
        <UpdateOrganizationForm />
      </SettingsTile>

      <If condition={allowOrganizationDelete}>
        <SettingsTile
          heading={<Trans i18nKey={'organization:dangerZone'} />}
          subHeading={<Trans i18nKey={'organization:dangerZoneSubheading'} />}
        >
          <OrganizationDangerZone />
        </SettingsTile>
      </If>
    </div>
  );
};

export default withI18n(OrganizationSettingsPage);
