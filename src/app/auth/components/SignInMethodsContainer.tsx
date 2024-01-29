'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

import If from '~/core/ui/If';
import Trans from '~/core/ui/Trans';
import OAuthProviders from '~/app/auth/components/OAuthProviders';

import EmailPasswordSignInContainer from '~/app/auth/components/EmailPasswordSignInContainer';
import PhoneNumberSignInContainer from '~/app/auth/components/PhoneNumberSignInContainer';
import EmailLinkAuth from '~/app/auth/components/EmailLinkAuth';

import configuration from '~/configuration';
import EmailOtpContainer from '~/app/auth/components/EmailOtpContainer';

const providers = configuration.auth.providers;

function SignInMethodsContainer() {
  const router = useRouter();

  const onSignIn = useCallback(() => {
    router.replace(configuration.paths.appHome);
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
        <EmailPasswordSignInContainer onSignIn={onSignIn} />
      </If>

      <If condition={providers.phoneNumber}>
        <PhoneNumberSignInContainer onSuccess={onSignIn} mode={'signIn'} />
      </If>

      <If condition={providers.emailLink}>
        <EmailLinkAuth />
      </If>

      <If condition={providers.emailOtp}>
        <EmailOtpContainer shouldCreateUser={false} />
      </If>
    </>
  );
}

export default SignInMethodsContainer;
