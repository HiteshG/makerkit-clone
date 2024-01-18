'use client';

import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import cn from 'clsx';

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn('grid gap-2', className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'border-primary text-primary ring-offset-background' +
          ' focus-visible:ring-ring aspect-square h-5 w-5 rounded-full border' +
          ' focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        'border-2 dark:aria-checked:border-primary',
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center fade-in animate-in zoom-in duration-100">
        <div className="h-3 w-3 bg-primary rounded-full" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

const RadioGroupItemLabel = (
  props: React.PropsWithChildren<{
    className?: string;
  }>,
) => {
  return (
    <label
      className={cn(
        'rounded-md flex cursor-pointer ' +
          ' items-center space-x-4 border border-input hover:bg-gray-50' +
          ' active:bg-gray-100 dark:active:bg-primary/20' +
          ' dark:hover:bg-primary/10 p-4 text-sm text-gray-600' +
          ' dark:text-gray-400 transition-colors',
        props.className,
      )}
    >
      {props.children}
    </label>
  );
};

export { RadioGroup, RadioGroupItem, RadioGroupItemLabel };
