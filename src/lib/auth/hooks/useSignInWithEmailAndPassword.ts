import { useCallback } from "react";
import { useAuth } from "reactfire";
import { FirebaseError } from "firebase/app";
import { UserCredential, signInWithEmailAndPassword } from "firebase/auth";

import { useRequestState } from "../../utils";
import { useCreateUser } from "@/lib/users/hooks/use-create-user";
import { useApiRequest } from "../../utils";

export function useSignInWithEmailAndPassword() {
  const auth = useAuth();
  const createUser = useCreateUser();
  const [createSession, { data, loading, success, error }] = useApiRequest<
    string,
    Object
  >(`/api/session`, "POST");

  const { state, setLoading, setData, setError } = useRequestState<
    UserCredential,
    FirebaseError
  >();

  const signIn = useCallback(
    async (email: string, password: string) => {
      setLoading(true);

      try {
        const credential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const idToken = await credential.user.getIdToken();
        await createSession({ idToken });
        await createUser(credential);

        setData(credential);
      } catch (error) {
        setError(error as FirebaseError);
      }
    },
    [auth, setData, setError, setLoading, createSession, createUser]
  );

  return [signIn, state] as [typeof signIn, typeof state];
}
