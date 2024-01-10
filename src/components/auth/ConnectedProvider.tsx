import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const ConnectedProvider = ({
  icon,
  children,
} : {
  icon?: React.ReactNode,
  children?: React.ReactNode,
}) => {
  return (
    <div className="mt-4 flex flex-col divide-y divide-gray-50 dark:divide-dark-800">
      <div className="flex items-center justify-between py-1">
        <div className="flex items-center space-x-6">
          <span className="flex flex-1 items-center space-x-4 font-medium">
            {icon}
            <span className="flex flex-1 items-center space-x-2.5 text-sm font-medium">
              <CheckCircle2 className="h-5 text-green-600 dark:text-green-500" />
              <span>
                {children}
              </span>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default ConnectedProvider;
