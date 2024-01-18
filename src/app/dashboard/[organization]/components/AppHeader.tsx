import MobileAppNavigation from '~/components/MobileAppNavigation';
import { PageHeader } from '~/core/ui/Page';

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
    </PageHeader>
  );
};

export default AppHeader;
