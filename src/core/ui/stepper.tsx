import React from 'react';
import { cn } from '@/lib/utils';

const Steper = ({
  steps,
  currentStep,
} : {
  steps: string[],
  currentStep: number,
}) => {
  return (
    <div className="flex space-x-1">
      {steps.map((step: string, index: number) => (
          <div key={`step_${index}`} className={cn("flex flex-col h-[2.5px] w-full transition-colors duration-500", currentStep === index ? "bg-primary" : "text-gray-400 dark:text-gray-500 bg-gray-300 dark:bg-gray-800")}>
            <span className="text-xs px-1.5 py-2">{`${index + 1}.${step}`}</span>
          </div>
        ))
      }
    </div>
  );
}

export default Steper;
