import { createContext } from 'react';

const CsrfTokenContext = createContext<string | null>(null);

export default CsrfTokenContext;
