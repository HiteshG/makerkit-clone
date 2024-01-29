import SettingsTile from '../../components/SettingsTile';
import UpdateEmailFormContainer from '../components/UpdateEmailFormContainer';
import Trans from '~/core/ui/Trans';
import { withI18n } from '~/i18n/with-i18n';

export const metadata = {
  title: 'Update Email',
};

const ProfileEmailSettingsPage = () => {
  return (
    <SettingsTile
      heading={<Trans i18nKey={'profile:emailTab'} />}
      subHeading={<Trans i18nKey={'profile:emailTabTabSubheading'} />}
    >
      <UpdateEmailFormContainer />
    </SettingsTile>
  );
};

export default withI18n(ProfileEmailSettingsPage);
