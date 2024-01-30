import AdminHeader from '~/app/admin/components/AdminHeader';
import AdminGuard from '~/app/admin/components/AdminGuard';
import AdminDashboard from '~/app/admin/components/AdminDashboard';
import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';

import configuration from '~/configuration';
import { PageBody } from '~/core/ui/Page';
import { withI18n } from '~/i18n/with-i18n';
import Trans from '~/core/ui/Trans';

export const metadata = {
  title: `Admin | ${configuration.site.siteName}`,
};

async function AdminPage() {
  const data = await loadData();

  return (
    <div className={'flex flex-col flex-1'}>
      <AdminHeader>
        <Trans i18nKey={'admin:adminTab'} />
      </AdminHeader>

      <PageBody>
        <AdminDashboard data={data} />
      </PageBody>
    </div>
  );
}

export default withI18n(AdminGuard(AdminPage));

async function loadData() {
  const client = getSupabaseServerComponentClient({ admin: true });

  const { count: usersCount } = await client.from('users').select('*', {
    count: 'exact',
    head: true,
  });

  const { count: organizationsCount } = await client
    .from('organizations')
    .select('*', {
      count: 'exact',
      head: true,
    });

  const { count: activeSubscriptions } = await client
    .from('subscriptions')
    .select(`*`, {
      count: 'exact',
      head: true,
    })
    .eq('status', 'active');

  const { count: trialSubscriptions } = await client
    .from('subscriptions')
    .select(`*`, {
      count: 'exact',
      head: true,
    })
    .eq('status', 'trialing');

  return {
    usersCount: usersCount || 0,
    organizationsCount: organizationsCount || 0,
    activeSubscriptions: activeSubscriptions || 0,
    trialSubscriptions: trialSubscriptions || 0,
  };
}
