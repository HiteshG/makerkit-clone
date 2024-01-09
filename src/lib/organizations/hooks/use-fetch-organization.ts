import { useFirestore, useFirestoreDocData } from "reactfire";
import { doc, DocumentReference } from "firebase/firestore";
import { Organization } from "@/lib/organizations/types/organization";

type Response = Organization & { id: string };

export function useFetchOrganization(organizationId: string) {
  const firestore = useFirestore();
  const organizationsPath = `/organizations`;

  const ref = doc(
    firestore,
    organizationsPath,
    organizationId
  ) as DocumentReference<Response>;

  return useFirestoreDocData(ref, { idField: "id" });
}
