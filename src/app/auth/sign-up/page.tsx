import Link from 'next/link';

import Heading from '~/core/ui/Heading';
import SignUpMethodsContainer from '~/app/auth/components/SignUpMethodsContainer';

import configuration from '~/configuration';

const SIGN_IN_PATH = configuration.paths.signIn;

export const metadata = {
  title: 'Sign up',
};

function SignUpPage() {
  return (
    <>
      <div>
        <Heading type={5}>
          Create an account
        </Heading>
      </div>

      <SignUpMethodsContainer />

      <div className={'flex justify-center text-xs'}>
        <p className={'flex space-x-1'}>
          <span>
            Already have an account?
          </span>

          <Link
            className={'text-primary-800 hover:underline dark:text-primary'}
            href={SIGN_IN_PATH}
          >
            Sign In
          </Link>
        </p>
      </div>
    </>
  );
}

export default SignUpPage;
