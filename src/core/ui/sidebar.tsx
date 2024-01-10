import React from 'react';
import Link from "next/link";
import { useRouter } from 'next/router';
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/core/ui/collapsible";
import { cn } from '@/lib/utils';

const SidebarContext = React.createContext(false);

const Sidebar = ({
  collapsed,
  children,
} : {
  collapsed: boolean,
  children: React.ReactNode,
}) => {
  return (
    <SidebarContext.Provider value={collapsed}>
      <div className="hidden lg:block">
        <div className={cn(
          "relative hidden h-screen flex-col border-r  border-gray-100 dark:border-dark-800 lg:flex space-y-4",
          collapsed ? "w-[5rem]" : "w-2/12 max-w-xs sm:min-w-[12rem] lg:min-w-[17rem]"
        )}>
          {children}
        </div>
      </div>
    </SidebarContext.Provider>
  );
}

const SidebarContent = ({
  children,
} : {
  children: React.ReactNode,
}) => {
  return (
    <div className="flex w-full flex-col space-y-1 px-container h-[calc(100%-160px)] overflow-y-auto">
      {children}
    </div>
  )
}

const SidebarGroup = ({
  label,
  collapsible,
  collapsed,
  children,
} : {
  label: string,
  collapsible: boolean,
  collapsed: boolean,
  children: React.ReactNode,
}) => {
  const [isOpen, setIsOpen] = React.useState(!collapsed);
  const sidebarCollapsed = React.useContext(SidebarContext);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <div className="flex flex-col space-y-1 py-1">
        <div className={cn(
          "group flex items-center justify-between px-container space-x-2.5",
          !sidebarCollapsed ? "py-2.5 text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" : "",
        )}>
          {!sidebarCollapsed && <span className="text-xs font-semibold uppercase">
            {label}
          </span>}
          {collapsible && <CollapsibleTrigger asChild>
            <ChevronDown className={cn("w-5", isOpen ? "rotate-180" : "rotate-0")} />
          </CollapsibleTrigger>}
        </div>
        <CollapsibleContent className="flex flex-col space-y-1.5">
          {children}
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}

const SidebarItem = ({
  path,
  icon,
  end = false,
  children,
} : {
  path: string,
  icon: React.ReactElement,
  end?: boolean,
  children: React.ReactNode,
}) => {
  const router = useRouter();
  const pathName = router.pathname;

  const sidebarCollapsed = React.useContext(SidebarContext);
  const active = end ? pathName === path : pathName.startsWith(path);

  return (
    <Link
      href={path}
      className={cn(
        "flex w-full items-center rounded-md border-transparent text-sm font-base transition-colors duration-300 ",
        !sidebarCollapsed ? "py-2 px-3 pr-12 space-x-2.5" : "justify-center py-2 [&>span]:hidden",
        active ? "bg-primary/5 font-medium dark:bg-dark-800 text-primary-700 dark:text-white dark:bg-primary-300/10" : "ring-transparent hover:bg-gray-50 dark:hover:bg-dark-800/40 active:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:active:bg-dark-700"
      )}
    >
      {icon}
      <span>{children}</span>
    </Link>
  )
}

export { Sidebar, SidebarGroup, SidebarContent, SidebarItem };
