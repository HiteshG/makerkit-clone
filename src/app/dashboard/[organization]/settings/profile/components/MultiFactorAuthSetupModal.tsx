import Image from 'next/image';

import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import useSupabase from '~/core/hooks/use-supabase';
import useMutation from 'swr/mutation';

import Button from '~/core/ui/Button';
import Alert from '~/core/ui/Alert';
import TextField from '~/core/ui/TextField';
import Modal from '~/core/ui/Modal';
import If from '~/core/ui/If';
import Trans from '~/core/ui/Trans';

import useFactorsMutationKey from '~/core/hooks/use-user-factors-mutation-key';
import VerificationCodeInput from '~/app/auth/components/VerificationCodeInput';

function MultiFactorAuthSetupModal(
  props: React.PropsWithChildren<{
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
  }>,
) {
  const { t } = useTranslation();

  const onEnrollSuccess = useCallback(() => {
    props.setIsOpen(false);

    return toast.success(t(`profile:multiFactorSetupSuccess`));
  }, [props, t]);

  return (
    <Modal
      closeButton={false}
      heading={<Trans i18nKey={'profile:setupMfaButtonLabel'} />}
      isOpen={props.isOpen}
      setIsOpen={props.setIsOpen}
    >
      <MultiFactorAuthSetupForm
        onCancel={() => props.setIsOpen(false)}
        onEnrolled={onEnrollSuccess}
      />
    </Modal>
  );
}

function MultiFactorAuthSetupForm({
  onEnrolled,
  onCancel,
}: React.PropsWithChildren<{
  onCancel: () => void;
  onEnrolled: () => void;
}>) {
  const { trigger: verifyCode } = useVerifyCodeMutation();
  const [factorId, setFactorId] = useState<string | undefined>();
  const [verificationCode, setVerificationCode] = useState('');

  const [state, setState] = useState({
    loading: false,
    error: '',
  });

  const onSubmit = useCallback(async () => {
    setState({
      loading: true,
      error: '',
    });

    if (!factorId || !verificationCode) {
      return setState({
        loading: false,
        error: 'No factor ID or verification code found',
      });
    }

    try {
      await verifyCode({ factorId, code: verificationCode });

      setState({
        loading: false,
        error: '',
      });

      onEnrolled();
    } catch (error) {
      const message = (error as Error).message || `Unknown error`;

      setState({
        loading: false,
        error: message,
      });
    }
  }, [onEnrolled, verifyCode, factorId, verificationCode]);

  if (state.error) {
    return (
      <div className={'flex flex-col space-y-4'}>
        <Alert type={'error'}>
          <Trans i18nKey={'profile:multiFactorSetupError'} />
        </Alert>

        <Modal.CancelButton onClick={onCancel} />
      </div>
    );
  }

  return (
    <div className={'flex flex-col space-y-4'}>
      <div className={'flex justify-center'}>
        <FactorQrCode onCancel={onCancel} onSetFactorId={setFactorId} />
      </div>

      <If condition={factorId}>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            return onSubmit();
          }}
          className={'w-full'}
        >
          <div className={'flex flex-col space-y-4'}>
            <TextField.Label>
              <Trans i18nKey={'profile:verificationCode'} />

              <VerificationCodeInput
                onInvalid={() => setVerificationCode('')}
                onValid={setVerificationCode}
              />

              <TextField.Hint>
                <Trans i18nKey={'profile:verifyActivationCodeDescription'} />
              </TextField.Hint>
            </TextField.Label>

            <div className={'flex justify-end space-x-2'}>
              <Modal.CancelButton type={'button'} onClick={onCancel} />

              <Button
                disabled={!verificationCode}
                loading={state.loading}
                type={'submit'}
              >
                {state.loading ? (
                  <Trans i18nKey={'profile:verifyingCode'} />
                ) : (
                  <Trans i18nKey={'profile:enableMfaFactor'} />
                )}
              </Button>
            </div>
          </div>
        </form>
      </If>
    </div>
  );
}

