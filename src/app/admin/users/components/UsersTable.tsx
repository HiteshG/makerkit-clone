'use client';

import type { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { getI18n } from 'react-i18next';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';

import DataTable from '~/core/ui/DataTable';
import UserData from '~/core/session/types/user-data';
import { Avatar, AvatarFallback, AvatarImage } from '~/core/ui/Avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/core/ui/Tooltip';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '~/core/ui/Dropdown';

import IconButton from '~/core/ui/IconButton';
import Badge from '~/core/ui/Badge';
import If from '~/core/ui/If';
import Trans from '~/core/ui/Trans';
import { useTranslation } from 'react-i18next';

type UserRow = {
  id: string;
  email: string | undefined;
  phone: string | undefined;
  createdAt: string;
  updatedAt: string | undefined;
  lastSignInAt: string | undefined;
  banDuration: string | undefined;
  data: UserData;
};

function UsersTable({
  users,
  page,
  pageCount,
  perPage,
}: React.PropsWithChildren<{
  users: UserRow[];
  pageCount: number;
  page: number;
  perPage: number;
}>) {
  const { t } = useTranslation('admin');

  const columns: Array<ColumnDef<UserRow>> = [
    {
      header: '',
      id: 'avatar',
      size: 10,
      cell: ({ row }) => {
        const user = row.original;
        const data = user.data;
        const displayName = data?.displayName;
        const photoUrl = data?.photoUrl;
        const displayText = displayName ?? user.email ?? user.phone ?? '';
  
        return (
          <Tooltip>
            <TooltipTrigger>
              <Avatar>
                {photoUrl ? <AvatarImage src={photoUrl} /> : null}
                <AvatarFallback>{displayText[0]}</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
  
            <TooltipContent>{displayText}</TooltipContent>
          </Tooltip>
        );
      },
    },
    {
      header: t('admin:orgTableId'),
      id: 'id',
      size: 30,
      cell: ({ row }) => {
        const id = row.original.id;
  
        return (
          <Link className={'hover:underline'} href={`/admin/users/${id}`}>
            {id}
          </Link>
        );
      },
    },
    {
      header: t('admin:email'),
      id: 'email',
      cell: ({ row }) => {
        const email = row.original.email;
  
        return (
          <span title={email} className={'truncate max-w-full block'}>
            {email}
          </span>
        );
      },
    },
    {
      header: t('admin:orgTableName'),
      size: 50,
      id: 'displayName',
      cell: ({ row }) => {
        return row.original.data?.displayName ?? '';
      },
    },
    {
      header: t('admin:createdAt'),
      id: 'createdAt',
      cell: ({ row }) => {
        const date = new Date(row.original.createdAt);
        const i18n = getI18n();
        const language = i18n.language ?? 'en';
        const createdAtLabel = date.toLocaleDateString(language);
  
        return <span>{createdAtLabel}</span>;
      },
    },
    {
      header: t('admin:lastSignIn'),
      id: 'lastSignInAt',
      cell: ({ row }) => {
        const lastSignInAt = row.original.lastSignInAt;
  
        if (!lastSignInAt) {
          return <span>-</span>;
        }
  
        const date = new Date(lastSignInAt);
        return <span suppressHydrationWarning>{date.toLocaleString()}</span>;
      },
    },
    {
      header: t('admin:status'),
      id: 'status',
      cell: ({ row }) => {
        const banDuration = row.original.banDuration;
  
        if (!banDuration || banDuration === 'none') {
          return (
            <Badge size={'small'} className={'inline-flex'} color={'success'}>
              <Trans i18nKey={'admin:active'} />
            </Badge>
          );
        }
  
        return (
          <Badge size={'small'} className={'inline-flex'} color={'error'}>
            <Trans i18nKey={'admin:banned'} />
          </Badge>
        );
      },
    },
    {
      header: '',
      id: 'actions',
      cell: ({ row }) => {
        const user = row.original;
        const banDuration = row.original.banDuration;
        const isBanned = banDuration && banDuration !== 'none';
  
        return (
          <div className={'flex justify-end'}>
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
                <DropdownMenuLabel>
                  <Trans i18nKey={'admin:actions'} />
                </DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(user.id)}
                >
                  <Trans i18nKey={'admin:copyUserId'} />
                </DropdownMenuItem>
  
                <If condition={!isBanned}>
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/users/${user.id}/impersonate`}>
                      <Trans i18nKey={'admin:impersonateUser'} />
                    </Link>
                  </DropdownMenuItem>
  
                  <DropdownMenuItem asChild>
                    <Link
                      className={
                        'text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/5'
                      }
                      href={`/admin/users/${user.id}/ban`}
                    >
                      <Trans i18nKey={'admin:banUser'} />
                    </Link>
                  </DropdownMenuItem>
  
                  <DropdownMenuItem asChild>
                    <Link
                      className={
                        'text-red-500 hover:bg-red-50 dark:hover:bg-red-500/5'
                      }
                      href={`/admin/users/${user.id}/delete`}
                    >
                      <Trans i18nKey={'admin:deleteUser'} />
                    </Link>
                  </DropdownMenuItem>
                </If>
  
                <If condition={isBanned}>
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/users/${user.id}/reactivate`}>
                      <Trans i18nKey={'admin:reactivateUser'} />
                    </Link>
                  </DropdownMenuItem>
                </If>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  return (
    <DataTable
      tableProps={{
        'data-cy': 'admin-users-table',
      }}
      pageIndex={page - 1}
      pageSize={perPage}
      pageCount={pageCount}
      data={users}
      columns={columns}
    />
  );
}

export default UsersTable;
