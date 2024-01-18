'use client';

import Link from 'next/link';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/core/ui/Dropdown';

import If from '~/core/ui/If';
import Button from '~/core/ui/Button';

function UserActionsDropdown({
  uid,
  isBanned,
}: React.PropsWithChildren<{
  uid: string;
  isBanned: boolean;
}>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'}>
          <span className={'flex space-x-2.5 items-center'}>
            <span>Manage User</span>

            <EllipsisVerticalIcon className={'w-4'} />
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link href={`/admin/users/${uid}/impersonate`}>Impersonate</Link>
        </DropdownMenuItem>

        <If condition={!isBanned}>
          <DropdownMenuItem asChild>
            <Link
              className={'text-orange-500'}
              href={`/admin/users/${uid}/ban`}
            >
              Ban
            </Link>
          </DropdownMenuItem>
        </If>

        <If condition={isBanned}>
          <DropdownMenuItem asChild>
            <Link href={`/admin/users/${uid}/reactivate`}>Reactivate</Link>
          </DropdownMenuItem>
        </If>

        <DropdownMenuItem asChild>
          <Link className={'text-red-500'} href={`/admin/users/${uid}/delete`}>
            Delete
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserActionsDropdown;
