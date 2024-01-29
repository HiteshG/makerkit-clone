'use client';

import type { FormEvent } from 'react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import Heading from '~/core/ui/Heading';
import Button from '~/core/ui/Button';
import TextField from '~/core/ui/TextField';
import SubHeading from '~/core/ui/SubHeading';
import Trans from '~/core/ui/Trans';

export interface OrganizationInfoStepData {
  organization: string;
}

const OrganizationInfoStep: React.FCC<{
  onSubmit: (data: OrganizationInfoStepData) => void;
}> = ({ onSubmit }) => {
  const { t } = useTranslation('onboarding');

  const handleFormSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const data = new FormData(event.currentTarget);
      const organization = data.get(`organization`) as string;

      onSubmit({
        organization,
      });
    },
    [onSubmit],
  );

  return (
    <form
      onSubmit={handleFormSubmit}
      className={'flex w-full flex-1 flex-col space-y-12'}
    >
      <div className={'flex flex-col space-y-2'}>
        <Heading type={1}>
          <Trans i18nKey={'onboarding:setupOrganization'} />
        </Heading>

        <SubHeading>
          <span className={'text-base'}>
            <Trans i18nKey={'onboarding:setupOrganizationDescription'} />
          </span>
        </SubHeading>
      </div>

      <div className={'flex flex-1 flex-col space-y-2'}>
        <TextField>
          <TextField.Label>
            <Trans i18nKey={'onboarding:organizationNameLabel'} />

            <TextField.Input
              data-cy={'organization-name-input'}
              required
              name={'organization'}
              placeholder={t('organizationNamePlaceholder')}
            />
          </TextField.Label>
        </TextField>
      </div>

      <Button type={'submit'}>
        <Trans i18nKey={'common:continue'} />
      </Button>
    </form>
  );
};

export default OrganizationInfoStep;
