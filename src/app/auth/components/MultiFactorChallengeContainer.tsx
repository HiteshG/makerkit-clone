import type { FormEventHandler } from 'react';
import { useCallback, useEffect, useState } from 'react';
import useMutation from 'swr/mutation';

import useSupabase from '~/core/hooks/use-supabase';
import Spinner from '~/core/ui/Spinner';
import Alert from '~/core/ui/Alert';
import Button from '~/core/ui/Button';
import useSignOut from '~/core/hooks/use-sign-out';
import Heading from '~/core/ui/Heading';
import If from '~/core/ui/If';
import Trans from '~/core/ui/Trans';

import VerificationCodeInput from './VerificationCodeInput';
import useFetchAuthFactors from '~/core/hooks/use-fetch-factors';

function MultiFactorChallengeContainer({
  onSuccess,
}: React.PropsWithChildren<{
  onSuccess: () => void;
}>) {
  const [factorId, setFactorId] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const mutation = useVerifyMFAChallenge();

  const onSubmitClicked: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();

      if (!factorId || !verifyCode) {
        return;
      }

      await mutation.trigger({
        factorId,
        verifyCode,
      });

      onSuccess();
    },
    [factorId, mutation, onSuccess, verifyCode]
  );

  if (!factorId) {
    return (
      <FactorsListContainer onSelect={setFactorId} onSuccess={onSuccess} />
    );
  }

  return (
    <form onSubmit={onSubmitClicked}>
      <div className={'flex flex-col space-y-4'}>
        <span className={'text-sm'}>
          <Trans i18nKey={'profile:verifyActivationCodeDescription'} />
        </span>

        <div className={'flex w-full flex-col space-y-2.5'}>
          <VerificationCodeInput
            onInvalid={() => setVerifyCode('')}
            onValid={setVerifyCode}
          />

          <If condition={mutation.error}>
            <Alert type={'error'}>
              <Trans i18nKey={'profile:invalidVerificationCode'} />
            </Alert>
          </If>
        </div>

        <Button loading={mutation.isMutating} disabled={!verifyCode}>
          {mutation.isMutating ? (
            <Trans i18nKey={'profile:verifyingCode'} />
          ) : (
            <Trans i18nKey={'profile:submitVerificationCode'} />
          )}
        </Button>
      </div>
    </form>
  );
}

export default MultiFactorChallengeContainer;

function useVerifyMFAChallenge() {
  const client = useSupabase();

  return useMutation(
    ['mfa-verify-challenge'],
    async (
      _,
      {
        arg,
      }: {
        arg: {
          factorId: string;
          verifyCode: string;
        };
      }
    ) => {
      const { factorId, verifyCode: code } = arg;

      const response = await client.auth.mfa.challengeAndVerify({
        factorId,
        code,
      });

      if (response.error) {
        throw response.error;
      }

      return response.data;
    }
  );
}

function FactorsListContainer({
  onSuccess,
  onSelect,
}: React.PropsWithChildren<{
  onSuccess: () => void;
  onSelect: (factor: string) => void;
}>) {
  const signOut = useSignOut();

  const { data: factors, isLoading, error } = useFetchAuthFactors();

  const isSuccess = factors && !isLoading && !error;

  useEffect(() => {
    // If there are no factors, continue
    if (isSuccess && !factors.totp.length) {
      onSuccess();
    }
  }, [factors?.totp.length, isSuccess, onSuccess]);

  useEffect(() => {
    // If there is an error, sign out
    if (error) {
      void signOut();
    }
  }, [error, signOut]);

  useEffect(() => {
    // If there is only one factor, select it automatically
    if (isSuccess && factors.totp.length === 1) {
      onSelect(factors.totp[0].id);
    }
  });

  if (isLoading) {
    return (
      <div className={'flex flex-col items-center space-y-4 py-8'}>
        <Spinner />

        <div>
          <Trans i18nKey={'profile:loadingFactors'} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={'w-full'}>
        <Alert type={'error'}>
          <Trans i18nKey={'profile:factorsListError'} />
        </Alert>
      </div>
    );
  }

  const verifiedFactors = factors?.totp ?? [];

  return (
    <div className={'flex flex-col space-y-4'}>
      <div>
        <Heading type={6}>
          <Trans i18nKey={'profile:selectFactor'} />
        </Heading>
      </div>

      {verifiedFactors.map((factor) => (
        <div key={factor.id}>
          <Button
            block
            variant={'outline'}
            className={'border-gray-50'}
            onClick={() => onSelect(factor.id)}
          >
            {factor.friendly_name}
          </Button>
        </div>
      ))}
    </div>
  );
}
