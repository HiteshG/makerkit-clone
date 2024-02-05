'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { useMemo } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

import {
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenu,
} from '~/core/ui/Dropdown';

import Trans from '~/core/ui/Trans';
import Button from '~/core/ui/Button';

const MobileNavigationDropdown: React.FC<{
  links: Array<{
    path: string;
    label: string;
  }>;
}> = ({ links }) => {
  const path = usePathname();

  const currentPathName = useMemo(() => {
    return Object.values(links).find((link) => link.path === path)?.label;
  }, [links, path]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'secondary'} block>
          <span
            className={'flex w-full items-center justify-between space-x-2'}
          >
            <span>
              <Trans i18nKey={currentPathName} defaults={currentPathName} />
            </span>

            <ChevronDownIcon className={'h-5'} />
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className={
          'divide-y divide-gray-100 dark:divide-dark-700 w-screen' +
          ' rounded-none'
        }
      >
        {Object.values(links).map((link) => {
          return (
            <DropdownMenuItem asChild key={link.path}>
              <Link
                className={'flex h-12 w-full items-center'}
                href={link.path}
              >
                <Trans i18nKey={link.label} defaults={link.label} />
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileNavigationDropdown;
