import React from 'react';
import { SettingMenu, SettingMenuItem } from '../SettingMenu';
import MobileMenu from './MobileMenu';

const OrganizationLayout = ({
  children,
} : {
  children?: React.ReactNode,
}) => {
  return (
    <div className="mt-4 flex h-full flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-8">
      <div className="hidden w-[12rem] lg:flex">
        <SettingMenu>
          <SettingMenuItem link={"/settings/organization"} end>General</SettingMenuItem>
          <SettingMenuItem link={"/settings/organization/members"}>Members</SettingMenuItem>
          <SettingMenuItem link={"/settings/organization/invites"}>Pending Invites</SettingMenuItem>
        </SettingMenu>
      </div>
      <MobileMenu />
      {children}
    </div>
  );
}

export default OrganizationLayout;
