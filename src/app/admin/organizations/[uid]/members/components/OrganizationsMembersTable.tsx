'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

import { ColumnDef } from '@tanstack/react-table';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';

import Membership from '~/lib/organizations/types/membership';
import UserData from '~/core/session/types/user-data';
import DataTable from '~/core/ui/DataTable';
import RoleBadge from '~/app/dashboard/[organization]/settings/organization/components/RoleBadge';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/core/ui/Dropdown';

import IconButton from '~/core/ui/IconButton';
import { useTranslation } from 'react-i18next';
import Trans from '~/core/ui/Trans';

type Data = {
  id: Membership['id'];
  role: Membership['role'];
  user: {
    id: UserData['id'];
    displayName: UserData['displayName'];
  };
};

function OrganizationsMembersTable({
  memberships,
  page,
  perPage,
  pageCount,
}: React.PropsWithChildren<{
  memberships: Data[];
  page: number;
  perPage: number;
  pageCount: number;
}>) {
  const { t } = useTranslation('admin');

  const columns: ColumnDef<Data>[] = [
    {
      header: t('admin:membershipId'),
      id: 'id',
      accessorKey: 'id',
    },
    {
      header: t('admin:userId'),
      id: 'user-id',
      cell: ({ row }) => {
        const userId = row.original.user.id;
  
        return (
          <Link className={'hover:underline'} href={`/admin/users/${userId}`}>
            {userId}
          </Link>
        );
      },
    },
    {
      header: t('admin:orgTableName'),
      id: 'name',
      accessorKey: 'user.displayName',
    },
    {
      header: 'Role',
      cell: ({ row }) => {
        return (
          <div className={'inline-flex'}>
            <RoleBadge role={row.original.role} />
          </div>
        );
      },
    },
    {
      header: t('admin:actions'),
      cell: ({ row }) => {
        const membership = row.original;
        const userId = membership.user.id;
  
        return (
          <div className={'flex'}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <IconButton>
                  <span className="sr-only">
                    <Trans i18nKey={'admin:openMenu'} />
                  </span>
                  <EllipsisHorizontalIcon className="h-4 w-4" />
                </IconButton>
              </DropdownMenuTrigger>
  
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/admin/users/${userId}`}>
                    <Trans i18nKey={'admin:viewUser'} />
                  </Link>
                </DropdownMenuItem>
  
                <DropdownMenuItem asChild>
                  <Link href={`/admin/users/${userId}/impersonate`}>
                    <Trans i18nKey={'admin:impersonateUser'} />
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  const data = memberships.filter((membership) => {
    return membership.user;
  });

  const router = useRouter();
  const path = usePathname();

  return (
    <DataTable
      tableProps={{
        'data-cy': 'admin-organization-members-table',
      }}
      onPaginationChange={({ pageIndex }) => {
        const { pathname } = new URL(path, window.location.origin);
        const page = pageIndex + 1;

        router.push(pathname + '?page=' + page);
      }}
      pageCount={pageCount}
      pageIndex={page - 1}
      pageSize={perPage}
      columns={columns}
      data={data}
    />
  );
}

export default OrganizationsMembersTable;
