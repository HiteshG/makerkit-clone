import { MemeberShipRole } from "../types";
import useIsSubscriptionActive from "./hooks/use-is-subscription-active";

/**
 * @param currentUserRole The current logged-in user
 * @param targetUser The role of the target of the action
 * @destination Checks if a user can perform actions (such as update a role) of another user
 * @name canUpdateUser
 */
export function canUpdateUser(
  currentUserRole: MemeberShipRole,
  targetUser: MemeberShipRole
) {
  return currentUserRole > targetUser;
}

function isAdmin(role: MemeberShipRole) {
  return role === MemeberShipRole.ADMIN;
}

export function useCreateNewThing(userRole: MemeberShipRole) {
  const isPayingUser = useIsSubscriptionActive();

  return isPayingUser && isAdmin(userRole);
}
