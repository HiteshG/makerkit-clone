import { cn } from '@/lib/utils';
import React from 'react';

const Alert = ({
  icon,
  type,
  children,
} : {
  icon?: React.ReactNode,
  type: "info" | "warning" | "success" | "danger",
  children?: React.ReactNode,
}) => {
  return (
    <div className={cn(
      "p-4 animate-in fade-in relative flex items-center justify-between text-gray-700 rounded-lg text-sm border",
      type === "info" && "bg-sky-500/5 dark:text-sky-500 text-sky-800 border-sky-800/50 dark:border-sky-500/50",
      type === "warning" && "bg-yellow-500/5 dark:text-yellow-500 text-yellow-800 border-yellow-800/50 dark:border-yellow-500/50",
      type === "success" && "bg-green-500/5 dark:text-green-500 text-green-800 border-green-800/50 dark:border-green-500/50",
      type === "danger" && "bg-red-500/5 dark:text-red-500 text-red-800 border-red-800/50 dark:border-red-500/50",
    )}>
      <div className="flex justify-between w-full">
        <div className="flex space-x-2">
          <div className="py-0.5">
            {icon}
          </div>
          <div className="flex flex-col space-y-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Alert;
