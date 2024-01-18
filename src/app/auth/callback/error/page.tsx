import { redirect } from 'next/navigation';

import { Alert, AlertHeading } from '~/core/ui/Alert';
import Button from '~/core/ui/Button';

import ResendLinkForm from './ResendLinkForm';

interface Params {
  searchParams: {
    error: string;
  };
}

function AuthCallbackErrorPage({ searchParams }: Params) {
  const { error } = searchParams;

  // if there is no error, redirect the user to the sign-in page
  if (!error) {
    redirect('/auth/sign-in');
  }

  return (
    <div className={'flex flex-col space-y-4 py-4'}>
      <div>
        <Alert type={'error'}>
          <AlertHeading>
            Authentication Error
          </AlertHeading>

          {error === "auth:error" && "Sorry, we could not authenticate you. Please try again."}
          {error === "auth:codeMismatch" && "It looks like you're trying to sign in using a different browser than the one you used to request the sign in link. Please try again using the same browser."}
        </Alert>
      </div>

      <ResendLinkForm />

      <div className={'flex flex-col space-y-2'}>
        <Button variant={'ghost'}>
          <a href={'/auth/sign-in'}>
            Sign In
          </a>
        </Button>
      </div>
    </div>
  );
}

export default AuthCallbackErrorPage;
