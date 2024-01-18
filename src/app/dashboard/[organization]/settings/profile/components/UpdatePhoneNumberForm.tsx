'use client';

import { useCallback, useState } from 'react';
import useMutation from 'swr/mutation';
import { toast } from 'sonner';

import UserSession from '~/core/session/types/user-session';
import TextField from '~/core/ui/TextField';
import If from '~/core/ui/If';

import Button from '~/core/ui/Button';
import Modal from '~/core/ui/Modal';
import AuthErrorMessage from '~/app/auth/components/AuthErrorMessage';
import useSupabase from '~/core/hooks/use-supabase';

import configuration from '~/configuration';

interface UpdatePhoneNumberFormProps {
  session: UserSession;
  onUpdate: (phoneNumber: Maybe<string>) => void;
}

function UpdatePhoneNumberForm({
  session,
  onUpdate,
}: UpdatePhoneNumberFormProps) {
  const { trigger, isMutating } = useUpdatePhoneNumber();
  const currentPhoneNumber = session.auth?.user?.phone ?? '';

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);
        const phoneNumber = formData.get('phoneNumber') as string;

        const promise = trigger(phoneNumber).then(() => {
          onUpdate(phoneNumber);
        });

        return toast.promise(promise, {
          loading: "Updating phone number...",
          success: "Phone number successfully updated",
          error: "Sorry, we weren't able to update your phone number",
        });
      }}
      data-cy={'update-phone-number-form'}
    >
      <div className={'flex flex-col space-y-4'}>
        <TextField>
          <TextField.Label>
            Phone Number

            <TextField.Input
              name={'phoneNumber'}
              defaultValue={currentPhoneNumber}
            />
          </TextField.Label>

          {/* Only show this if phone number is enabled */}
          <If condition={configuration.auth.providers.phoneNumber}>
            <div>
              <If condition={currentPhoneNumber}>
                <RemovePhoneNumberButton
                  onSuccess={() => {
                    onUpdate(undefined);
                  }}
                />
              </If>
            </div>
          </If>
        </TextField>

        <div>
          <Button loading={isMutating}>
            Update Phone Number
          </Button>
        </div>
      </div>
    </form>
  );
}

export default UpdatePhoneNumberForm;

function RemovePhoneNumberButton({
  onSuccess,
}: React.PropsWithChildren<{
  onSuccess: () => void;
}>) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { trigger, error, isMutating } = useUpdatePhoneNumber();

  const onUnlinkPhoneNumber = useCallback(() => {
    const promise = trigger('').then(() => {
      setIsModalOpen(false);
      onSuccess();
    });

    return toast.promise(promise, {
      loading: "Unlinking account...",
      success: "Account successfully unlinked",
      error: "Sorry, we couldn't unlink this account",
    });
  }, [trigger, onSuccess]);

  return (
    <>
      <Button
        type={'button'}
        variant={'ghost'}
        size={'small'}
        onClick={() => setIsModalOpen(true)}
      >
        <span className={'text-xs font-normal'}>
          Remove Phone Number
        </span>
      </Button>

      <Modal
        heading={"Remove Phone Number"}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      >
        <div className={'flex flex-col space-y-2.5 text-sm'}>
          <div>
            You&apos;re about to remove your phone number. You will not be able to use it to login to your account.
          </div>

          <div>
            Are you sure you want to continue?
          </div>

          <AuthErrorMessage error={error} />

          <div className={'flex justify-end space-x-2'}>
            <Modal.CancelButton onClick={() => setIsModalOpen(false)} />

            <Button
              type={'button'}
              variant={'destructive'}
              loading={isMutating}
              onClick={onUnlinkPhoneNumber}
            >
              Yes, remove phone number
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

function useUpdatePhoneNumber() {
  const client = useSupabase();
  const key = 'useUpdatePhoneNumber';

  return useMutation(key, async (_, { arg: phone }: { arg: string }) => {
    return client.auth.updateUser({ phone }).then((response) => {
      if (response.error) {
        throw response.error;
      }

      return response.data;
    });
  });
}
