import { useCallback } from "react";
import { useAuth } from "reactfire";
import { FirebaseError } from "firebase/app";
import { signOut } from "firebase/auth";
import { useRequestState } from "../../useRequestState";

export function useSignOut() {
  const auth = useAuth();

  const { state, setLoading, setData, setError } = useRequestState<
    any,
    FirebaseError
  >();

  const signOutReq = useCallback(async () => {
    setLoading(true);

    try {
      await signOut(auth);

      setData("success");
    } catch (error) {
      setError(error as FirebaseError);
    }
  }, [auth, setData, setError, setLoading]);

  return [signOutReq, state] as [typeof signOutReq, typeof state];
}
