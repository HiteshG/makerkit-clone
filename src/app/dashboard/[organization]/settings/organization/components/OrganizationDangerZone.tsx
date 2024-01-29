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

import Trans from '~/core/ui/Trans';
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
          <Trans i18nKey={'organization:deleteOrganization'} />
        </Heading>

        <p className={'text-gray-500 text-sm'}>
          <Trans
            i18nKey={'organization:deleteOrganizationDescription'}
            values={{
              organizationName: organization?.name,
            }}
          />
        </p>
      </div>

      <div>
        <Modal
          heading={<Trans i18nKey={'organization:deletingOrganization'} />}
          Trigger={
            <Button
              data-cy={'delete-organization-button'}
              type={'button'}
              variant={'destructive'}
            >
              <Trans i18nKey={'organization:deleteOrganization'} />
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
              <Trans
                i18nKey={'organization:deleteOrganizationDisclaimer'}
                values={{
                  organizationName: name,
                }}
              />
            </div>

            <div className={'text-sm'}>
              <Trans i18nKey={'common:modalConfirmationQuestion'} />
            </div>
          </div>

          <input type="hidden" value={id} name={'id'} />

          <TextFieldLabel>
            <Trans i18nKey={'organization:organizationNameInputLabel'} />

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
              <Trans i18nKey={'organization:deleteOrganizationInputField'} />
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
      <Trans i18nKey={'organization:deleteOrganization'} />
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
        <Trans
          i18nKey={'organization:leaveOrganizationDescription'}
          values={{
            organizationName: name,
          }}
        />
      </p>

      <div>
        <Modal
          heading={
            <Trans i18nKey={'organization:leavingOrganizationModalHeading'} />
          }
          Trigger={
            <Button
              data-cy={'leave-organization-button'}
              type={'button'}
              variant={'destructive'}
            >
              <Trans i18nKey={'organization:leaveOrganization'} />
            </Button>
          }
        >
          <ErrorBoundary fallback={<LeaveOrganizationErrorAlert />}>
            <form action={leaveOrganizationAction}>
              <input type={'hidden'} value={id} name={'id'} />

              <div className={'flex flex-col space-y-4'}>
                <div>
                  <div>
                    <Trans
                      i18nKey={'organization:leaveOrganizationDisclaimer'}
                      values={{
                        organizationName: organization?.name,
                      }}
                    />
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
      <Trans i18nKey={'organization:leaveOrganization'} />
    </Button>
  );
}

function LeaveOrganizationErrorAlert() {
  return (
    <Alert type={'error'}>
      <Alert.Heading>
        <Trans i18nKey={'organization:leaveOrganizationErrorHeading'} />
      </Alert.Heading>

      <Trans i18nKey={'common:genericError'} />
    </Alert>
  );
}

function DeleteOrganizationErrorAlert() {
  return (
    <Alert type={'error'}>
      <Alert.Heading>
        <Trans i18nKey={'organization:deleteOrganizationErrorHeading'} />
      </Alert.Heading>

      <Trans i18nKey={'common:genericError'} />
    </Alert>
  );
}
