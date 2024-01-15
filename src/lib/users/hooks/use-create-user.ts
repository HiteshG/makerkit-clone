import { useCallback } from "react";
import { useFirestore } from "reactfire";
import {
  collection,
  addDoc,
  CollectionReference,
  where,
  query,
  getCountFromServer,
} from "firebase/firestore";
import { User } from "@/lib/types";
import { UserCredential } from "firebase/auth";

export function useCreateUser() {
  const firestore = useFirestore();

  const mutation = useCallback(
    async (credential: UserCredential) => {
      const usersPath = "users";
      const collectionRef = collection(
        firestore,
        usersPath
      ) as CollectionReference<User>;

      const user = {
        displayName: credential.user.displayName,
        email: credential.user.email,
        phoneNumber: credential.user.phoneNumber,
        photoURL: credential.user.photoURL,
      };

      const path = `email`;
      const operator = "==";
      const constraint = where(path, operator, user.email);
      const usersQuery = query(collectionRef, constraint);
      const count = await getCountFromServer(usersQuery);

      if (count.data().count == 0) {
        try {
          await addDoc(collectionRef, user);
        } catch (e) {
          console.log(e);
        }
      }
    },
    [firestore]
  );

  return mutation as typeof mutation;
}
