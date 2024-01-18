'use client';

import { useCallback, useState } from 'react';
import type { User } from '@supabase/gotrue-js';

import { toast } from 'sonner';
import { useForm } from 'react-hook-form';

import useUpdateUserMutation from '~/core/hooks/use-update-user-mutation';

import Button from '~/core/ui/Button';
import TextField from '~/core/ui/TextField';
import Alert from '~/core/ui/Alert';
import If from '~/core/ui/If';

import configuration from '~/configuration';

const UpdatePasswordForm = ({ user }: { user: User }) => {
  const updateUserMutation = useUpdateUserMutation();
  const [needsReauthentication, setNeedsReauthentication] = useState(false);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      repeatPassword: '',
    },
  });

  const errors = formState.errors;

  const newPasswordControl = register('newPassword', {
    value: '',
    required: true,
    minLength: {
      value: 6,
      message: "Please provide a password with at least 6 characters",
    },
    validate: (value) => {
      // current password cannot be the same as the current one
      if (value === getValues('currentPassword')) {
        return "Your password has not changed";
      }
    },
  });

  const repeatPasswordControl = register('repeatPassword', {
    value: '',
    required: true,
    minLength: {
      value: 6,
      message: "Please provide a password with at least 6 characters",
    },
    validate: (value) => {
      // new password and repeat new password must match
      if (value !== getValues('newPassword')) {
        return "Passwords do not match. Make sure you're using the correct password";
      }
    },
  });

  const updatePasswordFromCredential = useCallback(
    (password: string) => {
      const redirectTo = [
        window.location.origin,
        configuration.paths.authCallback,
      ].join('');

      const promise = updateUserMutation
        .trigger({ password, redirectTo })
        .then(() => {
          reset();
        })
        .catch((error) => {
          if (error.includes('Password update requires reauthentication')) {
            setNeedsReauthentication(true);
          }
        });

      toast.promise(promise, {
        success: "Password update request successful",
        error: "Encountered an error. Please try again",
        loading: "Updating password...",
      });
    },
    [updateUserMutation, reset],
  );

  const updatePasswordCallback = useCallback(
    async ({ newPassword }: { newPassword: string }) => {
      const email = user.email;

      // if the user does not have an email assigned, it's possible they
      // don't have an email/password factor linked, and the UI is out of sync
      if (!email) {
        return Promise.reject("You cannot update your password because your account is not linked to any.");
      }

      updatePasswordFromCredential(newPassword);
    },
    [user.email, updatePasswordFromCredential],
  );

  const { isMutating, data } = updateUserMutation;

  return (
    <form
      data-cy={'update-password-form'}
      onSubmit={handleSubmit(updatePasswordCallback)}
    >
      <div className={'flex flex-col space-y-4'}>
        <If condition={data}>
          <Alert type={'success'}>
            <Alert.Heading>
              Password update request successful
            </Alert.Heading>

            Your password has been successfully updated!
          </Alert>
        </If>

        <If condition={needsReauthentication}>
          <Alert type={'warn'}>
            <Alert.Heading>
              Reauthentication Required
            </Alert.Heading>

            You need to reauthenticate to change your password. Please sign out and sign in again to change your password.
          </Alert>
        </If>

        <TextField>
          <TextField.Label>
            New Password

            <TextField.Input
              data-cy={'new-password'}
              required
              type={'password'}
              {...newPasswordControl}
            />

            <TextField.Error
              data-cy={'new-password-error'}
              error={errors.newPassword?.message}
            />
          </TextField.Label>
        </TextField>

        <TextField>
          <TextField.Label>
            Repeat New Password

            <TextField.Input
              data-cy={'repeat-new-password'}
              required
              type={'password'}
              {...repeatPasswordControl}
            />

            <TextField.Error
              data-cy={'repeat-password-error'}
              error={errors.repeatPassword?.message}
            />
          </TextField.Label>
        </TextField>

        <div>
          <Button className={'w-full md:w-auto'} loading={isMutating}>
            Update Password
          </Button>
        </div>
      </div>
    </form>
  );
};

export default UpdatePasswordForm;
