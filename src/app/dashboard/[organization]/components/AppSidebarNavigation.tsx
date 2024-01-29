'use client';

import Trans from '~/core/ui/Trans';
import { SidebarItem, SidebarDivider, SidebarGroup } from '~/core/ui/Sidebar';

import createNavigationConfig from '~/navigation.config';

function AppSidebarNavigation({
  organization,
}: React.PropsWithChildren<{
  organization: string;
}>) {
  return (
    <>
      {createNavigationConfig(organization).items.map((item, index) => {
        if ('divider' in item) {
          return <SidebarDivider key={index} />;
        }

        if ('children' in item) {
          return (
            <SidebarGroup
              key={item.label}
              label={<Trans i18nKey={item.label} defaults={item.label} />}
              collapsible={item.collapsible}
              collapsed={item.collapsed}
            >
              {item.children.map((child) => {
                return (
                  <SidebarItem
                    key={child.path}
                    end={child.end}
                    path={child.path}
                    Icon={child.Icon}
                  >
                    <Trans i18nKey={child.label} defaults={child.label} />
                  </SidebarItem>
                );
              })}
            </SidebarGroup>
          );
        }

        return (
          <SidebarItem
            key={item.path}
            end={item.end}
            path={item.path}
            Icon={item.Icon}
          >
            <Trans i18nKey={item.label} defaults={item.label} />
          </SidebarItem>
        );
      })}
    </>
  );
}

export default AppSidebarNavigation;
