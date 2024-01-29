'use client';

import useMutation from 'swr/mutation';

import Trans from '~/core/ui/Trans';
import Button from '~/core/ui/Button';
import useSupabase from '~/core/hooks/use-supabase';
import { TextFieldInput, TextFieldLabel } from '~/core/ui/TextField';
import Alert from '~/core/ui/Alert';

function ResendLinkForm() {
  const resendLink = useResendLink();

  if (resendLink.data && !resendLink.isMutating) {
    return (
      <Alert type={'success'}>
        <Trans i18nKey={'auth:resendLinkSuccess'} defaults={'Success!'} />
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
        <Trans i18nKey={'common:emailAddress'} />
        <TextFieldInput name={'email'} required placeholder={''} />
      </TextFieldLabel>

      <Button loading={resendLink.isMutating}>
        <Trans i18nKey={'auth:resendLink'} defaults={'Resend Link'} />
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
