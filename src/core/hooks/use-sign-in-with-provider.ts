import {
  getAuth,
  AuthProvider,
  signInWithPopup,
  browserPopupRedirectResolver,
} from "firebase/auth";
import useMutation from "swr/mutation";

function useSignInWithProvider() {
  const auth = getAuth();
  const key = ["auth", "sign-in-with-provider"];

  return useMutation(
    key,
    async (_, { arg: provider }: { arg: AuthProvider }) => {
      return signInWithPopup(auth, provider, browserPopupRedirectResolver)
        .then((credential) => {
          return credential;
        })
        .catch((error) => {
          throw error.message;
        });
    }
  );
}

export default useSignInWithProvider;
