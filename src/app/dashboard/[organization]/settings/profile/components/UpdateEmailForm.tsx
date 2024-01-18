'use client';

import { useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import type { User } from '@supabase/gotrue-js';

import Button from '~/core/ui/Button';
import TextField from '~/core/ui/TextField';
import If from '~/core/ui/If';
import Alert from '~/core/ui/Alert';

import useUpdateUserMutation from '~/core/hooks/use-update-user-mutation';

import configuration from '~/configuration';

const UpdateEmailForm: React.FC<{ user: User }> = ({ user }) => {
  const updateUserMutation = useUpdateUserMutation();

  const updateEmail = useCallback(
    (email: string) => {
      const redirectTo = [
        window.location.origin,
        configuration.paths.authCallback,
      ].join('');

      // then, we update the user's email address
      const promise = updateUserMutation.trigger({ email, redirectTo });

      return toast.promise(promise, {
        success: "Email update request successful",
        loading: "Updating your email...",
        error: (error: Error) => {
          return error.message ?? "Email not updated. Please try again";
        },
      });
    },
    [updateUserMutation],
  );

  const currentEmail = user?.email as string;

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      email: '',
      repeatEmail: '',
    },
  });

  const onSubmit = useCallback(
    async (params: { email: string; repeatEmail: string }) => {
      const { email, repeatEmail } = params;

      if (email !== repeatEmail) {
        const message = "Emails do not match. Make sure you're using the correct email";

        return toast.error(message);
      }

      if (email === currentEmail) {
        const message = "The email chosen is the same as your current one";

        return toast.error(message);
      }

      // otherwise, go ahead and update the email
      return await updateEmail(email);
    },
    [currentEmail, updateEmail],
  );

  const emailControl = register('email', {
    value: '',
    required: true,
  });

  const repeatEmailControl = register('repeatEmail', {
    value: '',
    required: true,
  });

  // reset the form on success
  useEffect(() => {
    if (updateUserMutation.data) {
      reset();
    }
  }, [reset, updateUserMutation.data]);

  return (
    <form
      className={'flex flex-col space-y-4'}
      data-cy={'update-email-form'}
      onSubmit={handleSubmit(onSubmit)}
    >
      <If condition={updateUserMutation.data}>
        <Alert type={'success'}>
          <Alert.Heading>
            Email update request successful
          </Alert.Heading>

          We sent you an email to confirm your new email address. Please check your inbox and click on the link to confirm your new email address.
        </Alert>
      </If>

      <div className={'flex flex-col space-y-4'}>
        <TextField>
          <TextField.Label>
            Your New Email

            <TextField.Input
              {...emailControl}
              data-cy={'profile-new-email-input'}
              required
              type={'email'}
              placeholder={''}
            />
          </TextField.Label>
        </TextField>

        <TextField>
          <TextField.Label>
            Repeat Email

            <TextField.Input
              {...repeatEmailControl}
              data-cy={'profile-repeat-email-input'}
              required
              type={'email'}
            />
          </TextField.Label>
        </TextField>

        <div>
          <Button
            className={'w-full md:w-auto'}
            loading={updateUserMutation.isMutating}
          >
            Update Email Address
          </Button>
        </div>
      </div>
    </form>
  );
};

export default UpdateEmailForm;
