import { FormEvent, useCallback, useEffect } from "react";
import Link from "next/link";
import { useSignInWithEmailAndPassword } from "@/lib/auth/hooks/useSignInWithEmailAndPassword";
import { Input } from '@/core/ui/input';
import { Button } from "@/core/ui/button";

const SignInForm = (
  props: React.PropsWithChildren<{
    onSignup: () => void;
  }>
) => {
  const [signIn, state] = useSignInWithEmailAndPassword();
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

      // sign user in
      return signIn(email, password);
    },
    [loading, signIn]
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
            <div className="py-0.5 text-xs">
              <Link className="hover:underline" href={"/auth/password-reset"}>Password forgotten?</Link>
            </div>
          </label>
        </div>
        <div>
          <Button type="submit" className="w-full">
            <span className="flex w-full h-full items-center transition-transform duration-500 ease-out">
              <span className="flex w-full flex-1 items-center justify-center">
                Sign In
              </span>
            </span>
          </Button>
        </div>
      </div>
    </form>
  );
}

export default SignInForm;
