import { useCallback, useState } from "react";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { collection, addDoc } from "firebase/firestore";
import { Organization } from "@/lib/organizations/types/organization";

export function useCreateOrganization() {
  const firestore = useFirestore();
  const [state, setState] = useState<string>();

  const mutation = useCallback(
    async (organization: Organization) => {
      setState("loading");

      const organizationsPath = `/organizations`;
      const collectionReference = collection(firestore, organizationsPath);

      try {
        await addDoc(collectionReference, organization);

        setState("success");
      } catch (e) {
        setState("error");
      }
    },
    [firestore]
  );

  return [mutation, state] as [typeof mutation, typeof state];
}
