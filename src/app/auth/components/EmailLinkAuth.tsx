'use client';

import type { FormEventHandler } from 'react';
import { useCallback } from 'react';
import { toast } from 'sonner';

import TextField from '~/core/ui/TextField';
import Button from '~/core/ui/Button';
import If from '~/core/ui/If';
import Alert from '~/core/ui/Alert';
import useSignInWithOtp from '~/core/hooks/use-sign-in-with-otp';
import configuration from '~/configuration';

const EmailLinkAuth: React.FC<{
  inviteCode?: string;
}> = ({ inviteCode }) => {
  const signInWithOtpMutation = useSignInWithOtp();

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();

      const target = event.currentTarget;
      const data = new FormData(target);
      const email = data.get('email') as string;

      const origin = window.location.origin;
      const queryParams = inviteCode ? `?inviteCode=${inviteCode}` : '';

      const redirectUrl = [
        origin,
        configuration.paths.authCallback,
        queryParams,
      ].join('');

      const promise = signInWithOtpMutation.trigger({
        email,
        options: {
          emailRedirectTo: redirectUrl,
        },
      });

      toast.promise(promise, {
        loading: "Sending Email Link...",
        success: "Link successfully sent",
        error: "Sorry, we encountered an error while sending your link. Please try again.",
      });
    },
    [signInWithOtpMutation, inviteCode],
  );

  if (signInWithOtpMutation.data) {
    return (
      <Alert type={'success'}>
        We sent you a link to your email! Follow the link to sign in.
      </Alert>
    );
  }

  return (
    <form className={'w-full'} onSubmit={onSubmit}>
      <div className={'flex flex-col space-y-4'}>
        <TextField>
          <TextField.Label>
            Email Address

            <TextField.Input
              data-cy={'email-input'}
              required
              type="email"
              placeholder={'your@email.com'}
              name={'email'}
            />
          </TextField.Label>
        </TextField>

        <Button loading={signInWithOtpMutation.isMutating}>
          <If
            condition={signInWithOtpMutation.isMutating}
            fallback={"Send Email Link"}
          >
            Sending Email Link...
          </If>
        </Button>
      </div>

      <If condition={signInWithOtpMutation.error}>
        <Alert type={'error'}>
          Sorry, we encountered an error while sending your link. Please try again.
        </Alert>
      </If>
    </form>
  );
};

export default EmailLinkAuth;
