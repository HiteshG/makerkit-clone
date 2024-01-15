import { useCallback } from "react";
import { useAuth } from "reactfire";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import { useRequestState } from "../../utils";
import { useCreateUser } from "@/lib/users/hooks/use-create-user";
import { useApiRequest } from "../../utils";

export function useSignUpWithEmailAndPassword() {
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

  const signUp = useCallback(
    async (email: string, password: string, repeatPassword: string) => {
      if (password.length < 6) {
        setError({ message: "Password length is not enough" } as FirebaseError);
      } else if (password !== repeatPassword) {
        setError({ message: "Password is not match" } as FirebaseError);
      } else {
        setLoading(true);

        try {
          const credential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

          await createUser(credential);

          setData(credential);
        } catch (error) {
          setError(error as FirebaseError);
        }
      }
    },
    [auth, setData, setError, setLoading, createUser]
  );

  return [signUp, state] as [typeof signUp, typeof state];
}
