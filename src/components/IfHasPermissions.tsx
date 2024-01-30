'use client';

import type MembershipRole from '~/lib/organizations/types/membership-role';
import useCurrentUserRole from '~/lib/organizations/hooks/use-current-user-role';

function IfHasPermissions({
  children,
  condition,
  fallback = null,
}: React.PropsWithChildren<{
  condition: (role: MembershipRole) => boolean;
  fallback?: React.ReactNode | null;
}>) {
  const currentUserRole = useCurrentUserRole();

  if (currentUserRole === undefined || !condition(currentUserRole)) {
    return fallback ? <>{fallback}</> : null;
  }

  return <>{children}</>;
}

export default IfHasPermissions;
