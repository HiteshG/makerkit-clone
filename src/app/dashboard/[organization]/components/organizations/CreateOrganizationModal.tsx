'use client';

import { useFormStatus } from 'react-dom';
import { useState } from 'react';

import TextField from '~/core/ui/TextField';
import Button from '~/core/ui/Button';
import Alert from '~/core/ui/Alert';
import Trans from '~/core/ui/Trans';
import If from '~/core/ui/If';
import { Dialog, DialogContent, DialogTitle } from '~/core/ui/Dialog';

import { createNewOrganizationAction } from '~/lib/organizations/actions';

const CreateOrganizationModal: React.FC<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}> = ({ isOpen, setIsOpen }) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogTitle>
          <Trans i18nKey={'organization:createOrganizationModalHeading'} />
        </DialogTitle>

        <CreateOrganizationForm setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateOrganizationModal;

function CreateOrganizationForm({
  setIsOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
}) {
  const [error, setError] = useState<boolean>();

  return (
    <form
      action={async (data) => {
        try {
          await createNewOrganizationAction(data);
          setIsOpen(false);
        } catch (error) {
          setError(true);
        }
      }}
    >
      <div className={'flex flex-col space-y-6'}>
        <If condition={error}>
          <CreateOrganizationErrorAlert />
        </If>

        <TextField>
          <TextField.Label>
            <Trans i18nKey={'organization:organizationNameLabel'} />

            <TextField.Input
              data-cy={'create-organization-name-input'}
              name={'organization'}
              required
              minLength={2}
              maxLength={50}
              placeholder={'ex. IndieCorp'}
            />
          </TextField.Label>
        </TextField>

        <div className={'flex space-x-2 justify-end'}>
          <Button
            variant={'ghost'}
            type={'button'}
            onClick={() => setIsOpen(false)}
          >
            <Trans i18nKey={'common:cancel'} />
          </Button>

          <SubmitButton />
        </div>
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button data-cy={'confirm-create-organization-button'} loading={pending}>
      <Trans i18nKey={'organization:createOrganizationSubmitLabel'} />
    </Button>
  );
}

function CreateOrganizationErrorAlert() {
  return (
    <Alert type={'error'}>
      <Alert.Heading>
        <Trans i18nKey={'organization:createOrganizationErrorHeading'} />
      </Alert.Heading>

      <Trans i18nKey={'organization:createOrganizationErrorMessage'} />
    </Alert>
  );
}
