import { useContext } from 'react';
import UserSessionContext from '~/core/session/contexts/user-session';

export default function useUserSession() {
  const { userSession } = useContext(UserSessionContext);

  return userSession;
}
