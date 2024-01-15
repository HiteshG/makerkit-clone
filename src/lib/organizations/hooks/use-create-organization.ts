import { useCallback } from "react";
import { useFirestore } from "reactfire";
import { FirebaseError } from "firebase/app";
import { collection, addDoc } from "firebase/firestore";
import { useRequestState } from "../../utils";
import { Organization } from "@/lib/types";

export function useCreateOrganization() {
  const firestore = useFirestore();

  const { state, setLoading, setData, setError } = useRequestState<
    any,
    FirebaseError
  >();

  const mutation = useCallback(
    async (organization: Organization) => {
      setLoading(true);

      const organizationsCollection = "organizations";
      const collectionReference = collection(
        firestore,
        organizationsCollection
      );

      try {
        await addDoc(collectionReference, organization);

        setData("success");
      } catch (error) {
        setError(error as FirebaseError);
      }
    },
    [firestore, setData, setError, setLoading]
  );

  return [mutation, state] as [typeof mutation, typeof state];
}
