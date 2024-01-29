import { headers } from 'next/headers';
import { permanentRedirect } from 'next/navigation';
import Image from 'next/image';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

import { getOrganizationsByUserId } from '~/lib/organizations/database/queries';
import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';
import requireSession from '~/lib/user/require-session';
import initializeServerI18n from '~/i18n/i18n.server';
import getLanguageCookie from '~/i18n/get-language-cookie';
import getCurrentOrganization from '~/lib/server/organizations/get-current-organization';
import { parseOrganizationIdCookie } from '~/lib/server/cookies/organization.cookie';
import NewOrganizationButtonContainer from './components/NewOrganizationButtonContainer';

import LogoImage from '~/core/ui/Logo/LogoImage';
import Container from '~/core/ui/Container';
import If from '~/core/ui/If';
import CardButton from '~/core/ui/CardButton';
import Trans from '~/core/ui/Trans';
import { PageBody, PageHeader } from '~/core/ui/Page';

import configuration from '~/configuration';
import I18nProvider from '~/i18n/I18nProvider';
import { getUserById } from '~/lib/user/database/queries';

async function OrganizationsPage() {
  const client = getSupabaseServerComponentClient();
  const session = await requireSession(client);
  const userId = session.user.id;

  const { data: user } = await getUserById(client, userId);

  if (!user || !user.onboarded) {
    permanentRedirect(configuration.paths.onboarding);
  }

  const organizationUidCookie = await parseOrganizationIdCookie(userId);

  if (organizationUidCookie) {
    const currentOrganizationResponse = await getCurrentOrganization({
      userId,
      organizationUid: organizationUidCookie,
    })
      .then((response) => response.organization)
      .catch(() => null);

    if (currentOrganizationResponse) {
      permanentRedirect(getAppHomeUrl(organizationUidCookie));
    }
  }

  const { data, error } = await getOrganizationsByUserId(client, user.id);

  if (error) {
    throw error;
  }

  const i18n = await initializeServerI18n(getLanguageCookie());
  const csrfToken = headers().get('X-CSRF-Token') ?? '';

  const organizations = data.map((item) => item.organization);

  if (organizations.length === 1) {
    const organization = organizations[0];
    const href = getAppHomeUrl(organization.uuid);

    permanentRedirect(href);
  }

  return (
    <I18nProvider lang={i18n.language}>
      <div className={'flex flex-col space-y-8'}>
        <OrganizationsPageHeader />

        <PageBody>
          <Container>
            <div
              className={
                'lg:grid-col-3 grid grid-cols-1 gap-4 xl:grid-cols-4 xl:gap-6'
              }
            >
              <NewOrganizationButtonContainer csrfToken={csrfToken} />

              {organizations.map((organization) => {
                const href = getAppHomeUrl(organization.uuid);

                return (
                  <CardButton
                    data-cy={'organization-card-button'}
                    className={'relative'}
                    href={href}
                    key={organization.id}
                  >
                    <span
                      className={
                        'absolute left-6 top-4 flex justify-start' +
                        ' h-full w-full items-center space-x-4'
                      }
                    >
                      <If condition={organization.logoURL}>
                        {(logo) => (
                          <Image
                            width={36}
                            height={36}
                            className={'contain rounded-full'}
                            src={logo}
                            alt={`${organization.name} Logo`}
                          />
                        )}
                      </If>

                      <span
                        className={
                          'flex items-center space-x-2.5 text-base font-medium'
                        }
                      >
                        <span>{organization.name}</span>

                        <ChevronRightIcon className={'h-4'} />
                      </span>
                    </span>
                  </CardButton>
                );
              })}
            </div>
          </Container>
        </PageBody>
      </div>
    </I18nProvider>
  );
}

export default OrganizationsPage;

function OrganizationsPageHeader() {
  return (
    <PageHeader
      title={
        <div className={'flex space-x-4 items-center'}>
          <LogoImage />

          <span>
            <Trans i18nKey={'common:yourOrganizations'} />
          </span>
        </div>
      }
    />
  );
}

function getAppHomeUrl(organizationUid: string) {
  return [`${configuration.paths.appHome}`, organizationUid].join('/');
}
