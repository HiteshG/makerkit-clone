'use client';

import { useFormStatus } from 'react-dom';

import Button from '~/core/ui/Button';
import Modal from '~/core/ui/Modal';
import If from '~/core/ui/If';
import Heading from '~/core/ui/Heading';

import {
  TextFieldHint,
  TextFieldInput,
  TextFieldLabel,
} from '~/core/ui/TextField';

import ErrorBoundary from '~/core/ui/ErrorBoundary';
import Alert from '~/core/ui/Alert';

import useCurrentUserRole from '~/lib/organizations/hooks/use-current-user-role';
import MembershipRole from '~/lib/organizations/types/membership-role';
import useCurrentOrganization from '~/lib/organizations/hooks/use-current-organization';

import {
  deleteOrganizationAction,
  leaveOrganizationAction,
} from '~/lib/organizations/actions';

export function OrganizationDangerZone() {
  const useRole = useCurrentUserRole();
  const isOwner = useRole === MembershipRole.Owner;

  return (
    <>
      <If condition={isOwner}>
        <DeleteOrganizationContainer />
      </If>

      <If condition={!isOwner}>
        <LeaveOrganizationContainer />
      </If>
    </>
  );
}

function DeleteOrganizationContainer() {
  const organization = useCurrentOrganization();

  return (
    <div className={'flex flex-col space-y-4'}>
      <div className={'flex flex-col space-y-1'}>
        <Heading type={6}>
          Delete Organization
        </Heading>

        <p className={'text-gray-500 text-sm'}>
          This action cannot be undone. All data associated with this organization will be deleted.
        </p>
      </div>

      <div>
        <Modal
          heading={"Delete Organization"}
          Trigger={
            <Button
              data-cy={'delete-organization-button'}
              type={'button'}
              variant={'destructive'}
            >
              Delete Organization
            </Button>
          }
        >
          <If condition={organization}>
            {({ name, id }) => <DeleteOrganizationForm name={name} id={id} />}
          </If>
        </Modal>
      </div>
    </div>
  );
}

function DeleteOrganizationForm({ name, id }: { name: string; id: number }) {
  return (
    <ErrorBoundary fallback={<DeleteOrganizationErrorAlert />}>
      <form
        className={'flex flex-col space-y-4'}
        action={deleteOrganizationAction}
      >
        <div className={'flex flex-col space-y-2'}>
          <div
            className={
              'border-2 border-red-500 p-4 text-sm text-red-500' +
              ' flex flex-col space-y-2'
            }
          >
            <div>
              You are deleting the organization { name }. This action cannot be undone.
            </div>

            <div className={'text-sm'}>
              Are you sure you want to continue?
            </div>
          </div>

          <input type="hidden" value={id} name={'id'} />

          <TextFieldLabel>
            Organization Name

            <TextFieldInput
              name={'name'}
              data-cy={'delete-organization-input-field'}
              required
              type={'text'}
              className={'w-full'}
              placeholder={''}
              pattern={name}
            />

            <TextFieldHint>
              Type the name of the organization to confirm
            </TextFieldHint>
          </TextFieldLabel>
        </div>

        <div className={'flex justify-end space-x-2.5'}>
          <DeleteOrganizationSubmitButton />
        </div>
      </form>
    </ErrorBoundary>
  );
}

function DeleteOrganizationSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      data-cy={'confirm-delete-organization-button'}
      loading={pending}
      variant={'destructive'}
    >
      Delete Organization
    </Button>
  );
}

function LeaveOrganizationContainer() {
  const organization = useCurrentOrganization();

  if (!organization) {
    return null;
  }

  const { name, id } = organization;

  return (
    <div className={'flex flex-col space-y-4'}>
      <p>
        You will no longer have access to this organization.
      </p>

      <div>
        <Modal
          heading={"Leaving Organization"}
          Trigger={
            <Button
              data-cy={'leave-organization-button'}
              type={'button'}
              variant={'destructive'}
            >
              Leave Organization
            </Button>
          }
        >
          <ErrorBoundary fallback={<LeaveOrganizationErrorAlert />}>
            <form action={leaveOrganizationAction}>
              <input type={'hidden'} value={id} name={'id'} />

              <div className={'flex flex-col space-y-4'}>
                <div>
                  <div>
                    You are leaving the organization {organization?.name}. You will no longer have access to it.
                  </div>
                </div>

                <div className={'flex justify-end space-x-2.5'}>
                  <LeaveOrganizationSubmitButton />
                </div>
              </div>
            </form>
          </ErrorBoundary>
        </Modal>
      </div>
    </div>
  );
}

function LeaveOrganizationSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      data-cy={'confirm-leave-organization-button'}
      loading={pending}
      variant={'destructive'}
    >
      Leave Organization
    </Button>
  );
}

function LeaveOrganizationErrorAlert() {
  return (
    <Alert type={'error'}>
      <Alert.Heading>
        Sorry, we couldn&apos;t leave your organization.
      </Alert.Heading>

      Sorry, something went wrong.
    </Alert>
  );
}

function DeleteOrganizationErrorAlert() {
  return (
    <Alert type={'error'}>
      <Alert.Heading>
      Sorry, we couldn&apos;t delete your organization.
      </Alert.Heading>

      Sorry, something went wrong.
    </Alert>
  );
}
