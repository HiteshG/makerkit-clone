import useUserSession from '~/core/hooks/use-user-session';

function useCurrentUserRole() {
  const user = useUserSession();

  return user?.role;
}

export default useCurrentUserRole;
