'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import If from '~/core/ui/If';
import Trans from '~/core/ui/Trans';

import EmailPasswordSignUpContainer from '~/app/auth/components/EmailPasswordSignUpContainer';
import PhoneNumberSignInContainer from '~/app/auth/components/PhoneNumberSignInContainer';
import EmailLinkAuth from '~/app/auth/components/EmailLinkAuth';
import OAuthProviders from '~/app/auth/components/OAuthProviders';

import configuration from '~/configuration';
import EmailOtpContainer from '~/app/auth/components/EmailOtpContainer';

const providers = configuration.auth.providers;

function SignUpMethodsContainer() {
  const router = useRouter();

  const onSignUp = useCallback(() => {
    const requireEmailConfirmation =
      configuration.auth.requireEmailConfirmation;

    // If the user is required to confirm their email, we show them a message
    if (requireEmailConfirmation) {
      return;
    }

    // Otherwise, we redirect them to the onboarding page
    router.replace(configuration.paths.onboarding);
  }, [router]);

  return (
    <>
      <If condition={providers.oAuth.length}>
        <OAuthProviders />

        <If condition={providers.emailPassword}>
          <div>
            <span className={'text-xs text-gray-400'}>
              <Trans i18nKey={'auth:orContinueWithEmail'} />
            </span>
          </div>
        </If>
      </If>

      <If condition={providers.emailPassword}>
        <EmailPasswordSignUpContainer onSignUp={onSignUp} />
      </If>

      <If condition={providers.phoneNumber}>
        <PhoneNumberSignInContainer onSuccess={onSignUp} mode={'signUp'} />
      </If>

      <If condition={providers.emailLink}>
        <EmailLinkAuth />
      </If>

      <If condition={providers.emailOtp}>
        <EmailOtpContainer shouldCreateUser={true} />
      </If>
    </>
  );
}

export default SignUpMethodsContainer;
