import { useContext } from 'react';
import CsrfTokenContext from '~/lib/contexts/csrf';

function useCsrfToken() {
  const token = useContext(CsrfTokenContext);

  return token || '';
}

export default useCsrfToken;
