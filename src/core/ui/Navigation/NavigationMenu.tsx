'use client';

import { PropsWithChildren } from 'react';
import { cva } from 'cva';
import { NavigationMenuContext } from './NavigationMenuContext';

type Vertical = {
  vertical?: boolean;
};

type Bordered = {
  bordered?: boolean;
};

type Pill = {
  pill?: boolean;
};

export type NavigationMenuProps = Vertical & (Bordered | Pill);

function NavigationMenu(props: PropsWithChildren<NavigationMenuProps>) {
  const className = getNavigationMenuClassBuilder()(props);

  return (
    <ul className={className}>
      <NavigationMenuContext.Provider value={props}>
        {props.children}
      </NavigationMenuContext.Provider>
    </ul>
  );
}

export default NavigationMenu;

function getNavigationMenuClassBuilder() {
  return cva(['w-full dark:text-gray-300 items-center flex-wrap flex'], {
    variants: {
      vertical: {
        true: `flex items-start justify-between space-x-2
        lg:flex-col lg:justify-start lg:space-x-0 lg:space-y-1.5`,
      },
      bordered: {
        true: `lg:space-x-3 border-b border-gray-100 dark:border-dark-800 pb-1.5`,
      },
    },
  });
}
