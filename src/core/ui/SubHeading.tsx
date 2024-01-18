import { createElement } from 'react';
import classNames from 'clsx';

const SubHeading = ({
  children,
  className,
  as = 'h2',
}: React.PropsWithChildren<{
  className?: string;
  as?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}>) => {
  const span = (
    <span
      className={classNames(
        'flex flex-col space-y-1 bg-gradient-to-br text-xl' +
          ' lg:text-2xl dark:from-white dark:via-gray-300' +
          ' dark:to-gray-400 bg-clip-text text-gray-500' +
          ' font-normal dark:text-transparent',
        className,
      )}
    >
      {children}
    </span>
  );

  return createElement(as, {}, span);
};

export default SubHeading;
