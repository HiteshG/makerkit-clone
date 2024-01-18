import SettingsTile from '../../components/SettingsTile';
import UpdateEmailFormContainer from '../components/UpdateEmailFormContainer';

export const metadata = {
  title: 'Update Email',
};

const ProfileEmailSettingsPage = () => {
  return (
    <SettingsTile
      heading={"Email"}
      subHeading={"Update your email address"}
    >
      <UpdateEmailFormContainer />
    </SettingsTile>
  );
};

export default ProfileEmailSettingsPage;
