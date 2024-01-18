'use client';

import { Fragment } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { XMarkIcon, PlusCircleIcon } from '@heroicons/react/24/outline';

import MembershipRole from '~/lib/organizations/types/membership-role';

import { Tooltip, TooltipContent, TooltipTrigger } from '~/core/ui/Tooltip';
import TextField from '~/core/ui/TextField';
import Button from '~/core/ui/Button';
import IconButton from '~/core/ui/IconButton';

import MembershipRoleSelector from './MembershipRoleSelector';

type InviteModel = ReturnType<typeof memberFactory>;

const InviteMembersForm = ({
  onSubmit,
  currentUserEmail,
  currentUserRole,
  SubmitButton,
}: {
  onSubmit: (data: InviteModel[]) => void;
  currentUserEmail: Maybe<string>;
  currentUserRole: Maybe<MembershipRole>;
  SubmitButton: React.ReactNode;
}) => {
  const { register, handleSubmit, setValue, control, clearErrors, watch } =
    useInviteMembersForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'members',
    shouldUnregister: true,
  });

  const watchFieldArray = watch('members');

  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });

  return (
    <form
      className={'flex flex-col space-y-8'}
      data-cy={'invite-members-form'}
      onSubmit={(event) => {
        handleSubmit((data) => {
          onSubmit(data.members);
        })(event);
      }}
    >
      <div className="flex flex-col space-y-2">
        {controlledFields.map((field, index) => {
          const emailInputName = `members.${index}.email` as const;
          const roleInputName = `members.${index}.role` as const;

          // register email control
          const emailControl = register(emailInputName, {
            required: true,
            validate: (value) => {
              const invalid = getFormValidator(watchFieldArray)(value, index);

              if (invalid) {
                return "You have already entered this email address";
              }

              const isSameAsCurrentUserEmail = currentUserEmail === value;

              if (isSameAsCurrentUserEmail) {
                return "Hey, that's your email!";
              }

              return true;
            },
          });

          // register role control
          register(roleInputName, {
            value: field.role,
          });

          return (
            <Fragment key={field.id}>
              <div className={'flex items-center space-x-0.5 md:space-x-2'}>
                <div className={'w-7/12'}>
                  <TextField.Input
                    {...emailControl}
                    data-cy={'invite-email-input'}
                    placeholder="member@email.com"
                    type="email"
                    required
                  />
                </div>

                <div className={'w-4/12'}>
                  <MembershipRoleSelector
                    currentUserRole={currentUserRole}
                    value={field.role}
                    onChange={(role) => {
                      setValue(roleInputName, role);
                    }}
                  />
                </div>

                <div className={'w-[60px] flex justify-end'}>
                  <Tooltip className={'flex justify-center'}>
                    <TooltipTrigger asChild>
                      <IconButton
                        type={'button'}
                        disabled={fields.length <= 1}
                        data-cy={'remove-invite-button'}
                        label={"Remove invite"}
                        onClick={() => {
                          remove(index);
                          clearErrors(emailInputName);
                        }}
                      >
                        <XMarkIcon className={'h-4 lg:h-5'} />
                      </IconButton>
                    </TooltipTrigger>

                    <TooltipContent>
                      {"Remove invite"}
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </Fragment>
          );
        })}

        <div>
          <Button
            data-cy={'append-new-invite-button'}
            type={'button'}
            variant={'ghost'}
            size={'sm'}
            onClick={() => append(memberFactory())}
          >
            <span className={'flex items-center space-x-2'}>
              <PlusCircleIcon className={'h-5'} />

              <span>
                Add another one
              </span>
            </span>
          </Button>
        </div>
      </div>

      {SubmitButton}
    </form>
  );
};

function memberFactory() {
  return {
    email: '',
    role: MembershipRole.Member,
  };
}

function useInviteMembersForm() {
  return useForm({
    defaultValues: {
      members: [memberFactory()],
    },
    shouldUseNativeValidation: true,
    shouldFocusError: true,
    shouldUnregister: true,
  });
}

function getFormValidator(members: InviteModel[]) {
  return function isValueInvalid(value: string, index: number) {
    const emails = members.map((member) => member.email);
    const valueIndex = emails.indexOf(value);

    return valueIndex >= 0 && valueIndex !== index;
  };
}

export default InviteMembersForm;
