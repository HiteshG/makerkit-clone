import Link from 'next/link';

import Heading from '~/core/ui/Heading';

import configuration from '~/configuration';
import SignInMethodsContainer from '~/app/auth/components/SignInMethodsContainer';

const SIGN_UP_PATH = configuration.paths.signUp;

export const metadata = {
  title: 'Sign In',
};

function SignInPage() {
  return (
    <>
      <div>
        <Heading type={5}>
          Sign in to your account
        </Heading>
      </div>

      <SignInMethodsContainer />

      <div className={'flex justify-center text-xs'}>
        <p className={'flex space-x-1'}>
          <span>
            Do not have an account yet?
          </span>

          <Link
            className={'text-primary-800 hover:underline dark:text-primary'}
            href={SIGN_UP_PATH}
          >
            Sign Up
          </Link>
        </p>
      </div>
    </>
  );
}

export default SignInPage;
