import Link from 'next/link';

import configuration from '~/configuration';
import Heading from '~/core/ui/Heading';

import PasswordResetRequestContainer from '~/app/auth/components/PasswordResetRequestContainer';

export const metadata = {
  title: 'Password Reset Request',
};

function PasswordResetPage() {
  return (
    <>
      <div>
        <Heading type={5}>
          Reset Password
        </Heading>
      </div>

      <div className={'flex flex-col space-y-4'}>
        <PasswordResetRequestContainer />

        <div className={'flex justify-center text-xs'}>
          <p className={'flex space-x-1'}>
            <span>
              Password recovered?
            </span>

            <Link
              className={'text-primary-800 hover:underline dark:text-primary'}
              href={configuration.paths.signIn}
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default PasswordResetPage;
