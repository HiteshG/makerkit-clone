import { useCallback } from "react";
import { useAuth } from "reactfire";
import { FirebaseError } from "firebase/app";

import {
  AuthProvider,
  signInWithPopup,
  browserPopupRedirectResolver,
  UserCredential,
} from "firebase/auth";
import { useRequestState } from "../../useRequestState";
import { useCreateUser } from "@/lib/users/hooks/use-create-user";

export function useSignInWithProvider() {
  const auth = useAuth();
  const createUser = useCreateUser();

  const { state, setLoading, setData, setError } = useRequestState<
    UserCredential,
    FirebaseError
  >();

  const signInWithProvider = useCallback(
    async (provider: AuthProvider) => {
      setLoading(true);

      try {
        const credential = await signInWithPopup(
          auth,
          provider,
          browserPopupRedirectResolver
        );

        await createUser({
          displayName: credential.user.displayName,
          email: credential.user.email,
          photoURL: credential.user.photoURL,
          phoneNumber: credential.user.phoneNumber,
        });

        console.log(credential);

        setData(credential);
      } catch (error) {
        setError(error as FirebaseError);
      }
    },
    [auth, setData, setError, setLoading]
  );

  return [signInWithProvider, state] as [
    typeof signInWithProvider,
    typeof state
  ];
}
