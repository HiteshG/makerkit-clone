'use client';

import { HomeIcon, UserGroupIcon, UserIcon } from '@heroicons/react/24/outline';
import Sidebar, { SidebarContent, SidebarItem } from '~/core/ui/Sidebar';
import Logo from '~/core/ui/Logo';
import Trans from '~/core/ui/Trans';

function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarContent className={'mt-4 mb-8 pt-2'}>
        <Logo href={'/admin'} />
      </SidebarContent>

      <SidebarContent>
        <SidebarItem
          end
          path={'/admin'}
          Icon={() => <HomeIcon className={'h-6'} />}
        >
          <Trans i18nKey={'admin:adminTab'} />
        </SidebarItem>

        <SidebarItem
          path={'/admin/users'}
          Icon={() => <UserIcon className={'h-6'} />}
        >
          <Trans i18nKey={'admin:userTab'} />
        </SidebarItem>

        <SidebarItem
          path={'/admin/organizations'}
          Icon={() => <UserGroupIcon className={'h-6'} />}
        >
          <Trans i18nKey={'admin:organizationTab'} />
        </SidebarItem>
      </SidebarContent>
    </Sidebar>
  );
}

export default AdminSidebar;
