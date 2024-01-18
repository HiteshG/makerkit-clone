'use client';

import React, { forwardRef, useCallback, useState } from 'react';
import If from '~/core/ui/If';

type Props = React.InputHTMLAttributes<unknown>;

const InputRange = forwardRef<React.ElementRef<'input'>, Props>(
  function InputRangeComponent(
    { className, children, defaultValue, onInput, ...props },
    ref
  ) {
    const value = (props.value || defaultValue || 0) as number;

    const [bubbleProps, setBubbleProps] = useState(
      getBubbleProps({
        value,
        min: Number(props.min),
        max: Number(props.max),
      })
    );

    const onInputHandler = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onInput) {
          onInput(e);
        }

        const bubbleProps = getBubbleProps({
          value: Number(e.target.value),
          min: Number(props.min),
          max: Number(props.max),
        });

        setBubbleProps(bubbleProps);
      },
      [onInput, props.max, props.min]
    );

    return (
      <div className={'flex flex-col space-y-1'}>
        <input
          className={className}
          {...props}
          onInput={onInputHandler}
          ref={ref}
          type={'range'}
        />

        <span className={'relative text-xs'}>
          <If condition={bubbleProps.value !== null}>
            <span
              className={'absolute'}
              style={{
                top: '4px',
                left: bubbleProps.left,
              }}
            >
              {bubbleProps.value}
            </span>
          </If>
        </span>
      </div>
    );
  }
);

export default InputRange;

function getBubbleProps(range: {
  value: number | null;
  min?: number | null;
  max?: number | null;
}) {
  const value = range.value;
  const min = range.min ? range.min : 0;
  const max = range.max ? range.max : 100;

  if (!value) {
    return {
      value: 0,
      left: '0%',
    };
  }

  const left = Number(((value - min) * 100) / (max - min));

  return {
    value,
    left: `calc(${left}% - 10px)`,
  };
}
