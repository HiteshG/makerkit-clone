import React from 'react';
import { SettingMenu, SettingMenuItem } from '../SettingMenu';
import MobileMenu from './MobileMenu';

const ProfileLayout = ({
  children,
} : {
  children?: React.ReactNode,
}) => {
  return (
    <div className="mt-4 flex h-full flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-8">
      <div className="hidden w-[12rem] lg:flex">
        <SettingMenu>
          <SettingMenuItem link={"/settings/profile"} end>My Details</SettingMenuItem>
          <SettingMenuItem link={"/settings/profile/authentication"}>Authentication</SettingMenuItem>
          <SettingMenuItem link={"/settings/profile/email"}>Email</SettingMenuItem>
          <SettingMenuItem link={"/settings/profile/password"}>Password</SettingMenuItem>
        </SettingMenu>
      </div>
      <MobileMenu />
      {children}
    </div>
  );
}

export default ProfileLayout;
