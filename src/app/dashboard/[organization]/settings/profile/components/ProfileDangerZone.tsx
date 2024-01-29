'use client';

import { useFormStatus } from 'react-dom';

import Modal from '~/core/ui/Modal';
import Button from '~/core/ui/Button';
import Heading from '~/core/ui/Heading';
import { TextFieldInput, TextFieldLabel } from '~/core/ui/TextField';
import Trans from '~/core/ui/Trans';
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
          <Trans i18nKey={'profile:deleteAccount'} />
        </Heading>

        <p className={'text-gray-500 text-sm'}>
          <Trans i18nKey={'profile:deleteAccountDescription'} />
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
      heading={<Trans i18nKey={'profile:deleteAccount'} />}
      Trigger={
        <Button data-cy={'delete-account-button'} variant={'destructive'}>
          <Trans i18nKey={'profile:deleteAccount'} />
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
              <Trans i18nKey={'profile:deleteAccountDescription'} />
            </div>

            <div>
              <Trans i18nKey={'common:modalConfirmationQuestion'} />
            </div>
          </div>
        </div>

        <TextFieldLabel>
          <Trans i18nKey={'profile:deleteProfileConfirmationInputLabel'} />

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
      <Trans i18nKey={'profile:deleteAccount'} />
    </Button>
  );
}

function DeleteProfileErrorAlert() {
  return (
    <Alert type={'error'}>
      <Alert.Heading>
        <Trans i18nKey={'profile:deleteAccountErrorHeading'} />
      </Alert.Heading>

      <Trans i18nKey={'common:genericError'} />
    </Alert>
  );
}
