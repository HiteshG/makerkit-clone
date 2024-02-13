'use client';

import { useCallback } from 'react';
import { cva } from 'cva';
import classNames from 'clsx';
import If from '~/core/ui/If';
import Trans from './Trans';

type Variant = 'numbers' | 'default';

const classNameBuilder = getClassNameBuilder();

function Stepper(props: {
  steps: string[];
  currentStep: number;
  variant?: Variant;
}) {
  const variant = props.variant ?? 'default';

  const Steps = useCallback(() => {
    return props.steps.map((labelOrKey, index) => {
      const selected = props.currentStep === index;

      const className = classNameBuilder({
        selected,
        variant,
      });

      const isNumberVariant = variant === 'numbers';

      const labelClassName = classNames({
        ['text-xs px-1.5 py-2']: !isNumberVariant,
      });

      const { label, number } = getStepLabel(labelOrKey, index);

      return (
        <div key={index} className={className}>
          <div aria-selected={selected}>
            <span className={labelClassName}>
              {number}
              <If condition={!isNumberVariant}>. {label}</If>
            </span>
          </div>

          <If condition={isNumberVariant}>
            <StepDivider selected={selected}>{label}</StepDivider>
          </If>
        </div>
      );
    });
  }, [props.steps, props.currentStep, variant]);

  // If there are no steps, don't render anything.
  if (props.steps.length < 2) {
    return null;
  }

  const containerClassName = classNames({
    ['flex justify-between']: variant === 'numbers',
    ['flex space-x-1']: variant === 'default',
  });

  return (
    <div className={containerClassName}>
      <Steps />
    </div>
  );
}

export default Stepper;

function getClassNameBuilder() {
  return cva(``, {
    variants: {
      variant: {
        default: `flex flex-col h-[2.5px] w-full transition-colors duration-500`,
        numbers:
          'w-9 h-9 font-bold rounded-full flex items-center justify-center' +
          ' text-sm border',
      },
      selected: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: 'default',
        selected: false,
        className: 'text-gray-400 dark:text-gray-500',
      },
      {
        variant: 'default',
        selected: true,
        className: 'bg-primary',
      },
      {
        variant: 'default',
        selected: false,
        className: 'bg-gray-300 dark:bg-gray-800',
      },
      {
        variant: 'numbers',
        selected: true,
        className: 'text-primary border-primary',
      },
      {
        variant: 'numbers',
        selected: false,
        className: 'text-gray-400 dark:text-gray-500',
      },
    ],
    defaultVariants: {
      variant: 'default',
      selected: false,
    },
  });
}

function StepDivider({
  selected,
  children,
}: React.PropsWithChildren<{
  selected: boolean;
}>) {
  const spanClassName = classNames('font-medium text-sm', {
    ['text-gray-400 dark:text-gray-500']: !selected,
    ['text-primary']: selected,
  });

  const className = classNames(
    'flex flex-1 last:flex-[0_0_0] items-center h-9 justify-center' +
      ' items-center w-full group px-3 flex space-x-3',
  );

  return (
    <div className={className}>
      <span className={spanClassName}>{children}</span>

      <div
        className={
          'divider h-[1px] w-full bg-gray-200 transition-colors' +
          ' dark:bg-dark-600 group-last:hidden'
        }
      />
    </div>
  );
}

function getStepLabel(labelOrKey: string, index: number) {
  const number = (index + 1).toString();

  return {
    number,
    label: <Trans i18nKey={labelOrKey} defaults={labelOrKey} />,
  };
}
