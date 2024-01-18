'use client';

import type { FormEvent } from 'react';
import { useCallback } from 'react';

import Heading from '~/core/ui/Heading';
import Button from '~/core/ui/Button';
import TextField from '~/core/ui/TextField';
import SubHeading from '~/core/ui/SubHeading';

export interface OrganizationInfoStepData {
  organization: string;
}

const OrganizationInfoStep: React.FCC<{
  onSubmit: (data: OrganizationInfoStepData) => void;
}> = ({ onSubmit }) => {
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
          Setup Organization
        </Heading>

        <SubHeading>
          <span className={'text-base'}>
            Welcome! First, let&apos;s setup your organization.
          </span>
        </SubHeading>
      </div>

      <div className={'flex flex-1 flex-col space-y-2'}>
        <TextField>
          <TextField.Label>
            Organization name

            <TextField.Input
              data-cy={'organization-name-input'}
              required
              name={'organization'}
              placeholder={"Your Organization"}
            />
          </TextField.Label>
        </TextField>
      </div>

      <Button type={'submit'}>
        Continue
      </Button>
    </form>
  );
};

export default OrganizationInfoStep;
