import { notFound } from 'next/navigation';
import { headers } from 'next/headers';

import isUserSuperAdmin from '~/app/admin/utils/is-user-super-admin';
import AdminSidebar from '~/app/admin/components/AdminSidebar';
import AdminProviders from '~/app/admin/components/AdminProviders';
import { Page } from '~/core/ui/Page';
import I18nProvider from '~/i18n/I18nProvider';
import { withI18n } from '~/i18n/with-i18n';
import initializeServerI18n from '~/i18n/i18n.server';
import getLanguageCookie from '~/i18n/get-language-cookie';

async function AdminLayout({ children }: React.PropsWithChildren) {
  const isAdmin = await isUserSuperAdmin();
  const i18n = await initializeServerI18n(getLanguageCookie());

  if (!isAdmin) {
    notFound();
  }

  const csrfToken = headers().get('X-CSRF-Token');

  const className =
    'ml-0 transition-[margin] duration-300' +
    ' motion-reduce:transition-none lg:ml-[17rem]';

  return (
    <I18nProvider lang={i18n.language}>
      <AdminProviders csrfToken={csrfToken}>
        <Page contentContainerClassName={className} sidebar={<AdminSidebar />}>
          {children}
        </Page>
      </AdminProviders>
    </I18nProvider>
  );
}

export default withI18n(AdminLayout);
