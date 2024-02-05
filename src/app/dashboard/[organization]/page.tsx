import loadDynamic from 'next/dynamic';

import AppHeader from './components/AppHeader';
import { withI18n } from '~/i18n/with-i18n';
import Spinner from '~/core/ui/Spinner';
import Trans from '~/core/ui/Trans';
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
      />

      <PageBody>
        <DashboardDemo />
      </PageBody>
    </>
  );
}

export default withI18n(DashboardPage);
