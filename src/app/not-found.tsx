import Button from '~/core/ui/Button';
import Heading from '~/core/ui/Heading';

import configuration from '~/configuration';
import SiteHeaderSessionProvider from '~/app/(site)/components/SiteHeaderSessionProvider';
import loadUserData from '~/lib/server/loaders/load-user-data';
import Fonts from '~/components/Fonts';

export const metadata = {
  title: `Page not found - ${configuration.site.name}`,
};

const NotFoundPage = async () => {
  const [data] = await loadData();

  return (
    <main>
      <Fonts />

      <SiteHeaderSessionProvider data={data.session} />

      <div
        className={
          'm-auto flex min-h-[50vh] w-full items-center justify-center'
        }
      >
        <div className={'flex flex-col space-y-8'}>
          <div
            className={
              'flex space-x-8 divide-x divide-gray-100' +
              ' dark:divide-dark-800'
            }
          >
            <div>
              <Heading type={1}>
                <span
                  data-cy={'catch-route-status-code'}
                  className={'text-primary'}
                >
                  404
                </span>
              </Heading>
            </div>

            <div className={'flex flex-col space-y-4 pl-8'}>
              <div className={'flex flex-col space-y-2'}>
                <div>
                  <Heading type={1}>
                    Ops. Page not Found.
                  </Heading>
                </div>

                <p className={'text-gray-500 dark:text-gray-300'}>
                  Apologies, the page you were looking for was not found
                </p>
              </div>

              <div className={'flex space-x-4'}>
                <Button variant={'outline'} href={'/'}>
                  Back to Home Page
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;

async function loadData() {
  return Promise.all([
    loadUserData(),
  ]);
}
