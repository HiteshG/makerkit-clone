'use client';

import Button from '~/core/ui/Button';
import Heading from '~/core/ui/Heading';

import SiteHeader from '~/app/(site)/components/SiteHeader';

const ErrorPage = () => {
  return (
    <>
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
                    Sorry, something went wrong.
                  </Heading>
                </div>

                <p className={'text-gray-500 dark:text-gray-300'}>
                  Apologies, an error occurred while processing your request. Please contact us if the issue persists.
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
    </>
  );
};

export default ErrorPage;
