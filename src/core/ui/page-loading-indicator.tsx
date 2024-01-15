import React, { PropsWithChildren } from 'react';
import { Spinner } from './spinner';
import { cn } from '@/lib/utils';

const PageLoadingIndicator = ({
  children,
  className,
  fullPage = true,
  displayLogo = false,
} : PropsWithChildren<{
  className?: string;
  fullPage?: boolean;
  displayLogo?: boolean;
}>) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center space-y-4',
        className,
        {
          [`fixed top-0 left-0 z-[100] h-screen w-screen bg-background`]:
            fullPage,
        },
      )}
    >        
      <Spinner className='h-12 w-12 text-primary' />
        
      <div>{children}</div>
    </div>
  )
}

export default PageLoadingIndicator
