'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';

import classNames from 'clsx';
import { cva } from 'cva';

import { NavigationMenuContext } from './NavigationMenuContext';
import isRouteActive from '~/core/generic/is-route-active';
import Trans from '../Trans';

interface Link {
  path: string;
  label?: string;
}

const NavigationMenuItem: React.FCC<{
  link: Link;
  depth?: number;
  disabled?: boolean;
  shallow?: boolean;
  className?: string;
}> = ({ link, disabled, shallow, depth, ...props }) => {
  const pathName = usePathname() ?? '';
  const active = isRouteActive(link.path, pathName, depth ?? 3);
  const menuProps = useContext(NavigationMenuContext);
  const label = link.label;

  const itemClassName = getNavigationMenuItemClassBuilder()({
    active,
    ...menuProps,
  });

  const className = classNames(itemClassName, props.className ?? ``);

  return (
    <li className={className}>
      <Link
        className={
          'transition-transform duration-500 justify-center lg:justify-start'
        }
        aria-disabled={disabled}
        href={disabled ? '' : link.path}
        shallow={shallow ?? active}
      >
        <Trans i18nKey={label} defaults={label} />
      </Link>
    </li>
  );
};

export default NavigationMenuItem;

function getNavigationMenuItemClassBuilder() {
  return cva(
    [
      `flex items-center justify-center font-medium lg:justify-start rounded-md text-sm transition colors transform *:active:translate-y-[2px]`,
      '*:p-1 *:lg:px-2.5 *:s-full *:flex *:items-center',
      'aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
    ],
    {
      compoundVariants: [
        // not active - shared
        {
          active: false,
          className: `active:text-current text-gray-500 dark:text-gray-300 hover:text-current dark:hover:text-white`,
        },
        // active - shared
        {
          active: true,
          className: `text-gray-800 dark:text-white`,
        },
        // active - pill
        {
          active: true,
          pill: true,
          className: `bg-gray-50 text-gray-800 dark:bg-primary-300/10`,
        },
        // not active - pill
        {
          active: false,
          pill: true,
          className: `hover:bg-gray-50 active:bg-gray-100 text-gray-500 dark:text-gray-300 dark:hover:bg-background dark:active:bg-dark-900/90`,
        },
        // not active - bordered
        {
          active: false,
          bordered: true,
          className: `hover:bg-gray-50 active:bg-gray-100 dark:active:bg-dark-800 dark:hover:bg-dark/90 transition-colors rounded-lg border-transparent`,
        },
        // active - bordered
        {
          active: true,
          bordered: true,
          className: `top-[0.4rem] border-b-[0.25rem] rounded-none border-primary bg-transparent pb-[0.55rem] text-primary-700 dark:text-white`,
        },
        // active - secondary
        {
          active: true,
          secondary: true,
          className: `bg-transparent font-semibold`,
        },
      ],
      variants: {
        active: {
          true: ``,
        },
        pill: {
          true: `[&>*]:py-2`,
        },
        bordered: {
          true: `relative h-10`,
        },
        secondary: {
          true: ``,
        },
      },
    },
  );
}
