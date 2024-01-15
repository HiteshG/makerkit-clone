import { useCallback } from "react";
import { getAuth, signInAnonymously } from "firebase/auth";
import { FirebaseError } from "firebase/app";

import { UserCredential } from "firebase/auth";
import { useRequestState } from "../../utils";
import { useCreateUser } from "@/lib/users/hooks/use-create-user";
import { useApiRequest } from "../../utils";

export function useAnonymousSignIn() {
  const auth = getAuth();
  const createUser = useCreateUser();
  const [createSession, apiState] = useApiRequest<any, any>(
    `/api/session`,
    "POST"
  );

  const { state, setLoading, setData, setError } = useRequestState<
    UserCredential,
    FirebaseError
  >();

  const signInWithAnonymously = useCallback(async () => {
    setLoading(true);

    try {
      const credential = await signInAnonymously(auth);
      const idToken = await credential.user.getIdToken();
      await createSession({ idToken });

      await createUser(credential);

      setData(credential);
    } catch (error) {
      setError(error as FirebaseError);
    }
  }, [auth, setData, setError, setLoading, createSession, createUser]);

  return [signInWithAnonymously, state] as [
    typeof signInWithAnonymously,
    typeof state
  ];
}
