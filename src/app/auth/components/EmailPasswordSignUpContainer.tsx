'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Trans from '~/core/ui/Trans';

import AuthErrorMessage from './AuthErrorMessage';
import useSignUpWithEmailAndPasswordMutation from '~/core/hooks/use-sign-up-with-email-password';
import If from '~/core/ui/If';
import Alert from '~/core/ui/Alert';

import EmailPasswordSignUpForm from '~/app/auth/components/EmailPasswordSignUpForm';

import configuration from '~/configuration';

const requireEmailConfirmation = configuration.auth.requireEmailConfirmation;

const EmailPasswordSignUpContainer: React.FCC<{
  onSignUp: (userId?: string) => unknown;
  onError?: (error?: unknown) => unknown;
}> = ({ onSignUp, onError }) => {
  const signUpMutation = useSignUpWithEmailAndPasswordMutation();
  const redirecting = useRef(false);
  const loading = signUpMutation.isMutating || redirecting.current;
  const [showVerifyEmailAlert, setShowVerifyEmailAlert] = useState(false);

  const callOnErrorCallback = useCallback(() => {
    if (signUpMutation.error && onError) {
      onError(signUpMutation.error);
    }
  }, [signUpMutation.error, onError]);

  useEffect(() => {
    callOnErrorCallback();
  }, [callOnErrorCallback]);

  const onSignupRequested = useCallback(
    async (params: { email: string; password: string }) => {
      if (loading) {
        return;
      }

      try {
        const data = await signUpMutation.trigger(params);

        // If the user is required to confirm their email, we display a message
        if (requireEmailConfirmation) {
          setShowVerifyEmailAlert(true);
        }

        onSignUp(data.user?.id);
      } catch (error) {
        if (onError) {
          onError(error);
        }
      }
    },
    [loading, onError, onSignUp, signUpMutation],
  );

  return (
    <>
      <If condition={showVerifyEmailAlert}>
        <Alert type={'success'}>
          <Alert.Heading>
            <Trans i18nKey={'auth:emailConfirmationAlertHeading'} />
          </Alert.Heading>

          <p data-cy={'email-confirmation-alert'}>
            <Trans i18nKey={'auth:emailConfirmationAlertBody'} />
          </p>
        </Alert>
      </If>

      <If condition={!showVerifyEmailAlert}>
        <AuthErrorMessage error={signUpMutation.error} />

        <EmailPasswordSignUpForm
          onSubmit={onSignupRequested}
          loading={loading}
        />
      </If>
    </>
  );
};

export default EmailPasswordSignUpContainer;
