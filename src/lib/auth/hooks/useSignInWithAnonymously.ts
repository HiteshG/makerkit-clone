import { getAuth, signInAnonymously, Auth } from "firebase/auth";
import { FirebaseError } from "firebase/app";

import { UserCredential } from "firebase/auth";
import { useRequestState } from "./useRequestState";
import { useCallback } from "react";

export function useAnonymousSignIn() {
  const auth = getAuth();

  const { state, setLoading, setData, setError } = useRequestState<
    UserCredential,
    FirebaseError
  >();

  const signInWithAnonymously = useCallback(async () => {
    setLoading(true);

    try {
      const credentials = await signInAnonymously(auth);

      setData(credentials);
    } catch (error) {
      setError(error as FirebaseError);
    }
  }, [auth, setData, setError, setLoading]);

  return [signInWithAnonymously, state] as [
    typeof signInWithAnonymously,
    typeof state
  ];
}
