import Alert from '~/core/ui/Alert';
import { AuthError } from '@supabase/gotrue-js';

/**
 * @name AuthErrorMessage
 * @param error This error comes from Supabase as the code returned on errors
 * This error is mapped from the translation auth:errors.{error}
 * To update the error messages, please update the translation file
 * https://github.com/supabase/gotrue-js/blob/master/src/lib/errors.ts
 * @constructor
 */
export default function AuthErrorMessage({
  error,
}: {
  error: Maybe<Error | AuthError | unknown>;
}) {
  if (!error) {
    return null;
  }

  const DefaultError = "We have encountered an error. Please ensure you have a working internet connection and try again";
  const errorCode = error instanceof AuthError ? error.message : error;

  let errorMessage = "We have encountered an error. Please ensure you have a working internet connection and try again";
  switch (errorCode) {
    case "Invalid login credentials":
      errorMessage = "The credentials entered are invali";
      break;
    case "User already registered":
      errorMessage = "This credential is already in use. Please try with another one.";
      break;
    case "Email not confirmed":
      errorMessage = "Please confirm your email before signing up";
      break;
    default:
      break;
  }

  return (
    <Alert className={'w-full'} type={'error'}>
      <Alert.Heading>
        Authentication Error
      </Alert.Heading>

      <p className={'text-sm font-medium'} data-cy={'auth-error-message'}>
        {errorMessage}
      </p>
    </Alert>
  );
}
