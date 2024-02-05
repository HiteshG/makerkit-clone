import MobileAppNavigation from '~/components/MobileAppNavigation';
import { PageHeader } from '~/core/ui/Page';
import LanguageDropdownSwitcher from '~/components/LanguageDropdownSwitcher';

const AppHeader: React.FCC<{
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
}> = ({ children, title, description }) => {
  return (
    <PageHeader
      title={title}
      description={description}
      mobileNavigation={<MobileAppNavigation />}
    >
      {children}
      <div className="w-40">
        <LanguageDropdownSwitcher />
      </div>
    </PageHeader>
  );
};

export default AppHeader;
