'use client';

import { forwardRef, useCallback } from 'react';
import classNames from 'clsx';

const Textarea = forwardRef<
  React.ElementRef<'textarea'>,
  React.TextareaHTMLAttributes<unknown> & {
    autoResize?: boolean;
  }
>(function TextareaComponent({ className, ...props }, ref) {
  const onInput = useAutoResize(props.onInput);

  return (
    <textarea
      ref={ref}
      {...props}
      onInput={props.autoResize ? onInput : props.onInput}
      className={classNames(
        'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className,
        {
          [`cursor-not-allowed opacity-50`]: props.disabled,
        },
      )}
    />
  );
});

export default Textarea;

function useAutoResize(onInput?: React.FormEventHandler<HTMLTextAreaElement>) {
  const callback: React.FormEventHandler<HTMLTextAreaElement> = useCallback(
    (event) => {
      const target = event.currentTarget;

      target.style.height = '';
      target.style.height = target.scrollHeight + 'px';

      if (onInput) {
        onInput(event);
      }
    },
    [onInput],
  );

  return callback;
}
