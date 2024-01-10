import { FormEvent, useCallback, useEffect } from 'react';
import { Input } from '@/core/ui/input';
import { Button } from '@/core/ui/button';

const Details = (
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
            Continue
          </span>
        </span>
      </Button>
    </form>
  );
}

export default Details;
