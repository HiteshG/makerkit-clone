import { useFirestore, useFirestoreCollectionData } from "reactfire";

import {
  collection,
  CollectionReference,
  query,
  where,
} from "firebase/firestore";

import { Task, WithId } from "@/lib/types";

function useFetchTasks(organizationId: string) {
  const firestore = useFirestore();
  const tasksCollection = `tasks`;

  const collectionRef = collection(
    firestore,
    tasksCollection
  ) as CollectionReference<WithId<Task>>;

  const path = `organizationId`;
  const operator = "==";
  const constraint = where(path, operator, organizationId);
  const organizationsQuery = query(collectionRef, constraint);

  return useFirestoreCollectionData(organizationsQuery, {
    idField: "id",
  });
}

export default useFetchTasks;
