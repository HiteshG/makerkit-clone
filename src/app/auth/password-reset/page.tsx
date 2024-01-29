import Link from 'next/link';

import configuration from '~/configuration';
import Heading from '~/core/ui/Heading';
import Trans from '~/core/ui/Trans';

import PasswordResetRequestContainer from '~/app/auth/components/PasswordResetRequestContainer';
import { withI18n } from '~/i18n/with-i18n';

export const metadata = {
  title: 'Password Reset Request',
};

function PasswordResetPage() {
  return (
    <>
      <div>
        <Heading type={5}>
          <Trans i18nKey={'auth:passwordResetLabel'} />
        </Heading>
      </div>

      <div className={'flex flex-col space-y-4'}>
        <PasswordResetRequestContainer />

        <div className={'flex justify-center text-xs'}>
          <p className={'flex space-x-1'}>
            <span>
              <Trans i18nKey={'auth:passwordRecoveredQuestion'} />
            </span>

            <Link
              className={'text-primary-800 hover:underline dark:text-primary'}
              href={configuration.paths.signIn}
            >
              <Trans i18nKey={'auth:signIn'} />
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default withI18n(PasswordResetPage);
