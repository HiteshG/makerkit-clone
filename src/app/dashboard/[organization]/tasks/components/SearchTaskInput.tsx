'use client'

import { usePathname, useRouter } from "next/navigation";
import { FormEventHandler, useCallback } from "react";
import { TextFieldInput } from "~/core/ui/TextField";

function SearchTaskInput({
  query,
}: React.PropsWithChildren<{
  query: Maybe<string>,
}>) {
  const router = useRouter();
  const pathName = usePathname();

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (event) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const query = formData.get('query') as string;
      const url = new URL(pathName, window.location.origin);

      url.searchParams.set('query', query);

      const path = url.pathname + url.search;

      router.push(path);
    },
    [pathName, router]
  );

  return (
    <form className={'w-full max-w-sm'} onSubmit={onSubmit}>
      <TextFieldInput
        defaultValue={query}
        className={'w-full'}
        name={'query'}
        placeholder={'Search for task...'}
      />
    </form>
  )
}

export default SearchTaskInput;