import React, { createElement, forwardRef } from 'react';
import classNames from 'clsx';

type DefaultProps = React.ButtonHTMLAttributes<unknown> & {
  loading?: boolean;
  label?: string;
};

type DivProps<TTag extends React.ElementType = 'div'> =
  React.HTMLAttributes<HTMLDivElement> & {
    loading?: boolean;
    disabled?: boolean;
    label?: string;
    as: TTag;
  };

type Props = React.PropsWithChildren<DefaultProps | DivProps>;

const CLASSNAME = `rounded-full bg-transparent h-8 w-8
  flex items-center justify-center dark:focus:ring-primary/70
  ring-primary/70 transition-all outline-none
  focus:ring-2 hover:border dark:border-dark-700 border-gray-100
  disabled:cursor-not-allowed disabled:opacity-50
  active:bg-gray-50 dark:active:bg-dark-800
 `;

const IconButton = forwardRef(function IconButtonComponent(
  iconButtonProps: Props,
  ref,
) {
  const { className, loading, disabled, children, label, ...props } =
    iconButtonProps;

  const allProps = {
    ...props,
    className: classNames(CLASSNAME, className),
    disabled: loading || disabled,
    'aria-label': label,
    innerRef: ref,
  };

  return <IconButtonElement {...allProps}>{children}</IconButtonElement>;
});

function IconButtonElement({
  innerRef,
  ...props
}: Props & {
  innerRef: React.ForwardedRef<unknown>;
}) {
  const tag = 'as' in props ? props.as : 'button';

  return createElement(tag, { ...props, ref: innerRef }, props.children);
}

export default IconButton;
