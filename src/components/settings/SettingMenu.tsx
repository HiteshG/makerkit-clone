import React from 'react';
import Link from "next/link";
import { useRouter } from 'next/router';
import { cn } from '@/lib/utils';

export const SettingMenu = ({
    children,
} : {
    children: React.ReactNode,
}) => {
  return (
    <div className="w-full dark:text-gray-300 items-center flex-wrap flex justify-between space-x-2 lg:flex-col lg:justify-start lg:space-x-0 lg:space-y-1">
      {children}
    </div>
  );
}

export const SettingMenuItem = ({
  link,
  end = false,
  children,
} : {
  link: string,
  end?: boolean,
  children?: React.ReactNode
}) => {
  const router = useRouter();
  const pathName = router.pathname;

  const active = end ? router.pathname === link : pathName.startsWith(link);

  return (
    <li className={cn(
      "flex items-center justify-center font-medium lg:justify-start rounded-md text-sm transition colors transform active:*:translate-y-[2px] *:p-1 *:lg:px-2.5 *:w-full *:h-full *:flex *:items-center [&>*]:py-2 w-full",
      active ? "text-gray-800 dark:text-white bg-gray-50 dark:bg-primary-300/10" : "active:text-current text-gray-600 hover:text-current dark:hover:text-white hover:bg-gray-50 active:bg-gray-100 dark:text-gray-300 dark:hover:bg-background dark:active:bg-dark-900/90"
    )}>
      <Link href={link} className="transition-transform duration-500">
        {children}
      </Link>
    </li>
  )
}
