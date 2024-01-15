import { useCallback } from "react";
import { useAuth } from "reactfire";
import { FirebaseError } from "firebase/app";
import { signOut } from "firebase/auth";
import { useRequestState } from "../../utils";
import { useApiRequest } from "../../utils";

export function useSignOut() {
  const auth = useAuth();
  const [deleteSession, apiState] = useApiRequest<any, any>(
    `/api/session`,
    "DELETE"
  );

  const { state, setLoading, setData, setError } = useRequestState<
    any,
    FirebaseError
  >();

  const signOutReq = useCallback(async () => {
    setLoading(true);

    try {
      await signOut(auth);
      await deleteSession({});

      setData("success");
    } catch (error) {
      setError(error as FirebaseError);
    }
  }, [auth, setData, setError, setLoading, deleteSession]);

  return [signOutReq, state] as [typeof signOutReq, typeof state];
}
