import { FirestoreProvider, useFirebaseApp } from 'reactfire';
import { useMemo } from 'react';
 
import {
  // enableIndexedDbPersistence,
  connectFirestoreEmulator,
  initializeFirestore,
} from 'firebase/firestore';
 
import { isBrowser } from '@/lib/generic';
 
export default function FirebaseFirestoreProvider({
  children,
  useEmulator,
}: React.PropsWithChildren<{ useEmulator?: boolean }>) {
  const firestore = useFirestore();
 
  // connect to emulator if enabled
  if (useEmulator) {
    const host = getFirestoreHost();
    const port = Number(getFirestorePort());
 
    try {
     connectFirestoreEmulator(firestore, host, port);
    } catch (e) {
      // this may happen on re-renderings
    }
  }
 
  // const enablePersistence = isBrowser();
 
  // // We enable offline capabilities by caching Firestore in IndexedDB
  // // NB: if you don't want to cache results, please remove the next few lines
  // if (enablePersistence) {
  //   enableIndexedDbPersistence(firestore)
  // }
 
  return <FirestoreProvider sdk={firestore}>{children}</FirestoreProvider>;
}
 
function getFirestoreHost() {
  return process.env.NEXT_PUBLIC_FIREBASE_EMULATOR_HOST ?? 'localhost';
}
 
function getFirestorePort() {
  return process.env.NEXT_PUBLIC_FIRESTORE_EMULATOR_PORT ?? 8080;
}
 
function useFirestore() {
  const app = useFirebaseApp();
 
  return useMemo(() => initializeFirestore(app, {}), [app]);
}