import Link from 'next/link';
import classNames from 'clsx';
import type { DocumentationPage } from 'contentlayer/generated';
import If from '~/core/ui/If';

function DocumentationPageLink({
  page,
  before,
  after,
}: React.PropsWithChildren<{
  page: DocumentationPage;
  before?: React.ReactNode;
  after?: React.ReactNode;
}>) {
  return (
    <Link
      className={classNames(
        `flex w-full items-center space-x-8 rounded-xl p-6 font-medium text-current ring-2 dark:ring-dark-800 ring-gray-100 transition-all hover:bg-gray-50 dark:hover:bg-background/90 hover:dark:ring-dark-700 active:dark:bg-dark-800`,
        {
          'justify-start': before,
          'justify-end self-end': after,
        },
      )}
      href={`/docs/${page.resolvedPath}`}
    >
      <If condition={before}>{(node) => <>{node}</>}</If>

      <span className={'flex flex-col space-y-1.5'}>
        <span
          className={
            'text-xs font-semibold uppercase dark:text-gray-400' +
            ' text-gray-500'
          }
        >
          {before ? `Previous` : ``}
          {after ? `Next` : ``}
        </span>

        <span>{page.title}</span>
      </span>

      <If condition={after}>{(node) => <>{node}</>}</If>
    </Link>
  );
}

export default DocumentationPageLink;
