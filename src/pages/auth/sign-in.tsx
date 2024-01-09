import { useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Provider from '@/components/auth/Provider';
import SignInForm from '@/components/auth/SignInForm';

const SignIn = () => {
  const router = useRouter();

  const onSignup = useCallback(async () => {
    router.push("/dashboard");
  }, [router]);

  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-4 md:space-y-8 lg:space-y-16 lg:bg-gray-50 dark:lg:bg-background animate-in fade-in slide-in-from-top-8 duration-1000">
      <Link href={"/"} className="text-2xl text-primary-600">MakerKit</Link>
      <div className="flex w-full max-w-sm flex-col items-center space-y-4 rounded-xl border-transparent bg-white px-2 py-1 dark:bg-transparent md:w-8/12 md:border md:px-8 md:py-6 lg:w-5/12 lg:px-6 lg:shadow-2xl dark:lg:border-dark-800 lg:dark:bg-background dark:lg:shadow-[0_0_1200px_0] lg:dark:shadow-primary/30 xl:w-4/12 2xl:w-3/12">
        <div className="font-heading scroll-m-20 text-xl font-semibold tracking-tight">
          Sign in to your account
        </div>
        <Provider onSignup={onSignup} />
        <div>
          <span className="text-xs text-gray-400">or continue with email</span>
        </div>
        <SignInForm onSignup={onSignup} />
        <div className="flex justify-center text-xs">
          <p className="flex space-x-1">
            <span>Do not have an account yet?</span>
            <Link className="text-primary-800 hover:underline dark:text-primary" href={"/auth/sign-up"}>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
