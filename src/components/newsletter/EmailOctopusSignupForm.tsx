import { FormEventHandler, useCallback, useState } from 'react';

import Button from '~/core/ui/Button';
import TextField from '~/core/ui/TextField';

const EmailOctopusSignupForm: React.FC<
  React.PropsWithChildren<{
    formId: string;
  }>
> = ({ formId, children }) => {
  const action = `https://eocampaign1.com/form/${formId}`;
  const name = 'field_0';

  const [value, setValue] = useState('');
  const [success, setSuccess] = useState(false);

  const onSubmit: FormEventHandler = useCallback(
    async (event) => {
      event.preventDefault();

      const target = event.target as HTMLFormElement;
      const data = new FormData(target);

      const headers = new Headers({
        ['Content-Type']: 'application/x-www-form-urlencoded',
      });

      await fetch(action, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers,
        body: `${name}=${data.get(name)}`,
      });

      setValue('');
      setSuccess(true);
    },
    [action]
  );

  if (success) {
    return <p>You&apos;re in! Thank you for subscribing.</p>;
  }

  return (
    <>
      <form
        action={action}
        method={'POST'}
        target="_blank"
        className={`space-around flex w-full flex-grow justify-center`}
        onSubmit={onSubmit}
      >
        <TextField.Input
          type="email"
          className="w-full !rounded-tr-none !rounded-br-none border-r-transparent py-1 text-sm hover:border-r-transparent md:w-80 md:text-base"
          name={name}
          aria-label="Your email address"
          placeholder="your@email.com"
          required
          value={value}
          onChange={(e) =>
            setValue((e.currentTarget as HTMLInputElement).value)
          }
        />

        <Button className="rounded-tl-none rounded-bl-none text-sm md:text-base">
          {children}
        </Button>
      </form>

      <p className={'mt-2 text-center text-sm md:text-xs'}>
        Subscribe to our newsletter to receive updates
      </p>
    </>
  );
};

export default EmailOctopusSignupForm;
