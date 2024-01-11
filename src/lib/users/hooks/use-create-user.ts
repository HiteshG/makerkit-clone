import { useCallback } from "react";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import {
  collection,
  addDoc,
  CollectionReference,
  where,
  query,
  getCountFromServer,
} from "firebase/firestore";
import { User } from "@/lib/types";

export function useCreateUser() {
  const firestore = useFirestore();

  const mutation = useCallback(
    async (user: User) => {
      const usersPath = "users";
      const collectionRef = collection(
        firestore,
        usersPath
      ) as CollectionReference<User>;

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
