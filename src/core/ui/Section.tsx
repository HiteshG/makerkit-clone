import classNames from 'clsx';

import Heading from '~/core/ui/Heading';
import If from '~/core/ui/If';

export function Section({
  children,
  className,
}: React.PropsWithChildren<{
  className?: string;
}>) {
  return (
    <div
      className={classNames(
        'rounded-md dark:border-dark-800 w-full border border-gray-100',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SectionHeader(
  props: React.PropsWithChildren<{
    title: string | React.ReactNode;
    description?: string | React.ReactNode;
    className?: string;
  }>,
) {
  return (
    <div
      className={classNames(
        'flex flex-col space-y-0.5 px-container pt-container',
        props.className,
      )}
    >
      <Heading type={4}>{props.title}</Heading>

      <If condition={props.description}>
        <p className={'text-gray-500 dark:text-gray-400'}>
          {props.description}
        </p>
      </If>
    </div>
  );
}

export function SectionBody(
  props: React.PropsWithChildren<{
    className?: string;
  }>,
) {
  return (
    <div className={classNames('flex flex-col p-container', props.className)}>
      {props.children}
    </div>
  );
}
