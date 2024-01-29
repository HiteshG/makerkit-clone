'use client';

import { useCallback, useState, useTransition } from 'react';

import EmailLinkAuth from '~/app/auth/components/EmailLinkAuth';
import OAuthProviders from '~/app/auth/components/OAuthProviders';
import PhoneNumberSignInContainer from '~/app/auth/components/PhoneNumberSignInContainer';
import EmailPasswordSignInContainer from '~/app/auth/components/EmailPasswordSignInContainer';
import EmailPasswordSignUpContainer from '~/app/auth/components/EmailPasswordSignUpContainer';

import If from '~/core/ui/If';
import Button from '~/core/ui/Button';
import Trans from '~/core/ui/Trans';

import configuration from '~/configuration';
import LoadingOverlay from '~/core/ui/LoadingOverlay';
import isBrowser from '~/core/generic/is-browser';
import { acceptInviteAction } from '~/lib/memberships/actions';
import EmailOtpContainer from '~/app/auth/components/EmailOtpContainer';

enum Mode {
  SignUp,
  SignIn,
}

function NewUserInviteForm(
  props: React.PropsWithChildren<{
    code: string;
  }>,
) {
  const [mode, setMode] = useState<Mode>(Mode.SignUp);
  const [isSubmitting, startTransition] = useTransition();
  const oAuthReturnUrl = isBrowser() ? window.location.pathname : '';

  const onInviteAccepted = useCallback(
    async (userId?: string) => {
      startTransition(async () => {
        await acceptInviteAction({
          code: props.code,
          userId,
        });
      });
    },
    [props.code],
  );

  return (
    <>
      <If condition={isSubmitting}>
        <LoadingOverlay fullPage>
          Accepting invite. Please wait...
        </LoadingOverlay>
      </If>

      <OAuthProviders inviteCode={props.code} returnUrl={oAuthReturnUrl} />

      <If condition={configuration.auth.providers.emailPassword}>
        <If condition={mode === Mode.SignUp}>
          <div className={'flex w-full flex-col items-center space-y-4'}>
            <EmailPasswordSignUpContainer onSignUp={onInviteAccepted} />

            <Button
              block
              variant={'ghost'}
              size={'sm'}
              onClick={() => setMode(Mode.SignIn)}
            >
              <Trans i18nKey={'auth:alreadyHaveAccountStatement'} />
            </Button>
          </div>
        </If>

        <If condition={mode === Mode.SignIn}>
          <div className={'flex w-full flex-col items-center space-y-4'}>
            <EmailPasswordSignInContainer onSignIn={onInviteAccepted} />

            <Button
              block
              variant={'ghost'}
              size={'sm'}
              onClick={() => setMode(Mode.SignUp)}
            >
              <Trans i18nKey={'auth:doNotHaveAccountStatement'} />
            </Button>
          </div>
        </If>
      </If>

      <If condition={configuration.auth.providers.phoneNumber}>
        <PhoneNumberSignInContainer
          onSuccess={onInviteAccepted}
          mode={'signUp'}
        />
      </If>

      <If condition={configuration.auth.providers.emailLink}>
        <EmailLinkAuth inviteCode={props.code} />
      </If>

      <If condition={configuration.auth.providers.emailOtp}>
        <EmailOtpContainer
          inviteCode={props.code}
          shouldCreateUser={true}
          onSuccess={onInviteAccepted}
        />
      </If>
    </>
  );
}

export default NewUserInviteForm;
