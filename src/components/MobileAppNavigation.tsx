'use client';

import Link from 'next/link';

import {
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  BuildingLibraryIcon,
} from '@heroicons/react/24/outline';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/core/ui/Dropdown';

import NAVIGATION_CONFIG from '../navigation.config';
import useCurrentOrganization from '~/lib/organizations/hooks/use-current-organization';
import useSignOut from '~/core/hooks/use-sign-out';

import Modal from '~/core/ui/Modal';
import Heading from '~/core/ui/Heading';
import OrganizationsSelector from '~/app/dashboard/[organization]/components/organizations/OrganizationsSelector';

const MobileAppNavigation = () => {
  const currentOrganization = useCurrentOrganization();

  if (!currentOrganization?.uuid) {
    return null;
  }

  const Links = NAVIGATION_CONFIG(currentOrganization.uuid).items.map(
    (item, index) => {
      if ('children' in item) {
        return item.children.map((child) => {
          return (
            <DropdownLink
              key={child.path}
              Icon={child.Icon}
              path={child.path}
              label={child.label}
            />
          );
        });
      }

      if ('divider' in item) {
        return <DropdownMenuSeparator key={index} />;
      }

      return (
        <DropdownLink
          key={item.path}
          Icon={item.Icon}
          path={item.path}
          label={item.label}
        />
      );
    },
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Bars3Icon className={'h-9'} />
      </DropdownMenuTrigger>

      <DropdownMenuContent sideOffset={10} className={'rounded-none w-screen'}>
        <OrganizationsModal />

        {Links}

        <DropdownMenuSeparator />
        <SignOutDropdownItem />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileAppNavigation;

function DropdownLink(
  props: React.PropsWithChildren<{
    path: string;
    label: string;
    Icon: React.ElementType;
  }>,
) {
  return (
    <DropdownMenuItem asChild key={props.path}>
      <Link
        href={props.path}
        className={'flex w-full items-center space-x-4 h-12'}
      >
        <props.Icon className={'h-6'} />

        <span>{props.label}</span>
      </Link>
    </DropdownMenuItem>
  );
}

function SignOutDropdownItem() {
  const signOut = useSignOut();

  return (
    <DropdownMenuItem
      className={'flex w-full items-center space-x-4 h-12'}
      onClick={signOut}
    >
      <ArrowLeftOnRectangleIcon className={'h-6'} />

      <span>Sign Out</span>
    </DropdownMenuItem>
  );
}

function OrganizationsModal() {
  return (
    <Modal
      Trigger={
        <DropdownMenuItem
          className={'h-12'}
          onSelect={(e) => e.preventDefault()}
        >
          <button className={'flex items-center space-x-4'}>
            <BuildingLibraryIcon className={'h-6'} />

            <span>Your Organizations</span>
          </button>
        </DropdownMenuItem>
      }
      heading={"Your Organizations"}
    >
      <div className={'flex flex-col space-y-6 py-4'}>
        <Heading type={6}>Select an organization below to switch to it</Heading>

        <OrganizationsSelector displayName />
      </div>
    </Modal>
  );
}
