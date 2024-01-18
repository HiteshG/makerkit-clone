'use client';

import useMutation from 'swr/mutation';

import Button from '~/core/ui/Button';
import useSupabase from '~/core/hooks/use-supabase';
import { TextFieldInput, TextFieldLabel } from '~/core/ui/TextField';
import Alert from '~/core/ui/Alert';

function ResendLinkForm() {
  const resendLink = useResendLink();

  if (resendLink.data && !resendLink.isMutating) {
    return (
      <Alert type={'success'}>
        We sent you a new link to your email! Follow the link to sign in.
      </Alert>
    );
  }

  return (
    <form
      className={'flex flex-col space-y-2'}
      onSubmit={(data) => {
        data.preventDefault();

        const email = new FormData(data.currentTarget).get('email') as string;

        resendLink.trigger(email);
      }}
    >
      <TextFieldLabel>
        Email Address
        <TextFieldInput name={'email'} required placeholder={''} />
      </TextFieldLabel>

      <Button loading={resendLink.isMutating}>
        Resend Link
      </Button>
    </form>
  );
}

export default ResendLinkForm;

function useResendLink() {
  const supabase = useSupabase();

  return useMutation(
    ['resend-link'],
    async (
      _,
      data: {
        arg: string;
      },
    ) => {
      const response = await supabase.auth.resend({
        email: data.arg,
        type: 'signup',
      });

      if (response.error) {
        throw response.error;
      }

      return response.data;
    },
  );
}
