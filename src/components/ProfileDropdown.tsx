'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import classNames from 'clsx';

import {
  ArrowLeftOnRectangleIcon,
  Squares2X2Icon,
  PaintBrushIcon,
  SunIcon,
  ComputerDesktopIcon,
  MoonIcon,
  BuildingLibraryIcon,
  CheckCircleIcon,
  QuestionMarkCircleIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '~/core/ui/Dropdown';
import Trans from '~/core/ui/Trans';

import configuration from '~/configuration';
import ProfileAvatar from '~/components/ProfileAvatar';
import type UserSession from '~/core/session/types/user-session';

import {
  setTheme,
  DARK_THEME_CLASSNAME,
  LIGHT_THEME_CLASSNAME,
  SYSTEM_THEME_CLASSNAME,
  getStoredTheme,
} from '~/core/theming';

import If from '~/core/ui/If';
import GlobalRole from '~/core/session/types/global-role';
import useUser from '~/core/hooks/use-user';

const ProfileDropdown: React.FCC<{
  userSession: Maybe<UserSession>;
  signOutRequested: () => unknown;
  displayName?: boolean;
  className?: string;
}> = ({ userSession, signOutRequested, displayName, className }) => {
  const { data: user } = useUser();

  const signedInAsLabel = useMemo(() => {
    const email = userSession?.auth?.user.email || undefined;
    const phone = userSession?.auth?.user.phone || undefined;

    return email ?? phone;
  }, [userSession]);

  const userDisplayName = userSession?.data?.displayName;

  const isSuperAdmin = useMemo(() => {
    return user?.app_metadata.role === GlobalRole.SuperAdmin;
  }, [user]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Open your profile menu"
        data-cy={'profile-dropdown-trigger'}
        className={classNames(
          'flex cursor-pointer focus:outline-none group items-center',
          className,
          {
            ['items-center space-x-2.5 rounded-lg border border-gray-100' +
            ' dark:border-dark-900 p-2 transition-colors' +
            ' hover:bg-gray-50 dark:hover:bg-dark-800/40']: displayName,
          },
        )}
      >
        <ProfileAvatar user={userSession} />

        <If condition={displayName}>
          <div className={'flex flex-col text-left w-full truncate'}>
            <span className={'text-sm truncate'}>{userDisplayName}</span>

            <span
              className={'text-xs text-gray-500 dark:text-gray-400 truncate'}
            >
              {signedInAsLabel}
            </span>
          </div>

          <EllipsisVerticalIcon
            className={'h-8 hidden text-gray-500 group-hover:flex'}
          />
        </If>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className={'!min-w-[15rem]'}
        collisionPadding={{ right: 20, left: 20 }}
        sideOffset={20}
      >
        <DropdownMenuItem className={'!h-10 rounded-none'}>
          <div
            className={'flex flex-col justify-start truncate text-left text-xs'}
          >
            <div className={'text-gray-500'}>
              <Trans i18nKey={'common:signedInAs'} />
            </div>

            <div>
              <span className={'block truncate'}>{signedInAsLabel}</span>
            </div>
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link
            className={'flex h-full w-full items-center space-x-2'}
            href={configuration.paths.appHome}
          >
            <Squares2X2Icon className={'h-5'} />
            <span>
              <Trans i18nKey={'common:dashboardTabLabel'} />
            </span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link
            className={'flex h-full w-full items-center space-x-2'}
            href={'/docs'}
          >
            <QuestionMarkCircleIcon className={'h-5'} />

            <span>
              <Trans i18nKey={'common:documentation'} />
            </span>
          </Link>
        </DropdownMenuItem>

        <If condition={configuration.features.enableThemeSwitcher}>
          <ThemeSelectorSubMenu />
        </If>

        <If condition={isSuperAdmin}>
          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link
              className={'flex h-full w-full items-center space-x-2'}
              href={'/admin'}
            >
              <BuildingLibraryIcon className={'h-5'} />
              <span>Admin</span>
            </Link>
          </DropdownMenuItem>
        </If>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          role={'button'}
          className={'cursor-pointer'}
          onClick={signOutRequested}
        >
          <span className={'flex w-full items-center space-x-2'}>
            <ArrowLeftOnRectangleIcon className={'h-5'} />

            <span>
              <Trans i18nKey={'auth:signOut'} />
            </span>
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

function ThemeSelectorSubMenu() {
  const currentTheme = useMemo(() => getStoredTheme(), []);

  const Wrapper: React.FCC = ({ children }) => (
    <span className={'flex items-center space-x-2.5'}>{children}</span>
  );

  return (
    <>
      <DropdownMenuSeparator className={'hidden lg:flex'} />

      <DropdownMenuSub>
        <DropdownMenuSubTrigger className={'hidden lg:flex'}>
          <Wrapper>
            <PaintBrushIcon className={'h-4'} />

            <span>
              <Trans i18nKey={'common:theme'} />
            </span>
          </Wrapper>
        </DropdownMenuSubTrigger>

        <DropdownMenuSubContent>
          <DropdownMenuItem
            className={'cursor-pointer flex justify-between items-center'}
            onClick={() => setTheme(LIGHT_THEME_CLASSNAME)}
          >
            <Wrapper>
              <SunIcon className={'h-4'} />

              <span>
                <Trans i18nKey={'common:lightTheme'} />
              </span>
            </Wrapper>

            <If condition={currentTheme === LIGHT_THEME_CLASSNAME}>
              <CheckCircleIcon className={'h-5'} />
            </If>
          </DropdownMenuItem>

          <DropdownMenuItem
            className={'cursor-pointer flex justify-between items-center'}
            onClick={() => setTheme(DARK_THEME_CLASSNAME)}
          >
            <Wrapper>
              <MoonIcon className={'h-4'} />

              <span>
                <Trans i18nKey={'common:darkTheme'} />
              </span>
            </Wrapper>

            <If condition={currentTheme === DARK_THEME_CLASSNAME}>
              <CheckCircleIcon className={'h-5'} />
            </If>
          </DropdownMenuItem>

          <DropdownMenuItem
            className={'cursor-pointer flex justify-between items-center'}
            onClick={() => setTheme(SYSTEM_THEME_CLASSNAME)}
          >
            <Wrapper>
              <ComputerDesktopIcon className={'h-4'} />

              <span>
                <Trans i18nKey={'common:systemTheme'} />
              </span>
            </Wrapper>

            <If condition={currentTheme === SYSTEM_THEME_CLASSNAME}>
              <CheckCircleIcon className={'h-5'} />
            </If>
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuSub>
    </>
  );
}

export default ProfileDropdown;
