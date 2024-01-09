import { FormEvent, useCallback, useEffect } from "react";
import { useSignUpWithEmailAndPassword } from "@/lib/auth/hooks/useSignUpWithEmailAndPassword";
import { Input } from '@/core/ui/input';
import { Button } from "@/core/ui/button";

const SignUpForm = (
  props: React.PropsWithChildren<{
    onSignup: () => void;
  }>
) => {
  const [signUp, state] = useSignUpWithEmailAndPassword();
  const loading = state.loading;
  const error = state.error;

  useEffect(() => {
    if (state.success) {
      props.onSignup();
    }
  }, [props, state.success]);

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (loading) {
        return;
      }

      const data = new FormData(event.currentTarget);
      const email = data.get(`email`) as string;
      const password = data.get(`password`) as string;
      const repeatPassword = data.get(`repeatPassword`) as string;

      // sign user up
      return signUp(email, password, repeatPassword);
    },
    [loading, signUp]
  );

  return (
    <form className="w-full" onSubmit={onSubmit}>
      <div className="flex-col space-y-4">
        <div className="flex flex-col space-y-1">
          <label className="w-full text-sm font-medium text-gray-500 dark:text-gray-400 [&>*]:mt-[0.35rem]">
            Email Address
            <Input
              type="email"
              name="email"
              placeholder="your@email.com"
              required
              />
          </label>
        </div>
        <div className="flex flex-col space-y-1">
          <label className="w-full text-sm font-medium text-gray-500 dark:text-gray-400 [&>*]:mt-[0.35rem]">
            Password
            <Input
              type="password"
              name="password"
              required
              />
            <span className="block pl-1 text-xs font-normal leading-tight text-gray-500 dark:text-gray-400">
              {"Ensure it's at least 6 characters"}
            </span>
          </label>
        </div>
        <div className="flex flex-col space-y-1">
          <label className="w-full text-sm font-medium text-gray-500 dark:text-gray-400 [&>*]:mt-[0.35rem]">
            Repeat password
            <Input
              type="password"
              name="repeatPassword"
              required
              />
            <span className="block pl-1 text-xs font-normal leading-tight text-gray-500 dark:text-gray-400">
              Type your password again
            </span>
            {
              error ? <span className="text-red-500">{error.message}</span> : null
            }
          </label>
        </div>
        <div>
          <Button type="submit" disabled={loading} className="w-full">
            <span className="flex w-full h-full items-center transition-transform duration-500 ease-out">
              <span className="flex w-full flex-1 items-center justify-center">
                Get started
              </span>
            </span>
          </Button>
        </div>
      </div>
    </form>
  );
}

export default SignUpForm;
