'use client';

import Link from 'next/link';
import { cn as classNames } from '~/core/generic/shadcn-utils';
import { cva, VariantProps } from 'cva';
import { forwardRef } from 'react';

import If from '~/core/ui/If';
import Spinner from '~/core/ui/Spinner';

type Size = 'default' | 'small' | 'large' | 'custom' | 'sm' | 'lg';

const large = `[&>*]:py-2.5 [&>*]:px-6 h-14 text-lg`;
const small = `[&>*]:py-2 [&>*]:px-3 text-xs`;

const buttonVariants = cva(
  `inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors
   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    disabled:pointer-events-none disabled:opacity-50 active:[&>*]:translate-y-0.5`,
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        outlinePrimary: `border-primary bg-background border-2 hover:border-primary/80`,
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/90',
        ghost: 'hover:bg-accent/50 hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        transparent: 'hover:bg-accent hover:text-accent-foreground',
        flat: 'bg-primary/5 text-primary hover:bg-primary/10',
        custom: '',
      },
      size: {
        default: `text-sm h-10 [&>*]:py-2 [&>*]:px-4`,
        small,
        sm: small,
        large,
        lg: large,
        icon: 'h-10 w-10',
        custom: ``,
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  block?: boolean;
  round?: boolean;
  loading?: boolean;
  href?: Maybe<string>;
}

const defaultSize: Size = `default`;
const defaultVariant = `default`;

const Button: React.FCC<ButtonProps> = forwardRef<
  React.ElementRef<'button'>,
  ButtonProps
>(function ButtonComponent(
  { children, color, size, variant, block, loading, href, round, ...props },
  ref,
) {
  const className = classNames(
    buttonVariants({
      variant: variant ?? defaultVariant,
      size: size ?? defaultSize,
    }),
    block ? `w-full` : ``,
    loading ? `opacity-80` : ``,
    round ? 'rounded-full' : '',
    props.className,
  );

  return (
    <button
      {...props}
      tabIndex={href ? -1 : 0}
      ref={ref}
      className={className}
      disabled={loading || props.disabled}
    >
      <InnerButtonContainerElement href={href} disabled={props.disabled}>
        <span
          className={classNames(
            `flex w-full flex-1 items-center justify-center`,
          )}
        >
          <If condition={loading}>
            <Animation />
          </If>

          {children}
        </span>
      </InnerButtonContainerElement>
    </button>
  );
});

function Animation() {
  return (
    <span className={'mx-2'}>
      <Spinner className={'mx-auto !h-4 !w-4 fill-white dark:fill-white'} />
    </span>
  );
}

function InnerButtonContainerElement({
  children,
  href,
  disabled,
}: React.PropsWithChildren<{
  href: Maybe<string>;
  disabled?: boolean;
}>) {
  const className = `flex w-full h-full items-center transition-transform duration-500 ease-out`;

  if (href && !disabled) {
    return (
      <Link className={className} href={href}>
        {children}
      </Link>
    );
  }

  return <span className={className}>{children}</span>;
}

export default Button;

export { Button, buttonVariants };
