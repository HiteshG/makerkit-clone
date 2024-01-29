'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import useCollapsible from '~/core/hooks/use-sidebar-state';
import AppSidebar from '~/app/dashboard/[organization]/components/AppSidebar';
import Toaster from '~/components/Toaster';
import SentryBrowserWrapper from '~/components/SentryProvider';

import Organization from '~/lib/organizations/types/organization';
import UserSession from '~/core/session/types/user-session';

import OrganizationContext from '~/lib/contexts/organization';
import CsrfTokenContext from '~/lib/contexts/csrf';
import SidebarContext from '~/lib/contexts/sidebar';
import UserSessionContext from '~/core/session/contexts/user-session';
import I18nProvider from '~/i18n/I18nProvider';

import { setCookie } from '~/core/generic/cookies';
import AuthChangeListener from '~/components/AuthChangeListener';
import type loadAppData from '~/lib/server/loaders/load-app-data';
import { Page } from '~/core/ui/Page';
import { cva } from 'cva';

const OrganizationScopeLayout: React.FCC<{
  data: Awaited<ReturnType<typeof loadAppData>>;
}> = ({ data, children }) => {
  const userSessionContext: UserSession = useMemo(() => {
    return {
      auth: data.auth,
      data: data.user ?? undefined,
      role: data.role,
    };
  }, [data]);

  const [organization, setOrganization] = useState<Maybe<Organization>>(
    data.organization,
  );

  const [userSession, setUserSession] =
    useState<Maybe<UserSession>>(userSessionContext);

  const updateCurrentOrganization = useCallback(() => {
    setOrganization(data.organization);

    const organizationId = data.organization?.uuid;
    const cookieName = `${userSession?.data?.id}-organizationId`;

    if (organizationId) {
      setCookie(cookieName, organizationId.toString());
    }
  }, [data.organization, userSession]);

  const updateCurrentUser = useCallback(() => {
    if (userSessionContext.auth) {
      setUserSession(userSessionContext);
    }
  }, [userSessionContext]);

  useEffect(updateCurrentOrganization, [updateCurrentOrganization]);
  useEffect(updateCurrentUser, [updateCurrentUser]);

  return (
    <SentryBrowserWrapper>
      <UserSessionContext.Provider value={{ userSession, setUserSession }}>
        <OrganizationContext.Provider value={{ organization, setOrganization }}>
          <CsrfTokenContext.Provider value={data.csrfToken}>
            <I18nProvider lang={data.language}>
              <AuthChangeListener
                accessToken={data.auth.accessToken}
                whenSignedOut={'/'}
              >
                <main>
                  <Toaster richColors={false} />

                  <RouteShellWithSidebar
                    organization={organization?.uuid ?? ''}
                    collapsed={data.ui.sidebarState === 'collapsed'}
                  >
                    {children}
                  </RouteShellWithSidebar>
                </main>
              </AuthChangeListener>
            </I18nProvider>
          </CsrfTokenContext.Provider>
        </OrganizationContext.Provider>
      </UserSessionContext.Provider>
    </SentryBrowserWrapper>
  );
};

export default OrganizationScopeLayout;

function RouteShellWithSidebar(
  props: React.PropsWithChildren<{
    collapsed: boolean;
    organization: string;
  }>,
) {
  const [collapsed, setCollapsed] = useCollapsible(props.collapsed);
  const className = getClassNameBuilder()({ collapsed });

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      <Page
        contentContainerClassName={className}
        sidebar={<AppSidebar organizationUid={props.organization} />}
      >
        {props.children}
      </Page>
    </SidebarContext.Provider>
  );
}

function getClassNameBuilder() {
  return cva(
    ['ml-0 transition-[margin] duration-300 motion-reduce:transition-none'],
    {
      variants: {
        collapsed: {
          true: 'lg:ml-[6rem]',
          false: 'lg:ml-[17rem]',
        },
      },
    },
  );
}
