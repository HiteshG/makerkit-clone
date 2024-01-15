import { useEffect } from 'react';
import Image from "next/image";
import { AtSign } from 'lucide-react';
import { GoogleAuthProvider } from "firebase/auth";
import AvailableProvider from './AvailableProvider';

import { useSignInWithProvider } from '@/lib/auth/hooks/useSignInWithProvider';
import { useAnonymousSignIn } from '@/lib/auth/hooks/useSignInWithAnonymously';
// import useSignInWithProvider from '@/core/hooks/use-sign-in-with-provider';

const Provider = (
  props: React.PropsWithChildren<{
    onSignIn: () => void;
  }>
) => {
  const [signInWithProvider, signInWithProviderState] = useSignInWithProvider();
  const [signInWithAnonymously, signInWithAnonymouslyState] = useAnonymousSignIn();

  useEffect(() => {
    if (signInWithProviderState.success) {
      props.onSignIn();
    }
  }, [props, signInWithProviderState.success]);

  const handleGoogleSignIn = () => {
    signInWithProvider(new GoogleAuthProvider());
  }

  useEffect(() => {
    if (signInWithAnonymouslyState.success) {
      props.onSignIn();
    }
  }, [props, signInWithAnonymouslyState.success]);

  const handleAnonymouslySignIn = () => {
    signInWithAnonymously();
  }

  return (
    <div className="flex w-full flex-1 flex-col space-y-3">
      <div className="flex-col space-y-2">
        <AvailableProvider
          icon={<Image alt="google.com logo" fetchPriority="high" width="22" height="22" decoding="async" data-nimg="1" src="/assets/images/google.webp" />}
          onClick={handleGoogleSignIn}
        >
          Sign in with Google
        </AvailableProvider>
        <AvailableProvider
          icon={<AtSign className="h-[22px] w-[22px]" />}
          onClick={handleAnonymouslySignIn}
        >
          Sign in anonymously
        </AvailableProvider>
      </div>
    </div>
  );
}

export default Provider;
