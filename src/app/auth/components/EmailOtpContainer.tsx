'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import VerificationCodeInput from '~/app/auth/components/VerificationCodeInput';

import Trans from '~/core/ui/Trans';
import Button from '~/core/ui/Button';
import If from '~/core/ui/If';
import { TextFieldInput, TextFieldLabel } from '~/core/ui/TextField';

import configuration from '~/configuration';

import useSignInWithOtp from '~/core/hooks/use-sign-in-with-otp';
import useVerifyOtp from '~/core/hooks/use-verify-otp';

function EmailOtpContainer({
  shouldCreateUser,
  onSuccess,
  inviteCode,
}: React.PropsWithChildren<{
  inviteCode?: string;
  shouldCreateUser: boolean;
  onSuccess?: () => void;
}>) {
  const [email, setEmail] = useState('');

  if (email) {
    return (
      <VerifyOtpForm
        inviteCode={inviteCode}
        onSuccess={onSuccess}
        email={email}
      />
    );
  }

  return (
    <EmailOtpForm onSuccess={setEmail} shouldCreateUser={shouldCreateUser} />
  );
}

function VerifyOtpForm({
  email,
  inviteCode,
  onSuccess,
}: {
  email: string;
  inviteCode?: string;
  onSuccess?: () => void;
}) {
  const router = useRouter();
  const verifyOtpMutation = useVerifyOtp();
  const [verifyCode, setVerifyCode] = useState('');

  return (
    <form
      className={'w-full'}
      onSubmit={async (event) => {
        event.preventDefault();

        const origin = window.location.origin;
        const queryParams = inviteCode ? `?inviteCode=${inviteCode}` : '';

        const redirectTo = [
          origin,
          configuration.paths.authCallback,
          queryParams,
        ].join('');

        await verifyOtpMutation.trigger({
          email,
          token: verifyCode,
          type: 'email',
          options: {
            redirectTo,
          },
        });

        if (onSuccess) {
          onSuccess();
        } else {
          router.replace(configuration.paths.appHome);
        }
      }}
    >
      <div className={'flex flex-col space-y-4'}>
        <VerificationCodeInput
          onValid={setVerifyCode}
          onInvalid={() => setVerifyCode('')}
        />

        <Button loading={verifyOtpMutation.isMutating} disabled={!verifyCode}>
          {verifyOtpMutation.isMutating ? (
            <Trans i18nKey={'profile:verifyingCode'} />
          ) : (
            <Trans i18nKey={'profile:submitVerificationCode'} />
          )}
        </Button>
      </div>
    </form>
  );
}

function EmailOtpForm({
  shouldCreateUser,
  onSuccess,
}: React.PropsWithChildren<{
  shouldCreateUser: boolean;
  onSuccess: (email: string) => void;
}>) {
  const signInWithOtpMutation = useSignInWithOtp();

  return (
    <form
      className={'w-full'}
      onSubmit={async (event) => {
        event.preventDefault();

        const email = event.currentTarget.email.value;

        await signInWithOtpMutation.trigger({
          email,
          options: {
            shouldCreateUser,
          },
        });

        onSuccess(email);
      }}
    >
      <div className={'flex flex-col space-y-4'}>
        <TextFieldLabel>
          <Trans i18nKey={'auth:emailAddress'} />
          <TextFieldInput name={'email'} type={'email'} placeholder={''} />
        </TextFieldLabel>

        <Button loading={signInWithOtpMutation.isMutating}>
          <If
            condition={signInWithOtpMutation.isMutating}
            fallback={<Trans i18nKey={'auth:sendEmailCode'} />}
          >
            <Trans i18nKey={'auth:sendingEmailCode'} />
          </If>
        </Button>
      </div>
    </form>
  );
}

export default EmailOtpContainer;
