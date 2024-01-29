'use client';

import { useCallback, useState } from 'react';
import useMutation from 'swr/mutation';
import { Factor } from '@supabase/gotrue-js';
import { useTranslation } from 'react-i18next';
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
import Trans from '~/core/ui/Trans';

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
        heading={<Trans i18nKey={'profile:multiFactorAuth'} />}
        subHeading={<Trans i18nKey={'profile:multiFactorAuthSubheading'} />}
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

        <div>
          <Trans i18nKey={'profile:loadingFactors'} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Alert type={'error'}>
          <Trans i18nKey={'profile:factorsListError'} />
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
            <Trans i18nKey={'profile:multiFactorAuthHeading'} />
          </Alert.Heading>

          <Trans i18nKey={'profile:multiFactorAuthDescription'} />
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
        <Trans i18nKey={'profile:setupMfaButtonLabel'} />
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
  const { t } = useTranslation();
  const unEnroll = useUnenrollFactor();

  const onUnenrollRequested = useCallback(
    async (factorId: string) => {
      if (unEnroll.isMutating) return;

      const promise = unEnroll.trigger(factorId).then(() => {
        props.setIsModalOpen(false);
      });

      toast.promise(promise, {
        loading: t(`profile:unenrollingFactor`),
        success: t(`profile:unenrollFactorSuccess`),
        error: t(`profile:unenrollFactorError`),
      });
    },
    [props, t, unEnroll],
  );

  return (
    <Modal
      heading={<Trans i18nKey={'profile:unenrollFactorModalHeading'} />}
      isOpen={!!props.factorId}
      setIsOpen={props.setIsModalOpen}
    >
      <div className={'flex flex-col space-y-4'}>
        <div className={'text-sm'}>
          <Trans i18nKey={'profile:unenrollFactorModalBody'} />
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
            <Trans i18nKey={'profile:unenrollFactorModalButtonLabel'} />
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
            <Trans i18nKey={'profile:factorName'} />
          </TableHead>
          <TableHead>
            <Trans i18nKey={'profile:factorType'} />
          </TableHead>
          <TableHead>
            <Trans i18nKey={'profile:factorStatus'} />
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
                  <Trans i18nKey={'profile:unenrollTooltip'} />
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
