import React, { useEffect } from 'react';
import { AuthProvider, useAuth, useFirebaseApp, FirebaseAppProvider} from 'reactfire';
import { initializeApp } from 'firebase/app';
import configuration from '../../configuration';
 
import {
  initializeAuth,
  indexedDBLocalPersistence,
  connectAuthEmulator,
  inMemoryPersistence,
} from 'firebase/auth';
 
function getAuthEmulatorHost() {
  // we can access these variables
  // because they are prefixed with "NEXT_PUBLIC_"
  const host = process.env.NEXT_PUBLIC_FIREBASE_EMULATOR_HOST;
  const port = process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_PORT;
 
  return ['http://', host, ':', port].join('');
}
 
function isBrowser() {
  return typeof window !== 'undefined';
}
 
export default function FirebaseAuthProvider({
  children,
}: React.PropsWithChildren) {
  const app = initializeApp(configuration.firebase);
 
  // make sure we're not using IndexedDB when SSR
  // as it is only supported on browser environments
  const persistence = isBrowser()
    ? indexedDBLocalPersistence
    : inMemoryPersistence;
 
  const auth = initializeAuth(app, { persistence });
 
  const shouldConnectEmulator =
    process.env.NEXT_PUBLIC_EMULATOR ==='true';
 
  if (shouldConnectEmulator && !("emulator" in auth.config)) {
    const host = getAuthEmulatorHost();
 
    connectAuthEmulator(auth, host);
  }
 
  return (
    <FirebaseAppProvider firebaseApp={app}>
      <AuthProvider sdk={auth}>
        {children}
      </AuthProvider>
    </FirebaseAppProvider>
  );
}