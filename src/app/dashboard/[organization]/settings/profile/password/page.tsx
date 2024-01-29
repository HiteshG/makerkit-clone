import { withI18n } from '~/i18n/with-i18n';
import { Section, SectionBody, SectionHeader } from '~/core/ui/Section';
import Trans from '~/core/ui/Trans';
import UpdatePasswordFormContainer from '../components/UpdatePasswordFormContainer';

export const metadata = {
  title: 'Update Password',
};

const ProfilePasswordSettingsPage = () => {
  return (
    <Section>
      <SectionHeader
        title={<Trans i18nKey={'profile:passwordTab'} />}
        description={<Trans i18nKey={'profile:passwordTabSubheading'} />}
      />
      <SectionBody>
        <UpdatePasswordFormContainer />
      </SectionBody>
    </Section>
  );
};

export default withI18n(ProfilePasswordSettingsPage);
