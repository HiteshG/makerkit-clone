'use client';

import { useCallback, useTransition } from 'react';
import type { Session } from '@supabase/gotrue-js';

import Trans from '~/core/ui/Trans';
import Button from '~/core/ui/Button';

import useSignOut from '~/core/hooks/use-sign-out';
import useRefresh from '~/core/hooks/use-refresh';
import { acceptInviteAction } from '~/lib/memberships/actions';

function ExistingUserInviteForm(
  props: React.PropsWithChildren<{
    session: Session;
    code: string;
  }>,
) {
  const signOut = useSignOut();
  const refresh = useRefresh();
  const [isSubmitting, startTransition] = useTransition();

  const onSignOut = useCallback(async () => {
    await signOut();
    refresh();
  }, [refresh, signOut]);

  const onInviteAccepted = useCallback(async () => {
    return startTransition(async () => {
      await acceptInviteAction({
        code: props.code,
      });
    });
  }, [props.code, startTransition]);

  return (
    <>
      <div className={'flex flex-col space-y-4'}>
        <p className={'text-center text-sm'}>
          <Trans
            i18nKey={'auth:clickToAcceptAs'}
            values={{ email: props.session?.user.email }}
            components={{ b: <b /> }}
          />
        </p>

        <Button
          block
          loading={isSubmitting}
          onClick={onInviteAccepted}
          data-cy={'accept-invite-submit-button'}
          type={'submit'}
        >
          <Trans i18nKey={'auth:acceptInvite'} />
        </Button>

        <div>
          <div className={'flex flex-col space-y-4'}>
            <p className={'text-center'}>
              <span
                className={
                  'text-center text-sm text-gray-700 dark:text-gray-300'
                }
              >
                <Trans i18nKey={'auth:acceptInviteWithDifferentAccount'} />
              </span>
            </p>

            <div className={'flex justify-center'}>
              <Button
                data-cy={'invite-sign-out-button'}
                disabled={isSubmitting}
                variant={'ghost'}
                size={'sm'}
                onClick={onSignOut}
                type={'button'}
              >
                <Trans i18nKey={'auth:signOut'} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ExistingUserInviteForm;
