import React from 'react';

const MoreButton = ({
  children,
} : {
  children?: React.ReactNode,
}) => {
  return (
    <button className="rounded-full bg-transparent h-8 w-8 flex items-center justify-center dark:focus:ring-primary/70 ring-primary/70 transition-all outline-none focus:ring-2 hover:border dark:border-dark-700 border-gray-100 disabled:cursor-not-allowed disabled:opacity-50 active:bg-gray-100 dark:active:bg-dark-600">
      {children}
    </button>
  );
}

export default MoreButton;
