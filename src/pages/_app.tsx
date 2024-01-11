import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@/components/theme-provider';
import FirebaseAuthProvider from '@/components/FirebaseAuthProvider';
import FirebaseFirestoreProvider from '@/components/FirebaseFirestoreProvider';
import LoadingIndicator from '@/core/ui/loading-indicator';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <FirebaseAuthProvider>
        <FirebaseFirestoreProvider useEmulator>
          <LoadingIndicator />
          <main className={inter.className}>
            <Component {...pageProps} />
          </main>
        </FirebaseFirestoreProvider>
      </FirebaseAuthProvider>
    </ThemeProvider>
  )
}
