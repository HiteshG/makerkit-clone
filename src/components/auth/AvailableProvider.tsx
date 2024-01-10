import React from 'react';
import { Button } from '@/core/ui/button';

const AvailableProvider = ({
  icon,
  children,
  onClick,
} : {
  icon?: React.ReactNode,
  children?: React.ReactNode,
  onClick?: () => void,
}) => {
  return (
    <Button
      variant="custom"
      className="w-full relative"
      onClick={onClick}
    >
      <span className="flex w-full h-full items-center transition-transform duration-500 ease-out">
        <span className="flex w-full flex-1 items-center justify-center">
          <span className="absolute left-3 flex items-center justify-start">
            {icon}
          </span>
          <span className="flex w-full flex-1 items-center">
            <span className="flex w-full items-center justify-center">
              <span className="text-current">
                {children}
              </span>
            </span>
          </span>
        </span>
      </span>
    </Button>
  );
}

export default AvailableProvider;