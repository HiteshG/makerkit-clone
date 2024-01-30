'use client'

import { usePathname, useRouter } from "next/navigation";
import { FormEventHandler, useCallback } from "react";
import { TextFieldInput } from "~/core/ui/TextField";
import { useTranslation } from 'react-i18next';

function SearchTaskInput({
  query,
}: React.PropsWithChildren<{
  query: Maybe<string>,
}>) {
  const router = useRouter();
  const pathName = usePathname();
  const { t } = useTranslation('organization');

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
        placeholder={t('task:searchForTaskPlaceholder')}
      />
    </form>
  )
}

export default SearchTaskInput;