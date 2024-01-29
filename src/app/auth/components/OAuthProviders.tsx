'use client';

import { useCallback } from 'react';
import Trans from '~/core/ui/Trans';

import AuthProviderButton from '~/core/ui/AuthProviderButton';
import If from '~/core/ui/If';

import AuthErrorMessage from './AuthErrorMessage';
import PageLoadingIndicator from '~/core/ui/PageLoadingIndicator';

import configuration from '~/configuration';
import useSignInWithProvider from '~/core/hooks/use-sign-in-with-provider';

const OAUTH_PROVIDERS = configuration.auth.providers.oAuth;

const OAuthProviders: React.FCC<{
  returnUrl?: string;
  inviteCode?: string;
}> = (props) => {
  const signInWithProviderMutation = useSignInWithProvider();

  // we make the UI "busy" until the next page is fully loaded
  const loading = signInWithProviderMutation.isMutating;

  const onSignInWithProvider = useCallback(
    async (signInRequest: () => Promise<unknown>) => {
      try {
        const credential = await signInRequest();

        if (!credential) {
          return Promise.reject();
        }
      } catch (error) {
        throw error;
      }
    },
    [],
  );

  if (!OAUTH_PROVIDERS || !OAUTH_PROVIDERS.length) {
    return null;
  }

  return (
    <>
      <If condition={loading}>
        <PageLoadingIndicator />
      </If>

      <div className={'flex w-full flex-1 flex-col space-y-3'}>
        <div className={'flex-col space-y-2'}>
          {OAUTH_PROVIDERS.map((provider) => {
            return (
              <AuthProviderButton
                key={provider}
                providerId={provider}
                onClick={() => {
                  const origin = window.location.origin;
                  const callback = configuration.paths.authCallback;
                  const queryParams = new URLSearchParams();

                  if (props.returnUrl) {
                    queryParams.set('next', props.returnUrl);
                  }

                  if (props.inviteCode) {
                    queryParams.set('inviteCode', props.inviteCode);
                  }

                  const redirectPath = [callback, queryParams.toString()].join(
                    '?',
                  );

                  const redirectTo = [origin, redirectPath].join('');

                  const credentials = {
                    provider,
                    options: {
                      redirectTo,
                    },
                  };

                  return onSignInWithProvider(() =>
                    signInWithProviderMutation.trigger(credentials),
                  );
                }}
              >
                <Trans
                  i18nKey={'auth:signInWithProvider'}
                  values={{
                    provider: getProviderName(provider),
                  }}
                />
              </AuthProviderButton>
            );
          })}
        </div>

        <AuthErrorMessage error={signInWithProviderMutation.error} />
      </div>
    </>
  );
};

function getProviderName(providerId: string) {
  const capitalize = (value: string) =>
    value.slice(0, 1).toUpperCase() + value.slice(1);

  if (providerId.endsWith('.com')) {
    return capitalize(providerId.split('.com')[0]);
  }

  return capitalize(providerId);
}

export default OAuthProviders;
