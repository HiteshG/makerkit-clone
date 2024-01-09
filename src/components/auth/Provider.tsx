import { useEffect } from 'react';
import Image from "next/image";
import { GoogleAuthProvider } from "firebase/auth";

import { useSignInWithProvider } from '@/lib/auth/hooks/useSignInWithProvider';
import { useAnonymousSignIn } from '@/lib/auth/hooks/useSignInWithAnonymously';
import { Button } from '@/core/ui/button';

const Provider = (
  props: React.PropsWithChildren<{
    onSignup: () => void;
  }>
) => {
  const [signInWithProvider, signInWithProviderState] = useSignInWithProvider();
  const [signInWithAnonymously, signInWithAnonymouslyState] = useAnonymousSignIn();

  useEffect(() => {
    if (signInWithProviderState.success) {
      props.onSignup();
    }
  }, [props, signInWithProviderState.success]);

  const handleGoogleSignUp = () => {
    signInWithProvider(new GoogleAuthProvider());
  }

  useEffect(() => {
    if (signInWithAnonymouslyState.success) {
      props.onSignup();
    }
  }, [props, signInWithAnonymouslyState.success]);

  const handleAnonymously = () => {
    signInWithAnonymously();
  }

  return (
    <div className="flex w-full flex-1 flex-col space-y-3">
      <div className="flex-col space-y-2">
        <Button
          variant="custom"
          className="w-full relative"
          onClick={handleGoogleSignUp}
        >
          <span className="flex w-full h-full items-center transition-transform duration-500 ease-out">
            <span className="flex w-full flex-1 items-center justify-center">
              <span className="absolute left-3 flex items-center justify-start">
                <Image alt="google.com logo" fetchPriority="high" width="22" height="22" decoding="async" data-nimg="1" src="/assets/images/google.webp" style={{color: "transparent"}} />
              </span>
              <span className="flex w-full flex-1 items-center">
                <span className="flex w-full items-center justify-center">
                  <span className="text-current">
                    Sign in with Google
                  </span>
                </span>
              </span>
            </span>
          </span>
        </Button>
        <Button
          variant="custom"
          className="w-full relative"
          onClick={handleAnonymously}
        >
          <span className="flex w-full h-full items-center transition-transform duration-500 ease-out">
            <span className="flex w-full flex-1 items-center justify-center">
              <span className="absolute left-3 flex items-center justify-start">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" data-slot="icon" className="h-[22px] w-[22px]"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"></path></svg>
              </span>
              <span className="flex w-full flex-1 items-center">
                <span className="flex w-full items-center justify-center">
                  <span className="text-current">
                    Sign in anonymously
                  </span>
                </span>
              </span>
            </span>
          </span>
        </Button>
      </div>
    </div>
  );
}

export default Provider;
