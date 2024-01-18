'use client';

import React, { useContext, useId, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import classNames from 'clsx';
import { cva } from 'cva';

import { cn } from '~/core/generic/shadcn-utils';

import If from '~/core/ui/If';
import { TooltipContent, Tooltip, TooltipTrigger } from '~/core/ui/Tooltip';
import SidebarContext from '~/lib/contexts/sidebar';
import isRouteActive from '~/core/generic/is-route-active';

export function Sidebar({
  children,
  collapsed = false,
}: React.PropsWithChildren<{
  collapsed?: boolean;
}>) {
  const className = getClassNameBuilder()({
    collapsed,
  });

  return <div className={className}>{children}</div>;
}

export function SidebarContent({
  children,
  className,
}: React.PropsWithChildren<{
  className?: string;
}>) {
  return (
    <div
      className={cn(
        'flex w-full flex-col space-y-1 px-container space-y-1.5',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SidebarGroup({
  label,
  collapsed = false,
  collapsible = true,
  children,
}: React.PropsWithChildren<{
  label: string | React.ReactNode;
  collapsible?: boolean;
  collapsed?: boolean;
}>) {
  const { collapsed: sidebarCollapsed } = useContext(SidebarContext);
  const [isGroupCollapsed, setIsGroupCollapsed] = useState(collapsed);
  const id = useId();

  const Title = (props: React.PropsWithChildren) => {
    if (sidebarCollapsed) {
      return null;
    }

    return (
      <span
        className={
          'text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'
        }
      >
        {props.children}
      </span>
    );
  };

  const Wrapper = () => {
    const className = classNames(
      'group flex items-center justify-between px-container space-x-2.5',
      {
        'py-2.5': !sidebarCollapsed,
      },
    );

    if (collapsible) {
      return (
        <button
          aria-expanded={!isGroupCollapsed}
          aria-controls={id}
          onClick={() => setIsGroupCollapsed(!isGroupCollapsed)}
          className={className}
        >
          <Title>{label}</Title>

          <If condition={collapsible}>
            <ChevronDownIcon
              className={classNames(`transition duration-300 h-3`, {
                'rotate-180': !isGroupCollapsed,
              })}
            />
          </If>
        </button>
      );
    }

    return (
      <div className={className}>
        <Title>{label}</Title>
      </div>
    );
  };

  return (
    <div className={'flex flex-col space-y-1 py-1'}>
      <Wrapper />

      <If condition={collapsible ? !isGroupCollapsed : true}>
        <div id={id} className={'flex flex-col space-y-1.5'}>
          {children}
        </div>
      </If>
    </div>
  );
}

export function SidebarDivider() {
  return (
    <div className={'border-t border-gray-100 dark:border-dark-800 my-2'} />
  );
}

export function SidebarItem({
  end,
  path,
  children,
  Icon,
}: React.PropsWithChildren<{
  path: string;
  Icon: React.ElementType;
  end?: boolean;
}>) {
  const { collapsed } = useContext(SidebarContext);

  const currentPath = usePathname() ?? '';
  const active = isRouteActive(path, currentPath, end ? 0 : 3);

  const className = getSidebarItemClassBuilder()({
    collapsed,
    active,
  });

  return (
    <Link key={path} href={path} className={className}>
      <If condition={collapsed} fallback={<Icon className={'h-5'} />}>
        <Tooltip>
          <TooltipTrigger>
            <Icon className={'h-5'} />
          </TooltipTrigger>

          <TooltipContent side={'right'} sideOffset={20}>
            {children}
          </TooltipContent>
        </Tooltip>
      </If>

      <span>{children}</span>
    </Link>
  );
}

export default Sidebar;

function getClassNameBuilder() {
  return cva(
    [
      'fixed flex box-content hidden h-screen flex-col border-r border-gray-100 dark:border-dark-800 lg:flex ' +
        'transition-[width] duration-100 motion-reduce:transition-none',
    ],
    {
      variants: {
        collapsed: {
          true: `w-[6rem]`,
          false: `w-2/12 lg:w-[17rem]`,
        },
      },
    },
  );
}

function getSidebarItemClassBuilder() {
  return cva(
    [
      `flex w-full items-center rounded-md border-transparent text-sm font-base transition-colors duration-100`,
    ],
    {
      variants: {
        collapsed: {
          true: `justify-center py-2 [&>span]:hidden`,
          false: `py-2 px-3 pr-12 space-x-2.5`,
        },
        active: {
          true: `bg-primary/5 dark:bg-primary-300/10 font-medium`,
          false: `ring-transparent hover:bg-gray-50 dark:hover:bg-dark-800/40 active:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:active:bg-dark-700`,
        },
      },
      compoundVariants: [
        {
          collapsed: true,
          active: true,
          className: `bg-primary/5 dark:bg-dark-800 text-primary dark:text-white`,
        },
        {
          collapsed: false,
          active: true,
          className: `dark:bg-dark-800 text-primary-700 dark:text-white`,
        },
        {
          collapsed: true,
          active: false,
          className: `dark:text-gray-300`,
        },
      ],
    },
  );
}
