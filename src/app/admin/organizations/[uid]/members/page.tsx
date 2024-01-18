import { use } from 'react';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

import AdminHeader from '~/app/admin/components/AdminHeader';
import { getMembershipsByOrganizationUid } from '~/app/admin/organizations/queries';
import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';
import OrganizationsMembersTable from '~/app/admin/organizations/[uid]/members/components/OrganizationsMembersTable';
import getPageFromQueryParams from '~/app/admin/utils/get-page-from-query-param';

import configuration from '~/configuration';
import { PageBody } from '~/core/ui/Page';

interface AdminMembersPageParams {
  params: {
    uid: string;
  };

  searchParams: {
    page?: string;
  };
}

export const metadata = {
  title: `Members | ${configuration.site.siteName}`,
};

function AdminMembersPage(params: AdminMembersPageParams) {
  const adminClient = getSupabaseServerComponentClient({ admin: true });
  const uid = params.params.uid;
  const perPage = 20;
  const page = getPageFromQueryParams(params.searchParams.page);

  const { data: memberships, count } = use(
    getMembershipsByOrganizationUid(adminClient, { uid, page, perPage }),
  );

  const pageCount = count ? Math.ceil(count / perPage) : 0;

  return (
    <div className={'flex flex-col flex-1'}>
      <AdminHeader>Manage Members</AdminHeader>

      <PageBody>
        <div className={'flex flex-col space-y-4'}>
          <Breadcrumbs />

          <OrganizationsMembersTable
            page={page}
            perPage={perPage}
            pageCount={pageCount}
            memberships={memberships}
          />
        </div>
      </PageBody>
    </div>
  );
}

export default AdminMembersPage;

function Breadcrumbs() {
  return (
    <div className={'flex space-x-2 items-center p-2 text-xs'}>
      <div className={'flex space-x-1.5 items-center'}>
        <Link href={'/admin'}>Admin</Link>
      </div>

      <ChevronRightIcon className={'w-3'} />

      <Link href={'/admin/organizations'}>Organizations</Link>

      <ChevronRightIcon className={'w-3'} />

      <span>Members</span>
    </div>
  );
}
