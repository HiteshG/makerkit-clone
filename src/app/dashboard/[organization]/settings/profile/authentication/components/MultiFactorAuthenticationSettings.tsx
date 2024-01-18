'use client';

import { useCallback, useState } from 'react';
import useMutation from 'swr/mutation';
import { Factor } from '@supabase/gotrue-js';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { toast } from 'sonner';

import { Tooltip, TooltipContent, TooltipTrigger } from '~/core/ui/Tooltip';

import useFetchAuthFactors from '~/core/hooks/use-fetch-factors';
import Spinner from '~/core/ui/Spinner';
import Alert from '~/core/ui/Alert';
import If from '~/core/ui/If';
import Button from '~/core/ui/Button';
import Modal from '~/core/ui/Modal';
import Badge from '~/core/ui/Badge';
import IconButton from '~/core/ui/IconButton';

import useSupabase from '~/core/hooks/use-supabase';
import useFactorsMutationKey from '~/core/hooks/use-user-factors-mutation-key';

import SettingsTile from '../../../components/SettingsTile';
import MultiFactorAuthSetupModal from '../../components/MultiFactorAuthSetupModal';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/core/ui/Table';

const MAX_FACTOR_COUNT = 10;

function MultiFactorAuthenticationSettings() {
  const [isMfaModalOpen, setIsMfaModalOpen] = useState(false);

  return (
    <div>
      <SettingsTile
        heading={"Multi-Factor Authentication"}
        subHeading={"Set up a MFA method to secure your account"}
      >
        <MultiFactorAuthFactorsList
          onEnrollRequested={() => setIsMfaModalOpen(true)}
        />
      </SettingsTile>

      <MultiFactorAuthSetupModal
        isOpen={isMfaModalOpen}
        setIsOpen={setIsMfaModalOpen}
      />
    </div>
  );
}

export default MultiFactorAuthenticationSettings;

function MultiFactorAuthFactorsList({
  onEnrollRequested,
}: React.PropsWithChildren<{
  onEnrollRequested: () => void;
}>) {
  const { data: factors, isLoading, error } = useFetchAuthFactors();
  const [unEnrolling, setUnenrolling] = useState<string>();

  if (isLoading) {
    return (
      <div className={'flex items-center space-x-4'}>
        <Spinner />

        <div>Loading factors...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Alert type={'error'}>
          Error loading factors list
        </Alert>
      </div>
    );
  }

  const allFactors = factors?.all ?? [];

  if (!allFactors.length) {
    return (
      <div className={'flex flex-col space-y-4'}>
        <Alert type={'info'}>
          <Alert.Heading>
            Secure your account with Multi-Factor Authentication
          </Alert.Heading>

          Enable Multi-Factor Authentication to verify your identity for an extra layer of security to your account in case your password is stolen. In addition to entering your password, it requires you confirm your identity via SMS.
        </Alert>

        <SetupMfaButton onClick={onEnrollRequested} />
      </div>
    );
  }

  const canAddNewFactors = allFactors.length < MAX_FACTOR_COUNT;

  return (
    <div className={'flex flex-col space-y-4'}>
      <FactorsTable factors={allFactors} setUnenrolling={setUnenrolling} />

      <If condition={canAddNewFactors}>
        <SetupMfaButton onClick={onEnrollRequested} />
      </If>

      <If condition={unEnrolling}>
        {(factorId) => (
          <ConfirmUnenrollFactorModal
            factorId={factorId}
            setIsModalOpen={() => setUnenrolling(undefined)}
          />
        )}
      </If>
    </div>
  );
}

function SetupMfaButton(
  props: React.PropsWithChildren<{
    onClick: () => void;
  }>,
) {
  return (
    <div>
      <Button onClick={props.onClick}>
        Setup a new Factor
      </Button>
    </div>
  );
}

function ConfirmUnenrollFactorModal(
  props: React.PropsWithChildren<{
    factorId: string;
    setIsModalOpen: (isOpen: boolean) => void;
  }>,
) {
  const unEnroll = useUnenrollFactor();

  const onUnenrollRequested = useCallback(
    async (factorId: string) => {
      if (unEnroll.isMutating) return;

      const promise = unEnroll.trigger(factorId).then(() => {
        props.setIsModalOpen(false);
      });

      toast.promise(promise, {
        loading: "Unenrolling factor...",
        success: "Factor successfully unenrolled",
        error: "Unenrolling factor failed",
      });
    },
    [props, unEnroll],
  );

  return (
    <Modal
      heading={"Unenroll Factor"}
      isOpen={!!props.factorId}
      setIsOpen={props.setIsModalOpen}
    >
      <div className={'flex flex-col space-y-4'}>
        <div className={'text-sm'}>
        You&apos;re about to unenroll this factor. You will not be able to use it to login to your account.
        </div>

        <div className={'flex flex-row justify-end space-x-2'}>
          <Modal.CancelButton
            disabled={unEnroll.isMutating}
            onClick={() => props.setIsModalOpen(false)}
          />

          <Button
            type={'button'}
            loading={unEnroll.isMutating}
            variant={'destructive'}
            onClick={() => onUnenrollRequested(props.factorId)}
          >
            Yes, unenroll factor
          </Button>
        </div>
      </div>
    </Modal>
  );
}

function FactorsTable({
  setUnenrolling,
  factors,
}: React.PropsWithChildren<{
  setUnenrolling: (factorId: string) => void;
  factors: Factor[];
}>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            Factor Name
          </TableHead>
          <TableHead>
            Type
          </TableHead>
          <TableHead>
            Status
          </TableHead>

          <TableHead />
        </TableRow>
      </TableHeader>

      <TableBody>
        {factors.map((factor) => (
          <TableRow key={factor.id}>
            <TableCell>
              <span className={'block truncate'}>{factor.friendly_name}</span>
            </TableCell>

            <TableCell>
              <Badge size={'small'} className={'inline-flex uppercase'}>
                {factor.factor_type}
              </Badge>
            </TableCell>

            <TableCell>
              <Badge
                size={'small'}
                className={'inline-flex capitalize'}
                color={factor.status === 'verified' ? 'success' : 'normal'}
              >
                {factor.status}
              </Badge>
            </TableCell>

            <TableCell className={'flex justify-end'}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <IconButton onClick={() => setUnenrolling(factor.id)}>
                    <XMarkIcon className={'h-4'} />
                  </IconButton>
                </TooltipTrigger>

                <TooltipContent>
                  Unenroll this factor
                </TooltipContent>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function useUnenrollFactor() {
  const client = useSupabase();
  const key = useFactorsMutationKey();

  return useMutation(key, async (_, { arg: factorId }: { arg: string }) => {
    const { data, error } = await client.auth.mfa.unenroll({
      factorId,
    });

    if (error) {
      throw error;
    }

    return data;
  });
}
