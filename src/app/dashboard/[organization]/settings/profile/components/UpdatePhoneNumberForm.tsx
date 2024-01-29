'use client';

import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useMutation from 'swr/mutation';
import { toast } from 'sonner';

import UserSession from '~/core/session/types/user-session';
import TextField from '~/core/ui/TextField';
import Trans from '~/core/ui/Trans';
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
  const { t } = useTranslation();
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
          loading: t(`profile:updatePhoneNumberLoading`),
          success: t(`profile:updatePhoneNumberSuccess`),
          error: t(`profile:updatePhoneNumberError`),
        });
      }}
      data-cy={'update-phone-number-form'}
    >
      <div className={'flex flex-col space-y-4'}>
        <TextField>
          <TextField.Label>
            <Trans i18nKey={'profile:phoneNumberLabel'} />

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
            <Trans i18nKey={'profile:updatePhoneNumber'} />
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
  const { t } = useTranslation();
  const { trigger, error, isMutating } = useUpdatePhoneNumber();

  const onUnlinkPhoneNumber = useCallback(() => {
    const promise = trigger('').then(() => {
      setIsModalOpen(false);
      onSuccess();
    });

    return toast.promise(promise, {
      loading: t(`profile:unlinkActionLoading`),
      success: t(`profile:unlinkActionSuccess`),
      error: t(`profile:unlinkActionError`),
    });
  }, [trigger, t, onSuccess]);

  return (
    <>
      <Button
        type={'button'}
        variant={'ghost'}
        size={'small'}
        onClick={() => setIsModalOpen(true)}
      >
        <span className={'text-xs font-normal'}>
          <Trans i18nKey={'profile:removePhoneNumber'} />
        </span>
      </Button>

      <Modal
        heading={<Trans i18nKey={'profile:removePhoneNumber'} />}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      >
        <div className={'flex flex-col space-y-2.5 text-sm'}>
          <div>
            <Trans i18nKey={'profile:confirmRemovePhoneNumberDescription'} />
          </div>

          <div>
            <Trans i18nKey={'common:modalConfirmationQuestion'} />
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
              <Trans i18nKey={'profile:confirmRemovePhoneNumber'} />
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
