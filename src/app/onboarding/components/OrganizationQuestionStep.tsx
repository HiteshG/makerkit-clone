'use client'

import type { FormEvent } from "react";
import { useCallback } from "react";

import Heading from "~/core/ui/Heading";
import Button from "~/core/ui/Button";
import SubHeading from "~/core/ui/SubHeading";
import Trans from "~/core/ui/Trans";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "~/core/ui/Select";
import { SOURCES } from "~/configuration";

export interface OrganizationQuestionStepData {
  source: string;
}

const OrganizationQuestionStep: React.FCC<{
  onSubmit: (data: OrganizationQuestionStepData) => void;
}> = ({ onSubmit }) => {
  const handleFormSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const data = new FormData(event.currentTarget);
      const source = data.get('source') as string;

      onSubmit({
        source,
      })
    },
    [onSubmit]
  );

  return (
    <form
      onSubmit={handleFormSubmit}
      className={'flex w-full flex-1 flex-col space-y-12'}
    >
      <div className={'flex flex-col space-y-2'}>
        <Heading type={1}>
          <Trans i18nKey={'onboarding:whereDidYouFindUs'} />
        </Heading>

        <SubHeading>
          <span className={'text-base'}>
            <Trans i18nKey={'onboarding:whereDidYouFindUsDescription'} />
          </span>
        </SubHeading>
      </div>

      <div className={'flex flex-1 flex-col space-y-2'}>
      <Select
        name="source"
        required
      >
        <SelectTrigger data-cy={'source-selector-trigger'}>
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          {SOURCES.map((source) => {
            return (
              <SelectItem
                key={source.value}
                data-cy={`role-item-${source.value}`}
                value={source.value}
              >
                <span className={'text-sm'}>
                  <Trans i18nKey={source.label} />
                </span>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      </div>

      <Button type={'submit'}>
        <Trans i18nKey={'common:continue'} />
      </Button>
    </form>
  )
}

export default OrganizationQuestionStep;