import { FormEvent, useCallback, useEffect, useState } from "react";
import { useSignUpWithEmailAndPassword } from "@/lib/auth/hooks/useSignUpWithEmailAndPassword";
import { Input } from '@/core/ui/input';
import { Button } from "@/core/ui/button";
import Alert from "@/core/ui/alert";
import { AlertCircle } from "lucide-react";
import { Spinner } from '@/core/ui/spinner';

const SignUpForm = (
  props: React.PropsWithChildren<{
    onSignup: () => void;
  }>
) => {
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");

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
    <>
      {error && <Alert icon={<AlertCircle className="rounded-full h-5 w-5" />} type="danger">
        <h6>
          <span className="text-base font-medium">
            Sorry, we could not authenticate you
          </span>
        </h6>
        {error.code === "auth/email-already-in-use" && <p>This email is already in use. Please try with another one</p>}
      </Alert>}
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
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                />
              <span className="block pl-1 text-xs font-normal leading-tight text-gray-500 dark:text-gray-400">
                {"Ensure it's at least 6 characters"}
              </span>
              {(password.length < 6 && password.length !== 0) && <span className="block pl-1 text-xs font-normal leading-tight text-red-700 dark:text-red-500">
                Please provide a password with at least 6 characters
              </span>}
            </label>
          </div>
          <div className="flex flex-col space-y-1">
            <label className="w-full text-sm font-medium text-gray-500 dark:text-gray-400 [&>*]:mt-[0.35rem]">
              Repeat password
              <Input
                type="password"
                name="repeatPassword"
                value={repeatPassword}
                onChange={e => setRepeatPassword(e.target.value)}
                required
                />
              <span className="block pl-1 text-xs font-normal leading-tight text-gray-500 dark:text-gray-400">
                Type your password again
              </span>
              {(repeatPassword.length < 6 && repeatPassword.length !== 0) && <span className="block pl-1 text-xs font-normal leading-tight text-red-700 dark:text-red-500">
                Please provide a password with at least 6 characters
              </span>}
              {repeatPassword.length >= 6 && password !== repeatPassword && <span className="block pl-1 text-xs font-normal leading-tight text-red-700 dark:text-red-500">
                The passwords do not match
              </span>}
            </label>
          </div>
          <div>
            <Button type="submit" disabled={loading} className="w-full">
              <span className="flex w-full h-full items-center transition-transform duration-500 ease-out">
                <span className="flex w-full flex-1 items-center justify-center">
                  {loading && <Spinner className="h-4 w-4 animate-spin text-primary dark:text-primary/30 mx-2 fill-white dark:fill-white" />}
                  <span>Get started</span>
                </span>
              </span>
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}

export default SignUpForm;
