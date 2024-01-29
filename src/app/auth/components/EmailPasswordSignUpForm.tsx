import Trans from '~/core/ui/Trans';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import TextField from '~/core/ui/TextField';
import Button from '~/core/ui/Button';
import If from '~/core/ui/If';

const EmailPasswordSignUpForm: React.FCC<{
  onSubmit: (params: {
    email: string;
    password: string;
    repeatPassword: string;
  }) => unknown;
  loading: boolean;
}> = ({ onSubmit, loading }) => {
  const { t } = useTranslation();

  const { register, handleSubmit, watch, formState } = useForm({
    defaultValues: {
      email: '',
      password: '',
      repeatPassword: '',
    },
  });

  const emailControl = register('email', { required: true });
  const errors = formState.errors;

  const passwordControl = register('password', {
    required: true,
    minLength: {
      value: 6,
      message: t(`auth:passwordLengthError`),
    },
  });

  const passwordValue = watch(`password`);

  const repeatPasswordControl = register('repeatPassword', {
    required: true,
    minLength: {
      value: 6,
      message: t(`auth:passwordLengthError`),
    },
    validate: (value) => {
      if (value !== passwordValue) {
        return t(`auth:passwordsDoNotMatch`);
      }

      return true;
    },
  });

  return (
    <form className={'w-full'} onSubmit={handleSubmit(onSubmit)}>
      <div className={'flex-col space-y-4'}>
        <TextField>
          <TextField.Label>
            <Trans i18nKey={'common:emailAddress'} />

            <TextField.Input
              {...emailControl}
              data-cy={'email-input'}
              required
              type="email"
              placeholder={'your@email.com'}
            />
          </TextField.Label>

          <TextField.Error error={errors.email?.message} />
        </TextField>

        <TextField>
          <TextField.Label>
            <Trans i18nKey={'common:password'} />

            <TextField.Input
              {...passwordControl}
              data-cy={'password-input'}
              required
              type="password"
              placeholder={''}
            />

            <TextField.Hint>
              <Trans i18nKey={'auth:passwordHint'} />
            </TextField.Hint>

            <TextField.Error
              data-cy="password-error"
              error={errors.password?.message}
            />
          </TextField.Label>
        </TextField>

        <TextField>
          <TextField.Label>
            <Trans i18nKey={'auth:repeatPassword'} />

            <TextField.Input
              {...repeatPasswordControl}
              data-cy={'repeat-password-input'}
              required
              type="password"
              placeholder={''}
            />

            <TextField.Hint>
              <Trans i18nKey={'auth:repeatPasswordHint'} />
            </TextField.Hint>

            <TextField.Error
              data-cy="repeat-password-error"
              error={errors.repeatPassword?.message}
            />
          </TextField.Label>
        </TextField>

        <div>
          <Button
            data-cy={'auth-submit-button'}
            className={'w-full'}
            type="submit"
            loading={loading}
          >
            <If
              condition={loading}
              fallback={<Trans i18nKey={'auth:getStarted'} />}
            >
              <Trans i18nKey={'auth:signingUp'} />
            </If>
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EmailPasswordSignUpForm;
