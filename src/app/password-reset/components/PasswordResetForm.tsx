'use client';

import Heading from '~/core/ui/Heading';
import Trans from '~/core/ui/Trans';
import TextField from '~/core/ui/TextField';
import Button from '~/core/ui/Button';
import configuration from '~/configuration';
import Alert from '~/core/ui/Alert';
import useUpdateUserMutation from '~/core/hooks/use-update-user-mutation';

function PasswordResetForm() {
  const updateUser = useUpdateUserMutation();

  if (updateUser.error) {
    return (
      <div className={'flex flex-col space-y-4'}>
        <Alert type={'error'}>
          <Alert.Heading>
            <Trans i18nKey={'auth:resetPasswordError'} />
          </Alert.Heading>

          <Trans i18nKey={'common:genericError'} />
        </Alert>

        <Button onClick={() => updateUser.reset()} variant={'outline'}>
          <Trans i18nKey={'common:retry'} />
        </Button>
      </div>
    );
  }

  if (updateUser.data && !updateUser.isMutating) {
    return (
      <div className={'flex flex-col space-y-4'}>
        <Alert type={'success'}>
          <Alert.Heading>
            <Trans i18nKey={'profile:updatePasswordSuccess'} />
          </Alert.Heading>
          <Trans i18nKey={'profile:updatePasswordSuccessMessage'} />
        </Alert>

        <Button href={configuration.paths.appHome} variant={'outline'}>
          <Trans i18nKey={'common:backToHomePage'} />
        </Button>
      </div>
    );
  }

  return (
    <div className={'flex flex-col space-y-6 w-full'}>
      <div className={'flex justify-center'}>
        <Heading type={5}>
          <Trans i18nKey={'auth:passwordResetLabel'} />
        </Heading>
      </div>

      <form
        className={'w-full flex flex-col flex-1'}
        onSubmit={async (event) => {
          event.preventDefault();

          const data = new FormData(event.currentTarget);
          const password = data.get('password') as string;
          const repeatPassword = data.get('repeatPassword') as string;

          if (password !== repeatPassword) {
            return;
          }

          const redirectTo = [
            window.location.origin,
            configuration.paths.appHome,
          ].join('/');

          await updateUser.trigger({ password, redirectTo });
        }}
      >
        <div className={'flex-col space-y-4'}>
          <div>
            <TextField.Label>
              <Trans i18nKey={'common:password'} />

              <TextField.Input required name="password" type="password" />
            </TextField.Label>
          </div>

          <div>
            <TextField.Label>
              <Trans i18nKey={'common:repeatPassword'} />

              <TextField.Input required name="repeatPassword" type="password" />
            </TextField.Label>
          </div>

          <Button loading={updateUser.isMutating} type="submit" block>
            <Trans i18nKey={'auth:passwordResetLabel'} />
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PasswordResetForm;
