'use client';

import { useFormStatus } from 'react-dom';

import Modal from '~/core/ui/Modal';
import Button from '~/core/ui/Button';
import Heading from '~/core/ui/Heading';
import { TextFieldInput, TextFieldLabel } from '~/core/ui/TextField';
import ErrorBoundary from '~/core/ui/ErrorBoundary';
import Alert from '~/core/ui/Alert';
import { deleteUserAccountAction } from '~/lib/user/actions.server';

function ProfileDangerZone() {
  return <DeleteProfileContainer />;
}

export default ProfileDangerZone;

function DeleteProfileContainer() {
  return (
    <div className={'flex flex-col space-y-4'}>
      <div className={'flex flex-col space-y-1'}>
        <Heading type={6}>
          Delete your Account
        </Heading>

        <p className={'text-gray-500 text-sm'}>
          This will delete your account and the organizations you own. Furthermore, we will immediately cancel any active subscriptions. This action cannot be undone. You will be asked to confirm this action in the next step.
        </p>
      </div>

      <div>
        <DeleteProfileModal />
      </div>
    </div>
  );
}

function DeleteProfileModal() {
  return (
    <Modal
      heading={"Delete your Account"}
      Trigger={
        <Button data-cy={'delete-account-button'} variant={'destructive'}>
          Delete your Account
        </Button>
      }
    >
      <ErrorBoundary fallback={<DeleteProfileErrorAlert />}>
        <DeleteProfileForm />
      </ErrorBoundary>
    </Modal>
  );
}

function DeleteProfileForm() {
  return (
    <form
      action={deleteUserAccountAction}
      className={'flex flex-col space-y-4'}
    >
      <div className={'flex flex-col space-y-6'}>
        <div className={'border-2 border-red-500 p-4 text-sm text-red-500'}>
          <div className={'flex flex-col space-y-2'}>
            <div>
              This will delete your account and the organizations you own. Furthermore, we will immediately cancel any active subscriptions. This action cannot be undone. You will be asked to confirm this action in the next step.
            </div>

            <div>
              Are you sure you want to continue?
            </div>
          </div>
        </div>

        <TextFieldLabel>
          Type DELETE to confirm

          <TextFieldInput
            data-cy={'delete-account-input-field'}
            required
            type={'text'}
            className={'w-full'}
            placeholder={''}
            pattern={`DELETE`}
          />
        </TextFieldLabel>
      </div>

      <div className={'flex justify-end space-x-2.5'}>
        <DeleteAccountSubmitButton />
      </div>
    </form>
  );
}

function DeleteAccountSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      data-cy={'confirm-delete-account-button'}
      name={'action'}
      value={'delete'}
      variant={'destructive'}
      loading={pending}
    >
      Delete your Account
    </Button>
  );
}

function DeleteProfileErrorAlert() {
  return (
    <Alert type={'error'}>
      <Alert.Heading>
        Sorry, we couldn&apos;t delete your account
      </Alert.Heading>

      Sorry, something went wrong.
    </Alert>
  );
}
