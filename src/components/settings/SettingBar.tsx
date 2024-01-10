import React from 'react';
import Link from "next/link";
import { useRouter } from 'next/router';
import { cn } from '@/lib/utils';

const SettingBar = () => {
  return (
    <ul className="w-full dark:text-gray-300 items-center flex-wrap flex lg:space-x-3 border-b border-gray-100 dark:border-dark-800 pb-1.5">
      <SettingBarMenu link={"/settings/profile"}>Profile</SettingBarMenu>
      <SettingBarMenu link={"/settings/organization"}>Organization</SettingBarMenu>
      <SettingBarMenu link={"/settings/subscription"}>Subscription</SettingBarMenu>
    </ul>
  );
}

const SettingBarMenu = ({
  link,
  children,
} : {
  link: string,
  children?: React.ReactNode
}) => {
  const router = useRouter();

  const active = router.pathname.startsWith(link);

  return (
    <li className={cn(
      "flex items-center justify-center font-medium lg:justify-start rounded-md text-sm transition colors transform active:*:translate-y-[2px] *:p-1 *:lg:px-2.5 *:w-full *:h-full *:flex *:items-center relative h-10 flex-1 lg:flex-none",
      active ? "text-gray-800 dark:text-white top-[0.4rem] border-b-[0.25rem] rounded-none border-primary bg-transparent pb-[0.55rem] text-primary-700" : "active:text-current text-gray-600 dark:text-gray-300 hover:text-current dark:hover:text-white hover:bg-gray-50 active:bg-gray-100 dark:active:bg-dark-800 dark:hover:bg-dark/90 transition-colors rounded-lg border-transparent",
    )}>
      <Link href={link} className="transition-transform duration-500">
        {children}
      </Link>
    </li>
  )
}

export default SettingBar;
