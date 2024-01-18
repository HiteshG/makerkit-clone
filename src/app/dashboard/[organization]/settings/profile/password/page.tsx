import { Section, SectionBody, SectionHeader } from '~/core/ui/Section';
import UpdatePasswordFormContainer from '../components/UpdatePasswordFormContainer';

export const metadata = {
  title: 'Update Password',
};

const ProfilePasswordSettingsPage = () => {
  return (
    <Section>
      <SectionHeader
        title={"Password"}
        description={"Update your password"}
      />
      <SectionBody>
        <UpdatePasswordFormContainer />
      </SectionBody>
    </Section>
  );
};

export default ProfilePasswordSettingsPage;
