'use client';

import React from 'react';
import classNames from 'clsx';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

const Tooltip = ({ delayDuration = 0, ...props }) => (
  <TooltipPrimitive.Provider delayDuration={delayDuration}>
    <TooltipPrimitive.Root {...props} />
  </TooltipPrimitive.Provider>
);

Tooltip.displayName = TooltipPrimitive.Tooltip.displayName;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, children, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={classNames(
        `animate-in fade-in-100 data-[side=bottom]:slide-in-from-top-1
           data-[side=top]:slide-in-from-bottom-1
           data-[side=left]:slide-in-from-right-1
           data-[side=right]:slide-in-from-left-1 z-50 overflow-hidden
           rounded-md bg-dark-900/80 px-3 py-1.5 text-xs text-gray-100
           shadow-md dark:bg-dark-700/90`,
        className,
      )}
      {...props}
    >
      {children}
      <TooltipPrimitive.Arrow
        className={'fill-dark-900/80 dark:fill-dark-700/90'}
      />
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
));

TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent };
