'use client';

import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import If from '~/core/ui/If';
import CsrfTokenContext from '~/lib/contexts/csrf';
import Stepper from '~/core/ui/Stepper';

import OrganizationInfoStep, {
  OrganizationInfoStepData,
} from './OrganizationInfoStep';

import CompleteOnboardingStep from './CompleteOnboardingStep';
import OrganizationInvitesStep from '~/app/onboarding/components/OrganizationInvitesStep';
import MembershipRole from '~/lib/organizations/types/membership-role';

type Invite = {
  email: string;
  role: MembershipRole;
};

/**
 * Represents the list of steps for a user onboarding process.
 * The Array represents the list of step names to render within
 * the Stepper component. You can either use the i18n key or the label itself.
 *
 * Update this array to add/remove steps from the onboarding process.
 *
 * @type {Array<string>}
 */
const STEPS: Array<string> = [
  'Details',
  'Invites',
  'Complete',
];

function OnboardingContainer(
  props: React.PropsWithChildren<{
    csrfToken: string | null;
  }>,
) {
  const form = useForm({
    defaultValues: {
      data: {
        organization: '',
        invites: [] as Invite[],
      },
      currentStep: 0,
    },
  });

  const nextStep = useCallback(() => {
    form.setValue('currentStep', form.getValues('currentStep') + 1);
  }, [form]);

  const onInfoStepSubmitted = useCallback(
    (organizationInfo: OrganizationInfoStepData) => {
      form.setValue('data.organization', organizationInfo.organization);
      nextStep();
    },
    [form, nextStep],
  );

  const onInvitesStepSubmitted = useCallback(
    (invites: Invite[]) => {
      form.setValue('data.invites', invites);
      form.setValue('currentStep', form.getValues('currentStep') + 1);
    },
    [form],
  );

  const currentStep = form.watch('currentStep');
  const formData = form.watch('data');

  const isStep = useCallback(
    (step: number) => currentStep === step,
    [currentStep],
  );

  return (
    <CsrfTokenContext.Provider value={props.csrfToken}>
      <Stepper variant={'default'} currentStep={currentStep} steps={STEPS} />

      <If condition={isStep(0)}>
        <OrganizationInfoStep onSubmit={onInfoStepSubmitted} />
      </If>

      <If condition={isStep(1)}>
        <OrganizationInvitesStep onSubmit={onInvitesStepSubmitted} />
      </If>

      <If condition={isStep(2) && formData}>
        {(formData) => <CompleteOnboardingStep data={formData} />}
      </If>
    </CsrfTokenContext.Provider>
  );
}

export default OnboardingContainer;
