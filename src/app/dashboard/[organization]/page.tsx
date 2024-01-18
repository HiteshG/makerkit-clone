import loadDynamic from 'next/dynamic';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

import AppHeader from './components/AppHeader';
import Spinner from '~/core/ui/Spinner';
import Button from '~/core/ui/Button';
import { PageBody } from '~/core/ui/Page';

const DashboardDemo = loadDynamic(() => import('./components/DashboardDemo'), {
  ssr: false,
  loading: () => (
    <div
      className={
        'flex flex-1 items-center h-full justify-center flex-col space-y-4'
      }
    >
      <Spinner className={'text-primary'} />

      <div>
        Loading. Please wait...
      </div>
    </div>
  ),
});

export const metadata = {
  title: 'Dashboard',
};

function DashboardPage() {
  return (
    <>
      <AppHeader
        title={"Dashboard"}
        description={"An overview of your organization's activity and performance across all your projects."}
      />

      <PageBody>
        <DashboardDemo />
      </PageBody>
    </>
  );
}

export default DashboardPage;
