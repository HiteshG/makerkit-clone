import useUserSession from './use-user-session';

export default function useUserId() {
  const session = useUserSession();

  return session?.auth?.user.id;
}
