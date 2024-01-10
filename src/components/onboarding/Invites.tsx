import { FormEvent, useCallback } from 'react';
import InviteForm from './InviteForm';
import { Button } from '@/core/ui/button';

const Invites = (
  props: React.PropsWithChildren<{
    next: () => void;
  }>
) => {
  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      return props.next();
    },
    [props]
  );

  return (
    <div className="flex w-full flex-1 flex-col space-y-12">
      <div className="flex flex-col space-y-2">
        <h1 className="font-heading scroll-m-20 text-4xl font-bold tracking-tight dark:text-white">
          Invite Members
        </h1>
        <h2>
          <span className="flex flex-col space-y-1 bg-gradient-to-br text-xl lg:text-2xl dark:from-white dark:via-gray-300 dark:to-gray-400 bg-clip-text text-gray-500 font-normal dark:text-transparent">
            <span className="text-base">
              Invite your team members to join your organization.
            </span>
          </span>
        </h2>
      </div>
      <div className="flex flex-1 flex-col space-y-2">
        <InviteForm onSubmit={onSubmit}>
          <div className="flex flex-col space-y-2">
            <Button type="submit">
              <span className="flex w-full h-full items-center transition-transform duration-500 ease-out">
                <span className="flex w-full flex-1 items-center justify-center">
                  Continue
                </span>
              </span>
            </Button>
            <Button type="button" variant="ghost">
              <span className="flex w-full h-full items-center transition-transform duration-500 ease-out">
                <span className="flex w-full flex-1 items-center justify-center">
                  Skip
                </span>
              </span>
            </Button>
          </div>
        </InviteForm>
      </div>
    </div>
  );
}

export default Invites;
