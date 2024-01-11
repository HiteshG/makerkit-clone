import { useFirestore, useFirestoreCollectionData } from "reactfire";
import {
  collection,
  CollectionReference,
  where,
  query,
} from "firebase/firestore";
import { Organization } from "@/lib/types";

export function useFetchUserOrganizations(userId: string) {
  const firestore = useFirestore();
  const organizationsPath = `organizations`;

  const ref = collection(
    firestore,
    organizationsPath
  ) as CollectionReference<Organization>;

  const userPath = `members.${userId}`;
  const operator = "!=";

  // adding the constraint where. This means: retrieve the organizations
  // where the field members[userId] is not null, eg: it exists
  const constraint = where(userPath, operator, null);
  const organizationsQuery = query(ref, constraint);

  return useFirestoreCollectionData(organizationsQuery);
}
