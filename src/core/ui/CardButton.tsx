import { forwardRef } from 'react';
import Button from '~/core/ui/Button';
import classNames from 'clsx';

const CardButton = forwardRef<
  typeof Button,
  React.ComponentProps<typeof Button>
>(function CardButtonComponent(props, _) {
  return (
    <Button
      {...props}
      size={'large'}
      variant={'custom'}
      className={classNames(
        props.className,
        `h-28 cursor-pointer rounded-sm shadow ring-primary transition-all hover:shadow-lg active:bg-gray-50 dark:shadow-primary/30 dark:ring-primary/70 dark:active:bg-background/80`,
      )}
    >
      {props.children}
    </Button>
  );
});

export default CardButton;
