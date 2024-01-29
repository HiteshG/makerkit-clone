import React, { useContext } from 'react';
import Link from 'next/link';

import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from '@heroicons/react/24/outline';

import classNames from 'clsx';

import AppSidebarNavigation from './AppSidebarNavigation';
import Sidebar, { SidebarContent } from '~/core/ui/Sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/core/ui/Tooltip';

import Trans from '~/core/ui/Trans';
import SidebarContext from '~/lib/contexts/sidebar';
import ProfileDropdown from '~/components/ProfileDropdown';
import useUserSession from '~/core/hooks/use-user-session';
import useSignOut from '~/core/hooks/use-sign-out';

import useCurrentOrganization from '~/lib/organizations/hooks/use-current-organization';
import SubscriptionStatusBadge from './organizations/SubscriptionStatusBadge';

import configuration from '~/configuration';
import OrganizationsSelector from './organizations/OrganizationsSelector';

const AppSidebar: React.FC<{
  organizationUid: string;
}> = ({ organizationUid }) => {
  const ctx = useContext(SidebarContext);

  return (
    <Sidebar collapsed={ctx.collapsed}>
      <SidebarContent className={'my-4'}>
        <OrganizationsSelector displayName={!ctx.collapsed} />
      </SidebarContent>

      <SidebarContent className={`h-[calc(100%-160px)] overflow-y-auto`}>
        <AppSidebarNavigation organization={organizationUid} />
      </SidebarContent>

      <div className={'absolute left-0 bottom-4 w-full'}>
        <SidebarContent>
          <ProfileDropdownContainer collapsed={ctx.collapsed} />
        </SidebarContent>
      </div>
    </Sidebar>
  );
};

export default AppSidebar;

function AppSidebarFooterMenu() {
  const { collapsed, setCollapsed } = useContext(SidebarContext);

  return <CollapsibleButton collapsed={collapsed} onClick={setCollapsed} />;
}

function CollapsibleButton({
  collapsed,
  onClick,
}: React.PropsWithChildren<{
  collapsed: boolean;
  onClick: (collapsed: boolean) => void;
}>) {
  const className = classNames(
    `bg-background absolute -right-[10.5px] bottom-4 cursor-pointer block`,
  );

  const iconClassName =
    'bg-background text-gray-300 dark:text-gray-600 h-5 w-5';

  return (
    <Tooltip>
      <TooltipTrigger
        className={className}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        onClick={() => onClick(!collapsed)}
      >
        <ArrowRightCircleIcon
          className={classNames(iconClassName, {
            hidden: !collapsed,
          })}
        />

        <ArrowLeftCircleIcon
          className={classNames(iconClassName, {
            hidden: collapsed,
          })}
        />
      </TooltipTrigger>

      <TooltipContent sideOffset={20}>
        <Trans
          i18nKey={
            collapsed ? 'common:expandSidebar' : 'common:collapseSidebar'
          }
        />
      </TooltipContent>
    </Tooltip>
  );
}

function ProfileDropdownContainer(props: { collapsed: boolean }) {
  const userSession = useUserSession();
  const signOut = useSignOut();

  return (
    <div className={props.collapsed ? '' : 'w-full'}>
      <StatusBadge />

      <ProfileDropdown
        displayName={!props.collapsed}
        className={'w-full'}
        userSession={userSession}
        signOutRequested={signOut}
      />

      <AppSidebarFooterMenu />
    </div>
  );
}

function StatusBadge() {
  const organization = useCurrentOrganization();
  const subscription = organization?.subscription?.data;

  const isActive = ['active', 'trialing'].includes(
    subscription?.status ?? 'free',
  );

  // if the organization has an active subscription
  // we do not show the subscription status badge
  if (isActive || !subscription) {
    return null;
  }

  const appPrefix = configuration.paths.appPrefix;
  const href = `/${appPrefix}/${organization?.uuid}/settings/subscription`;

  // in all other cases we show the subscription status badge
  // which will show the subscription status and a link to the subscription page
  return (
    <Link href={href}>
      <SubscriptionStatusBadge subscription={subscription} />
    </Link>
  );
}
