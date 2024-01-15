import React, { useCallback } from "react";
import Image from "next/image";

import AuthErrorMessage from "./AuthErrorMessage";
import AvailableProvider from './AvailableProvider';
import PageLoadingIndicator from "@/core/ui/page-loading-indicator";

import configuration from "../../../configuration";
import useSignInWithProvider from "@/core/hooks/use-sign-in-with-provider";
import If from "@/core/ui/if";
import { GoogleAuthProvider } from "firebase/auth";

const OAUTH_PROVIDERS = configuration.auth.providers.oAuth;

const OAuthProviders = (props: {
  returnUrl?: string;
  inviteCode?: string;
}) => {
  const signInWithProviderMutation = useSignInWithProvider();

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
    []
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
          <AvailableProvider
            icon={<Image alt="google.com logo" fetchPriority="high" width="22" height="22" decoding="async" data-nimg="1" src="/assets/images/google.webp" />}
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
                new GoogleAuthProvider(),
              };

              return onSignInWithProvider(() =>
                signInWithProviderMutation.trigger(credentials),
              );
            }}
          >
            Sign in with Google
          </AvailableProvider>
        </div>

        <AuthErrorMessage error={signInWithProviderMutation.error} />
      </div>
    </>
  )
};

