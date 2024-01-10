import { useCallback } from "react";
import { useAuth } from "reactfire";
import { signOut } from "firebase/auth";

export function useSignOut() {
  const auth = useAuth();

  const signOutReq = useCallback(() => {
    return signOut(auth);
  }, [auth]);

  return [signOutReq] as [typeof signOutReq];
}