function FactorQrCode({
  onSetFactorId,
  onCancel,
}: React.PropsWithChildren<{
  onCancel: () => void;
  onSetFactorId: React.Dispatch<React.SetStateAction<string | undefined>>;
}>) {
  const { trigger: enrollFactor } = useEnrollFactor();
  const [error, setError] = useState(false);

  const [factor, setFactor] = useState({
    name: '',
    qrCode: '',
  });

  const factorName = factor.name;

  useEffect(() => {
    if (!factorName) {
      return;
    }

    (async () => {
      try {
        const data = await enrollFactor(factorName);

        if (!data) {
          return setError(true);
        }

        // set image
        setFactor((factor) => {
          return {
            ...factor,
            qrCode: data.totp.qr_code,
          };
        });

        // dispatch event to set factor ID
        onSetFactorId(data.id);
      } catch (e) {
        setError(true);
      }
    })();
  }, [onSetFactorId, factorName, enrollFactor]);

  if (error) {
    return (
      <div className={'flex w-full flex-col space-y-2'}>
        <Alert type={'error'}>
          <Trans i18nKey={'profile:qrCodeError'} />
        </Alert>

        <Modal.CancelButton onClick={onCancel} />
      </div>
    );
  }

  if (!factorName) {
    return (
      <FactorNameForm
        onCancel={onCancel}
        onSetFactorName={(name) => {
          setFactor((factor) => ({ ...factor, name }));
        }}
      />
    );
  }

  return (
    <div className={'flex flex-col space-y-4'}>
      <p>
        <span className={'text-base'}>
          <Trans i18nKey={'profile:multiFactorModalHeading'} />
        </span>
      </p>

      <div className={'flex justify-center'}>
        <QrImage src={factor.qrCode} />
      </div>
    </div>
  );
}

function FactorNameForm(
  props: React.PropsWithChildren<{
    onSetFactorName: (name: string) => void;
    onCancel: () => void;
  }>,
) {
  const inputName = 'factorName';

  return (
    <form
      className={'w-full'}
      onSubmit={(event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const name = data.get(inputName) as string;

        props.onSetFactorName(name);
      }}
    >
      <div className={'flex flex-col space-y-4'}>
        <TextField.Label>
          <Trans i18nKey={'profile:factorNameLabel'} />

          <TextField.Input autoComplete={'off'} required name={inputName} />

          <TextField.Hint>
            <Trans i18nKey={'profile:factorNameHint'} />
          </TextField.Hint>
        </TextField.Label>

        <div className={'flex justify-end space-x-2'}>
          <Modal.CancelButton onClick={props.onCancel} />

          <Button type={'submit'}>
            <Trans i18nKey={'profile:factorNameSubmitLabel'} />
          </Button>
        </div>
      </div>
    </form>
  );
}

function QrImage({ src }: { src: string }) {
  return <Image alt={'QR Code'} src={src} width={160} height={160} />;
}

export default MultiFactorAuthSetupModal;

function useEnrollFactor() {
  const client = useSupabase();
  const key = useFactorsMutationKey();

  return useMutation(key, async (_, { arg: factorName }: { arg: string }) => {
    const { data, error } = await client.auth.mfa.enroll({
      friendlyName: factorName,
      factorType: 'totp',
    });

    if (error) {
      throw error;
    }

    return data;
  });
}

function useVerifyCodeMutation() {
  const key = useFactorsMutationKey();
  const client = useSupabase();

  return useMutation(
    key,
    async (_, { arg }: { arg: { factorId: string; code: string } }) => {
      const challenge = await client.auth.mfa.challenge({
        factorId: arg.factorId,
      });

      if (challenge.error) {
        throw challenge.error;
      }

      const challengeId = challenge.data.id;

      const verify = await client.auth.mfa.verify({
        factorId: arg.factorId,
        code: arg.code,
        challengeId,
      });

      if (verify.error) {
        throw verify.error;
      }

      return verify;
    },
  );
}
