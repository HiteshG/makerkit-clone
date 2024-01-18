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

type Data = {
  id: Membership['id'];
  role: Membership['role'];
  user: {
    id: UserData['id'];
    displayName: UserData['displayName'];
  };
};

const columns: ColumnDef<Data>[] = [
  {
    header: 'Membership ID',
    id: 'id',
    accessorKey: 'id',
  },
  {
    header: 'User ID',
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
    header: 'Name',
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
    header: 'Actions',
    cell: ({ row }) => {
      const membership = row.original;
      const userId = membership.user.id;

      return (
        <div className={'flex'}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <IconButton>
                <span className="sr-only">Open menu</span>
                <EllipsisHorizontalIcon className="h-4 w-4" />
              </IconButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/admin/users/${userId}`}>View User</Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href={`/admin/users/${userId}/impersonate`}>
                  Impersonate User
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

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
