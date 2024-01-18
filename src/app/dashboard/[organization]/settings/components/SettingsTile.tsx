import { Section, SectionBody, SectionHeader } from '~/core/ui/Section';

const SettingsTile: React.FCC<{
  heading?: string | React.ReactNode;
  subHeading?: string | React.ReactNode;
}> = ({ children, heading, subHeading }) => {
  return (
    <Section>
      <SectionHeader title={heading} description={subHeading} />

      <SectionBody>{children}</SectionBody>
    </Section>
  );
};

export default SettingsTile;
