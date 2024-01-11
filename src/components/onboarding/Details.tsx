import { FormEvent, useCallback, useEffect } from 'react';
import { Input } from '@/core/ui/input';
import { Button } from '@/core/ui/button';
import { useCreateOrganization } from '@/lib/organizations/hooks/use-create-organization';
import { Spinner } from '@/core/ui/spinner';

const Details = (
  props: React.PropsWithChildren<{
    next: () => void;
  }>
) => {
  const [createOrganization, createOrganizationState] = useCreateOrganization();

  useEffect(() => {
    if (createOrganizationState.success) {
      props.next();
    }
  }, [props, createOrganizationState]);

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const data = new FormData(event.currentTarget);
      const name = data.get('name') as string;

      return createOrganization({
        name: name,
        owner: ""
      });
    },
    [createOrganization]
  );

  return (
    <form className="flex w-full flex-1 flex-col space-y-12" onSubmit={onSubmit}>
      <div className="flex flex-col space-y-2">
        <h1 className="font-heading scroll-m-20 text-4xl font-bold tracking-tight dark:text-white">
          Setup Organization
        </h1>
      </div>
      <div className="flex flex-1 flex-col space-y-2">
        <div className="flex flex-col space-y-1">
          <label className="w-full text-sm font-medium text-gray-500 dark:text-gray-400 [&>*]:mt-[0.35rem]">
            Organization name
            <Input
              name="name"
              type="text"
              placeholder="Ex. Acme Inc."
              required
              />
          </label>
        </div>
      </div>
      <Button>
        <span className="flex w-full h-full items-center transition-transform duration-500 ease-out">
          <span className="flex w-full flex-1 items-center justify-center">
            {createOrganizationState.loading && <Spinner className="h-4 w-4 animate-spin text-primary dark:text-primary/30 mx-2 fill-white dark:fill-white" />}
            <span>Continue</span>
          </span>
        </span>
      </Button>
    </form>
  );
}

export default Details;
