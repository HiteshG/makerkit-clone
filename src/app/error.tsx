'use client';

import Button from '~/core/ui/Button';
import Heading from '~/core/ui/Heading';
import Trans from '~/core/ui/Trans';

import SiteHeader from '~/app/(site)/components/SiteHeader';
import I18nProvider from '~/i18n/I18nProvider';

const ErrorPage = () => {
  return (
    <I18nProvider>
      <SiteHeader />

      <div
        className={
          'm-auto flex min-h-[50vh] w-full items-center justify-center'
        }
      >
        <div className={'flex flex-col space-y-8'}>
          <div
            className={
              'flex space-x-8 divide-x divide-gray-100' +
              ' dark:divide-dark-700'
            }
          >
            <div>
              <Heading type={1}>
                <span className={'text-primary'}>500</span>
              </Heading>
            </div>

            <div className={'flex flex-col space-y-4 pl-8'}>
              <div className={'flex flex-col space-y-2'}>
                <div>
                  <Heading type={1}>
                    <Trans i18nKey={'common:genericError'} />
                  </Heading>
                </div>

                <p className={'text-gray-500 dark:text-gray-300'}>
                  <Trans i18nKey={'common:genericErrorSubHeading'} />
                </p>
              </div>

              <div className={'flex space-x-4'}>
                <Button variant={'outline'} href={'/'}>
                  <Trans i18nKey={'common:backToHomePage'} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </I18nProvider>
  );
};

export default ErrorPage;
