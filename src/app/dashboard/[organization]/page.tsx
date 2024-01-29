import loadDynamic from 'next/dynamic';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

import AppHeader from './components/AppHeader';
import { withI18n } from '~/i18n/with-i18n';
import Spinner from '~/core/ui/Spinner';
import Trans from '~/core/ui/Trans';
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
        <Trans i18nKey={'common:loading'} />
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
        title={<Trans i18nKey={'common:dashboardTabLabel'} />}
        description={<Trans i18nKey={'common:dashboardTabDescription'} />}
      >
        <Button size={'sm'} variant={'outline'}>
          <PlusCircleIcon className={'w-4 mr-2'} />

          <span>Add Widget</span>
        </Button>
      </AppHeader>

      <PageBody>
        <DashboardDemo />
      </PageBody>
    </>
  );
}

export default withI18n(DashboardPage);
