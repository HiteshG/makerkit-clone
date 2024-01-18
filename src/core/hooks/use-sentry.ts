import { useEffect } from 'react';
import initializeBrowserSentry from '~/core/sentry/initialize-browser-sentry';

function useSentry() {
  useEffect(() => {
    void initializeBrowserSentry();
  }, []);
}

export default useSentry;
