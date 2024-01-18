import { createContext } from 'react';
import type UserSession from '~/core/session/types/user-session';

const UserSessionContext = createContext<{
  userSession: Maybe<UserSession>;
  setUserSession: React.Dispatch<React.SetStateAction<Maybe<UserSession>>>;
}>({
  userSession: undefined,
  setUserSession: (_) => _,
});

export default UserSessionContext;
