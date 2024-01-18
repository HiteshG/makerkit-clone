'use client';

import { useFormStatus } from 'react-dom';
import { useState } from 'react';

import TextField from '~/core/ui/TextField';
import Button from '~/core/ui/Button';
import Alert from '~/core/ui/Alert';
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
          Create Organization
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
            Organization Name

            <TextField.Input
              data-cy={'create-organization-name-input'}
              name={'organization'}
              required
              minLength={2}
              maxLength={50}
              placeholder={'Your Organization'}
            />
          </TextField.Label>
        </TextField>

        <div className={'flex space-x-2 justify-end'}>
          <Button
            variant={'ghost'}
            type={'button'}
            onClick={() => setIsOpen(false)}
          >
            Cancel
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
      Create Organization
    </Button>
  );
}

function CreateOrganizationErrorAlert() {
  return (
    <Alert type={'error'}>
      <Alert.Heading>
        Sorry, we couldn&apos;t create your organization.
      </Alert.Heading>

      We encountered an error creating your organization. Please try again.
    </Alert>
  );
}
