import { useCallback } from "react";
import { useAuth } from "reactfire";
import { FirebaseError } from "firebase/app";

import {
  AuthProvider,
  signInWithPopup,
  browserPopupRedirectResolver,
  UserCredential,
} from "firebase/auth";
import { useRequestState } from "../../utils";
import { useCreateUser } from "@/lib/users/hooks/use-create-user";
import { useApiRequest } from "../../utils";

export function useSignInWithProvider() {
  const auth = useAuth();
  const createUser = useCreateUser();
  const [createSession, apiState] = useApiRequest<any, any>(
    `/api/session`,
    "POST"
  );

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

        const idToken = await credential.user.getIdToken();
        await createSession({ idToken });

        await createUser(credential);

        setData(credential);
      } catch (error) {
        console.log(error);
        setError(error as FirebaseError);
      }
    },
    [auth, setData, setError, setLoading, createSession, createUser]
  );

  return [signInWithProvider, state] as [
    typeof signInWithProvider,
    typeof state
  ];
}
